//
//  メニューコマンド並び替え ver2.0.0
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author Yana
// RPGツクールMZ対応 2023
//

/*:
 * @target MZ
 * @plugindesc メニューコマンドを並び替えたり表示非表示をオンオフできるようにします。
 * @author Yana
 * @version 2.0.0
 *
 * @param EnableSwitchId
 * @text 有効化スイッチID
 * @desc このスイッチを先頭にしてコマンドの数だけスイッチを使用します。
 * 各スイッチがONのときのみ、そのコマンドが使用できます。
 * @default 24
 * @type switch
 *
 * @param EnableSwitchId2
 * @text 有効化スイッチ無効化
 * @desc このスイッチがONのとき、無条件でメニューリストを書き換えます。
 * @default false
 * @type boolean
 *
 *
 *
 *
 *
 *
 *
 * @param MenuList
 * @text メニューリスト
 * @desc メニューコマンドのシンボルの配列です。
 * @default item,skill,equip,status,formation,options,save,load,gameEnd
 * @type string
 *
 * @param CommandSetting
 * @text コマンド設定
 * @desc スイッチがオフのコマンドの扱いです。
 * @default 0
 * @type select
 * @option 消去
 * @value 0
 * @option 選択不可
 * @value 1
 * @option 選択不可＆名前を変更
 * @value 2
 *
 * @param DisableCommandText
 * @text 無効コマンドテキスト
 * @desc Command Settingが2の時、選択不可のコマンド名として使用されるテキストです。
 * @default --------
 * @type string
 *
 * @param LoadName
 * @text ロード名称
 * @desc ロードの名称として使用されるテキストです。
 * @default ロード
 * @type string
 *
 * @param AddCommon0
 * @text 追加コモン0
 * @desc 追加するコモンイベントの設定です。
 * シンボル,表示名,コモンイベントID,変数IDの順で設定してください。
 * @default
 * @type string
 *
 * @param AddCommon1
 * @text 追加コモン1
 * @desc 追加するコモンイベントの設定です。
 * シンボル,表示名,コモンイベントID,変数IDの順で設定してください。
 * @default
 * @type string
 *
 * @param AddCommon2
 * @text 追加コモン2
 * @desc 追加するコモンイベントの設定です。
 * シンボル,表示名,コモンイベントID,変数IDの順で設定してください。
 * @default
 * @type string
 *
 * @param AddCommon3
 * @text 追加コモン3
 * @desc 追加するコモンイベントの設定です。
 * シンボル,表示名,コモンイベントID,変数IDの順で設定してください。
 * @default
 * @type string
 *
 * @param AddCommon4
 * @text 追加コモン4
 * @desc 追加するコモンイベントの設定です。
 * シンボル,表示名,コモンイベントID,変数IDの順で設定してください。
 * @default
 * @type string
 *
 * @param AddCommon5
 * @text 追加コモン5
 * @desc 追加するコモンイベントの設定です。
 * シンボル,表示名,コモンイベントID,変数IDの順で設定してください。
 * @default
 * @type string
 *
 * @param AddCommon6
 * @text 追加コモン6
 * @desc 追加するコモンイベントの設定です。
 * シンボル,表示名,コモンイベントID,変数IDの順で設定してください。
 * @default
 * @type string
 *
 * @param AddCommon7
 * @text 追加コモン7
 * @desc 追加するコモンイベントの設定です。
 * シンボル,表示名,コモンイベントID,変数IDの順で設定してください。
 * @default
 * @type string
 *
 * @param AddCommon8
 * @text 追加コモン8
 * @desc 追加するコモンイベントの設定です。
 * シンボル,表示名,コモンイベントID,変数IDの順で設定してください。
 * @default
 * @type string
 *
 * @param AddCommon9
 * @text 追加コモン9
 * @desc 追加するコモンイベントの設定です。
 * シンボル,表示名,コモンイベントID,変数IDの順で設定してください。
 * @default
 * @type string
 *
 * @help
 * ------------------------------------------------------
 *  プラグインコマンドはありません。
 * ------------------------------------------------------
 * ------------------------------------------------------
 * 設定方法
 * ------------------------------------------------------
 *
 * メニューのコマンドとスイッチを関連付けして、スイッチのオンオフでコマンドの許可状態を、
 * 切り替えられるようにします。
 * Menu Listにコマンドのシンボルを並べて、メニューの順番を変更します。
 * メニューのシンボルはそれぞれ、
 *
 * アイテム→item
 * スキル→skill
 * 装備→equip
 * ステータス→status
 * 隊列→formation
 * オプション→options
 * セーブ→save
 * ゲーム終了→gameEnd
 *
 * ロード→load
 * スキル設定→skillSetting
 * クラスチェンジ→classChange
 *
 * Enable Switch IDで設定したスイッチIDを先頭として、使用するコマンドの数だけ
 * のスイッチを使用します。
 * (24を設定し、コマンドが7つの場合、24,25,26,27,28,29,30を使用します)
 * ロードも追加します。
 *
 * Add Commonの設定は、
 * シンボル,表示名,コモンイベントID,変数ID
 * の順番で行います。
 * 最後の変数IDを省略すると、アクターの選択を行いません。
 * アクターの選択を行った場合、選択されたアクターのIDを変数IDに代入します。
 * 設定したシンボルをMenu Listの配列に入れることで、コモンイベントを実行する
 * コマンドを追加できます。
 *
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 * 当プラグインはMITライセンスで公開されています。
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * 
 * 
 * 素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * 更新履歴:
 * ver2.0.1:
 * アクター選択ありのコモンイベント実行時、正常にアクターIDを取得できていないバグを修正。
 * ver2.0.0:
 * RPGツクールMZ対応版として公開
 * ver1.021:180409
 * プラグインパラメータの仕様を1.5.0に更新。
 * ver1.02:
 * console.logが残っていて、バグの原因になっていたのを修正。
 * ver1.01:
 * アクターを選択するコモンイベント実行時、正常にアクターIDを取得できていないバグを修正。
 * ver1.00:
 * 公開
 */

(() => {
    "use strict";

    const pluginName = "MenuCommandSortMZ";

    // プラグインパラメータの取得方法を修正
    const params = PluginManager.parameters(pluginName);

    // すべてのパラメータをMZスタイルで取得
    const parameters = {};
    for (const key in params) {
        try {
            parameters[key] = JSON.parse(params[key]);
        } catch (e) {
            parameters[key] = params[key];
        }
    }

    const enableSwitchId = Number(parameters.EnableSwitchId || 0);
    const commandSetting = Number(parameters.CommandSetting || 0);
    const disableCommandText = String(
        parameters.DisableCommandText || "--------"
    );
    const loadName = String(parameters.LoadName || "ロード");
    const enableSwitchId2 = Boolean(parameters.EnableSwitchId2 || false);
    // MenuListの取得方法を強化
    let menuList;
    if (typeof parameters.MenuList === "string") {
        menuList = parameters.MenuList.split(",");
    } else {
        menuList = String(
            params.MenuList ||
                "item,skill,equip,status,formation,options,save,load,gameEnd"
        ).split(",");
    }

    const addCommons = {};
    for (let i = 0; i < 10; i++) {
        const str = parameters[`AddCommon${i}`];
        if (str) {
            const ary = str.split(",");
            addCommons[ary[0]] = ary;
        }
    }

    // メニューコマンドの作成と並び替え
    const _Window_MenuCommand_makeCommandList =
        Window_MenuCommand.prototype.makeCommandList;
    Window_MenuCommand.prototype.makeCommandList = function () {
        _Window_MenuCommand_makeCommandList.call(this);
        this.sortCommand();
    };

    Window_MenuCommand.prototype.sortCommand = function () {
        const originalList = this._list;
        if (!originalList || originalList.length === 0) {
            console.error("Original command list is empty!");
            return;
        }

        this._list = [];

        // 有効なコマンドシンボルのリストを作成
        const validSymbols = [];
        originalList.forEach((cmd) => {
            validSymbols.push(cmd.symbol);
        });

        // テスト目的で一時的にスイッチチェックを無効化（本番では必ず元に戻してください）
        const ignoreSwitch = enableSwitchId2;

        for (let i = 0; i < menuList.length; i++) {
            if (!menuList[i]) {
                continue;
            }
            if (
                !ignoreSwitch && // スイッチチェックの条件を変更
                commandSetting === 0 &&
                !$gameSwitches.value(enableSwitchId + i)
            ) {
                continue;
            }

            let found = false;
            for (let j = 0; j < originalList.length; j++) {
                if (originalList[j].symbol === menuList[i]) {
                    found = true;
                    const command = { ...originalList[j] };

                    if (
                        !ignoreSwitch &&
                        !$gameSwitches.value(enableSwitchId + i)
                    ) {
                        // こちらも条件を変更
                        if (commandSetting !== 0) {
                            command.enabled = false;
                        }
                        if (commandSetting === 2) {
                            command.name = disableCommandText;
                        }
                    }

                    this._list.push(command);

                    break;
                }
            }

            if (!found) {
            }
        }

        // 一つもコマンドが追加されなかった場合のフォールバック処理
        if (this._list.length === 0 && originalList.length > 0) {
            this._list = originalList;
        }
    };

    // オリジナルコマンドの追加
    const _Window_MenuCommand_addOriginalCommands =
        Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function () {
        _Window_MenuCommand_addOriginalCommands.call(this);

        const enabled = this.areMainCommandsEnabled();
        this.addCommand(loadName, "load", enabled);

        for (const key in addCommons) {
            if (addCommons[key]) {
                const symbol = key;
                const name = addCommons[key][1];
                this.addCommand(name, symbol, enabled);
            }
        }
    };

    // シーンの拡張
    const _Scene_Menu_createCommandWindow =
        Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        _Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.setHandler("load", this.commandLoad.bind(this));

        for (const key in addCommons) {
            if (addCommons[key]) {
                const symbol = key;
                if (addCommons[key][3]) {
                    this._commandWindow.setHandler(
                        symbol,
                        this.commandPersonal.bind(this)
                    );
                } else {
                    this._commandWindow.setHandler(
                        symbol,
                        this.commandCommonMenu.bind(this)
                    );
                }
            }
        }
    };

    Scene_Menu.prototype.commandLoad = function () {
        SceneManager.push(Scene_Load);
    };

    Scene_Menu.prototype.commandCommonMenu = function () {
        const index = this._commandWindow.index();
        const symbol = this._commandWindow.currentSymbol();
        const command = addCommons[symbol];

        if (command) {
            const commonEventId = Number(command[2]);
            $gameTemp.reserveCommonEvent(commonEventId);
            this.popScene();
        }
    };

    const _Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
    Scene_Menu.prototype.onPersonalOk = function () {
        const symbol = this._commandWindow.currentSymbol();
        const command = addCommons[symbol];

        // 追加コマンド（アクター選択あり）のみ独自処理し、
        // それ以外（skill/equip/status 等）は元の処理へフォールバックする
        if (command) {
            if (command[3]) {
                const variableId = Number(command[3]);
                const actor = $gameParty.members()[this._statusWindow.index()];
                if (actor) {
                    $gameVariables.setValue(variableId, actor.actorId());
                }
            }
            this.commandCommonMenu();
        } else {
            _Scene_Menu_onPersonalOk.call(this);
        }
    };
})();
