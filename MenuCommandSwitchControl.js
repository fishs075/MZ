/*:
 * @target MZ
 * @plugindesc メニューコマンドをスイッチで有効/無効化します v1.0.0
 * @author sakananomaeasi with help AI
 *
 * @help
 * 指定したメニューコマンドをゲームスイッチの ON/OFF で
 * 有効/無効に切り替えます。コマンド名でもシンボルでも判定できます。
 *
 * ■ 使い方
 * 1. プラグインパラメータ「コマンド設定」に対象コマンドを登録します。
 * 2. 判定したいスイッチIDと、スイッチが ON / OFF のどちらで
 *    無効にするかを選びます。
 * 3. コマンド名は表示名、またはシンボル（item/skill/equip/...）
 *    いずれか一致すれば適用されます。
 *
 * 例:
 *  - アイテム: commandName=アイテム, switchId=5, disableWhen=off
 *    → スイッチ5がONになるまで「アイテム」を無効化
 *
 *  - スキル: commandSymbol=skill, switchId=6, disableWhen=on
 *    → スイッチ6がONのとき「スキル」を無効化
 *
 * ■ 注意
 * - 他プラグインで追加したメニューコマンドも
 *   Window_MenuCommand.addCommand を経由していれば対象になります。
 * - 該当スイッチが存在しない場合は無視して元の有効状態を使います。
 *
 * @param CommandSwitches
 * @text コマンド設定
 * @type struct<CommandSwitch>[]
 * @default []
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

(() => {
    const pluginName = document.currentScript.src.match(/([^/]+)\.js$/)[1];
    const params = PluginManager.parameters(pluginName);

    const normalize = (s) => (s || "").toString().trim().toLowerCase();

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

    // Window_MenuCommand に限定して addCommand をフック
    const _MenuCommand_addCommand = Window_MenuCommand.prototype.addCommand;
    Window_MenuCommand.prototype.addCommand = function (
        name,
        symbol,
        enabled = true,
        ext = null
    ) {
        let finalEnabled = enabled;
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
            }
        }

        _MenuCommand_addCommand.call(this, name, symbol, finalEnabled, ext);
    };
})();
