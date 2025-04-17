/*:
 * @target MZ
 * @plugindesc v1.4.0 ピクチャに発光効果とアニメーションを適用するプラグイン
 * @author さかなのまえあし
 * @url
 *
 * @help
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * 【ピクチャ発光・アニメーションプラグイン】
 * SKM_PictureGlow.js
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 *
 * ピクチャに発光効果とアニメーションを適用できるプラグインです。
 * 美しい発光エフェクトや自然な動きのアニメーションで、
 * ゲーム画面の表現力を大幅に向上させることができます。
 *
 * 【発光エフェクト】
 * 発光スタイル：
 * - soft_pulse: 穏やかに脈動する発光効果。控えめな明滅で優しい印象を与えます。
 * - pulse: 強い脈動効果。明滅の変化が大きく、サイズも変化するため目立ちます。
 * - sparkle: きらきら光る効果。ランダムな位置に小さな輝きが現れ、星のような印象に。
 * - twinkle: 脈動するきらきら効果。pulseとsparkleを組み合わせた派手な光り方です。
 * - flow: 左から右へ流れるような発光効果。光の帯が横方向に流れる演出に。
 * - scan: スキャンライン効果。左から右へ光の線が移動し、ハイテクな印象を与えます。
 * - ripple: 中心から広がる波紋のような発光効果。水面の波紋のように広がります。
 *
 * 【アニメーションスタイル】
 * - breath: 画像の中心を基準に、ふわふわと浮遊するようなアニメーション。
 *   縦横にゆっくりと動き、自然な浮遊感を表現します。
 * - bounce: 軽やかに跳ねるアニメーション。
 *   重力に逆らって跳ね返るような動きで、軽快な印象を与えます。
 * - shake: 小刻みに振動するアニメーション。
 *   不規則な震えで、恐怖や不安、寒さなどの表現に最適です。
 * - slide: 横方向に滑らかに揺れるアニメーション。
 *   穏やかな左右の動きで、浮遊感や不安定さを表現できます。
 * - zigzag: Z字型に動くアニメーション。
 *   規則的な直線的動きで、機械的な動きや意図的な移動を表現します。
 * - rotary: 画像の中心を軸として円を描くように回転するアニメーション。
 *   画像自体は回転せず、位置だけが円運動します。
 *
 * 【使用方法】
 * プラグインコマンドまたはスクリプトで簡単に設定できます。
 * 発光効果とアニメーションは組み合わせることができます。
 *
 * 【プラグインコマンド】
 * - glowPicture: ピクチャの発光効果を設定します
 *
 * - setBrightness: ピクチャの明るさを設定します
 *
 * - animatePicture: ピクチャのアニメーションを設定します
 *
 * - debug: デバッグモードの切り替え
 *
 * 【スクリプトコマンド】
 * - glowPicture(id, enabled, [style], [color], [intensity], [opacity], [speed])
 * - setBrightness(id, brightness)
 * - animatePicture(id, enabled, [style], [power], [speed])
 * - testPictureGlow(id, [enabled])
 *
 * 【スクリプト使用例】
 * glowPicture(1, true, "pulse", "#ff0000", 20, 150, 5);  // ピクチャ1に赤い脈動エフェクト
 * animatePicture(1, true, "breath", 5, 5);  // ピクチャ1にふわふわ浮遊アニメーション
 *
 * 【組み合わせ例】
 * - 人物立ち絵に「soft_pulse」と「breath」を組み合わせると、生命感のある自然な動きに
 * - 重要アイテムに「sparkle」と「bounce」で注目を集める演出に
 * - 機械的な装置に「scan」と「rotary」でSF的な印象を与える
 * - ホラー演出に「ripple」と「shake」で不気味な雰囲気を作り出す
 *
 * @param DefaultGlowStyle
 * @text デフォルト発光スタイル
 * @desc 発光効果のデフォルトスタイルを設定します
 * @type select
 * @option 穏やかな脈動
 * @value soft_pulse
 * @option 強い脈動
 * @value pulse
 * @option きらきら光る
 * @value sparkle
 * @option 脈動するきらきら
 * @value twinkle
 * @option 流れるような発光
 * @value flow
 * @option スキャンライン
 * @value scan
 * @option 波紋のような発光
 * @value ripple
 * @default pulse
 *
 * @param DefaultGlowColor
 * @text デフォルト発光色
 * @desc 発光効果のデフォルト色をCSS色形式で設定します（例: #ff0000, rgba(255,0,0,0.5)）
 * @type string
 * @default #ffffff
 *
 * @param DefaultGlowIntensity
 * @text デフォルト発光強度
 * @desc 発光効果のデフォルト強度を設定します（1-100）
 * @type number
 * @min 1
 * @max 100
 * @default 20
 *
 * @param DefaultGlowOpacity
 * @text デフォルト発光透明度
 * @desc 発光効果のデフォルト透明度を設定します（0-255）
 * @type number
 * @min 0
 * @max 255
 * @default 128
 *
 * @param DefaultAnimationStyle
 * @text デフォルトアニメーションスタイル
 * @desc アニメーションのデフォルトスタイルを設定します
 * @type select
 * @option ふわふわ浮遊
 * @value breath
 * @option 跳ねる
 * @value bounce
 * @option 震える
 * @value shake
 * @option スライド
 * @value slide
 * @option ジグザグ
 * @value zigzag
 * @option 回転
 * @value rotary
 * @default breath
 *
 * @param DefaultAnimationPower
 * @text デフォルトアニメーション強度
 * @desc アニメーションのデフォルト強度を設定します（1-20）
 * @type number
 * @min 1
 * @max 20
 * @default 5
 *
 * @param AnimationSpeed
 * @text アニメーション速度
 * @desc 発光とアニメーションのデフォルト速度（1-20）
 * @type number
 * @min 1
 * @max 20
 * @default 5
 *
 * @param DebugMode
 * @text デバッグモード
 * @desc デバッグ情報をコンソールに出力します
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 *
 * @command glowPicture
 * @text 発光効果設定
 * @desc ピクチャに発光効果を適用します
 *
 * @arg pictureId
 * @text ピクチャID
 * @type number
 * @min 1
 * @desc 発光効果を適用するピクチャのID
 *
 * @arg enabled
 * @text 有効/無効
 * @type boolean
 * @on 有効
 * @off 無効
 * @desc 発光効果の有効/無効を設定します
 *
 * @arg style
 * @text 発光スタイル
 * @type select
 * @option 穏やかな脈動
 * @value soft_pulse
 * @option 強い脈動
 * @value pulse
 * @option きらきら光る
 * @value sparkle
 * @option 脈動するきらきら
 * @value twinkle
 * @option 流れるような発光
 * @value flow
 * @option スキャンライン
 * @value scan
 * @option 波紋のような発光
 * @value ripple
 * @desc 発光効果のスタイルを選択します
 *
 * @arg color
 * @text 発光色
 * @type string
 * @desc 発光の色をCSS形式で指定します（例: #ff0000, rgba(255,0,0,0.5)）
 *
 * @arg intensity
 * @text 発光強度
 * @type number
 * @min 1
 * @max 100
 * @desc 発光の強度を設定します（1-100）
 *
 * @arg opacity
 * @text 発光透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 発光効果の透明度を設定します（0-255）
 *
 * @arg speed
 * @text アニメーション速度
 * @type number
 * @min 1
 * @max 20
 * @desc 発光アニメーションの速度を設定します（1-20）
 *
 * @command setBrightness
 * @text 明るさ設定
 * @desc ピクチャの明るさを設定します
 *
 * @arg pictureId
 * @text ピクチャID
 * @type number
 * @min 1
 * @desc 明るさを設定するピクチャのID
 *
 * @arg brightness
 * @text 明るさ
 * @type number
 * @min 0
 * @max 200
 * @desc ピクチャの明るさを設定します（0-200, 100=通常）
 *
 * @command animatePicture
 * @text アニメーション設定
 * @desc ピクチャにアニメーション効果を適用します
 *
 * @arg pictureId
 * @text ピクチャID
 * @type number
 * @min 1
 * @desc アニメーションを適用するピクチャのID
 *
 * @arg enabled
 * @text 有効/無効
 * @type boolean
 * @on 有効
 * @off 無効
 * @desc アニメーション効果の有効/無効を設定します
 *
 * @arg style
 * @text アニメーションスタイル
 * @type select
 * @option ふわふわ浮遊
 * @value breath
 * @option 跳ねる
 * @value bounce
 * @option 震える
 * @value shake
 * @option スライド
 * @value slide
 * @option ジグザグ
 * @value zigzag
 * @option 回転
 * @value rotary
 * @desc アニメーションのスタイルを選択します
 *
 * @arg power
 * @text アニメーション強度
 * @type number
 * @min 1
 * @max 20
 * @desc アニメーションの強度を設定します（1-20）
 *
 * @arg speed
 * @text アニメーション速度
 * @type number
 * @min 1
 * @max 20
 * @desc アニメーションの速度を設定します（1-20）
 *
 * @command debug
 * @text デバッグモード
 * @desc デバッグモードの切り替え
 *
 * @arg enabled
 * @text 有効/無効
 * @type boolean
 * @on 有効
 * @off 無効
 * @desc デバッグモードの有効/無効を設定します
 */

(() => {
    "use strict";

    const pluginName = "SKM_PictureGlow";
    const parameters = PluginManager.parameters(pluginName);

    // プラグインパラメータの解析
    const defaultGlowStyle = parameters.DefaultGlowStyle || "pulse";
    const defaultGlowColor = parameters.DefaultGlowColor || "#FFFFFF";
    const defaultGlowIntensity = Number(parameters.DefaultGlowIntensity || 20);
    const defaultGlowOpacity = Number(parameters.DefaultGlowOpacity || 128);
    const defaultAnimationStyle = parameters.DefaultAnimationStyle || "breath";
    const defaultAnimationPower = Number(parameters.DefaultAnimationPower || 5);
    const animationSpeed = Number(parameters.AnimationSpeed || 5);
    const isDebugMode = parameters.DebugMode === "true";

    // デバッグ用ログ出力
    function debugLog(...args) {
        if ($gameSystem && $gameSystem._glowDebugMode) {
            console.log("[SKM_PictureGlow]", ...args);
        }
    }

    // 初期化時にデバッグログを出力
    console.log(
        `[SKM_PictureGlow] プラグイン初期化（デバッグモード: ${isDebugMode}）`
    );
    console.log(
        `パラメータ: 発光スタイル=${defaultGlowStyle}, 色=${defaultGlowColor}, 強度=${defaultGlowIntensity}, 不透明度=${defaultGlowOpacity}, 速度=${animationSpeed}`
    );
    console.log(
        `パラメータ: アニメーションスタイル=${defaultAnimationStyle}, アニメーション強度=${defaultAnimationPower}`
    );

    // アニメーションカウンタ
    let _animationCount = 0;

    // カラフルメニューから移植したアニメーションスタイル
    const animationStyles = {
        breath: {
            getScale(count, power) {
                const scale = 1 + Math.sin(count * 0.1) * (power * 0.01);
                return { x: scale, y: scale };
            },
            getOffset(count, power) {
                // より自然なふわふわ感のために縦方向の動きを強調
                const yOffset = Math.sin(count * 0.1) * (power * 0.5);
                // 横方向にわずかに動かして自然な揺れを表現
                const xOffset = Math.sin(count * 0.08) * (power * 0.2);
                return { x: xOffset, y: yOffset };
            },
            getRotation(count, power) {
                // 回転を削除
                return 0;
            },
        },
        bounce: {
            getScale(count, power) {
                const bounce =
                    Math.abs(Math.sin(count * 0.15)) * (power * 0.02);
                return { x: 1 + bounce, y: 1 + bounce };
            },
            getOffset(count, power) {
                const bounce = Math.abs(Math.sin(count * 0.15)) * (power * 1.6);
                return { x: 0, y: -bounce };
            },
            getRotation(count, power) {
                return 0; // 回転なし
            },
        },
        shake: {
            getScale(count, power) {
                return { x: 1, y: 1 }; // スケール変化なし
            },
            getOffset(count, power) {
                // より自然な震え方のためにランダム性を高める
                const randomX = Math.sin(count * 0.8 + 2.5) * (power * 0.3);
                const randomY = Math.cos(count * 1.1 + 1.3) * (power * 0.2);
                // 別の周波数も加えてより複雑な動きに
                const randomX2 = Math.sin(count * 1.5) * (power * 0.2);
                const randomY2 = Math.cos(count * 1.7) * (power * 0.15);

                return {
                    x: randomX + randomX2,
                    y: randomY + randomY2,
                };
            },
            getRotation(count, power) {
                // 回転は極小さくするか0に
                return 0;
            },
        },
        slide: {
            getScale(count, power) {
                return { x: 1, y: 1 }; // スケール変化なし
            },
            getOffset(count, power) {
                return {
                    x: Math.sin(count * 0.1) * (power * 2),
                    y: 0,
                };
            },
            getRotation(count, power) {
                return 0; // 回転なし
            },
        },
        zigzag: {
            getScale(count, power) {
                return { x: 1, y: 1 }; // スケール変化なし
            },
            getOffset(count, power) {
                // より明確なZ字型の動きを実現
                // 横方向は一定速度で左右に動く
                const baseX =
                    ((count % 60 < 30 ? count % 30 : 30 - (count % 30)) / 30) *
                    (power * 1.2);

                // 縦方向は階段状に上下する（ギザギザ感を強調）
                const baseY = (count % 40 < 20 ? 1 : -1) * (power * 0.4);

                return {
                    x: baseX - power * 0.6, // 中心よりやや左寄りに
                    y: baseY,
                };
            },
            getRotation(count, power) {
                // 回転を削除
                return 0;
            },
        },
        rotary: {
            getScale(count, power) {
                // スケール変化なし
                return { x: 1, y: 1 };
            },
            getOffset(count, power) {
                // 円運動による回転
                const radius = power * 0.8; // 回転半径を強度に比例
                const angle = count * 0.1; // 一定速度で回転
                return {
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                };
            },
            getRotation(count, power) {
                // 画像自体は回転させない
                return 0;
            },
        },
    };

    // 発光スタイルの定義
    const glowStyles = {
        soft_pulse: {
            // 穏やかな脈動（既存のpulseをリネーム）
            getGlowIntensity(count, intensity) {
                return intensity * (0.7 + 0.3 * Math.sin(count * 0.05));
            },
            getBrightness(count) {
                return 1.0 + 0.2 * Math.sin(count * 0.05);
            },
            applyEffect(ctx, bitmap, count, intensity, picture) {
                // パルス効果の処理（必要に応じて）
                // 現在設定されている色を取得して_extractRgba関数で処理可能に
                const currentColor = ctx.fillStyle;
                // RGBAに変換
                const alpha = 0.5 * (0.7 + 0.3 * Math.sin(count * 0.05));
                const color = this._extractRgba(currentColor, alpha);

                // 必要に応じて追加処理
            },

            // 色をRGBA形式に変換するヘルパーメソッド
            _extractRgba(color, alpha = 1.0) {
                // #RRGGBBまたは#RRGGBBAA形式の場合
                if (typeof color === "string" && color.startsWith("#")) {
                    const r = parseInt(color.substr(1, 2), 16);
                    const g = parseInt(color.substr(3, 2), 16);
                    const b = parseInt(color.substr(5, 2), 16);
                    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
                }
                // rgba形式の場合はそのまま利用（透明度だけ調整）
                else if (
                    typeof color === "string" &&
                    color.startsWith("rgba")
                ) {
                    const parts = color.match(
                        /rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*(?:\.\d+)?)\)/
                    );
                    if (parts) {
                        return `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, ${alpha})`;
                    }
                }
                // rgb形式の場合は透明度を追加
                else if (typeof color === "string" && color.startsWith("rgb")) {
                    const parts = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
                    if (parts) {
                        return `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, ${alpha})`;
                    }
                }

                // デフォルト値（色が解析できない場合は白を使用）
                return `rgba(255, 255, 255, ${alpha})`;
            },
        },
        pulse: {
            // 強い脈動（カラフルメニュー風）
            getGlowIntensity(count, intensity) {
                return intensity * (0.5 + Math.sin(count * 0.2)); // 変化幅を大きく
            },
            getBrightness(count) {
                const pulseWave = Math.sin(count * 0.2);
                return 0.2 + Math.max(0, pulseWave) * 0.6; // より明確な明るさの変化
            },
            applyEffect(ctx, bitmap, count, intensity, picture) {
                // スケール変化でサイズを脈動させる
                const scale = 1 + Math.sin(count * 0.2) * 0.1;
                const w = bitmap.width;
                const h = bitmap.height;
                const offsetX = (w * (scale - 1)) / 2;
                const offsetY = (h * (scale - 1)) / 2;

                // 現在設定されている色を取得
                const currentColor = ctx.fillStyle;

                ctx.globalCompositeOperation = "source-over";
                ctx.drawImage(
                    bitmap.canvas,
                    -offsetX,
                    -offsetY,
                    w * scale,
                    h * scale
                );
            },

            // 色をRGBA形式に変換するヘルパーメソッド
            _extractRgba(color, alpha = 1.0) {
                // #RRGGBBまたは#RRGGBBAA形式の場合
                if (typeof color === "string" && color.startsWith("#")) {
                    const r = parseInt(color.substr(1, 2), 16);
                    const g = parseInt(color.substr(3, 2), 16);
                    const b = parseInt(color.substr(5, 2), 16);
                    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
                }
                // rgba形式の場合はそのまま利用（透明度だけ調整）
                else if (
                    typeof color === "string" &&
                    color.startsWith("rgba")
                ) {
                    const parts = color.match(
                        /rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*(?:\.\d+)?)\)/
                    );
                    if (parts) {
                        return `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, ${alpha})`;
                    }
                }
                // rgb形式の場合は透明度を追加
                else if (typeof color === "string" && color.startsWith("rgb")) {
                    const parts = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
                    if (parts) {
                        return `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, ${alpha})`;
                    }
                }

                // デフォルト値（色が解析できない場合は白を使用）
                return `rgba(255, 255, 255, ${alpha})`;
            },
        },
        sparkle: {
            getGlowIntensity(count, intensity) {
                // きらきらエフェクトはランダムな強度変化のみ
                const base = intensity * 0.8;
                const sparkle = intensity * 0.2 * Math.random();
                return base + sparkle;
            },
            getBrightness(count) {
                return 1.0 + 0.2 * Math.random();
            },
            applyEffect(ctx, bitmap, count, intensity, picture) {
                // キラキラエフェクトの表現
                const w = bitmap.width;
                const h = bitmap.height;

                // 現在設定されている色を取得
                const currentColor = ctx.fillStyle;
                // RGBAに変換（透明度は強度に応じて調整）
                const color = this._extractRgba(currentColor, 0.8);

                // ランダムな位置に小さな輝きを追加
                for (let i = 0; i < 3; i++) {
                    const x = Math.random() * w;
                    const y = Math.random() * h;
                    const size = 2 + Math.random() * (intensity * 0.2);
                    ctx.globalCompositeOperation = "lighter";
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2, false);
                    ctx.fillStyle = color;
                    ctx.fill();
                }

                // 下から上に登っていくキラキラを追加（カラフルメニューと同様の動き）
                ctx.globalCompositeOperation = "lighter";
                for (let i = 0; i < 8; i++) {
                    // 複数の正弦波を組み合わせてきらきら感を出す
                    const sparkle1 = Math.sin(count * 0.5 + i) * 0.3;
                    const sparkle2 = Math.sin((count + i * 2) * 0.7) * 0.3;

                    // 横位置はランダムだが一定の範囲内に
                    const x =
                        w * 0.2 + (Math.sin(count * 0.1 + i) + 1) * (w * 0.3);

                    // 下から上へ移動する基本的な動き
                    const ySpeed = 1.5 + (i % 3) * 0.6; // 異なる速度で上昇
                    const baseY = h - ((count * ySpeed + i * 60) % (h * 1.2));

                    // 横方向にも少し揺れる
                    const y = baseY + Math.sin(count * 0.2 + i * 0.8) * 10;

                    // サイズは強度とランダム性に基づく
                    const sizeBase = 2 + intensity * 0.1;
                    const size =
                        sizeBase *
                        (1 + sparkle1 + sparkle2 + Math.random() * 0.5);

                    // 透明度は位置と時間に応じて変化（大幅に上げる）
                    const alphaBase = 0.95 + sparkle1 + sparkle2;
                    // 下部と上部で薄くなるよう調整
                    const yFactor = 1 - Math.abs((y - h * 0.5) / (h * 0.7));
                    const alpha = alphaBase * Math.max(0.3, yFactor);

                    const sparkleColor = this._extractRgba(currentColor, alpha);

                    // 輝きを強くする
                    ctx.fillStyle = sparkleColor;
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2, false);
                    ctx.fill();

                    // 二重に描画してさらに強調
                    ctx.globalCompositeOperation = "screen";
                    ctx.beginPath();
                    ctx.arc(x, y, size * 0.7, 0, Math.PI * 2, false);
                    ctx.fill();
                }
            },

            // 色をRGBA形式に変換するヘルパーメソッド
            _extractRgba(color, alpha = 1.0) {
                // #RRGGBBまたは#RRGGBBAA形式の場合
                if (typeof color === "string" && color.startsWith("#")) {
                    const r = parseInt(color.substr(1, 2), 16);
                    const g = parseInt(color.substr(3, 2), 16);
                    const b = parseInt(color.substr(5, 2), 16);
                    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
                }
                // rgba形式の場合はそのまま利用（透明度だけ調整）
                else if (
                    typeof color === "string" &&
                    color.startsWith("rgba")
                ) {
                    const parts = color.match(
                        /rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*(?:\.\d+)?)\)/
                    );
                    if (parts) {
                        return `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, ${alpha})`;
                    }
                }
                // rgb形式の場合は透明度を追加
                else if (typeof color === "string" && color.startsWith("rgb")) {
                    const parts = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
                    if (parts) {
                        return `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, ${alpha})`;
                    }
                }

                // デフォルト値（色が解析できない場合は白を使用）
                return `rgba(255, 255, 255, ${alpha})`;
            },
        },
        twinkle: {
            // 脈動するきらきら
            getGlowIntensity(count, intensity) {
                // カラフルメニューの強い脈動ベース
                const pulseIntensity =
                    intensity * (0.5 + Math.sin(count * 0.2));
                // きらきらエフェクト
                const sparkleBase = Math.sin(count * 0.5) * (intensity * 0.2);
                const sparkleRandom = Math.random() * (intensity * 0.1);
                return pulseIntensity + sparkleBase + sparkleRandom;
            },
            getBrightness(count) {
                const pulseWave = Math.sin(count * 0.2);
                return 0.2 + Math.max(0, pulseWave) * 0.6 + Math.random() * 0.2;
            },
            applyEffect(ctx, bitmap, count, intensity, picture) {
                // キラキラエフェクトの表現
                const w = bitmap.width;
                const h = bitmap.height;
                const pulseScale = 1 + Math.sin(count * 0.2) * 0.1;

                // 現在設定されている色を取得
                const currentColor = ctx.fillStyle;
                // RGBAに変換（透明度は強度に応じて調整）
                const color = this._extractRgba(currentColor, 0.8);

                // スケール変化でサイズを脈動させる
                ctx.globalCompositeOperation = "source-over";
                const offsetX = (w * (pulseScale - 1)) / 2;
                const offsetY = (h * (pulseScale - 1)) / 2;
                ctx.drawImage(
                    bitmap.canvas,
                    -offsetX,
                    -offsetY,
                    w * pulseScale,
                    h * pulseScale
                );

                // きらきらエフェクトを追加
                ctx.globalCompositeOperation = "lighter";
                for (let i = 0; i < 4; i++) {
                    const x = Math.random() * w;
                    const y = Math.random() * h;
                    const size =
                        (2 + Math.random() * (intensity * 0.2)) * pulseScale;

                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2, false);
                    ctx.fillStyle = color;
                    ctx.fill();
                }

                // 下から上に登っていくキラキラを追加（脈動要素を加えた改良版）
                const pulseWave = Math.sin(count * 0.2);
                const pulseIntensity = 0.5 + Math.max(0, pulseWave) * 0.5;

                // 色をより明確にするために描画順を調整
                ctx.globalCompositeOperation = "lighter";

                for (let i = 0; i < 10; i++) {
                    // 脈動と連動した効果
                    const sparklePhase = count * 0.1 + i * 0.5;
                    const sparkle1 =
                        Math.sin(sparklePhase) * 0.4 * pulseIntensity;
                    const sparkle2 =
                        Math.cos(sparklePhase * 1.3) * 0.3 * pulseIntensity;

                    // 横位置はランダムだが一定の範囲内に
                    const xRatio = (i % 5) / 5; // 画面幅に均等に分布
                    const x =
                        w * (0.1 + xRatio * 0.8) +
                        Math.sin(count * 0.2 + i) * 20;

                    // 下から上へ移動する基本的な動き（脈動と連動）
                    const ySpeed =
                        (2 + (i % 4) * 0.8) * (0.8 + pulseIntensity * 0.4);
                    const yOffset = h * 1.5 * (i / 10); // 各キラキラの初期位置をずらす
                    const baseY = h - ((count * ySpeed + yOffset) % (h * 1.5));

                    // 横方向にも揺れる（脈動と連動）
                    const waveAmplitude = 15 * pulseIntensity;
                    const y =
                        baseY + Math.sin(count * 0.1 + i * 0.7) * waveAmplitude;

                    // サイズも脈動と連動（より大きく）
                    const sizeBase = (3 + intensity * 0.2) * pulseScale;
                    const size =
                        sizeBase *
                        (1 + sparkle1 + sparkle2 + Math.random() * 0.3);

                    // 透明度も脈動と連動（大幅に上げる）
                    const alphaBase = 0.95 * pulseIntensity;
                    // 下部と上部で薄くなるよう調整
                    const yFactor = 1 - Math.abs((y - h * 0.5) / (h * 0.7));
                    const alpha = alphaBase * Math.max(0.3, yFactor);

                    const sparkleColor = this._extractRgba(currentColor, alpha);

                    // メインの円を描画
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2, false);
                    ctx.fillStyle = sparkleColor;
                    ctx.fill();

                    // ハイライト効果を追加（二重の円でより鮮明に）
                    ctx.globalCompositeOperation = "screen";
                    ctx.beginPath();
                    ctx.arc(x, y, size * 0.7, 0, Math.PI * 2, false);
                    ctx.fillStyle = sparkleColor;
                    ctx.fill();

                    // アウターグローを追加
                    ctx.globalCompositeOperation = "lighter";
                    const glowSize = size * 1.5;
                    const glowGradient = ctx.createRadialGradient(
                        x,
                        y,
                        size * 0.5,
                        x,
                        y,
                        glowSize
                    );
                    glowGradient.addColorStop(0, sparkleColor);
                    glowGradient.addColorStop(
                        1,
                        this._extractRgba(currentColor, 0)
                    );

                    ctx.beginPath();
                    ctx.arc(x, y, glowSize, 0, Math.PI * 2, false);
                    ctx.fillStyle = glowGradient;
                    ctx.fill();
                }
            },

            // 色をRGBA形式に変換するヘルパーメソッド
            _extractRgba(color, alpha = 1.0) {
                // #RRGGBBまたは#RRGGBBAA形式の場合
                if (typeof color === "string" && color.startsWith("#")) {
                    const r = parseInt(color.substr(1, 2), 16);
                    const g = parseInt(color.substr(3, 2), 16);
                    const b = parseInt(color.substr(5, 2), 16);
                    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
                }
                // rgba形式の場合はそのまま利用（透明度だけ調整）
                else if (
                    typeof color === "string" &&
                    color.startsWith("rgba")
                ) {
                    const parts = color.match(
                        /rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*(?:\.\d+)?)\)/
                    );
                    if (parts) {
                        return `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, ${alpha})`;
                    }
                }
                // rgb形式の場合は透明度を追加
                else if (typeof color === "string" && color.startsWith("rgb")) {
                    const parts = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
                    if (parts) {
                        return `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, ${alpha})`;
                    }
                }

                // デフォルト値（色が解析できない場合は白を使用）
                return `rgba(255, 255, 255, ${alpha})`;
            },
        },
        flow: {
            getGlowIntensity(count, intensity) {
                return intensity;
            },
            getBrightness(count) {
                return 1.0;
            },
            getGlowGradient(ctx, rect, count, color) {
                const gradient = ctx.createLinearGradient(
                    rect.x - rect.width,
                    rect.y,
                    rect.x + rect.width * 2,
                    rect.y
                );

                const position = (count % 100) / 100;
                gradient.addColorStop(
                    Math.max(0, position - 0.3),
                    "rgba(0, 0, 0, 0.2)"
                );
                gradient.addColorStop(position, color);
                gradient.addColorStop(
                    Math.min(1, position + 0.3),
                    "rgba(0, 0, 0, 0.2)"
                );

                return gradient;
            },
            applyEffect(ctx, bitmap, count, intensity, picture) {
                const w = bitmap.width;
                const h = bitmap.height;

                // 流れる発光エフェクトを適用
                ctx.globalCompositeOperation = "lighter";

                // 現在設定されている色を取得
                const currentColor = ctx.fillStyle;
                // RGBAに変換（透明度は強度に応じて調整）
                const color = this._extractRgba(currentColor, 0.8);
                const transparent = this._extractRgba(currentColor, 0);

                const gradient = ctx.createLinearGradient(-w, 0, w * 2, 0);
                const position = (count * 0.02) % 2;

                gradient.addColorStop(Math.max(0, position - 0.3), transparent);
                gradient.addColorStop(position, color);
                gradient.addColorStop(Math.min(1, position + 0.3), transparent);

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, w, h);
            },

            // 色をRGBA形式に変換するヘルパーメソッド
            _extractRgba(color, alpha = 1.0) {
                // #RRGGBBまたは#RRGGBBAA形式の場合
                if (typeof color === "string" && color.startsWith("#")) {
                    const r = parseInt(color.substr(1, 2), 16);
                    const g = parseInt(color.substr(3, 2), 16);
                    const b = parseInt(color.substr(5, 2), 16);
                    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
                }
                // rgba形式の場合はそのまま利用（透明度だけ調整）
                else if (
                    typeof color === "string" &&
                    color.startsWith("rgba")
                ) {
                    const parts = color.match(
                        /rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*(?:\.\d+)?)\)/
                    );
                    if (parts) {
                        return `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, ${alpha})`;
                    }
                }
                // rgb形式の場合は透明度を追加
                else if (typeof color === "string" && color.startsWith("rgb")) {
                    const parts = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
                    if (parts) {
                        return `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, ${alpha})`;
                    }
                }

                // デフォルト値（色が解析できない場合は白を使用）
                return `rgba(255, 255, 255, ${alpha})`;
            },
        },
        scan: {
            getGlowIntensity(count, intensity) {
                return intensity;
            },
            getBrightness(count) {
                return 1.0;
            },
            applyEffect(ctx, bitmap, count, intensity, picture) {
                const w = bitmap.width;
                const h = bitmap.height;

                // 元の画像の形状を保持
                ctx.globalCompositeOperation = "source-in";

                // 現在設定されている色を取得
                const currentColor = ctx.fillStyle;
                // RGBAに変換（透明度は強度に応じて調整）
                const color = this._extractRgba(currentColor, intensity * 0.01);

                // スキャンラインの作成
                const scanX = ((count * 2) % (w * 2)) - w / 2; // 左から右へスキャン
                const lineWidth = 20; // 光る線の幅

                const gradient = ctx.createLinearGradient(
                    scanX - lineWidth,
                    0,
                    scanX + lineWidth,
                    0
                );
                gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
                gradient.addColorStop(0.5, color);
                gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, w, h);
            },

            // 色をRGBA形式に変換するヘルパーメソッド
            _extractRgba(color, alpha = 1.0) {
                // #RRGGBBまたは#RRGGBBAA形式の場合
                if (typeof color === "string" && color.startsWith("#")) {
                    const r = parseInt(color.substr(1, 2), 16);
                    const g = parseInt(color.substr(3, 2), 16);
                    const b = parseInt(color.substr(5, 2), 16);
                    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
                }
                // rgba形式の場合はそのまま利用（透明度だけ調整）
                else if (
                    typeof color === "string" &&
                    color.startsWith("rgba")
                ) {
                    const parts = color.match(
                        /rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*(?:\.\d+)?)\)/
                    );
                    if (parts) {
                        return `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, ${alpha})`;
                    }
                }
                // rgb形式の場合は透明度を追加
                else if (typeof color === "string" && color.startsWith("rgb")) {
                    const parts = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
                    if (parts) {
                        return `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, ${alpha})`;
                    }
                }

                // デフォルト値（色が解析できない場合は白を使用）
                return `rgba(255, 255, 255, ${alpha})`;
            },
        },
        ripple: {
            getGlowIntensity(count, intensity) {
                return intensity;
            },
            getBrightness(count) {
                return 1.0;
            },
            getGlowGradient(ctx, rect, count, color) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const radius = Math.max(rect.width, rect.height) * 0.75;

                const gradient = ctx.createRadialGradient(
                    centerX,
                    centerY,
                    0,
                    centerX,
                    centerY,
                    radius
                );

                const phase = (count * 0.05) % 1;

                gradient.addColorStop(0, color);
                gradient.addColorStop(0.2 + phase * 0.3, color);
                gradient.addColorStop(0.3 + phase * 0.3, "rgba(0, 0, 0, 0)");
                gradient.addColorStop(0.4 + phase * 0.3, color);
                gradient.addColorStop(0.6 + phase * 0.3, "rgba(0, 0, 0, 0)");
                gradient.addColorStop(0.8 + phase * 0.2, color);
                gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

                return gradient;
            },
            applyEffect(ctx, bitmap, count, intensity, picture) {
                const w = bitmap.width;
                const h = bitmap.height;
                const centerX = w / 2;
                const centerY = h / 2;
                const maxRadius = Math.max(w, h) * 0.75;

                // 元の画像の形状を保持
                ctx.globalCompositeOperation = "lighter";

                // 現在設定されている色を取得
                const currentColor = ctx.fillStyle;
                // RGBAに変換（透明度は強度に応じて調整）
                const colorBright = this._extractRgba(
                    currentColor,
                    intensity * 0.01
                );
                const colorMedium = this._extractRgba(
                    currentColor,
                    intensity * 0.005
                );
                const colorTransparent = this._extractRgba(currentColor, 0);

                // 波紋エフェクトの作成
                const phase = (count * 0.05) % 1;
                const innerRadius = phase * maxRadius;
                const outerRadius = Math.min(
                    maxRadius,
                    innerRadius + maxRadius * 0.2
                );

                const gradient = ctx.createRadialGradient(
                    centerX,
                    centerY,
                    innerRadius,
                    centerX,
                    centerY,
                    outerRadius
                );

                gradient.addColorStop(0, colorBright);
                gradient.addColorStop(0.5, colorMedium);
                gradient.addColorStop(1, colorTransparent);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2, false);
                ctx.fill();
            },

            // 色をRGBA形式に変換するヘルパーメソッド
            _extractRgba(color, alpha = 1.0) {
                // #RRGGBBまたは#RRGGBBAA形式の場合
                if (typeof color === "string" && color.startsWith("#")) {
                    const r = parseInt(color.substr(1, 2), 16);
                    const g = parseInt(color.substr(3, 2), 16);
                    const b = parseInt(color.substr(5, 2), 16);
                    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
                }
                // rgba形式の場合はそのまま利用（透明度だけ調整）
                else if (
                    typeof color === "string" &&
                    color.startsWith("rgba")
                ) {
                    const parts = color.match(
                        /rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*(?:\.\d+)?)\)/
                    );
                    if (parts) {
                        return `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, ${alpha})`;
                    }
                }
                // rgb形式の場合は透明度を追加
                else if (typeof color === "string" && color.startsWith("rgb")) {
                    const parts = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
                    if (parts) {
                        return `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, ${alpha})`;
                    }
                }

                // デフォルト値（色が解析できない場合は白を使用）
                return `rgba(255, 255, 255, ${alpha})`;
            },
        },
    };

    // Game_Systemの初期化を拡張
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        _Game_System_initialize.call(this);
        this._glowDebugMode = isDebugMode;
    };

    // Game_Pictureクラスを拡張して発光情報を保存
    const _Game_Picture_initialize = Game_Picture.prototype.initialize;
    Game_Picture.prototype.initialize = function () {
        _Game_Picture_initialize.call(this);
        this._glowEnabled = false;
        this._glowStyle = defaultGlowStyle;
        this._glowColor = defaultGlowColor;
        this._glowIntensity = defaultGlowIntensity;
        this._glowOpacity = defaultGlowOpacity;
        this._glowSpeed = animationSpeed;

        // アニメーション用の追加プロパティ
        this._animationEnabled = false;
        this._animationStyle = defaultAnimationStyle;
        this._animationPower = defaultAnimationPower;
        this._animationSpeed = animationSpeed;

        this._needsUpdate = true;
        debugLog("Game_Picture初期化", this);
    };

    // スプライトの更新処理
    Sprite_Picture.prototype.updateGlowEffect = function () {
        const picture = this.picture();
        if (!picture || !picture._glowEnabled) {
            if (this._glowEffect) {
                this._glowEffect.visible = false;
            }
            return;
        }

        // 発光エフェクトがまだ作成されていない場合
        if (!this._glowEffect) {
            this._createGlowEffect();
        }

        // 発光エフェクトの更新
        if (this._glowEffect && this.bitmap && this.bitmap.isReady()) {
            this._glowEffect.visible = true;
            this._glowEffect.opacity = picture._glowOpacity;

            // 発光スタイルを適用
            const style = glowStyles[picture._glowStyle];
            if (!style) {
                console.error(
                    `[SKM_PictureGlow] 不明な発光スタイル: ${picture._glowStyle}`
                );
                return;
            }

            // 発光の強度や色を更新
            this._updateGlowBitmap(style, picture);
        }
    };

    // 発光エフェクトの作成
    Sprite_Picture.prototype._createGlowEffect = function () {
        if (!this.bitmap || !this.bitmap.isReady()) {
            return;
        }

        try {
            // エフェクトスプライトを作成
            this._glowEffect = new Sprite();
            this._glowEffect.bitmap = new Bitmap(
                this.bitmap.width,
                this.bitmap.height
            );
            this._glowEffect.blendMode = 1; // 加算合成
            this.addChild(this._glowEffect);

            debugLog(`発光エフェクト作成: pictureId=${this._pictureId}`);
        } catch (e) {
            console.error("[SKM_PictureGlow] 発光エフェクト作成エラー:", e);
        }
    };

    // 発光ビットマップの更新
    Sprite_Picture.prototype._updateGlowBitmap = function (style, picture) {
        try {
            const effectBitmap = this._glowEffect.bitmap;
            effectBitmap.clear();

            const ctx = effectBitmap.context;

            // 元の画像の形状を取得
            ctx.globalCompositeOperation = "source-over";
            ctx.drawImage(this.bitmap.canvas, 0, 0);

            // 発光スタイルを適用
            ctx.globalCompositeOperation = "source-in";
            ctx.fillStyle = picture._glowColor;
            ctx.fillRect(0, 0, effectBitmap.width, effectBitmap.height);

            // ぼかし効果
            const blurAmount = Math.floor(picture._glowIntensity / 2);
            if (blurAmount > 0) {
                ctx.filter = `blur(${blurAmount}px)`;
                ctx.globalCompositeOperation = "source-over";
                ctx.drawImage(effectBitmap.canvas, 0, 0);
                ctx.filter = "none";
            }

            // アニメーションカウントの更新
            _animationCount += picture._glowSpeed * 0.1;

            // 発光スタイル特有のエフェクトを適用
            if (style.applyEffect) {
                style.applyEffect(
                    ctx,
                    effectBitmap,
                    _animationCount,
                    picture._glowIntensity,
                    picture
                );
            }

            // ビットマップを更新
            effectBitmap._baseTexture.update();
        } catch (e) {
            console.error("[SKM_PictureGlow] 発光ビットマップ更新エラー:", e);
        }
    };

    // プラグインコマンドの登録
    PluginManager.registerCommand(
        "SKM_PictureGlow",
        "glowPicture",
        function (args) {
            const pictureId = Number(args.pictureId || 0);
            const enabled = args.enabled === "true";
            const style = args.style || defaultGlowStyle;
            const color = args.color || defaultGlowColor;
            const intensity = Number(args.intensity || defaultGlowIntensity);
            const opacity = Number(args.opacity || defaultGlowOpacity);
            const speed = Number(args.speed || animationSpeed);

            if (pictureId > 0) {
                const picture = $gameScreen.picture(pictureId);
                if (picture) {
                    picture._glowEnabled = enabled;
                    if (enabled) {
                        picture._glowStyle = style;
                        picture._glowColor = color;
                        picture._glowIntensity = intensity;
                        picture._glowOpacity = opacity;
                        picture._glowSpeed = speed;
                    }
                    picture._needsUpdate = true;
                    debugLog(
                        `ピクチャ#${pictureId}の発光設定: ${
                            enabled ? "有効" : "無効"
                        }, スタイル=${style}, 色=${color}, 強度=${intensity}, 不透明度=${opacity}, 速度=${speed}`
                    );
                } else {
                    console.error(
                        `[SKM_PictureGlow] ピクチャ#${pictureId}が見つかりません`
                    );
                }
            } else {
                console.error(
                    "[SKM_PictureGlow] 無効なピクチャIDです:",
                    pictureId
                );
            }
        }
    );

    // 明るさ設定コマンド
    PluginManager.registerCommand(
        "SKM_PictureGlow",
        "setBrightness",
        function (args) {
            const pictureId = Number(args.pictureId || 0);
            const brightness = Number(args.brightness || 100);

            if (pictureId > 0) {
                const picture = $gameScreen.picture(pictureId);
                if (picture) {
                    if (!picture._colorTone) {
                        picture._colorTone = [0, 0, 0, 0];
                    }

                    // 明るさに応じてカラートーンを設定
                    const tone = Math.floor((brightness - 100) * 2.55);
                    picture._colorTone = [tone, tone, tone, 0];

                    debugLog(
                        `ピクチャ#${pictureId}の明るさ設定: ${brightness}%, トーン=${tone}`
                    );
                } else {
                    console.error(
                        `[SKM_PictureGlow] ピクチャ#${pictureId}が見つかりません`
                    );
                }
            } else {
                console.error(
                    "[SKM_PictureGlow] 無効なピクチャIDです:",
                    pictureId
                );
            }
        }
    );

    // アニメーション設定コマンド
    PluginManager.registerCommand(
        "SKM_PictureGlow",
        "animatePicture",
        function (args) {
            const pictureId = Number(args.pictureId || 0);
            const enabled = args.enabled === "true";
            const style = args.style || defaultAnimationStyle;
            const power = Number(args.power || defaultAnimationPower);
            const speed = Number(args.speed || animationSpeed);

            if (pictureId > 0) {
                const picture = $gameScreen.picture(pictureId);
                if (picture) {
                    picture._animationEnabled = enabled;
                    if (enabled) {
                        picture._animationStyle = style;
                        picture._animationPower = power;
                        picture._animationSpeed = speed;
                    }
                    picture._needsUpdate = true;
                    debugLog(
                        `ピクチャ#${pictureId}のアニメーション設定: ${
                            enabled ? "有効" : "無効"
                        }, スタイル=${style}, 強度=${power}, 速度=${speed}`
                    );
                } else {
                    console.error(
                        `[SKM_PictureGlow] ピクチャ#${pictureId}が見つかりません`
                    );
                }
            } else {
                console.error(
                    "[SKM_PictureGlow] 無効なピクチャIDです:",
                    pictureId
                );
            }
        }
    );

    // デバッグコマンド
    PluginManager.registerCommand("SKM_PictureGlow", "debug", function (args) {
        const enabled = args.enabled === "true";
        $gameSystem._glowDebugMode = enabled;
        console.log(
            `[SKM_PictureGlow] デバッグモード: ${enabled ? "有効" : "無効"}`
        );
    });

    // Sprite_Pictureクラスの拡張
    const _Sprite_Picture_initialize = Sprite_Picture.prototype.initialize;
    Sprite_Picture.prototype.initialize = function (pictureId) {
        _Sprite_Picture_initialize.call(this, pictureId);
        this._glowEffect = null;
        this._glowDirty = false;
        this._pictureId = pictureId;

        // アニメーション用の変数を初期化
        this._originalX = undefined; // updateで実際の座標を設定するため、未定義に
        this._originalY = undefined;
        this._originalRotation = 0;
        this._animationCount = 0;

        debugLog(`Sprite_Picture#${pictureId}初期化`);
    };

    // Sprite_Pictureのupdateを拡張
    const _Sprite_Picture_update = Sprite_Picture.prototype.update;
    Sprite_Picture.prototype.update = function () {
        // 元の更新処理を実行
        _Sprite_Picture_update.call(this);

        // 現在の位置を保持（アニメーション用の基準位置として使用）
        if (this._originalX === undefined || this._originalY === undefined) {
            this._originalX = this.x;
            this._originalY = this.y;
            this._originalRotation = this.rotation || 0;
            this._animationCount = 0;
        }

        // 発光効果とアニメーションの更新
        this.updateGlowEffect();
        this.updateAnimation();
    };

    // アニメーション処理を追加
    Sprite_Picture.prototype.updateAnimation = function () {
        const picture = this.picture();
        if (!picture || !picture._animationEnabled) {
            // アニメーションが無効の場合は元の位置に戻すだけで、スケールや座標は変更しない
            return;
        }

        // 初回のみ元の座標を保存
        if (this._animationCount === 0) {
            this._originalX = this.x;
            this._originalY = this.y;
            this._originalRotation = this.rotation;
        }

        // アニメーションカウントを更新
        this._animationCount += picture._animationSpeed * 0.1;

        // アニメーションスタイルの取得
        const style = animationStyles[picture._animationStyle];
        if (!style) {
            console.error(
                `[SKM_PictureGlow] 不明なアニメーションスタイル: ${picture._animationStyle}`
            );
            return;
        }

        // スケール、オフセット、回転を適用
        const scale = style.getScale(
            this._animationCount,
            picture._animationPower
        );
        const offset = style.getOffset(
            this._animationCount,
            picture._animationPower
        );
        const rotation = style.getRotation(
            this._animationCount,
            picture._animationPower
        );

        // スケールの適用（単純にスケールを変更）
        this.scale.x = scale.x;
        this.scale.y = scale.y;

        // オフセットの適用（元の位置にオフセットを追加）
        this.x = this._originalX + offset.x;
        this.y = this._originalY + offset.y;

        // 回転の適用
        this.rotation = this._originalRotation + rotation;
    };

    // スクリプト用関数
    window.glowPicture = function (
        pictureId,
        enabled,
        style,
        color,
        intensity,
        opacity,
        speed
    ) {
        if (!$gameScreen || !$gameScreen.picture(pictureId)) {
            console.error(
                `[SKM_PictureGlow] ピクチャ#${pictureId}が見つかりません`
            );
            return false;
        }

        const picture = $gameScreen.picture(pictureId);
        picture._glowEnabled = enabled;
        if (enabled) {
            picture._glowStyle = style || defaultGlowStyle;
            picture._glowColor = color || defaultGlowColor;
            picture._glowIntensity = intensity || defaultGlowIntensity;
            picture._glowOpacity = opacity || defaultGlowOpacity;
            picture._glowSpeed = speed || animationSpeed;
        }
        picture._needsUpdate = true;
        return true;
    };

    window.setBrightness = function (pictureId, brightness) {
        if (!$gameScreen || !$gameScreen.picture(pictureId)) {
            console.error(
                `[SKM_PictureGlow] ピクチャ#${pictureId}が見つかりません`
            );
            return false;
        }

        const picture = $gameScreen.picture(pictureId);
        if (!picture._colorTone) {
            picture._colorTone = [0, 0, 0, 0];
        }

        // 明るさに応じてカラートーンを設定
        const tone = Math.floor((brightness - 100) * 2.55);
        picture._colorTone = [tone, tone, tone, 0];
        return true;
    };

    window.animatePicture = function (pictureId, enabled, style, power, speed) {
        if (!$gameScreen || !$gameScreen.picture(pictureId)) {
            console.error(
                `[SKM_PictureGlow] ピクチャ#${pictureId}が見つかりません`
            );
            return false;
        }

        const picture = $gameScreen.picture(pictureId);
        picture._animationEnabled = enabled;
        if (enabled) {
            picture._animationStyle = style || defaultAnimationStyle;
            picture._animationPower = power || defaultAnimationPower;
            picture._animationSpeed = speed || animationSpeed;
        }
        picture._needsUpdate = true;
        return true;
    };

    window.testPictureGlow = function (pictureId, enabled = true) {
        if (!$gameScreen || !$gameScreen.picture(pictureId)) {
            console.error(
                `[SKM_PictureGlow] ピクチャ#${pictureId}が見つかりません`
            );
            return false;
        }

        // デバッグモードをON
        $gameSystem._glowDebugMode = true;

        // ピクチャ情報を出力
        const picture = $gameScreen.picture(pictureId);
        console.log(`[SKM_PictureGlow] テスト - ピクチャ#${pictureId}:`, {
            name: picture.name(),
            position: `(${picture.x()}, ${picture.y()})`,
            scale: `(${picture.scaleX()}, ${picture.scaleY()})`,
            opacity: picture.opacity(),
        });

        // 発光効果をテスト適用
        if (enabled) {
            glowPicture(pictureId, true, "pulse", "#FF0000", 30, 150, 5);
            console.log(`[SKM_PictureGlow] 発光効果を適用しました`);
        } else {
            glowPicture(pictureId, false);
            console.log(`[SKM_PictureGlow] 発光効果をOFFにしました`);
        }

        return true;
    };
})();
