const express = require('express');
const path = require('path');
const { generateWeeklyPlan, buildMenuMessage, buildShoppingMessage, buildRecipeMessage } = require('./menu-planner');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- Storage abstraction ---
let storage;

if (process.env.DATABASE_URL) {
  const { Pool } = require('pg');
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    max: 5
  });

  pool.on('error', (err) => {
    console.error('Unexpected pool error:', err.message);
  });

  async function initDB() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS members (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        sort_order INT NOT NULL DEFAULT 0
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS schedules (
        id SERIAL PRIMARY KEY,
        week_key TEXT NOT NULL,
        member TEXT NOT NULL,
        day TEXT NOT NULL,
        dinner TEXT DEFAULT '',
        memo TEXT DEFAULT '',
        UNIQUE(week_key, member, day)
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS menu_plans (
        id SERIAL PRIMARY KEY,
        week_key TEXT NOT NULL UNIQUE,
        plan_json TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    const { rows } = await pool.query('SELECT COUNT(*) as cnt FROM members');
    if (parseInt(rows[0].cnt) === 0) {
      const defaults = ['パパ', 'ママ', '長男', '長女'];
      for (let i = 0; i < defaults.length; i++) {
        await pool.query('INSERT INTO members (name, sort_order) VALUES ($1, $2)', [defaults[i], i]);
      }
    }
  }

  storage = {
    init: initDB,
    getMembers: async () => {
      const { rows } = await pool.query('SELECT name FROM members ORDER BY sort_order');
      return rows.map(r => r.name);
    },
    setMembers: async (members) => {
      await pool.query('DELETE FROM members');
      for (let i = 0; i < members.length; i++) {
        await pool.query('INSERT INTO members (name, sort_order) VALUES ($1, $2)', [members[i], i]);
      }
    },
    getWeek: async (weekKey) => {
      const { rows } = await pool.query(
        'SELECT member, day, dinner, memo FROM schedules WHERE week_key = $1', [weekKey]
      );
      const schedules = {};
      for (const row of rows) {
        if (!schedules[row.member]) schedules[row.member] = {};
        schedules[row.member][row.day] = { dinner: row.dinner, memo: row.memo };
      }
      return schedules;
    },
    setSchedule: async (weekKey, member, daySchedules) => {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        for (const [day, data] of Object.entries(daySchedules)) {
          await client.query(`
            INSERT INTO schedules (week_key, member, day, dinner, memo)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (week_key, member, day)
            DO UPDATE SET dinner = $4, memo = $5
          `, [weekKey, member, day, data.dinner || '', data.memo || '']);
        }
        await client.query('COMMIT');
      } catch (e) {
        await client.query('ROLLBACK');
        throw e;
      } finally {
        client.release();
      }
    },
    savePlan: async (weekKey, plan) => {
      await pool.query(`
        INSERT INTO menu_plans (week_key, plan_json)
        VALUES ($1, $2)
        ON CONFLICT (week_key)
        DO UPDATE SET plan_json = $2, created_at = NOW()
      `, [weekKey, JSON.stringify(plan)]);
    },
    getPlan: async (weekKey) => {
      const { rows } = await pool.query(
        'SELECT plan_json FROM menu_plans WHERE week_key = $1', [weekKey]
      );
      return rows.length > 0 ? JSON.parse(rows[0].plan_json) : null;
    }
  };
} else {
  const fs = require('fs');
  const DATA_FILE = path.join(__dirname, 'data', 'schedules.json');

  function ensureDataDir() {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify({ members: ['パパ', 'ママ', '長男', '長女'], weeks: {} }));
    }
  }

  function readData() {
    ensureDataDir();
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  }

  function writeData(data) {
    ensureDataDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  }

  storage = {
    init: async () => {},
    getMembers: async () => readData().members,
    setMembers: async (members) => {
      const data = readData();
      data.members = members;
      writeData(data);
    },
    getWeek: async (weekKey) => {
      const data = readData();
      return data.weeks[weekKey] || {};
    },
    setSchedule: async (weekKey, member, daySchedules) => {
      const data = readData();
      if (!data.weeks[weekKey]) data.weeks[weekKey] = {};
      data.weeks[weekKey][member] = daySchedules;
      writeData(data);
    },
    savePlan: async (weekKey, plan) => {
      const data = readData();
      if (!data.plans) data.plans = {};
      data.plans[weekKey] = plan;
      writeData(data);
    },
    getPlan: async (weekKey) => {
      const data = readData();
      return (data.plans && data.plans[weekKey]) || null;
    }
  };
}

// --- Week key calculation ---
function getWeekKey(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day + 1) % 7;
  d.setDate(d.getDate() - diff);
  return d.toISOString().slice(0, 10);
}

// --- Routes ---
app.get('/api/week', async (req, res) => {
  try {
    const weekKey = req.query.week || getWeekKey(new Date());
    const members = await storage.getMembers();
    const schedules = await storage.getWeek(weekKey);
    res.json({ weekKey, members, schedules });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/schedule', async (req, res) => {
  try {
    const { weekKey, member, schedules } = req.body;
    if (!weekKey || !member || !schedules) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    await storage.setSchedule(weekKey, member, schedules);
    res.json({ ok: true });

    // LINE通知（レスポンス後に非同期で送信）
    try {
      const days = Object.entries(schedules)
        .map(([day, data]) => {
          const dinner = data.dinner === 'yes' ? '✅要' : data.dinner === 'no' ? '❌不要' : '❓未定';
          const memo = data.memo ? ` (${data.memo})` : '';
          return `  ${day}: ${dinner}${memo}`;
        }).join('\n');
      await sendLineMessage(`📝 ${member}が予定を更新しました\n\n${days}`);

      // 全員入力完了チェック
      const allMembers = await storage.getMembers();
      const allSchedules = await storage.getWeek(weekKey);
      const completedMembers = allMembers.filter(m => {
        const s = allSchedules[m];
        if (!s) return false;
        return DAYS.every(day => s[day] && (s[day].dinner === 'yes' || s[day].dinner === 'no'));
      });

      if (completedMembers.length === allMembers.length) {
        const summary = buildWeekMessage(allMembers, allSchedules, weekKey);
        await sendLineMessage(`🎉 全員の入力が完了しました！\n\n${summary}`);

        // メニュー提案＋買い物リスト生成
        const dinnerCounts = {};
        for (const day of DAYS) {
          dinnerCounts[day] = allMembers.filter(m => {
            const s = allSchedules[m];
            return s && s[day] && s[day].dinner === 'yes';
          }).length;
        }

        // 月1特別メニュー判定（月初の週）
        const now = new Date();
        const isSpecialWeek = now.getDate() <= 7;

        const plan = generateWeeklyPlan(dinnerCounts, isSpecialWeek);
        await storage.savePlan(weekKey, plan);
        await sendLineMessage(buildMenuMessage(plan));
        await sendLineMessage(buildShoppingMessage(plan));
      }
    } catch (e) {
      console.error('LINE notify error:', e.message);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/members', async (req, res) => {
  try {
    const { members } = req.body;
    if (!Array.isArray(members) || members.length === 0) {
      return res.status(400).json({ error: 'Invalid members' });
    }
    await storage.setMembers(members);
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- LINE webhook (for group ID capture) ---
let capturedGroupId = null;

app.post('/api/webhook', async (req, res) => {
  res.json({ ok: true });

  const events = req.body.events || [];
  for (const event of events) {
    if (event.source && event.source.groupId) {
      capturedGroupId = event.source.groupId;
    }

    // テキストメッセージへの返信
    if (event.type === 'message' && event.message.type === 'text') {
      const text = event.message.text.trim();
      const replyToken = event.replyToken;

      try {
        if (text === '今週' || text === 'まとめ' || text === '予定') {
          const weekKey = getWeekKey(new Date());
          const members = await storage.getMembers();
          const schedules = await storage.getWeek(weekKey);
          const message = buildWeekMessage(members, schedules, weekKey);
          await replyLineMessage(replyToken, message);
        } else if (text === '今日') {
          const weekKey = getWeekKey(new Date());
          const members = await storage.getMembers();
          const schedules = await storage.getWeek(weekKey);
          const today = new Date();
          const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
          const todayName = dayNames[today.getDay()];
          const dateStr = `${today.getMonth() + 1}/${today.getDate()}`;

          let needCount = 0;
          const lines = [`🍚 今日（${todayName} ${dateStr}）の夕食`, ''];
          for (const m of members) {
            const s = schedules[m];
            const dayData = s ? s[todayName] : null;
            const dinner = dayData ? dayData.dinner : null;
            const memo = dayData && dayData.memo ? ` (${dayData.memo})` : '';
            if (dinner === 'yes') { lines.push(`  ✅ ${m}${memo}`); needCount++; }
            else if (dinner === 'no') { lines.push(`  ❌ ${m}${memo}`); }
            else { lines.push(`  ❓ ${m}（未入力）`); }
          }
          lines.push('', `👨‍👩‍👧‍👦 ${needCount}人分`);
          await replyLineMessage(replyToken, lines.join('\n'));
        } else if (text === '献立' || text === 'メニュー') {
          const weekKey = getWeekKey(new Date());
          const plan = await storage.getPlan(weekKey);
          if (plan) {
            await replyLineMessage(replyToken, buildMenuMessage(plan));
          } else {
            await replyLineMessage(replyToken, 'まだ今週の献立が作成されていません。全員の入力が完了すると自動生成されます。');
          }
        } else if (text === '買い物' || text === '買い物リスト') {
          const weekKey = getWeekKey(new Date());
          const plan = await storage.getPlan(weekKey);
          if (plan) {
            await replyLineMessage(replyToken, buildShoppingMessage(plan));
          } else {
            await replyLineMessage(replyToken, 'まだ今週の買い物リストが作成されていません。全員の入力が完了すると自動生成されます。');
          }
        } else if (text === 'レシピ' || text === '今日のレシピ') {
          const weekKey = getWeekKey(new Date());
          const plan = await storage.getPlan(weekKey);
          if (!plan) {
            await replyLineMessage(replyToken, 'まだ今週の献立が作成されていません。');
          } else {
            const today = new Date();
            const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
            const todayName = dayNames[today.getDay()];
            const item = plan.menu.find(m => m.day === todayName);
            if (item && item.recipe) {
              await replyLineMessage(replyToken, buildRecipeMessage(todayName, item.recipe, item.count));
            } else {
              await replyLineMessage(replyToken, `今日（${todayName}）は夕食なしです。`);
            }
          }
        } else if (/^(土|日|月|火|水|木|金)(曜)?のレシピ$/.test(text)) {
          const dayName = text.charAt(0);
          const weekKey = getWeekKey(new Date());
          const plan = await storage.getPlan(weekKey);
          if (!plan) {
            await replyLineMessage(replyToken, 'まだ今週の献立が作成されていません。');
          } else {
            const item = plan.menu.find(m => m.day === dayName);
            if (item && item.recipe) {
              await replyLineMessage(replyToken, buildRecipeMessage(dayName, item.recipe, item.count));
            } else {
              await replyLineMessage(replyToken, `${dayName}曜は夕食なしです。`);
            }
          }
        } else if (text === 'ヘルプ' || text === 'help') {
          await replyLineMessage(replyToken,
            '📖 使い方\n\n「今日」→ 今日の夕食状況\n「今週」→ 今週のまとめ\n「献立」→ 今週の献立\n「買い物」→ 買い物リスト\n「レシピ」→ 今日のレシピ\n「○曜のレシピ」→ 指定日のレシピ\n「ヘルプ」→ この説明'
          );
        }
      } catch (e) {
        console.error('Reply error:', e.message);
      }
    }
  }
});

app.get('/api/group-id', (req, res) => {
  res.json({ groupId: capturedGroupId });
});

// --- LINE notification ---
const DAYS = ['土', '日', '月', '火', '水', '木', '金'];

function buildWeekMessage(members, schedules, weekKey) {
  const sat = new Date(weekKey + 'T00:00:00');
  const lines = ['🍚 今週の夕食スケジュール', ''];

  for (let i = 0; i < DAYS.length; i++) {
    const d = new Date(sat);
    d.setDate(d.getDate() + i);
    const dateStr = `${d.getMonth() + 1}/${d.getDate()}`;

    const statuses = members.map(m => {
      const sched = schedules[m];
      const dayData = sched ? sched[DAYS[i]] : null;
      const dinner = dayData ? dayData.dinner : null;
      const memo = dayData && dayData.memo ? ` (${dayData.memo})` : '';
      if (dinner === 'yes') return `  ✅ ${m}${memo}`;
      if (dinner === 'no') return `  ❌ ${m}${memo}`;
      return `  ❓ ${m}（未入力）`;
    });

    const needCount = members.filter(m => {
      const sched = schedules[m];
      const dayData = sched ? sched[DAYS[i]] : null;
      return dayData && dayData.dinner === 'yes';
    }).length;

    lines.push(`【${DAYS[i]} ${dateStr}】 ${needCount}人`);
    lines.push(...statuses);
    lines.push('');
  }

  return lines.join('\n');
}

async function replyLineMessage(replyToken, text) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) return false;

  const res = await fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      replyToken,
      messages: [{ type: 'text', text }]
    })
  });

  if (!res.ok) {
    console.error('LINE reply error:', res.status, await res.text());
    return false;
  }
  return true;
}

async function sendLineMessage(text) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const groupId = process.env.LINE_GROUP_ID;
  if (!token || !groupId) {
    console.error('LINE credentials not configured');
    return false;
  }

  const res = await fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      to: groupId,
      messages: [{ type: 'text', text }]
    })
  });

  if (!res.ok) {
    console.error('LINE API error:', res.status, await res.text());
    return false;
  }
  return true;
}

app.post('/api/notify', async (req, res) => {
  try {
    const secret = req.headers['x-notify-secret'];
    if (process.env.NOTIFY_SECRET && secret !== process.env.NOTIFY_SECRET) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const weekKey = getWeekKey(new Date());
    const members = await storage.getMembers();
    const schedules = await storage.getWeek(weekKey);
    const message = buildWeekMessage(members, schedules, weekKey);
    const sent = await sendLineMessage(message);

    res.json({ ok: sent, message: sent ? 'Sent' : 'Failed to send' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- Start ---
(async () => {
  await storage.init();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n  家族スケジュールアプリ起動中！ ポート: ${PORT}\n`);
  });
})();
