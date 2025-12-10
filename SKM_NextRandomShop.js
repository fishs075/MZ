/*:
 * @target MZ
 * @plugindesc v1.1 次のショップ抽選にリセット条件を付与します。
 * @author sakananomaeasi with help of GPT-5.1 Codex
 * @help
 * イベント内で「次のショップをランダム化」を実行すると、
 * 次の「ショップの処理」で販売リストから指定数だけを抽選します。
 *
 * さらに、以下のリセット条件を任意に組み合わせて設定できます。
 *  ・累計購入額が一定を超える
 *  ・戦闘回数が一定に達する
 *  ・所定のゴールドを支払って手動リフレッシュ
 *
 * いずれも0のままなら従来通り「次のショップ1回だけ」適用されます。
 *
 * 【基本的な流れ】
 * 1. 「次のショップをランダム化」で抽選数とリセット条件を設定
 * 2.「ショップID」を指定。指定しない場合通常のショップに影響あり。
 * 3. 続けてイベントコマンド「ショップの処理」を実行
 * 4. 同じ条件を満たすまで抽選内容は固定
 * 5. 条件を満たしたら再び「次のショップをランダム化」で新しい在庫を生成
 *
 * 【在庫リフレッシュ】
 * ・別コマンド「在庫リフレッシュ」を呼ぶと、指定額を支払ってロックを解除できます。
 * ・金額はコマンド実行後、自動で引き落とされます。
 * ・必要なら成否をスイッチに書き込み、イベント側で分岐できます。
 * ・このコマンドで文章等は何も表示されません。
 * ・「ショップID」を指定すると、そのIDごとに独立した抽選/リフレッシュ状態を管理できます。
 *
 * @param persistRandomShopState
 * @text 在庫状態をセーブに含める
 * @type boolean
 * @on 含める
 * @off 含めない
 * @default true
 * @desc falseの場合、在庫キャッシュをセーブ対象外にし再入店時に再抽選します。
 *
 * @command setRandomNextShop
 * @text 次のショップをランダム化
 * @desc 次のショップ処理時、販売リストから指定数のみ抽選します。
 *
 * @arg count
 * @text 抽選数
 * @type number
 * @min 0
 * @default 3
 * @desc 0で設定解除。それ以外は指定数分だけ抽選します。
 *
 * @arg shopId
 * @text ショップID
 * @type string
 * @default
 * @desc ショップ識別用ID。同じIDのショップのみ抽選結果を共有。空欄は従来の共有スロット。
 *
 * @arg purchaseThreshold
 * @text 累計購入額しきい値
 * @type number
 * @min 0
 * @default 0
 * @desc この金額以上の購入で次回抽選。0なら無効。
 *
 * @arg battleThreshold
 * @text 戦闘回数しきい値
 * @type number
 * @min 0
 * @default 0
 * @desc ショップ離脱後の戦闘回数が指定値で次回抽選。0なら無効。
 *
 * @arg refreshCost
 * @text 有料リフレッシュ費用
 * @type number
 * @min 0
 * @default 0
 * @desc 「在庫リフレッシュ」コマンド使用時の消費ゴールド。0なら無料。
 *
 * @command refreshRandomShop
 * @text 在庫リフレッシュ
 * @desc ゴールドを支払って抽選ロックを解除します。
 *
 * @arg cost
 * @text 上書き費用
 * @type number
 * @min -1
 * @default -1
 * @desc 0以上で費用を上書き。-1なら設定値を使用。
 *
 * @arg shopId
 * @text ショップID
 * @type string
 * @default
 * @desc リフレッシュ対象のショップID。空欄なら共有スロットをリセットします。
 *
 * @arg resultSwitchId
 * @text 成否スイッチ
 * @type switch
 * @default 0
 * @desc 指定スイッチに成功:true / 失敗:false を書き込みます。0で未使用。
 */

(() => {
    "use strict";

    const pluginName = "SKM_NextRandomShop";
    const parameters = PluginManager.parameters(pluginName);
    const persistRandomShopState = parameters.persistRandomShopState !== "false";

    const toPositiveInt = value => {
        const num = Number(value);
        if (!Number.isFinite(num)) {
            return 0;
        }
        return Math.max(0, Math.floor(num));
    };

    const shuffle = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const r = Math.floor(Math.random() * (i + 1));
            const tmp = array[i];
            array[i] = array[r];
            array[r] = tmp;
        }
    };

    const buildRandomGoods = (goods, count) => {
        const max = Math.min(count, goods.length);
        if (max <= 0) {
            return [];
        }
        const indices = goods.map((_, index) => index);
        shuffle(indices);
        const selected = indices.slice(0, max).sort((a, b) => a - b);
        return selected.map(index => goods[index]);
    };

    const cloneGoods = goods =>
        Array.isArray(goods) ? goods.map(entry => (Array.isArray(entry) ? entry.slice() : entry)) : [];

    const needsLock = config =>
        (config.purchaseThreshold || 0) > 0 ||
        (config.battleThreshold || 0) > 0 ||
        (config.refreshCost || 0) > 0;

    const getRandomShopStore = self => {
        if (persistRandomShopState || !$gameTemp) {
            return self;
        }
        return $gameTemp;
    };

    const prepareRandomShopStore = self => {
        const store = getRandomShopStore(self);
        if (!store._randomShopReservations) {
            store._randomShopReservations = {};
        }
        if (!store._randomShopStates) {
            store._randomShopStates = {};
        }
        if (!store._randomShopDeliveredFlags) {
            store._randomShopDeliveredFlags = {};
        }
        if (!store._randomShopFreshFlags) {
            store._randomShopFreshFlags = {};
        }
        return store;
    };

    const _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.call(this);
        if (!persistRandomShopState) {
            this._randomShopReservations = {};
            this._randomShopStates = {};
            this._randomShopDeliveredFlags = {};
            this._randomShopFreshFlags = {};
        }
        this._skmNextRandomShopId = null;
    };

    Game_Temp.prototype.setSkmNextRandomShopId = function(id) {
        this._skmNextRandomShopId = typeof id === "string" ? id.trim() : "";
    };

    Game_Temp.prototype.consumeSkmNextRandomShopId = function() {
        const id = this._skmNextRandomShopId;
        this._skmNextRandomShopId = null;
        return id;
    };

    PluginManager.registerCommand(pluginName, "setRandomNextShop", function(args) {
        const count = toPositiveInt(args.count);
        const shopId = (args.shopId || "").trim();
        if (count <= 0) {
            $gameSystem.clearRandomShopReservation(shopId);
            this._skmRandomShopId = "";
            return;
        }
        const config = {
            count,
            purchaseThreshold: toPositiveInt(args.purchaseThreshold),
            battleThreshold: toPositiveInt(args.battleThreshold),
            refreshCost: toPositiveInt(args.refreshCost),
            shopId
        };
        this._skmRandomShopId = shopId;
        $gameSystem.reserveRandomShop(config);
    });

    PluginManager.registerCommand(pluginName, "refreshRandomShop", args => {
        const costOverrideRaw = Number(args.cost);
        const costOverride =
            Number.isFinite(costOverrideRaw) && costOverrideRaw >= 0 ? toPositiveInt(costOverrideRaw) : null;
        const switchId = toPositiveInt(args.resultSwitchId);
        const shopId = (args.shopId || "").trim();
        const success = $gameSystem.executePaidRandomShopRefresh(costOverride, shopId);
        if (switchId > 0) {
            $gameSwitches.setValue(switchId, !!success);
        }
    });

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this.clearRandomShopReservation();
    };

    Game_System.prototype.clearRandomShopReservation = function(shopId) {
        const store = prepareRandomShopStore(this);
        const resetAll = arguments.length === 0;
        if (resetAll) {
            store._randomShopReservations = {};
            store._randomShopStates = {};
            store._randomShopDeliveredFlags = {};
            store._randomShopFreshFlags = {};
            return;
        }
        const id = (shopId || "").trim();
        if (store._randomShopReservations) {
            delete store._randomShopReservations[id];
        }
        if (store._randomShopStates) {
            delete store._randomShopStates[id];
        }
        if (store._randomShopFreshFlags) {
            delete store._randomShopFreshFlags[id];
        }
        if (store._randomShopDeliveredFlags) {
            delete store._randomShopDeliveredFlags[id];
        }
    };

    Game_System.prototype.reserveRandomShop = function(config) {
        const store = prepareRandomShopStore(this);
        const id = (config.shopId || "").trim();
        if (store._randomShopStates && store._randomShopStates[id] && needsLock(store._randomShopStates[id].config)) {
            return;
        }
        store._randomShopReservations[id] = Object.assign({}, config);
    };

    Game_System.prototype.consumeRandomShopReservation = function(shopId) {
        const store = prepareRandomShopStore(this);
        const id = (shopId || "").trim();
        const reservation = store._randomShopReservations[id];
        if (reservation) {
            delete store._randomShopReservations[id];
            return reservation;
        }
        return null;
    };

    Game_System.prototype.resolveRandomShopGoods = function(baseGoods, shopId) {
        const store = prepareRandomShopStore(this);
        const id = (shopId || "").trim();
        const reservation = this.consumeRandomShopReservation(id);
        if (reservation) {
            const source = cloneGoods(baseGoods);
            const selected = buildRandomGoods(source, reservation.count);
            const finalGoods = selected.length > 0 ? selected : source;
            const deliveredBefore = !!store._randomShopDeliveredFlags[id];
            const lockThis = needsLock(reservation);
            if (lockThis) {
                store._randomShopStates[id] = {
                    goods: cloneGoods(finalGoods),
                    config: Object.assign({}, reservation),
                    spent: 0,
                    battles: 0
                };
            } else {
                delete store._randomShopStates[id];
            }
            store._randomShopDeliveredFlags[id] = true;
            store._randomShopFreshFlags[id] = deliveredBefore && lockThis;
            return finalGoods;
        }
        const state = store._randomShopStates[id];
        if (state && Array.isArray(state.goods)) {
            return cloneGoods(state.goods);
        }
        return baseGoods;
    };

    Game_System.prototype.notifyRandomShopPurchase = function(amount, shopId) {
        const store = prepareRandomShopStore(this);
        const id = (shopId || "").trim();
        if (!store._randomShopStates) return;
        const state = store._randomShopStates[id];
        if (!state || !needsLock(state.config) || state.config.purchaseThreshold <= 0) {
            return;
        }
        state.spent += Math.max(0, amount || 0);
        if (state.spent >= state.config.purchaseThreshold) {
            store._randomShopFreshFlags[id] = true;
            this.releaseRandomShopState(id);
        }
    };

    Game_System.prototype.notifyRandomShopBattle = function() {
        const store = prepareRandomShopStore(this);
        if (!store._randomShopStates) return;
        for (const id in store._randomShopStates) {
            if (!Object.prototype.hasOwnProperty.call(store._randomShopStates, id)) continue;
            const state = store._randomShopStates[id];
            if (!state || !needsLock(state.config) || state.config.battleThreshold <= 0) continue;
            state.battles += 1;
            if (state.battles >= state.config.battleThreshold) {
                store._randomShopFreshFlags[id] = true;
                this.releaseRandomShopState(id);
            }
        }
    };

    Game_System.prototype.releaseRandomShopState = function(shopId) {
        const store = prepareRandomShopStore(this);
        if (!store._randomShopStates) return;
        const id = (shopId || "").trim();
        delete store._randomShopStates[id];
    };

    Game_System.prototype.executePaidRandomShopRefresh = function(costOverride, shopId) {
        const store = prepareRandomShopStore(this);
        if (!store._randomShopStates) return false;
        const id = (shopId || "").trim();
        const state = store._randomShopStates[id];
        if (!state) {
            return false;
        }
        const baseCost = costOverride != null ? costOverride : toPositiveInt(state.config.refreshCost);
        if (baseCost > 0 && $gameParty.gold() < baseCost) {
            return false;
        }
        if (baseCost > 0) {
            $gameParty.loseGold(baseCost);
        }
        store._randomShopFreshFlags[id] = true;
        this.releaseRandomShopState(id);
        return true;
    };

    Game_System.prototype.takeRandomShopFreshEntryFlag = function(shopId) {
        const store = prepareRandomShopStore(this);
        if (!store._randomShopFreshFlags) return false;
        const id = (shopId || "").trim();
        const flag = !!store._randomShopFreshFlags[id];
        delete store._randomShopFreshFlags[id];
        return flag;
    };

    const _Game_System_onBattleWin = Game_System.prototype.onBattleWin;
    Game_System.prototype.onBattleWin = function() {
        _Game_System_onBattleWin.call(this);
        this.notifyRandomShopBattle();
    };

    const _Game_System_onBattleEscape = Game_System.prototype.onBattleEscape;
    Game_System.prototype.onBattleEscape = function() {
        _Game_System_onBattleEscape.call(this);
        this.notifyRandomShopBattle();
    };

    const _Game_Interpreter_command302 = Game_Interpreter.prototype.command302;
    Game_Interpreter.prototype.command302 = function(params) {
        if ($gameTemp && $gameTemp.setSkmNextRandomShopId) {
            const shopId = typeof this._skmRandomShopId === "string" ? this._skmRandomShopId : "";
            $gameTemp.setSkmNextRandomShopId(shopId);
        }
        this._skmRandomShopId = "";
        return _Game_Interpreter_command302.call(this, params);
    };

    const _Scene_Shop_prepare = Scene_Shop.prototype.prepare;
    Scene_Shop.prototype.prepare = function(goods, purchaseOnly) {
        const rawId = $gameTemp && $gameTemp.consumeSkmNextRandomShopId
            ? $gameTemp.consumeSkmNextRandomShopId()
            : null;
        const hasRandomConfig = rawId !== null && rawId !== undefined;
        const shopId = hasRandomConfig ? (typeof rawId === "string" ? rawId.trim() : "") : "";
        const resolvedGoods = hasRandomConfig && Array.isArray(goods)
            ? $gameSystem.resolveRandomShopGoods(goods, shopId)
            : goods;
        const freshEntryFlag = hasRandomConfig && $gameSystem && $gameSystem.takeRandomShopFreshEntryFlag
            ? $gameSystem.takeRandomShopFreshEntryFlag(shopId)
            : false;
        this._skmRandomShopId = hasRandomConfig ? shopId : "";
        this._skmRandomShopActive = !!hasRandomConfig;
        this._skmRandomShopFreshEntry = hasRandomConfig ? !!freshEntryFlag : false;
        _Scene_Shop_prepare.call(this, resolvedGoods, purchaseOnly);
    };

    const _Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
    Scene_Shop.prototype.doBuy = function(number) {
        const unitPrice = this.buyingPrice();
        const totalCost = Math.max(0, unitPrice * number);
        _Scene_Shop_doBuy.call(this, number);
        if (totalCost > 0 && this._skmRandomShopActive) {
            $gameSystem.notifyRandomShopPurchase(totalCost, this._skmRandomShopId || "");
        }
    };
})();

