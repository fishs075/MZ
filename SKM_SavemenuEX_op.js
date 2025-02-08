/*=============================================================================
 SKM_SavemenuEX_op.js
----------------------------------------------------------------------------
 Version
 1.0.0 2025/01/19 初版
----------------------------------------------------------------------------

=============================================================================*/

/*:
 * @plugindesc セーブ確認ダイアログプラグイン
 * @target MZ
 * @orderAfter SKM_SavemenuEX
 * @author さかなのまえあし
 *
 * @param saveConfirm
 * @text セーブ画面に確認表示
 * @desc セーブ画面に確認ダイアログを追加します。
 * @default true
 * @type boolean
 *
 * @param loadConfirm
 * @text ロード画面に確認表示
 * @desc ロード画面に確認ダイアログを追加します。
 * @default true
 * @type boolean
 *
 * @param removeConfirm
 * @text データ削除画面に確認表示
 * @desc データ削除画面に確認ダイアログを追加します。
 * @default true
 * @type boolean
 *
 * @param termSave
 * @text 用語[セーブ]
 * @desc 確認ウィンドウやヘルプで使用する[セーブ]に該当する用語です。
 * @default セーブ
 *
 * @param termoverwrite
 * @text 用語[上書き]
 * @desc 確認ウィンドウやヘルプで使用する[セーブ]の[上書き]に該当する用語です。
 * @default 上書き
 *
 * @param termLoad
 * @text 用語[ロード]
 * @desc 確認ウィンドウやヘルプで使用する[ロード]に該当する用語です。
 * @default ロード
 *
 * @param termRemove
 * @text 用語[データ削除]
 * @desc 確認ウィンドウやヘルプで使用する[データ削除]に該当する用語です。
 * @default データ削除
 *
 * @param confirmOk
 * @text 確認画面OK文言
 * @desc 確認ウィンドウのOKに相当するテキストです。%1で用語（セーブ or ロード）に置き換えられます。
 * @default %1する
 *
 * @param confirmNg
 * @text 確認画面NG文言
 * @desc 確認ウィンドウのNGに相当するテキストです。
 * @default しない
 *
 * @param helpText
 * @text 確認ヘルプ文言
 * @desc 確認ウィンドウ表示時にヘルプウィンドウに表示するテキストです。%1で用語（セーブ or ロード）に置き換えられます。
 * @default %1してもよろしいですか？
 *
 * @param confirmWidth
 * @text 確認ウィンドウ横幅
 * @desc セーブ画面に確認ダイアログを追加します。
 * @default 320
 * @type number
 *
 * @param windowThrough
 * @text ウィンドウ透過
 * @desc 確認ウィンドウを透過し背後が見えるようにします。
 * @default false
 * @type boolean
 *
 * @param defaultCancelSave
 * @text 初期キャンセル(セーブ)
 * @desc セーブ画面の確認ウィンドウのカーソル初期値が「しない」になります。
 * @default false
 * @type boolean
 *
 * @param defaultCancelLoad
 * @text 初期キャンセル(ロード)
 * @desc ロード画面の確認ウィンドウのカーソル初期値が「しない」になります。
 * @default false
 * @type boolean
 *
 * @param defaultCancelRemove
 * @text 初期キャンセル(データ削除)
 * @desc データ削除画面の確認ウィンドウのカーソル初期値が「しない」になります。
 * @default false
 * @type boolean
 *
 *
 * @help SKM_SavemenuEX_op.js
 *
 *
 * セーブ画面、ロード画面、データ削除画面で対象ファイル選択後に
 * 実際にセーブ、ロード、データ削除する前に確認ウィンドウを挟みます。
 * SKM_SavemenuEX.js のオプションプラグインとして作成されました
 *
 *
 */

(() => {
    "use strict";
    const script = document.currentScript;

    // 直接パラメータを取得する関数を定義
    function getPluginParameters() {
        const params = PluginManager.parameters("SKM_SavemenuEX_op");
        return {
            saveConfirm: params["saveConfirm"] === "true",
            loadConfirm: params["loadConfirm"] === "true",
            removeConfirm: params["removeConfirm"] === "true",
            termSave: params["termSave"] || "セーブ",
            termoverwrite: params["termoverwrite"] || "上書き",
            termLoad: params["termLoad"] || "ロード",
            termRemove: params["termRemove"] || "データ削除",
            confirmOk: params["confirmOk"] || "%1する",
            confirmNg: params["confirmNg"] || "しない",
            helpText: params["helpText"] || "%1してもよろしいですか？",
            confirmWidth: Number(params["confirmWidth"] || 320),
            windowThrough: params["windowThrough"] === "true",
            defaultCancelSave: params["defaultCancelSave"] === "true",
            defaultCancelLoad: params["defaultCancelLoad"] === "true",
            defaultCancelRemove: params["defaultCancelRemove"] === "true",
        };
    }

    const param = getPluginParameters(); // パラメータを取得

    /**
     * Scene_Save
     */

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
        _Scene_Save_onSaveSuccess.call(this);
    };

    Scene_Save.prototype.isNeedConfirm = function () {
        return (
            Scene_File.prototype.isNeedConfirm.call(this) && param.saveConfirm
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

    /**
     * Scene_Load
     */
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
            Scene_File.prototype.isNeedConfirm.call(this) && param.loadConfirm
        );
    };

    Scene_Load.prototype.findTerm = function () {
        return param.termLoad;
    };

    Scene_Load.prototype.isDefaultCancel = function () {
        return param.defaultCancelLoad;
    };

    const _Window_SavefileList_playOkSound =
        Window_SavefileList.prototype.playOkSound;
    Window_SavefileList.prototype.playOkSound = function () {
        _Window_SavefileList_playOkSound.apply(this, arguments);
        if (SceneManager._scene.isNeedConfirm()) {
            Window_Base.prototype.playOkSound.call(this);
        }
    };

    /**
     * Scene_File
     */
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

    /**
     * Scene_Remove
     */
    if (window.Scene_Remove) {
        const _Scene_Remove_onSavefileOk = Scene_Remove.prototype.onSavefileOk;
        Scene_Remove.prototype.onSavefileOk = function () {
            const savefileId = this.savefileId();
            if (this.isSavefileEnabled(savefileId) && param.removeConfirm) {
                Window_Selectable.prototype.playOkSound.call(this);
                this.createConfirmWindowIfNeed();
            } else {
                _Scene_Remove_onSavefileOk.call(this);
            }
        };

        Scene_Remove.prototype.onConfirmOk = function () {
            if (this._confirmWindow.index() === 0) {
                this._confirmWindow.close();
                this._confirmWindow.deactivate();
                _Scene_Remove_onSavefileOk.call(this);
                this._helpWindow.setText(this.helpWindowText());
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

        const _Scene_Remove_onRemoveFailure =
            Scene_Remove.prototype.onRemoveFailure;
        Scene_Remove.prototype.onRemoveFailure = function () {
            if (this._confirmWindow) {
                this._confirmWindow.close();
                this._confirmWindow.deactivate();
            }
            _Scene_Remove_onRemoveFailure.call(this);
        };

        Scene_Remove.prototype.confirmText = function () {
            return param.termRemove;
        };

        Scene_Remove.prototype.findTerm = function () {
            return param.termRemove;
        };

        Scene_Remove.prototype.isNeedConfirm = function () {
            const savefileId = this.savefileId();
            return this.isSavefileEnabled(savefileId);
        };

        Scene_Remove.prototype.isDefaultCancel = function () {
            return param.defaultCancelRemove;
        };
    }

    /**
     * Window_Confirm
     * 確認ウィンドウ
     */
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
})();
