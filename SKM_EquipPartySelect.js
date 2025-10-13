//=============================================================================
// SKM_EquipPartySelect.js
// 装備シーンにパーティウインドウを追加します。
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 装備シーンにパーティ選択ウィンドウを追加し、右側ウィンドウを下げます。
 * @author さかなのまえあし with GPT-5 Assistant
 * @url 
 * @help
 * 概要:
 *  装備シーン右側に「パーティ選択ウィンドウ」を追加し、クリック/タップで
 *  装備対象のアクターを切り替えられるようにします。PageUp/PageDown（L/R）
 *  にも追従してハイライトを更新します。追加ウィンドウの分だけ右側の
 *  コマンド/スロットウィンドウを下げ、MenuScenesResize などの横幅調整にも
 *  自動追従します。
 *
 * 表示:
 *  - 画像タイプ（imageType）で「顔グラ/キャラチップ」を切替可能。
 *  - 顔グラ(face): 通常は縮小フィット。windowLines=1 のときは目線中心の
 *    横長アップで表示（原則アップスケールなし）。1行時の顔幅上限は 144px。
 *  - キャラチップ(character): ウィンドウ高さいっぱいを使い、足元基準で
 *    中央寄せ表示。1行では表示が崩れます。
 *  - SVアクター(sv): SVバトラーの待機中央フレームを使用し、
 *    ウィンドウ高さいっぱい + 足元基準で中央寄せ表示します。
 *    名前表示ON時も余白を確保せず重なりを許容します（位置は固定）。
 *
 * スライド表示:
 *  - maxVisibleActors で同時表示人数を制限。
 *  - パーティ人数が上限を超える場合、左右にスライドガイド（◀ ▶）を表示。
 *    矢印クリックで「表示中のメンバーのみ」をスライドします（対象アクター
 *    は切り替えません）。
 *
 * 推奨配置:
 *  - レイアウト変更系（MenuScenesResize/NUUN_EquipStatusEX など）より後に配置。
 *
 * プラグインコマンド: なし
 *
 * パラメータ概要:
 *  - windowLines: 追加ウィンドウの高さ行数。
 *  - imageType: 顔グラ/キャラチップの切替。
 *  - maxVisibleActors: 同時表示人数の上限。
 *  - showNames: 名前の表示 ON/OFF。
 * 
 * @param windowLines
 * @text ウィンドウ行数
 * @type number
 * @min 1
 * @max 2
 * @default 2
 * @desc 何行分の高さにするか（行高×行数）
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
 * @default face
 * @desc ウィンドウ内に表示する画像の種類を選びます。
 * 
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
 */

(() => {
    'use strict';

    const pluginName = document.currentScript.src.match(/([^/\\]+)\.js$/)[1];
    const params = PluginManager.parameters(pluginName);
    const windowLines = Number(params.windowLines || 2);
    const imageType = String(params.imageType || 'face');
    const maxVisibleActors = Number(params.maxVisibleActors || 4);
    const showNames = params.showNames === 'true';

    //-------------------------------------------------------------------------
    // Window_EquipPartySelect
    //  パーティメンバーを横一列で表示する簡易選択ウィンドウ
    //-------------------------------------------------------------------------
    class Window_EquipPartySelect extends Window_Selectable {
        initialize(rect) {
            super.initialize(rect);
            this.activate(); // 活性/非活性に関わらず描画だけは行う
            this.deactivate(); // 初期は非アクティブ（入力は他ウィンドウ優先）
            this.openness = 255;
            this._visibleStartIndex = 0;
        }

        // Window_StatusBase の顔描画ユーティリティを委譲
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

        // SVアクター 1コマを中央下基準で描画（キャラチップテンプレートを流用）
        drawActorSv(actor, x, y) {
            const bitmap = ImageManager.loadSvActor(actor.battlerName());
            if (!bitmap.isReady()) {
                // ロード完了後に再描画（スライド時の空振り対策）
                bitmap.addLoadListener(() => {
                    if (this && this.contents) this.refresh();
                });
                return;
            }
            // MZのSVは 9列×6行（1コマは width/9, height/6）
            const pw = bitmap.width / 9;
            const ph = bitmap.height / 6;
            // 立ち（待機）の中央フレームを使用（列=4, 行=0）
            const sx = 4 * pw;
            const sy = 0 * ph;
            // キャラチップ同様、足元基準に配置
            this.contents.blt(bitmap, sx, sy, pw, ph, Math.round(x - pw / 2), Math.round(y - ph));
        }

        // 表示中の範囲の画像を事前ロード
        preloadVisibleAssets() {
            try {
                if (imageType === 'sv') {
                    const count = this.maxItems();
                    for (let i = 0; i < count; i++) {
                        const actor = this.actorAtDisplayIndex(i);
                        if (!actor) continue;
                        const bmp = ImageManager.loadSvActor(actor.battlerName());
                        if (!bmp.isReady()) {
                            bmp.addLoadListener(() => {
                                if (this && this.contents) this.refresh();
                            });
                        }
                    }
                }
            } catch (_) {
                // ignore
            }
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

        // フェイスを目線中心でクロップし、原則アップスケールしないで描画（横幅フィット＋縦位置調整）
        // 目的の描画サイズ(dw×dh)のアスペクトに合わせて、セル内のsrc領域を選びダウンスケール優先で描く
        drawActorFaceEyesFitNoUpscale(actor, dx, dy, dw, dh) {
            const bitmap = ImageManager.loadFace(actor.faceName());
            const index = actor.faceIndex();
            const cellW = ImageManager.faceWidth;
            const cellH = ImageManager.faceHeight;
            const cellX = (index % 4) * cellW;
            const cellY = Math.floor(index / 4) * cellH;
            const draw = () => {
                const aspect = Math.max(0.3, Math.min(3.0, dw / Math.max(1, dh)));
                // 原則アップスケールしない: srcWはできるだけdw以上（=縮小 or 等倍）にする
                let srcW = Math.min(cellW, Math.max(dw, 8));
                let srcH = Math.min(cellH, Math.max(dh, Math.round(srcW / aspect)));
                // アスペクトを維持しつつ、セル境界に収めるため微調整
                // 縦がはみ出る場合は縦基準に合わせ直す
                if (srcH > cellH) {
                    srcH = cellH;
                    srcW = Math.min(cellW, Math.max(8, Math.round(srcH * aspect)));
                }
                // 横がはみ出る場合は横基準に合わせ直す
                if (srcW > cellW) {
                    srcW = cellW;
                    srcH = Math.min(cellH, Math.max(8, Math.round(srcW / aspect)));
                }
                const eyeCenterRatioY = 0.42; // 目線高さ（0=上,1=下）
                const centerX = cellX + Math.floor(cellW / 2);
                const centerY = cellY + Math.floor(cellH * eyeCenterRatioY);
                let srcX = centerX - Math.floor(srcW / 2);
                let srcY = centerY - Math.floor(srcH / 2);
                // セル内に収まるようクランプ
                const minX = cellX;
                const minY = cellY;
                const maxX = cellX + cellW - srcW;
                const maxY = cellY + cellH - srcH;
                if (srcX < minX) srcX = minX; if (srcX > maxX) srcX = maxX;
                if (srcY < minY) srcY = minY; if (srcY > maxY) srcY = maxY;
                this.contents.blt(bitmap, srcX, srcY, srcW, srcH, dx, dy, dw, dh);
            };
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

        // スライドガイド（左右矢印）
        canSlide() {
            return $gameParty.members().length > Math.max(1, maxVisibleActors);
        }

        canSlideLeft() {
            return this.canSlide() && this._visibleStartIndex > 0;
        }

        canSlideRight() {
            const limit = Math.max(1, maxVisibleActors);
            return this.canSlide() && (this._visibleStartIndex + limit) < $gameParty.members().length;
        }

        slideLeft() {
            if (this.canSlideLeft()) {
                this._visibleStartIndex--;
                this.preloadVisibleAssets();
                this.refresh();
                SoundManager.playCursor();
            }
        }

        slideRight() {
            if (this.canSlideRight()) {
                this._visibleStartIndex++;
                this.preloadVisibleAssets();
                this.refresh();
                SoundManager.playCursor();
            }
        }

        leftArrowRect() {
            const w = this.itemPadding() + 28;
            const h = this.lineHeight();
            const x = 0;
            const y = Math.floor((this.innerHeight - h) / 2);
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
            this.drawSlideGuides();
        }

        drawSlideGuides() {
            if (!this.canSlide()) return;
            this.changeTextColor(ColorManager.systemColor());
            if (this.canSlideLeft()) {
                const r = this.leftArrowRect();
                this.drawText("\u25C0", r.x, r.y, r.width, 'left'); // ◀
            }
            if (this.canSlideRight()) {
                const r = this.rightArrowRect();
                this.drawText("\u25B6", r.x, r.y, r.width, 'right'); // ▶
            }
            this.resetTextColor();
        }

        tryHandleArrowTouch() {
            if (!TouchInput.isTriggered()) return false;
            // ウィンドウ内のタッチか判定
            if (!this.isTouchedInsideFrame()) return false;
            const touchPos = new Point(TouchInput.x, TouchInput.y);
            const localPos = this.worldTransform.applyInverse(touchPos);
            // contents座標へ変換
            const cx = this.origin.x + localPos.x - this.padding;
            const cy = this.origin.y + localPos.y - this.padding;
            const left = this.leftArrowRect();
            const right = this.rightArrowRect();
            if (this.canSlideLeft() && left.contains(cx, cy)) {
                this.slideLeft();
                return true;
            }
            if (this.canSlideRight() && right.contains(cx, cy)) {
                this.slideRight();
                return true;
            }
            return false;
        }

        maxCols() {
            return Math.max(1, this.maxItems());
        }

        itemHeight() {
                // 高さをウィンドウいっぱいに（itemRectでrowSpacingが引かれるため加算）
                return this.innerHeight + this.rowSpacing() - 4;

        }

        maxPageRows() {
            // 横並び1行で運用（キャラ/顔どちらでも）
            return 1;
        }

        // 余白を少し詰める
        spacing() {
            return 8;
        }

        drawItem(index) {
            const actor = this.actorAtDisplayIndex(index);
            if (!actor) return;
            const rect = this.itemRect(index);
            this.resetTextColor();

            if (imageType === 'character' || imageType === 'sv') {
                // ウィンドウ高さいっぱいを使い、中央寄せで足元を決める
                // SV表示時は名前と重なり許容のため余白を取らない
                const reserveForName = (imageType === 'sv') ? 0 : (showNames ? this.lineHeight() : 0);
                const usableHeight = rect.height - reserveForName;
                const centerX = rect.x + Math.floor(rect.width / 2);
                // フレーム未ロードも考慮して平均的な1コマ高さ 48 を基準、読めたら実値
                const ph = (() => {
                    if (imageType === 'sv') {
                        const b = ImageManager.loadSvActor(actor.battlerName());
                        return b.isReady() ? b.height / 6 : 64;
                    } else {
                        const b = ImageManager.loadCharacter(actor.characterName());
                        const big = ImageManager.isBigCharacter(actor.characterName());
                        return b.isReady() ? b.height / (big ? 4 : 8) : 48;
                    }
                })();
                if (imageType === 'sv' && showNames) {
                    // SV＋名前表示時は上基準（重なり最小化）: 上パディングを取り、トップ揃え
                    const topPad = 4;
                    const yTopAligned = rect.y + topPad + ph; // drawActorSvは足元基準→y=top+ph
                    this.drawActorSv(actor, centerX, yTopAligned);
                } else {
                    const half = Math.floor(ph / 2);
                    const centerY = rect.y + Math.floor(usableHeight / 2);
                    const footY = centerY + half;
                    const minFoot = rect.y + half + 2;
                    const maxFoot = rect.y + usableHeight - 2;
                    const y = Math.min(maxFoot, Math.max(minFoot, footY));
                    if (imageType === 'sv') {
                        this.drawActorSv(actor, centerX, y);
                    } else {
                        this.drawActorCharacter(actor, centerX, y);
                    }
                }
            } else {
                // フェイス画像
                const pad = 4;
                const reserveForName = 0; // 重なり許容
                const usableHeight = Math.max(1, rect.height - reserveForName);
                const availW = Math.max(1, rect.width - pad * 2);
                const availH = Math.max(1, usableHeight - pad * 2);
                const size = Math.max(1, Math.min(availW, availH));
                if (windowLines === 1) {
                    // 横長アップ：横幅優先（ただし1行時の最大幅は144に制限）し、目線中心でクロップ
                    const dw = Math.min(availW, ImageManager.faceWidth);
                    const targetAspectH = 9; // 任意: 16:9 の 9
                    const targetAspectW = 16; // 任意: 16:9 の 16
                    let dh = Math.floor(dw * targetAspectH / targetAspectW);
                    dh = Math.min(dh, availH); // 枠縦を超えない
                    const dx = rect.x + Math.floor((rect.width - dw) / 2);
                    const dy = rect.y + Math.floor((rect.height - dh) / 2);
                    this.drawActorFaceEyesFitNoUpscale(actor, dx, dy, dw, dh);
                } else {
                    const dx = rect.x + Math.floor((rect.width - size) / 2);
                    const dy = rect.y + pad; // 上寄せ
                    this.drawActorFaceScaled(actor, dx, dy, size);
                }
            }

            if (showNames) {
                const nameH = this.lineHeight();
                const nameY = rect.y + rect.height - nameH;
                this.changePaintOpacity(true);
                this.drawText(actor.name(), rect.x + 2, nameY, rect.width - 4, 'center');
            }

            // メニューアクターにはハイライト
            if (actor === $gameParty.menuActor()) {
                this.contents.paintOpacity = 64;
                this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, ColorManager.textColor(14));
                this.contents.paintOpacity = 255;
            }
        }

        // クリックされたアイテムのインデックスを取得（アクティブでなくても使用）
        hitIndex() {
            const touchPos = new Point(TouchInput.x, TouchInput.y);
            const localPos = this.worldTransform.applyInverse(touchPos);
            return super.hitTest(localPos.x, localPos.y);
        }
    }

    //-------------------------------------------------------------------------
    // Scene_Equip 拡張
    //-------------------------------------------------------------------------
    const _Scene_Equip_create = Scene_Equip.prototype.create;
    Scene_Equip.prototype.create = function() {
        _Scene_Equip_create.call(this);
        this.createEquipPartySelectWindow();
    };

    Scene_Equip.prototype.createEquipPartySelectWindow = function() {
        const rect = this.equipPartySelectWindowRect();
        this._equipPartyWindow = new Window_EquipPartySelect(rect);
        this.addWindow(this._equipPartyWindow);
        // 初期描画
        this._equipPartyWindow.updateVisibleStart();
        this._equipPartyWindow.refresh();
        // 顔グラ読み込み完了後に再描画（初回真っ白対策）
        let ready = 0;
        const members = $gameParty.members();
        if (members.length === 0) return;
        for (const actor of members) {
            const bmp = ImageManager.loadFace(actor.faceName());
            bmp.addLoadListener(() => {
                ready++;
                if (ready >= members.length && this._equipPartyWindow) {
                    this._equipPartyWindow.refresh();
                }
            });
        }
    };

    Scene_Equip.prototype.equipPartySelectWindowRect = function() {
        // 既存のコマンドウィンドウ矩形（他プラグインで調整済み）に追従して横幅・Xを合わせる
        const base = _Scene_Equip_commandWindowRect.call(this);
        const wx = base.x;
        const wy = this.mainAreaTop();
        const ww = base.width; // MenuScenesResize 等の幅調整を反映
        const wh = this.calcWindowHeight(windowLines, true);
        return new Rectangle(wx, wy, ww, wh);
    };

    // 既存の矩形計算に対して、パーティ選択ウィンドウの高さ分だけYをずらす
    const _Scene_Equip_commandWindowRect = Scene_Equip.prototype.commandWindowRect;
    Scene_Equip.prototype.commandWindowRect = function() {
        const rect = _Scene_Equip_commandWindowRect.call(this);
        const partyRect = this.equipPartySelectWindowRect();
        const offset = partyRect.height;
        rect.y += offset;
        return rect;
    };

    const _Scene_Equip_slotWindowRect = Scene_Equip.prototype.slotWindowRect;
    Scene_Equip.prototype.slotWindowRect = function() {
        const rect = _Scene_Equip_slotWindowRect.call(this);
        const offset = this.equipPartySelectWindowRect().height;
        //rect.y += offset;
        rect.height = Math.max(0, rect.height - offset);
        return rect;
    };

    // クリックで装備対象を切替（他ウィンドウがアクティブでも有効）
    const _Scene_Equip_update = Scene_Equip.prototype.update;
    Scene_Equip.prototype.update = function() {
        _Scene_Equip_update.call(this);
        // ページボタン/キーに合わせて新ウィンドウも追従
        if (this._lastMenuActorId !== ($gameParty.menuActor() && $gameParty.menuActor().actorId())) {
            this._lastMenuActorId = $gameParty.menuActor() && $gameParty.menuActor().actorId();
            if (this._equipPartyWindow) {
                this._equipPartyWindow.updateVisibleStart();
                this._equipPartyWindow.refresh();
            }
        }
        if (this._equipPartyWindow && TouchInput.isTriggered()) {
            const selectingItem = this._itemWindow && this._itemWindow.visible && this._itemWindow.active;
            // 矢印スライドは常に許可（表示調整のみで対象は変えない）
            if (this._equipPartyWindow.tryHandleArrowTouch()) {
                // handled
            } else if (!selectingItem) {
                // アイテム選択中でない場合のみアクター切替を許可
                const hit = this._equipPartyWindow.hitIndex();
                if (hit >= 0 && hit < $gameParty.members().length) {
                    const start = this._equipPartyWindow._visibleStartIndex || 0;
                    const actor = $gameParty.members()[start + hit];
                    if (actor && actor !== $gameParty.menuActor()) {
                        $gameParty.setMenuActor(actor);
                        this.updateActor();
                        this.refreshActor();
                        SoundManager.playCursor();
                        this._equipPartyWindow.updateVisibleStart();
                        this._equipPartyWindow.refresh();
                    }
                }
            }
        }
    };

    // 既存のアクター切替にフックして新ウィンドウも更新
    const _Scene_Equip_onActorChange = Scene_Equip.prototype.onActorChange;
    Scene_Equip.prototype.onActorChange = function() {
        if (_Scene_Equip_onActorChange) _Scene_Equip_onActorChange.call(this);
        if (this._equipPartyWindow) {
            this._equipPartyWindow.updateVisibleStart();
            this._equipPartyWindow.refresh();
        }
    };
})();


