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
 * @param centerFaceY
 * @text Face Y Position
 * @desc Center face vertically between other items (ON) or align to top (OFF)
 * @type boolean
 * @on Center
 * @off Top
 * @default false
 *
 * @param maxActors
 * @text Max Actors Displayed
 * @desc Maximum number of actors to display
 * @type number
 * @min 1
 * @max 8
 * @default 4
 *
 * @param Statepos
 * @text State Position
 * @desc Choose the position to display states
 * @type select
 * @option Top
 * @value top
 * @option Bottom
 * @value bottom
 * @default bottom
 * 
 * 
 * 
 * 
 * @param imageType
 * @text Image Type
 * @desc Choose the type of image to display for actors
 * @type select
 * @option Face
 * @value face
 * @option Custom Image
 * @value custom
 * @default face
 *
 * @param actorImages
 * @text Actor Custom Images
 * @desc Set custom images for each actor (only used when Image Type is Custom Image)
 * @type struct<ActorImage>[]
 * @default []
 *
 * @param showExtraWindow
 * @text Show Extra Window
 * @desc Show extra window below status window
 * @type boolean
 * @on Show
 * @off Hide
 * @default false
 *
 *
 * @param extraWindowTextList
 * @text Extra Window Text List
 * @desc List of text to display in extra window
 * @type struct<ExtraText>[]
 * @default []
 *
 * This plugin changes the layout of the menu screen.
 * Menu commands are displayed vertically on the left or right side,
 * and actor status is displayed in horizontal layout in the remaining space.
 * You can adjust the maximum number of actors displayed.
 *
 * It does not provide plugin commands.
 */

/*~struct~ExtraText:
 * @param displayType
 * @text Display Type
 * @desc Type of content to display
 * @type select
 * @option Free Text
 * @value freetext
 * @option Current Location
 * @value location
 * @option Play Time
 * @value playtime
 * @default freetext
 *
 * @param title
 * @text Title
 * @desc Title text (displayed in system color)
 * @type string
 * @default
 *
 * @param text
 * @text Text
 * @desc Text to display (for Free Text type). Supports control characters like \V[x]
 * @type string
 * @default
 *
 * @param textAlign
 * @text Text Align
 * @desc Text alignment
 * @type select
 * @option Left
 * @value left
 * @option Right
 * @value right
 * @default left
 *
 * @param lineNumber
 * @text Line Number
 * @desc Line number to display (1 = first line)
 * @type number
 * @min 1
 * @max 10
 * @default 1
 *
 * @param offsetX
 * @text Offset X
 * @desc Horizontal offset (+ right, - left)
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @param offsetY
 * @text Offset Y
 * @desc Vertical offset (+ down, - up)
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @param width
 * @text Width
 * @desc Display width (0 = auto)
 * @type number
 * @min 0
 * @max 9999
 * @default 0
 */

/*~struct~ActorImage:
 * @param actorId
 * @text Actor ID
 * @desc The ID of the actor
 * @type actor
 * @default 1
 *
 * @param imageName
 * @text Image File Name
 * @desc The image file name (from img/pictures/)
 * @type file
 * @dir img/pictures
 * @default
 *
 * @param sizeMode
 * @text Size Mode
 * @desc How to display the custom image
 * @type select
 * @option Face Size (default)
 * @value face
 * @option Full Width
 * @value width
 * @option Full Height
 * @value height
 * @default face
 *
 * @param offsetX
 * @text Offset X
 * @desc Horizontal offset for image position (+ right, - left)
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @param offsetY
 * @text Offset Y
 * @desc Vertical offset for image position (+ down, - up)
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
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
 * @param centerFaceY
 * @text 顔Y座標の配置
 * @desc 顔画像を「他の表示物の中間」に縦中央揃え(ON)／従来の上寄せ(OFF)
 * @type boolean
 * @on 中央
 * @off 上寄せ
 * @default false
 *
 * @param maxActors
 * @text 最大表示人数
 * @desc 画面に表示する最大アクター数
 * @type number
 * @min 1
 * @max 8
 * @default 4
 *
 * 
 * @param Statepos
 * @text ステートの表示ポジション
 * @desc ステートを表示する位置を選択
 * @type select
 * @option 上
 * @value top
 * @option 下
 * @value bottom
 * @default bottom
 * 
 * 
 * @param imageType
 * @text 画像タイプ
 * @desc アクターに表示する画像のタイプを選択
 * @type select
 * @option 顔画像
 * @value face
 * @option カスタム画像
 * @value custom
 * @default face
 *
 * @param actorImages
 * @text アクターカスタム画像
 * @desc 各アクターのカスタム画像を設定（画像タイプが「カスタム画像」の場合のみ使用）
 * @type struct<ActorImage>[]
 * @default []
 *
 * @param showExtraWindow
 * @text 追加ウィンドウ表示
 * @desc ステータスウィンドウの下に追加ウィンドウを表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 *
 *
 * @param extraWindowTextList
 * @text 追加ウィンドウテキストリスト
 * @desc 追加ウィンドウに表示するテキストのリスト
 * @type struct<ExtraText>[]
 * @default []
 *
 * @help
 * 
 * このプラグインは、メニュー画面のレイアウトを変更します。
 * メニューコマンドを左側または右側に縦に配置し、
 * アクターのステータスを横並びで残りのスペースに表示します。
 * 最大表示人数を調整して、表示するアクター数を変更できます。
 *
 * 画像タイプ設定：
 * 「顔画像」：デフォルトの顔グラフィックを表示
 * 「カスタム画像」：指定したカスタム画像（img/pictures/）を表示
 *
 * 追加ウィンドウ：
 * ステータスウィンドウの下に追加のウィンドウを表示できます。
 * 高さ（行数）とテキストをプラグインパラメータで設定できます。
 *
 * プラグインコマンドはありません。
 * 
 * このプラグインはデフォルトプラグインであるYoji Ojima さんの AltMenuScreen.jsをベースにしています。
 * 
 * ライセンス、再配布等は使用許諾契約書 にある『第2条（弊社素材の取扱い）』にそうものとします
 */

/*~struct~ExtraText:ja
 * @param displayType
 * @text 表示タイプ
 * @desc 表示するコンテンツのタイプ
 * @type select
 * @option フリーテキスト
 * @value freetext
 * @option 現在地
 * @value location
 * @option プレイ時間
 * @value playtime
 * @default freetext
 *
 * @param title
 * @text タイトル
 * @desc タイトルテキスト（システムカラーで表示）
 * @type string
 * @default
 *
 * @param text
 * @text テキスト
 * @desc 表示するテキスト（フリーテキストタイプ用）。制御文字（\V[x]など）使用可能
 * @type string
 * @default
 *
 * @param textAlign
 * @text テキスト配置
 * @desc テキストの配置方法
 * @type select
 * @option 左寄せ
 * @value left
 * @option 右寄せ
 * @value right
 * @default left
 *
 * @param lineNumber
 * @text 行番号
 * @desc 表示する行番号（1 = 1行目）
 * @type number
 * @min 1
 * @max 10
 * @default 1
 *
 * @param offsetX
 * @text オフセットX
 * @desc 横方向のオフセット（＋で右、－で左）
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @param offsetY
 * @text オフセットY
 * @desc 縦方向のオフセット（＋で下、－で上）
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @param width
 * @text 表示幅
 * @desc 表示幅（0 = 自動）
 * @type number
 * @min 0
 * @max 9999
 * @default 0
 */

/*~struct~ActorImage:ja
 * @param actorId
 * @text アクターID
 * @desc アクターのID
 * @type actor
 * @default 1
 *
 * @param imageName
 * @text 画像ファイル名
 * @desc 画像ファイル名（img/pictures/フォルダから）
 * @type file
 * @dir img/pictures
 * @default
 *
 * @param sizeMode
 * @text サイズモード
 * @desc カスタム画像の表示方法
 * @type select
 * @option 顔画像サイズ（デフォルト）
 * @value face
 * @option 横幅いっぱい
 * @value width
 * @option 縦幅いっぱい
 * @value height
 * @default face
 *
 * @param offsetX
 * @text オフセットX
 * @desc 画像の横方向の位置調整（＋で右、－で左）
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @param offsetY
 * @text オフセットY
 * @desc 画像の縦方向の位置調整（＋で下、－で上）
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 */

(() => {
    'use strict';
    
    const pluginName = 'SideMenuScreen';
    const parameters = PluginManager.parameters(pluginName);
    const menuPosition = parameters['menuPosition'] || 'left';
    const centerFaceY = parameters['centerFaceY'] === 'true';
    const maxActors = parseInt(parameters['maxActors']) || 4;
    const statepos = (parameters['Statepos'] || 'bottom') === 'bottom';


    
    const imageType = parameters['imageType'] || 'face';
    const showExtraWindow = parameters['showExtraWindow'] === 'true';
    
    // 追加ウィンドウテキストリストの解析
    const extraWindowTextListParam = parameters['extraWindowTextList'] || '[]';
    const extraWindowTextListData = JSON.parse(extraWindowTextListParam);
    const extraWindowTextList = [];
    
    for (const data of extraWindowTextListData) {
        const parsed = JSON.parse(data);
        extraWindowTextList.push({
            displayType: parsed.displayType || 'freetext',
            title: parsed.title || '',
            text: parsed.text || '',
            textAlign: parsed.textAlign || 'left',
            lineNumber: parseInt(parsed.lineNumber) || 1,
            offsetX: parseInt(parsed.offsetX) || 0,
            offsetY: parseInt(parsed.offsetY) || 0,
            width: parseInt(parsed.width) || 0
        });
    }
    
    // アクターカスタム画像リストの解析
    const actorImagesParam = parameters['actorImages'] || '[]';
    const actorImagesData = JSON.parse(actorImagesParam);
    const actorImages = {};
    
    for (const data of actorImagesData) {
        const parsed = JSON.parse(data);
        const actorId = parseInt(parsed.actorId);
        const imageName = parsed.imageName;
        const sizeMode = parsed.sizeMode || 'face';
        const offsetX = parseInt(parsed.offsetX) || 0;
        const offsetY = parseInt(parsed.offsetY) || 0;
        if (actorId && imageName) {
            actorImages[actorId] = {
                name: imageName,
                sizeMode: sizeMode,
                offsetX: offsetX,
                offsetY: offsetY
            };
        }
    }

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
        let wh = this.mainAreaHeight();
        
        // 追加ウィンドウを表示する場合は高さを調整
        if (showExtraWindow) {
            const extraWh = this.getExtraWindowHeight();
            wh -= extraWh;
        }
        
        let wx = commandWidth;
        
        if (menuPosition === 'right') {
            wx = 0;
        }
        
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };
    
    Scene_Menu.prototype.getExtraWindowHeight = function() {

            // ヘルプウィンドウスタイル：2行、枠なし
            return this.calcWindowHeight(2, false);

    };
    
    Scene_Menu.prototype.extraWindowRect = function() {
        const commandWidth = commandWindowWidth;
        const ww = Graphics.boxWidth - commandWidth;
        const wh = this.getExtraWindowHeight();
        let wx = commandWidth;
        
        if (menuPosition === 'right') {
            wx = 0;
        }
        
        const statusHeight = this.mainAreaHeight() - wh;
        const wy = this.mainAreaTop() + statusHeight;
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
        const actorImageData = actorImages[actor.actorId()];
        
        // サイズモードを取得（カスタム画像の場合のみ）
        const sizeMode = (imageType === 'custom' && actorImageData) ? actorImageData.sizeMode : 'face';
        
        // サイズモードに応じて画像領域を計算
        let imageX, imageY, imageWidth, imageHeight;
        
        if (sizeMode === 'width') {
            // 横幅いっぱい
            imageX = rect.x;
            imageY = rect.y;
            imageWidth = rect.width;
            imageHeight = rect.height;
        } else if (sizeMode === 'height') {
            // 縦幅いっぱい
            imageX = rect.x;
            imageY = rect.y;
            imageWidth = rect.width;
            imageHeight = rect.height;
        } else {
            // 顔画像サイズ（デフォルト）
            const availableWidth = rect.width;
            const topReserved = lineHeight * 2; // 上部（名前・レベル）
            const bottomReserved = lineHeight * 4; // 下部（職業・ゲージ・アイコン）
            let imageAreaHeight = rect.height - topReserved - bottomReserved;
            if (imageAreaHeight <= 0) {
                imageAreaHeight = rect.height - topReserved;
            }
            
            const imageSize = Math.min(availableWidth, imageAreaHeight);
            imageX = rect.x;
            imageY = rect.y + topReserved;
            if (centerFaceY) {
                const offsetY = Math.floor((imageAreaHeight - imageSize) / 2);
                if (offsetY > 0) imageY += offsetY;
            }
            imageWidth = imageSize;
            imageHeight = imageSize;
        }
        
        this.changePaintOpacity(actor.isBattleMember());
        
        // 画像タイプに応じて描画
        if (imageType === 'custom' && actorImageData) {
            // カスタム画像を描画（オフセット値を適用）
            this.drawCustomImage(
                actorImageData.name,
                imageX + actorImageData.offsetX,
                imageY + actorImageData.offsetY,
                imageWidth,
                imageHeight,
                sizeMode
            );
        } else {
            // 顔画像を描画
            this.drawFaceScaled(
                actor._faceName, 
                actor._faceIndex, 
                imageX, 
                imageY, 
                ImageManager.faceWidth, 
                ImageManager.faceHeight, 
                imageWidth, 
                imageHeight
            );
        }
        
        this.changePaintOpacity(true);
    };
    
    // カスタム画像描画メソッド
    Window_MenuStatus.prototype.drawCustomImage = function(imageName, x, y, width, height, sizeMode) {
        const bitmap = ImageManager.loadPicture(imageName);
        const sw = bitmap.width;
        const sh = bitmap.height;
        
        let dw, dh, dx, dy;
        const aspectRatio = sw / sh;
        
        if (sizeMode === 'width') {
            // 横幅基準：横幅いっぱいに表示
            dw = width;
            dh = width / aspectRatio;
            dx = x;
            dy = y + (height - dh) / 2; // 縦方向は中央配置
        } else if (sizeMode === 'height') {
            // 縦幅基準：縦幅いっぱいに表示
            dh = height;
            dw = height * aspectRatio;
            dx = x + (width - dw) / 2; // 横方向は中央配置
            dy = y;
        } else {
            // デフォルト：アスペクト比を維持しながら指定サイズに収める
            dw = width;
            dh = height;
            
            if (aspectRatio > 1) {
                // 横長の画像
                dh = width / aspectRatio;
                if (dh > height) {
                    dh = height;
                    dw = height * aspectRatio;
                }
            } else {
                // 縦長または正方形の画像
                dw = height * aspectRatio;
                if (dw > width) {
                    dw = width;
                    dh = width / aspectRatio;
                }
            }
            
            // 中央配置
            dx = x + (width - dw) / 2;
            dy = y + (height - dh) / 2;
        }
        
        this.contents.blt(bitmap, 0, 0, sw, sh, dx, dy, dw, dh);
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
        if(!statepos) this.drawActorIcons(actor, x, y + lineHeight * 2, width);
        this.drawActorClass(actor, x, bottom - lineHeight * 4, width);
        this.placeBasicGauges(actor, x, bottom - lineHeight * 3, width);
        if(statepos) this.drawActorIcons(actor, x, bottom - lineHeight * 1, width);
    };

    // 幅指定対応：ゲージ幅を rect.width に合わせて拡張
    Window_MenuStatus.prototype.placeBasicGauges = function(actor, x, y, width) {
        this._placeGaugeEx(actor, "hp", x, y, width);
        this._placeGaugeEx(actor, "mp", x, y + this.gaugeLineHeight(), width);
        if ($dataSystem.optDisplayTp) {
            this._placeGaugeEx(actor, "tp", x, y + this.gaugeLineHeight() * 2, width);
        }
    };

    Window_MenuStatus.prototype._placeGaugeEx = function(actor, type, x, y, width) {
        const key = "actor%1-gauge-%2".format(actor.actorId(), type);
        const sprite = this.createInnerSprite(key, Sprite_Gauge);
        // ゲージのビットマップ幅をインスタンス単位で先に上書きしてから再生成
        sprite.bitmapWidth = function() { return width; };
        sprite.createBitmap();
        sprite.setup(actor, type);
        sprite.move(x, y);
        sprite.show();
        // セットアップ直後に再描画を明示（ページ切替直後の空白対策）
        if (typeof sprite.redraw === 'function') {
            sprite.redraw();
        }
    };

    //-----------------------------------------------------------------------------
    // Window_MenuExtra
    // 追加ウィンドウ

    function Window_MenuExtra() {
        this.initialize(...arguments);
    }

    Window_MenuExtra.prototype = Object.create(Window_Base.prototype);
    Window_MenuExtra.prototype.constructor = Window_MenuExtra;

    Window_MenuExtra.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this.refresh();
    };

    Window_MenuExtra.prototype.refresh = function() {
        this.contents.clear();
        
        // リストが空の場合は何も表示しない
        if (extraWindowTextList.length === 0) {
            return;
        }
        
        const lineHeight = this.lineHeight();
        
        // ヘルプウィンドウスタイルの場合

            // 各テキストを描画（垂直中央配置なし、ヘルプウィンドウと同じ配置）
            for (const textData of extraWindowTextList) {
                const baseY = (textData.lineNumber - 1) * lineHeight;
                const x = textData.offsetX;
                const y = baseY + textData.offsetY;
                const width = textData.width > 0 ? textData.width : this.contentsWidth();
                
                // 表示タイプに応じて描画
                if (textData.displayType === 'location') {
                    this.drawCurrentLocation(x, y, width, textData);
                } else if (textData.displayType === 'playtime') {
                    this.drawPlayTime(x, y, width, textData);
                } else {
                    this.drawFreeText(x, y, width, textData);
                }
            }

    };
    
    Window_MenuExtra.prototype.drawFreeText = function(x, y, width, textData) {
        let currentX = x;
        
        // タイトルを描画（システムカラー）
        if (textData.title) {
            const convertedTitle = this.convertEscapeCharacters(textData.title);
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(convertedTitle, currentX, y, width, 'left');
            // タイトルの幅を測定して次の開始位置を計算
            const titleWidth = this.textWidth(convertedTitle);
            currentX += titleWidth;
            this.resetTextColor();
        }
        
        // テキストを描画（配置オプションに従う）
        if (textData.text) {
            const convertedText = this.convertEscapeCharacters(textData.text);
            if (textData.textAlign === 'right') {
                // 右寄せの場合は指定幅に合わせて配置
                const textWidth = width - (currentX - x);
                this.drawText(convertedText, currentX, y, textWidth, 'right');
            } else {
                // 左寄せ（タイトルの直後から）
                this.drawText(convertedText, currentX, y, width - (currentX - x), 'left');
            }
        }
    };
    
    Window_MenuExtra.prototype.drawCurrentLocation = function(x, y, width, textData) {
        // 現在地の取得
        const mapId = $gameMap.mapId();
        const mapName = $dataMapInfos[mapId] ? $dataMapInfos[mapId].name : '';
        
        let currentX = x;
        
        // タイトルを描画（システムカラー）
        // タイトルが設定されていない場合はデフォルトで「現在地：」を表示
        const displayTitle = textData.title || '現在地：';
        const convertedTitle = this.convertEscapeCharacters(displayTitle);
        
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(convertedTitle, currentX, y, width, 'left');
        const titleWidth = this.textWidth(convertedTitle);
        currentX += titleWidth;
        this.resetTextColor();
        
        // 現在地を表示
        if (mapName) {
            if (textData.textAlign === 'right') {
                // 右寄せの場合は指定幅に合わせて配置
                const textWidth = width - (currentX - x);
                this.drawText(mapName, currentX, y, textWidth, 'right');
            } else {
                // 左寄せ（タイトルの直後から）
                this.drawText(mapName, currentX, y, width - (currentX - x), 'left');
            }
        }
    };
    
    Window_MenuExtra.prototype.drawPlayTime = function(x, y, width, textData) {
        // プレイ時間の取得
        const playTime = $gameSystem.playtimeText();
        
        let currentX = x;
        
        // タイトルを描画（システムカラー）
        // タイトルが設定されていない場合はデフォルトで「プレイ時間：」を表示
        const displayTitle = textData.title || 'プレイ時間：';
        const convertedTitle = this.convertEscapeCharacters(displayTitle);
        
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(convertedTitle, currentX, y, width, 'left');
        const titleWidth = this.textWidth(convertedTitle);
        currentX += titleWidth;
        this.resetTextColor();
        
        // プレイ時間を表示
        if (playTime) {
            if (textData.textAlign === 'right') {
                // 右寄せの場合は指定幅に合わせて配置
                const textWidth = width - (currentX - x);
                this.drawText(playTime, currentX, y, textWidth, 'right');
            } else {
                // 左寄せ（タイトルの直後から）
                this.drawText(playTime, currentX, y, width - (currentX - x), 'left');
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Menu
    // 追加ウィンドウの作成処理

    const _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        _Scene_Menu_create.call(this);
        if (showExtraWindow) {
            this.createExtraWindow();
        }
    };

    Scene_Menu.prototype.createExtraWindow = function() {
        const rect = this.extraWindowRect();
        this._extraWindow = new Window_MenuExtra(rect);
        this.addWindow(this._extraWindow);
    };
})();
