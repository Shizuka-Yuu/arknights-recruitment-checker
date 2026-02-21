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
- **Deployment**: GitHub Pages + GitHub Actions CI/CD

## 📦 インストールと実行

### ローカル環境での実行

```bash
# リポジトリをクローン
git clone https://github.com/Shizuka-Yuu/arknights-recruitment-checker.git
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

# GitHub Pagesにデプロイ（手動）
npm run deploy

# GitHub Pagesにデプロイ（自動）
git push origin main  # GitHub Actionsが自動でデプロイ
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

## 🌐 デモ

[GitHub Pagesで公開中](https://shizuka-yuu.github.io/arknights-recruitment-checker/)

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🙏 謝辞

- **Arknights Wiki** - 公開求人データの提供
- **Hypergryph** - Arknightsの開発
- **Reactコミュニティ** - 優れたフレームワークの提供

## 🔗 関連リンク

- [Arknights公式サイト](https://www.arknights.jp/)
- [Arknights Wiki](https://arknights.wikiru.jp/)
- [GitHubリポジトリ](https://github.com/Shizuka-Yuu/arknights-recruitment-checker)

---

## 🚀 画像最適化機能

### 概要
150個以上の画像ファイルを含むプロジェクトで、GitHub Pagesのレート制限を超過する可能性があります。画像最適化ワークフローを導入して、この問題を解決します。

### 使用方法
1. **手動最適化**:
   ```bash
   # GitHub Actionsで実行
   curl -X POST -H "Authorization: token $GITHUB_TOKEN" \
     https://api.github.com/repos/Shizuka-Yuu/arknights-recruitment-checker/dispatches \
     -d '{"ref": "main", "inputs": {"optimize_images": "true"}}'
   ```

2. **自動最適化**:
   mainブランチにpushすると、GitHub Actionsが自動で画像最適化を実行します

### 最適化内容
- **WebP変換**: 画像をWebP形式に変換してファイルサイズを削減
- **リサイズ**: 80x80pxに統一して表示速度を向上
- **バックアップ**: 元の画像を安全に保管
- **自動デプロイ**: 最適化された画像を自動でデプロイ

### 技術的効果
- ✅ **表示速度向上**: 画像ファイルサイズの削減
- ✅ **レート制限対策**: GitHub Pagesの負荷軽減
- ✅ **ユーザー体験**: より速いページ読み込み
- ✅ **運用効率**: 自動化による手動作業の削減

---

## 📝 GitHub Actionsのログ出力制限について

### 問題点
GitHub Actionsではログ出力に制限があり、3000行以上のエラーが出力されると処理が中断される場合があります。

### 対応策
1. **ログの最適化**: 不要なログ出力を削減
2. **エラーハンドリング**: 重大なエラーのみを通知
3. **ジョブ分割**: 大規模な変更は複数のジョブに分割

### 現在のワークフロー
- **deploy.yml**: ログ出力を最適化したバージョン
- **optimize-images.yml**: 画像最適化専用のワークフロー

### 今後の対応
- **監視**: GitHub Actionsの実行ログを定期的に確認
- **必要に応じて**: エラーが発生した場合に適切な対応を実施
- **段階的改善**: 徐々にワークフローを改善

---

**注意**: このツールは非公式のファンメイドツールです。Arknightsの運営会社とは関係ありません。
