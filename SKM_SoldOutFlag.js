//=============================================================================
// SKM_SoldOutFlag.js
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 売り切れ表示と購入禁止を次のショップだけに適用します。
 * @author さかなのまえあし
 *
 * @help
 * ◆概要
 * プラグインコマンドをショップを開く直前に実行すると、
 * 次に開くショップシーン限定で、メモ欄に <soldout> を含む商品を
 * 「購入不可＋価格欄に任意のラベル表示」に変換します。
 * ショップ終了後は自動的に通常状態へ戻ります。
 *
 * ◆使い方
 * 1. プラグイン管理で本プラグインを ON にする
 * 2. ショップを呼び出すイベントの直前で
 *    プラグインコマンド「次のショップでSoldOutを有効化」を実行
 * 3. 対象アイテム/武器/防具のメモ欄に <soldout> と記述
 *
 * 以後、指定ショップでは該当品が購入リストに表示されますが
 * グレーアウト＆価格欄が soldout 表示になり、決定操作も制限されます。
 *
 * @param soldoutLabel
 * @text 表示テキスト
 * @type string
 * @default soldout
 * @desc 価格欄に表示する文字列。初期値は "soldout" です。
 *
 * @command reserveSoldOut
 * @text 次のショップでSoldOutを有効化
 * @desc コマンド実行直後のショップシーンにだけSoldOut判定を適用します。
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.match(/([^\/\\]+)\.js$/)[1];
    const params = PluginManager.parameters(pluginName);
    const SOLDOUT_TAG = "soldout";

    class SoldOutFlagManager {
        static initialize() {
            this._reserved = false;
            this._active = false;
            this._label = String(params.soldoutLabel || "soldout");
        }

        static reserveNextShop() {
            this._reserved = true;
        }

        static enterShopScene() {
            this._active = this._reserved;
            this._reserved = false;
        }

        static leaveShopScene() {
            this._active = false;
        }

        static isActive() {
            return this._active;
        }

        static isSoldOutItem(item) {
            if (!item || !item.meta) return false;
            if (!item.meta[SOLDOUT_TAG] && !item.meta[SOLDOUT_TAG.toUpperCase()]) return false;
            return true;
        }

        static shouldBlock(item) {
            return this.isActive() && this.isSoldOutItem(item);
        }

        static label() {
            return this._label;
        }
    }

    SoldOutFlagManager.initialize();

    PluginManager.registerCommand(pluginName, "reserveSoldOut", () => {
        SoldOutFlagManager.reserveNextShop();
    });

    const _Scene_Shop_create = Scene_Shop.prototype.create;
    Scene_Shop.prototype.create = function() {
        SoldOutFlagManager.enterShopScene();
        _Scene_Shop_create.call(this);
    };

    const _Scene_Shop_terminate = Scene_Shop.prototype.terminate;
    Scene_Shop.prototype.terminate = function() {
        _Scene_Shop_terminate.call(this);
        SoldOutFlagManager.leaveShopScene();
    };

    const _Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
    Scene_Shop.prototype.doBuy = function(number) {
        const item = this._buyWindow ? this._buyWindow.item() : null;
        if (SoldOutFlagManager.shouldBlock(item)) {
            SoundManager.playBuzzer();
            return;
        }
        _Scene_Shop_doBuy.call(this, number);
    };

    const _Window_ShopBuy_isEnabled = Window_ShopBuy.prototype.isEnabled;
    Window_ShopBuy.prototype.isEnabled = function(item) {
        if (SoldOutFlagManager.shouldBlock(item)) {
            return false;
        }
        return _Window_ShopBuy_isEnabled.call(this, item);
    };

    const _Window_ShopBuy_drawItem = Window_ShopBuy.prototype.drawItem;
    Window_ShopBuy.prototype.drawItem = function(index) {
        if (!SoldOutFlagManager.isActive()) {
            _Window_ShopBuy_drawItem.call(this, index);
            return;
        }
        const item = this.itemAt(index);
        const rect = this.itemLineRect(index);
        const priceWidth = this.priceWidth();
        const priceX = rect.x + rect.width - priceWidth;
        const nameWidth = rect.width - priceWidth;
        const soldOut = SoldOutFlagManager.shouldBlock(item);

        this.changePaintOpacity(!soldOut && this.isEnabled(item));
        this.drawItemName(item, rect.x, rect.y, nameWidth);
        const priceText = soldOut ? SoldOutFlagManager.label() : this.price(item);
        this.drawText(String(priceText), priceX, rect.y, priceWidth, "right");
        this.changePaintOpacity(true);
    };
})();

