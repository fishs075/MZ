/*:
 * @target MZ
 * @plugindesc アクターカードスタイル
 * @author Your Name
 * @version 1.1.0
 * 
 * @help
 * アクターのメニュー表示をカスタマイズするプラグインです。
 * 背景色とパターンを組み合わせて、キャラクターごとに個性的な
 * カードスタイルを作成できます。
 * 
 * ■ 主な機能
 * 1. 背景色の設定
 *    - プリセットカラーから選択（11色）
 *    - カスタムカラーでRGB指定
 *    - 濃さの調整（薄い/普通/濃い）
 * 
 * 2. 背景パターン
 *    直線系:
 *    - 縦線/縦線（太）
 *    - 横線/横線（太）
 *    - 格子
 *    - 斜め格子
 * 
 *    幾何学模様:
 *    - 市松模様
 *    - 水玉
 *    - ジグザグ
 *    - 千鳥格子
 * 
 *    装飾系:
 *    - ハニカム（線/塗）
 *    - ハート
 * 
 * 3. カード枠機能
 *    - 枠線の表示/非表示
 *    - 枠色をカスタマイズ可能
 *    - 線の太さを調整可能
 *    - 高解像度向け機能
 * 
 * 4. フィルター機能
 *    - カスタムカラーによるフィルター効果
 *    - 背景全体に色調を追加
 * 
 * ■ 使用方法
 * 1. プラグインパラメータでアクターごとの設定を行います
 * 2. 背景色とパターンの組み合わせを設定
 * 3. 必要に応じてカスタムカラーを定義
 * 4. カード枠の有無や色を設定
 * 5. フィルター効果の設定
 * 
 * ■ カスタムカラーの設定
 * 1. カラー名を設定（例：custom1）
 * 2. RGB値をそれぞれ0-255で指定
 * 3. 濃さを0-1.0で指定
 * 
 * ■ 選択エフェクト
 * - 通常選択、アイテム選択、全体選択時に統一された視覚効果
 * - 白色グラデーションによる強調表示
 * - 高い視認性と操作感の向上
 * 
 * ■ 注意事項
 * - カスタムカラーは背景色、パターン色、カード枠、フィルターで使用可能
 * - カード枠は高解像度環境での使用を推奨
 * - カード枠は濃さを無視し不透明度255
 * - フィルターは最大濃さでも透けてかかる
 * 
 * ■ 更新履歴
 * 1.1.0 - 2024/02/XX
 * - カード枠機能を追加
 * - フィルター機能を追加
 * - 選択エフェクトを改善
 * - パターンの追加と改善
 * 
 * 1.0.0 - 2024/02/17
 * - 初回リリース
 * 
 * @param DefaultBackgroundColor
 * @text デフォルト背景色
 * @desc デフォルトの背景色をrgba形式で指定します
 * @default rgba(0, 0, 0, 0.5)
 * @type string
 *
 * @param CustomColors
 * @text カスタムカラー設定
 * @desc カスタムカラーのリストを設定します。
 * @type struct<CustomColor>[]
 * @default []
 *
 * @param ActorColors
 * @text アクター背景色設定
 * @type struct<ActorColor>[]
 * @desc アクターごとの背景色設定
 * @default []
 *
 */

/*~struct~ActorColor:
 * @param ActorId
 * @text アクターID
 * @type actor
 * @desc 背景色を設定するアクター
 *
 * @param Color
 * @text 背景色
 * @type select
 * @option ホワイト（白）
 * @value white
 * @option レッド（赤）
 * @value red
 * @option ブルー（青）
 * @value blue
 * @option イエロー（黄）
 * @value yellow
 * @option グリーン（緑）
 * @value green
 * @option ピンク（桃）
 * @value pink
 * @option ブラック（黒）
 * @value black
 * @option パープル（紫）
 * @value purple
 * @option オレンジ（橙）
 * @value orange
 * @option ターコイズ（青緑）
 * @value turquoise
 * @option ブラウン（茶）
 * @value brown
 * @option カスタム
 * @value custom
 * @default black
 *
 * @param ColorDensity
 * @text 背景色の濃さ
 * @type select
 * @option 薄い
 * @value light
 * @option 普通
 * @value normal
 * @option 濃い
 * @value dark
 * @default normal
 *
 * @param CustomColorName
 * @text 背景カスタムカラー名
 * @desc 背景色をカスタムカラーにした時、使用するカスタムカラーの名前
 * @type string
 * @default custom1
 *
 * @param PatternColor
 * @text パターン色
 * @type select
 * @option ホワイト（白）
 * @value white
 * @option レッド（赤）
 * @value red
 * @option ブルー（青）
 * @value blue
 * @option イエロー（黄）
 * @value yellow
 * @option グリーン（緑）
 * @value green
 * @option ピンク（桃）
 * @value pink
 * @option ブラック（黒）
 * @value black
 * @option パープル（紫）
 * @value purple
 * @option オレンジ（橙）
 * @value orange
 * @option ターコイズ（青緑）
 * @value turquoise
 * @option ブラウン（茶）
 * @value brown
 * @option カスタム
 * @value custom
 * @default white
 *
 * @param PatternDensity
 * @text パターン色の濃さ
 * @type select
 * @option 薄い
 * @value light
 * @option 普通
 * @value normal
 * @option 濃い
 * @value dark
 * @default normal
 * 
 * @param PatternCustomColorName
 * @text パターンカスタムカラー名
 * @desc パターン色をカスタムカラーにした時、使用するカスタムカラーの名前
 * @type string
 * @default custom1
 *
 * @param Pattern
 * @text 背景パターン
 * @type select
 * @option なし
 * @value none
 * @option 縦線
 * @value stripeV
 * @option 縦線（太）
 * @value stripeVBold
 * @option 横線
 * @value stripeH
 * @option 横線（太）
 * @value stripeHBold
 * @option 格子
 * @value grid
 * @option 斜め格子
 * @value gridDiagonal
 * @option 市松模様
 * @value checkered
 * @option 水玉
 * @value polkaDot
 * @option ジグザグ
 * @value zigzag
 * @option 千鳥格子
 * @value houndstooth
 * @option ハニカム
 * @value honeycomb
 * @option ハニカム（塗）
 * @value honeycombFill
 * @option ハート
 * @value hearts
 * @default none
 *
 * @param ShowCardBorder
 * @text カード枠表示
 * @desc アクターカードに枠線を表示するかどうか（高解像度向け機能）
 * @type boolean
 * @default false
 * 
 * @param CardBorderColor
 * @text カード枠の色
 * @type select
 * @option ホワイト（白）
 * @value white
 * @option レッド（赤）
 * @value red
 * @option ブルー（青）
 * @value blue
 * @option イエロー（黄）
 * @value yellow
 * @option グリーン（緑）
 * @value green
 * @option ピンク（桃）
 * @value pink
 * @option ブラック（黒）
 * @value black
 * @option パープル（紫）
 * @value purple
 * @option オレンジ（橙）
 * @value orange
 * @option ターコイズ（水）
 * @value turquoise
 * @option ブラウン（茶）
 * @value brown
 * @option カスタム
 * @value custom
 * @default white
 * @parent ShowCardBorder
 * 
 * @param CardBorderCustomColorName
 * @text カード枠カスタムカラー名
 * @desc カード枠をカスタムカラーにした時、使用するカスタムカラーの名前
 * @type string
 * @default custom1
 * @parent ShowCardBorder
 * 
 * @param CardBorderWidth
 * @text カード枠の太さ
 * @desc カード枠を表示する場合の線の太さ（ピクセル）
 * @type number
 * @min 1
 * @max 12
 * @default 8
 * @parent ShowCardBorder
 *
 * @param UseColorFilter
 * @text フィルターを使用
 * @desc アクターカードにカラーフィルターを適用するかどうか
 * @type boolean
 * @default false
 * 
 * @param FilterCustomColorName
 * @text フィルターカラー名
 * @desc フィルターとして使用するカスタムカラーの名前
 * @type string
 * @default
 * @parent UseColorFilter
 */

/*~struct~CustomColor:
 * @param ColorName
 * @text カラー名
 * @desc カスタムカラーの識別名
 * @type string
 * @default custom1
 * 
 * @param Red
 * @text 赤(R)
 * @desc 赤色の強さ (0-255)
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 * @param Green
 * @text 緑(G)
 * @desc 緑色の強さ (0-255)
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 * @param Blue
 * @text 青(B)
 * @desc 青色の強さ (0-255)
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 * @param Density
 * @text 濃さ
 * @desc カラーの濃さ (0.0-1.0)
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 0.5
 */

(() => {
    'use strict';
    
    // ImageManagerに不足しているプロパティを追加（プラグイン内でのみ有効）
    if (!Object.getOwnPropertyDescriptor(ImageManager, 'faceWidth')) {
        Object.defineProperty(ImageManager, 'faceWidth', {
            get: function() {
                return this.standardFaceWidth;
            },
            configurable: true
        });
    }
    if (!Object.getOwnPropertyDescriptor(ImageManager, 'faceHeight')) {
        Object.defineProperty(ImageManager, 'faceHeight', {
            get: function() {
                return this.standardFaceHeight;
            },
            configurable: true
        });
    }

    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    const parameters = PluginManager.parameters(pluginName);
    const defaultBgColor = parameters['DefaultBackgroundColor'] || 'rgba(0, 0, 0, 0.5)';
    
    // アクターカラー設定を解析
    const actorColors = new Map();
    try {
        const colorSettings = JSON.parse(parameters['ActorColors'] || '[]');
        colorSettings.forEach(settingJson => {
            const setting = JSON.parse(settingJson);
            actorColors.set(Number(setting.ActorId), setting.Color);
        });
    } catch (e) {
        console.error("ActorColors parameter parse error:", e);
    }

    // カスタムカラー設定を解析
    const customColors = new Map();
    try {
        const customColorSettings = JSON.parse(parameters['CustomColors'] || '[]');
        customColorSettings.forEach(settingJson => {
            const setting = JSON.parse(settingJson);
            customColors.set(setting.ColorName, {
                red: Number(setting.Red),
                green: Number(setting.Green),
                blue: Number(setting.Blue),
                density: Number(setting.Density)
            });
        });
    } catch (e) {
        console.error("CustomColors parameter parse error:", e);
    }

    // 色の定義
    const COLOR_VALUES = {
        white: [255, 255, 255],
        red: [255, 0, 0],
        blue: [0, 70, 255],
        yellow: [255, 255, 0],
        green: [0, 255, 0],
        pink: [255, 192, 203],
        black: [0, 0, 0],
        purple: [128, 0, 128],
        orange: [255, 140, 0],     // 活発で明るい性格
        turquoise: [64, 224, 208], // 神秘的で癒し系
        brown: [139, 69, 19]       // 落ち着いた大人びた性格
    };

    // 濃度の定義
    const DENSITY_VALUES = {
        light: 0.3,
        normal: 0.5,
        dark: 0.7
    };

    // パターン用の濃度の定義（パターンは背景より少し濃く）
    const PATTERN_DENSITY_VALUES = {
        light: 0.4,
        normal: 0.6,
        dark: 0.8
    };

    // 色を生成する関数を修正（カスタムカラー対応）
    function createColor(colorName, density, isPattern = false, settings = null) {
        if (colorName === 'custom' && settings) {
            // カスタムカラーの場合
            const customColorName = isPattern ? settings.PatternCustomColorName : settings.CustomColorName;
            const customColor = customColors.get(customColorName);
            if (customColor) {
                const densityValue = customColor.density;
                return `rgba(${customColor.red}, ${customColor.green}, ${customColor.blue}, ${densityValue})`;
            }
        }
        // プリセットカラーの場合（既存の処理）
        const rgb = COLOR_VALUES[colorName] || COLOR_VALUES.black;
        const densityValues = isPattern ? PATTERN_DENSITY_VALUES : DENSITY_VALUES;
        const alpha = densityValues[density] || densityValues.normal;
        return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
    }

    // アクターの設定を取得するヘルパー関数を修正
    function getActorSettings(actor) {
        const actorId = actor.actorId();
        let settings = null;
        try {
            const colorSettings = JSON.parse(parameters['ActorColors'] || '[]');
            const settingJson = colorSettings.find(setting => {
                const parsed = JSON.parse(setting);
                return Number(parsed.ActorId) === actorId;
            });
            if (settingJson) {
                settings = JSON.parse(settingJson);
            }
        } catch (e) {
            console.error("ActorColors parameter parse error:", e);
        }

        return {
            color: settings ? createColor(settings.Color, settings.ColorDensity, false, settings) : defaultBgColor,
            pattern: settings ? settings.Pattern : 'none',
            patternColor: settings ? createColor(settings.PatternColor, settings.PatternDensity, true, settings) : createColor('white', 'normal', true),
            showCardBorder: settings ? settings.ShowCardBorder === 'true' : false,
            cardBorderColor: settings ? createCardBorderColor(settings.CardBorderColor, settings) : 'rgba(255, 255, 255, 1.0)',
            cardBorderWidth: settings ? Number(settings.CardBorderWidth) : 8,
            useColorFilter: settings ? settings.UseColorFilter === 'true' : false,
            filterColor: settings && settings.UseColorFilter === 'true' && settings.FilterCustomColorName ? 
                getFilterColor(settings.FilterCustomColorName) : null
        };
    }

    // カード枠用の色生成関数を追加
    function createCardBorderColor(colorName, settings) {
        if (colorName === 'custom' && settings) {
            const customColor = customColors.get(settings.CardBorderCustomColorName);
            if (customColor) {
                return `rgba(${customColor.red}, ${customColor.green}, ${customColor.blue}, 1.0)`;
            }
        }
        const rgb = COLOR_VALUES[colorName] || COLOR_VALUES.white;
        return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1.0)`;
    }

    // 背景色を取得するヘルパー関数
    function getActorBackgroundColor(actor) {
        return actorColors.get(actor.actorId()) || defaultBgColor;
    }

    // Window_StatusBase の drawItemBackground を修正
    const _Window_StatusBase_drawItemBackground = Window_StatusBase.prototype.drawItemBackground;
    Window_StatusBase.prototype.drawItemBackground = function(index) {
        // アクター関連のウィンドウかどうかをチェック
        if (this instanceof Window_MenuStatus || 
            this instanceof Window_Status || 
            this instanceof Window_SkillStatus ||  // FormationStatusの代わりにSkillStatus
            this instanceof Window_EquipStatus) {  // EquipStatusも追加
            
            // アクターの取得方法を場合分け
            const actor = this._actor || (typeof this.actor === 'function' ? this.actor(index) : null);
            
            if (actor) {
                const rect = this.itemRect(index);
                const settings = getActorSettings(actor);
                this.drawActorBackground(
                    rect.x,
                    rect.y,
                    rect.width,
                    rect.height,
                    settings.color,
                    settings.pattern,
                    settings.patternColor,
                    settings
                );
                return;  // アクター背景を描画したら終了
            }
        }
        
        // アクター関連以外は元の背景処理を実行
        _Window_StatusBase_drawItemBackground.call(this, index);
    };

    // アクター背景描画用のメソッドを修正
    Window_StatusBase.prototype.drawActorBackground = function(x, y, width, height, color, pattern, patternColor, settings) {
        const originalOpacity = this.contents.paintOpacity;
        
        // 基本の背景色を描画
        this.contents.fillRect(x, y, width, height, color);
        
        // パターンの描画
        if (pattern && pattern !== 'none') {
            const context = this.contents.context;
            context.save();
            
            // クリッピング領域を設定
            context.beginPath();
            context.rect(x, y, width, height);
            context.clip();
            
            // パターンを描画
            switch (pattern) {
                case 'stripeV':
                    this.drawVerticalStripes(x, y, width, height, patternColor);
                    break;
                case 'stripeVBold':
                    this.drawVerticalStripesBold(x, y, width, height, patternColor);
                    break;
                case 'stripeH':
                    this.drawHorizontalStripes(x, y, width, height, patternColor);
                    break;
                case 'stripeHBold':
                    this.drawHorizontalStripesBold(x, y, width, height, patternColor);
                    break;
                case 'grid':
                    this.drawGrid(x, y, width, height, patternColor);
                    break;
                case 'checkered':
                    this.drawCheckered(x, y, width, height, patternColor);
                    break;
                case 'polkaDot':
                    this.drawPolkaDots(x, y, width, height, patternColor);
                    break;
                case 'zigzag':
                    this.drawZigzag(x, y, width, height, patternColor);
                    break;
                case 'houndstooth':
                    this.drawHoundstooth(x, y, width, height, patternColor);
                    break;
                case 'honeycomb':
                    this.drawHoneycomb(x, y, width, height, patternColor);
                    break;
                case 'hearts':
                    this.drawHearts(x, y, width, height, patternColor);
                    break;
                case 'gridDiagonal':
                    this.drawGridDiagonal(x, y, width, height, patternColor);
                    break;
                case 'honeycombFill':
                    this.drawHoneycombFill(x, y, width, height, patternColor);
                    break;
            }
            
            context.restore();
        }

        // カード枠の描画
        if (settings && settings.showCardBorder) {
            const context = this.contents.context;
            context.save();
            
            // カード枠の設定
            context.strokeStyle = settings.cardBorderColor;
            context.lineWidth = settings.cardBorderWidth;
            
            // 枠線を描画
            context.strokeRect(
                x + settings.cardBorderWidth/2,
                y + settings.cardBorderWidth/2,
                width - settings.cardBorderWidth,
                height - settings.cardBorderWidth
            );
            
            context.restore();
        }

        // フィルターの描画(フロントで描くからいらない)
        if (settings && settings.useColorFilter && settings.filterColor) {
            this.contents.fillRect(x, y, width, height, settings.filterColor);
        }

        
        this.contents.paintOpacity = originalOpacity;
    };

    // パターン描画用のメソッドを追加
    Window_StatusBase.prototype.drawVerticalStripes = function(x, y, width, height, color) {
        const context = this.contents.context;
        context.save();
        context.strokeStyle = color;
        
        // 細い縦線
        context.lineWidth = 1;
        const spacing = 16;
        for (let i = 0; i < width; i += spacing) {
            context.beginPath();
            context.moveTo(x + i, y);
            context.lineTo(x + i, y + height);
            context.stroke();
        }
        context.restore();
    };

    Window_StatusBase.prototype.drawVerticalStripesBold = function(x, y, width, height, color) {
        // 太い縦線（既存の実装）
        const spacing = 12;
        for (let i = 0; i < width; i += spacing) {
            this.contents.fillRect(x + i, y, 6, height, color);
        }
    };

    Window_StatusBase.prototype.drawHorizontalStripes = function(x, y, width, height, color) {
        const context = this.contents.context;
        context.save();
        context.strokeStyle = color;
        
        // 細い横線
        context.lineWidth = 1;
        const spacing = 16;
        for (let i = 0; i < height; i += spacing) {
            context.beginPath();
            context.moveTo(x, y + i);
            context.lineTo(x + width, y + i);
            context.stroke();
        }
        context.restore();
    };

    Window_StatusBase.prototype.drawHorizontalStripesBold = function(x, y, width, height, color) {
        // 太い横線（既存の実装）
        const spacing = 12;
        for (let i = 0; i < height; i += spacing) {
            this.contents.fillRect(x, y + i, width, 6, color);
        }
    };

    Window_StatusBase.prototype.drawCheckered = function(x, y, width, height, color) {
        const size = 16;
        for (let i = 0; i < width; i += size) {
            for (let j = 0; j < height; j += size) {
                if ((i + j) % (size * 2) === 0) {
                    this.contents.fillRect(x + i, y + j, size, size, color);
                }
            }
        }
    };

    Window_StatusBase.prototype.drawPolkaDots = function(x, y, width, height, color) {
        const spacing = 20;
        const radius = 6;
        for (let i = spacing; i < width; i += spacing) {
            for (let j = spacing; j < height; j += spacing) {
                this.contents.drawCircle(x + i, y + j, radius, color);
            }
        }
    };

    // Window_MenuStatus の drawItemBackground を拡張（背景描画のみ）
    const _Window_MenuStatus_drawItemBackground = Window_MenuStatus.prototype.drawItemBackground;
    Window_MenuStatus.prototype.drawItemBackground = function(index) {
        // NUUNの背景描画を先に実行
        _Window_MenuStatus_drawItemBackground.call(this, index);
        
        // その後で背景パターンを描画
        const actor = this.actor(index);
        if (actor) {  // ActorPictureEXの有無に関わらず背景は描画
            const rect = this.itemRect(index);
            const settings = getActorSettings(actor);
            // 背景パターンの描画前に不透明度を設定
            this.contents.paintOpacity = 255;
            this.drawActorBackground(
                rect.x,
                rect.y,
                rect.width,
                rect.height,
                settings.color,
                settings.pattern,
                settings.patternColor,
                settings
            );
        }
    };

    const _Window_MenuStatus_drawActorGraphic = Window_MenuStatus.prototype.drawActorGraphic;
    Window_MenuStatus.prototype.drawActorGraphic = function(data, bitmap, x, y, width, height, actor) {
        _Window_MenuStatus_drawActorGraphic.call(this, data, bitmap, x, y, width, height, actor);
        this.drawActorFrontA(actor.actorId(), data, x, y, width, height);
    };

    Window_MenuStatus.prototype.drawActorFrontA = function(index, data, x, y, width, height) {
        // アクターの設定を取得
        const actor = $gameActors.actor(index);
        if (!actor) return;
        
        const settings = getActorSettings(actor);
        if (!settings) return;

        // カード枠の描画
        if (settings && settings.showCardBorder) {
            const context = this.contents.context;
            context.save();
            
            // カード枠の設定
            context.strokeStyle = settings.cardBorderColor;
            context.lineWidth = settings.cardBorderWidth;
            
            // 枠線を描画
            context.strokeRect(
                x + settings.cardBorderWidth/2,
                y + settings.cardBorderWidth/2,
                width - settings.cardBorderWidth,
                height - settings.cardBorderWidth
            );
            
            context.restore();
        }

        // フィルターの描画
        if (settings && settings.useColorFilter && settings.filterColor) {
            this.contents.fillRect(x, y, width, height, settings.filterColor);
        }

    };

    // Window_Status の drawBlock1 を修正
    const _Window_Status_drawBlock1 = Window_Status.prototype.drawBlock1;
    Window_Status.prototype.drawBlock1 = function(x, y) {
        // Window_Statusでは_actorを直接参照
        const actor = this._actor;
        if (actor) {
            const settings = getActorSettings(actor);
            // block1Heightが存在しない場合のフォールバック
            const blockHeight = typeof this.block1Height === 'function' ? 
                this.block1Height() : 
                this.lineHeight() * 4;  // デフォルトの高さ

            this.drawActorBackground(
                x,
                y,
                this.itemWidth(),
                blockHeight,
                settings.color,
                settings.pattern,
                settings.patternColor,
                settings
            );
        }
        _Window_Status_drawBlock1.call(this, x, y);
    };

    // 残りのパターン描画メソッドを追加
    Window_StatusBase.prototype.drawGrid = function(x, y, width, height, color) {
        const spacing = 20;
        // 縦線
        for (let i = 0; i < width; i += spacing) {
            this.contents.fillRect(x + i, y, 2, height, color);
        }
        // 横線
        for (let i = 0; i < height; i += spacing) {
            this.contents.fillRect(x, y + i, width, 2, color);
        }
    };

    Window_StatusBase.prototype.drawZigzag = function(x, y, width, height, color) {
        const context = this.contents.context;
        const zigHeight = 20;
        const zigWidth = 20;
        
        context.save();
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.beginPath();
        
        for (let i = 0; i < height + zigHeight; i += zigHeight) {
            for (let j = 0; j < width; j += zigWidth) {
                if (j === 0) {
                    context.moveTo(x + j, y + i);
                }
                context.lineTo(x + j + zigWidth/2, y + i - zigHeight/2);
                context.lineTo(x + j + zigWidth, y + i);
            }
        }
        
        context.stroke();
        context.restore();
    };

    Window_StatusBase.prototype.drawHoundstooth = function(x, y, width, height, color) {
        const context = this.contents.context;
        const size = 20;
        const h = size * Math.sqrt(3);
        
        context.save();
        context.fillStyle = color;
        
        for (let i = 0; i < width + size; i += size * 2) {
            for (let j = 0; j < height + size; j += size * 2) {
                // 基本形の描画
                context.beginPath();
                context.moveTo(x + i, y + j);
                context.lineTo(x + i + size, y + j);
                context.lineTo(x + i + size, y + j + size);
                context.lineTo(x + i, y + j);
                context.fill();
                
                // 反転形の描画
                context.beginPath();
                context.moveTo(x + i + size, y + j + size);
                context.lineTo(x + i + size * 2, y + j + size);
                context.lineTo(x + i + size * 2, y + j + size * 2);
                context.lineTo(x + i + size, y + j + size);
                context.fill();
            }
        }
        
        context.restore();
    };

    Window_StatusBase.prototype.drawHoneycomb = function(x, y, width, height, color) {
        const context = this.contents.context;
        const size = 20;
        const h = size * Math.sqrt(3);
        
        context.save();
        context.strokeStyle = color;
        context.lineWidth = 2;
        
        for (let i = 0; i < width + size * 2; i += size * 3) {
            for (let j = 0; j < height + h; j += h) {
                const offset = (Math.floor(j / h) % 2) * (size * 1.5);
                context.beginPath();
                for (let k = 0; k < 6; k++) {
                    const angle = k * Math.PI / 3;
                    const px = x + i + offset + size * Math.cos(angle);
                    const py = y + j + size * Math.sin(angle);
                    if (k === 0) context.moveTo(px, py);
                    else context.lineTo(px, py);
                }
                context.closePath();
                context.stroke();
            }
        }
        
        context.restore();
    };

    // ハートパターンの描画メソッドを修正
    Window_StatusBase.prototype.drawHearts = function(x, y, width, height, color) {
        const context = this.contents.context;
        const heartSize = 20;  // ハートの基本サイズを20に維持
        const spacing = heartSize * 2;  // ハート間の間隔を維持
        
        context.save();
        context.fillStyle = color;
        
        for (let i = 0; i < width + heartSize; i += spacing) {
            for (let j = 0; j < height + heartSize; j += spacing) {
                // 行ごとにオフセットを付けて千鳥配置
                const offset = (Math.floor(j / spacing) % 2) * (spacing / 2);
                
                // ハートを描画
                context.beginPath();
                const cx = x + i + offset;
                const cy = y + j + heartSize/2;
                
                // ハートの形状を定義
                context.moveTo(cx, cy);
                context.bezierCurveTo(
                    cx - heartSize/2, cy - heartSize/2,
                    cx - heartSize, cy,
                    cx, cy + heartSize/2
                );
                context.bezierCurveTo(
                    cx + heartSize, cy,
                    cx + heartSize/2, cy - heartSize/2,
                    cx, cy
                );
                
                context.fill();
            }
        }
        
        context.restore();
    };

    // 斜め格子パターンの描画メソッドを追加
    Window_StatusBase.prototype.drawGridDiagonal = function(x, y, width, height, color) {
        const context = this.contents.context;
        context.save();
        context.strokeStyle = color;
        context.lineWidth = 2;
        
        const spacing = 20;  // 格子の間隔
        const offset = spacing / 2;  // 交差点のオフセット
        
        // 左下から右上への線
        for (let i = -height; i < width + height; i += spacing) {
            context.beginPath();
            context.moveTo(x + i - height, y + height);
            context.lineTo(x + i, y);
            context.stroke();
        }
        
        // 左上から右下への線
        for (let i = 0; i < width + height; i += spacing) {
            context.beginPath();
            context.moveTo(x + i - height, y);
            context.lineTo(x + i, y + height);
            context.stroke();
        }
        
        context.restore();
    };

    // 塗りつぶしハニカムパターンの描画メソッドを追加
    Window_StatusBase.prototype.drawHoneycombFill = function(x, y, width, height, color) {
        const context = this.contents.context;
        const size = 20;  // 六角形の基本サイズ
        const h = size * Math.sqrt(3);  // 高さ
        
        context.save();
        context.fillStyle = color;
        context.strokeStyle = color;
        context.lineWidth = 1;
        
        for (let i = 0; i < width + size * 2; i += size * 3) {
            for (let j = 0; j < height + h; j += h) {
                const offset = (Math.floor(j / h) % 2) * (size * 1.5);
                
                // 六角形のパスを作成
                context.beginPath();
                for (let k = 0; k < 6; k++) {
                    const angle = k * Math.PI / 3;
                    const px = x + i + offset + size * Math.cos(angle);
                    const py = y + j + size * Math.sin(angle);
                    if (k === 0) context.moveTo(px, py);
                    else context.lineTo(px, py);
                }
                context.closePath();
                
                // 塗りつぶしと線を描画
                context.fill();
                context.stroke();  // 境界線をクリアにするため
            }
        }
        
        context.restore();
    };

    // Window_MenuStatusの選択エフェクトを修正
    Window_MenuStatus.prototype._updateCursor = function() {
        // 前回の選択枠をクリア
        this.refresh();
        
        if (this._cursorAll) {
            this._updateAllCursor();
            return;
        }

        const index = this.index();
        if (index >= 0) {
            const rect = this.itemRect(index);
            // 通常のカーソルを非表示
            this.setCursorRect(0, 0, 0, 0);
            
            this.contents.context.save();
            
            // アイテム選択時とペンディング時で同じ視覚効果を使用
            if (this.isCurrentItemEnabled() || this.pendingIndex() === index) {
                // グラデーションエフェクト
                const gradient = this.contents.context.createLinearGradient(
                    rect.x, rect.y,
                    rect.x, rect.y + rect.height
                );
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
                gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0.7)');
                
                this.contents.context.fillStyle = gradient;
                this.contents.context.fillRect(rect.x, rect.y, rect.width, rect.height);
            }
            
            // 選択枠は常に表示
            const borderWidth = 4;
            this.contents.context.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            this.contents.context.lineWidth = borderWidth;
            
            this.contents.context.strokeRect(
                rect.x + borderWidth/2,
                rect.y + borderWidth/2,
                rect.width - borderWidth,
                rect.height - borderWidth
            );
            
            this.contents.context.restore();
        }
    };

    // 初期化処理を修正（_clearCursorRectの定義を削除）
    const _Window_MenuStatus_initialize = Window_MenuStatus.prototype.initialize;
    Window_MenuStatus.prototype.initialize = function(rect) {
        // NUUN_MenuScreenEXの初期化を先に実行
        _Window_MenuStatus_initialize.call(this, rect);
        
        // ActorCardStyle用のプロパティを追加
        this._allCursorAlpha = 1.0;  // 点滅用の透明度
        this._allCursorDirection = -0.05;  // 点滅の方向と速度
        this._animationFrameId = null;  // アニメーションフレームID
    };

    // 全選択時の処理を修正
    Window_MenuStatus.prototype._updateAllCursor = function() {
        // アニメーションフレームをキャンセル
        if (this._animationFrameId) {
            cancelAnimationFrame(this._animationFrameId);
            this._animationFrameId = null;
        }

        // 内容を再描画
        this.contents.clear();
        this.drawAllItems();

        // 全アクターに選択エフェクトを適用
        const maxItems = this.maxItems();
        for (let i = 0; i < maxItems; i++) {
            const rect = this.itemRect(i);
            
            this.contents.context.save();
            
            // グラデーションエフェクト
            const gradient = this.contents.context.createLinearGradient(
                rect.x, rect.y,
                rect.x, rect.y + rect.height
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
            gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0.7)');
            
            this.contents.context.fillStyle = gradient;
            this.contents.context.fillRect(rect.x, rect.y, rect.width, rect.height);
            
            // 選択枠
            const borderWidth = 4;
            this.contents.context.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            this.contents.context.lineWidth = borderWidth;
            
            this.contents.context.strokeRect(
                rect.x + borderWidth/2,
                rect.y + borderWidth/2,
                rect.width - borderWidth,
                rect.height - borderWidth
            );
            
            this.contents.context.restore();
        }
    };

    // カーソルが変更されたときの処理を追加
    const _Window_MenuStatus_setCursorAll = Window_MenuStatus.prototype.setCursorAll;
    Window_MenuStatus.prototype.setCursorAll = function(cursorAll) {
        _Window_MenuStatus_setCursorAll.call(this, cursorAll);
        if (!cursorAll && this._animationFrameId) {
            cancelAnimationFrame(this._animationFrameId);
            this._animationFrameId = null;
        }
    };

    // Window_Statusにも同じ処理を適用
    Window_Status.prototype._updateCursor = 
        Window_MenuStatus.prototype._updateCursor;

    // Window_MenuStatusのdestroyメソッドを拡張
    const _Window_MenuStatus_destroy = Window_MenuStatus.prototype.destroy;
    Window_MenuStatus.prototype.destroy = function() {
        // アニメーションフレームをキャンセル
        if (this._animationFrameId) {
            cancelAnimationFrame(this._animationFrameId);
            this._animationFrameId = null;
        }
        _Window_MenuStatus_destroy.call(this);
    };

    // シーン変更時のクリーンアップ処理も追加
    const _Window_MenuStatus_deactivate = Window_MenuStatus.prototype.deactivate;
    Window_MenuStatus.prototype.deactivate = function() {
        // アニメーションフレームをキャンセル
        if (this._animationFrameId) {
            cancelAnimationFrame(this._animationFrameId);
            this._animationFrameId = null;
        }
        _Window_MenuStatus_deactivate.call(this);
    };

    // フィルターカラーを取得する関数を追加
    function getFilterColor(colorName) {
        const customColor = customColors.get(colorName);
        if (customColor) {
            return `rgba(${customColor.red}, ${customColor.green}, ${customColor.blue}, 0.2)`;  // フィルターは薄く
        }
        return null;
    }
})(); 