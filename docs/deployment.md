# デプロイ手順

このドキュメントでは、MyNextCareerアプリケーションを様々なホスティングサービスにデプロイする方法について説明します。

## 前提条件

デプロイを行う前に、以下の準備が必要です：

1. Node.js（バージョン18以上）がインストールされていること
2. npmまたはyarnがインストールされていること
3. プロジェクトのソースコードがローカルにクローンされていること

## ビルドプロセス

どのホスティングサービスを使用する場合でも、まずはアプリケーションをビルドする必要があります：

```bash
# 依存関係のインストール
npm install

# 本番用ビルドの実行
npm run build
```

ビルドが成功すると、`out`ディレクトリに静的ファイルが生成されます。このディレクトリには、HTMLファイル、JavaScript、CSS、画像などのアセットが含まれています。

## Vercelへのデプロイ

[Vercel](https://vercel.com/)はNext.jsの開発元であり、Next.jsアプリケーションのデプロイに最適なプラットフォームです。

### 手順

1. Vercelアカウントを作成する（まだ持っていない場合）
2. Vercel CLIをインストールする：
   ```bash
   npm install -g vercel
   ```
3. プロジェクトのルートディレクトリで以下のコマンドを実行：
   ```bash
   vercel
   ```
4. 初めてデプロイする場合は、いくつかの質問に答える必要があります：
   - Vercelにログインするためのメールアドレスを入力
   - プロジェクトをインポートするGitHubアカウントを選択
   - プロジェクト名を確認または変更
   - ビルド設定を確認

5. デプロイが完了すると、VercelはデプロイされたアプリケーションのURLを提供します。

### 継続的デプロイ

GitHubリポジトリをVercelに接続すると、mainブランチへのプッシュごとに自動的にデプロイが行われます。これを設定するには：

1. Vercelダッシュボードにアクセス
2. プロジェクトを選択
3. 「Settings」→「Git」→「Connect Git Repository」を選択
4. GitHubリポジトリを選択し、指示に従って設定を完了

## GitHub Pagesへのデプロイ

GitHub Pagesは、GitHubリポジトリから直接静的ウェブサイトをホストするサービスです。

### 手順

1. プロジェクトのルートディレクトリに`.github/workflows/deploy.yml`ファイルを作成：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: out
          branch: gh-pages
```

2. GitHubリポジトリの「Settings」→「Pages」で、ソースを「GitHub Actions」に設定

3. 変更をmainブランチにプッシュすると、GitHub Actionsが自動的にビルドとデプロイを行います

4. デプロイが完了すると、`https://<username>.github.io/<repository-name>/`でアプリケーションにアクセスできます

### 注意点

GitHub Pagesでは、ベースパスの設定が必要な場合があります。`next.config.ts`ファイルを以下のように修正してください：

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/<repository-name>' : '',
  // その他の必要な設定
};

export default nextConfig;
```

`<repository-name>`をあなたのGitHubリポジトリ名に置き換えてください。

## 任意のホスティングサービスへのデプロイ

Next.jsの静的エクスポート機能を使用すると、生成された静的ファイルを任意のホスティングサービスにデプロイできます。

### 手順

1. アプリケーションをビルドする：
   ```bash
   npm run build
   ```

2. 生成された`out`ディレクトリの内容を、選択したホスティングサービスにアップロードします。以下は一般的なホスティングサービスの例です：

   - **Netlify**：
     - Netlifyアカウントを作成
     - 「New site from Git」を選択
     - GitHubリポジトリを選択
     - ビルドコマンドに`npm run build`を設定
     - 公開ディレクトリに`out`を設定

   - **Firebase Hosting**：
     - Firebaseアカウントを作成
     - Firebase CLIをインストール：`npm install -g firebase-tools`
     - Firebaseにログイン：`firebase login`
     - プロジェクトを初期化：`firebase init hosting`
     - 公開ディレクトリに`out`を設定
     - デプロイ：`firebase deploy --only hosting`

   - **AWS S3 + CloudFront**：
     - S3バケットを作成
     - バケットを静的ウェブサイトホスティング用に設定
     - `out`ディレクトリの内容をS3バケットにアップロード
     - CloudFrontディストリビューションを作成してS3バケットに接続

### ローカルでの動作確認

デプロイ前にローカルで静的ファイルの動作を確認するには：

```bash
# serveパッケージをグローバルにインストール
npm install -g serve

# outディレクトリを提供
npx serve out
```

これにより、ローカルサーバーが起動し、ブラウザで`http://localhost:3000`（または別のポート）にアクセスして、静的サイトを確認できます。

## トラブルシューティング

### 画像やアセットが表示されない

- `next.config.ts`ファイルで`assetPrefix`が正しく設定されているか確認してください
- 相対パスが正しいか確認してください

### ルーティングの問題

- 静的エクスポートでは、動的ルーティングに制限があります
- すべての動的ルートが`generateStaticParams`関数で事前に生成されていることを確認してください

### デプロイ後の404エラー

- ホスティングサービスのリダイレクト設定を確認してください
- SPA（シングルページアプリケーション）モードが有効になっているか確認してください（該当する場合）

## まとめ

このドキュメントでは、MyNextCareerアプリケーションを様々なホスティングサービスにデプロイする方法について説明しました。どのホスティングサービスを選択するかは、プロジェクトの要件、予算、および好みによって異なります。

- **Vercel**：Next.jsアプリケーションに最適で、設定が簡単
- **GitHub Pages**：無料で使いやすい、小規模プロジェクトに適している
- **その他のホスティングサービス**：特定の要件や既存のインフラストラクチャに合わせて選択可能

質問や問題がある場合は、GitHubのIssueを作成してください。
