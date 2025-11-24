![Plugin Version](https://img.shields.io/badge/version-1.4.1-blue)
![RPG Maker MZ](https://img.shields.io/badge/RPG%20Maker-MZ-green)
![License](https://img.shields.io/badge/license-MIT-brightgreen)


# ショップシーン拡張 (SKM_ShopScene_Ex.js)

このプラグインは<br>
うなぎおおとろさんのショップ画面拡張 ShopScene_Extension.js<br>
https://raw.githubusercontent.com/unagiootoro/RPGMZ/master/ShopScene_Extension.js<br>
Yanaさんのミニインフォメーションウィンドウ MiniInformationWindow.js<br>
<br>
木星ペンギンさんの装備ステータスの表示内容を変更 MPP_EquipStatusEX.js およびショップ対応 MPP_EquipStatusEX_Op1.js<br>
http://woodpenguin.blog.fc2.com/<br>

これらを組み合わせて独自要素を追加したショップ画面拡張プラグインです<br>
<br>

<img src="./images/SKM_ShopScene_Ex1.png" width="400">
<img src="./images/SKM_ShopScene_Ex2.png" width="400">

■ [DLリンク](https://raw.githubusercontent.com/fishs075/MZ/refs/heads/main/SKM_ShopScene_Ex.js)

<br>

### 主な特徴
#### 詳細な装備比較
 - 変化するパラメータのみを色分け表示
 - 差分／2列表示などレイアウト切替
 - ステータス表示ルールを細かく指定可能

#### アイテム情報ウィンドウ
 - 命中タイプ／使用可能時／範囲など任意の情報項目をリスト化
 - アイテム効果（回復やステート付与）を色付きで見やすく表示

#### アクター表示の自由度
 - キャラチップ・縦長チップ・顔グラの切替
 - アクター切り替え矢印／タッチ操作に対応
 - 装備可否や性能アップをアイコン・三角で可視化

#### 柔軟なレイアウト＆用語設定
 - ウィンドウ幅／フォントサイズ／用語辞書をプラグインパラメータで一括管理

#### こんな時に
 - 装備比較をもっと分かりやすく、かっこよく演出したい
 - ショップでアイテム説明やイベント感のある演出を行いたい

<br>

















## オプション１（ShopPartySelect.js）

ショップ画面のステータス上部に、パーティ人数分の簡易アイコン（顔/歩行/SV）を<br>
横並びで表示する選択ウィンドウを追加します。クリック/タップで<br>
ステータス表示対象のアクターを切り替えできます。<br>
<br>
また、購入/売却をまだ選んでいないコマンド選択中は、<br>
パーティ選択ウィンドウの下に幅を合わせた空のウィンドウを表示します。<br>
売却モード中は、パーティ選択ウィンドウを自動で非表示にします。<br>
<br>
プラグインコマンドはありません。<br>

<img src="./images/ShopPartySelect.png" width="400">

■ [DLリンク](https://raw.githubusercontent.com/fishs075/MZ/refs/heads/main/ShopPartySelect.js)



## オプション２（SKM_ShopWindowClamp.js）

プラグインコマンドで「次に実行するショップの処理」だけ、<br>
ゴールドウィンドウ以外の各ウィンドウを指定した横幅に収めます。<br>
プラグインコマンドを実行しなかった場合は従来どおりの幅で表示されます。<br>
また、開けた部分にピクチャやテキストメッセージを表示することもできます<br>

<img src="./images/SKM_ShopWindowClamp.png" width="400">


https://github.com/user-attachments/assets/97bee934-857a-4fec-93a0-4afec0801234


■ [DLリンク](https://raw.githubusercontent.com/fishs075/MZ/refs/heads/main/SKM_ShopWindowClamp.js)


## オプション３（SKM_SoldOutFlag.js）

プラグインコマンドをショップを開く直前に実行すると、<br>
次に開くショップシーン限定で、メモ欄に ＜soldout＞ を含む商品を<br>
「購入不可＋価格欄に任意のラベル表示」に変換します。<br>
ショップ終了後は自動的に通常状態へ戻ります。<br>

<img src="./images/SKM_SoldOutFlag.png" width="400">

■ [DLリンク](https://raw.githubusercontent.com/fishs075/MZ/refs/heads/main/SKM_SoldOutFlag.js)



## 【更新履歴】
 - 1.0.0 初版
 - 1.0.1 バグ修正
 - 1.0.2 競合しそうな関数名をリネーム
 - 1.1.0 アイテムステータス画面をカスタマイズ可能にした
 - 1.2.0 とんび様のキャラデータを参考に長身キャラチップに暫定対応
 - 1.2.1 縦72のキャラチップに対応。プラグインパラメータから設定して下さい
 - 1.2.5 アイコンを縮小表示するようにした。レイアウト調節
 - 1.3.0 リファクタリング（仮版:動作チェック後）
 - 1.4.0 プラグインパラメータの整理・リネーム
 - 1.4.1 プラグインパラメータからのリストを表示できなかった問題を修正












## 【ライセンス】
このプラグインは、元となったプラグインがMITライセンスで配布しているため<br>
このプラグインもMITライセンスの条件の下で利用可能とします。<br>
<br>
Copyright (c) 2023 sakananomaeasi<br>
Released under the MIT license<br>
http://opensource.org/licenses/mit-license.php<br>
<br>
Copyright (c) 2020 unagiootoro<br>
Released under the MIT license<br>
https://raw.githubusercontent.com/unagiootoro/RPGMZ/refs/heads/master/LICENSE

Copyright (c) 2016 Yana<br>
Released under the MIT license<br>
http://opensource.org/licenses/mit-license.php

Copyright (c) 2022 Mokusei Penguin<br>
Released under the MIT license<br>
https://opensource.org/licenses/mit-license.php


