//=============================================================================
// SKM_ShopWindowClamp.js
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc ショップ画面のゴールドウィンドウ以外を任意の横幅に収める v1.0.0
 * @author GPT-5.1
 *
 * @help
 * プラグインコマンドで「次に実行するショップの処理」だけ、
 * ゴールドウィンドウ以外の各ウィンドウを指定した横幅に収めます。
 * プラグインコマンドを実行しなかった場合は従来どおりの幅で表示されます。
 *
 * ▼使い方
 * 1. ショップイベント内で「ショップの処理」の前に
 *    「次ショップの幅を指定」を呼び出してください。
 * 2. 幅はピクセル単位です。指定値がゴールドウィンドウの左端より大きい場合は
 *    自動的にそこまででクランプされます。
 * 3. 指定は次のショップ処理1回分のみ有効です。
 *    連続で複数のショップを開く場合はその都度コマンドを実行してください。
 * 4. 幅の指定を取り消したい場合は「指定を解除」を呼び出します。
 * 5. テキストを入力すると、空いたスペースに専用メッセージウィンドウが表示されます。
 * 6. ピクチャ名を指定すると、同じスペースにピクチャを自動配置します（img/pictures/）。
 *    X/Yオフセットを指定すると、表示位置を任意にずらせます（単位: ピクセル）。
 *    メッセージとピクチャは同時に指定可能で、メッセージはピクチャより前面に表示されます。
 *
 * ▼備考
 * - helpウィンドウとゴールドウィンドウ以外が調整対象です。
 * - buy/sell/number/category/status/dummy/command/help各ウィンドウが調整対象です。
 * - 空いたスペースには指定テキストやピクチャを表示できます。
 * - SKM_ShopScene_Ex.js等のショップ改造プラグインより下に配置してください。
 *
 * @command SetShopWidth
 * @text 次ショップの幅を指定
 * @desc 次に実行する「ショップの処理」でゴールドウィンドウ以外を指定幅に収めます。
 *
 * @arg width
 * @text 横幅
 * @type number
 * @min 1
 * @default 960
 * @desc 左端からこのピクセル数までに各ウィンドウを詰めます。
 *
 * @arg message
 * @text 表示テキスト
 * @type multiline_string
 * @default
 * @desc 空欄の場合はメッセージウィンドウを表示しません。\\nで改行可能。
 *
 * @arg picture
 * @text ピクチャ名
 * @type file
 * @dir img/pictures/
 * @default
 * @desc 「ピクチャの表示」で使う画像ファイル名（拡張子不要）。空で非表示。
 *
 * @arg pictureOffsetX
 * @text ピクチャXオフセット
 * @type number
 * @min -9999
 * @default 0
 * @desc ピクチャの表示位置を右(+)左(-)へ補正します。
 *
 * @arg pictureOffsetY
 * @text ピクチャYオフセット
 * @type number
 * @min -9999
 * @default 0
 * @desc ピクチャの表示位置を下(+)上(-)へ補正します。
 *
 * @command ClearShopWidth
 * @text 指定を解除
 * @desc 予約済みのショップ横幅・メッセージ・ピクチャの指定をキャンセルします。
 */
(() => {
    "use strict";

    const pluginName = document.currentScript.src.match(/([^/\\]+)\.js$/)[1];

    const normalizePictureName = name => {
        if (!name) return "";
        return String(name)
            .trim()
            .replace(/\.(png|jpg|jpeg)$/i, "");
    };

    class ShopWidthReservation {
        static reserve(config) {
            if (config && Number(config.width) > 0) {
                const pictureName = normalizePictureName(config.picture);
                this._pendingConfig = {
                    width: Number(config.width),
                    message: config.message || "",
                    picture: pictureName,
                    pictureOffsetX: Number(config.pictureOffsetX) || 0,
                    pictureOffsetY: Number(config.pictureOffsetY) || 0
                };
            } else {
                this._pendingConfig = null;
            }
        }

        static clear() {
            this._pendingConfig = null;
        }

        static consume() {
            const value = this._pendingConfig;
            this._pendingConfig = null;
            return value;
        }
    }

    PluginManager.registerCommand(pluginName, "SetShopWidth", function(args) {
        const width = Number(args.width || 0);
        const rawMessage = args.message != null ? String(args.message) : "";
        const message = rawMessage.replace(/\\n/g, "\n");
        const picture = normalizePictureName(args.picture);
        const pictureOffsetX = Number(args.pictureOffsetX || 0) || 0;
        const pictureOffsetY = Number(args.pictureOffsetY || 0) || 0;
        if (width > 0) {
            this._shopWindowClampReservation = {
                width,
                message,
                picture,
                pictureOffsetX,
                pictureOffsetY
            };
        } else {
            this._shopWindowClampReservation = null;
        }
    });

    PluginManager.registerCommand(pluginName, "ClearShopWidth", function() {
        this._shopWindowClampReservation = null;
    });

    const _Game_Interpreter_command302 = Game_Interpreter.prototype.command302;
    Game_Interpreter.prototype.command302 = function(params) {
        if (
            this._shopWindowClampReservation &&
            this._shopWindowClampReservation.width > 0
        ) {
            ShopWidthReservation.reserve(
                Object.assign({}, this._shopWindowClampReservation)
            );
            this._shopWindowClampReservation = null;
        }
        return _Game_Interpreter_command302.call(this, params);
    };

    const _Scene_Shop_prepare = Scene_Shop.prototype.prepare;
    Scene_Shop.prototype.prepare = function(goods, purchaseOnly) {
        _Scene_Shop_prepare.call(this, goods, purchaseOnly);
        const config = ShopWidthReservation.consume();
        if (config) {
            this._shopWindowClamp = {
                requestedWidth: Number(config.width) || 0,
                message: config.message || "",
                picture: config.picture || "",
                pictureOffsetX: Number(config.pictureOffsetX) || 0,
                pictureOffsetY: Number(config.pictureOffsetY) || 0
            };
        } else {
            this._shopWindowClamp = null;
        }
    };

    const _Scene_Shop_create = Scene_Shop.prototype.create;
    Scene_Shop.prototype.create = function() {
        _Scene_Shop_create.call(this);
        this.createClampPictureSprite();
        this.createClampMessageWindow();
        this._shopClampRelayoutPartyWindows();
    };

    Scene_Shop.prototype._shopClampAreaWidth = function() {
        if (!this._shopWindowClamp) return null;
        if (this._shopWindowClamp.clampedWidth === undefined) {
            const requested = Math.max(0, this._shopWindowClamp.requestedWidth);
            const goldRect = this.goldWindowRect();
            const goldLeft = goldRect ? goldRect.x : Graphics.boxWidth;
            this._shopWindowClamp.clampedWidth = Math.min(requested, goldLeft);
        }
        return this._shopWindowClamp.clampedWidth || null;
    };

    Scene_Shop.prototype._shopClampGapWidth = function() {
        const areaWidth = this._shopClampAreaWidth();
        if (!areaWidth) return 0;
        return Math.max(0, Graphics.boxWidth - areaWidth);
    };

    Scene_Shop.prototype._shopClampBuyWidth = function() {
        const areaWidth = this._shopClampAreaWidth();
        if (!areaWidth) return null;
        const statusWidth = Math.min(this.statusWidth(), areaWidth);
        return Math.max(0, areaWidth - statusWidth);
    };

    Scene_Shop.prototype._shopClampStatusWidth = function() {
        const areaWidth = this._shopClampAreaWidth();
        if (!areaWidth) return null;
        return Math.min(this.statusWidth(), areaWidth);
    };

    Scene_Shop.prototype._shopClampMessageWidth = function() {
        return this._shopClampGapWidth();
    };

    Scene_Shop.prototype._shopClampMessageHeight = function() {
        if (!this._shopWindowClamp) return 0;
        if (this._shopWindowClamp.messageHeight === undefined) {
            const defaultRows = 4; // Window_Message default
            const height = this.calcWindowHeight(defaultRows, false) + 8;
            const usableHeight = Graphics.boxHeight - this.buttonAreaHeight();
            this._shopWindowClamp.messageHeight = Math.min(height, usableHeight);
        }
        return this._shopWindowClamp.messageHeight;
    };

    Scene_Shop.prototype._shopClampHasMessage = function() {
        return (
            this._shopWindowClamp &&
            typeof this._shopWindowClamp.message === "string" &&
            this._shopWindowClamp.message.trim().length > 0
        );
    };

    Scene_Shop.prototype._shopClampMessageRect = function(messageWidth) {
        const wx = this._shopClampAreaWidth();
        const wh = this._shopClampMessageHeight();
        const bottom = Graphics.boxHeight;// - this.buttonAreaHeight();
        const wy = bottom - wh;
        return new Rectangle(wx, wy, messageWidth, wh);
    };

    Scene_Shop.prototype.createClampMessageWindow = function() {
        if (!this._shopClampHasMessage()) return;
        const messageWidth = this._shopClampMessageWidth();
        const messageHeight = this._shopClampMessageHeight();
        if (messageWidth <= 0 || messageHeight <= 0) return;
        const rect = this._shopClampMessageRect(messageWidth);
        this._clampMessageWindow = new Window_ShopClampMessage(rect);
        this._clampMessageWindow.setText(this._shopWindowClamp.message);
        this.addWindow(this._clampMessageWindow);
    };

    Scene_Shop.prototype._shopClampHasPicture = function() {
        return (
            this._shopWindowClamp &&
            typeof this._shopWindowClamp.picture === "string" &&
            this._shopWindowClamp.picture.trim().length > 0
        );
    };

    Scene_Shop.prototype._shopClampPictureRect = function() {
        const areaWidth = this._shopClampAreaWidth();
        if (!areaWidth) return null;
        const width = this._shopClampGapWidth();
        if (width <= 0) return null;
        const wx = areaWidth;
        const wy = this.buttonAreaHeight();
        const wh = Graphics.boxHeight - wy;
        //const wh = Graphics.boxHeight - this.buttonAreaHeight();
        if (wh <= 0) return null;
        return new Rectangle(wx, wy, width, wh);
    };

    Scene_Shop.prototype.createClampPictureSprite = function() {
        if (!this._shopClampHasPicture()) return;
        const rect = this._shopClampPictureRect();
        if (!rect) return;
        const pictureName = this._shopWindowClamp.picture.trim();
        const bitmap = ImageManager.loadPicture(pictureName);
        const sprite = new Sprite(bitmap);
        sprite._clampRect = rect;
        sprite._clampOffsetX = Number(this._shopWindowClamp.pictureOffsetX) || 0;
        sprite._clampOffsetY = Number(this._shopWindowClamp.pictureOffsetY) || 0;
        this._clampPictureSprite = sprite;
        const windowLayerIndex = this.getChildIndex(this._windowLayer);
        const insertIndex = windowLayerIndex >= 0 ? windowLayerIndex : this.children.length;
        this.addChildAt(sprite, insertIndex);
        bitmap.addLoadListener(() => {
            this._positionClampPictureSprite(sprite, rect);
        });
    };

    Scene_Shop.prototype._positionClampPictureSprite = function(sprite, rect) {
        const bitmap = sprite.bitmap;
        if (!bitmap || bitmap.width <= 0 || bitmap.height <= 0) return;
        let scale = 1;
        if (rect.width > 0 && bitmap.width > rect.width) {
            scale = rect.width / bitmap.width;
        }
        sprite.scale.x = sprite.scale.y = scale;
        const drawWidth = bitmap.width * scale;
        const drawHeight = bitmap.height * scale;
        const offsetX = sprite._clampOffsetX || 0;
        const offsetY = sprite._clampOffsetY || 0;
        sprite.x = rect.x + (rect.width - drawWidth) / 2 + offsetX;
        sprite.y = rect.y + (rect.height - drawHeight) / 2 + offsetY;
    };

    const _Scene_Shop_helpWindowRect =
        Scene_Shop.prototype.helpWindowRect ||
        Scene_MenuBase.prototype.helpWindowRect;
    Scene_Shop.prototype.helpWindowRect = function() {
        const rect = _Scene_Shop_helpWindowRect.call(this);
        const areaWidth = this._shopClampAreaWidth();
        if (areaWidth) rect.width = areaWidth;
        return rect;
    };

    const _Scene_Shop_commandWindowRect = Scene_Shop.prototype.commandWindowRect;
    Scene_Shop.prototype.commandWindowRect = function() {
        const rect = _Scene_Shop_commandWindowRect.call(this);
        const areaWidth = this._shopClampAreaWidth();
        if (areaWidth) rect.width = areaWidth;
        return rect;
    };

    const _Scene_Shop_dummyWindowRect = Scene_Shop.prototype.dummyWindowRect;
    Scene_Shop.prototype.dummyWindowRect = function() {
        const rect = _Scene_Shop_dummyWindowRect.call(this);
        const areaWidth = this._shopClampAreaWidth();
        if (areaWidth) rect.width = areaWidth;
        return rect;
    };

    const _Scene_Shop_numberWindowRect = Scene_Shop.prototype.numberWindowRect;
    Scene_Shop.prototype.numberWindowRect = function() {
        const rect = _Scene_Shop_numberWindowRect.call(this);
        const buyWidth = this._shopClampBuyWidth();
        if (buyWidth !== null) rect.width = buyWidth;
        return rect;
    };

    const _Scene_Shop_buyWindowRect = Scene_Shop.prototype.buyWindowRect;
    Scene_Shop.prototype.buyWindowRect = function() {
        const rect = _Scene_Shop_buyWindowRect.call(this);
        const buyWidth = this._shopClampBuyWidth();
        if (buyWidth !== null) rect.width = buyWidth;
        return rect;
    };

    const _Scene_Shop_statusWindowRect = Scene_Shop.prototype.statusWindowRect;
    Scene_Shop.prototype.statusWindowRect = function() {
        const baseRect = _Scene_Shop_statusWindowRect.call(this);
        this._shopClampLastOriginalStatusRect = new Rectangle(
            baseRect.x,
            baseRect.y,
            baseRect.width,
            baseRect.height
        );
        const adjustedRect = this._shopClampBuildStatusRect(baseRect);
        this._shopClampLastAdjustedStatusRect = new Rectangle(
            adjustedRect.x,
            adjustedRect.y,
            adjustedRect.width,
            adjustedRect.height
        );
        return adjustedRect;
    };

    Scene_Shop.prototype._shopClampBuildStatusRect = function(baseRect) {
        const rect = new Rectangle(baseRect.x, baseRect.y, baseRect.width, baseRect.height);
        const areaWidth = this._shopClampAreaWidth();
        const statusWidth = this._shopClampStatusWidth();
        if (statusWidth) {
            rect.width = statusWidth;
            rect.x = Math.max(0, areaWidth - statusWidth);
        }
        return rect;
    };

    const _Scene_Shop_categoryWindowRect = Scene_Shop.prototype.categoryWindowRect;
    Scene_Shop.prototype.categoryWindowRect = function() {
        const rect = _Scene_Shop_categoryWindowRect.call(this);
        const areaWidth = this._shopClampAreaWidth();
        if (areaWidth) rect.width = areaWidth;
        return rect;
    };

    const _Scene_Shop_sellWindowRect = Scene_Shop.prototype.sellWindowRect;
    Scene_Shop.prototype.sellWindowRect = function() {
        const rect = _Scene_Shop_sellWindowRect.call(this);
        const areaWidth = this._shopClampAreaWidth();
        if (areaWidth) rect.width = areaWidth;
        return rect;
    };

    Scene_Shop.prototype._shopClampRelayoutPartyWindows = function() {
        if (!this._shopPartyWindow && !this._shopBlankWindow) return;
        if (!this._shopClampLastOriginalStatusRect || !this._shopClampLastAdjustedStatusRect) {
            return;
        }
        const original = this._shopClampLastOriginalStatusRect;
        const adjusted = this._shopClampLastAdjustedStatusRect;
        const dx = adjusted.x - original.x;
        const dw = adjusted.width - original.width;
        if (dx === 0 && dw === 0) return;

        const applyMove = window => {
            if (!window) return;
            const newX = window.x + dx;
            const newWidth = Math.max(1, window.width + dw);
            window.move(newX, window.y, newWidth, window.height);
        };

        applyMove(this._shopPartyWindow);
        if (this._shopPartyWindow) {
            if (this._shopPartyWindow.createContents) {
                this._shopPartyWindow.createContents();
            }
            if (this._shopPartyWindow.refresh) {
                this._shopPartyWindow.refresh();
            }
        }
        //applyMove(this._shopBlankWindow);

    };

    //-----------------------------------------------------------------------------
    // Window_ShopClampMessage
    //-----------------------------------------------------------------------------

    function Window_ShopClampMessage(rect) {
        Window_Base.call(this, rect);
        this._text = "";
    }

    Window_ShopClampMessage.prototype = Object.create(Window_Base.prototype);
    Window_ShopClampMessage.prototype.constructor = Window_ShopClampMessage;

    Window_ShopClampMessage.prototype.setText = function(text) {
        const next = text || "";
        if (this._text === next) return;
        this._text = next;
        this.refresh();
    };

    Window_ShopClampMessage.prototype.refresh = function() {
        this.contents.clear();
        if (!this._text) return;
        this.resetFontSettings();
        const rect = this.baseTextRect
            ? this.baseTextRect()
            : new Rectangle(
                  this.textPadding(),
                  0,
                  this.contentsWidth(),
                  this.contentsHeight()
              );
        this.drawTextEx(this._text, rect.x, rect.y, rect.width);
    };

    Window_ShopClampMessage.prototype.processCharacter = function(textState) {
        this._shopClampPrepareAutoWrap(textState);
        Window_Base.prototype.processCharacter.call(this, textState);
    };

    Window_ShopClampMessage.prototype._shopClampPrepareAutoWrap = function(
        textState
    ) {
        if (!this._shopClampNeedsAutoWrap(textState)) {
            return;
        }
        this.flushTextState(textState);
        this.processNewLine(textState);
    };

    Window_ShopClampMessage.prototype._shopClampNeedsAutoWrap = function(
        textState
    ) {
        const limit = this._shopClampWrapLimit(textState);
        if (!limit) return false;
        const token = this._shopClampNextToken(textState);
        if (!token) return false;
        if (!token.width) return false;
        if (token.width > limit) return false;
        const projectedWidth = this._shopClampProjectedWidth(textState, token);
        return projectedWidth > limit;
    };

    Window_ShopClampMessage.prototype._shopClampProjectedWidth = function(
        textState,
        token
    ) {
        const drawnWidth = Math.abs(textState.x - textState.startX);
        const buffer = textState.buffer || "";
        const bufferWidth = buffer ? this.textWidth(buffer) : 0;
        return drawnWidth + bufferWidth + token.width;
    };

    Window_ShopClampMessage.prototype._shopClampWrapLimit = function(textState) {
        const limit = textState.width || this.contentsWidth();
        return limit > 0 ? limit : 0;
    };

    Window_ShopClampMessage.prototype._shopClampNextToken = function(
        textState
    ) {
        const index = textState.index;
        const text = textState.text;
        if (index >= text.length) return null;
        const c = text[index];
        if (c === "\n" || c === "\r" || c === "\f") {
            return { type: "control", width: 0 };
        }
        if (c.charCodeAt(0) < 0x20) {
            if (c === "\x1b") {
                const code = this._shopClampPeekEscapeCode(textState);
                if (code === "I") {
                    const width = ImageManager.iconWidth + 4;
                    return { type: "icon", width };
                }
            }
            return { type: "control", width: 0 };
        }
        const buffer = textState.buffer || "";
        const widthBefore = buffer ? this.textWidth(buffer) : 0;
        const widthAfter = this.textWidth(buffer + c);
        const charWidth = Math.max(0, widthAfter - widthBefore);
        return { type: "printable", width: charWidth };
    };

    Window_ShopClampMessage.prototype._shopClampPeekEscapeCode = function(
        textState
    ) {
        const savedIndex = textState.index;
        const code = this.obtainEscapeCode(textState);
        textState.index = savedIndex;
        return code;
    };
})();

