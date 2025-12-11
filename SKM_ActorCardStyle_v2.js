/*:
 * @target MZ
 * @plugindesc アクターカードスタイル ver2 v1.0.0
 * @author sakananomaeasi with help from ChatGPT
 *
 * @help
 * 概要:
 * ・外部CSSなし、内部パターンのみでアクター背景を描画
 * ・プリセット色/カスタム色（#rrggbb, #rgb, 色名）＋Alphaに対応
 * ・背景色・パターン色・枠線色・フィルター色をアクター単位で設定
 * ・控えメンバーを暗く表示、グラデーション（線形/放射）対応
 * ・枠を使う場合、枠太さに合わせて顔グラを自動縮小・中央配置（他の顔描画には影響なし）
 * ・パターンタイルサイズは全体設定とアクター個別設定の両方に対応
 *
 * パターン:
 * 縦線/縦線(太)/横線/横線(太)/格子/斜め格子/ダイヤ/市松/水玉/ジグザグ/千鳥格子/ハニカム/ハニカム(塗)/ハート/ビューティフルドット
 *
 * グラデーション:
 * ・線形: 角度 0=左→右, 90=上→下, 180=右→左, 270=下→上
 * ・放射: 中心座標(0–1)と半径で制御
 * ・開始/終了色はプリセット or カスタムから選択、オフセット(0–1)指定可
 *
 * 透過・色について:
 * ・デフォルト背景Alphaは0.5（プリセット色利用時）。透けが気になる場合はカスタムカラーでAlphaを高めに設定してください。
 * ・パターン/枠/フィルターは各自の設定Alphaを使用します。
 *
 * 枠と顔グラ:
 * ・枠表示ON時のみ、枠太さぶん内側に縮小した顔ビットマップを使用（アスペクト比維持、最小50%）
 * ・枠OFFや他のシーンの顔描画には影響しません。
 *
 * タイルサイズ:
 * ・全体: PatternTileSize（16/24/32/40/48）
 * ・アクター個別: PatternTileSize（0=全体デフォルトを使用）
 * 
 * ■ 更新履歴
 * 1.0.0 - 初版（外部CSS廃止・内部パターンのみ）
 *
 * @param DefaultBackgroundColor
 * @text デフォルト背景色
 * @desc rgba形式の文字列推奨。例) rgba(0,0,0,0.5)
 * @type string
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param CustomColors
 * @text カスタムカラー一覧
 * @type struct<CustomColor>[]
 * @default []
 *
 * @param ActorColors
 * @text アクター設定一覧
 * @type struct<ActorColor>[]
 * @default []
 *
 * @param ReserveMemberDarkness
 * @text 控えメンバーの暗さ
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 0.4
 *
 * @param DebugMode
 * @text デバッグログ
 * @type boolean
 * @default false
 *
 * @param UseRoundedCorners
 * @text 角丸を有効にする
 * @type boolean
 * @default false
 *
 * @param CornerRadius
 * @text 角丸半径(px)
 * @type number
 * @min 0
 * @max 64
 * @default 8
 *
 * @param PatternTileSize
 * @text パターンタイル基準(px)
 * @desc 16/24/32/40/48 から選択。繰り返しパターンの基準サイズになります。
 * @type select
 * @option 16
 * @value 16
 * @option 24
 * @value 24
 * @option 32
 * @value 32
 * @option 40
 * @value 40
 * @option 48
 * @value 48
 * @default 32
 */

/*~struct~CustomColor:
 * @param ColorName
 * @text カラー名
 * @type string
 * @default custom1
 *
 * @param ColorCode
 * @text カラーコード
 * @desc #rrggbb / #rgb / 色名(red, orange...) に対応
 * @type string
 * @default #ffffff
 *
 * @param Alpha
 * @text Alpha(0-1)
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 0.5
 */

/*~struct~ActorColor:
 * @param ActorId
 * @text アクターID
 * @type actor
 *
 * @param BackgroundColorType
 * @text 背景色タイプ
 * @type select
 * @option プリセット
 * @value preset
 * @option カスタム
 * @value custom
 * @default preset
 *
 * @param BackgroundPreset
 * @text 背景プリセット色
 * @type select
 * @option 白（ホワイト）
 * @value white
 * @option 赤（レッド）
 * @value red
 * @option 青（ブルー）
 * @value blue
 * @option 黄（イエロー）
 * @value yellow
 * @option 緑（グリーン）
 * @value green
 * @option ピンク
 * @value pink
 * @option 黒（ブラック）
 * @value black
 * @option 紫（パープル）
 * @value purple
 * @option オレンジ
 * @value orange
 * @option ターコイズ
 * @value turquoise
 * @option 茶（ブラウン）
 * @value brown
 * @default black
 *
 * @param BackgroundCustomColorName
 * @text 背景カスタムカラー名
 * @type string
 * @default custom1
 *
 * @param Pattern
 * @text パターン
 * @type select
 * @option なし
 * @value none
 * @option 縦線
 * @value stripeV
 * @option 縦線(太)
 * @value stripeVBold
 * @option 横線
 * @value stripeH
 * @option 横線(太)
 * @value stripeHBold
 * @option 格子
 * @value grid
 * @option 斜め格子
 * @value gridDiagonal
 * @option ダイヤ（菱形）
 * @value diamond
 * @option 市松
 * @value checkered
 * @option 水玉
 * @value polkaDot
 * @option ジグザグ
 * @value zigzag
 * @option 千鳥格子
 * @value houndstooth
 * @option ハニカム
 * @value honeycomb
 * @option ハニカム(塗)
 * @value honeycombFill
 * @option ハート
 * @value hearts
 * @option ビューティフルドット
 * @value beautifulDots
 * @default none
 *
 * @param PatternTileSize
 * @text パターンタイル基準(px)
 * @desc このアクターのパターン基準サイズ。未指定時は全体設定を使用。
 * @type select
 * @option (デフォルトを使う)
 * @value 0
 * @option 16
 * @value 16
 * @option 24
 * @value 24
 * @option 32
 * @value 32
 * @option 40
 * @value 40
 * @option 48
 * @value 48
 * @default 0
 *
 * @param PatternColorType
 * @text パターン色タイプ
 * @type select
 * @option プリセット
 * @value preset
 * @option カスタム
 * @value custom
 * @default preset
 *
 * @param PatternPreset
 * @text パターンプリセット色
 * @type select
 * @option 白（ホワイト）
 * @value white
 * @option 赤（レッド）
 * @value red
 * @option 青（ブルー）
 * @value blue
 * @option 黄（イエロー）
 * @value yellow
 * @option 緑（グリーン）
 * @value green
 * @option ピンク
 * @value pink
 * @option 黒（ブラック）
 * @value black
 * @option 紫（パープル）
 * @value purple
 * @option オレンジ
 * @value orange
 * @option ターコイズ
 * @value turquoise
 * @option 茶（ブラウン）
 * @value brown
 * @default white
 *
 * @param PatternCustomColorName
 * @text パターンカスタムカラー名
 * @type string
 * @default custom1
 *
 * @param ShowCardBorder
 * @text 枠線を表示
 * @type boolean
 * @default false
 *
 * @param CardBorderColorType
 * @text 枠線色タイプ
 * @type select
 * @option プリセット
 * @value preset
 * @option カスタム
 * @value custom
 * @default preset
 *
 * @param CardBorderPreset
 * @text 枠線プリセット色
 * @type select
 * @option 白（ホワイト）
 * @value white
 * @option 赤（レッド）
 * @value red
 * @option 青（ブルー）
 * @value blue
 * @option 黄（イエロー）
 * @value yellow
 * @option 緑（グリーン）
 * @value green
 * @option ピンク
 * @value pink
 * @option 黒（ブラック）
 * @value black
 * @option 紫（パープル）
 * @value purple
 * @option オレンジ
 * @value orange
 * @option ターコイズ
 * @value turquoise
 * @option 茶（ブラウン）
 * @value brown
 * @default white
 *
 * @param CardBorderCustomColorName
 * @text 枠線カスタムカラー名
 * @type string
 * @default custom1
 *
 * @param CardBorderWidth
 * @text 枠線の太さ(px)
 * @type number
 * @min 1
 * @max 12
 * @default 6
 *
 * @param UseColorFilter
 * @text フィルターを使う
 * @type boolean
 * @default false
 *
 * @param FilterColorType
 * @text フィルター色タイプ
 * @type select
 * @option プリセット
 * @value preset
 * @option カスタム
 * @value custom
 * @default custom
 *
 * @param FilterPreset
 * @text フィルタープリセット色
 * @type select
 * @option 白（ホワイト）
 * @value white
 * @option 赤（レッド）
 * @value red
 * @option 青（ブルー）
 * @value blue
 * @option 黄（イエロー）
 * @value yellow
 * @option 緑（グリーン）
 * @value green
 * @option ピンク
 * @value pink
 * @option 黒（ブラック）
 * @value black
 * @option 紫（パープル）
 * @value purple
 * @option オレンジ
 * @value orange
 * @option ターコイズ
 * @value turquoise
 * @option 茶（ブラウン）
 * @value brown
 * @default white
 *
 * @param FilterCustomColorName
 * @text フィルターカスタムカラー名
 * @type string
 * @default custom1
 *
 * @param ApplyFilterToBorder
 * @text フィルターを枠にも適用
 * @type boolean
 * @default false
 *
 * @param UseGradient
 * @text グラデーションを使う
 * @type boolean
 * @default false
 *
 * @param GradientType
 * @text グラデーション種別
 * @type select
 * @option 線形
 * @value linear
 * @option 放射
 * @value radial
 * @default linear
 * @parent UseGradient
 *
 * @param GradientAngle
 * @text 線形角度(度)
 * @desc 線形時のみ有効。0=左→右, 90=上→下, 180=右→左, 270=下→上。
 * @type number
 * @default 0
 * @parent UseGradient
 *
 * @param GradientStartColorType
 * @text 開始色タイプ
 * @type select
 * @option プリセット
 * @value preset
 * @option カスタム
 * @value custom
 * @default preset
 * @parent UseGradient
 *
 * @param GradientStartPreset
 * @text 開始プリセット色
 * @type select
 * @option 白（ホワイト）
 * @value white
 * @option 赤（レッド）
 * @value red
 * @option 青（ブルー）
 * @value blue
 * @option 黄（イエロー）
 * @value yellow
 * @option 緑（グリーン）
 * @value green
 * @option ピンク
 * @value pink
 * @option 黒（ブラック）
 * @value black
 * @option 紫（パープル）
 * @value purple
 * @option オレンジ
 * @value orange
 * @option ターコイズ
 * @value turquoise
 * @option 茶（ブラウン）
 * @value brown
 * @default white
 * @parent UseGradient
 *
 * @param GradientStartCustomColorName
 * @text 開始カスタムカラー名
 * @type string
 * @default custom1
 * @parent UseGradient
 *
 * @param GradientStartOffset
 * @text 開始オフセット(0-1)
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 0
 * @parent UseGradient
 *
 * @param GradientEndColorType
 * @text 終了色タイプ
 * @type select
 * @option プリセット
 * @value preset
 * @option カスタム
 * @value custom
 * @default preset
 * @parent UseGradient
 *
 * @param GradientEndPreset
 * @text 終了プリセット色
 * @type select
 * @option 白（ホワイト）
 * @value white
 * @option 赤（レッド）
 * @value red
 * @option 青（ブルー）
 * @value blue
 * @option 黄（イエロー）
 * @value yellow
 * @option 緑（グリーン）
 * @value green
 * @option ピンク
 * @value pink
 * @option 黒（ブラック）
 * @value black
 * @option 紫（パープル）
 * @value purple
 * @option オレンジ
 * @value orange
 * @option ターコイズ
 * @value turquoise
 * @option 茶（ブラウン）
 * @value brown
 * @default black
 * @parent UseGradient
 *
 * @param GradientEndCustomColorName
 * @text 終了カスタムカラー名
 * @type string
 * @default custom1
 * @parent UseGradient
 *
 * @param GradientEndOffset
 * @text 終了オフセット(0-1)
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 1
 * @parent UseGradient
 *
 * @param RadialCenterX
 * @text 放射中心X(0-1)
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 0.5
 * @parent UseGradient
 *
 * @param RadialCenterY
 * @text 放射中心Y(0-1)
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 0.5
 * @parent UseGradient
 *
 * @param RadialRadius
 * @text 放射半径(0-1)
 * @type number
 * @decimals 2
 * @min 0.1
 * @max 2
 * @default 0.75
 * @parent UseGradient
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    const parameters = PluginManager.parameters(pluginName);

    const defaultBgColor = parameters["DefaultBackgroundColor"] || "rgba(0, 0, 0, 0.5)";
    const reserveMemberDarkness = Number(parameters["ReserveMemberDarkness"] || 0.4);
    const debugMode = parameters["DebugMode"] === "true";
    const defaultPatternTile = Number(parameters["PatternTileSize"] || 32);
    const useRoundedCorners = parameters["UseRoundedCorners"] === "true";
    const cornerRadius = Number(parameters["CornerRadius"] || 8);

    const COLOR_PRESETS = {
        white: [255, 255, 255],
        red: [255, 0, 0],
        blue: [0, 70, 255],
        yellow: [255, 255, 0],
        green: [0, 255, 0],
        pink: [255, 192, 203],
        black: [0, 0, 0],
        purple: [128, 0, 128],
        orange: [255, 140, 0],
        turquoise: [64, 224, 208],
        brown: [139, 69, 19],
    };

    // 役割別のデフォルトAlpha（プリセット色使用時）
    const DEFAULT_ALPHA = {
        background: 0.5,
        pattern: 0.6,
        border: 1.0,
        filter: 0.2,
    };

    function log(...args) {
        if (debugMode) console.log("[ActorCardStyle]", ...args);
    }

    function parseJsonSafe(raw, fallback) {
        try {
            return JSON.parse(raw || "[]");
        } catch (e) {
            log("JSON parse error:", e);
            return fallback;
        }
    }

    // カスタムカラーをロード
    const customColors = new Map();
    parseJsonSafe(parameters["CustomColors"], []).forEach((j) => {
        const o = parseJsonSafe(j, null);
        if (!o || !o.ColorName) return;
        customColors.set(o.ColorName, {
            code: o.ColorCode || "#ffffff",
            alpha: Number(o.Alpha ?? 0.5),
        });
    });

    // 色名/HEXをRGBに変換
    function parseColorCode(code) {
        if (!code) return [0, 0, 0];
        if (COLOR_PRESETS[code]) return COLOR_PRESETS[code];
        if (code[0] === "#") {
            if (code.length === 4) {
                const r = parseInt(code[1] + code[1], 16);
                const g = parseInt(code[2] + code[2], 16);
                const b = parseInt(code[3] + code[3], 16);
                return [r, g, b];
            } else if (code.length === 7) {
                const r = parseInt(code.slice(1, 3), 16);
                const g = parseInt(code.slice(3, 5), 16);
                const b = parseInt(code.slice(5, 7), 16);
                return [r, g, b];
            }
        }
        // 不明な色名 → 黒
        return COLOR_PRESETS.black;
    }

    function toRgbaString(rgb, alpha) {
        const a = Number.isFinite(alpha) ? alpha : 1.0;
        return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a})`;
    }

    function resolveColorFromSpec(spec) {
        // spec: { type: 'preset'|'custom', preset?, customName?, role: 'background'|'pattern'|'border'|'filter' }
        const roleAlpha = DEFAULT_ALPHA[spec.role] ?? 1.0;
        if (spec.type === "custom") {
            const cc = customColors.get(spec.customName);
            if (cc) {
                const rgb = parseColorCode(cc.code);
                return toRgbaString(rgb, cc.alpha);
            }
        }
        const preset = spec.preset || "black";
        const rgb = COLOR_PRESETS[preset] || COLOR_PRESETS.black;
        return toRgbaString(rgb, roleAlpha);
    }

    // 顔グラ縮小キャッシュ（枠あり用）
    const scaledFaceCache = new Map(); // key: faceName_index_borderWidth
    function getScaledFaceBitmap(actor, borderWidth) {
        const faceName = actor.faceName();
        const faceIndex = actor.faceIndex();
        const w = ImageManager.faceWidth;
        const h = ImageManager.faceHeight;
        const key = `${faceName}_${faceIndex}_${borderWidth}`;
        if (scaledFaceCache.has(key)) return scaledFaceCache.get(key);

        const src = ImageManager.loadFace(faceName);
        const dest = new Bitmap(w, h);

        const col = faceIndex % 4;
        const row = Math.floor(faceIndex / 4);
        const sx = col * w;
        const sy = row * h;

        // 枠太さに応じて縮小（アスペクト維持）。下限スケールを確保。
        const scale = Math.max(0.5, 1 - (borderWidth * 2) / Math.min(w, h));
        const dw = Math.floor(w * scale);
        const dh = Math.floor(h * scale);
        const dx = Math.floor((w - dw) / 2);
        const dy = Math.floor((h - dh) / 2);

        const bltFace = () => {
            dest.clear();
            dest.blt(src, sx, sy, w, h, dx, dy, dw, dh);
        };

        if (src.isReady()) {
            bltFace();
        } else {
            src.addLoadListener(bltFace);
        }

        scaledFaceCache.set(key, dest);
        return dest;
    }

    // アクター設定をロード
    const actorSettingsMap = new Map();
    parseJsonSafe(parameters["ActorColors"], []).forEach((j) => {
        const s = parseJsonSafe(j, null);
        if (!s || !s.ActorId) return;
        actorSettingsMap.set(Number(s.ActorId), s);
    });

    function getActorSettings(actor) {
        if (!actor) return null;
        const actorId = typeof actor === "number" ? actor : actor.actorId();
        const s = actorSettingsMap.get(actorId);
        if (!s) {
        return {
                background: defaultBgColor,
                pattern: "none",
                patternColor: toRgbaString(COLOR_PRESETS.white, DEFAULT_ALPHA.pattern),
                showBorder: false,
                borderColor: toRgbaString(COLOR_PRESETS.white, DEFAULT_ALPHA.border),
                borderWidth: 6,
                useFilter: false,
                filterColor: null,
                applyFilterToBorder: false,
            patternTileSize: defaultPatternTile,
            useRoundedCorners,
            cornerRadius,
            };
        }

        const background = resolveColorFromSpec({
            type: s.BackgroundColorType || "preset",
            preset: s.BackgroundPreset,
            customName: s.BackgroundCustomColorName,
            role: "background",
        });
        const patternColor = resolveColorFromSpec({
            type: s.PatternColorType || "preset",
            preset: s.PatternPreset,
            customName: s.PatternCustomColorName,
            role: "pattern",
        });
        const borderColor = resolveColorFromSpec({
            type: s.CardBorderColorType || "preset",
            preset: s.CardBorderPreset,
            customName: s.CardBorderCustomColorName,
            role: "border",
        });
        const filterColor = s.UseColorFilter === "true"
            ? resolveColorFromSpec({
                  type: s.FilterColorType || "custom",
                  preset: s.FilterPreset,
                  customName: s.FilterCustomColorName,
                  role: "filter",
              })
            : null;

        const patternTileSize = Number(s.PatternTileSize || 0) || defaultPatternTile;

        return {
            background,
            pattern: s.Pattern || "none",
            patternColor,
            showBorder: s.ShowCardBorder === "true",
            borderColor,
            borderWidth: Number(s.CardBorderWidth ?? 6),
            useFilter: s.UseColorFilter === "true",
            filterColor,
            applyFilterToBorder: s.ApplyFilterToBorder === "true",
            patternTileSize,
            useGradient: s.UseGradient === "true",
            gradientType: s.GradientType || "linear",
            gradientAngle: Number(s.GradientAngle ?? 90),
            gradientStartColor: resolveColorFromSpec({
                type: s.GradientStartColorType || "preset",
                preset: s.GradientStartPreset,
                customName: s.GradientStartCustomColorName,
                role: "background",
            }),
            gradientEndColor: resolveColorFromSpec({
                type: s.GradientEndColorType || "preset",
                preset: s.GradientEndPreset,
                customName: s.GradientEndCustomColorName,
                role: "background",
            }),
            gradientStartOffset: Number(s.GradientStartOffset ?? 0),
            gradientEndOffset: Number(s.GradientEndOffset ?? 1),
            radialCenterX: Number(s.RadialCenterX ?? 0.5),
            radialCenterY: Number(s.RadialCenterY ?? 0.5),
            radialRadius: Number(s.RadialRadius ?? 0.75),
            useRoundedCorners,
            cornerRadius,
        };
    }

    function darkenColorString(rgbaString, rate) {
        const nums = rgbaString.match(/[\d.]+/g);
        if (!nums || nums.length < 3) return rgbaString;
        const r = Math.floor(Number(nums[0]) * rate);
        const g = Math.floor(Number(nums[1]) * rate);
        const b = Math.floor(Number(nums[2]) * rate);
        const a = nums[3] !== undefined ? Number(nums[3]) : 1.0;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    function drawRoundedRectPath(ctx, rect, radius) {
        const r = Math.max(0, Math.min(radius, Math.min(rect.width, rect.height) / 2));
        const x = rect.x;
        const y = rect.y;
        const w = rect.width;
        const h = rect.height;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }

    // パターン描画群
    function drawVerticalStripes(ctx, x, y, w, h, color, tile, bold = false) {
        ctx.save();
        ctx.strokeStyle = color;
        const lw = bold ? Math.max(4, Math.floor(tile / 5)) : Math.max(1, Math.floor(tile / 12));
        ctx.lineWidth = lw;
        const spacing = bold ? Math.max(lw * 2, Math.floor(tile / 2)) : Math.max(lw * 4, Math.floor(tile / 2));
        for (let i = 0; i < w; i += spacing) {
            ctx.beginPath();
            ctx.moveTo(x + i, y);
            ctx.lineTo(x + i, y + h);
            ctx.stroke();
        }
        ctx.restore();
    }

    function drawHorizontalStripes(ctx, x, y, w, h, color, tile, bold = false) {
        ctx.save();
        ctx.strokeStyle = color;
        const lw = bold ? Math.max(4, Math.floor(tile / 5)) : Math.max(1, Math.floor(tile / 12));
        ctx.lineWidth = lw;
        const spacing = bold ? Math.max(lw * 2, Math.floor(tile / 2)) : Math.max(lw * 4, Math.floor(tile / 2));
        for (let i = 0; i < h; i += spacing) {
            ctx.beginPath();
            ctx.moveTo(x, y + i);
            ctx.lineTo(x + w, y + i);
            ctx.stroke();
        }
        ctx.restore();
    }

    function drawGrid(ctx, x, y, w, h, color, tile) {
        const spacing = Math.max(8, tile);
        const thickness = Math.max(1, Math.floor(tile / 16));
        for (let i = 0; i < w; i += spacing) ctx.fillRect(x + i, y, thickness, h, color);
        for (let i = 0; i < h; i += spacing) ctx.fillRect(x, y + i, w, thickness, color);
    }

    function drawGridDiagonal(ctx, x, y, w, h, color, tile) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = Math.max(2, Math.floor(tile / 12));
        const spacing = Math.max(10, tile);
        for (let i = -h; i < w + h; i += spacing) {
            ctx.beginPath();
            ctx.moveTo(x + i - h, y + h);
            ctx.lineTo(x + i, y);
            ctx.stroke();
        }
        for (let i = 0; i < w + h; i += spacing) {
            ctx.beginPath();
            ctx.moveTo(x + i - h, y);
            ctx.lineTo(x + i, y + h);
            ctx.stroke();
        }
        ctx.restore();
    }

    function drawCheckered(ctx, x, y, w, h, color, tile) {
        const size = Math.max(8, Math.floor(tile / 2));
        for (let i = 0; i < w; i += size) {
            for (let j = 0; j < h; j += size) {
                if ((i + j) % (size * 2) === 0) ctx.fillRect(x + i, y + j, size, size, color);
            }
        }
    }

    function drawDiamond(ctx, x, y, w, h, color, tile) {
        const size = Math.max(12, tile);
        const half = size / 2;
        ctx.save();
        ctx.fillStyle = color;
        for (let i = -size; i < w + size; i += size) {
            for (let j = -size; j < h + size; j += size) {
                ctx.beginPath();
                ctx.moveTo(x + i + half, y + j);
                ctx.lineTo(x + i + size, y + j + half);
                ctx.lineTo(x + i + half, y + j + size);
                ctx.lineTo(x + i, y + j + half);
                ctx.closePath();
                ctx.fill();
            }
        }
        ctx.restore();
    }

    function drawPolkaDots(contents, x, y, w, h, color, tile) {
        const spacing = Math.max(10, tile);
        const radius = Math.max(3, Math.floor(tile / 5));
        for (let i = spacing; i < w; i += spacing) {
            for (let j = spacing; j < h; j += spacing) {
                contents.drawCircle(x + i, y + j, radius, color);
            }
        }
    }

    function drawZigzag(ctx, x, y, w, h, color, tile) {
        const zigH = Math.max(10, Math.floor(tile / 1.6));
        const zigW = Math.max(10, Math.floor(tile / 1.6));
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = Math.max(2, Math.floor(tile / 12));
        ctx.beginPath();
        for (let i = 0; i < h + zigH; i += zigH) {
            for (let j = 0; j < w; j += zigW) {
                if (j === 0) ctx.moveTo(x + j, y + i);
                ctx.lineTo(x + j + zigW / 2, y + i - zigH / 2);
                ctx.lineTo(x + j + zigW, y + i);
            }
        }
        ctx.stroke();
        ctx.restore();
    }

    function drawHoundstooth(ctx, x, y, w, h, color, tile) {
        const size = Math.max(10, Math.floor(tile / 1.6));
        ctx.save();
        ctx.fillStyle = color;
        for (let i = 0; i < w + size; i += size * 2) {
            for (let j = 0; j < h + size; j += size * 2) {
                ctx.beginPath();
                ctx.moveTo(x + i, y + j);
                ctx.lineTo(x + i + size, y + j);
                ctx.lineTo(x + i + size, y + j + size);
                ctx.lineTo(x + i, y + j);
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(x + i + size, y + j + size);
                ctx.lineTo(x + i + size * 2, y + j + size);
                ctx.lineTo(x + i + size * 2, y + j + size * 2);
                ctx.lineTo(x + i + size, y + j + size);
                ctx.fill();
            }
        }
        ctx.restore();
    }

    function drawHoneycomb(ctx, x, y, w, h, color, tile, fill = false) {
        const size = Math.max(10, Math.floor(tile / 1.6));
        const hh = size * Math.sqrt(3);
        ctx.save();
        ctx[fill ? "fillStyle" : "strokeStyle"] = color;
        ctx.lineWidth = fill ? Math.max(1, Math.floor(tile / 18)) : Math.max(2, Math.floor(tile / 12));
        for (let i = 0; i < w + size * 2; i += size * 3) {
            for (let j = 0; j < h + hh; j += hh) {
                const offset = (Math.floor(j / hh) % 2) * (size * 1.5);
                ctx.beginPath();
                for (let k = 0; k < 6; k++) {
                    const ang = (k * Math.PI) / 3;
                    const px = x + i + offset + size * Math.cos(ang);
                    const py = y + j + size * Math.sin(ang);
                    if (k === 0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.closePath();
                if (fill) ctx.fill();
                ctx.stroke();
            }
        }
        ctx.restore();
    }

    function drawHearts(ctx, x, y, w, h, color, tile) {
        const heart = Math.max(12, Math.floor(tile * 0.8));
        const spacing = heart * 2;
        ctx.save();
        ctx.fillStyle = color;
        for (let i = 0; i < w + heart; i += spacing) {
            for (let j = 0; j < h + heart; j += spacing) {
                const offset = (Math.floor(j / spacing) % 2) * (spacing / 2);
                const cx = x + i + offset;
                const cy = y + j + heart / 2;
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.bezierCurveTo(cx - heart / 2, cy - heart / 2, cx - heart, cy, cx, cy + heart / 2);
                ctx.bezierCurveTo(cx + heart, cy, cx + heart / 2, cy - heart / 2, cx, cy);
                ctx.fill();
            }
        }
        ctx.restore();
    }

    function drawBeautifulDots(contents, x, y, w, h, color, tile) {
        // タイル基準: tile（未指定ならデフォルトにフォールバック）
        const t = Math.max(12, tile || 32);
        const bigR = Math.max(3, Math.floor(t / 10)); // 中央ドットを一回り小さく
        const smallR = Math.max(2, Math.floor(t / 12));
        // 小ドットを角寄りと中央寄りの中間あたりに配置（約1/3タイル）
        const offset = Math.max(2, Math.floor(t * 0.33));
        for (let i = 0; i < w + t; i += t) {
            for (let j = 0; j < h + t; j += t) {
                const cx = x + i + t / 2;
                const cy = y + j + t / 2;
                // 中央の大きいドット
                contents.drawCircle(cx, cy, bigR, color);
                // 内寄りの4点に小ドット（角より中央寄り）
                contents.drawCircle(cx - offset, cy - offset, smallR, color);
                contents.drawCircle(cx + offset, cy - offset, smallR, color);
                contents.drawCircle(cx - offset, cy + offset, smallR, color);
                contents.drawCircle(cx + offset, cy + offset, smallR, color);
            }
        }
    }

    function drawPattern(contents, x, y, w, h, pattern, color, tile) {
        const ctx = contents.context;
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.clip();
        switch (pattern) {
            case "stripeV":
                drawVerticalStripes(ctx, x, y, w, h, color, tile, false);
                break;
            case "stripeVBold":
                drawVerticalStripes(ctx, x, y, w, h, color, tile, true);
                break;
            case "stripeH":
                drawHorizontalStripes(ctx, x, y, w, h, color, tile, false);
                break;
            case "stripeHBold":
                drawHorizontalStripes(ctx, x, y, w, h, color, tile, true);
                break;
            case "grid":
                drawGrid(ctx, x, y, w, h, color, tile);
                break;
            case "gridDiagonal":
                drawGridDiagonal(ctx, x, y, w, h, color, tile);
                break;
            case "checkered":
                drawCheckered(ctx, x, y, w, h, color, tile);
                break;
            case "diamond":
                drawDiamond(ctx, x, y, w, h, color, tile);
                break;
            case "polkaDot":
                drawPolkaDots(contents, x, y, w, h, color, tile);
                break;
            case "zigzag":
                drawZigzag(ctx, x, y, w, h, color, tile);
                break;
            case "houndstooth":
                drawHoundstooth(ctx, x, y, w, h, color, tile);
                break;
            case "honeycomb":
                drawHoneycomb(ctx, x, y, w, h, color, tile, false);
                break;
            case "honeycombFill":
                drawHoneycomb(ctx, x, y, w, h, color, tile, true);
                break;
            case "hearts":
                drawHearts(ctx, x, y, w, h, color, tile);
                break;
            case "beautifulDots":
                drawBeautifulDots(contents, x, y, w, h, color, tile);
                break;
            default:
                break;
        }
        ctx.restore();
    }

    function drawActorBackground(contents, rect, settings, actor, isSelected = false) {
        const ctx = contents.context;
        const isReserve = actor ? $gameParty.battleMembers().indexOf(actor) === -1 : false;
        const rate = isReserve ? reserveMemberDarkness : 1.0;
        const roundOn = settings.useRoundedCorners && settings.cornerRadius > 0;
        const radius = roundOn ? Math.min(settings.cornerRadius, Math.min(rect.width, rect.height) / 2) : 0;

        let clipped = false;
        if (roundOn) {
            ctx.save();
            drawRoundedRectPath(ctx, rect, radius);
            ctx.clip();
            clipped = true;
        }

        // 背景: グラデーション優先
        if (settings.useGradient) {
            let g;
            if (settings.gradientType === "radial") {
                const cx = rect.x + rect.width * settings.radialCenterX;
                const cy = rect.y + rect.height * settings.radialCenterY;
                const r = Math.max(rect.width, rect.height) * settings.radialRadius;
                g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
            } else {
                // linear: 角度を任意に通す。長さは対角線ベースで中心を通るようにする。
                const ang = (settings.gradientAngle % 360) * (Math.PI / 180);
                const len = Math.hypot(rect.width, rect.height); // 対角線長を基準にして全方向で十分な長さを確保
                const vx = Math.cos(ang) * len;
                const vy = Math.sin(ang) * len;
                const cx = rect.x + rect.width / 2;
                const cy = rect.y + rect.height / 2;
                g = ctx.createLinearGradient(
                    cx - vx / 2,
                    cy - vy / 2,
                    cx + vx / 2,
                    cy + vy / 2
                );
            }
            const c1 = darkenColorString(settings.gradientStartColor, rate);
            const c2 = darkenColorString(settings.gradientEndColor, rate);
            const o1 = Math.min(1, Math.max(0, settings.gradientStartOffset));
            const o2 = Math.min(1, Math.max(0, settings.gradientEndOffset));
            g.addColorStop(o1, c1);
            g.addColorStop(o2, c2);
            ctx.save();
            ctx.fillStyle = g;
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
            ctx.restore();
        } else {
            const bgColor = darkenColorString(settings.background, rate);
            contents.fillRect(rect.x, rect.y, rect.width, rect.height, bgColor);
        }

        // パターン
        if (settings.pattern && settings.pattern !== "none") {
            const patternColor = darkenColorString(settings.patternColor, rate);
            drawPattern(
                contents,
                rect.x,
                rect.y,
                rect.width,
                rect.height,
                settings.pattern,
                patternColor,
                settings.patternTileSize
            );
        }

        // フィルター（枠より下）
        if (settings.useFilter && settings.filterColor && !settings.applyFilterToBorder) {
            const fc = darkenColorString(settings.filterColor, rate);
            contents.fillRect(rect.x, rect.y, rect.width, rect.height, fc);
        }

        if (clipped) {
            ctx.restore();
            clipped = false;
        }

        // 枠線（角丸時は内周も丸くなるよう角丸パスでストローク）
        if (settings.showBorder) {
            const borderColor = darkenColorString(settings.borderColor, rate);
            const bw = settings.borderWidth;
            ctx.save();
            ctx.strokeStyle = borderColor;
            ctx.lineWidth = bw;
            ctx.lineJoin = "round";
            const half = bw / 2;
            const borderRect = {
                x: rect.x + half,
                y: rect.y + half,
                width: rect.width - bw,
                height: rect.height - bw,
            };
            const r = roundOn
                ? Math.max(0, Math.min(radius - half, Math.min(borderRect.width, borderRect.height) / 2))
                : 0;
            ctx.beginPath();
            if (r > 0) {
                ctx.moveTo(borderRect.x + r, borderRect.y);
                ctx.lineTo(borderRect.x + borderRect.width - r, borderRect.y);
                ctx.quadraticCurveTo(borderRect.x + borderRect.width, borderRect.y, borderRect.x + borderRect.width, borderRect.y + r);
                ctx.lineTo(borderRect.x + borderRect.width, borderRect.y + borderRect.height - r);
                ctx.quadraticCurveTo(borderRect.x + borderRect.width, borderRect.y + borderRect.height, borderRect.x + borderRect.width - r, borderRect.y + borderRect.height);
                ctx.lineTo(borderRect.x + r, borderRect.y + borderRect.height);
                ctx.quadraticCurveTo(borderRect.x, borderRect.y + borderRect.height, borderRect.x, borderRect.y + borderRect.height - r);
                ctx.lineTo(borderRect.x, borderRect.y + r);
                ctx.quadraticCurveTo(borderRect.x, borderRect.y, borderRect.x + r, borderRect.y);
            } else {
                ctx.rect(borderRect.x, borderRect.y, borderRect.width, borderRect.height);
            }
            ctx.stroke();
            ctx.restore();
        }

        // フィルター（枠より上）
        if (settings.useFilter && settings.filterColor && settings.applyFilterToBorder) {
            const fc = darkenColorString(settings.filterColor, rate);
            if (roundOn) {
                ctx.save();
                drawRoundedRectPath(ctx, rect, radius);
                ctx.clip();
                contents.fillRect(rect.x, rect.y, rect.width, rect.height, fc);
                ctx.restore();
            } else {
                contents.fillRect(rect.x, rect.y, rect.width, rect.height, fc);
            }
        }
    }

    // 顔描画（枠あり時のみ縮小版を使用。その他は標準のまま）
    const _Window_StatusBase_drawActorFace = Window_StatusBase.prototype.drawActorFace;
    Window_StatusBase.prototype.drawActorFace = function (actor, x, y, width, height) {
        if (actor) {
            const settings = getActorSettings(actor);
            if (settings && settings.showBorder) {
                const bmp = getScaledFaceBitmap(actor, settings.borderWidth || 0);
                const dw = width ?? bmp.width;
                const dh = height ?? bmp.height;
                this.contents.blt(bmp, 0, 0, bmp.width, bmp.height, x, y, dw, dh);
                return;
            }
        }
        _Window_StatusBase_drawActorFace.call(this, actor, x, y, width, height);
    };

    // メニュー系背景フック
    const _Window_StatusBase_drawItemBackground = Window_StatusBase.prototype.drawItemBackground;
    Window_StatusBase.prototype.drawItemBackground = function (index) {
        if (
            this instanceof Window_MenuStatus ||
            this instanceof Window_Status ||
            this instanceof Window_SkillStatus ||
            this instanceof Window_EquipStatus
        ) {
            const actor = this._actor || (typeof this.actor === "function" ? this.actor(index) : null);
            if (actor) {
                const rect = this.itemRect(index);
                const settings = getActorSettings(actor);
                drawActorBackground(this.contents, rect, settings, actor);
                return;
            }
        }
        _Window_StatusBase_drawItemBackground.call(this, index);
    };

    // Status画面のblock1背景
    const _Window_Status_drawBlock1 = Window_Status.prototype.drawBlock1;
    Window_Status.prototype.drawBlock1 = function (x, y) {
        const actor = this._actor;
        if (actor) {
            const settings = getActorSettings(actor);
            const h = typeof this.block1Height === "function" ? this.block1Height() : this.lineHeight() * 4;
            const rect = new Rectangle(x, y, this.itemWidth(), h);
            drawActorBackground(this.contents, rect, settings, actor);
        }
        _Window_Status_drawBlock1.call(this, x, y);
    };

})();

