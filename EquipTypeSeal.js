/*:
 * @plugindesc 武器・防具タイプを封印するプラグイン
 * @author ChatGPT
 * @target MZ
 * @url
 *
 * @help WeaponArmorTypeSeal.js
 *
 * このプラグインは、特定の武器タイプや防具タイプを封印する機能を追加します。
 * アクター、ステート、装備品のメモ欄に以下のように記述することで
 * 特定の種類の武器や防具を装備できなくなります。
 *
 * <封印武器タイプ:X>     // 武器タイプID Xを封印
 * <SealWeaponType:X>    // 同上（英語表記）
 *
 * <封印防具タイプ:X>     // 防具タイプID Xを封印
 * <SealArmorType:X>     // 同上（英語表記）
 *
 * <封印武器タイプ:X,Y,Z> // 複数の武器タイプを封印
 * <封印防具タイプ:X,Y,Z> // 複数の防具タイプを封印
 *
 * ※封印された武器・防具タイプは装備画面で選択できなくなります。
 * ※RPGツクールMZの仕様により、封印された武器・防具タイプの装備品は
 *  ターン開始時やマップ移動時に自動的に外されます。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

(function () {
    "use strict";

    //-----------------------------------------------------------------------------
    // Game_Actor
    //-----------------------------------------------------------------------------

    /**
     * 武器タイプが封印されているかどうかを返す
     */
    Game_Actor.prototype.isWeaponTypeSealedById = function (weaponTypeId) {
        return this.traitObjects().some((obj) => {
            return checkWeaponTypeSealMeta(obj, weaponTypeId);
        });
    };

    /**
     * 防具タイプが封印されているかどうかを返す
     */
    Game_Actor.prototype.isArmorTypeSealedById = function (armorTypeId) {
        return this.traitObjects().some((obj) => {
            return checkArmorTypeSealMeta(obj, armorTypeId);
        });
    };

    /**
     * メモ欄から武器タイプ封印の情報を取得する
     */
    function checkWeaponTypeSealMeta(obj, weaponTypeId) {
        if (!obj || !obj.meta) return false;

        // 日本語表記のメタデータをチェック
        if (obj.meta["封印武器タイプ"]) {
            const sealedTypes = obj.meta["封印武器タイプ"]
                .split(",")
                .map(Number);
            if (sealedTypes.includes(weaponTypeId)) {
                return true;
            }
        }

        // 英語表記のメタデータをチェック
        if (obj.meta["SealWeaponType"]) {
            const sealedTypes = obj.meta["SealWeaponType"]
                .split(",")
                .map(Number);
            if (sealedTypes.includes(weaponTypeId)) {
                return true;
            }
        }

        return false;
    }

    /**
     * メモ欄から防具タイプ封印の情報を取得する
     */
    function checkArmorTypeSealMeta(obj, armorTypeId) {
        if (!obj || !obj.meta) return false;

        // 日本語表記のメタデータをチェック
        if (obj.meta["封印防具タイプ"]) {
            const sealedTypes = obj.meta["封印防具タイプ"]
                .split(",")
                .map(Number);
            if (sealedTypes.includes(armorTypeId)) {
                return true;
            }
        }

        // 英語表記のメタデータをチェック
        if (obj.meta["SealArmorType"]) {
            const sealedTypes = obj.meta["SealArmorType"]
                .split(",")
                .map(Number);
            if (sealedTypes.includes(armorTypeId)) {
                return true;
            }
        }

        return false;
    }

    //-----------------------------------------------------------------------------
    // Window_EquipItem
    //-----------------------------------------------------------------------------

    // 装備アイテムウィンドウの処理を拡張
    const _Window_EquipItem_isEnabled = Window_EquipItem.prototype.isEnabled;
    Window_EquipItem.prototype.isEnabled = function (item) {
        const result = _Window_EquipItem_isEnabled.call(this, item);
        if (!result) return false;

        // itemがnullの場合は装備を外す「なし」オプションなので、常に選択可能にする
        if (!item) return true;

        const actor = this._actor;
        if (actor) {
            // 武器の場合
            if (DataManager.isWeapon(item)) {
                if (actor.isWeaponTypeSealedById(item.wtypeId)) {
                    return false;
                }
            }
            // 防具の場合
            if (DataManager.isArmor(item)) {
                if (actor.isArmorTypeSealedById(item.atypeId)) {
                    return false;
                }
            }
        }

        return result;
    };

    //-----------------------------------------------------------------------------
    // Game_Actor
    //-----------------------------------------------------------------------------

    // canEquipの拡張
    const _Game_Actor_canEquip = Game_Actor.prototype.canEquip;
    Game_Actor.prototype.canEquip = function (item) {
        const result = _Game_Actor_canEquip.call(this, item);
        if (!result) return false;

        // itemがnullの場合は装備を外す操作なので、そのまま元の結果を返す
        if (!item) return result;

        // 武器の場合
        if (DataManager.isWeapon(item)) {
            if (this.isWeaponTypeSealedById(item.wtypeId)) {
                return false;
            }
        }
        // 防具の場合
        if (DataManager.isArmor(item)) {
            if (this.isArmorTypeSealedById(item.atypeId)) {
                return false;
            }
        }

        return true;
    };
})();
