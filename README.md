# 湿り空気線図（Psychrometric Chart）公式ガイド

Flutter アプリ「湿り空気線図（Psychrometric Chart）」の使い方解説サイト（MkDocs Material + mkdocs-static-i18n）です。

- Google Play: https://play.google.com/store/apps/details?id=psychrometricchart.EZCompany
- Web 版: https://psychrometric-chart-bdf76.web.app
- プライバシーポリシー: https://psychrometric-chart-bdf76.web.app/privacy_policy.html

## ローカルプレビュー方法

Python 3.10 以上を推奨します。

```bash
pip install -r requirements.txt
mkdocs serve
```

ブラウザで `http://127.0.0.1:8000/` を開くと、ライブリロード付きでプレビューできます。

厳格チェック付きの静的ビルドを行う場合は以下を実行してください。

```bash
mkdocs build --strict
```

出力先は `site/` ディレクトリです（`.gitignore` 対象）。

## GitHub Pages 公開・有効化手順

1. **リポジトリの作成と `site_url` の差し替え**
   - `mkdocs.yml` の `site_url` はプレースホルダになっています。公開先の GitHub ユーザー名／組織名・リポジトリ名に合わせて書き換えてください。
     ```yaml
     site_url: https://USERNAME.github.io/psychrometric-chart-guide/
     ```
     （`repo_url` / `repo_name` を設定する場合も同様に合わせてください）

2. **GitHub へ push**
   - `main` ブランチを GitHub リポジトリに push します。
   - `.github/workflows/deploy.yml` により、`main` ブランチへの push をトリガーに `mkdocs build --strict` と GitHub Pages へのデプロイが自動実行されます。

3. **GitHub Pages の有効化**
   - GitHub リポジトリの **Settings > Pages** を開きます。
   - **Build and deployment > Source** で **GitHub Actions** を選択します。
   - 以降、`main` ブランチへの push ごとに自動でビルド・公開されます（初回は **Actions** タブから手動実行することもできます）。

## スクリーンショットの差し替え

各言語のスクリーンショットは以下のディレクトリに配置します（存在しない場合はビルド用の仮画像が入っています）。

- 日本語版: `docs/assets/images/ja/`
- 英語版: `docs/assets/images/en/`

対応ファイル名（12 枚）:

- `01_home.png`（メイン画面）
- `02_point_entry.png`（点の入力パネル）
- `03_multiple_points.png`（複数点プロット）
- `04_save_dialog.png`（保存ダイアログ）
- `05_slots_list.png`（保存一覧）
- `06_compare.png`（比較画面）
- `07_settings_units.png`（設定・単位）
- `08_low_temp_chart.png`（低温チャート）
- `09_ahu_config.png`（AHU 設定）
- `10_ahu_chart.png`（AHU プロセスのチャート）
- `11_weather_fetch.png`（気象データ取得）
- `12_annual_simulation.png`（年間シミュレーション結果）
