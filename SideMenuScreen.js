//=============================================================================
// RPG Maker MZ - Side Menu Screen
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Side Menu Screen v1.0.0
 * @author Modified from Yoji Ojima's AltMenuScreen
 * @url
 * @help SideMenuScreen.js
 * @version 1.0.0
 *
 * @param menuPosition
 * @text Menu Position
 * @desc Choose menu command position
 * @type select
 * @option Left
 * @value left
 * @option Right
 * @value right
 * @default left
 *
 * @param maxActors
 * @text Max Actors Displayed
 * @desc Maximum number of actors to display
 * @type number
 * @min 1
 * @max 8
 * @default 4
 *
 * This plugin changes the layout of the menu screen.
 * Menu commands are displayed vertically on the left or right side,
 * and actor status is displayed in horizontal layout in the remaining space.
 * You can adjust the maximum number of actors displayed.
 *
 * It does not provide plugin commands.
 */

/*:ja
 * @target MZ
 * @plugindesc サイドメニュースクリーン v1.0.0
 * @author Modified from Yoji Ojima's AltMenuScreen
 * @url
 * @help SideMenuScreen.js
 * @version 1.0.0
 *
 * @param menuPosition
 * @text メニュー位置
 * @desc メニューコマンドの表示位置を選択
 * @type select
 * @option 左側
 * @value left
 * @option 右側
 * @value right
 * @default left
 *
 * @param maxActors
 * @text 最大表示人数
 * @desc 画面に表示する最大アクター数
 * @type number
 * @min 1
 * @max 8
 * @default 4
 *
 * @help
 * 
 * このプラグインは、メニュー画面のレイアウトを変更します。
 * メニューコマンドを左側または右側に縦に配置し、
 * アクターのステータスを横並びで残りのスペースに表示します。
 * 最大表示人数を調整して、表示するアクター数を変更できます。
 *
 * プラグインコマンドはありません。
 * 
 * このプラグインはAltMenuScreen.jsをベースにしています。
 * 
 * ライセンス、再配布等は使用許諾契約書 にある『第2条（弊社素材の取扱い）』にそうものとします
 */

(() => {
    'use strict';
    
    const pluginName = 'SideMenuScreen';
    const parameters = PluginManager.parameters(pluginName);
    const menuPosition = parameters['menuPosition'] || 'left';
    const maxActors = parseInt(parameters['maxActors']) || 4;

    // コマンドウィンドウの幅を設定
    const commandWindowWidth = 240;

    Scene_MenuBase.prototype.goldWindowHeight = function() {
        return this.calcWindowHeight(1, true);
    };

    Scene_Menu.prototype.commandWindowRect = function() {
        const ww = commandWindowWidth;
        const wh = this.mainAreaHeight() - this.goldWindowHeight();
        let wx = 0;
        
        if (menuPosition === 'right') {
            wx = Graphics.boxWidth - ww;
        }
        
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Menu.prototype.goldWindowRect = function() {
        const ww = commandWindowWidth;
        const wh = this.goldWindowHeight();
        let wx = 0;
        
        if (menuPosition === 'right') {
            wx = Graphics.boxWidth - ww;
        }
        
        const wy = this.mainAreaBottom() - wh;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Menu.prototype.statusWindowRect = function() {
        const commandWidth = commandWindowWidth;
        const ww = Graphics.boxWidth - commandWidth;
        const wh = this.mainAreaHeight();
        let wx = commandWidth;
        
        if (menuPosition === 'right') {
            wx = 0;
        }
        
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_ItemBase.prototype.actorWindowRect = function() {
        return Scene_Menu.prototype.statusWindowRect.call(this);
    };

    Window_MenuCommand.prototype.maxCols = function() {
        return 1; // 縦一列表示
    };

    Window_MenuCommand.prototype.numVisibleRows = function() {
        return Math.ceil(this.maxItems() / this.maxCols());
    };

    Window_MenuStatus.prototype.maxCols = function() {
        return maxActors; // パラメータで設定された最大表示人数
    };

    Window_MenuStatus.prototype.numVisibleRows = function() {
        return 1; // 1行のみ表示
    };

    // 拡大縮小対応の顔グラフィック描画メソッド（SKM_MenuItemWindowから流用）
    Window_MenuStatus.prototype.drawFaceScaled = function(
        faceName, faceIndex, x, y, width, height, resizeWidth, resizeHeight
    ) {
        width = width || ImageManager.faceWidth;
        height = height || ImageManager.faceHeight;
        resizeWidth = resizeWidth || width;
        resizeHeight = resizeHeight || height;
        
        const bitmap = ImageManager.loadFace(faceName);
        const pw = ImageManager.faceWidth;
        const ph = ImageManager.faceHeight;
        const sw = Math.min(width, pw);
        const sh = Math.min(height, ph);
        const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
        const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
        const sx = (faceIndex % 4) * pw + (pw - sw) / 2;
        const sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
        
        this.contents.blt(
            bitmap, sx, sy, sw, sh, dx, dy, resizeWidth, resizeHeight
        );
    };

    Window_MenuStatus.prototype.drawItemImage = function(index) {
        const actor = this.actor(index);
        const rect = this.itemRectWithPadding(index);
        const lineHeight = this.lineHeight();
        
        // 顔画像用の利用可能な領域を計算（パディング・マージンを考慮）
        const availableWidth = rect.width;
        const faceAreaHeight = rect.height - lineHeight * 2; // 名前・レベル分を除く
        
        // 顔画像のサイズを最大幅に合わせて計算（正方形を維持）
        const faceSize = Math.min(availableWidth, faceAreaHeight);
        
        // 顔画像の配置座標（元の表示原点を維持）
        const faceX = rect.x;
        const faceY = rect.y + lineHeight * 2;
        
        this.changePaintOpacity(actor.isBattleMember());
        this.drawFaceScaled(
            actor._faceName, 
            actor._faceIndex, 
            faceX, 
            faceY, 
            ImageManager.faceWidth, 
            ImageManager.faceHeight, 
            faceSize, 
            faceSize
        );
        this.changePaintOpacity(true);
    };

    Window_MenuStatus.prototype.drawItemStatus = function(index) {
        const actor = this.actor(index);
        const rect = this.itemRectWithPadding(index);
        const x = rect.x;
        const y = rect.y;
        const width = rect.width;
        const bottom = y + rect.height;
        const lineHeight = this.lineHeight();
        this.drawActorName(actor, x, y + lineHeight * 0, width);
        this.drawActorLevel(actor, x, y + lineHeight * 1, width);
        this.drawActorClass(actor, x, bottom - lineHeight * 4, width);
        this.placeBasicGauges(actor, x, bottom - lineHeight * 3, width);
        this.drawActorIcons(actor, x, bottom - lineHeight * 1, width);
    };
})();
