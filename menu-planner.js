// === レシピデータベース ===
// 各材料: { name, perPerson: 1人分の量, unit, category, canFreeze }
// category: meat, fish, vegetable, staple, sauce, other
// canFreeze: 冷凍可能かどうか
//
// ⚠ アレルギー除外: エビ・カニ（甲殻類）、ナッツ類（カシューナッツ、ヘーゼルナッツ、ピスタチオ）
// これらを含むレシピ・食材は使用しないこと

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
      ],
      steps: [
        '米を研いで炊飯器にセット',
        '野菜を一口大に切る（じゃがいも・にんじん・玉ねぎ）',
        '鍋に油を熱し、豚肉を炒める',
        '玉ねぎを加えて透き通るまで炒める',
        'にんじん・じゃがいもを加えて軽く炒める',
        '水を加えて中火で20分煮る（アクを取る）',
        '火を止めてカレールーを溶かし入れる',
        'とろみがつくまで弱火で10分煮込む',
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
      ],
      steps: [
        '鶏もも肉を一口大に切る',
        'しょうゆ・酒・おろし生姜・おろしにんにくで下味をつけ15分漬ける',
        '片栗粉をまぶす',
        '170℃の油で4〜5分揚げる',
        '一度取り出して3分休ませ、180℃で1〜2分二度揚げ',
        'キャベツ・レタス・トマトを添えて盛り付け',
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
      ],
      steps: [
        '豚バラブロックを3〜4cm角に切る',
        'フライパンで全面に焼き色をつける',
        '鍋に移し、水・酒・砂糖・しょうゆ・ネギの青い部分を入れる',
        '落とし蓋をして弱火で60分煮込む',
        'ゆで卵を作り、煮汁に漬ける',
        'ほうれん草を茹でて添える',
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
      ],
      steps: [
        '玉ねぎをみじん切りにし、レンジ600Wで2分加熱して冷ます',
        'ひき肉・玉ねぎ・パン粉・卵・塩こしょうを混ぜてよくこねる',
        '小判型に成形し、中央をくぼませる',
        'フライパンに油を熱し、強火で片面2分焼く',
        '裏返して蓋をし、弱火で8分蒸し焼き',
        'ケチャップ・ウスターソース・水を煮詰めてソースにする',
        'キャベツ・トマトを添えて盛り付け',
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
      ],
      steps: [
        '鶏むね肉をそぎ切りにし、塩こしょうで下味',
        '小麦粉をまぶし、溶き卵にくぐらせる',
        '170℃の油で4〜5分揚げる',
        '甘酢だれ（酢・砂糖・しょうゆ各大さじ2）を作る',
        '揚げたてを甘酢だれに漬ける',
        'タルタルソース（ゆで卵・玉ねぎみじん切り・マヨネーズ）をかける',
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
      ],
      steps: [
        'キャベツをみじん切りにし、塩もみして水気を絞る',
        'ニラ・ネギをみじん切りにする',
        'ひき肉・野菜・しょうゆ・ごま油・おろし生姜を混ぜる',
        '皮に餡をのせて包む',
        'フライパンに油を熱し、餃子を並べて中火で2分焼く',
        '水を餃子の高さ1/3まで入れ、蓋をして5分蒸し焼き',
        '蓋を取り、水分を飛ばしてパリッと仕上げる',
      ]
    },
    {
      name: '刺身盛り合わせ（エビ・カニ抜き）',
      meat: 'fish',
      time: 10,
      ingredients: [
        { name: '刺身盛り合わせ（エビ・カニ抜き）', perPerson: 100, unit: 'g', category: 'fish' },
        { name: '大根（つま）', perPerson: 30, unit: 'g', category: 'vegetable' },
        { name: '味噌汁用豆腐', perPerson: 50, unit: 'g', category: 'other' },
        { name: 'ネギ', perPerson: 0.1, unit: '本', category: 'vegetable' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ],
      steps: [
        '刺身を冷蔵庫から出し、皿に盛り付ける',
        '大根をつまにして添える',
        '味噌汁を作る（豆腐・ネギ）',
        'ご飯を盛って完成',
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
      ],
      steps: [
        'キャベツを千切りにして皿に盛る',
        '玉ねぎを薄切りにする',
        'タレを作る（しょうゆ・酒・みりん各大さじ2、おろし生姜小さじ1）',
        'フライパンに油を熱し、豚肉を広げて焼く',
        '玉ねぎを加えてしんなりするまで炒める',
        'タレを回し入れ、絡めて完成',
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
      ],
      steps: [
        '鶏もも肉の厚い部分を開いて均一にする',
        'フライパンに皮目を下にして入れ、中火で5分焼く',
        '裏返して3分焼く',
        'しょうゆ・みりん・酒・砂糖各大さじ1を入れて煮絡める',
        '食べやすく切り、レタス・トマトを添える',
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
      ],
      steps: [
        'ニラを4〜5cm幅に切る',
        'フライパンにごま油を熱し、豚肉を炒める',
        '色が変わったらキムチを加えて炒める',
        'ニラを加えてさっと炒め合わせる',
        'しょうゆ少々で味を調える',
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
      ],
      steps: [
        '鶏もも肉を一口大に切る、玉ねぎを薄切りにする',
        '鍋にだし汁・しょうゆ・みりん・砂糖を入れて煮立てる',
        '玉ねぎと鶏肉を入れて中火で5分煮る',
        '溶き卵の2/3を回し入れ、30秒待つ',
        '残りの卵を回し入れ、半熟で火を止める',
        'ご飯の上にのせ、ネギを散らす',
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
      ],
      steps: [
        'キャベツをざく切り、にんじんを短冊切り、しめじをほぐす',
        'フライパンに油を熱し、豚肉を炒める',
        'にんじんを加えて1分炒める',
        'キャベツ・しめじを加えて強火でさっと炒める',
        '塩こしょう・鶏ガラスープの素で味付け',
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
      ],
      steps: [
        '鶏むね肉をそぎ切りにし、塩こしょう・酒で下味',
        'じゃがいもを薄切りにしてレンジ600Wで2分加熱',
        'フライパンに油を熱し、鶏肉を皮目から中火で4分焼く',
        '裏返して3分焼く',
        'ほうれん草を茹でて添える',
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
      ],
      steps: [
        '鶏ひき肉をフライパンで炒め、しょうゆ・砂糖・みりん・おろし生姜で味付け',
        '菜箸4本でポロポロになるまで炒り煮する',
        '卵を溶き、砂糖少々を加えて炒り卵を作る',
        '小松菜を茹でて3cm幅に切る',
        'ご飯の上に肉そぼろ・炒り卵・小松菜を彩りよく盛る',
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
      ],
      steps: [
        'ナスを乱切りにし、水にさらしてアク抜き',
        '味噌だれを作る（味噌・砂糖・酒・みりん各大さじ1）',
        'フライパンに多めの油を熱し、ナスを炒めて取り出す',
        '豚肉を炒め、色が変わったらナスを戻す',
        '味噌だれを加えて全体に絡める',
        'ネギの小口切りを散らす',
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
      ],
      steps: [
        'キャベツをざく切り、ネギを斜め切りにする',
        'フライパンに油を熱し、豚バラ肉を炒める',
        'キャベツ・ネギを加えて炒める',
        'Cook-Doのソースを加えて全体に絡める',
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
      ],
      steps: [
        '豆腐をさいの目切りにする',
        'フライパンに油を熱し、ひき肉を炒める',
        'Cook-Doのソースと水を加えて煮立てる',
        '豆腐を加えて2〜3分煮る',
        'ネギの小口切りを散らす',
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
      ],
      steps: [
        'ピーマン・たけのこを細切りにする',
        'フライパンに油を熱し、豚肉を炒める',
        'ピーマン・たけのこを加えて炒める',
        'Cook-Doのソースを加えて全体に絡める',
      ]
    },
    {
      name: '豚肉ともやしのオイスター炒め（Cook-Do）',
      meat: 'pork',
      time: 10,
      ingredients: [
        { name: '豚こま切れ肉', perPerson: 100, unit: 'g', category: 'meat', canFreeze: true },
        { name: 'もやし', perPerson: 50, unit: 'g', category: 'vegetable' },
        { name: 'ニラ', perPerson: 20, unit: 'g', category: 'vegetable' },
        { name: 'Cook-Do オイスターソース炒め', perPerson: 0.25, unit: '箱', category: 'sauce' },
        { name: '米', perPerson: 1, unit: '合', category: 'staple' },
      ],
      steps: [
        'ニラを4〜5cm幅に切る',
        'フライパンに油を熱し、豚肉を炒める',
        'もやし・ニラを加えて強火でさっと炒める',
        'Cook-Doのソースを加えて全体に絡める',
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
      ],
      steps: [
        '鮭に軽く塩を振り、10分置いて水気を拭く',
        'グリルを予熱し、中火で片面5分ずつ焼く',
        '大根をおろす',
        'ほうれん草を茹でて3cm幅に切り、しょうゆ・かつお節で和える',
        '味噌汁を作る（豆腐・ネギ）',
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
      ],
      steps: [
        'さばに塩を振り、10分置いて水気を拭く',
        'グリルを予熱し、皮目を上にして中火で7分焼く',
        '裏返して3分焼く',
        '大根をおろす',
        '小松菜を茹でて3cm幅に切り、しょうゆ・かつお節で和える',
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
      ],
      steps: [
        'グリルを予熱する',
        'ほっけを身の面を上にして中火で5分焼く',
        '裏返して皮目を5分焼く',
        '大根をおろす',
        'きゅうりを薄切りにし、塩もみして酢・砂糖で和える',
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
      ],
      steps: [
        '玉ねぎを薄切りにする',
        '鍋に水・しょうゆ・みりん・酒・砂糖・だしの素を煮立てる',
        '玉ねぎを入れて中火で5分煮る',
        '牛肉を加えてほぐしながら5分煮る（アクを取る）',
        'ご飯の上に盛り、お好みで卵をのせる',
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
      ],
      steps: [
        '牛すね肉を大きめに切り、塩こしょうして小麦粉をまぶす',
        '鍋に油を熱し、肉の全面に焼き色をつける',
        '玉ねぎを加えて炒める',
        '水を加え、沸騰したらアクを取り、弱火で40分煮る',
        'にんじん・じゃがいもを加えて20分煮る',
        '火を止めてルーを溶かし、とろみがつくまで10分煮込む',
        'ブロッコリーを別茹でして添える',
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
      ],
      steps: [
        'じゃがいもを一口大、玉ねぎをくし切り、にんじんを乱切りにする',
        '糸こんにゃくを食べやすく切り、下茹でする',
        '鍋に油を熱し、牛肉を炒める',
        '野菜を加えて軽く炒める',
        'だし汁・しょうゆ・砂糖・酒・みりんを加える',
        '落とし蓋をして中火で20分煮る',
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
      ],
      steps: [
        'アスパラの根元を切り落とし、斜め切りにする',
        'エリンギを薄切りにする',
        '牛肉に塩こしょう・酒・片栗粉で下味をつける',
        'フライパンに油を熱し、牛肉を炒めて取り出す',
        'アスパラ・エリンギを炒め、牛肉を戻す',
        'オイスターソース・しょうゆ・酒で味付け',
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
      ],
      steps: [
        'ゴーヤを縦半分に切り、種とワタを取って薄切りにし、塩もみする',
        '豆腐を水切りし、手でちぎる',
        'フライパンに油を熱し、豆腐を焼き色がつくまで焼いて取り出す',
        '豚肉を炒め、ゴーヤを加えて2分炒める',
        '豆腐を戻し、しょうゆ・鶏ガラスープの素で味付け',
        '溶き卵を回し入れ、さっと混ぜて完成',
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
  if (filtered.length === 0) return arr;
  return filtered;
}

/**
 * 1週間分のメニューを生成する
 * @param {Object} dinnerCounts - 各曜日の夕食人数 { '土': 4, '日': 3, ... }
 * @param {boolean} isSpecialWeek - 月1の特別メニュー週かどうか
 * @param {string[]} lastWeekNames - 前週に使ったレシピ名の配列（重複回避用）
 * @returns {Object} { menu: [...], shoppingList: [...] }
 */
function generateWeeklyPlan(dinnerCounts, isSpecialWeek = false, lastWeekNames = []) {
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
    const available = (arr) => pickRandomExcluding(arr, [...usedNames, ...lastWeekNames]);

    if (i === specialDayIndex) {
      const pool = available(RECIPES.special);
      const weekendOnly = pool.filter(r => r.forWeekend);
      recipe = pickRandom(weekendOnly.length > 0 && (i <= 1) ? weekendOnly : pool);
    } else if (i <= 1) {
      const pool = available(RECIPES.weekend);
      recipe = pickRandom(pool);
    } else if (i === fishDayIndex) {
      const pool = available(RECIPES.fish);
      recipe = pickRandom(pool);
    } else if (cookdoDays.includes(i)) {
      const pool = available(RECIPES.cookdo);
      recipe = pickRandom(pool);
    } else {
      const pool = available(RECIPES.weekday);
      recipe = pickRandom(pool);
    }

    usedNames.push(recipe.name);
    menu.push({ day, recipe, count });
  }

  // === 買い物リスト生成 ===
  const shoppingMap = {};

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

  shoppingMap['飲料水（2L）'] = {
    total: 6, unit: '本', category: 'other', canFreeze: false, days: []
  };

  const shoppingList = Object.entries(shoppingMap).map(([name, info]) => {
    let total = info.total;
    if (info.unit === 'g') {
      total = Math.ceil(total / 10) * 10;
    } else if (info.unit === '合' || info.unit === '皿分') {
      total = Math.ceil(total);
    } else {
      total = Math.ceil(total * 2) / 2;
    }

    const needsFreeze = info.canFreeze &&
      info.days.some(d => !['土', '日'].includes(d));

    return { name, total, unit: info.unit, category: info.category, needsFreeze, days: info.days };
  });

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
    meat: '🥩 肉類', fish: '🐟 魚介類', vegetable: '🥬 野菜',
    staple: '🍚 主食・粉類', sauce: '🫙 調味料・タレ', other: '📦 その他'
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

function buildRecipeMessage(dayLabel, recipe, count) {
  if (!recipe) return `【${dayLabel}】は夕食なしです`;

  const lines = [
    `👨‍🍳 ${recipe.name}のレシピ（${count}人分）`,
    `⏱ 調理時間: ${recipe.time}分`,
    '',
    '【材料】'
  ];

  for (const ing of recipe.ingredients) {
    let amount = ing.perPerson * count;
    if (ing.unit === 'g') {
      amount = Math.ceil(amount / 10) * 10;
    } else {
      amount = Math.ceil(amount * 2) / 2;
    }
    lines.push(`  ${ing.name}: ${amount}${ing.unit}`);
  }

  lines.push('', '【作り方】');
  recipe.steps.forEach((step, i) => {
    lines.push(`  ${i + 1}. ${step}`);
  });

  return lines.join('\n');
}

module.exports = { generateWeeklyPlan, buildMenuMessage, buildShoppingMessage, buildRecipeMessage };
