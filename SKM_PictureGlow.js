/*:
 * @target MZ
 * @plugindesc v1.4.0 ピクチャに発光効果とアニメーションを適用するプラグイン
 * @author SKM
 * @url
 *
 * @help
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * 【ピクチャ発光・アニメーションプラグイン】
 * SKM_PictureGlow.js
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 *
 * ピクチャに発光効果とアニメーションを適用できるプラグインです。
 *
 * 【発光エフェクト】
 * 発光スタイル：
 * - pulse: 脈動する発光効果
 * - sparkle: キラキラ光る効果
 * - flow: 流れるような発光
 * - ripple: 波紋のような発光
 *
 * 【アニメーションスタイル】
 * - breath: ふわふわと浮遊するアニメーション
 * - bounce: 軽やかに跳ねるアニメーション
 * - shake: 小刻みに振動するアニメーション
 * - slide: 横方向に揺れるアニメーション
 * - zigzag: ギザギザと動くアニメーション
 * - rotary: 回転するアニメーション
 *
 * 【プラグインコマンド】
 * - glowPicture: ピクチャの発光効果を設定します
 *   必須引数: pictureId, enabled
 *   オプション: style, color, intensity, opacity, speed
 *
 * - setBrightness: ピクチャの明るさを設定します
 *   必須引数: pictureId, brightness
 *
 * - animatePicture: ピクチャのアニメーションを設定します
 *   必須引数: pictureId, enabled
 *   オプション: style, power, speed
 *
 * - debug: デバッグモードの切り替え
 *   引数: enabled
 *
 *
 *  発光効果とアニメーションは組み合わせることができます
 *
 *
 *
 *
 * 【スクリプトコマンド】
 * - glowPicture(id, enabled, [style], [color], [intensity], [opacity], [speed])
 * - setBrightness(id, brightness)
 * - animatePicture(id, enabled, [style], [power], [speed])
 * - testPictureGlow(id, [enabled])
 *
 * @param DefaultGlowStyle
 * @text デフォルト発光スタイル
 * @desc 発光効果のデフォルトスタイルを設定します
 * @type select
 * @option 脈動する発光
 * @value pulse
 * @option キラキラ光る
 * @value sparkle
 * @option 流れるような発光
 * @value flow
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
 * @option 脈動する発光
 * @value pulse
 * @option キラキラ光る
 * @value sparkle
 * @option 流れるような発光
 * @value flow
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
                return { x: 0, y: Math.sin(count * 0.1) * (power * 0.4) };
            },
            getRotation(count, power) {
                return 0; // 回転なし
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
                return {
                    x: Math.sin(count * 0.8) * (power * 0.4),
                    y: Math.cos(count * 0.7) * (power * 0.2),
                };
            },
            getRotation(count, power) {
                return Math.sin(count * 0.6) * (power * 0.02); // 少し回転
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
                const baseX = Math.sin(count * 0.2) * (power * 0.8);
                const zigX = Math.sin(count * 0.6) * (power * 0.4);
                const zigY = Math.cos(count * 0.4) * (power * 0.6);
                return {
                    x: baseX + zigX,
                    y: zigY,
                };
            },
            getRotation(count, power) {
                return Math.sin(count * 0.3) * (power * 0.04); // ジグザグに合わせて少し回転
            },
        },
        rotary: {
            getScale(count, power) {
                const scale = 1 + Math.sin(count * 0.2) * (power * 0.01);
                return { x: scale, y: scale };
            },
            getOffset(count, power) {
                const radius = power * 0.6;
                const angle = count * 0.1;
                return {
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                };
            },
            getRotation(count, power) {
                return count * 0.05 * (power * 0.05); // 連続的に回転
            },
        },
    };

    // 発光スタイルの定義
    const glowStyles = {
        pulse: {
            getGlowIntensity(count, intensity) {
                return intensity * (0.7 + 0.3 * Math.sin(count * 0.05));
            },
            getBrightness(count) {
                return 1.0 + 0.2 * Math.sin(count * 0.05);
            },
            applyEffect(ctx, bitmap, count, intensity) {
                // パルス効果の追加処理（必要に応じて）
            },
        },
        sparkle: {
            getGlowIntensity(count, intensity) {
                const base = intensity * 0.7;
                const sparkle = intensity * 0.3 * Math.random();
                return base + sparkle;
            },
            getBrightness(count) {
                return 1.0 + 0.3 * Math.random();
            },
            applyEffect(ctx, bitmap, count, intensity) {
                // キラキラエフェクトの表現
                const w = bitmap.width;
                const h = bitmap.height;

                // ランダムな位置に小さな輝きを追加
                for (let i = 0; i < 3; i++) {
                    const x = Math.random() * w;
                    const y = Math.random() * h;
                    const size = 2 + Math.random() * (intensity * 0.2);

                    ctx.globalCompositeOperation = "lighter";
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2, false);
                    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                    ctx.fill();
                }
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
                const gradient = ctx.createLinearGradient(0, 0, rect.width, 0);
                const offset = (count * 0.01) % 2;

                gradient.addColorStop(
                    Math.max(0, offset - 1),
                    "rgba(0, 0, 0, 0)"
                );
                gradient.addColorStop(Math.max(0, offset - 0.5), color);
                gradient.addColorStop(Math.min(1, offset), "rgba(0, 0, 0, 0)");
                gradient.addColorStop(Math.min(1, offset + 0.5), color);
                gradient.addColorStop(
                    Math.min(1, offset + 1),
                    "rgba(0, 0, 0, 0)"
                );

                return gradient;
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
                    picture._glowIntensity
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
        this._originalX = 0;
        this._originalY = 0;
        this._originalRotation = 0;
        this._animationCount = 0;
        debugLog(`Sprite_Picture#${pictureId}初期化`);
    };

    // Sprite_Pictureのupdateを拡張
    const _Sprite_Picture_update = Sprite_Picture.prototype.update;
    Sprite_Picture.prototype.update = function () {
        _Sprite_Picture_update.call(this);
        this.updateGlowEffect();
        this.updateAnimation();
    };

    // アニメーション処理を追加
    Sprite_Picture.prototype.updateAnimation = function () {
        const picture = this.picture();
        if (!picture || !picture._animationEnabled) {
            // アニメーションが無効の場合は元の状態に戻す
            if (this.rotation !== this._originalRotation) {
                this.x = this._originalX;
                this.y = this._originalY;
                this.rotation = this._originalRotation;
            }
            return;
        }

        // 初回のみ元の座標を保存
        if (this._animationCount === 0) {
            this._originalX = this.x;
            this._originalY = this.y;
            this._originalRotation = this.rotation;
        }

        // アニメーションカウンタを更新
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

        this.scale.x = scale.x;
        this.scale.y = scale.y;
        this.x = this._originalX + offset.x;
        this.y = this._originalY + offset.y;
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
