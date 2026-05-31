// === レシピデータベース ===
// 各材料: { name, perPerson: 1人分の量, unit, category, canFreeze }
// category: meat, fish, vegetable, staple, sauce, other
// canFreeze: 冷凍可能かどうか

const RECIPES = {
  // --- 週末向け（時間をかけてOK）---
  weekend: [
    {
      name: 'カレーライス',
      meat: 'pork',
      time: 60,
      ingredients: [
        { name: '豚こま切れ肉', perPerson: 100, unit: 'g', category: 'meat', canFreeze: true },
        { name: 'じゃがいも', perPerson: 1, unit: '個', category: 'vegetable' },
        { name: 'にんじん', perPerson: 0.5, unit: '本', category: 'vegetable' },
        { name: '玉ねぎ', perPerson: 0.5, unit: '個', category: 'vegetable' },
        { name: 'カレールー', perPerson: 1, unit: '皿分', category: 'sauce' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
    {
      name: '鶏の唐揚げ',
      meat: 'chicken',
      time: 40,
      ingredients: [
        { name: '鶏もも肉', perPerson: 150, unit: 'g', category: 'meat', canFreeze: true },
        { name: 'キャベツ（付け合わせ）', perPerson: 50, unit: 'g', category: 'vegetable' },
        { name: 'レタス', perPerson: 30, unit: 'g', category: 'vegetable' },
        { name: 'トマト', perPerson: 0.25, unit: '個', category: 'vegetable' },
        { name: '片栗粉', perPerson: 15, unit: 'g', category: 'staple' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
    {
      name: '豚の角煮',
      meat: 'pork',
      time: 90,
      ingredients: [
        { name: '豚バラブロック', perPerson: 150, unit: 'g', category: 'meat', canFreeze: true },
        { name: 'ネギ', perPerson: 0.25, unit: '本', category: 'vegetable' },
        { name: 'ゆで卵', perPerson: 1, unit: '個', category: 'other' },
        { name: 'ほうれん草（付け合わせ）', perPerson: 50, unit: 'g', category: 'vegetable' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
    {
      name: 'ハンバーグ',
      meat: 'pork',
      time: 45,
      ingredients: [
        { name: '合いびき肉', perPerson: 150, unit: 'g', category: 'meat', canFreeze: true },
        { name: '玉ねぎ', perPerson: 0.25, unit: '個', category: 'vegetable' },
        { name: 'パン粉', perPerson: 10, unit: 'g', category: 'staple' },
        { name: '卵', perPerson: 0.25, unit: '個', category: 'other' },
        { name: 'キャベツ（付け合わせ）', perPerson: 50, unit: 'g', category: 'vegetable' },
        { name: 'トマト', perPerson: 0.25, unit: '個', category: 'vegetable' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
    {
      name: 'チキン南蛮',
      meat: 'chicken',
      time: 45,
      ingredients: [
        { name: '鶏むね肉', perPerson: 150, unit: 'g', category: 'meat', canFreeze: true },
        { name: '卵', perPerson: 0.5, unit: '個', category: 'other' },
        { name: '玉ねぎ', perPerson: 0.25, unit: '個', category: 'vegetable' },
        { name: 'キャベツ（付け合わせ）', perPerson: 50, unit: 'g', category: 'vegetable' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
    {
      name: '手作り餃子',
      meat: 'pork',
      time: 60,
      ingredients: [
        { name: '豚ひき肉', perPerson: 100, unit: 'g', category: 'meat', canFreeze: true },
        { name: 'キャベツ', perPerson: 80, unit: 'g', category: 'vegetable' },
        { name: 'ニラ', perPerson: 20, unit: 'g', category: 'vegetable' },
        { name: '餃子の皮', perPerson: 10, unit: '枚', category: 'staple' },
        { name: 'ネギ', perPerson: 0.15, unit: '本', category: 'vegetable' },
        { name: '米', perPerson: 0.5, unit: '合', category: 'staple' },
      ]
    },
    {
      name: '刺身盛り合わせ',
      meat: 'fish',
      time: 10,
      ingredients: [
        { name: '刺身盛り合わせ', perPerson: 100, unit: 'g', category: 'fish' },
        { name: '大根（つま）', perPerson: 30, unit: 'g', category: 'vegetable' },
        { name: '味噌汁用豆腐', perPerson: 50, unit: 'g', category: 'other' },
        { name: 'ネギ', perPerson: 0.1, unit: '本', category: 'vegetable' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
  ],

  // --- 平日向け（時短重視）---
  weekday: [
    {
      name: '豚の生姜焼き',
      meat: 'pork',
      time: 15,
      ingredients: [
        { name: '豚ロース薄切り', perPerson: 120, unit: 'g', category: 'meat', canFreeze: true },
        { name: '玉ねぎ', perPerson: 0.25, unit: '個', category: 'vegetable' },
        { name: 'キャベツ（付け合わせ）', perPerson: 50, unit: 'g', category: 'vegetable' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
    {
      name: '鶏の照り焼き',
      meat: 'chicken',
      time: 20,
      ingredients: [
        { name: '鶏もも肉', perPerson: 130, unit: 'g', category: 'meat', canFreeze: true },
        { name: 'レタス', perPerson: 30, unit: 'g', category: 'vegetable' },
        { name: 'トマト', perPerson: 0.25, unit: '個', category: 'vegetable' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
    {
      name: '豚キムチ炒め',
      meat: 'pork',
      time: 15,
      ingredients: [
        { name: '豚こま切れ肉', perPerson: 100, unit: 'g', category: 'meat', canFreeze: true },
        { name: 'キムチ', perPerson: 50, unit: 'g', category: 'other' },
        { name: 'ニラ', perPerson: 20, unit: 'g', category: 'vegetable' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
    {
      name: '親子丼',
      meat: 'chicken',
      time: 15,
      ingredients: [
        { name: '鶏もも肉', perPerson: 100, unit: 'g', category: 'meat', canFreeze: true },
        { name: '玉ねぎ', perPerson: 0.25, unit: '個', category: 'vegetable' },
        { name: '卵', perPerson: 1.5, unit: '個', category: 'other' },
        { name: 'ネギ', perPerson: 0.1, unit: '本', category: 'vegetable' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
    {
      name: '肉野菜炒め',
      meat: 'pork',
      time: 15,
      ingredients: [
        { name: '豚こま切れ肉', perPerson: 100, unit: 'g', category: 'meat', canFreeze: true },
        { name: 'キャベツ', perPerson: 60, unit: 'g', category: 'vegetable' },
        { name: 'にんじん', perPerson: 0.2, unit: '本', category: 'vegetable' },
        { name: 'しめじ', perPerson: 25, unit: 'g', category: 'vegetable' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
    {
      name: 'チキンソテー',
      meat: 'chicken',
      time: 20,
      ingredients: [
        { name: '鶏むね肉', perPerson: 130, unit: 'g', category: 'meat', canFreeze: true },
        { name: 'じゃがいも', perPerson: 0.5, unit: '個', category: 'vegetable' },
        { name: 'ほうれん草', perPerson: 40, unit: 'g', category: 'vegetable' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
    {
      name: 'そぼろ丼',
      meat: 'chicken',
      time: 15,
      ingredients: [
        { name: '鶏ひき肉', perPerson: 100, unit: 'g', category: 'meat', canFreeze: true },
        { name: '卵', perPerson: 1, unit: '個', category: 'other' },
        { name: '小松菜', perPerson: 40, unit: 'g', category: 'vegetable' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
    {
      name: 'ナスと豚肉の味噌炒め',
      meat: 'pork',
      time: 15,
      ingredients: [
        { name: '豚こま切れ肉', perPerson: 100, unit: 'g', category: 'meat', canFreeze: true },
        { name: 'ナス', perPerson: 1, unit: '本', category: 'vegetable' },
        { name: 'ネギ', perPerson: 0.15, unit: '本', category: 'vegetable' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
  ],

  // --- Cook-Do系（調味タレ使用）---
  cookdo: [
    {
      name: '回鍋肉（Cook-Do）',
      meat: 'pork',
      time: 10,
      ingredients: [
        { name: '豚バラ薄切り', perPerson: 100, unit: 'g', category: 'meat', canFreeze: true },
        { name: 'キャベツ', perPerson: 80, unit: 'g', category: 'vegetable' },
        { name: 'ネギ', perPerson: 0.15, unit: '本', category: 'vegetable' },
        { name: 'Cook-Do 回鍋肉', perPerson: 0.25, unit: '箱', category: 'sauce' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
    {
      name: '麻婆豆腐（Cook-Do）',
      meat: 'pork',
      time: 10,
      ingredients: [
        { name: '豚ひき肉', perPerson: 60, unit: 'g', category: 'meat', canFreeze: true },
        { name: '豆腐', perPerson: 100, unit: 'g', category: 'other' },
        { name: 'ネギ', perPerson: 0.1, unit: '本', category: 'vegetable' },
        { name: 'Cook-Do 麻婆豆腐', perPerson: 0.25, unit: '箱', category: 'sauce' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
    {
      name: '青椒肉絲（Cook-Do）',
      meat: 'pork',
      time: 10,
      ingredients: [
        { name: '豚こま切れ肉', perPerson: 100, unit: 'g', category: 'meat', canFreeze: true },
        { name: 'ピーマン', perPerson: 1, unit: '個', category: 'vegetable' },
        { name: 'たけのこ水煮', perPerson: 30, unit: 'g', category: 'vegetable' },
        { name: 'Cook-Do 青椒肉絲', perPerson: 0.25, unit: '箱', category: 'sauce' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
    {
      name: 'エビチリ（Cook-Do）',
      meat: 'other',
      time: 10,
      ingredients: [
        { name: 'むきエビ', perPerson: 80, unit: 'g', category: 'fish', canFreeze: true },
        { name: 'ネギ', perPerson: 0.1, unit: '本', category: 'vegetable' },
        { name: 'レタス', perPerson: 30, unit: 'g', category: 'vegetable' },
        { name: 'Cook-Do エビチリ', perPerson: 0.25, unit: '箱', category: 'sauce' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
  ],

  // --- 魚料理（グリル焼き中心）---
  fish: [
    {
      name: '鮭の塩焼き',
      meat: 'fish',
      time: 15,
      ingredients: [
        { name: '鮭切り身', perPerson: 1, unit: '切れ', category: 'fish', canFreeze: true },
        { name: '大根おろし', perPerson: 50, unit: 'g', category: 'vegetable' },
        { name: 'ほうれん草（おひたし）', perPerson: 50, unit: 'g', category: 'vegetable' },
        { name: '味噌汁用豆腐', perPerson: 50, unit: 'g', category: 'other' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
    {
      name: 'さばの塩焼き',
      meat: 'fish',
      time: 15,
      ingredients: [
        { name: 'さば切り身', perPerson: 1, unit: '切れ', category: 'fish', canFreeze: true },
        { name: '大根おろし', perPerson: 50, unit: 'g', category: 'vegetable' },
        { name: '小松菜（おひたし）', perPerson: 50, unit: 'g', category: 'vegetable' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
    {
      name: 'ほっけの開き',
      meat: 'fish',
      time: 15,
      ingredients: [
        { name: 'ほっけの開き', perPerson: 0.5, unit: '枚', category: 'fish', canFreeze: true },
        { name: '大根おろし', perPerson: 50, unit: 'g', category: 'vegetable' },
        { name: 'きゅうり（酢の物）', perPerson: 0.5, unit: '本', category: 'vegetable' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
  ],

  // --- 月1特別メニュー（牛肉・珍しい野菜）---
  special: [
    {
      name: '牛丼',
      meat: 'beef',
      time: 20,
      ingredients: [
        { name: '牛バラ薄切り', perPerson: 120, unit: 'g', category: 'meat', canFreeze: true },
        { name: '玉ねぎ', perPerson: 0.5, unit: '個', category: 'vegetable' },
        { name: '卵', perPerson: 1, unit: '個', category: 'other' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
    {
      name: 'ビーフシチュー',
      meat: 'beef',
      time: 90,
      forWeekend: true,
      ingredients: [
        { name: '牛すね肉', perPerson: 130, unit: 'g', category: 'meat', canFreeze: true },
        { name: 'じゃがいも', perPerson: 1, unit: '個', category: 'vegetable' },
        { name: 'にんじん', perPerson: 0.5, unit: '本', category: 'vegetable' },
        { name: '玉ねぎ', perPerson: 0.5, unit: '個', category: 'vegetable' },
        { name: 'ブロッコリー', perPerson: 30, unit: 'g', category: 'vegetable' },
        { name: 'ビーフシチュールー', perPerson: 1, unit: '皿分', category: 'sauce' },
        { name: 'パン', perPerson: 1, unit: '個', category: 'staple' },
      ]
    },
    {
      name: '肉じゃが（牛）',
      meat: 'beef',
      time: 30,
      ingredients: [
        { name: '牛こま切れ肉', perPerson: 100, unit: 'g', category: 'meat', canFreeze: true },
        { name: 'じゃがいも', perPerson: 1.5, unit: '個', category: 'vegetable' },
        { name: '玉ねぎ', perPerson: 0.5, unit: '個', category: 'vegetable' },
        { name: 'にんじん', perPerson: 0.3, unit: '本', category: 'vegetable' },
        { name: '糸こんにゃく', perPerson: 30, unit: 'g', category: 'other' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
    {
      name: 'アスパラと牛肉のオイスター炒め',
      meat: 'beef',
      time: 15,
      ingredients: [
        { name: '牛こま切れ肉', perPerson: 100, unit: 'g', category: 'meat', canFreeze: true },
        { name: 'アスパラガス', perPerson: 2, unit: '本', category: 'vegetable' },
        { name: 'エリンギ', perPerson: 0.5, unit: '本', category: 'vegetable' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
    {
      name: 'ゴーヤチャンプルー',
      meat: 'pork',
      time: 20,
      ingredients: [
        { name: '豚バラ薄切り', perPerson: 80, unit: 'g', category: 'meat', canFreeze: true },
        { name: 'ゴーヤ', perPerson: 0.25, unit: '本', category: 'vegetable' },
        { name: '木綿豆腐', perPerson: 75, unit: 'g', category: 'other' },
        { name: '卵', perPerson: 0.5, unit: '個', category: 'other' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ]
    },
  ]
};

// === メニュー選定ロジック ===
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomExcluding(arr, excludeNames) {
  const filtered = arr.filter(r => !excludeNames.includes(r.name));
  if (filtered.length === 0) return pickRandom(arr);
  return filtered;
}

/**
 * 1週間分のメニューを生成する
 * @param {Object} dinnerCounts - 各曜日の夕食人数 { '土': 4, '日': 3, ... }
 * @param {boolean} isSpecialWeek - 月1の特別メニュー週かどうか
 * @returns {Object} { menu: [...], shoppingList: [...] }
 */
function generateWeeklyPlan(dinnerCounts, isSpecialWeek = false) {
  const DAYS = ['土', '日', '月', '火', '水', '木', '金'];
  const usedNames = [];
  const menu = [];

  // 魚の日を平日からランダムに1日選ぶ
  const weekdayIndices = [2, 3, 4, 5, 6]; // 月〜金
  const activeDays = weekdayIndices.filter(i => dinnerCounts[DAYS[i]] > 0);
  const fishDayIndex = activeDays.length > 0
    ? activeDays[Math.floor(Math.random() * activeDays.length)]
    : -1;

  // Cook-Do の日を平日から1〜2日選ぶ（魚の日は除く）
  const cookdoCandidates = activeDays.filter(i => i !== fishDayIndex);
  const cookdoCount = Math.min(Math.random() < 0.5 ? 1 : 2, cookdoCandidates.length);
  const cookdoDays = [];
  const tempCandidates = [...cookdoCandidates];
  for (let i = 0; i < cookdoCount; i++) {
    if (tempCandidates.length === 0) break;
    const idx = Math.floor(Math.random() * tempCandidates.length);
    cookdoDays.push(tempCandidates.splice(idx, 1)[0]);
  }

  // 特別メニューの日（月1: 週末に配置）
  let specialDayIndex = -1;
  if (isSpecialWeek) {
    const weekendActive = [0, 1].filter(i => dinnerCounts[DAYS[i]] > 0);
    if (weekendActive.length > 0) {
      specialDayIndex = weekendActive[Math.floor(Math.random() * weekendActive.length)];
    }
  }

  for (let i = 0; i < DAYS.length; i++) {
    const day = DAYS[i];
    const count = dinnerCounts[day] || 0;

    if (count === 0) {
      menu.push({ day, recipe: null, count: 0 });
      continue;
    }

    let recipe;
    const available = (arr) => pickRandomExcluding(arr, usedNames);

    if (i === specialDayIndex) {
      // 特別メニュー（牛肉等）
      const pool = available(RECIPES.special);
      const weekendOnly = pool.filter(r => r.forWeekend);
      recipe = pickRandom(weekendOnly.length > 0 && (i <= 1) ? weekendOnly : pool);
    } else if (i <= 1) {
      // 週末
      const pool = available(RECIPES.weekend);
      recipe = pickRandom(pool);
    } else if (i === fishDayIndex) {
      // 魚の日
      const pool = available(RECIPES.fish);
      recipe = pickRandom(pool);
    } else if (cookdoDays.includes(i)) {
      // Cook-Do の日
      const pool = available(RECIPES.cookdo);
      recipe = pickRandom(pool);
    } else {
      // 通常平日
      const pool = available(RECIPES.weekday);
      recipe = pickRandom(pool);
    }

    usedNames.push(recipe.name);
    menu.push({ day, recipe, count });
  }

  // === 買い物リスト生成 ===
  const shoppingMap = {}; // { itemName: { total, unit, category, canFreeze, days: [] } }

  for (const item of menu) {
    if (!item.recipe || item.count === 0) continue;
    for (const ing of item.recipe.ingredients) {
      const key = ing.name;
      if (!shoppingMap[key]) {
        shoppingMap[key] = {
          total: 0,
          unit: ing.unit,
          category: ing.category,
          canFreeze: ing.canFreeze || false,
          days: []
        };
      }
      shoppingMap[key].total += ing.perPerson * item.count;
      shoppingMap[key].days.push(item.day);
    }
  }

  // 飲料水を追加
  shoppingMap['飲料水（2L）'] = {
    total: 6,
    unit: '本',
    category: 'other',
    canFreeze: false,
    days: []
  };

  // 数量を整理（端数を切り上げ）
  const shoppingList = Object.entries(shoppingMap).map(([name, info]) => {
    let total = info.total;
    // g単位は10g刻み、それ以外は0.5刻みで切り上げ
    if (info.unit === 'g') {
      total = Math.ceil(total / 10) * 10;
    } else if (info.unit === '合' || info.unit === '皿分') {
      total = Math.ceil(total);
    } else {
      total = Math.ceil(total * 2) / 2; // 0.5刻み
    }

    // 冷凍メモ: 土日以外に使う肉・魚は冷凍
    const needsFreeze = info.canFreeze &&
      info.days.some(d => !['土', '日'].includes(d));

    return {
      name,
      total,
      unit: info.unit,
      category: info.category,
      needsFreeze,
      days: info.days
    };
  });

  // カテゴリ順にソート
  const categoryOrder = { meat: 0, fish: 1, vegetable: 2, staple: 3, sauce: 4, other: 5 };
  shoppingList.sort((a, b) => (categoryOrder[a.category] || 9) - (categoryOrder[b.category] || 9));

  return { menu, shoppingList };
}

// === LINE メッセージ生成 ===
function buildMenuMessage(plan) {
  const lines = ['📋 今週の献立', ''];

  for (const item of plan.menu) {
    if (item.count === 0) {
      lines.push(`【${item.day}】 夕食なし`);
    } else {
      const timeStr = item.recipe.time ? `⏱${item.recipe.time}分` : '';
      lines.push(`【${item.day}】 ${item.recipe.name} ${timeStr}`);
      lines.push(`  👨‍👩‍👧‍👦 ${item.count}人分`);
    }
  }

  return lines.join('\n');
}

function buildShoppingMessage(plan) {
  const categoryLabels = {
    meat: '🥩 肉類',
    fish: '🐟 魚介類',
    vegetable: '🥬 野菜',
    staple: '🍚 主食・粉類',
    sauce: '🫙 調味料・タレ',
    other: '📦 その他'
  };

  const lines = ['🛒 買い物リスト（1週間分）', ''];

  let currentCategory = '';
  for (const item of plan.shoppingList) {
    const catLabel = categoryLabels[item.category] || '📦 その他';
    if (catLabel !== currentCategory) {
      currentCategory = catLabel;
      lines.push(catLabel);
    }

    const freezeTag = item.needsFreeze ? ' ❄冷凍' : '';
    const dayTag = item.days.length > 0 ? `（${item.days.join('・')}）` : '';
    lines.push(`  ${item.name}: ${item.total}${item.unit}${freezeTag}${dayTag}`);
  }

  return lines.join('\n');
}

module.exports = { generateWeeklyPlan, buildMenuMessage, buildShoppingMessage };
