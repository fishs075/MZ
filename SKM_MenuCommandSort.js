/*:
 * @target MZ
 * @plugindesc メニューコマンドの並べ替え＋スイッチ制御 v1.1.0
 * @author sakananomaeasi with help AI
 *
 * @help
 * メニューコマンドの「並び順」を自由にカスタマイズできるプラグインです。
 * プラグインパラメータのリスト順通りにコマンドを表示します。
 *
 * 【主な機能】
 * 1. コマンド並び替え（メイン機能）
 *    - 指定した順番でメニューコマンドを表示します。
 *    - リストに登録されていないコマンドは「自動的に非表示」になります。
 *    - 不要なコマンドを隠したい場合も、単にリストから外すだけでOKです。
 *
 * 2. スイッチによる制御（サブ機能）
 *    - 特定のスイッチがON/OFFのときにコマンドを「無効化（グレーアウト）」や
 *      「非表示」にできます。
 *    - ストーリー進行に合わせてコマンドを解禁したい場合に便利です。
 *
 * 3. コモンイベントの追加
 *    - 任意のコモンイベントをメニューコマンドとして実行できます。
 *    - 変数を設定すると、アクターを選択してから実行し、そのIDを変数に入れることも可能です。
 *
 * ■ 使い方
 * 1. 【並び替え設定】（必須）
 *    パラメータ「コマンド並び替え」に、表示したいコマンドを上から順に
 *    登録してください。
 *    ※ここに含まれないコマンドはメニューに出なくなります！
 *
 * 2. 【コモンイベント追加】（任意）
 *    パラメータ「コモンイベントコマンド」で独自のコマンドを作れます。
 *    作ったコマンドも「並び替え設定」リストに加えて表示させてください。
 *
 * 3. 【スイッチ制御】（任意）
 *    パラメータ「無効化設定」「非表示設定」で、スイッチ条件を指定します。
 *    （例：スイッチ10がOFFの間は「スキル」を選択不可にする、など）
 *
 * ■ 設定の指定方法
 * コマンドの指定には「表示名」または「シンボル」が使えます。
 * - 表示名：ゲーム内で表示される名前（「アイテム」「スキル」など）
 * - シンボル：内部ID（item, skill, equip, status, formation, options, save,
 *            gameEnd など）
 * ※両方一致する場合は、シンボル判定が優先されます。
 *
 * ■ 注意事項
 * - 他プラグインで追加されたコマンドも、シンボルや名前が分かれば並び替え可能です。
 * - 「並び替え設定」でシンボルと表示名を両方書くと、表示名を上書きできます。
 *   （例：シンボル item の名前を「道具」に変更して表示など）
 * - 「無効化設定」でシンボルと表示名を両方書くと、無効化時の表示名を上書きできます
 *   （例：シンボル skill の名前を「＊＊＊＊＊」に変更して表示など）
 * - コモンイベントはメニュー画面を閉じずに実行されます。
 *   場所移動などマップ切り替えを伴う処理は正しく動かない場合があります。
 *
 * ■ Special Thanks
 * Yana (MV Plug-in MenuCommandSort.js)
 * 
 *
 * @param CommandOrders
 * @text コマンド並び替え
 * @type struct<CommandOrder>[]
 * @default ["{\"commandName\":\"\",\"commandSymbol\":\"item\"}","{\"commandName\":\"\",\"commandSymbol\":\"skill\"}","{\"commandName\":\"\",\"commandSymbol\":\"equip\"}","{\"commandName\":\"\",\"commandSymbol\":\"status\"}","{\"commandName\":\"\",\"commandSymbol\":\"formation\"}","{\"commandName\":\"\",\"commandSymbol\":\"options\"}","{\"commandName\":\"\",\"commandSymbol\":\"save\"}","{\"commandName\":\"\",\"commandSymbol\":\"load\"}","{\"commandName\":\"\",\"commandSymbol\":\"gameEnd\"}"]
 * @desc 上から順の優先で並び替え。リスト外は非表示。
 * 
 * @param HideSwitches
 * @text 非表示設定
 * @type struct<HideSwitch>[]
 * @default []
 * 
 * @param CommandSwitches
 * @text 無効化設定
 * @type struct<CommandSwitch>[]
 * @default []
 * 
 * @param CommonEventCommands
 * @text コモンイベントコマンド
 * @type struct<CommonEventCommand>[]
 * @default []
 * @desc メニューに追加するコモンイベントのリスト
 * 
 */

/*~struct~CommandSwitch:
 * @param commandName
 * @text コマンド名（表示名）
 * @type string
 * @desc 表示名で一致させたい場合に指定（未指定なら無視）
 * @default
 *
 * @param commandSymbol
 * @text コマンドシンボル
 * @type string
 * @desc symbol で一致させたい場合に指定（item/skill/equip/など）
 * @default
 *
 * @param switchId
 * @text スイッチID
 * @type switch
 * @desc このスイッチの状態で有効/無効を切り替えます
 * @default 0
 *
 * @param disableWhen
 * @text 無効にする条件
 * @type select
 * @option スイッチがOFFのとき無効
 * @value off
 * @option スイッチがONのとき無効
 * @value on
 * @desc 指定スイッチの状態がこの条件に当てはまるとき無効化します
 * @default off
 */

/*~struct~HideSwitch:
 * @param commandName
 * @text コマンド名（表示名）
 * @type string
 * @desc 表示名で一致させたい場合に指定（未指定なら無視）
 * @default
 *
 * @param commandSymbol
 * @text コマンドシンボル
 * @type string
 * @desc symbol で一致させたい場合に指定（item/skill/equip/など）
 * @default
 *
 * @param switchId
 * @text スイッチID
 * @type switch
 * @desc このスイッチの状態で非表示/表示を切り替えます
 * @default 0
 *
 * @param hideWhen
 * @text 非表示にする条件
 * @type select
 * @option スイッチがOFFのとき非表示
 * @value off
 * @option スイッチがONのとき非表示
 * @value on
 * @desc 指定スイッチの状態がこの条件に当てはまるとき非表示にします
 * @default off
 */

/*~struct~CommandOrder:
 * @param commandName
 * @text コマンド名（表示名）
 * @type string
 * @desc 表示名で一致させたい場合に指定（未指定なら無視）
 * @default
 *
 * @param commandSymbol
 * @text コマンドシンボル
 * @type string
 * @desc symbol で一致させたい場合に指定（item/skill/equip/など）
 * @default
 */

/*~struct~CommonEventCommand:
 * @param commandName
 * @text コマンド名（表示名）
 * @type string
 * @desc メニューに表示する名前
 * @default
 *
 * @param commandSymbol
 * @text コマンドシンボル（任意）
 * @type string
 * @desc 任意。未指定なら自動シンボルを付与します
 * @default
 *
 * @param commonEventId
 * @text コモンイベントID
 * @type common_event
 * @desc 実行するコモンイベント
 * @default 0
 *
 * @param actorVarId
 * @text アクターID格納用変数ID
 * @type variable
 * @desc 指定すると実行前にアクター選択し、選択アクターのIDを格納します
 * @default 0
 */

(() => {
    const pluginName = document.currentScript.src.match(/([^/]+)\.js$/)[1];
    const params = PluginManager.parameters(pluginName);

    const normalize = (s) => (s || "").toString().trim().toLowerCase();

    // setMenuActor の安全化（actor 未定義でのクラッシュ防止）
    const _Game_Party_setMenuActor = Game_Party.prototype.setMenuActor;
    Game_Party.prototype.setMenuActor = function (actor) {
        if (!actor) return;
        _Game_Party_setMenuActor.call(this, actor);
    };

    const commandSwitches = JSON.parse(params.CommandSwitches || "[]")
        .map((raw) => {
            try {
                const data = JSON.parse(raw);
                return {
                    commandName: data.commandName || "",
                    commandSymbol: data.commandSymbol || "",
                    switchId: Number(data.switchId || 0),
                    disableWhen: data.disableWhen === "on" ? "on" : "off",
                };
            } catch (e) {
                return null;
            }
        })
        .filter(Boolean);

    const hideSwitches = JSON.parse(params.HideSwitches || "[]")
        .map((raw) => {
            try {
                const data = JSON.parse(raw);
                return {
                    commandName: data.commandName || "",
                    commandSymbol: data.commandSymbol || "",
                    switchId: Number(data.switchId || 0),
                    hideWhen: data.hideWhen === "on" ? "on" : "off",
                };
            } catch (e) {
                return null;
            }
        })
        .filter(Boolean);

    const commonEventCommands = JSON.parse(params.CommonEventCommands || "[]")
        .map((raw, idx) => {
            try {
                const data = JSON.parse(raw);
                const commonEventId = Number(data.commonEventId || 0);
                const commandName = data.commandName || "";
                const commandSymbol =
                    data.commandSymbol ||
                    `commonEvent_${commonEventId || "id"}_${idx}`;
                const actorVarId = Number(data.actorVarId || 0);
                return {
                    commandName,
                    commandSymbol,
                    commonEventId,
                    actorVarId,
                };
            } catch (e) {
                return null;
            }
        })
        .filter(Boolean);

    const commandOrders = JSON.parse(params.CommandOrders || "[]")
        .map((raw) => {
            try {
                const data = JSON.parse(raw);
                return {
                    commandName: data.commandName || "",
                    commandSymbol: data.commandSymbol || "",
                };
            } catch (e) {
                return null;
            }
        })
        .filter(Boolean);

    // Window_MenuCommand に限定して addCommand をフック
    const _MenuCommand_addCommand = Window_MenuCommand.prototype.addCommand;
    Window_MenuCommand.prototype.addCommand = function (
        name,
        symbol,
        enabled = true,
        ext = null
    ) {
        let finalEnabled = enabled;
        let finalName = name;
        const nName = normalize(name);
        const nSymbol = normalize(symbol);

        const setting = commandSwitches.find((entry) => {
            const byName =
                entry.commandName && normalize(entry.commandName) === nName;
            const bySymbol =
                entry.commandSymbol && normalize(entry.commandSymbol) === nSymbol;
            return byName || bySymbol;
        });

        if (setting && $gameSwitches) {
            const swOn = $gameSwitches.value(setting.switchId);
            const shouldDisable =
                setting.disableWhen === "on" ? swOn : !swOn;
            if (shouldDisable) {
                finalEnabled = false;
                const overrideName =
                    setting.commandName &&
                    setting.commandSymbol &&
                    normalize(setting.commandSymbol) === nSymbol &&
                    normalize(setting.commandName) !== nName;
                if (overrideName) {
                    finalName = setting.commandName;
                }
            }
        }

        _MenuCommand_addCommand.call(this, finalName, symbol, finalEnabled, ext);
    };

    // コモンイベントをメニューへ追加
    const _MenuCommand_addOriginalCommands =
        Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function () {
        if (_MenuCommand_addOriginalCommands) {
            _MenuCommand_addOriginalCommands.call(this);
        }
        commonEventCommands.forEach((cmd) => {
            const name = cmd.commandName || `CommonEvent ${cmd.commonEventId}`;
            const symbol = cmd.commandSymbol;
            const hasParty = $gameParty ? $gameParty.members().length > 0 : true;
            const enabled =
                cmd.commonEventId > 0 && (cmd.actorVarId > 0 ? hasParty : true);
            this.addCommand(name, symbol, enabled, {
                commonEventId: cmd.commonEventId,
                actorVarId: cmd.actorVarId,
            });
        });
    };

    // makeCommandList 終了後に _list を並び替え
    const _MenuCommand_makeCommandList = Window_MenuCommand.prototype.makeCommandList;
    Window_MenuCommand.prototype.makeCommandList = function () {
        _MenuCommand_makeCommandList.call(this);
        if (!Array.isArray(this._list)) return;

        const used = new Set();
        const result = [];

        const matchEntry = (cmd, entry) => {
            const byName =
                entry.commandName && normalize(entry.commandName) === normalize(cmd.name);
            const bySymbol =
                entry.commandSymbol && normalize(entry.commandSymbol) === normalize(cmd.symbol);
            return byName || bySymbol;
        };

        const shouldHide = (cmd) => {
            const entry = hideSwitches.find((h) => matchEntry(cmd, h));
            if (entry && $gameSwitches) {
                const swOn = $gameSwitches.value(entry.switchId);
                const hideNow = entry.hideWhen === "on" ? swOn : !swOn;
                return hideNow;
            }
            return false;
        };

        commandOrders.forEach((entry) => {
            const idx = this._list.findIndex(
                (cmd, i) => !used.has(i) && matchEntry(cmd, entry)
            );
            if (idx >= 0) {
                const src = this._list[idx];
                if (!shouldHide(src)) {
                    const overrideName =
                        entry.commandName &&
                        entry.commandSymbol &&
                        normalize(entry.commandSymbol) === normalize(src.symbol);
                    const pushed = overrideName
                        ? { ...src, name: entry.commandName }
                        : src;
                    result.push(pushed);
                }
                used.add(idx);
            }
        });

        // 並び替えリストにないものは非表示（追加しない）
        this._list = result;
    };

    // コモンイベント用ハンドラ
    const _Scene_Menu_createCommandWindow =
        Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        _Scene_Menu_createCommandWindow.call(this);
        commonEventCommands.forEach((cmd) => {
            const handler =
                cmd.actorVarId > 0
                    ? this.commandPersonal.bind(this)
                    : this.commandCommonEvent.bind(this);
            this._commandWindow.setHandler(cmd.commandSymbol, handler);
        });
    };

    Scene_Menu.prototype.commandCommonEvent = function () {
        const ext = this._commandWindow.currentExt();
        if (!ext || !ext.commonEventId) return this._commandWindow.activate();
        const commonEventId = ext.commonEventId;
        const commonEvent = $dataCommonEvents[commonEventId];
        if (!commonEvent || !commonEvent.list) return this._commandWindow.activate();
        this.startCommonEvent(commonEventId);
    };

    const _Scene_Menu_update = Scene_Menu.prototype.update;
    Scene_Menu.prototype.update = function () {
        _Scene_Menu_update.call(this);
        this.updateCommonEventRunner();
    };

    // メニューアクター取得失敗時のガード（actorId undefined対策）
    const _Window_MenuStatus_processOk = Window_MenuStatus.prototype.processOk;
    Window_MenuStatus.prototype.processOk = function () {
        const actor = $gameParty.members()[this.index()];
        if (!actor) return SoundManager.playBuzzer();
        _Window_MenuStatus_processOk.call(this);
    };

    Scene_Menu.prototype.updateCommonEventRunner = function () {
        const interpreter = this._commonEventInterpreter;
        if (!interpreter) return;
        if (interpreter.isRunning()) {
            interpreter.update();
        } else {
            this._commonEventInterpreter = null;
            this._commandWindow.activate();
        }
    };


    // アクター選択ありのコモンイベント用ハンドラ（Personal選択経由）
    const _Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
    Scene_Menu.prototype.onPersonalOk = function () {
        const ext =
            this._commandWindow.currentExt &&
            this._commandWindow.currentExt();
        if (ext && ext.commonEventId && ext.actorVarId) {
            const index = this._statusWindow.index();
            const actor = $gameParty.members()[index];
            if (actor) {
                $gameVariables.setValue(ext.actorVarId, actor.actorId());
                $gameParty.setMenuActor(actor);
            } else {
                SoundManager.playBuzzer();
                this._statusWindow.activate();
                return;
            }
            this._statusWindow.deselect();
            this._statusWindow.deactivate();
            this.startCommonEvent(ext.commonEventId);
            return;
        }
        _Scene_Menu_onPersonalOk.call(this);
    };


    Scene_Menu.prototype.startCommonEvent = function (commonEventId) {
        const commonEvent = $dataCommonEvents[commonEventId];
        if (commonEvent && commonEvent.list) {
            this._commonEventInterpreter = new Game_Interpreter();
            this._commonEventInterpreter.setup(commonEvent.list, 0);
            this._commandWindow.deactivate();
        } else {
            this._commandWindow.activate();
        }
    };


})();
