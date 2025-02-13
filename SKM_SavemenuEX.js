//=============================================================================
// SKM_savemenuEX.js
//=============================================================================
// Copyright (c) 2023 Sakananomaeasi
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.1.0 2025/02/14 確認ダイアログ機能を統合
// 1.0.0 2025/01/19 初版
// ----------------------------------------------------------------------------

/*:
 * @plugindesc セーブメニュー＞データ管理コマンド置き換えプラグイン
 * @target MZ
 * @author さかなのまえあし
 *
 * @param date
 * @text データ管理の項目名
 * @desc メニューのセーブを置き換える項目名です。
 * @default データ管理
 *
 * @param save
 * @text セーブ項目名
 * @desc セーブの項目名です。
 * @default セーブ
 *
 * @param load
 * @text ロード項目名
 * @desc ロードの項目名です。
 * @default ロード
 *
 * @param remove
 * @text データ削除項目名
 * @desc データ削除の項目名です。
 * @default データ削除
 *
 * @param message
 * @text 削除メッセージ
 * @desc データ削除画面上部に表示するメッセージ
 * @default どのファイルを削除しますか？
 *
 *
 * @param seParam
 * @text 削除時効果音
 * @desc ファイル削除時に効果音を鳴らします。
 * @type struct<audio>
 * @default {"name":"Decision5","volume":"90","pitch":"100","pan":"0"}
 *
 * @param confirmSettings
 * @text 確認ダイアログ設定
 * @desc 確認ダイアログに関する設定です
 *
 * @param saveConfirm
 * @text セーブ画面に確認表示
 * @desc セーブ画面に確認ダイアログを追加します。
 * @default true
 * @type boolean
 * @parent confirmSettings
 *
 * @param loadConfirm
 * @text ロード画面に確認表示
 * @desc ロード画面に確認ダイアログを追加します。
 * @default true
 * @type boolean
 * @parent confirmSettings
 *
 * @param removeConfirm
 * @text データ削除画面に確認表示
 * @desc データ削除画面に確認ダイアログを追加します。
 * @default true
 * @type boolean
 * @parent confirmSettings
 *
 * @param terms
 * @text 確認ウインドウ用語設定
 * @desc 確認ダイアログで使用する用語の設定です
 *
 * @param termSave
 * @text 用語[セーブ]
 * @desc 確認ウィンドウやヘルプで使用する[セーブ]に該当する用語です。
 * @default セーブ
 * @parent terms
 *
 * @param termoverwrite
 * @text 用語[上書き]
 * @desc 確認ウィンドウやヘルプで使用する[セーブ]の[上書き]に該当する用語です。
 * @default 上書き
 * @parent terms
 *
 * @param termLoad
 * @text 用語[ロード]
 * @desc 確認ウィンドウやヘルプで使用する[ロード]に該当する用語です。
 * @default ロード
 * @parent terms
 *
 * @param termRemove
 * @text 用語[データ削除]
 * @desc 確認ウィンドウやヘルプで使用する[データ削除]に該当する用語です。
 * @default データ削除
 * @parent terms
 * 
 * @param confirmOk
 * @text 確認画面OK文言
 * @desc 確認ウィンドウのOKに相当するテキストです。%1で用語（セーブ or ロード）に置き換えられます。
 * @default %1する
 * @parent terms
 *
 * @param confirmNg
 * @text 確認画面NG文言
 * @desc 確認ウィンドウのNGに相当するテキストです。
 * @default しない
 * @parent terms
 *
 * @param helpText
 * @text 確認ヘルプ文言
 * @desc 確認ウィンドウ表示時にヘルプウィンドウに表示するテキストです。%1で用語（セーブ or ロード）に置き換えられます。
 * @default %1してもよろしいですか？
 * @parent terms
 *
 * @param windowSettings
 * @text ウィンドウ設定
 * @desc 確認ダイアログのウィンドウに関する設定です
 *
 * @param confirmWidth
 * @text 確認ウィンドウ横幅
 * @desc 確認ダイアログの横幅を指定します。
 * @default 320
 * @type number
 * @parent windowSettings
 *
 * @param windowThrough
 * @text ウィンドウ透過
 * @desc 確認ウィンドウを透過し背後が見えるようにします。
 * @default false
 * @type boolean
 * @parent windowSettings
 *
 * @param defaultCancelSettings
 * @text 初期キャンセル設定
 * @desc 各画面での確認ダイアログの初期カーソル位置設定です
 *
 * @param defaultCancelSave
 * @text 初期キャンセル(セーブ)
 * @desc セーブ画面の確認ウィンドウのカーソル初期値が「しない」になります。
 * @default false
 * @type boolean
 * @parent defaultCancelSettings
 *
 * @param defaultCancelLoad
 * @text 初期キャンセル(ロード)
 * @desc ロード画面の確認ウィンドウのカーソル初期値が「しない」になります。
 * @default false
 * @type boolean
 * @parent defaultCancelSettings
 *
 * @param defaultCancelRemove
 * @text 初期キャンセル(データ削除)
 * @desc データ削除画面の確認ウィンドウのカーソル初期値が「しない」になります。
 * @default false
 * @type boolean
 * @parent defaultCancelSettings
 *

 *
 * @help SKM_savemenuEX.js
 *
 * メニューのセーブコマンドをデータ管理メニューに入れるようカスタマイズします。
 * 選択すると以下のコマンドが新たに表示されます
 * ・セーブ
 * ・ロード
 * ・データ削除
 * ・やめる
 *
 * ■ 確認ダイアログ機能
 * セーブ、ロード、データ削除の各操作時に確認ダイアログを表示できます。
 * プラグインパラメータで以下の設定が可能です：
 * 
 * 1. 確認ダイアログの表示/非表示
 *   - セーブ確認の表示（saveConfirm）
 *   - ロード確認の表示（loadConfirm）
 *   - 削除確認の表示（removeConfirm）
 * 
 * 2. 確認ダイアログの表示設定
 *   - ウィンドウ横幅（confirmWidth）
 *   - ウィンドウ透過（windowThrough）
 *   - 確認メッセージ（helpText）
 * 
 * 3. 確認ダイアログの初期カーソル位置
 *   - セーブ時の初期カーソル（defaultCancelSave）
 *   - ロード時の初期カーソル（defaultCancelLoad）
 *   - 削除時の初期カーソル（defaultCancelRemove）
 *   ※trueに設定すると「しない」が初期選択になります
 * 
 * 4. 確認ダイアログの用語設定
 *   - セーブ用語（termSave）
 *   - 上書き用語（termoverwrite）
 *   - ロード用語（termLoad）
 *   - データ削除用語（termRemove）
 *   - 確認OK文言（confirmOk）※%1は操作名に置き換わります
 *   - 確認NG文言（confirmNg）
 * 
 * ■ 利用規約
 * このプラグインは、MITライセンスのもと、商用利用、改変、再配布が可能です。
 * http://opensource.org/licenses/mit-license.php
 * 
 * ■ 更新履歴
 * 1.1.0 2025/02/14 確認ダイアログ機能を統合
 * 1.0.0 2025/01/19 初版
 */

/*~struct~audio:
 *
 * @param name
 * @text ファイル名
 * @type file
 * @dir audio/se
 *
 * @param volume
 * @text 音量
 * @type number
 * @default 90
 *
 * @param pitch
 * @text ピッチ
 * @type number
 * @default 100
 *
 * @param pan
 * @text 位相
 * @type number
 * @default 0
 * @min -100
 *
 */

(() => {
    "use strict";
    const script = document.currentScript;

    // 直接パラメータを取得する関数を定義
    function getPluginParameters() {
        const params = PluginManager.parameters("SKM_savemenuEX");
        return {
            date: params["date"] || "データ管理",
            save: params["save"] || "セーブ",
            load: params["load"] || "ロード",
            remove: params["remove"] || "データ削除",
            message: params["message"] || "どのファイルを削除しますか？",
            seParam: JSON.parse(
                params["seParam"] ||
                    '{"name":"Decision5","volume":"90","pitch":"100","pan":"0"}'
            ),
            confirmSettings: params["confirmSettings"] || "true",
            saveConfirm: params["saveConfirm"] === "true",
            loadConfirm: params["loadConfirm"] === "true",
            removeConfirm: params["removeConfirm"] === "true",
            terms: params["terms"] || "",
            termSave: params["termSave"] || "セーブ",
            termoverwrite: params["termoverwrite"] || "上書き",
            termLoad: params["termLoad"] || "ロード",
            confirmOk: params["confirmOk"] || "%1する",
            confirmNg: params["confirmNg"] || "しない",
            helpText: params["helpText"] || "%1してもよろしいですか？",
            windowSettings: params["windowSettings"] || "",
            confirmWidth: Number(params["confirmWidth"] || 320),
            windowThrough: params["windowThrough"] === "true",
            defaultCancelSettings: params["defaultCancelSettings"] || "",
            defaultCancelSave: params["defaultCancelSave"] === "true",
            defaultCancelLoad: params["defaultCancelLoad"] === "true",
            defaultCancelRemove: params["defaultCancelRemove"] === "true",
            termRemove: params["termRemove"] || "データ削除",
        };
    }

    const param = getPluginParameters(); // パラメータを取得

    //=============================================================================
    //
    //  メニューのセーブをデータに置き換えます
    //=============================================================================

    const _Scene_Menu_createCommandWindow =
        Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        _Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.setHandler("date", this.commandLoad.bind(this));
    };

    Scene_Menu.prototype.commandLoad = function () {
        SceneManager.push(Scene_GameDate);
    };

    const _Window_MenuCommand_addSaveCommand =
        Window_MenuCommand.prototype.addSaveCommand;
    Window_MenuCommand.prototype.addSaveCommand = function () {
        this.addCommand(param.date, "date");
    };

    //-----------------------------------------------------------------------------
    // Window_GameDate
    //
    // The window for selecting "Go to Title" on the game end screen.

    function Window_GameDate() {
        this.initialize(...arguments);
    }

    Window_GameDate.prototype = Object.create(Window_Command.prototype);
    Window_GameDate.prototype.constructor = Window_GameDate;

    Window_GameDate.prototype.initialize = function (rect) {
        Window_Command.prototype.initialize.call(this, rect);
        this.openness = 0;
        this.open();
    };

    Window_GameDate.prototype.makeCommandList = function () {
        this.addCommand(param.save, "save");
        this.addCommand(param.load, "load");
        this.addCommand(param.remove, "removeSaveFile");
        this.addCommand(TextManager.cancel, "cancel");
    };

    //-----------------------------------------------------------------------------
    // Scene_GameDate
    //
    // The scene class of the game end screen.

    function Scene_GameDate() {
        this.initialize(...arguments);
    }

    Scene_GameDate.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_GameDate.prototype.constructor = Scene_GameDate;

    Scene_GameDate.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_GameDate.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createCommandWindow();
    };

    Scene_GameDate.prototype.stop = function () {
        Scene_MenuBase.prototype.stop.call(this);
        this._commandWindow.close();
    };

    Scene_GameDate.prototype.createBackground = function () {
        Scene_MenuBase.prototype.createBackground.call(this);
        this.setBackgroundOpacity(128);
    };

    Scene_GameDate.prototype.createCommandWindow = function () {
        const rect = this.commandWindowRect();
        this._commandWindow = new Window_GameDate(rect);
        this._commandWindow.setHandler("load", this.commandLoad.bind(this));
        this._commandWindow.setHandler("save", this.commandSave.bind(this));
        this._commandWindow.setHandler(
            "removeSaveFile",
            this.commandRemove.bind(this)
        );
        this._commandWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(this._commandWindow);
    };

    Scene_GameDate.prototype.commandLoad = function () {
        this._commandWindow.close();
        SceneManager.push(Scene_Load);
    };

    Scene_GameDate.prototype.commandSave = function () {
        this._commandWindow.close();
        SceneManager.push(Scene_Save);
    };

    Scene_GameDate.prototype.commandRemove = function () {
        this._commandWindow.close();
        SceneManager.push(Scene_Remove);
    };

    Scene_GameDate.prototype.commandWindowRect = function () {
        const ww = this.mainCommandWidth();
        const wh = this.calcWindowHeight(4, true);
        const wx = (Graphics.boxWidth - ww) / 2;
        const wy = (Graphics.boxHeight - wh) / 2;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_GameDate.prototype.commandToTitle = function () {
        this.fadeOutAll();
        SceneManager.goto(Scene_Title);
        Window_TitleCommand.initCommandPosition();
    };

    //-----------------------------------------------------------------------------
    // Scene_Save拡張
    //-----------------------------------------------------------------------------
    const _Scene_Save_onSavefileOk = Scene_Save.prototype.onSavefileOk;
    Scene_Save.prototype.onSavefileOk = function () {
        this.createConfirmWindowIfNeed();
        if (this._confirmWindow) {
            this._confirmHandler = _Scene_Save_onSavefileOk.bind(this);
        } else {
            _Scene_Save_onSavefileOk.apply(this, arguments);
        }
    };

    const _Scene_Save_onSaveSuccess = Scene_Save.prototype.onSaveSuccess;
    Scene_Save.prototype.onSaveSuccess = function () {
        if (this._confirmWindow) {
            this._confirmWindow.close();
            this._confirmWindow.deactivate();
        }
        SoundManager.playSave();
        this.activateListWindow();
        this._listWindow.refresh();
    };

    Scene_Save.prototype.isNeedConfirm = function () {
        return (
            param.saveConfirm && Scene_File.prototype.isNeedConfirm.call(this)
        );
    };

    Scene_Save.prototype.findTerm = function () {
        const savefileId = this.savefileId();
        return DataManager.savefileExists(savefileId)
            ? param.termoverwrite
            : param.termSave;
    };

    Scene_Save.prototype.isDefaultCancel = function () {
        return param.defaultCancelSave;
    };

    //-----------------------------------------------------------------------------
    // Scene_Load拡張
    //-----------------------------------------------------------------------------
    const _Scene_Load_onSavefileOk = Scene_Load.prototype.onSavefileOk;
    Scene_Load.prototype.onSavefileOk = function () {
        this.createConfirmWindowIfNeed();
        if (this._confirmWindow) {
            this._confirmHandler = _Scene_Load_onSavefileOk.bind(this);
        } else {
            _Scene_Load_onSavefileOk.apply(this, arguments);
        }
    };

    Scene_Load.prototype.isNeedConfirm = function () {
        return (
            param.loadConfirm && Scene_File.prototype.isNeedConfirm.call(this)
        );
    };

    Scene_Load.prototype.findTerm = function () {
        return param.termLoad;
    };

    Scene_Load.prototype.isDefaultCancel = function () {
        return param.defaultCancelLoad;
    };

    //-----------------------------------------------------------------------------
    // Scene_File拡張
    //-----------------------------------------------------------------------------

    Scene_File.prototype.createConfirmWindowIfNeed = function () {
        if (this._confirmWindow) {
            this._windowLayer.removeChild(this._confirmWindow);
        }
        this._confirmWindow = null;
        if (!this.isNeedConfirm()) {
            return;
        }
        const confirm = new Window_SaveFileConfirm(this.confirmWindowRect());
        confirm.setHandler("ok", this.onConfirmOk.bind(this));
        confirm.setHandler("cancel", this.onConfirmNg.bind(this));
        confirm.setTerm(this.findTerm());
        confirm.refresh();
        confirm.open();
        confirm.activate();
        if (this.isDefaultCancel()) {
            confirm.select(1);
        }
        this._confirmWindow = confirm;
        this._confirmHandler = null;
        this._helpWindow.setText(param.helpText.format(this.findTerm()));
        this.addWindow(this._confirmWindow);
    };

    Scene_File.prototype.confirmWindowRect = function () {
        const ww = param.confirmWidth || 320;
        const wh = this.calcWindowHeight(2, true);
        const wx = (Graphics.boxWidth - ww) / 2;
        const wy = (Graphics.boxHeight - wh) / 2;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_File.prototype.isNeedConfirm = function () {
        const savefileId = this.savefileId();
        return this.isSavefileEnabled(savefileId);
    };

    Scene_File.prototype.findTerm = function () {
        return "";
    };

    Scene_File.prototype.isDefaultCancel = function () {
        return false;
    };

    Scene_File.prototype.onConfirmOk = function () {
        if (this._confirmWindow.index() === 0) {
            this._confirmHandler();
        } else {
            this.onConfirmNg();
        }
    };

    Scene_File.prototype.onConfirmNg = function () {
        this._confirmWindow.deactivate();
        this._confirmWindow.close();
        this._listWindow.activate();
        this._helpWindow.setText(this.helpWindowText());
    };

    //-----------------------------------------------------------------------------
    // Window_SaveFileConfirm
    //-----------------------------------------------------------------------------

    class Window_SaveFileConfirm extends Window_Command {
        constructor(rect) {
            super(rect);
            this.openness = 0;
            this._isWindow = !param.windowThrough;
        }

        setTerm(term) {
            this._term = term;
        }

        makeCommandList() {
            this.addCommand(param.confirmOk.format(this._term), "ok");
            this.addCommand(param.confirmNg.format(this._term), "ng");
        }

        playOkSound() {
            if (this.index() !== 0) {
                super.playOkSound();
            }
        }
    }
    window.Window_SaveFileConfirm = Window_SaveFileConfirm;

    //-----------------------------------------------------------------------------
    // Scene_Remove
    //-----------------------------------------------------------------------------
    function Scene_Remove() {
        this.initialize(...arguments);
    }

    Scene_Remove.prototype = Object.create(Scene_File.prototype);
    Scene_Remove.prototype.constructor = Scene_Remove;

    Scene_Remove.prototype.initialize = function () {
        Scene_File.prototype.initialize.call(this);
    };

    Scene_Remove.prototype.helpWindowText = function () {
        return param.message;
    };

    Scene_Remove.prototype.executeRemove = function (savefileId) {
        try {
            DataManager.removeGame(savefileId);
            this.onRemoveSuccess();
        } catch (e) {
            console.error(e);
            this.onRemoveFailure();
        }
    };

    Scene_Remove.prototype.onRemoveSuccess = function () {
        AudioManager.playSe(param.seParam);
        this.activateListWindow();
        this._listWindow.refresh();
    };

    Scene_Remove.prototype.onRemoveFailure = function () {
        SoundManager.playBuzzer();
        this.activateListWindow();
    };

    Scene_Remove.prototype.onSavefileOk = function () {
        const savefileId = this.savefileId();
        if (DataManager.savefileExists(savefileId)) {
            Window_Selectable.prototype.playOkSound.call(this);
            if (param.removeConfirm) {
                this.createConfirmWindowIfNeed();
            } else {
                this.executeRemove(savefileId);
            }
        } else {
            this.onRemoveFailure();
        }
    };

    Scene_Remove.prototype.findTerm = function () {
        return param.termRemove;
    };

    Scene_Remove.prototype.isNeedConfirm = function () {
        return (
            param.removeConfirm && DataManager.savefileExists(this.savefileId())
        );
    };

    Scene_Remove.prototype.isDefaultCancel = function () {
        return param.defaultCancelRemove;
    };

    Scene_Remove.prototype.onConfirmOk = function () {
        if (this._confirmWindow.index() === 0) {
            this._confirmWindow.close();
            this._confirmWindow.deactivate();
            this.executeRemove(this.savefileId());
        } else {
            this.onConfirmNg();
        }
    };

    Scene_Remove.prototype.onConfirmNg = function () {
        this._confirmWindow.deactivate();
        this._confirmWindow.close();
        this._listWindow.activate();
        this._helpWindow.setText(this.helpWindowText());
    };

    //-----------------------------------------------------------------------------
    // Window_SavefileList拡張
    //-----------------------------------------------------------------------------
    const _Window_SavefileList_playOkSound =
        Window_SavefileList.prototype.playOkSound;
    Window_SavefileList.prototype.playOkSound = function () {
        _Window_SavefileList_playOkSound.apply(this, arguments);
        if (SceneManager._scene.isNeedConfirm()) {
            Window_Base.prototype.playOkSound.call(this);
        }
    };

    //-----------------------------------------------------------------------------
    // DataManager拡張
    //-----------------------------------------------------------------------------
    DataManager.removeGame = function (savefileId) {
        const saveName = this.makeSavename(savefileId);
        StorageManager.remove(saveName);

        const info = this._globalInfo;
        delete info[savefileId];
        if (info.length > 0) {
            let len = info.length;
            for (let i = info.length - 1; i >= 0; i--) {
                if (info[i]) {
                    break;
                }
                len = i;
            }
            info.length = len;
        }
        this.saveGlobalInfo(info);
    };

    window.Scene_Remove = Scene_Remove;
})();
