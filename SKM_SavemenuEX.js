/*=============================================================================
SKM_savemenuEX.js
----------------------------------------------------------------------------
 Version
 1.0.0 2025/01/19 初版
----------------------------------------------------------------------------

=============================================================================*/

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
    // Scene_Save

    // セーブ成功時の処理を上書き
    const _Scene_Save_onSaveSuccess = Scene_Save.prototype.onSaveSuccess;
    Scene_Save.prototype.onSaveSuccess = function () {
        SoundManager.playSave();
        this.activateListWindow();
        this._listWindow.refresh();
    };

    //-----------------------------------------------------------------------------
    // Scene_Remove

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

    Scene_Remove.prototype.onSavefileOk = function () {
        Scene_File.prototype.onSavefileOk.call(this);
        const savefileId = this.savefileId();
        if (this.isSavefileEnabled(savefileId)) {
            this.executeRemove(savefileId);
        } else {
            this.onRemoveFailure();
        }
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

    window.Scene_Remove = Scene_Remove;

    //-----------------------------------------------------------------------------
    // DataManager

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
})();
