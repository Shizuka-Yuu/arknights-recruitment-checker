export type Language = 'ja' | 'en'

export interface Dictionary {
  ui: {
    title: string
    subtitle: string
    tagSelection: string
    clearAll: string
    clear: string
    selectionStatus: {
      normal: (current: number, max: number) => string
      guaranteed: string
      maxReached: string
    }
    results: {
      allCharacters: (count: number) => string
      searchResults: (count: number) => string
      noResults: string
      guaranteedCombos: string
      characters: string
      comboCount: (count: number) => string
    }
    tagCategories: {
      type: string
      position: string
      tags: string
      confirmed: string
    }
  }
  tags: Record<string, { ja: string; en: string }>
  characters: Record<string, { ja: string; en: string }>
}

export const dictionary: Record<Language, Dictionary> = {
  ja: {
    ui: {
      title: 'アークナイツ 公開求人チェッカー',
      subtitle: 'タグを選択してキャラクターを検索・確定組み合わせを確認',
      tagSelection: 'タグ選択',
      clearAll: 'すべて解除',
      clear: 'クリア',
      selectionStatus: {
        normal: (current, max) => `通常検索 (${current}/${max}) - あと${max - current}タグで確定解析モード`,
        guaranteed: '確定解析モード - 5タグ選択で確定組み合わせを表示',
        maxReached: '✅ 5タグ選択！確定解析モードになりました'
      },
      results: {
        allCharacters: (count) => `全キャラクター (${count}件)`,
        searchResults: (count) => `検索結果 (${count}件)`,
        noResults: '該当するキャラクターがいません',
        guaranteedCombos: '確定組み合わせ',
        characters: 'キャラクター',
        comboCount: (count) => `${count}個の組み合わせ`
      },
      tagCategories: {
        type: 'タイプ',
        position: '位置',
        tags: 'タグ',
        confirmed: '確定'
      }
    },
    tags: {
      '先鋒': { ja: '先鋒', en: 'Vanguard' },
      '前衛': { ja: '前衛', en: 'Guard' },
      '重装': { ja: '重装', en: 'Defender' },
      '狙撃': { ja: '狙撃', en: 'Sniper' },
      '術師': { ja: '術師', en: 'Caster' },
      '医療': { ja: '医療', en: 'Medic' },
      '補助': { ja: '補助', en: 'Supporter' },
      '特殊': { ja: '特殊', en: 'Specialist' },
      '近距離': { ja: '近距離', en: 'Melee' },
      '遠距離': { ja: '遠距離', en: 'Ranged' },
      '火力': { ja: '火力', en: 'DP' },
      'COST回復': { ja: 'COST回復', en: 'DP Recovery' },
      '生存': { ja: '生存', en: 'Survival' },
      '防御': { ja: '防御', en: 'Defense' },
      '治療': { ja: '治療', en: 'Healing' },
      '支援': { ja: '支援', en: 'Support' },
      '範囲攻撃': { ja: '範囲攻撃', en: 'AoE' },
      '弱化': { ja: '弱化', en: 'Weaken' },
      '牽制': { ja: '牽制', en: 'Slow' },
      '爆発力': { ja: '爆発力', en: 'Burst' },
      '強制移動': { ja: '強制移動', en: 'Push' },
      '減速': { ja: '減速', en: 'Slow' },
      '召喚': { ja: '召喚', en: 'Summon' },
      '高速再配置': { ja: '高速再配置', en: 'Fast Redeploy' },
      '元素': { ja: '元素', en: 'Elemental' },
      'ロボット': { ja: 'ロボット', en: 'Robot' },
      '初期': { ja: '初期', en: 'Starter' },
      'エリート': { ja: 'エリート', en: 'Elite' },
      '上級エリート': { ja: '上級エリート', en: 'Senior Elite' }
    },
    characters: {
      // 星6キャラクター
      'saga_icon': { ja: 'サガ', en: 'Saga' },
      'siege_icon': { ja: 'シージ', en: 'Siege' },
      'icon_bagpipe': { ja: 'バグパイプ', en: 'Bagpipe' },
      'silveash_icon': { ja: 'シルバーアッシュ', en: 'SilverAsh' },
      'skadi_icon': { ja: 'スカジ', en: 'Skadi' },
      'icon_surtr': { ja: 'スルト', en: 'Surtr' },
      'icon_thorns': { ja: 'ソーンズ', en: 'Thorns' },
      "icon_ch'en": { ja: 'チェン', en: "Ch'en" },
      'icon_blaze': { ja: 'ブレイズ', en: 'Blaze' },
      'icon_hellagur': { ja: 'ヘラグ', en: 'Hellagur' },
      'icon_mountain': { ja: 'マウンテン', en: 'Mountain' },
      'saria_icon': { ja: 'サリア', en: 'Saria' },
      'icon_blemishine': { ja: 'ブレミシャイン', en: 'Blemishine' },
      'hoshiguma_icon': { ja: 'ホシグマ', en: 'Hoshiguma' },
      'icon_mudrock': { ja: 'マドロック', en: 'Mudrock' },
      'icon_eunectes': { ja: 'ユーネクテス', en: 'Eunectes' },
      'archetto_icon': { ja: 'アルケット', en: 'Archetto' },
      'exusiai_icon': { ja: 'エクシア', en: 'Exusiai' },
      'icon_schwarz': { ja: 'シュヴァルツ', en: 'Schwarz' },
      'icon_rosa': { ja: 'ロサ', en: 'Rosa' },
      'ifrit_icon': { ja: 'イフリータ', en: 'Ifrit' },
      'icon_ceobe': { ja: 'ケオベ', en: 'Ceobe' },
      'passenger_icon': { ja: 'パッセンジャー', en: 'Passenger' },
      'icon_mostima': { ja: 'モスティマ', en: 'Mostima' },
      'shining_icon': { ja: 'シャイニング', en: 'Shining' },
      'nightingale_icon': { ja: 'ナイチンゲール', en: 'Nightingale' },
      'magallan_icon': { ja: 'マゼラン', en: 'Magallan' },
      'icon_suzuran': { ja: 'スズラン', en: 'Suzuran' },
      'icon_aak': { ja: 'ア', en: 'Aak' },
      'icon_phantom': { ja: 'ファントム', en: 'Phantom' },
      'icon_weedy': { ja: 'ウィーディ', en: 'Weedy' },
      // 星5キャラクター
      'icon_chiave': { ja: 'キアーベ', en: 'Chiave' },
      'icon_zima': { ja: 'ズィマー', en: 'Zima' },
      'texas_icon': { ja: 'テキサス', en: 'Texas' },
      'icon_reed': { ja: 'リード', en: 'Reed' },
      'icon_elysium': { ja: 'エリジウム', en: 'Elysium' },
      'icon_astesia': { ja: 'アステシア', en: 'Astesia' },
      'icon_indra': { ja: 'インドラ', en: 'Indra' },
      'specter_icon': { ja: 'スペクター', en: 'Specter' },
      'icon_swire': { ja: 'スワイヤー', en: 'Swire' },
      'flint_icon': { ja: 'フリント', en: 'Flint' },
      'icon_broca': { ja: 'ブローカ', en: 'Broca' },
      'icon_ayerscarpe': { ja: 'エアースカーペ', en: 'Ayercarpe' },
      'vulcan_icon': { ja: 'ヴァルカン', en: 'Vulcan' },
      'icon_hung': { ja: 'ウン', en: 'Hung' },
      'croissant_icon': { ja: 'クロワッサン', en: 'Croissant' },
      'nearl_icon': { ja: 'ニアール', en: 'Nearl' },
      'liskarm_icon': { ja: 'リスカム', en: 'Liskarm' },
      'icon_asbestos': { ja: 'アスベストス', en: 'Asbestos' },
      'icon_aosta': { ja: 'アオスタ', en: 'Aosta' },
      'icon_bluepoison': { ja: 'アズリウス', en: 'Blue Poison' },
      'icon_andreana': { ja: 'アンドレアナ', en: 'Andreana' },
      'icon_executor': { ja: 'イグゼキューター', en: 'Executor' },
      'icon_april': { ja: 'エイプリル', en: 'April' },
      'icon_greythroat': { ja: 'グレースロート', en: 'Greythroat' },
      'icon_sesa': { ja: 'シェーシャ', en: 'Sesa' },
      'toddifons_icon': { ja: 'トギフォンス', en: 'Toddifons' },
      'firewatch_icon': { ja: 'ファイヤーウォッチ', en: 'Firewatch' },
      'platinum_icon': { ja: 'プラチナ', en: 'Platinum' },
      'provence_icon': { ja: 'プロヴァンス', en: 'Provence' },
      'meteorite_icon': { ja: 'メテオリーテ', en: 'Meteorite' },
      'iris_icon': { ja: 'アイリス', en: 'Iris' },
      'nightmare_icon': { ja: 'ナイトメア', en: 'Nightmare' },
      'beeswax_icon': { ja: 'ビーズワクス', en: 'Beeswax' },
      'icon_leizi': { ja: 'レイズ', en: 'Leizi' },
      'icon_leonhardt': { ja: 'レオンハルト', en: 'Leonhardt' },
      'icon_whisperain': { ja: 'ウィスパーレイン', en: 'Whisperain' },
      'icon_silence': { ja: 'サイレンス', en: 'Silence' },
      'ptilopsis_icon': { ja: 'フィリオプシス', en: 'Ptilopsis' },
      'warfarin_icon': { ja: 'ワルファリン', en: 'Warfarin' },
      'icon_istina': { ja: 'イースチナ', en: 'Istina' },
      'icon_glaucus': { ja: 'グラウコス', en: 'Glaucus' },
      'icon_shamare': { ja: 'シャマレ', en: 'Shamare' },
      'pramanix_icon': { ja: 'プラマニクス', en: 'Pramanix' },
      'mayer_icon': { ja: 'メイヤー', en: 'Mayer' },
      'tsukinogi_icon': { ja: 'ツキノギ', en: 'Tsukinogi' },
      'icon_mr.nothing': { ja: 'ウユウ', en: "Mr. Nothing" },
      'feater_icon': { ja: 'エフイーター', en: 'Feater' },
      'kafka_icon': { ja: 'カフカ', en: 'Kafka' },
      'cliffheart_icon': { ja: 'クリフハート', en: 'Cliffheart' },
      'manticore_icon': { ja: 'マンティコア', en: 'Manticore' },
      'projektred_icon': { ja: 'レッド', en: 'Projekt Red' },
      'icon_waaifu': { ja: 'ワイフー', en: "Waai Fu" },
      // 他のレアリティのキャラクターも追加...
      'vigna_icon': { ja: 'ヴィグナ', en: 'Vigna' },
      'scavenger_icon': { ja: 'スカベンジャー', en: 'Scavenger' },
      'myrtle_icon': { ja: 'テンニンカ', en: 'Myrtle' },
      'beanstalk_icon': { ja: 'ビーンストーク', en: 'Beanstalk' },
      'icon_arene': { ja: 'アレーン', en: 'Arene' },
      'icon_utage': { ja: 'ウタゲ', en: 'Utage' },
      'estelle_icon': { ja: 'エステル', en: 'Estelle' },
      'icon_cutter': { ja: 'カッター', en: 'Cutter' },
      'icon_jackie': { ja: 'ジャッキー', en: 'Jackie' },
      'dobermann_icon': { ja: 'ドーベルマン', en: 'Dobermann' },
      'beehunter_icon': { ja: 'ビーハンター', en: 'Beehunter' },
      'frostleaf_icon': { ja: 'フロストリーフ', en: 'Frostleaf' },
      'matoimaru_icon': { ja: 'マトイマル', en: 'Matoimaru' },
      'mousse_icon': { ja: 'ムース', en: 'Mousse' },
      'cuora_icon': { ja: 'クオーラ', en: 'Cuora' },
      'icon_gummy': { ja: 'グム', en: 'Gummy' },
      'icon_bubble': { ja: 'バブル', en: 'Bubble' },
      'matterhorn_icon': { ja: 'マッターホルン', en: 'Matterhorn' },
      'icon_aciddrop': { ja: 'アシッドドロップ', en: 'Aciddrop' },
      'icon_ambriel': { ja: 'アンブリエル', en: 'Ambriel' },
      'vermeil_icon': { ja: 'ヴァーミル', en: 'Vermeil' },
      'jessica_icon': { ja: 'ジェシカ', en: 'Jessica' },
      'icon_shirayuki': { ja: 'シラユキ', en: 'Shirayuki' },
      'pinecone_icon': { ja: 'パインコーン', en: 'Pinecone' },
      'icon_may': { ja: 'メイ', en: 'May' },
      'icon_meteor': { ja: 'メテオ', en: 'Meteor' },
      'gitano_icon': { ja: 'ギターノ', en: 'Gitano' },
      'greyy_icon': { ja: 'グレイ', en: 'Greyy' },
      'haze_icon': { ja: 'ヘイズ', en: 'Haze' },
      'icon_click': { ja: 'カシャ', en: 'Click' },
      'icon_sussurro': { ja: 'ススーロ', en: 'Sussurro' },
      'icon_purestream': { ja: 'セイリュウ', en: 'Purestream' },
      'perfumer_icon': { ja: 'パフューマー', en: 'Perfumer' },
      'myrrh_icon': { ja: 'ミルラ', en: 'Myrrh' },
      'icon_earthspirit': { ja: 'アーススピリット', en: 'Earthspirit' },
      'icon_podenco': { ja: 'ポデンコ', en: 'Podenco' },
      'gravel_icon': { ja: 'グラベル', en: 'Gravel' },
      'icon_jaye': { ja: 'ジェイ', en: 'Jaye' },
      'shaw_icon': { ja: 'ショウ', en: 'Shaw' },
      'rope_icon': { ja: 'ロープ', en: 'Rope' },
      'vanilla_icon': { ja: 'バニラ', en: 'Vanilla' },
      'fang_icon': { ja: 'フェン', en: 'Fang' },
      'icon_plume': { ja: 'プリュム', en: 'Plume' },
      'icon_popukar': { ja: 'ポプカル', en: 'Popukar' },
      'midnight_icon': { ja: 'ミッドナイト', en: 'Midnight' },
      'melantha_icon': { ja: 'メランサ', en: 'Melantha' },
      'icon_spot': { ja: 'スポット', en: 'Spot' },
      'beagle_icon': { ja: 'ビーグル', en: 'Beagle' },
      'icon_adnachiel': { ja: 'アドナキエル', en: 'Adnachiel' },
      'catapult_icon': { ja: 'カタパルト', en: 'Catapult' },
      'icon_kroos': { ja: 'クルース', en: 'Kroos' },
      'icon_steward': { ja: 'スチュワード', en: 'Steward' },
      'icon_lava': { ja: 'ラヴァ', en: 'Lava' },
      'ansel_icon': { ja: 'アンセル', en: 'Ansel' },
      'hibiscus_icon': { ja: 'ハイビスカス', en: 'Hibiscus' },
      'orchid_icon': { ja: 'オーキッド', en: 'Orchid' },
      'yato_icon': { ja: 'ヤトウ', en: 'Yato' },
      'noircorne_icon': { ja: 'ノイルホーン', en: 'Noir Corne' },
      'rangers_icon': { ja: 'レンジャー', en: 'Rangers' },
      '12f_icon': { ja: '12F', en: '12F' },
      'durin_icon': { ja: 'ドゥリン', en: 'Durin' },
      'confess-47_icon': { ja: 'CONFESS-47', en: 'CONFESS-47' },
      'icon_castle-3': { ja: 'Castle-3', en: 'Castle-3' },
      'friston-3_icon': { ja: 'Friston-3', en: 'Friston-3' },
      'justiceknight_icon': { ja: 'ジャスティスナイト', en: 'Justice Knight' },
      'icon_lancet-2': { ja: 'Lancet-2', en: 'Lancet-2' },
      'phonor-0_icon': { ja: 'PhonoR-0', en: 'PhonoR-0' },
      'icon_thermal-ex': { ja: 'THRM-EX', en: 'THRM-EX' }
    }
  },
  en: {
    ui: {
      title: 'Arknights Recruitment Checker',
      subtitle: 'Select tags to search characters and check guaranteed combinations',
      tagSelection: 'Tag Selection',
      clearAll: 'Clear All',
      clear: 'Clear',
      selectionStatus: {
        normal: (current, max) => `Normal Search (${current}/${max}) - ${max - current} more tags for Guaranteed Analysis`,
        guaranteed: 'Guaranteed Analysis Mode - 5 tags selected for guaranteed combinations',
        maxReached: '✅ 5 tags selected! Guaranteed Analysis Mode activated'
      },
      results: {
        allCharacters: (count) => `All Characters (${count})`,
        searchResults: (count) => `Search Results (${count})`,
        noResults: 'No matching characters found',
        guaranteedCombos: 'Guaranteed Combinations',
        characters: 'Characters',
        comboCount: (count) => `${count} combinations`
      },
      tagCategories: {
        type: 'Type',
        position: 'Position',
        tags: 'Tags',
        confirmed: 'Confirmed'
      }
    },
    tags: {
      '先鋒': { ja: '先鋒', en: 'Vanguard' },
      '前衛': { ja: '前衛', en: 'Guard' },
      '重装': { ja: '重装', en: 'Defender' },
      '狙撃': { ja: '狙撃', en: 'Sniper' },
      '術師': { ja: '術師', en: 'Caster' },
      '医療': { ja: '医療', en: 'Medic' },
      '補助': { ja: '補助', en: 'Supporter' },
      '特殊': { ja: '特殊', en: 'Specialist' },
      '近距離': { ja: '近距離', en: 'Melee' },
      '遠距離': { ja: '遠距離', en: 'Ranged' },
      '火力': { ja: '火力', en: 'DP' },
      'COST回復': { ja: 'COST回復', en: 'DP Recovery' },
      '生存': { ja: '生存', en: 'Survival' },
      '防御': { ja: '防御', en: 'Defense' },
      '治療': { ja: '治療', en: 'Healing' },
      '支援': { ja: '支援', en: 'Support' },
      '範囲攻撃': { ja: '範囲攻撃', en: 'AoE' },
      '弱化': { ja: '弱化', en: 'Weaken' },
      '牽制': { ja: '牽制', en: 'Slow' },
      '爆発力': { ja: '爆発力', en: 'Burst' },
      '強制移動': { ja: '強制移動', en: 'Push' },
      '減速': { ja: '減速', en: 'Slow' },
      '召喚': { ja: '召喚', en: 'Summon' },
      '高速再配置': { ja: '高速再配置', en: 'Fast Redeploy' },
      '元素': { ja: '元素', en: 'Elemental' },
      'ロボット': { ja: 'ロボット', en: 'Robot' },
      '初期': { ja: '初期', en: 'Starter' },
      'エリート': { ja: 'エリート', en: 'Elite' },
      '上級エリート': { ja: '上級エリート', en: 'Senior Elite' }
    },
    characters: {
      // 日本語と同じ内容（英語版は別途作成）
      'saga_icon': { ja: 'サガ', en: 'Saga' },
      'siege_icon': { ja: 'シージ', en: 'Siege' },
      'icon_bagpipe': { ja: 'バグパイプ', en: 'Bagpipe' },
      'silveash_icon': { ja: 'シルバーアッシュ', en: 'SilverAsh' },
      'skadi_icon': { ja: 'スカジ', en: 'Skadi' },
      'icon_surtr': { ja: 'スルト', en: 'Surtr' },
      'icon_thorns': { ja: 'ソーンズ', en: 'Thorns' },
      "icon_ch'en": { ja: 'チェン', en: "Ch'en" },
      'icon_blaze': { ja: 'ブレイズ', en: 'Blaze' },
      'icon_hellagur': { ja: 'ヘラグ', en: 'Hellagur' },
      'icon_mountain': { ja: 'マウンテン', en: 'Mountain' },
      'saria_icon': { ja: 'サリア', en: 'Saria' },
      'icon_blemishine': { ja: 'ブレミシャイン', en: 'Blemishine' },
      'hoshiguma_icon': { ja: 'ホシグマ', en: 'Hoshiguma' },
      'icon_mudrock': { ja: 'マドロック', en: 'Mudrock' },
      'icon_eunectes': { ja: 'ユーネクテス', en: 'Eunectes' },
      'archetto_icon': { ja: 'アルケット', en: 'Archetto' },
      'exusiai_icon': { ja: 'エクシア', en: 'Exusiai' },
      'icon_schwarz': { ja: 'シュヴァルツ', en: 'Schwarz' },
      'icon_rosa': { ja: 'ロサ', en: 'Rosa' },
      'ifrit_icon': { ja: 'イフリータ', en: 'Ifrit' },
      'icon_ceobe': { ja: 'ケオベ', en: 'Ceobe' },
      'passenger_icon': { ja: 'パッセンジャー', en: 'Passenger' },
      'icon_mostima': { ja: 'モスティマ', en: 'Mostima' },
      'shining_icon': { ja: 'シャイニング', en: 'Shining' },
      'nightingale_icon': { ja: 'ナイチンゲール', en: 'Nightingale' },
      'magallan_icon': { ja: 'マゼラン', en: 'Magallan' },
      'icon_suzuran': { ja: 'スズラン', en: 'Suzuran' },
      'icon_aak': { ja: 'ア', en: 'Aak' },
      'icon_phantom': { ja: 'ファントム', en: 'Phantom' },
      'icon_weedy': { ja: 'ウィーディ', en: 'Weedy' },
      // 他のキャラクターも同様に...
      'vigna_icon': { ja: 'ヴィグナ', en: 'Vigna' },
      'scavenger_icon': { ja: 'スカベンジャー', en: 'Scavenger' },
      'myrtle_icon': { ja: 'テンニンカ', en: 'Myrtle' },
      'beanstalk_icon': { ja: 'ビーンストーク', en: 'Beanstalk' },
      'icon_arene': { ja: 'アレーン', en: 'Arene' },
      'icon_utage': { ja: 'ウタゲ', en: 'Utage' },
      'estelle_icon': { ja: 'エステル', en: 'Estelle' },
      'icon_cutter': { ja: 'カッター', en: 'Cutter' },
      'icon_jackie': { ja: 'ジャッキー', en: 'Jackie' },
      'dobermann_icon': { ja: 'ドーベルマン', en: 'Dobermann' },
      'beehunter_icon': { ja: 'ビーハンター', en: 'Beehunter' },
      'frostleaf_icon': { ja: 'フロストリーフ', en: 'Frostleaf' },
      'matoimaru_icon': { ja: 'マトイマル', en: 'Matoimaru' },
      'mousse_icon': { ja: 'ムース', en: 'Mousse' },
      'cuora_icon': { ja: 'クオーラ', en: 'Cuora' },
      'icon_gummy': { ja: 'グム', en: 'Gummy' },
      'icon_bubble': { ja: 'バブル', en: 'Bubble' },
      'matterhorn_icon': { ja: 'マッターホルン', en: 'Matterhorn' },
      'icon_aciddrop': { ja: 'アシッドドロップ', en: 'Aciddrop' },
      'icon_ambriel': { ja: 'アンブリエル', en: 'Ambriel' },
      'vermeil_icon': { ja: 'ヴァーミル', en: 'Vermeil' },
      'jessica_icon': { ja: 'ジェシカ', en: 'Jessica' },
      'icon_shirayuki': { ja: 'シラユキ', en: 'Shirayuki' },
      'pinecone_icon': { ja: 'パインコーン', en: 'Pinecone' },
      'icon_may': { ja: 'メイ', en: 'May' },
      'icon_meteor': { ja: 'メテオ', en: 'Meteor' },
      'gitano_icon': { ja: 'ギターノ', en: 'Gitano' },
      'greyy_icon': { ja: 'グレイ', en: 'Greyy' },
      'haze_icon': { ja: 'ヘイズ', en: 'Haze' },
      'icon_click': { ja: 'カシャ', en: 'Click' },
      'icon_sussurro': { ja: 'ススーロ', en: 'Sussurro' },
      'icon_purestream': { ja: 'セイリュウ', en: 'Purestream' },
      'perfumer_icon': { ja: 'パフューマー', en: 'Perfumer' },
      'myrrh_icon': { ja: 'ミルラ', en: 'Myrrh' },
      'icon_earthspirit': { ja: 'アーススピリット', en: 'Earthspirit' },
      'icon_podenco': { ja: 'ポデンコ', en: 'Podenco' },
      'gravel_icon': { ja: 'グラベル', en: 'Gravel' },
      'icon_jaye': { ja: 'ジェイ', en: 'Jaye' },
      'shaw_icon': { ja: 'ショウ', en: 'Shaw' },
      'rope_icon': { ja: 'ロープ', en: 'Rope' },
      'vanilla_icon': { ja: 'バニラ', en: 'Vanilla' },
      'fang_icon': { ja: 'フェン', en: 'Fang' },
      'icon_plume': { ja: 'プリュム', en: 'Plume' },
      'icon_popukar': { ja: 'ポプカル', en: 'Popukar' },
      'midnight_icon': { ja: 'ミッドナイト', en: 'Midnight' },
      'melantha_icon': { ja: 'メランサ', en: 'Melantha' },
      'icon_spot': { ja: 'スポット', en: 'Spot' },
      'beagle_icon': { ja: 'ビーグル', en: 'Beagle' },
      'icon_adnachiel': { ja: 'アドナキエル', en: 'Adnachiel' },
      'catapult_icon': { ja: 'カタパルト', en: 'Catapult' },
      'icon_kroos': { ja: 'クルース', en: 'Kroos' },
      'icon_steward': { ja: 'スチュワード', en: 'Steward' },
      'icon_lava': { ja: 'ラヴァ', en: 'Lava' },
      'ansel_icon': { ja: 'アンセル', en: 'Ansel' },
      'hibiscus_icon': { ja: 'ハイビスカス', en: 'Hibiscus' },
      'orchid_icon': { ja: 'オーキッド', en: 'Orchid' },
      'yato_icon': { ja: 'ヤトウ', en: 'Yato' },
      'noircorne_icon': { ja: 'ノイルホーン', en: 'Noir Corne' },
      'rangers_icon': { ja: 'レンジャー', en: 'Rangers' },
      '12f_icon': { ja: '12F', en: '12F' },
      'durin_icon': { ja: 'ドゥリン', en: 'Durin' },
      'confess-47_icon': { ja: 'CONFESS-47', en: 'CONFESS-47' },
      'icon_castle-3': { ja: 'Castle-3', en: 'Castle-3' },
      'friston-3_icon': { ja: 'Friston-3', en: 'Friston-3' },
      'justiceknight_icon': { ja: 'ジャスティスナイト', en: 'Justice Knight' },
      'icon_lancet-2': { ja: 'Lancet-2', en: 'Lancet-2' },
      'phonor-0_icon': { ja: 'PhonoR-0', en: 'PhonoR-0' },
      'icon_thermal-ex': { ja: 'THRM-EX', en: 'THRM-EX' },
      // 欠けていた星5キャラクターを追加
      'icon_chiave': { ja: 'キアーベ', en: 'Chiave' },
      'icon_zima': { ja: 'ズィマー', en: 'Zima' },
      'texas_icon': { ja: 'テキサス', en: 'Texas' },
      'icon_reed': { ja: 'リード', en: 'Reed' },
      'icon_elysium': { ja: 'エリジウム', en: 'Elysium' },
      'icon_astesia': { ja: 'アステシア', en: 'Astesia' },
      'icon_indra': { ja: 'インドラ', en: 'Indra' },
      'specter_icon': { ja: 'スペクター', en: 'Specter' },
      'icon_swire': { ja: 'スワイヤー', en: 'Swire' },
      'flint_icon': { ja: 'フリント', en: 'Flint' },
      'icon_broca': { ja: 'ブローカ', en: 'Broca' },
      'icon_ayerscarpe': { ja: 'エアースカーペ', en: 'Ayercarpe' },
      'vulcan_icon': { ja: 'ヴァルカン', en: 'Vulcan' },
      'icon_hung': { ja: 'ウン', en: 'Hung' },
      'croissant_icon': { ja: 'クロワッサン', en: 'Croissant' },
      'nearl_icon': { ja: 'ニアール', en: 'Nearl' },
      'liskarm_icon': { ja: 'リスカム', en: 'Liskarm' },
      'icon_asbestos': { ja: 'アスベストス', en: 'Asbestos' },
      'icon_aosta': { ja: 'アオスタ', en: 'Aosta' },
      'icon_bluepoison': { ja: 'アズリウス', en: 'Blue Poison' },
      'icon_andreana': { ja: 'アンドレアナ', en: 'Andreana' },
      'icon_executor': { ja: 'イグゼキューター', en: 'Executor' },
      'icon_april': { ja: 'エイプリル', en: 'April' },
      'icon_greythroat': { ja: 'グレースロート', en: 'Greythroat' },
      'icon_sesa': { ja: 'シェーシャ', en: 'Sesa' },
      'toddifons_icon': { ja: 'トギフォンス', en: 'Toddifons' },
      'firewatch_icon': { ja: 'ファイヤーウォッチ', en: 'Firewatch' },
      'platinum_icon': { ja: 'プラチナ', en: 'Platinum' },
      'provence_icon': { ja: 'プロヴァンス', en: 'Provence' },
      'meteorite_icon': { ja: 'メテオリーテ', en: 'Meteorite' },
      'iris_icon': { ja: 'アイリス', en: 'Iris' },
      'nightmare_icon': { ja: 'ナイトメア', en: 'Nightmare' },
      'beeswax_icon': { ja: 'ビーズワクス', en: 'Beeswax' },
      'icon_leizi': { ja: 'レイズ', en: 'Leizi' },
      'icon_leonhardt': { ja: 'レオンハルト', en: 'Leonhardt' },
      'icon_whisperain': { ja: 'ウィスパーレイン', en: 'Whisperain' },
      'icon_silence': { ja: 'サイレンス', en: 'Silence' },
      'ptilopsis_icon': { ja: 'フィリオプシス', en: 'Ptilopsis' },
      'warfarin_icon': { ja: 'ワルファリン', en: 'Warfarin' },
      'icon_istina': { ja: 'イースチナ', en: 'Istina' },
      'icon_glaucus': { ja: 'グラウコス', en: 'Glaucus' },
      'icon_shamare': { ja: 'シャマレ', en: 'Shamare' },
      'pramanix_icon': { ja: 'プラマニクス', en: 'Pramanix' },
      'mayer_icon': { ja: 'メイヤー', en: 'Mayer' },
      'tsukinogi_icon': { ja: 'ツキノギ', en: 'Tsukinogi' },
      'icon_mr.nothing': { ja: 'ウユウ', en: "Mr. Nothing" },
      'feater_icon': { ja: 'エフイーター', en: 'Feater' },
      'kafka_icon': { ja: 'カフカ', en: 'Kafka' },
      'cliffheart_icon': { ja: 'クリフハート', en: 'Cliffheart' },
      'manticore_icon': { ja: 'マンティコア', en: 'Manticore' },
      'projektred_icon': { ja: 'レッド', en: 'Projekt Red' },
      'icon_waaifu': { ja: 'ワイフー', en: "Waai Fu" }
    }
  }
}

export const getRobotTimeInfo = (charId: string, language: Language): string | undefined => {
  const robotTimeInfo: Record<string, { ja: string, en: string }> = {
    'confess-47_icon': { 
      ja: 'ロボット狙い: 3時間50分 / 星4以上狙い: 9時間', 
      en: 'Robot target: 3h50m / ★4+ target: 9h' 
    },
    'icon_castle-3': { 
      ja: 'ロボット狙い: 3時間50分 / 星4以上狙い: 9時間', 
      en: 'Robot target: 3h50m / ★4+ target: 9h' 
    },
    'friston-3_icon': { 
      ja: 'ロボット狙い: 3時間50分 / 星4以上狙い: 9時間', 
      en: 'Robot target: 3h50m / ★4+ target: 9h' 
    },
    'justiceknight_icon': { 
      ja: 'ロボット狙い: 3時間50分 / 星4以上狙い: 9時間', 
      en: 'Robot target: 3h50m / ★4+ target: 9h' 
    },
    'icon_lancet-2': { 
      ja: 'ロボット狙い: 3時間50分 / 星4以上狙い: 9時間', 
      en: 'Robot target: 3h50m / ★4+ target: 9h' 
    },
    'phonor-0_icon': { 
      ja: 'ロボット狙い: 3時間50分 / 星4以上狙い: 9時間', 
      en: 'Robot target: 3h50m / ★4+ target: 9h' 
    },
    'icon_thermal-ex': { 
      ja: 'ロボット狙い: 3時間50分 / 星4以上狙い: 9時間', 
      en: 'Robot target: 3h50m / ★4+ target: 9h' 
    }
  }
  return robotTimeInfo[charId]?.[language]
}

export const getRobotTime = (charId: string): string | undefined => {
  const robotTimes: Record<string, string> = {
    'confess-47_icon': '9h',
    'icon_castle-3': '6h',
    'friston-3_icon': '9h',
    'justiceknight_icon': '9h',
    'icon_lancet-2': '6h',
    'phonor-0_icon': '9h',
    'icon_thermal-ex': '6h'
  }
  return robotTimes[charId]
}

// ヘルパー関数
export const getCharacterName = (charId: string, language: Language): string => {
  const charData = dictionary[language].characters[charId]
  if (!charData) {
    console.warn(`Character ID "${charId}" not found in dictionary for language "${language}"`)
    return charId // フォールバック
  }
  return typeof charData === 'string' ? charData : charData[language]
}

export const getTagName = (tag: string, language: Language): string => {
  const tagData = dictionary[language].tags[tag]
  if (!tagData) {
    console.warn(`Tag "${tag}" not found in dictionary for language "${language}"`)
    return tag // フォールバック
  }
  return tagData[language]
}

export const getUIText = (language: Language) => dictionary[language].ui
