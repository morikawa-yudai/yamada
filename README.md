# 山田運輸有限会社 コーポレートサイト

Hero v6.1(デザインマスター準拠)。**WordPressテーマ化を前提とした静的サイト**です。

```
/assets
  /css/style.css        … 全スタイル(セクション別コメント区切り)
  /js/main.js           … ヘッダー状態・メニュー・スムーススクロール・スクロール表示
  /js/countup.js        … 実績数値カウントアップ
  /js/hero.js           … Heroアニメーション(GSAP)
  /images/              … ロゴ・Hero背景・実車写真
/index.html             … 本体(各セクションにWP移植コメント入り)
/README.md
```

---

## 1. 静的HTMLとしての確認方法
`index.html` をブラウザで開くだけで動作します。
(GSAP / Lenis のみCDN読込のためネット接続推奨。オフラインでもレイアウトは表示されます)

## 2. GitHub / Vercel に上げる方法
1. GitHubで空リポジトリ作成 → このフォルダで `git remote add origin <URL>` → `git push -u origin main`
2. Vercel「Add New → Project」→ リポジトリをImport → 設定変更なしでDeploy(静的サイト)
3. 以降は main へのPushで自動デプロイ

ブランチ運用: `main`=本番 / `feature/*`=修正(完了後mainへマージ)
コミット規約: `feat:` 新機能 / `fix:` 修正 / `refactor:` 整理 / `style:` デザイン調整

## 3. WordPressテーマ化する際の移植メモ
- **分割方針**: `index.html` 内の `<!-- ==== セクション名 → WP移植: ○○ ==== -->` コメントが分割単位
  - HEADER → `header.php` / FOOTER → `footer.php` / それ以外 → `front-page.php` 内のセクション(または `template-parts/front/*.php`)
- **アセット読込**: `style.css`・各JSは `functions.php` の `wp_enqueue_style / wp_enqueue_script` で登録。CDN(GSAP/Lenis)も同様に enqueue
- **画像パス**: `assets/images/...` → `get_template_directory_uri() . '/assets/images/...'` に置換
- **お知らせ**: 投稿タイプ **News**(`register_post_type('news')`)。`.news-row` をWP_Queryループに置換
- **サービス**: カスタム投稿タイプ **Services**。`.bcard` 1枚=1投稿
- **採用情報**: 固定ページ or **Recruit CPT**
- **ナビ**: `wp_nav_menu()`(位置: global / footer)
- **フォーム**: Contact Form 7 等を設置し、CONTACTセクションのボタンリンクを差し替え

## 4. ACFで編集可能にする推奨項目
| グループ | フィールド | 現在の場所 |
|---|---|---|
| hero | キャッチコピー3行 / リード / CTA×2 / 背景画像 / 動画URL | HEROセクション |
| stats(リピーター) | ラベル / 数値 / 単位 / キャプション ×6 | 実績数値バー |
| services | 英字ラベル / サービスリスト(リピーター) | 事業内容カード |
| qualifications(リピーター) | 資格名 | 許認可バー |
| company | 代表メッセージ / 代表者名 / 会社概要(住所・TEL・FAX・設立・資本金・体制) / 実車写真 | 会社案内 |
| recruit | 待遇チップ(リピーター) / 日給min・max / 募集職種 | 採用情報 |
| contact | タイトル / リード / 電話番号 / 受付時間 / フォームリンク | お問い合わせ |

## 5. 管理画面から更新させたい項目一覧(運用者向け)
- お知らせの追加・編集(News投稿)
- サービス内容の追加・編集(Services投稿)
- 採用情報(待遇チップ・日給・職種)
- 会社情報(住所・電話・FAX・会社概要)
- 実績数値(6項目の数字とキャプション)
- CTA文言・リンク(Hero・お問い合わせ)
- 電話番号・受付時間(お問い合わせ・フッター)
- 画像(Hero背景・実車写真・ロゴ)

---

### Hero位置の微調整
`assets/css/style.css` の `.hero` 内CSS変数:
`--copy-left` `--copy-top` `--h1-size` `--h1-lh` `--lead-gap` `--btn-gap`

### 差し替えポイント
- Hero背景: `assets/images/hero-main.webp` を同名で置換するだけ
- 動画チップ: `.hero-play` の `href` を動画URLへ
