# Arknights Recruitment Checker | アークナイツ 公開求人チェッカー

[日本語](#日本語) | [English](#english)

---

## 日本語

Arknights（アークナイツ）の公開求人でキャラクターを検索し、確定組み合わせを確認するためのWebツールです。

## 🎯 特徴

- **リアルタイム検索**: タグ選択で即座にキャラクターを絞り込み
- **確定組み合わせ表示**: 1〜5タグ選択で★4以上確定またはロボット確定の組み合わせを表示
- **全組み合わせ分析**: 選択したタグから可能なすべての組み合わせを網羅的に表示
- **候補ラベル表示**: 確定対象外のキャラクターに「候補」ラベルを表示
- **ロボット説明**: ロボット確定の場合に特別な説明を表示
- **多言語対応**: 日本語と英語のUIに対応
- **テーマ切り替え**: ライトモードとダークモードをサポート
- **Wiki連携**: キャラクター名/アイコンクリックでアークナイツ攻略 Wiki（日本語）へ移動
- **レアリティ色分け**: 星6～星1まで色で視覚的に区別
- **トップへ戻るボタン**: スクロール時にトップへ戻るボタンを表示
- **ツールチップ対応**: すべてのインタラクティブ要素に適切なツールチップを表示

##  使い方

1. **タグを選択**: キャラクターの特性に合わせてタグを選択（最大5個）
2. **検索結果確認**: 選択したタグに一致するキャラクターが表示
3. **確定組み合わせ**: 1〜5タグ選択時は確定組み合わせと対象キャラクターを表示
4. **全組み合わせ分析**: 可能なすべてのタグ組み合わせと結果を確認
5. **Wikiアクセス**: キャラクターのアイコンをクリックで詳細情報へ
6. **リセット機能**: タグリセットボタンで選択をクリア

---

## English

A web tool for searching characters and checking guaranteed combinations in Arknights' public recruitment.

## � Features

- **Real-time Search**: Instantly filter characters by selecting tags
- **Guaranteed Combinations**: Display ★4+ guaranteed or robot guaranteed combinations with 1-5 tags
- **Complete Combination Analysis**: Comprehensively display all possible combinations from selected tags
- **Candidate Labels**: Display "Candidate" labels for characters outside guaranteed targets
- **Robot Explanations**: Show special explanations for robot guaranteed cases
- **Multi-language Support**: Japanese and English UI support
- **Theme Switching**: Light mode and dark mode support
- **Wiki Integration**: Click character names/icons to navigate to Arknights Strategy Wiki (Japanese)
- **Rarity Color Coding**: Visual distinction from ★6 to ★1
- **Back to Top Button**: Display back-to-top button when scrolling
- **Tooltip Support**: Appropriate tooltips for all interactive elements

## 🚀 How to Use

1. **Select Tags**: Choose tags based on character characteristics (max 5 tags)
2. **Check Search Results**: View characters matching selected tags
3. **Guaranteed Combinations**: Display guaranteed combinations and target characters with 1-5 tags
4. **Complete Combination Analysis**: Check all possible tag combinations and results
5. **Wiki Access**: Click character icons for detailed information
6. **Reset Function**: Clear selections with reset button

---

## 📊 Data Sources

### Primary Information Source
- **[Arknights Strategy Wiki - Public Recruitment](https://arknights.wikiru.jp/?%E5%85%AC%E9%96%8B%E6%B1%82%E4%BA%BA)**
  - Basic rules, guarantee conditions, tag list for public recruitment

### Character Data
- **API Endpoint**: `https://arknight-data-backend.shizuka-y.workers.dev/`
- **Real-time Acquisition**: Automatically fetch latest data from Cloudflare Workers
- **Dictionary Function**: Multi-language support for character names, tag names, UI text

## �🌐 Demo

[Published on GitHub Pages](https://shizuka-yuu.github.io/arknights-recruitment-checker/)

## 🛠 Tech Stack

- **Frontend**: React 19 + TypeScript + Vite 5
- **Styling**: Tailwind CSS 4
- **Backend API**: Cloudflare Workers
- **Deployment**: GitHub Pages + GitHub Actions CI/CD
- **Data Source**: Arknights Wiki API integration

## 📦 Installation and Execution

### Local Development

```bash
# Clone repository
git clone https://github.com/Shizuka-Yuu/arknights-recruitment-checker.git
cd [repository-name]

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in browser
```

### Build and Deploy

```bash
# Production build
npm run build

# Deploy to GitHub Pages (manual)
npm run deploy

# Deploy to GitHub Pages (automatic)
git push origin main  # GitHub Actions auto-deploys
```

## 🎨 Design Features

### Multi-language Support
- Japanese and English UI switching
- Multi-language character name display
- Tag name translation support
- 🌐 icon with language selection

### Theme Support
- Light mode: Bright colors for comfortable viewing
- Dark mode: Dark colors to reduce eye strain
- CSS variable-based consistent design
- Header logo theme support (inverted in light mode)

### Rarity Display
- ★6: Orange color
- ★5: Yellow color
- ★4: Purple color
- ★3: Blue color
- ★2: Green color
- ★1: Gray color

### UI/UX Features
- Unified cursor styles (pointer/not-allowed)
- Standardized tooltips
- Hover effects (tag movement in dark theme)
- Back to top button (appears after 300px scroll)

## 📋 Feature Details

### Tag Search Logic
- **Class Tags**: Vanguard, Guard, Defender, Sniper, Caster, Medic, Support, Specialist
- **Position Tags**: Melee, Ranged
- **Trait Tags**: Area Attack, Single Target Caster, Support, Healing, Enhancement, etc.
- **Guaranteed Tags**: Elite, Senior Elite, Robot

### Guarantee Analysis
- **1 Tag**: ★4+ guaranteed combinations
- **2 Tags**: ★4+ guaranteed combinations
- **3 Tags**: ★4+ guaranteed combinations
- **4 Tags**: ★4+ guaranteed combinations
- **5 Tags**: ★4+ guaranteed or robot guaranteed combinations

### Combination Analysis
- **Complete Combination Display**: Comprehensively analyze all possible combinations from selected tags
- **Candidate Labels**: Display "Candidate" labels for characters outside guaranteed targets
- **Robot Explanations**: Show special explanations for robot guaranteed cases
- **System Messages**: Clearly display guarantee status when 5 tags are selected

### Image Processing
- **Multiple Path Support**: Support for multiple file formats of character icons
- **Error Handling**: Alternative display for image loading failures
- **Automatic Path Detection**: Automatic trial of prefixes/suffixes

## 🔧 Development

### Project Structure

```
src/
├── components/          # React components
│   ├── AllCombinationResults.tsx # Complete combination display
│   ├── CharacterGrid.tsx    # Character list display
│   ├── Header.tsx            # Header and theme switching
│   ├── ScrollToTop.tsx       # Back to top button
│   └── TagSelector.tsx       # Tag selection UI
├── contexts/           # React Context
│   └── AppContext.tsx        # Language/theme management
├── constants/          # Constants and dictionaries
│   └── dictionary.ts         # Multi-language dictionary
├── hooks/              # Custom hooks
│   ├── useCharacters.ts      # Character data fetching
│   └── useRecruitmentCalculator.ts # Search logic
└── types/              # TypeScript type definitions
    └── index.ts              # Common types
```

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📝 License

This project is published under the MIT License.

## 🙏 Acknowledgments

- **Arknights Wiki** - Providing public recruitment data
- **Hypergryph** - Arknights development
- **React Community** - Providing excellent framework

## 🔗 Related Links

- [Arknights Official Site](https://www.arknights.jp/)
- [Arknights Strategy Wiki](https://arknights.wikiru.jp/)
- [GitHub Repository](https://github.com/Shizuka-Yuu/arknights-recruitment-checker)

---

**Note**: This tool is an unofficial fan-made tool. It is not affiliated with Arknights' operating company.
