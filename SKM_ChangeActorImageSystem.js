//=====================================
// SKM_ChangeActorImageSystem.js
//=====================================
// Copyright (c) 2023 Sakananomaeasi
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
/*:ja
 * @target MZ
 * @plugindesc アクター画像変更システム v1.3.0
 * @author さかなのまえあし
 * @url https://github.com/fishs075/MZ/tree/main
 *
 * @param ウインドウのXオフセット
 * @desc ウインドウの描写開始位置です(デフォルト値:0)
 * @type number
 * @default 0
 *
 * @param ウインドウの幅
 * @desc ウインドウの横幅です(デフォルト値:816)
 * @type number
 * @default 816
 *
 * @param 顔画像の幅
 * @desc 顔画像の縦横幅です(デフォルト値:134)
 * @type number
 * @default 134
 *
 * @param 読み込むファイル名
 * @desc 読み込むファイル名を設定します(デフォルト値:Actor)
 * @default Actor
 *
 * @param 説明ウィンドウの文字
 * @desc 画面上部のウィンドウに表示する文字列。
 * (デフォルト値:の画像を選択してください。)
 * @default の画像を選択してください。
 *
 * @param ページウィンドウの表記
 * @desc 画面左部のウィンドウに表示する文字列の表記。
 * (デフォルト値:ページ)
 * @default ページ
 *
 * @param 文字色の指定
 * @desc ウィンドウスキンに準拠した文字色の指定
 * (デフォルト値:0)
 * @type number
 * @min 0
 * @max 31
 * @default 0
 *
 * @param ウィンドウスキンの指定
 * @desc ウィンドウスキンを変更する場合に指定してください。
 * (img/systemの配下にスキンを置いてください)
 * @type file
 * @dir img/system
 * @default Window
 *
 * @param ウィンドウの透明度の指定
 * @desc ウィンドウの透明度を変更する場合に指定してください(0～255)。
 * (デフォルト値:180)
 * @type number
 * @min 0
 * @max 255
 * @default 180
 *
 * @param 背景のファイル名
 * @desc 背景を指定する場合にファイル名を設定してください。
 * (img/parallaxesから読み込みます)
 * @type file
 * @dir img/parallaxes
 * @default
 *
 * @param 背景の色
 * @desc 背景色(#FFFなど)を指定してください(背景画像が優先)。指定がない場合、マップ画面をぼかしたものを背景色として表示します。
 * @default
 *
 * @param 1ページに表示する画像数
 * @desc 1ページに表示する画像数を指定してください。
 * 9以上の数値は8として認識します。(デフォルト:8)
 * @type number
 * @min 1
 * @max 8
 * @default 8
 *
 * @param 顔画像のみモード
 * @desc 顔画像のみを表示・変更するモードを使用するか
 * @type boolean
 * @default false
 *
 * @param SVアクター使用
 * @desc SVアクターを使用するか、使用する場合選択画面に表示する。
 * YES:使用, NO:使用しない, (デフォルト:YES)
 * @type boolean
 * @default true
 *
 * @param キャンセルコマンドの表示
 * @desc キャンセルコマンドを表示するか
 * YES:使用, NO:使用しない, (デフォルト:NO)
 * @type boolean
 * @default false
 *
 * @param キャンセルの文字列
 * @desc アクター選択時のキャンセルコマンドの文字列
 * @default 戻る
 *
 * @param maxPages
 * @text 最大ページ数
 * @desc 表示するページの総数を設定します。0を設定すると読み込む画像数に合わせます。
 * @type number
 * @min 0
 * @default 0
 *
 *
 * @command Go_ChangeActorImageSystemScene
 * @text アクター画像変更
 * @desc アクターの画像を変更します
 *
 * @arg actorNumber
 * @text 読み込む画像数
 * @type number
 * @default 1
 *
 * @arg change_actorId
 * @text 変更するアクターID
 * @desc 変数使用可能(\v[n])
 * @type number
 * @default 1
 *
 * @arg actor_file_name
 * @text ファイル名
 * @desc 省略時はパラメータ設定値使用
 * @type string
 * @default
 *
 * @arg image_load_maxsize
 * @text 1ページの画像数
 * @desc 省略時はパラメータ設定値使用(最大8)
 * @type number
 * @min 1
 * @max 8
 * @default
 *
 * 
 * 
 * @command directChangeActorImage
 * @text アクター画像直接変更
 * @desc ウィンドウを表示せずにアクター画像を直接変更します
 *
 * @arg actorId
 * @text アクターID
 * @desc 変更するアクターのID
 * @type number
 * @min 1
 * @default 1
 *
 * @arg page
 * @text ページ番号
 * @desc 使用するページ番号（1始まり）
 * @type number
 * @min 1
 * @default 1
 *
 * @arg index
 * @text インデックス
 * @desc 画像のインデックス番号（1～8）
 * @type number
 * @min 1
 * @max 99  // 制限を緩和
 * @default 1
 *
 * @arg fileName
 * @text ファイル名
 * @desc 使用するファイル名（省略時はプラグインパラメータの設定を使用）
 * @type string
 * @default
 *
 * @arg faceOnly
 * @text 顔画像のみ変更
 * @desc 顔画像のみを変更するかどうか（省略時はプラグインパラメータの設定を使用）
 * @type boolean
 * @default
 * 
 * @command preloadImages
 * @text 画像事前読み込み
 * @desc 画像を事前に読み込みます
 *
 * @arg actorNumber
 * @text 読み込む画像数
 * @type number
 * @default 1
 *
 * @arg fileName
 * @text ファイル名
 * @desc 省略時はパラメータ設定値使用
 * @type string
 * @default
 *
 * @arg maxImages
 * @text 1ページの画像数
 * @desc 省略時はパラメータ設定値使用(最大8)
 * @type number
 * @min 1
 * @max 8
 * @default
 *

 *
 * @help
 * アクターの顔画像、歩行キャラ、[SV]戦闘キャラを変更するプラグインです。
 *
 * 【基本的な使用方法】
 * イベントのプラグインコマンドから使用します。
 *
 * 【プラグインコマンドの設定項目】
 * 1. 読み込む画像数：使用する画像セットの数を設定
 * 2. 変更するアクターID：容姿を変更するアクターを指定（変数使用可能 \v[n]）
 * 3. ファイル名：読み込む画像ファイルの基本名（省略時はパラメータ設定値を使用）
 * 4. 1ページの画像数：1ページに表示する画像数（省略時はパラメータ設定値を使用、最大8）
 *
 * 【画像ファイルの準備】
 * 必要な画像ファイル（例：基本ファイル名が"Actor"の場合）：
 * 1. フェイス画像とキャラチップ
 *    - Actor1.png, Actor2.png, Actor3.png...（読み込む画像数分必要）
 *    - img/faces/とimg/characters/に配置
 *
 * 2. SVアクター画像（SVアクター使用時のみ）
 *    - Actor1_1.png, Actor1_2.png ... Actor1_8.png
 *    - Actor2_1.png, Actor2_2.png ... Actor2_8.png
 *    （各セットごとに8枚必要。1ページの画像数によっては枚数省略可）
 *    - img/sv_actors/に配置
 *
 * 【事前ロード機能】
 * - 大量の画像を使用する場合、表示の遅延を防ぐため事前ロード機能を使用できます
 * - 容姿変更場所を別マップで作成し、そこに移動する直前に事前ロードを実行することを推奨
 *
 * 【アクター画像直接変更機能】
 * - ウィンドウを表示せずにアクター画像を直接変更することができます。
 * - アクターID、ページ番号、インデックスを指定して直接変更することができます。
 * 　インデックスは
 * 　１，２，３，４
 * 　５，６，７，８
 * 　の順番で設定されております。
 * - ファイル名は省略時はプラグインパラメータの設定を使用します。
 * - 顔画像のみ変更するかどうかを選択することができます。基本はプラグインパラメータに沿います。
 *
 * 【注意事項】
 * ・必ず使用する画像ファイルを事前に用意してください
 * ・画像が存在しない場合、エラーで停止します
 * ・フェイス画像とキャラチップは必須です
 * ・SVアクター使用時は対応するSVアクター画像も必要です
 *
 * 【必要な画像ファイル】
 * 1. フェイス画像（img/faces/）
 * 2. キャラチップ（img/characters/）
 * 3. SVアクター画像（img/sv_actors/）※SVアクター使用時のみ
 *
 * 【テストプレイ時の裏技】
 * - テスト時はトリアコンタンさんのロード失敗エラーのすり抜けプラグイン：ThroughFailedToLoad.jsの使用を推奨（要:PluginCommonBase.js）
 * - 画像ファイルがなくてもエラーで止まることがありません。
 * - テストプレイ時はプラグイン効果無効が初期状態でtrueになっていますので、falseにするとテストプレイ時でも画像がなくてもエラーで止まることはありません。
 * - ログにはどの画像が足りずエラーが出たのか出力されますので、それを確認してください。
 * - 一応の対策として、画像がない場合は音がなって容姿の切り替えはできなくなっております。
 *
 * 【開発履歴】
 * v1.3.0 2025/02/09 - リファクタリング後、元の動作を再現するまで修正。機能追加。
 *
 * v1.2.0-1.2.7 (2023/5/24-10/2) - SakananomaeasiによるMZ移植と改修
 *   - RPGツクールMZへの移植
 *   - 画像の先読み機能搭載
 *   - ウインドウサイズ設定の修正
 *   - 顔画像サイズの調整機能追加
 *   - その他バグ修正
 *
 * v1.1.0-1.1.2 (2020/3/10-12) - Utsuda氏による改修
 *   - キャンセルコマンドの追加
 *   - タッチ入力時のキャンセル挙動修正
 *
 * v1.0.0-1.0.2 (2017/5/16-17) - Tsumio氏による初期開発
 *   - 基本機能の実装
 *   - 背景色指定機能の追加
 *   - 1ページ表示数設定機能の追加
 *
 *
 * 【ライセンス】MIT License
 * 作者に無断で改変、再配布が可能で、利用形態についても制限はありません。
 * 自由に使用してください。
 */

/*~struct~WindowSettings:ja
 * @param xOffset
 * @text Xオフセット
 * @desc ウインドウの描写開始位置
 * @type number
 * @default 0
 *
 * @param width
 * @text ウインドウ幅
 * @desc ウインドウの横幅
 * @type number
 * @default 816
 *
 * @param opacity
 * @text 透明度
 * @desc ウインドウの透明度(0～255)
 * @type number
 * @min 0
 * @max 255
 * @default 180
 *
 * @param skin
 * @text スキン
 * @desc ウインドウスキン(img/system/)
 * @type file
 * @dir img/system
 * @default Window
 */

/*~struct~FaceSettings:ja
 * @param width
 * @text 顔画像幅
 * @desc 顔画像の縦横幅
 * @type number
 * @default 134
 *
 * @param fileName
 * @text ファイル名
 * @desc 読み込むファイル名
 * @type string
 * @default Actor
 *
 * @param maxImagesPerPage
 * @text 1ページ画像数
 * @desc 1ページに表示する画像数(最大8)
 * @type number
 * @min 1
 * @max 8
 * @default 8
 */

/*~struct~TextSettings:ja
 * @param helpText
 * @text 説明文
 * @desc 画面上部の説明文
 * @type string
 * @default の画像を選択してください。
 *
 * @param pageText
 * @text ページ表記
 * @desc ページ表示の文字列
 * @type string
 * @default ページ
 *
 * @param color
 * @text 文字色
 * @desc 文字色指定(0-31)
 * @type number
 * @min 0
 * @max 31
 * @default 0
 */

/*~struct~BackgroundSettings:ja
 * @param fileName
 * @text 背景画像
 * @desc 背景画像(img/parallaxes/)
 * @type file
 * @dir img/parallaxes
 * @default
 *
 * @param color
 * @text 背景色
 * @desc 背景色(#FFFなど)
 * @type string
 * @default
 */

/*~struct~SystemSettings:ja
 * @param useSvActors
 * @text SVアクター使用
 * @desc SVアクターを使用するか
 * @type boolean
 * @default true
 *
 * @param showCancelCommand
 * @text キャンセル表示
 * @desc キャンセルコマンドを表示するか
 * @type boolean
 * @default false
 *
 * @param cancelText
 * @text キャンセル文字列
 * @desc キャンセルコマンドの文字列
 * @type string
 * @default 戻る
 */

// グローバル変数の宣言（ファイルの先頭に追加）
let globalConfigCAIS = null;

(() => {
    "use strict";

    // 設定管理用のクラス
    class ConfigManager_CAIS {
        constructor(params) {
            // ウィンドウ設定
            this._windowSettings = {
                xOffset: Number(params["ウインドウのXオフセット"]) || 0,
                width: Number(params["ウインドウの幅"]) || 816,
                opacity: Number(params["ウィンドウの透明度の指定"]) || 180,
                skin: String(params["ウィンドウスキンの指定"]) || "Window",
            };

            // 顔画像設定
            this._faceSettings = {
                width: Number(params["顔画像の幅"]) || 144,
                fileName: String(params["読み込むファイル名"]) || "Actor",
                maxImagesPerPage:
                    Number(params["1ページに表示する画像数"]) || 8,
            };

            // テキスト設定
            this._textSettings = {
                helpText:
                    String(params["説明ウィンドウの文字"]) ||
                    "の画像を選択してください。",
                pageText: String(params["ページウィンドウの表記"]) || "ページ",
                color: Number(params["文字色の指定"]) || 0,
            };

            // 背景設定
            this._backgroundSettings = {
                fileName: String(params["背景のファイル名"]) || "",
                color: String(params["背景の色"]) || "",
            };

            // システム設定
            this._systemSettings = {
                useSvActors: params["SVアクター使用"] === "true",
                showCancelCommand:
                    params["キャンセルコマンドの表示"] === "true",
                cancelText: String(params["キャンセルの文字列"]) || "戻る",
                faceOnlyMode: params["顔画像のみモード"] === "true",
            };

            // シーン制御用の状態
            this._sceneState = {
                page: Number(params["maxPages"]) || 0, // デフォルト値を0に変更
                actorNumber: 1,
                selectingPage: 0,
                changeActorId: 1,
                maxImagesPerPage: 8,
                currentFileName: this._faceSettings.fileName,
                preloadCount: 0,
            };
        }

        // ゲッターメソッド
        get windowXOffset() {
            return this._windowSettings.xOffset;
        }
        get windowWidth() {
            return this._windowSettings.width;
        }
        get windowOpacity() {
            return this._windowSettings.opacity;
        }
        get windowSkin() {
            return this._windowSettings.skin;
        }

        get faceWidth() {
            return this._faceSettings.width;
        }
        get fileName() {
            return this._faceSettings.fileName;
        }
        get maxImagesPerPage() {
            return this._faceSettings.maxImagesPerPage;
        }

        get helpText() {
            return this._textSettings.helpText;
        }
        get pageText() {
            return this._textSettings.pageText;
        }
        get textColor() {
            return this._textSettings.color;
        }

        get backgroundImage() {
            return this._backgroundSettings.fileName;
        }
        get backgroundColor() {
            return this._backgroundSettings.color;
        }

        get useSvActors() {
            return this._systemSettings.useSvActors;
        }
        get showCancelCommand() {
            return this._systemSettings.showCancelCommand;
        }
        get cancelText() {
            return this._systemSettings.cancelText;
        }

        get faceOnlyMode() {
            return this._systemSettings.faceOnlyMode;
        }

        // シーン状態の管理
        get page() {
            return this._sceneState.page;
        }
        set page(value) {
            this._sceneState.page = value;
        }

        get actorNumber() {
            return this._sceneState.actorNumber;
        }
        set actorNumber(value) {
            this._sceneState.actorNumber = value;
        }

        get selectingPage() {
            return this._sceneState.selectingPage;
        }
        set selectingPage(value) {
            this._sceneState.selectingPage = value;
        }

        get changeActorId() {
            return this._sceneState.changeActorId;
        }
        set changeActorId(value) {
            this._sceneState.changeActorId = value;
        }

        get currentFileName() {
            return this._sceneState.currentFileName;
        }

        get preloadCount() {
            return this._sceneState.preloadCount;
        }

        set preloadCount(value) {
            this._sceneState.preloadCount = value;
        }

        // プラグインコマンド用のメソッド
        updateFromPluginCommand(args) {
            // アクター数を設定
            this._sceneState.actorNumber = Math.max(
                1,
                Number(args.actorNumber)
            );

            // ページ数の設定（プラグインパラメータが0の場合はアクター数を使用）
            if (this._sceneState.page === 0) {
                this._sceneState.page = this._sceneState.actorNumber;
            }

            // アクターIDの設定
            this._sceneState.changeActorId = Number(
                Window_Base.prototype.convertEscapeCharacters(
                    args.change_actorId
                )
            );

            // ファイル名の設定
            if (args.actor_file_name !== "") {
                this._sceneState.currentFileName = args.actor_file_name;
            }

            // 1ページあたりの最大画像数の設定
            if (args.image_load_maxsize !== "") {
                this._sceneState.maxImagesPerPage = Math.min(
                    Number(args.image_load_maxsize),
                    8
                );
            }
        }

        // プリロード用のメソッド
        updatePreloadSettings(args) {
            this._sceneState.actorNumber = Number(args.actorNumber);
            if (args.actor_file_name !== "") {
                this._sceneState.currentFileName = args.actor_file_name;
            }
            if (args.image_load_maxsize !== "") {
                this._sceneState.maxImagesPerPage = Math.min(
                    Number(args.image_load_maxsize),
                    8
                );
            }
        }
    }

    // 設定インスタンスの生成
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    const params = PluginManager.parameters(pluginName);
    console.log("Plugin Parameters:", params);

    try {
        // グローバル変数に代入
        globalConfigCAIS = new ConfigManager_CAIS(params);
        console.log("ConfigCAIS initialized:", globalConfigCAIS);
    } catch (e) {
        console.error("Failed to initialize ConfigCAIS:", e);
    }

    PluginManager.registerCommand(
        pluginName,
        "Go_ChangeActorImageSystemScene",
        function (args) {
            try {
                if (!globalConfigCAIS) {
                    return;
                }

                globalConfigCAIS.updateFromPluginCommand(args);

                if (SceneManager._scene._choiceListWindow) {
                    SceneManager._scene._choiceListWindow.hide();
                }

                SceneManager.push(Scene_ChangeActorImageSystem);
            } catch (e) {
                // エラー処理は残しておく
                throw e;
            }
        }
    );

    //画像事前ロード
    PluginManager.registerCommand(
        pluginName,
        "Go_beforeloadImage",
        function (args) {
            globalConfigCAIS.updatePreloadSettings(args);

            // 画像の事前ロード処理
            for (let i = 1; i <= globalConfigCAIS.actorNumber; i++) {
                const baseFileName = globalConfigCAIS.currentFileName + i;

                ImageManager.loadFace(baseFileName);
                ImageManager.loadCharacter(baseFileName);

                if (globalConfigCAIS.useSvActors) {
                    for (
                        let battlerIndex = 1;
                        battlerIndex <= globalConfigCAIS.maxImagesPerPage;
                        battlerIndex++
                    ) {
                        const battlerFileName = `${baseFileName}_${battlerIndex}`;
                        ImageManager.loadSvActor(battlerFileName);
                    }
                }
            }
        }
    );

    // 新しいプラグインコマンドの登録
    PluginManager.registerCommand(
        pluginName,
        "directChangeActorImage",
        function (args) {
            try {
                // 引数の取得と変換
                const actorId = Number(args.actorId);
                const page = Number(args.page);
                const inputIndex = Number(args.index);
                const fileName = args.fileName || globalConfigCAIS.fileName;
                const faceOnly =
                    args.faceOnly === ""
                        ? globalConfigCAIS.faceOnlyMode
                        : args.faceOnly === "true";

                // インデックスの範囲チェック（1-8）
                if (inputIndex < 1 || inputIndex > 8) {
                    throw new Error(
                        `インデックスの値が不正です: ${inputIndex}\n` +
                            `有効な値は1から8までです。\n` +
                            `注意: プラグインパラメータでは9以上の値も入力できますが、` +
                            `実際には1-8の範囲のみが有効です。`
                    );
                }

                const index = inputIndex - 1;

                // ファイル名の生成
                const imageName = fileName + page;

                // 画像の存在チェック
                const face = ImageManager.loadFace(imageName);
                if (face.isError()) {
                    console.error(`Face image not found: ${imageName}`);
                    return;
                }

                // 顔画像のみモードでない場合、追加のチェック
                if (!faceOnly) {
                    const character = ImageManager.loadCharacter(imageName);
                    if (character.isError()) {
                        console.error(
                            `Character image not found: ${imageName}`
                        );
                        return;
                    }

                    if (globalConfigCAIS.useSvActors) {
                        const battlerName = `${imageName}_${index + 1}`;
                        const svActor = ImageManager.loadSvActor(battlerName);
                        if (svActor.isError()) {
                            console.error(
                                `SV Actor image not found: ${battlerName}`
                            );
                            return;
                        }
                    }
                }

                // アクター画像の更新
                const actor = $gameActors.actor(actorId);
                if (actor) {
                    // 顔画像は常に更新
                    actor.setFaceImage(imageName, index);

                    // 顔画像のみモードでない場合、他の画像も更新
                    if (!faceOnly) {
                        actor.setCharacterImage(imageName, index);

                        if (globalConfigCAIS.useSvActors) {
                            const battlerName = `${imageName}_${index + 1}`;
                            actor.setBattlerImage(battlerName);
                        }
                    }

                    $gamePlayer.refresh();
                }
            } catch (e) {
                console.error(e.message);
                if (Utils.isOptionValid("test")) {
                    alert(e.message); // テストプレイ時はアラート表示
                }
                return;
            }
        }
    );

    //----------------------------------------------------------------------------
    //  Scene_ChangeActorImageSystemクラスの定義
    //----------------------------------------------------------------------------
    function Scene_ChangeActorImageSystem() {
        this.initialize(...arguments);
    }

    Scene_ChangeActorImageSystem.prototype = Object.create(
        Scene_Base.prototype
    );
    Scene_ChangeActorImageSystem.prototype.constructor =
        Scene_ChangeActorImageSystem;

    Scene_ChangeActorImageSystem.prototype.initialize = function () {
        Scene_Base.prototype.initialize.call(this);
        globalConfigCAIS.selectingPage = 0;
        this.preLoad = 0;
        if (globalConfigCAIS.maxImagesPerPage > 8) {
            globalConfigCAIS._sceneState.maxImagesPerPage = 8;
        }
    };

    Scene_ChangeActorImageSystem.prototype.create = function () {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this.createWindowLayer();
        this.createWindows();
    };

    Scene_ChangeActorImageSystem.prototype.createBackground = function () {
        this.createBackgroundNoImage();
        this.createBackgroundImage();
    };

    Scene_ChangeActorImageSystem.prototype.createWindows = function () {
        this.createHelpWindow();
        this.createPageSelectWindow();
        this.createActorSelectWindow();
    };

    Scene_ChangeActorImageSystem.prototype.createBackgroundImage = function () {
        if (globalConfigCAIS.backgroundImage !== undefined) {
            const bitmap = ImageManager.loadParallax(
                globalConfigCAIS.backgroundImage
            );
            this.sprite_background = new Sprite(bitmap);
            this.sprite_background.x = 0;
            this.sprite_background.y = 0;
            this.addChild(this.sprite_background);
        }
    };

    Scene_ChangeActorImageSystem.prototype.createBackgroundNoImage =
        function () {
            if (globalConfigCAIS.backgroundColor !== undefined) {
                this.createColorBackground();
            } else {
                this.createSnapshotBackground();
            }
        };

    Scene_ChangeActorImageSystem.prototype.createColorBackground = function () {
        const sprite = new Sprite();
        const bitmap = new Bitmap(
            globalConfigCAIS.windowWidth,
            Graphics.height
        );
        try {
            bitmap.fillAll(globalConfigCAIS.backgroundColor);
        } catch (e) {
            bitmap.fillAll("#000000");
        }
        sprite.bitmap = bitmap;
        this.addChild(sprite);
    };

    Scene_ChangeActorImageSystem.prototype.createSnapshotBackground =
        function () {
            const backgroundSprite = new Sprite();
            backgroundSprite.bitmap = SceneManager.backgroundBitmap();
            this.addChild(backgroundSprite);
        };

    Scene_ChangeActorImageSystem.prototype.createHelpWindow = function () {
        const x = globalConfigCAIS.windowXOffset;
        const width = globalConfigCAIS.windowWidth;
        const rect = new Rectangle(x, 0, width - 10, 70);

        this._helpWindow = new Window_ActorInformationAndDescription(rect);
        this._helpWindow.backOpacity = globalConfigCAIS.windowOpacity;
        this._helpWindow.opacity = globalConfigCAIS.windowOpacity;
        this.addWindow(this._helpWindow);
    };

    //ページセレクト用のウインドウ生成
    Scene_ChangeActorImageSystem.prototype.createPageSelectWindow =
        function () {
            const x = globalConfigCAIS.windowXOffset;
            const rect = new Rectangle(x, 70, 200, Graphics.height - 80);

            this._pageSelect_Window = new Window_PageSelect(rect);
            this._pageSelect_Window.backOpacity =
                globalConfigCAIS.windowOpacity;
            this._pageSelect_Window.opacity = globalConfigCAIS.windowOpacity;
            this.addWindow(this._pageSelect_Window);

            this.setupPageSelectHandlers();
        };

    Scene_ChangeActorImageSystem.prototype.setupPageSelectHandlers =
        function () {
            this._pageSelect_Window.setHandler(
                "cancel",
                this.popScene.bind(this)
            );
            if (globalConfigCAIS.showCancelCommand) {
                this._pageSelect_Window.setHandler(
                    "cancel_",
                    this.popScene.bind(this)
                );
            }
            for (let i = 1; i <= globalConfigCAIS.page; i++) {
                this._pageSelect_Window.setHandler(
                    "page" + i,
                    this.onPageSelect.bind(this)
                );
            }
        };

    //ページセレクトされたら
    Scene_ChangeActorImageSystem.prototype.onPageSelect = function () {
        this._pageSelect_Window.deactivate();
        this._actorSelect_Window.activate();
        this._actorSelect_Window.select(0);
        this.setupActorHandlers();
    };

    // 新しいメソッド
    Scene_ChangeActorImageSystem.prototype.setupActorHandlers = function () {
        for (let i = 0; i < globalConfigCAIS.maxImagesPerPage; i++) {
            const actorNumber = i + 1;
            this._actorSelect_Window.setHandler(
                "actor" + actorNumber,
                this.onActorSelect.bind(this)
            );
        }
    };

    //キャラクターが選択されたら
    Scene_ChangeActorImageSystem.prototype.onActorSelect = function () {
        const selectedActor = this.getSelectedActor();
        if (this.isActorImageValid(selectedActor[0], selectedActor[1])) {
            this.updateActorImage(selectedActor[0], selectedActor[1]);
            this.finishActorSelection(true);
        } else {
            SoundManager.playBuzzer();
            this._pageSelect_Window.deactivate();
            this._actorSelect_Window.activate();
        }
    };

    // 新しいメソッド
    Scene_ChangeActorImageSystem.prototype.finishActorSelection = function (
        success
    ) {
        this._pageSelect_Window.activate();
        this._actorSelect_Window.deactivate();
        this._actorSelect_Window.select(-1);
        if (success) {
            SoundManager.playOk();
            this.popScene();
        }
    };

    //アクター画面からキャンセルされたら
    Scene_ChangeActorImageSystem.prototype.onActorCancel = function () {
        this.finishActorSelection(false);
        SoundManager.playCancel();
    };

    //選択されているアクターゲット
    Scene_ChangeActorImageSystem.prototype.getSelectedActor = function () {
        const selectPage =
            globalConfigCAIS.selectingPage +
            (globalConfigCAIS.showCancelCommand ? 0 : 1);
        const index = this._actorSelect_Window.index() + 1; // 1ベースに変換
        const pageName = globalConfigCAIS.fileName + selectPage;
        return [pageName, index];
    };

    //イメージが存在するかどうかをチェックする
    Scene_ChangeActorImageSystem.prototype.isActorImageValid = function (
        name,
        index
    ) {
        // 現在選択中のページが有効なアクター数の範囲内かを判定
        const currentPage = globalConfigCAIS.selectingPage;
        if (currentPage > globalConfigCAIS.actorNumber) {
            return false;
        }

        // フェイス画像のチェックは必須
        const face = ImageManager.loadFace(name);
        if (face.isError()) {
            return false;
        }

        // 顔画像のみモードでない場合、他の画像もチェック
        if (!globalConfigCAIS.faceOnlyMode) {
            const character = ImageManager.loadCharacter(name);
            if (character.isError()) {
                return false;
            }

            if (globalConfigCAIS.useSvActors) {
                const battlerName = `${name}_${index + 1}`;
                const svActor = ImageManager.loadSvActor(battlerName);
                if (svActor.isError()) {
                    return false;
                }
            }
        }

        return true;
    };

    //選択されているアクターセット
    Scene_ChangeActorImageSystem.prototype.updateActorImage = function (
        name,
        index
    ) {
        const actor = $gameActors.actor(globalConfigCAIS.changeActorId);
        const adjustedIndex = index - 1; // インデックスを0ベースに変換

        // 顔画像は常に更新
        actor.setFaceImage(name, adjustedIndex);

        // 顔画像のみモードでない場合のみ、他の画像を更新
        if (!globalConfigCAIS.faceOnlyMode) {
            actor.setCharacterImage(name, adjustedIndex);

            if (globalConfigCAIS.useSvActors) {
                const battlerName = `${name}_${index}`; // こちらは1ベースのまま
                const svActor = ImageManager.loadSvActor(battlerName);
                if (!svActor.isError()) {
                    actor.setBattlerImage(battlerName);
                }
            }
        }

        $gamePlayer.refresh();
    };

    //アクターセレクト用のウインドウ生成
    Scene_ChangeActorImageSystem.prototype.createActorSelectWindow =
        function () {
            const x = globalConfigCAIS.windowXOffset;
            const width = globalConfigCAIS.windowWidth;
            const rect = new Rectangle(
                x + 200,
                70,
                width - 210,
                Graphics.height - 80
            );

            this._actorSelect_Window = new Window_ActorSelect(rect);
            this._actorSelect_Window.deactivate();
            this._actorSelect_Window.select(-1);
            this._actorSelect_Window.backOpacity =
                globalConfigCAIS.windowOpacity;
            this._actorSelect_Window.opacity = globalConfigCAIS.windowOpacity;
            this.addWindow(this._actorSelect_Window);
            this._actorSelect_Window.setHandler(
                "cancel",
                this.onActorCancel.bind(this)
            );
        };

    Scene_ChangeActorImageSystem.prototype.update = function () {
        Scene_Base.prototype.update.call(this);
        this.updateInput();
        this.updatePreload();
    };

    Scene_ChangeActorImageSystem.prototype.updatePreload = function () {
        if (this.preLoad < 2) {
            this._actorSelect_Window.refresh();
            this.preLoad++;
        }
    };

    Scene_ChangeActorImageSystem.prototype.updateInput = function () {
        if (this._pageSelect_Window.isOpenAndActive()) {
            this.updatePageSelection();
        }
        if (this._actorSelect_Window.isOpenAndActive()) {
            this.updateActorSelection();
        }
    };

    Scene_ChangeActorImageSystem.prototype.updatePageSelection = function () {
        if (this.isPageSelectionTriggered()) {
            globalConfigCAIS.selectingPage = this._pageSelect_Window.index();
            this._actorSelect_Window.refresh();
            this.preLoad = 0;
        }
    };

    Scene_ChangeActorImageSystem.prototype.isPageSelectionTriggered =
        function () {
            return (
                Input.isRepeated("up") ||
                Input.isRepeated("down") ||
                Input.isRepeated("pageup") ||
                Input.isRepeated("pagedown") ||
                TouchInput.isHovered()
            );
        };

    Scene_ChangeActorImageSystem.prototype.updateActorSelection = function () {
        if (Input.isTriggered("cancel")) {
            this.onActorCancel();
        } else if (Input.isTriggered("ok")) {
            this.onActorSelect();
        }
    };

    //----------------------------------------------------------------------------
    // 説明用のウインドウ
    //----------------------------------------------------------------------------
    function Window_ActorInformationAndDescription() {
        this.initialize(...arguments);
    }

    Window_ActorInformationAndDescription.prototype = Object.create(
        Window_Base.prototype
    );
    Window_ActorInformationAndDescription.prototype.constructor =
        Window_ActorInformationAndDescription;

    Window_ActorInformationAndDescription.prototype.initialize = function (
        rect
    ) {
        Window_Base.prototype.initialize.call(this, rect);
        this.drawHelpText();
    };

    Window_ActorInformationAndDescription.prototype.refresh = function () {
        this.contents.clear();
        this.drawHelpText();
    };

    Window_ActorInformationAndDescription.prototype.drawHelpText = function () {
        const actor = $gameActors.actor(globalConfigCAIS.changeActorId);
        const actorName = actor.name();

        // アクター名と説明文の描画
        this.changeTextColor(
            ColorManager.textColor(globalConfigCAIS.textColor)
        );
        this.drawText(actorName + globalConfigCAIS.helpText, 48, 0);
        this.resetTextColor();

        // アクターのキャラチップ描画
        this.drawCharacter(actor._characterName, actor._characterIndex, 20, 42);
    };

    Window_ActorInformationAndDescription.prototype.loadWindowskin =
        function () {
            this.windowskin = ImageManager.loadSystem(
                globalConfigCAIS.windowSkin
            );
        };

    //----------------------------------------------------------------------------
    // ページセレクト用のウインドウ
    //----------------------------------------------------------------------------
    function Window_PageSelect() {
        this.initialize(...arguments);
    }

    Window_PageSelect.prototype = Object.create(Window_Command.prototype);
    Window_PageSelect.prototype.constructor = Window_PageSelect;

    Window_PageSelect.prototype.initialize = function (rect) {
        Window_Command.prototype.initialize.call(this, rect);
    };

    Window_PageSelect.prototype.itemHeight = function () {
        return 48; // 固定の高さを維持
    };

    Window_PageSelect.prototype.maxVisibleItems = function () {
        return this._list ? this._list.length : 1; // 元の実装に戻す
    };

    Window_PageSelect.prototype.maxItems = function () {
        return this._list ? this._list.length : 0; // 標準のmaxItems
    };

    Window_PageSelect.prototype.makeCommandList = function () {
        // キャンセルコマンドの追加
        if (globalConfigCAIS.showCancelCommand) {
            this.addCommand(globalConfigCAIS.cancelText, "cancel_", true);
        }

        // ページコマンドの追加
        for (let i = 1; i <= globalConfigCAIS.page; i++) {
            this.addCommand(globalConfigCAIS.pageText + i, "page" + i, true);
        }
    };

    // ensureCursorVisibleは維持（選択位置の表示制御に必要）
    Window_PageSelect.prototype.ensureCursorVisible = function () {
        const row = Math.floor(this.index() / this.maxCols());
        const scrollY = row * this.itemHeight() - this._scrollY;

        if (scrollY < 0) {
            this.scrollTo(0, this._scrollY + scrollY);
        } else if (scrollY + this.itemHeight() > this.innerHeight) {
            this.scrollTo(
                0,
                this._scrollY + scrollY + this.itemHeight() - this.innerHeight
            );
        }
    };

    // selectメソッドをオーバーライド
    Window_PageSelect.prototype.select = function (index) {
        Window_Command.prototype.select.call(this, index);
        if (this.active && index >= 0) {
            this.ensureCursorVisible();
        }
    };

    //----------------------------------------------------------------------------
    // アクターセレクト用のウインドウ
    //----------------------------------------------------------------------------
    function Window_ActorSelect() {
        this.initialize(...arguments);
    }

    Window_ActorSelect.prototype = Object.create(Window_Command.prototype);
    Window_ActorSelect.prototype.constructor = Window_ActorSelect;

    Window_ActorSelect.prototype.initialize = function (rect) {
        this._actor_image = [];
        this.loadImages();
        Window_Command.prototype.initialize.call(this, rect);
    };

    Window_ActorSelect.prototype.makeCommandList = function () {
        for (let i = 0; i < globalConfigCAIS.maxImagesPerPage; i++) {
            const actorNumber = i + 1;
            this.addCommand("actor" + actorNumber, "actor" + actorNumber, true);
        }
    };

    Window_ActorSelect.prototype.drawItemImage = function (index) {
        const rect = this.itemRect(index);
        const offset = globalConfigCAIS.showCancelCommand ? -1 : 0;
        const currentImage =
            this._actor_image[globalConfigCAIS.selectingPage + offset];

        if (currentImage) {
            const adjustedIndex = index; // 表示用インデックスは0ベース
            const faceY = globalConfigCAIS.faceOnlyMode
                ? rect.y + 20
                : rect.y + 10;

            // 顔グラフィックの描画
            this.drawFace(
                currentImage,
                adjustedIndex,
                rect.x + (rect.width - globalConfigCAIS.faceWidth) / 2,
                faceY,
                ImageManager.faceWidth,
                ImageManager.faceHeight,
                globalConfigCAIS.faceWidth,
                globalConfigCAIS.faceWidth
            );

            // 顔画像のみモードでない場合のみ、キャラクターとバトラーを描画
            if (!globalConfigCAIS.faceOnlyMode) {
                if (globalConfigCAIS.useSvActors) {
                    this.drawActorCharacterAndBattler(
                        currentImage,
                        adjustedIndex,
                        rect
                    );
                } else {
                    this.drawActorCharacter(currentImage, adjustedIndex, rect);
                }
            }
        }
    };

    Window_ActorSelect.prototype.drawFace = function (
        faceName,
        faceIndex,
        x,
        y,
        width,
        height,
        resizewidth,
        resizeheight
    ) {
        width = width || ImageManager.faceWidth;
        height = height || ImageManager.faceHeight;
        resizewidth = resizewidth || ImageManager.faceWidth;
        resizeheight = resizeheight || ImageManager.faceHeight;

        const bitmap = ImageManager.loadFace(faceName);
        const pw = ImageManager.faceWidth;
        const ph = ImageManager.faceHeight;
        const sw = Math.min(width, pw);
        const sh = Math.min(height, ph);
        const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
        const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
        const sx = (faceIndex % 4) * pw + (pw - sw) / 2;
        const sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
        this.contents.blt(
            bitmap,
            sx,
            sy,
            sw,
            sh,
            dx,
            dy,
            resizewidth,
            resizeheight
        );
    };

    Window_ActorSelect.prototype.drawActorCharacterAndBattler = function (
        imageName,
        index,
        rect
    ) {
        const faceHeight = globalConfigCAIS.faceWidth;
        const baseY = rect.y + faceHeight + 90;
        const centerX = rect.x - 20 + rect.width / 2;
        const spacing = 20;

        this.drawCharacter(imageName, index, centerX - spacing, baseY);

        if (globalConfigCAIS.useSvActors) {
            const battlerName = `${imageName}_${index + 1}`; // SVアクター用は1ベースに変換
            this.drawBattler(battlerName, index, centerX + spacing, baseY - 60);
        }
    };

    Window_ActorSelect.prototype.drawActorCharacter = function (
        imageName,
        index,
        rect
    ) {
        // フェイス画像の高さに基づいて表示位置を調整
        const faceHeight = globalConfigCAIS.faceWidth;
        const baseY = rect.y + faceHeight + 90; // 余白を増やす

        this.drawCharacter(imageName, index, rect.x + rect.width / 2, baseY);
    };

    Window_ActorSelect.prototype.drawBattler = function (
        characterName,
        characterIndex,
        x,
        y
    ) {
        const bitmap = ImageManager.loadSvActor(characterName);
        this.contents.blt(bitmap, 0, 0, 64, 64, x, y);
    };

    Window_ActorSelect.prototype.numVisibleRows = function () {
        return 2;
    };

    Window_ActorSelect.prototype.maxCols = function () {
        return 4;
    };

    Window_ActorSelect.prototype.loadImages = function () {
        this._actor_image = [];
        for (let i = 1; i <= globalConfigCAIS.actorNumber; i++) {
            const baseFileName = globalConfigCAIS.fileName + i;
            this._actor_image[i - 1] = baseFileName;
        }
    };

    Window_ActorSelect.prototype.maxItems = function () {
        return globalConfigCAIS._sceneState.maxImagesPerPage; // _sceneStateの値を使用
    };

    Window_ActorSelect.prototype.itemHeight = function () {
        const clientHeight = this.height - this.padding * 2;
        return Math.floor(clientHeight / this.numVisibleRows());
    };

    Window_ActorSelect.prototype.drawItem = function (index) {
        this.drawItemImage(index);
    };
})();
