const express = require('express');
const path = require('path');

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
    ssl: { rejectUnauthorized: false }
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
      for (const [day, data] of Object.entries(daySchedules)) {
        await pool.query(`
          INSERT INTO schedules (week_key, member, day, dinner, memo)
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (week_key, member, day)
          DO UPDATE SET dinner = $4, memo = $5
        `, [weekKey, member, day, data.dinner || '', data.memo || '']);
      }
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

// --- Start ---
(async () => {
  await storage.init();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n  家族スケジュールアプリ起動中！ ポート: ${PORT}\n`);
  });
})();
