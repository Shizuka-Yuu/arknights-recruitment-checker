# Arknights Recruitment Checker

Arknights（アークナイツ）の公開求人でキャラクターを検索し、確定組み合わせを確認するためのWebツールです。

## 🎯 特徴

- **リアルタイム検索**: タグ選択で即座にキャラクターを絞り込み
- **確定組み合わせ表示**: 5タグ選択で★4以上確定またはロボット確定の組み合わせを表示
- **多言語対応**: 日本語と英語のUIに対応
- **テーマ切り替え**: ライトモードとダークモードをサポート
- **Wiki連携**: キャラクター名/アイコンクリックでArkights Wikiへ移動
- **レアリティ色分け**: 星6～星1まで色で視覚的に区別

## 📊 データソース

### 一次情報源
- **[Arkights Wiki - 公開求人](https://arknights.wikiru.jp/?%E5%85%AC%E9%96%8B%E6%B1%82%E4%BA%BA)**
  - 公開求人の基本ルール、確定条件、タグ一覧など

### キャラクターデータ
- **現在**: `public/master.json`（ローカルデータ）
- **将来**: Cloudflare Workersから取得するAPIデータ（予定）

## 🚀 使い方

1. **タグを選択**: キャラクターの特性に合わせてタグを選択（最大5個）
2. **検索結果確認**: 選択したタグに一致するキャラクターが表示
3. **確定組み合わせ**: 5タグ選択時は確定組み合わせと対象キャラクターを表示
4. **Wikiアクセス**: キャラクターのアイコンをクリックで詳細情報へ

## 🌐 デモ

[GitHub Pagesで公開中](https://[username].github.io/[repository-name]/)

## 🛠 技術スタック

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages

## 📦 インストールと実行

### ローカル環境での実行

```bash
# リポジトリをクローン
git clone https://github.com/[username]/[repository-name].git
cd [repository-name]

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# ブラウザで http://localhost:5173 を開く
```

### ビルドとデプロイ

```bash
# プロダクションビルド
npm run build

# GitHub Pagesにデプロイ
npm run deploy
```

## 🎨 デザイン機能

### 多言語対応
- 日本語と英語のUI切り替え
- キャラクター名の多言語表示
- タグ名の翻訳対応

### テーマ対応
- ライトモード: 明るい配色で快適な閲覧
- ダークモード: 暗い配色で目の疲労を軽減
- CSS変数ベースで一貫したデザイン

### レアリティ表示
- ★6: オレンジ色
- ★5: 黄色
- ★4: 紫色
- ★3: 青色
- ★2: 緑色
- ★1: グレー色

## 📋 機能詳細

### タグ検索ロジック
- **職業タグ**: 先鋒、前衛、重装、狙撃、術師、医療、補助、特殊
- **位置タグ**: 近距離、遠距離
- **特性タグ**: 範囲攻撃、単体術師、支援、治療、強化など
- **確定タグ**: エリート、上級エリート、ロボット

### 確定解析
- **2タグ**: ★4以上確定の組み合わせ
- **3タグ**: ★4以上確定の組み合わせ
- **4タグ**: ★4以上確定の組み合わせ
- **5タグ**: ★4以上確定またはロボット確定の組み合わせ

## 🔧 開発

### プロジェクト構成

```
src/
├── components/          # Reactコンポーネント
│   ├── CharacterGrid.tsx    # キャラクター一覧表示
│   ├── GuaranteedResults.tsx # 確定結果表示
│   ├── Header.tsx            # ヘッダーとテーマ切り替え
│   └── TagSelector.tsx       # タグ選択UI
├── contexts/           # React Context
│   └── AppContext.tsx        # 言語・テーマ管理
├── constants/          # 定数と辞書
│   └── dictionary.ts         # 多言語辞書
├── hooks/              # カスタムフック
│   ├── useCharacters.ts      # キャラクターデータ取得
│   └── useRecruitmentCalculator.ts # 検索ロジック
└── types/              # TypeScript型定義
    └── index.ts              # 共通型
```

### 貢献方法

1. リポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🙏 謝辞

- **Arknights Wiki** - 公開求人データの提供
- **Hypergryph** - Arknightsの開発
- **Reactコミュニティ** - 優れたフレームワークの提供

## 🔗 関連リンク

- [Arknights公式サイト](https://www.arknights.jp/)
- [Arknights Wiki](https://arknights.wikiru.jp/)
- [GitHubリポジトリ](https://github.com/[username]/[repository-name])

---

**注意**: このツールは非公式のファンメイドツールです。Arknightsの運営会社とは関係ありません。
