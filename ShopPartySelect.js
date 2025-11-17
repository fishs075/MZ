//=============================================================================
// ShopPartySelect.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc ショップ画面にパーティ選択ウィンドウと空ウィンドウを追加します。
 * @author GPT-5 Assistant
 * @url 
 * @help
 * ショップ画面のステータス上部に、パーティ人数分の簡易アイコン（顔/歩行）を
 * 横並びで表示する選択ウィンドウを追加します。クリック/タップで
 * ステータス表示対象のアクターを切り替えできます。
 * 
 * また、購入/売却をまだ選んでいないコマンド選択中は、
 * パーティ選択ウィンドウの下に幅を合わせた空のウィンドウを表示します。
 * 売却モード中は、パーティ選択ウィンドウを自動で非表示にします。
 * 
 * プラグインコマンドはありません。
 * 
 * @param windowLines
 * @text ウィンドウ行数
 * @type number
 * @min 1
 * @max 4
 * @default 2
 * @desc パーティ選択ウィンドウの高さ（行高×行数）
 * 
 * @param imageType
 * @text 表示画像タイプ
 * @type select
 * @option 顔グラ
 * @value face
 * @option キャラチップ
 * @value character
 * @option SVアクター
 * @value sv
 * @option 縦72キャラチップ
 * @value 72chara
 * @default face
 * @desc ウィンドウ内に表示する画像の種類を選びます。

 * @param maxVisibleActors
 * @text 最大表示人数
 * @type number
 * @min 1
 * @max 8
 * @default 4
 * @desc パーティ選択ウィンドウに同時に表示するアクター数の上限。
 * 
 * @param showNames
 * @text 名前を表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * @desc アイコンの下にアクター名を表示します。
 * 
 * @param faceCropMode
 * @text 1行顔の表示方式
 * @type select
 * @option クロップ
 * @value crop
 * @option フィット
 * @value fit
 * @default crop
 * @desc windowLines=1 の顔表示時、クロップ(横長)かフィット(全体縮小)か。
 *
 * @param showGuides
 * @text スライドガイドを表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * @desc パーティ選択ウィンドウの左右ガイド（◀ ▶）を表示します。
 *
 * @param svOffsetX
 * @text SV描画オフセットX
 * @type number
 * @min -64
 * @max 64
 * @default 0
 * @desc SVアクター描画のX座標補正（+で右へ）
 * 
 * @param svOffsetY
 * @text SV描画オフセットY
 * @type number
 * @min -64
 * @max 64
 * @default 0
 * @desc SVアクター描画のY座標補正（+で下へ）
 */
(() => {
    'use strict';

    const pluginName = document.currentScript.src.match(/([^\/\\]+)\.js$/)[1];
    const params = PluginManager.parameters(pluginName);
    const windowLines = Number(params.windowLines || 2);
    const imageType = String(params.imageType || 'face');
    const showNames = params.showNames === 'true';
    const maxVisibleActors = Number(params.maxVisibleActors || 4);
    const faceCropMode = String(params.faceCropMode || 'crop');
    const showGuides = params.showGuides === 'true';
    const svOffsetX = Number(params.svOffsetX || 0);
    const svOffsetY = Number(params.svOffsetY || 0);

    //-------------------------------------------------------------------------
    // Window_ShopPartySelect
    //  パーティメンバーを横一列で表示する簡易選択ウィンドウ（ショップ専用）
    //-------------------------------------------------------------------------
    class Window_ShopPartySelect extends Window_Selectable {
        initialize(rect) {
            super.initialize(rect);
            this.activate();
            this.deactivate();
            this.openness = 255;
            this._visibleStartIndex = 0;
        }

        // Window_StatusBase の顔/歩行描画ユーティリティを委譲
        drawActorFace(actor, x, y, width, height) {
            Window_StatusBase.prototype.drawActorFace.call(this, actor, x, y, width, height);
        }

        drawActorCharacter(actor, x, y) {
            if (showNames) {
                Window_StatusBase.prototype.drawActorCharacter.call(this, actor, x, y + 4);
            } else {
                Window_StatusBase.prototype.drawActorCharacter.call(this, actor, x, y);
            }
        }

        drawActorCharacter72(actor, x, y, targetHeight) {
            const characterName = actor.characterName();
            const characterIndex = actor.characterIndex();
            const bitmap = ImageManager.loadCharacter(characterName);
            const draw = () => {
                const big = ImageManager.isBigCharacter(characterName);
                const pw = bitmap.width / (big ? 3 : 12);
                const ph = bitmap.height / (big ? 4 : 8);
                const effectiveHeight = Math.max(1, targetHeight || ph);
                const scale = Math.min(1, effectiveHeight / (ph || 1));
                const dw = Math.max(1, Math.round(pw * scale));
                const dh = Math.max(1, Math.round(ph * scale));
                const n = big ? 0 : characterIndex;
                const sx = ((n % 4) * 3 + 1) * pw;
                const sy = Math.floor(n / 4) * 4 * ph;
                const dx = Math.round(x - dw / 2);
                const dy = Math.round(y - dh);
                this.contents.blt(bitmap, sx, sy, pw, ph, dx, dy, dw, dh);
            };
            if (!bitmap.isReady()) {
                bitmap.addLoadListener(draw);
            } else {
                draw();
            }
        }

        // SVアクター 1コマ描画（足元基準）
        drawActorSv(actor, x, y) {
            const bitmap = ImageManager.loadSvActor(actor.battlerName());
            if (!bitmap.isReady()) {
                bitmap.addLoadListener(() => { if (this && this.contents) this.refresh(); });
                return;
            }
            const pw = bitmap.width / 9;
            const ph = bitmap.height / 6;
            const sx = 4 * pw;
            const sy = 0 * ph;
            this.contents.blt(bitmap, sx, sy, pw, ph, Math.round(x - pw / 2 + svOffsetX), Math.round(y - ph + svOffsetY));
        }

        // 表示中の範囲の画像を事前ロード（SV）
        preloadVisibleAssets() {
            try {
                if (imageType === 'sv') {
                    const count = this.maxItems();
                    for (let i = 0; i < count; i++) {
                        const actor = this.actorAtDisplayIndex(i);
                        if (!actor) continue;
                        const bmp = ImageManager.loadSvActor(actor.battlerName());
                        if (!bmp.isReady()) bmp.addLoadListener(() => { if (this && this.contents) this.refresh(); });
                    }
                }
            } catch (_) {}
        }

        // 顔: 正方縮小フィット
        drawActorFaceScaled(actor, dx, dy, size) {
            const bitmap = ImageManager.loadFace(actor.faceName());
            const index = actor.faceIndex();
            const sw = ImageManager.faceWidth;
            const sh = ImageManager.faceHeight;
            const sx = (index % 4) * sw;
            const sy = Math.floor(index / 4) * sh;
            const draw = () => this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, size, size);
            if (!bitmap.isReady()) bitmap.addLoadListener(draw); else draw();
        }

        // 顔: 目線中心・横長クロップ（1行時）
        drawActorFaceEyesFitNoUpscale(actor, dx, dy, dw, dh) {
            const bitmap = ImageManager.loadFace(actor.faceName());
            const index = actor.faceIndex();
            const cellW = ImageManager.faceWidth;
            const cellH = ImageManager.faceHeight;
            const cellX = (index % 4) * cellW;
            const cellY = Math.floor(index / 4) * cellH;
            const draw = () => {
                const aspect = Math.max(0.3, Math.min(3.0, dw / Math.max(1, dh)));
                let srcW = Math.min(cellW, Math.max(dw, 8));
                let srcH = Math.min(cellH, Math.max(dh, Math.round(srcW / aspect)));
                if (srcH > cellH) { srcH = cellH; srcW = Math.min(cellW, Math.max(8, Math.round(srcH * aspect))); }
                if (srcW > cellW) { srcW = cellW; srcH = Math.min(cellH, Math.max(8, Math.round(srcW / aspect))); }
                const eyeCenterRatioY = 0.42;
                const centerX = cellX + Math.floor(cellW / 2);
                const centerY = cellY + Math.floor(cellH * eyeCenterRatioY);
                let srcX = centerX - Math.floor(srcW / 2);
                let srcY = centerY - Math.floor(srcH / 2);
                const minX = cellX, minY = cellY, maxX = cellX + cellW - srcW, maxY = cellY + cellH - srcH;
                if (srcX < minX) srcX = minX; if (srcX > maxX) srcX = maxX;
                if (srcY < minY) srcY = minY; if (srcY > maxY) srcY = maxY;
                this.contents.blt(bitmap, srcX, srcY, srcW, srcH, dx, dy, dw, dh);
            };
            if (!bitmap.isReady()) bitmap.addLoadListener(draw); else draw();
        }

        // 顔: クロップせず縮小フィット（アップスケール禁止）
        drawActorFaceFitNoUpscale(actor, dx, dy, dw, dh) {
            const bitmap = ImageManager.loadFace(actor.faceName());
            const index = actor.faceIndex();
            const cellW = ImageManager.faceWidth;
            const cellH = ImageManager.faceHeight;
            const cellX = (index % 4) * cellW;
            const cellY = Math.floor(index / 4) * cellH;
            const draw = () => {
                const scale = Math.min(dw / cellW, dh / cellH, 1);
                const w = Math.max(1, Math.floor(cellW * scale));
                const h = Math.max(1, Math.floor(cellH * scale));
                const ox = dx + Math.floor((dw - w) / 2);
                const oy = dy + Math.floor((dh - h) / 2);
                this.contents.blt(bitmap, cellX, cellY, cellW, cellH, ox, oy, w, h);
            };
            if (!bitmap.isReady()) bitmap.addLoadListener(draw); else draw();
        }

        // フェイスを指定サイズに縮小して中央描画
        drawActorFaceScaled(actor, dx, dy, size) {
            const bitmap = ImageManager.loadFace(actor.faceName());
            const index = actor.faceIndex();
            const sw = ImageManager.faceWidth;
            const sh = ImageManager.faceHeight;
            const sx = (index % 4) * sw;
            const sy = Math.floor(index / 4) * sh;
            const draw = () => this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, size, size);
            if (!bitmap.isReady()) {
                bitmap.addLoadListener(draw);
            } else {
                draw();
            }
        }

        maxItems() {
            const total = $gameParty.members().length;
            return Math.min(total, Math.max(1, maxVisibleActors));
        }

        updateVisibleStart() {
            const members = $gameParty.members();
            const limit = Math.max(1, maxVisibleActors);
            if (members.length <= limit) {
                this._visibleStartIndex = 0;
                this.preloadVisibleAssets();
                return;
            }
            const menuIndex = members.indexOf($gameParty.menuActor());
            const half = Math.floor(limit / 2);
            let start = menuIndex - half;
            const maxStart = members.length - limit;
            if (start < 0) start = 0;
            if (start > maxStart) start = maxStart;
            this._visibleStartIndex = start;
            this.preloadVisibleAssets();
        }

        actorAtDisplayIndex(index) {
            const list = $gameParty.members();
            const realIndex = this._visibleStartIndex + index;
            return list[realIndex];
        }

        // スライド可否/操作
        canSlide() { return $gameParty.members().length > Math.max(1, maxVisibleActors); }
        canSlideLeft() { return this.canSlide() && this._visibleStartIndex > 0; }
        canSlideRight() { const limit = Math.max(1, maxVisibleActors); return this.canSlide() && (this._visibleStartIndex + limit) < $gameParty.members().length; }
        slideLeft() { if (this.canSlideLeft()) { this._visibleStartIndex--; this.preloadVisibleAssets(); this.refresh(); SoundManager.playCursor(); } }
        slideRight() { if (this.canSlideRight()) { this._visibleStartIndex++; this.preloadVisibleAssets(); this.refresh(); SoundManager.playCursor(); } }

        leftArrowRect() {
            const w = this.itemPadding() + 28;
            const h = this.lineHeight();
            const x = 0; const y = Math.floor((this.innerHeight - h) / 2);
            return new Rectangle(x, y, w, h);
        }
        rightArrowRect() {
            const w = this.itemPadding() + 28;
            const h = this.lineHeight();
            const x = this.innerWidth - w;
            const y = Math.floor((this.innerHeight - h) / 2);
            return new Rectangle(x, y, w, h);
        }

        drawAllItems() {
            Window_Selectable.prototype.drawAllItems.call(this);
            if (showGuides) this.drawSlideGuides();
        }
        drawSlideGuides() {
            // ガイド表示をオプション化: パラメータがfalseなら描かない
            if (!this.canSlide()) return;
            this.changeTextColor(ColorManager.systemColor());
            this.contents.fontSize = 16;
            if (this.canSlideLeft()) { const r = this.leftArrowRect(); this.drawText("\u25C0", r.x, r.y, r.width, 'left'); }
            if (this.canSlideRight()) { const r = this.rightArrowRect(); this.drawText("\u25B6", r.x, r.y, r.width, 'right'); }
            this.resetTextColor();
        }

        tryHandleArrowTouch() {
            if (!TouchInput.isTriggered()) return false;
            if (!this.isTouchedInsideFrame()) return false;
            const touchPos = new Point(TouchInput.x, TouchInput.y);
            const localPos = this.worldTransform.applyInverse(touchPos);
            const cx = this.origin.x + localPos.x - this.padding;
            const cy = this.origin.y + localPos.y - this.padding;
            const left = this.leftArrowRect();
            const right = this.rightArrowRect();
            if (this.canSlideLeft() && left.contains(cx, cy)) { this.slideLeft(); return true; }
            if (this.canSlideRight() && right.contains(cx, cy)) { this.slideRight(); return true; }
            return false;
        }

        maxCols() { return Math.max(1, this.maxItems()); }

        itemHeight() { return this.innerHeight + this.rowSpacing() - 4; }

        maxPageRows() {
            return 1;
        }

        spacing() {
            return 8;
        }

        drawItem(index) {
            const actor = this.actorAtDisplayIndex(index);
            if (!actor) return;
            const rect = this.itemRect(index);
            this.resetTextColor();

            if (imageType === 'character' || imageType === 'sv' || imageType === '72chara') {
                const isSv = imageType === 'sv';
                const isTallChara = imageType === '72chara';
                const reserveForName = (isSv || isTallChara) ? 0 : (showNames ? this.lineHeight() : 0);
                const usableHeight = rect.height - reserveForName;
                const centerX = rect.x + Math.floor(rect.width / 2);
                const ph = (() => {
                    if (isSv) {
                        const b = ImageManager.loadSvActor(actor.battlerName());
                        return b.isReady() ? b.height / 6 : 64;
                    } else {
                        const b = ImageManager.loadCharacter(actor.characterName());
                        const big = ImageManager.isBigCharacter(actor.characterName());
                        if (b.isReady()) {
                            return b.height / (big ? 4 : 8);
                        }
                        return isTallChara ? 72 : 48;
                    }
                })();
                const displayHeight = isTallChara ? Math.min(ph, Math.max(1, usableHeight)) : ph;
                if (isSv && showNames) {
                    const topPad = 4;
                    const yTopAligned = rect.y + topPad + ph;
                    this.drawActorSv(actor, centerX, yTopAligned);
                } else {
                    const half = Math.floor(displayHeight / 2);
                    const centerY = rect.y + Math.floor(usableHeight / 2);
                    const footY = centerY + half;
                    const minFoot = rect.y + half + 2;
                    const maxFoot = rect.y + usableHeight - 2;
                    const y = Math.min(maxFoot, Math.max(minFoot, footY));
                    if (isSv) {
                        this.drawActorSv(actor, centerX, y);
                    } else if (isTallChara) {
                        this.drawActorCharacter72(actor, centerX, y, displayHeight);
                    } else {
                        this.drawActorCharacter(actor, centerX, y);
                    }
                }
            } else {
                const pad = 4;
                const reserveForName = 0;
                const usableHeight = Math.max(1, rect.height - reserveForName);
                const availW = Math.max(1, rect.width - pad * 2);
                const availH = Math.max(1, usableHeight - pad * 2);
                if (windowLines === 1) {
                    const dw = Math.min(availW, ImageManager.faceWidth);
                    const targetAspectH = 9, targetAspectW = 16;
                    let dh = Math.min(Math.floor(dw * targetAspectH / targetAspectW), availH);
                    const dx = rect.x + Math.floor((rect.width - dw) / 2);
                    const dy = rect.y + Math.floor((rect.height - dh) / 2);
                    if (faceCropMode === 'fit') {
                        this.drawActorFaceFitNoUpscale(actor, dx, dy, dw, dh);
                    } else {
                        this.drawActorFaceEyesFitNoUpscale(actor, dx, dy, dw, dh);
                    }
                } else {
                    const size = Math.max(1, Math.min(availW, availH));
                    const dx = rect.x + Math.floor((rect.width - size) / 2);
                    let dy = rect.y + pad;
                    if (!showNames) {
                        const drawableHeight = size + pad * 2;
                        const extraHeight = usableHeight - drawableHeight;
                        if (extraHeight > 0) {
                            dy += Math.floor(extraHeight / 2);
                        }
                    }
                    this.drawActorFaceScaled(actor, dx, dy, size);
                }
            }

            // 装備状態バッジ（×/Ｅ/↑/↓）
            try {
                const state = this._statusWindow && this._statusWindow.getActorEquipState
                    ? this._statusWindow.getActorEquipState(actor)
                    : 'none';
                if (state && state !== 'none') {
                    // 右下寄りに重ね描き（画像タイプに応じて基準を変える）
                    let bx = rect.x + rect.width - 20 -8;
                    // 名前表示と重ならないよう、名前行の上に配置
                    const nameH = this.lineHeight();
                    const bottomPad = 4;
                    let by = rect.y + rect.height - (showNames ? nameH + bottomPad + 16: (bottomPad+32));
                    if (imageType === 'sv') {
                        // SVは縦が大きいので下寄りに
                        by = Math.min(by, rect.y + rect.height - (showNames ? nameH + 6 : 6) - 16);
                    }

                    switch (state) {
                        case 'cannot':
                            this.contents.fontSize = 24;
                            this.changeTextColor('#ff0000');
                            this.drawText('×', bx, by, 16, 'left');
                            break;
                        case 'equipped':
                            this.contents.fontSize = 20;
                            this.changeTextColor('#ffffff');
                            this.drawText('Ｅ', bx, by, 16, 'left');
                            break;
                        case 'up':
                            this.drawTriangleBadge(bx, by, 16, 16, '#000000', '#00ff00', true);
                            break;
                        case 'down':
                            this.drawTriangleBadge(bx, by, 16, 16, '#000000', '#ff6666', false);
                            break;
                    }
                    // フォント設定と色をリセット（名前描画へ影響しないように）
                    this.resetTextColor();
                    this.resetFontSettings();
                }
            } catch (_) {}

            if (showNames) {
                // 念のためフォント設定を正常化
                this.resetFontSettings();
                const nameH = this.lineHeight();
                const nameY = rect.y + rect.height - nameH;
                this.changePaintOpacity(true);
                this.drawText(actor.name(), rect.x + 2, nameY, rect.width - 4, 'center');
            }

            if (actor === $gameParty.menuActor()) {
                this.contents.paintOpacity = 64;
                this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, ColorManager.textColor(14));
                this.contents.paintOpacity = 255;
            }
        }

        // 小型三角形バッジ
        drawTriangleBadge(x, y, width, height, strokeColor, fillColor, up) {
            const w = width - 4;
            const h = height - 4;
            const ofs = 2;
            const x1 = x + w / 2 + ofs;
            const y1 = up ? y + ofs + 8 : y + h + ofs + 8;
            const x2 = x + ofs;
            const y2 = up ? y + h + ofs + 8 : y + ofs + 8;
            const x3 = x + w + ofs;
            const y3 = y2;
            const ctx = this.contents.context;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.closePath();
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = fillColor;
            ctx.fill();
            ctx.restore();
        }

        // クリック検出（アクティブでなくても利用）
        hitIndex() {
            const touchPos = new Point(TouchInput.x, TouchInput.y);
            const localPos = this.worldTransform.applyInverse(touchPos);
            return super.hitTest(localPos.x, localPos.y);
        }
    }

    //-------------------------------------------------------------------------
    // Scene_Shop 拡張（ショップ専用）
    //-------------------------------------------------------------------------
    const _Scene_Shop_statusWindowRect = Scene_Shop.prototype.statusWindowRect;
    Scene_Shop.prototype.statusWindowRect = function() {
        const rect = _Scene_Shop_statusWindowRect.call(this);
        const offset = this.calcWindowHeight(windowLines, true);
        rect.y += offset;
        rect.height = Math.max(0, rect.height - offset);
        return rect;
    };

    const _Scene_Shop_create = Scene_Shop.prototype.create;
    Scene_Shop.prototype.create = function() {
        _Scene_Shop_create.call(this);
        this.createShopPartySelectWindow();
    };

    Scene_Shop.prototype.createShopPartySelectWindow = function() {
        // パーティ選択ウィンドウ（オリジナルのステータス矩形の位置に配置）
        const orig = _Scene_Shop_statusWindowRect.call(this);
        const wx = orig.x;
        const wy = orig.y;
        const ww = orig.width;
        const wh = this.calcWindowHeight(windowLines, true);
        const rect = new Rectangle(wx, wy, ww, wh);
        // 初期にメニューアクターをリーダーへ同期（バッジ初期表示のため）
        const leader = $gameParty.leader();
        if (leader) {
            $gameParty.setMenuActor(leader);
            if (this._statusWindow && this._statusWindow.updateActorIndex) {
                const idx = $gameParty.members().indexOf(leader);
                if (idx >= 0) this._statusWindow.updateActorIndex(idx);
            }
        }
        this._shopPartyWindow = new Window_ShopPartySelect(rect);
        this.addWindow(this._shopPartyWindow);
        // ステータスウィンドウの判定ロジックを再利用するため参照を付与
        this._shopPartyWindow._statusWindow = this._statusWindow;
        this._shopPartyWindow.updateVisibleStart();
        this._shopPartyWindow.refresh();

        // コマンド選択中の寂しさ対策: 下段に空ウィンドウ
        const statusRect = Scene_Shop.prototype.statusWindowRect.call(this);
        this._shopBlankWindow = new Window_Base(statusRect);
        this.addWindow(this._shopBlankWindow);
        this._shopBlankWindow.hide();

        // 画像読み込み完了後に再描画
        let ready = 0;
        const members = $gameParty.members();
        for (const actor of members) {
            const bmp = imageType === 'character' ? ImageManager.loadCharacter(actor.characterName())
                        : (imageType === 'sv' ? ImageManager.loadSvActor(actor.battlerName())
                        : ImageManager.loadFace(actor.faceName()));
            bmp.addLoadListener(() => {
                ready++;
                if (ready >= members.length && this._shopPartyWindow) this._shopPartyWindow.refresh();
            });
        }
    };

    const _Scene_Shop_update = Scene_Shop.prototype.update;
    Scene_Shop.prototype.update = function() {
        _Scene_Shop_update.call(this);

        // スライド/クリックで対象切替
        if (this._shopPartyWindow && TouchInput.isTriggered()) {
            if (this._shopPartyWindow.tryHandleArrowTouch()) {
                // slide only
            } else {
                const hit = this._shopPartyWindow.hitIndex();
                if (hit >= 0 && hit < this._shopPartyWindow.maxItems()) {
                    const start = this._shopPartyWindow._visibleStartIndex || 0;
                    const members = $gameParty.members();
                    const actor = members[start + hit];
                    if (actor) {
                        $gameParty.setMenuActor(actor);
                        if (this._statusWindow && this._statusWindow.updateActorIndex) {
                            const idx = members.indexOf(actor);
                            this._statusWindow.updateActorIndex(idx);
                            this._statusWindow.refresh();
                        }
                        SoundManager.playCursor();
                        this._shopPartyWindow.updateVisibleStart();
                        this._shopPartyWindow.refresh();
                    }
                }
            }
        }

        // 表示状態制御
        const commandActive = this._commandWindow && this._commandWindow.active;
        const sellActive = this._sellWindow && this._sellWindow.visible;
        if (this._shopPartyWindow) this._shopPartyWindow.visible = !sellActive;
        if (this._shopBlankWindow) this._shopBlankWindow.visible = !!commandActive;

        // 「買う」への遷移監視: アクティブ化時に初期アイテムでバッジを更新
        if (this._buyWindow) {
            const buyActive = !!this._buyWindow.active;
            if (this._lastBuyActive !== buyActive) {
                this._lastBuyActive = buyActive;
                if (buyActive && this._shopPartyWindow) {
                    this._shopPartyWindow.refresh();
                }
            }
        }

        // ステータス側のアクター切替に追従
        if (this._statusWindow) {
            const idx = this._statusWindow._actorIndex;
            if (this._lastShopActorIndex !== idx) {
                this._lastShopActorIndex = idx;
                const members = $gameParty.members();
                if (idx >= 0 && idx < members.length) $gameParty.setMenuActor(members[idx]);
                if (this._shopPartyWindow) { this._shopPartyWindow.updateVisibleStart(); this._shopPartyWindow.refresh(); }
            }

            // ステータス側の選択アイテム変更に追従（バッジのUP/DOWN/×判定が変わる）
            const currentItem = this._statusWindow._item;
            if (this._lastShopStatusItem !== currentItem) {
                this._lastShopStatusItem = currentItem;
                if (this._shopPartyWindow) this._shopPartyWindow.refresh();
            }
        }
    };
})();


