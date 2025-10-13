# SKM_EquipPartySelect

RPGツクールMZ用プラグイン。装備シーン右側に「パーティ選択ウィンドウ」を追加し、クリック/タップや PageUp/PageDown で装備対象アクターを素早く切替できます。レイアウト変更系の横幅調整にも追従します.

![Plugin Version](https://img.shields.io/badge/version-1.0.0-blue)
![RPG Maker MZ](https://img.shields.io/badge/RPG%20Maker-MZ-green)
![License](https://img.shields.io/badge/license-Free-brightgreen)

## DL リンク

[ダウンロード先](https://raw.githubusercontent.com/fishs075/MZ/refs/heads/main/SKM_EquipPartySelect.js)

## 主な機能
- 追加ウィンドウでアクター一覧を横並び表示
- 画像タイプ切替（imageType）
  - 顔グラ（face）
    - 通常は縮小フィット
    - windowLines=1 の時は目線中心の横長アップ表示（原則アップスケールなし）
    - 1行時の顔幅上限は 144px
  - キャラチップ（character）
    - ウィンドウ高さいっぱいを使用し、足元基準で中央寄せ
  - SVアクター（sv）
    - 待機中央フレームを足元基準で表示
    - 名前表示ON時も余白を取らず重なり許容（位置は固定）
- 表示人数制限（maxVisibleActors）と左右スライドガイド（◀ ▶）
  - パーティ人数が上限を超える場合、矢印で「表示のみ」スライド（対象アクターは変更しない）
- PageUp/PageDown（L/R）切替に追従してハイライト更新
- 安全柵：装備候補のアイテムウィンドウがアクティブな間はアクター切替を禁止（スライドのみ可）

## 動作環境
- RPGツクールMZ（最新推奨）

## 導入手順
1. `js/plugins/` に `SKM_EquipPartySelect.js` を配置
2. プラグイン管理で有効化
3. レイアウト変更系（MenuScenesResize / NUUN_EquipStatusEX など）より下（後）に配置

## プラグインパラメータ
- windowLines: 追加ウィンドウの高さ行数（1〜2）
- imageType: 表示画像タイプ（face / character / sv）
- maxVisibleActors: 同時表示人数の上限（初期4）
- showNames: 名前表示 ON/OFF

## 操作
- クリック/タップ: その枠のアクターに切替（装備アイテム選択中は無効）
- 左右ガイド（◀ ▶）: 表示中のメンバーのみスライド（常に有効）
- PageUp/PageDown: 標準のアクター切替に追従

## 互換性
- 横幅はコマンドウィンドウ矩形に追従
- レイアウト変更系プラグインより後に配置

## 注意
- SVアクター画像はスライド時にプリロードし、ロード完了後に自動再描画
- 顔グラ1行アップは目線付近を中心にクロップ（係数はコード側で微調整可）

## クレジット
- Author: さかなのまえあし with GPT-5 Assistant

## ライセンス
- リポジトリの設定に従います（例: MIT 等）

## 変更履歴
- 2025-10-13 v1.0.0 初版（パーティ選択/SV対応/目線アップ/スライドガイド/安全柵）