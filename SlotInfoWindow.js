/*:
 * @target MZ
 * @plugindesc 装備画面のアイテム選択時に部位と装備を表示する情報ウィンドウを追加します。v1.0.0
 * @author sakananomaeasi with GPT-5.1 Codex
 *
 * @help SlotInfoWindow.js
 *
 * このプラグインは、装備画面でアイテム選択ウィンドウが表示されている間、
 * 選択中の装備部位と現在装備しているアイテムを別ウィンドウで表示します。
 * プラグインを導入して有効化するだけで動作します。
 *
 * 【仕様】
 * - 情報ウィンドウはスロット一覧と同じ横幅で表示されます。
 * - ウィンドウの高さはプラグインパラメータ「表示行数」で調整できます。
 * - アイテム選択中のみ情報ウィンドウが表示され、アイテムウィンドウの高さを自動調整します。
 *
 * このプラグインはRPGツクールMZ専用です。
 * MIT License の下で配布します。クレジット表記は任意です。
 *
 * @param Lines
 * @text 表示行数
 * @type number
 * @min 1
 * @default 1
 * @desc 情報ウィンドウの行数。行数に応じて高さが決まります。
 */

(() => {
    "use strict";

    const pluginName = "SlotInfoWindow";
    const parameters = PluginManager.parameters(pluginName);
    const infoLines = Number(parameters["Lines"] || 1);

    // -------------------------------------------------------------------------
    // Window_EquipSlotInfo

    function Window_EquipSlotInfo() {
        this.initialize(...arguments);
    }

    Window_EquipSlotInfo.prototype = Object.create(Window_Base.prototype);
    Window_EquipSlotInfo.prototype.constructor = Window_EquipSlotInfo;

    Window_EquipSlotInfo.prototype.initialize = function (rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this._slotWindow = null;
        this._actor = null;
        this._lastActor = null;
        this._lastIndex = -1;
        this._lastItem = null;
    };

    Window_EquipSlotInfo.prototype.setSlotWindow = function (slotWindow) {
        this._slotWindow = slotWindow;
        this._lastActor = null;
        this._lastIndex = -1;
        this._lastItem = null;
        this.refresh();
    };

    Window_EquipSlotInfo.prototype.setActor = function (actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this._lastActor = null;
            this._lastItem = null;
            this.refresh();
        }
    };

    Window_EquipSlotInfo.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        if (!this.visible || !this._slotWindow) {
            return;
        }
        const actor = this._actor;
        const index = this.currentIndex();
        const item = this.currentItem(actor, index);
        if (
            actor !== this._lastActor ||
            index !== this._lastIndex ||
            item !== this._lastItem
        ) {
            this._lastActor = actor;
            this._lastIndex = index;
            this._lastItem = item;
            this.refresh();
        }
    };

    Window_EquipSlotInfo.prototype.refresh = function () {
        this.contents.clear();
        this.contentsBack.clear();
        if (!this._slotWindow) {
            this.drawPlaceholder();
            return;
        }
        const actor = this._actor;
        const index = this.currentIndex();
        if (!actor || index < 0) {
            this.drawPlaceholder();
            return;
        }
        this.drawSlotInfo(actor, index);
    };

    Window_EquipSlotInfo.prototype.currentIndex = function () {
        return this._slotWindow && typeof this._slotWindow.index === "function"
            ? this._slotWindow.index()
            : 0;
    };

    Window_EquipSlotInfo.prototype.currentItem = function (actor, index) {
        if (!actor || !actor.equips) {
            return null;
        }
        const equips = actor.equips();
        return equips && index >= 0 && index < equips.length ? equips[index] : null;
    };

    Window_EquipSlotInfo.prototype.slotBackgroundRect = function () {
        const rect = new Rectangle(
            this.slotColSpacing() / 2,
            this.slotRowSpacing() / 2,
            this.contentsWidth() - this.slotColSpacing(),
            this.slotItemHeight() - this.slotRowSpacing()
        );
        return rect;
    };

    Window_EquipSlotInfo.prototype.slotTextRect = function () {
        const bgRect = this.slotBackgroundRect();
        const rect = new Rectangle(
            bgRect.x + this.itemPadding(),
            bgRect.y + Math.max((bgRect.height - this.lineHeight()) / 2, 0),
            bgRect.width - this.itemPadding() * 2,
            this.lineHeight()
        );
        return rect;
    };

    Window_EquipSlotInfo.prototype.slotItemHeight = function () {
        return this.lineHeight() + 8;
    };

    Window_EquipSlotInfo.prototype.slotRowSpacing = function () {
        return 4;
    };

    Window_EquipSlotInfo.prototype.slotColSpacing = function () {
        return 8;
    };

    Window_EquipSlotInfo.prototype.slotNameWidth = function () {
        if (this._slotWindow && this._slotWindow.slotNameWidth) {
            return this._slotWindow.slotNameWidth();
        }
        return 138;
    };

    Window_EquipSlotInfo.prototype.slotNameText = function (actor, index) {
        if (this._slotWindow && this._slotWindow.slotName) {
            const name = this._slotWindow.slotName(index);
            if (name !== undefined && name !== null && name !== "") {
                return name;
            }
        }
        if (actor && actor.equipSlots) {
            const slots = actor.equipSlots();
            const etypeId = slots[index];
            if ($dataSystem && $dataSystem.equipTypes[etypeId]) {
                return $dataSystem.equipTypes[etypeId];
            }
        }
        return "Slot";
    };

    Window_EquipSlotInfo.prototype.drawSlotInfo = function (actor, index) {
        const bgRect = this.slotBackgroundRect();
        const textRect = this.slotTextRect();
        this.drawBackgroundRect(bgRect);

        const slotWidth = Math.min(this.slotNameWidth(), textRect.width);
        const slotName = this.slotNameText(actor, index);
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(slotName, textRect.x, textRect.y, slotWidth, textRect.height);
        this.resetTextColor();

        const item = this.currentItem(actor, index);
        const padding = this.slotItemPadding();
        const nameX = textRect.x + slotWidth + padding;
        const nameWidth = textRect.width - slotWidth - padding;
        if (item) {
            this.drawItemName(item, nameX, textRect.y, nameWidth);
        } else {
            this.changePaintOpacity(false);
            const emptyText = this.slotEmptyText();
            this.drawText(emptyText, nameX, textRect.y, nameWidth);
            this.changePaintOpacity(true);
        }
    };

    Window_EquipSlotInfo.prototype.slotItemPadding = function () {
        return 0;
    };

    Window_EquipSlotInfo.prototype.drawPlaceholder = function () {
        const bgRect = this.slotBackgroundRect();
        const textRect = this.slotTextRect();
        this.drawBackgroundRect(bgRect);
        this.changePaintOpacity(false);
        this.drawText(
            this.slotEmptyText(),
            textRect.x,
            textRect.y,
            textRect.width,
            "center"
        );
        this.changePaintOpacity(true);
    };

    Window_EquipSlotInfo.prototype.drawBackgroundRect = function (rect) {
        const color1 = ColorManager.itemBackColor1();
        const color2 = ColorManager.itemBackColor2();
        this.contentsBack.gradientFillRect(
            rect.x,
            rect.y,
            rect.width,
            rect.height,
            color1,
            color2,
            true
        );
        this.contentsBack.strokeRect(rect.x, rect.y, rect.width, rect.height, color1);
        this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
    };

    Window_EquipSlotInfo.prototype.slotEmptyText = function () {
        if (
            this._slotWindow &&
            typeof this._slotWindow.emptyText === "function"
        ) {
            const text = this._slotWindow.emptyText();
            if (text) {
                return text;
            }
        }
        return TextManager.emptySlot || "未装備";
    };

    // -------------------------------------------------------------------------
    // Scene_Equip

    const _Scene_Equip_createSlotWindow = Scene_Equip.prototype.createSlotWindow;
    Scene_Equip.prototype.createSlotWindow = function () {
        _Scene_Equip_createSlotWindow.call(this);
        if (this._slotInfoWindow) {
            this._slotInfoWindow.setSlotWindow(this._slotWindow);
        }
    };

    const _Scene_Equip_createItemWindow = Scene_Equip.prototype.createItemWindow;
    Scene_Equip.prototype.createItemWindow = function () {
        _Scene_Equip_createItemWindow.call(this);
        this._itemWindowBaseRect = new Rectangle(
            this._itemWindow.x,
            this._itemWindow.y,
            this._itemWindow.width,
            this._itemWindow.height
        );
        this.createSlotInfoWindow();
    };

    Scene_Equip.prototype.slotInfoWindowRect = function () {
        const baseRect = this.slotWindowRect();
        const height = this.calcWindowHeight(infoLines, true);
        return new Rectangle(
            baseRect.x,
            baseRect.y,
            baseRect.width,
            Math.min(height, baseRect.height)
        );
    };

    Scene_Equip.prototype.createSlotInfoWindow = function () {
        const rect = this.slotInfoWindowRect();
        this._slotInfoWindow = new Window_EquipSlotInfo(rect);
        this._slotInfoWindow.hide();
        this._slotInfoWindowBaseHeight = rect.height;
        this._isSlotInfoVisible = false;
        if (this._slotWindow) {
            this._slotInfoWindow.setSlotWindow(this._slotWindow);
        }
        this._slotInfoWindow.setActor(this.actor());
        this.addWindow(this._slotInfoWindow);
    };

    Scene_Equip.prototype.openSlotInfoWindow = function () {
        if (!this._slotInfoWindow || this._isSlotInfoVisible) {
            return;
        }
        this._isSlotInfoVisible = true;
        this._slotInfoWindow.setSlotWindow(this._slotWindow);
        this._slotInfoWindow.setActor(this.actor());
        this._slotInfoWindow.refresh();
        this._slotInfoWindow.show();
        this.resizeItemWindowForSlotInfo();
    };

    Scene_Equip.prototype.closeSlotInfoWindow = function () {
        if (!this._slotInfoWindow || !this._isSlotInfoVisible) {
            return;
        }
        this._isSlotInfoVisible = false;
        this._slotInfoWindow.hide();
        this.resetItemWindowLayout();
    };

    Scene_Equip.prototype.resizeItemWindowForSlotInfo = function () {
        if (
            !this._slotInfoWindow ||
            !this._itemWindow ||
            !this._itemWindowBaseRect
        ) {
            return;
        }
        const baseRect = this._itemWindowBaseRect;
        const minHeight = this._itemWindow.fittingHeight
            ? this._itemWindow.fittingHeight(2)
            : this._itemWindow.lineHeight() * 2;
        const maxInfoHeight = Math.max(baseRect.height - minHeight, 0);
        const desiredHeight =
            this._slotInfoWindowBaseHeight || this.calcWindowHeight(infoLines, true);
        const infoHeight = Math.min(desiredHeight, maxInfoHeight);
        const newY = baseRect.y + infoHeight;
        const newHeight = baseRect.height - infoHeight;
        this._slotInfoWindow.move(baseRect.x, baseRect.y, baseRect.width, infoHeight);
        this._slotInfoWindow.createContents();
        this._slotInfoWindow.refresh();
        this._itemWindow.move(baseRect.x, newY, baseRect.width, newHeight);
        this._itemWindow.createContents();
        this._itemWindow.refresh();
    };

    Scene_Equip.prototype.resetItemWindowLayout = function () {
        if (!this._slotInfoWindow || !this._itemWindowBaseRect) {
            return;
        }
        const rect = this._itemWindowBaseRect;
        this._itemWindow.move(rect.x, rect.y, rect.width, rect.height);
        this._itemWindow.createContents();
        this._itemWindow.refresh();
        const infoRect = this.slotInfoWindowRect();
        this._slotInfoWindow.move(infoRect.x, infoRect.y, infoRect.width, infoRect.height);
        this._slotInfoWindow.createContents();
        this._slotInfoWindow.refresh();
    };

    const _Scene_Equip_onSlotOk = Scene_Equip.prototype.onSlotOk;
    Scene_Equip.prototype.onSlotOk = function () {
        _Scene_Equip_onSlotOk.call(this);
        this.openSlotInfoWindow();
    };

    const _Scene_Equip_onItemCancel = Scene_Equip.prototype.onItemCancel;
    Scene_Equip.prototype.onItemCancel = function () {
        _Scene_Equip_onItemCancel.call(this);
        this.closeSlotInfoWindow();
    };

    const _Scene_Equip_onItemOk = Scene_Equip.prototype.onItemOk;
    Scene_Equip.prototype.onItemOk = function () {
        _Scene_Equip_onItemOk.call(this);
        this.closeSlotInfoWindow();
    };

    const _Scene_Equip_refreshActor = Scene_Equip.prototype.refreshActor;
    Scene_Equip.prototype.refreshActor = function () {
        _Scene_Equip_refreshActor.call(this);
        if (this._slotInfoWindow) {
            this._slotInfoWindow.setActor(this.actor());
        }
    };
})();

