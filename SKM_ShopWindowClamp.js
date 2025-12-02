//=============================================================================
// SKM_ShopWindowClamp.js ver1.0.2
//
// Copyright (c) 2025 sakananomaeasi
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc ショップ画面のゴールドウィンドウ以外を任意の横幅に収める v1.0.1
 * @author sakananomaeasi with GPT-5.1
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
 * 7. SKM_NextRandomShop.js と併用すると、在庫リフレッシュ直後
 *    最初の入店時だけ専用のテキスト／ピクチャを表示できます。
 *
 * ▼備考
 * - ゴールドウィンドウ以外が調整対象です。
 * - 空いたスペースには指定テキストやピクチャを表示できます。
 * - SKM_ShopScene_Ex.js等のショップ改造プラグインより下に配置してください。
 *
 * 
 * ▼追記
 * - 記述していないシーンテキストやピクチャはスキップされます（変化なし）
 * 
 * 
 * @param defaultMessageSpeed
 * @text メッセージ表示速度
 * @type number
 * @min 0
 * @default 1
 * @desc 0で即時表示。1以上で指定フレーム毎に1文字描画します。
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
 * @arg actionPictures
 * @text テキスト別ピクチャ設定
 * @type struct<ActionPicture>[]
 * @default []
 * @desc 入店/購入などの各テキスト表示時に切り替えるピクチャを指定します。
 * 
 * @arg exitTextDuration
 * @text 退店テキスト表示フレーム
 * @type number
 * @min 0
 * @default 45
 * @desc 退店テキストを表示してからシーンを閉じるまでのフレーム数。0で即時終了。
 *
 *
 * @arg messageSpeed
 * @text メッセージ速度
 * @type number
 * @min 0
 * @default 
 * @desc 0で即時表示。1以上で指定フレーム毎に1文字描画。未設定時はプラグインパラメータ値を使用。
 *
 * 
 * @command ClearShopWidth
 * @text 指定を解除
 * @desc 予約済みのショップ横幅・メッセージ・ピクチャの指定をキャンセルします。
 */
/*~struct~ActionPicture:ja
 * @param type
 * @text テキスト種別
 * @type select
 * @option 通常テキスト
 * @value message
 * @option 入店テキスト
 * @value entry
 * @option リフレッシュ入店
 * @value refreshEntry
 * @option 購入成功
 * @value purchase
 * @option 購入失敗
 * @value purchaseFailed
 * @option 売り切れ
 * @value soldOut
 * @option 退店
 * @value exit
 * @default message
 *
 * @param text
 * @text 表示テキスト
 * @type multiline_string
 * @default
 * @desc 空欄でテキスト非表示。\\nで改行。
 *
 * @param picture
 * @text ピクチャ名
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param offsetX
 * @text ピクチャXオフセット
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @param offsetY
 * @text ピクチャYオフセット
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 */
(() => {
    "use strict";

    const pluginName = document.currentScript.src.match(/([^/\\]+)\.js$/)[1];
    const pluginParams = PluginManager.parameters(pluginName);

    const normalizePictureName = name => {
        if (!name) return "";
        return String(name)
            .trim()
            .replace(/\.(png|jpg|jpeg)$/i, "");
    };

    const normalizeClampText = value => {
        if (value == null) return "";
        const text = String(value).replace(/\\n/g, "\n");
        return text.trim().length > 0 ? text : "";
    };

    const SHOP_CLAMP_ACTION_TEXT_DURATION = 120;
    const SHOP_CLAMP_EXIT_WAIT_DEFAULT = 60;
    const DEFAULT_CLAMP_MESSAGE_SPEED = Math.max(0, Number(pluginParams.defaultMessageSpeed || 0));

    const parseActionPictures = raw => {
        if (!raw) return [];
        let list;
        try {
            list = JSON.parse(raw);
        } catch (e) {
            return [];
        }
        if (!Array.isArray(list)) return [];
        return list.map(item => {
            if (!item) return null;
            let data = item;
            if (typeof item === "string") {
                try {
                    data = JSON.parse(item);
                } catch (e) {
                    return null;
                }
            }
            if (!data || typeof data !== "object") return null;
            const type = String(data.type || "").trim();
            if (!type) return null;
            const text = normalizeClampText(data.text);
            const picture = normalizePictureName(data.picture);
            const hasContent = text.length > 0 || picture.length > 0;
            if (!hasContent) return null;
            return {
                type,
                text,
                picture,
                offsetX: Number(data.offsetX || 0) || 0,
                offsetY: Number(data.offsetY || 0) || 0
            };
        }).filter(Boolean);
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
                    pictureOffsetY: Number(config.pictureOffsetY) || 0,
                    exitTextDuration: config.exitTextDuration,
                    messageSpeed: config.messageSpeed,
                    actionPictures: Array.isArray(config.actionPictures)
                        ? config.actionPictures.map(entry => ({ ...entry }))
                        : []
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
        const message = normalizeClampText(args.message);
        const exitTextDuration = args.exitTextDuration !== undefined && args.exitTextDuration !== ""
            ? Math.max(0, Number(args.exitTextDuration) || 0)
            : null;
        const actionPictures = parseActionPictures(args.actionPictures);
        const messageSpeed = args.messageSpeed !== undefined && args.messageSpeed !== ""
            ? Math.max(0, Number(args.messageSpeed) || 0)
            : null;
        const picture = normalizePictureName(args.picture);
        const pictureOffsetX = Number(args.pictureOffsetX || 0) || 0;
        const pictureOffsetY = Number(args.pictureOffsetY || 0) || 0;
        if (width > 0) {
            this._shopWindowClampReservation = {
                width,
                message,
                picture,
                pictureOffsetX,
                pictureOffsetY,
                exitTextDuration,
                messageSpeed,
                actionPictures
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
            const exitDurationRaw = Number(config.exitTextDuration);
            const hasExitDuration = config.exitTextDuration !== undefined && config.exitTextDuration !== null;
            const exitTextDuration = hasExitDuration
                ? Math.max(0, Number.isFinite(exitDurationRaw) ? exitDurationRaw : 0)
                : SHOP_CLAMP_EXIT_WAIT_DEFAULT;
            const actionEntries = {};
            const ensureActionEntry = type => {
                if (!type) return null;
                if (!actionEntries[type]) {
                    actionEntries[type] = { text: "", pictureData: null };
                }
                return actionEntries[type];
            };
            const actionPictureList = Array.isArray(config.actionPictures) ? config.actionPictures : [];
            actionPictureList.forEach(entry => {
                if (!entry || !entry.type) return;
                const target = ensureActionEntry(entry.type);
                if (!target) return;
                if (entry.text && entry.text.length > 0) {
                    target.text = entry.text;
                }
                if (entry.picture && entry.picture.length > 0) {
                    target.pictureData = {
                        picture: entry.picture,
                        offsetX: Number(entry.offsetX) || 0,
                        offsetY: Number(entry.offsetY) || 0
                    };
                }
            });

            this._shopWindowClamp = {
                requestedWidth: Number(config.width) || 0,
                message: config.message || "",
                picture: config.picture || "",
                pictureOffsetX: Number(config.pictureOffsetX) || 0,
                pictureOffsetY: Number(config.pictureOffsetY) || 0,
                exitTextDuration,
                messageSpeed: (config.messageSpeed != null ? config.messageSpeed : DEFAULT_CLAMP_MESSAGE_SPEED),
                actionEntries
            };
            const hasFreshContent = this._shopClampHasActionContent("refreshEntry");
            this._shopClampFreshEntry = !!this._skmRandomShopFreshEntry && hasFreshContent;
        } else {
            this._shopWindowClamp = null;
            this._shopClampFreshEntry = false;
        }
    };

    const _Scene_Shop_create = Scene_Shop.prototype.create;
    Scene_Shop.prototype.create = function() {
        _Scene_Shop_create.call(this);
        this._shopClampBaseMessage = this._shopWindowClamp ? (this._shopWindowClamp.message || "") : "";
        this._shopClampActionResetTimer = 0;
        this._shopClampExitDelayActive = false;
        this._shopClampExitSkipDelay = false;
        this._shopClampExitCountdown = 0;
        this.createClampPictureSprite();
        this.createClampMessageWindow();
        if (this._shopWindowClamp) {
            if (this._shopClampFreshEntry && this._shopClampHasActionContent("refreshEntry")) {
                this._shopClampShowActionByType("refreshEntry");
            } else if (this._shopClampHasActionContent("entry")) {
                this._shopClampShowActionByType("entry");
            }
        }
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
        if (!this._shopWindowClamp) return false;
        const baseMessage = this._shopWindowClamp.message;
        const hasBaseMessage =
            typeof baseMessage === "string" && baseMessage.trim().length > 0;
        if (hasBaseMessage) return true;
        const actionEntries = this._shopWindowClamp.actionEntries || {};
        return Object.values(actionEntries).some(
            entry => entry && entry.text && entry.text.length > 0
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
        const typingSpeed = this._shopWindowClamp && this._shopWindowClamp.messageSpeed != null
            ? this._shopWindowClamp.messageSpeed
            : DEFAULT_CLAMP_MESSAGE_SPEED;
        this._clampMessageWindow.setTypingSpeed(typingSpeed);
        this._shopClampBaseMessage = this._shopClampBaseMessage || this._shopWindowClamp.message || "";
        this._clampMessageWindow.setText(this._shopClampBaseMessage);
        this._shopClampApplyMessagePicture();
        this._shopClampActionResetTimer = 0;
        this.addWindow(this._clampMessageWindow);
    };

    Scene_Shop.prototype._shopClampShowActionByType = function(actionType, options = {}) {
        if (!this._shopWindowClamp) return;
        const entry = this._shopClampGetActionEntry(actionType);
        const messageWindow = this._clampMessageWindow;
        const textSource =
            options.textOverride !== undefined
                ? options.textOverride
                : entry && entry.text ? entry.text : "";
        const pictureOverride =
            options.pictureData && options.pictureData.picture ? options.pictureData : null;
        const hasText = !!(messageWindow && textSource && textSource.length > 0);
        const pictureData = pictureOverride || (entry && entry.pictureData);
        if (!hasText && !pictureData) {
            return;
        }
        if (hasText) {
            messageWindow.setText(textSource);
        }
        if (pictureData) {
            this._shopClampApplyPicture(pictureData);
        } else if (hasText) {
            this._shopClampApplyMessagePicture();
        }
        const hold = !!options.hold;
        if (hold) {
            this._shopClampActionResetTimer = 0;
        } else if (this._shopClampBaseMessage !== undefined) {
            this._shopClampActionResetTimer = SHOP_CLAMP_ACTION_TEXT_DURATION;
        }
    };

    Scene_Shop.prototype._shopClampUpdateActionText = function() {
        if (this._shopClampActionResetTimer > 0) {
            this._shopClampActionResetTimer--;
            if (this._shopClampActionResetTimer === 0) {
                if (this._clampMessageWindow) {
                    this._clampMessageWindow.setText(this._shopClampBaseMessage || "");
                }
                this._shopClampApplyMessagePicture();
            }
        }
    };

    Scene_Shop.prototype._shopClampRequiresPictureSprite = function() {
        if (!this._shopWindowClamp) return false;
        const hasBase = typeof this._shopWindowClamp.picture === "string" &&
            this._shopWindowClamp.picture.trim().length > 0;
        const hasActionPicture =
            this._shopWindowClamp.actionEntries &&
            Object.values(this._shopWindowClamp.actionEntries).some(
                entry => entry && entry.pictureData && entry.pictureData.picture
            );
        return hasBase || hasActionPicture;
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
        if (!this._shopClampRequiresPictureSprite()) return;
        const rect = this._shopClampPictureRect();
        if (!rect) return;
        this._shopClampPictureRectCache = rect;
        const sprite = new Sprite();
        sprite.visible = false;
        this._clampPictureSprite = sprite;
        const windowLayerIndex = this.getChildIndex(this._windowLayer);
        const insertIndex = windowLayerIndex >= 0 ? windowLayerIndex : this.children.length;
        this.addChildAt(sprite, insertIndex);
        this._shopClampBasePicture = this._shopClampHasBasePicture()
            ? {
                  type: "message",
                  picture: this._shopWindowClamp.picture.trim(),
                  offsetX: Number(this._shopWindowClamp.pictureOffsetX) || 0,
                  offsetY: Number(this._shopWindowClamp.pictureOffsetY) || 0
              }
            : null;
        this._shopClampApplyMessagePicture();
    };

    Scene_Shop.prototype._shopClampHasBasePicture = function() {
        return !!(
            this._shopWindowClamp &&
            typeof this._shopWindowClamp.picture === "string" &&
            this._shopWindowClamp.picture.trim().length > 0
        );
    };

    Scene_Shop.prototype._shopClampGetActionEntry = function(actionType) {
        if (!this._shopWindowClamp || !this._shopWindowClamp.actionEntries) return null;
        return this._shopWindowClamp.actionEntries[actionType] || null;
    };

    Scene_Shop.prototype._shopClampHasActionContent = function(actionType) {
        const entry = this._shopClampGetActionEntry(actionType);
        if (!entry) return false;
        return !!(
            (entry.text && entry.text.length > 0) ||
            (entry.pictureData && entry.pictureData.picture)
        );
    };

    Scene_Shop.prototype._shopClampActionHasText = function(actionType) {
        const entry = this._shopClampGetActionEntry(actionType);
        return !!(entry && entry.text && entry.text.length > 0);
    };

    Scene_Shop.prototype._shopClampApplyMessagePicture = function() {
        if (!this._clampPictureSprite) return;
        const messageEntry = this._shopClampGetActionEntry("message");
        if (messageEntry && messageEntry.pictureData) {
            this._shopClampApplyPicture(messageEntry.pictureData);
        } else {
            this._shopClampApplyPicture(this._shopClampBasePicture);
        }
    };

    Scene_Shop.prototype._shopClampApplyPicture = function(pictureData) {
        const sprite = this._clampPictureSprite;
        if (!sprite) return;
        if (!pictureData || !pictureData.picture) {
            sprite.visible = false;
            sprite.bitmap = null;
            this._shopClampCurrentPicture = null;
            return;
        }
        const rect = this._shopClampPictureRectCache;
        if (!rect) return;
        const bitmap = ImageManager.loadPicture(pictureData.picture);
        const applyPosition = () => {
            sprite.bitmap = bitmap;
            sprite.visible = true;
            this._positionClampPictureSprite(sprite, rect, bitmap, pictureData.offsetX || 0, pictureData.offsetY || 0);
        };
        if (bitmap.isReady()) {
            applyPosition();
        } else {
            bitmap.addLoadListener(applyPosition);
        }
        this._shopClampCurrentPicture = pictureData;
    };

    Scene_Shop.prototype._positionClampPictureSprite = function(sprite, rect, bitmap, offsetX, offsetY) {
        if (!bitmap || bitmap.width <= 0 || bitmap.height <= 0) return;
        let scale = 1;
        if (rect.width > 0 && bitmap.width > rect.width) {
            scale = rect.width / bitmap.width;
        }
        sprite.scale.x = sprite.scale.y = scale;
        const drawWidth = bitmap.width * scale;
        const drawHeight = bitmap.height * scale;
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

    const _Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
    Scene_Shop.prototype.doBuy = function(number) {
        _Scene_Shop_doBuy.call(this, number);
        this._shopClampShowActionByType("purchase");
    };

    Scene_Shop.prototype._shopClampIsSoldOutItem = function(item) {
        if (!item || !item.meta) return false;
        const hasTag = item.meta.soldout || item.meta.SOLDOUT;
        if (!hasTag) return false;
        if (this._buyWindow && this._buyWindow.isEnabled && this._buyWindow.isEnabled(item)) {
            return false;
        }
        return true;
    };

    Scene_Shop.prototype._shopClampHandleFailedPurchase = function(item) {
        if (!this._shopWindowClamp) return;
        if (this._shopClampIsSoldOutItem(item) && this._shopClampHasActionContent("soldOut")) {
            this._shopClampShowActionByType("soldOut");
        } else {
            this._shopClampShowActionByType("purchaseFailed");
        }
    };

    const _Scene_Shop_update = Scene_Shop.prototype.update;
    Scene_Shop.prototype.update = function() {
        _Scene_Shop_update.call(this);
        this._shopClampUpdateExitDelay();
        this._shopClampUpdateActionText();
    };

    const _Scene_Shop_popScene = Scene_Shop.prototype.popScene;
    Scene_Shop.prototype.popScene = function() {
        if (this._shopClampHandleExitDelay()) return;
        _Scene_Shop_popScene.call(this);
    };

    Scene_Shop.prototype._shopClampHandleExitDelay = function() {
        if (!this._shopWindowClamp) return false;
        if (!this._clampMessageWindow) return false;
        if (!this._shopClampActionHasText("exit")) return false;
        if (this._shopClampExitSkipDelay) return false;
        if (this._shopClampExitDelayActive) return true;
        const duration = Math.max(
            0,
            Number.isFinite(this._shopWindowClamp.exitTextDuration)
                ? this._shopWindowClamp.exitTextDuration
                : SHOP_CLAMP_EXIT_WAIT_DEFAULT
        );
        this._shopClampShowActionByType("exit", { hold: true });
        if (duration <= 0) {
            return false;
        }
        this._shopClampExitDelayActive = true;
        this._shopClampExitCountdown = duration;
        return true;
    };

    Scene_Shop.prototype._shopClampUpdateExitDelay = function() {
        if (!this._shopClampExitDelayActive) return;
        if (this._shopClampExitCountdown > 0) {
            this._shopClampExitCountdown--;
            if (this._shopClampExitCountdown <= 0) {
                this._shopClampExitDelayActive = false;
                this._shopClampExitSkipDelay = true;
                this.popScene();
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Window_ShopClampMessage
    //-----------------------------------------------------------------------------

    function Window_ShopClampMessage(rect) {
        Window_Base.call(this, rect);
        this._text = "";
        this._targetText = "";
        this._typingSpeed = 0;
        this._typingIndex = null;
        this._typingTick = 0;
    }

    Window_ShopClampMessage.prototype = Object.create(Window_Base.prototype);
    Window_ShopClampMessage.prototype.constructor = Window_ShopClampMessage;

    Window_ShopClampMessage.prototype.setTypingSpeed = function(speed) {
        this._typingSpeed = Math.max(0, Number(speed) || 0);
    };

    Window_ShopClampMessage.prototype.setText = function(text) {
        const next = text || "";
        this._targetText = next;
        if (this._typingSpeed > 0 && next) {
            this._startTyping();
        } else {
            this._typingIndex = null;
            this._typingTick = 0;
            this._renderFullText(next);
        }
    };

    Window_ShopClampMessage.prototype.refresh = function() {
        this.contents.clear();
        if (!this._text) return;
        this.resetFontSettings();
        const rect = this._baseTextRect();
        this.drawTextEx(this._text, rect.x, rect.y, rect.width);
    };

    Window_ShopClampMessage.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        this._updateTyping();
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

    Window_ShopClampMessage.prototype._baseTextRect = function() {
        return this.baseTextRect
            ? this.baseTextRect()
            : new Rectangle(
                  this.textPadding(),
                  0,
                  this.contentsWidth(),
                  this.contentsHeight()
              );
    };

    Window_ShopClampMessage.prototype._renderFullText = function(text) {
        this._text = text || "";
        this.contents.clear();
        if (!this._text) return;
        this.resetFontSettings();
        const rect = this._baseTextRect();
        this.drawTextEx(this._text, rect.x, rect.y, rect.width);
    };

    Window_ShopClampMessage.prototype._startTyping = function() {
        this.contents.clear();
        this.resetFontSettings();
        this._text = "";
        this._typingIndex = 0;
        this._typingTick = 0;
        this._renderFullText("");
    };

    Window_ShopClampMessage.prototype._updateTyping = function() {
        if (this._typingIndex === null || !this._targetText) return;
        const speed = Math.max(1, this._typingSpeed);
        this._typingTick += 1;
        let updated = false;
        while (this._typingTick >= speed && this._typingIndex < this._targetText.length) {
            this._typingTick -= speed;
            this._typingIndex++;
            const partial = this._targetText.slice(0, this._typingIndex);
            this._renderFullText(partial);
            updated = true;
        }
        if (this._typingIndex >= this._targetText.length) {
            this._typingIndex = null;
            this._typingTick = 0;
            if (!updated) {
                this._renderFullText(this._targetText);
            }
        }
    };

    const _Window_ShopBuy_processOk = Window_ShopBuy.prototype.processOk;
    Window_ShopBuy.prototype.processOk = function() {
        const enabled = this.isCurrentItemEnabled();
        const item = this.item();
        _Window_ShopBuy_processOk.call(this);
        if (!enabled) {
            const scene = SceneManager._scene;
            if (scene && typeof scene._shopClampHandleFailedPurchase === "function") {
                scene._shopClampHandleFailedPurchase(item);
            }
        }
    };
})();

