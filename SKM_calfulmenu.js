/*:
 * @plugindesc ポップでカラフルなメニュー画面
 * @author さかなのまえあし
 * @target MZ
 * @url https://github.com/fishs075/MZ/blob/main/SKM_calfulmenu.js
 *
 * @help SKM_calfulmenu.js
 *
 * ■ 更新履歴
 * v1.0.0 (2025/02/15)
 * - 初版リリース
 * - 基本機能の実装
 * - アニメーション機能の実装
 *
 * ■ プラグインの概要
 * メニュー画面をポップでカラフルな見た目にカスタマイズします。
 * 各メニューコマンドに個別の色やアニメーション効果を設定できます。
 *
 * ■ 主な機能
 * 1. 豊富なプリセットカラー
 *    - シンプルカラー（青、赤、緑）
 *    - グラデーション（オーシャン、サンセット、フォレストなど）
 *    - 特殊効果（ネオン、メタル）
 *
 * 2. 選択時のアニメーション（8種類）
 *    - ブリーズ：ふわふわと浮遊
 *    - パルス：光の波動
 *    - バウンス：軽やかに跳ねる
 *    - シェイク：小刻みに振動
 *    - スライド：横方向に揺れる
 *    - スパークル：きらきらと光る
 *    - ジグザグ：ギザギザと動く
 *    - ロータリー：円を描くように回転
 *
 * 3. アニメーション切り替え
 *    プラグインパラメータで、アニメーション効果の
 *    有効/無効を切り替えることができます。
 *    無効時は静的な表示になります。
 *
 * ■ 使い方
 * 1. プラグインパラメータ「メニューカラー設定」で
 *    各コマンドの色をプリセットから選択できます。
 *
 * 2. アニメーションスタイルを選択することで、
 *    選択時の動きをカスタマイズできます。
 *
 * 3. アニメーション有効/無効を切り替えることで、
 *    パフォーマンスと見た目を調整できます。
 *
 * 4. プラグインで独自のメニューを入れたときには、
 *    新たなコマンド名を設定してください。
 *
 * 5. カスタムカラー設定を使用することで、
 *    独自の色を設定できます。
 *
 * 6. カスタムカラー設定では、
 *    背景色1、背景色2、背景色3、（グラデーションの場合は背景色2,3）文字色を
 *    それぞれ個別に設定できます。
 *
 * ■ プリセットカラー一覧
 * ・シンプルブルー：青の単色
 * ・シンプルレッド：赤の単色
 * ・シンプルグリーン：緑の単色
 * ・オーシャングラデーション：深い青のグラデーション
 * ・サンセットグラデーション：夕暮れのような赤のグラデーション
 * ・フォレストグラデーション：森のような緑のグラデーション
 * ・レインボーグラデーション：虹色のグラデーション
 * ・ネオンブルー：光る青
 * ・ネオンピンク：光るピンク
 * ・ゴールドメタル：金属的な金色
 * ・シルバーメタル：金属的な銀色
 * ・ミッドナイト：夜をイメージした暗い色
 * ・サンライズ：朝焼けをイメージした色
 * ・オータム：秋をイメージした色
 * ・スプリング：春をイメージした色
 *
 * ■ 注意事項
 * 1. プラグインパラメータの変更は、メニューを開き直すと反映されます。
 * 2. 他のメニュー関連プラグインと競合する可能性があります。
 *
 * ■ 利用規約
 * - クレジット表記は不要です
 * - 商用利用可
 * - 改変可
 * - 素材単体の再配布禁止
 *
 * ■ サポート
 * 不具合や要望がありましたら、GitHubのIssuesにてご報告ください。
 * ツクールフォーラムの公開スレッドでも対応しております。
 *
 * @param EnableAnimation
 * @text アニメーション有効化
 * @type boolean
 * @on 有効
 * @off 無効
 * @desc メニューコマンドのアニメーション効果を有効にするか設定します。
 * @default true
 *
 * @param MenuStyle
 * @text アニメーションスタイル
 * @type select
 * @option ブリーズ（ふわふわ）
 * @value breath
 * @option パルス（光の波動）
 * @value pulse
 * @option バウンス（跳ねる）
 * @value bounce
 * @option シェイク（小刻み振動）
 * @value shake
 * @option スライド（横揺れ）
 * @value slide
 * @option スパークル（きらきら）
 * @value sparkle
 * @option ジグザグ（ギザギザ）
 * @value zigzag
 * @option ロータリー（回転）
 * @value rotary
 * @default breath
 *
 * @param CustomColors
 * @text メニューカラー設定
 * @type struct<MenuColors>[]
 * @desc メニューコマンドごとの色設定
 * @default ["{\"commandName\":\"アイテム\",\"colorScheme\":\"neon_blue\"}", "{\"commandName\":\"スキル\",\"colorScheme\":\"neon_pink\"}", "{\"commandName\":\"装備\",\"colorScheme\":\"gold_metal\"}", "{\"commandName\":\"ステータス\",\"colorScheme\":\"forest_gradient\"}", "{\"commandName\":\"並び替え\",\"colorScheme\":\"ocean_gradient\"}", "{\"commandName\":\"オプション\",\"colorScheme\":\"silver_metal\"}", "{\"commandName\":\"セーブ\",\"colorScheme\":\"sunrise\"}", "{\"commandName\":\"ゲーム終了\",\"colorScheme\":\"midnight\"}"]
 *
 */

/*~struct~MenuColors:
 * @param commandName
 * @text コマンド名
 * @type string
 * @desc メニューコマンドの名前
 * @default
 *
 * @param colorScheme
 * @text 色設定
 * @type select
 * @option カスタム
 * @value custom
 * @option シンプルブルー
 * @value simple_blue
 * @option シンプルレッド
 * @value simple_red
 * @option シンプルグリーン
 * @value simple_green
 * @option オーシャングラデーション
 * @value ocean_gradient
 * @option サンセットグラデーション
 * @value sunset_gradient
 * @option フォレストグラデーション
 * @value forest_gradient
 * @option レインボーグラデーション
 * @value rainbow_gradient
 * @option ネオンブルー
 * @value neon_blue
 * @option ネオンピンク
 * @value neon_pink
 * @option ゴールドメタル
 * @value gold_metal
 * @option シルバーメタル
 * @value silver_metal
 * @option ミッドナイト
 * @value midnight
 * @option サンライズ
 * @value sunrise
 * @option オータム
 * @value autumn
 * @option スプリング
 * @value spring
 * @default simple_blue
 *
 * @param backgroundColor
 * @text 背景色1
 * @type string
 * @desc 背景色1（HTMLカラーコード）※色設定がカスタムの時のみ有効
 * @default #FF6B6B
 * @parent colorScheme
 *
 * @param backgroundColor2
 * @text 背景色2
 * @type string
 * @desc 背景色2（HTMLカラーコード）※色設定がカスタムの時のみ有効
 * @default #FF4757
 * @parent colorScheme
 *
 * @param backgroundColor3
 * @text 背景色3
 * @type string
 * @desc 背景色3（HTMLカラーコード）※色設定がカスタムの時のみ有効
 * @default #FF2743
 * @parent colorScheme
 *
 * @param textColor
 * @text 文字色
 * @type string
 * @desc 文字色（HTMLカラーコード）※色設定がカスタムの時のみ有効
 * @default #FFFFFF
 * @parent colorScheme
 *
 * @param angle
 * @text グラデーション角度
 * @type number
 * @min -180
 * @max 180
 * @desc グラデーションの角度（-180～180）※色設定がカスタムの時のみ有効
 * @default 45
 * @parent colorScheme
 */

(() => {
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    const parameters = PluginManager.parameters(pluginName);
    let _animationCount = 0;
    let _lastSelectedIndex = -1;

    // アニメーション有効/無効の設定を取得
    const enableAnimation = parameters.EnableAnimation !== "false";

    // プラグインパラメータの解析
    const customColors = JSON.parse(parameters.CustomColors || "[]").map(
        (setting) => {
            try {
                return JSON.parse(setting);
            } catch (e) {
                return {};
            }
        }
    );

    // カラープリセットの定義
    const COLOR_PRESETS = {
        simple_blue: {
            backgroundColor: "#4A90E2",
            backgroundColor2: "#4A90E2",
            backgroundColor3: "#4A90E2",
            textColor: "#FFFFFF",
            angle: 0,
        },
        simple_red: {
            backgroundColor: "#E24A4A",
            backgroundColor2: "#E24A4A",
            backgroundColor3: "#E24A4A",
            textColor: "#FFFFFF",
            angle: 0,
        },
        simple_green: {
            backgroundColor: "#2ECC71",
            backgroundColor2: "#2ECC71",
            backgroundColor3: "#2ECC71",
            textColor: "#FFFFFF",
            angle: 0,
        },
        ocean_gradient: {
            backgroundColor: "#4A90E2",
            backgroundColor2: "#357ABD",
            backgroundColor3: "#2B6298",
            textColor: "#FFFFFF",
            angle: 45,
        },
        sunset_gradient: {
            backgroundColor: "#FF6B6B",
            backgroundColor2: "#FF4757",
            backgroundColor3: "#FF2743",
            textColor: "#FFFFFF",
            angle: 45,
        },
        forest_gradient: {
            backgroundColor: "#2ECC71",
            backgroundColor2: "#27AE60",
            backgroundColor3: "#219A4C",
            textColor: "#FFFFFF",
            angle: 45,
        },
        rainbow_gradient: {
            backgroundColor: "#FF6B6B",
            backgroundColor2: "#4A90E2",
            backgroundColor3: "#2ECC71",
            textColor: "#FFFFFF",
            angle: 30,
        },
        neon_blue: {
            backgroundColor: "#00F3FF",
            backgroundColor2: "#0088FF",
            backgroundColor3: "#0044FF",
            textColor: "#FFFFFF",
            angle: 45,
        },
        neon_pink: {
            backgroundColor: "#FF71E8",
            backgroundColor2: "#FF2ED6",
            backgroundColor3: "#FF00B7",
            textColor: "#FFFFFF",
            angle: 45,
        },
        gold_metal: {
            backgroundColor: "#FFD700",
            backgroundColor2: "#FFA500",
            backgroundColor3: "#FF8C00",
            textColor: "#FFFFFF",
            angle: 45,
        },
        silver_metal: {
            backgroundColor: "#E8E8E8",
            backgroundColor2: "#C0C0C0",
            backgroundColor3: "#A8A8A8",
            textColor: "#FFFFFF",
            angle: 45,
        },
        midnight: {
            backgroundColor: "#2C3E50",
            backgroundColor2: "#1A2530",
            backgroundColor3: "#0B1218",
            textColor: "#FFFFFF",
            angle: 45,
        },
        sunrise: {
            backgroundColor: "#FF8C00",
            backgroundColor2: "#FF4757",
            backgroundColor3: "#FF1744",
            textColor: "#FFFFFF",
            angle: 45,
        },
        autumn: {
            backgroundColor: "#FF8C00",
            backgroundColor2: "#FF6B6B",
            backgroundColor3: "#E24A4A",
            textColor: "#FFFFFF",
            angle: 45,
        },
        spring: {
            backgroundColor: "#FF71E8",
            backgroundColor2: "#FF8C00",
            backgroundColor3: "#FFD700",
            textColor: "#FFFFFF",
            angle: 45,
        },
    };

    // スタイル取得関数を修正
    function getCommandStyle(commandName) {
        const customStyle = customColors.find(
            (style) => style.commandName === commandName
        );

        if (customStyle) {
            if (customStyle.colorScheme === "custom") {
                // カスタム設定の場合、ユーザーが指定した値を使用
                return {
                    backgroundColor: customStyle.backgroundColor || "#FF6B6B",
                    backgroundColor2:
                        customStyle.backgroundColor2 ||
                        customStyle.backgroundColor ||
                        "#FF4757",
                    backgroundColor3:
                        customStyle.backgroundColor3 ||
                        customStyle.backgroundColor2 ||
                        customStyle.backgroundColor ||
                        "#FF2743",
                    textColor: customStyle.textColor || "#FFFFFF",
                    angle: Number(customStyle.angle || 45),
                };
            } else {
                return (
                    COLOR_PRESETS[customStyle.colorScheme] ||
                    COLOR_PRESETS.simple_blue
                );
            }
        }

        return COLOR_PRESETS.simple_blue;
    }

    // アニメーションスタイルを先に定義
    const animationStyles = {
        breath: {
            getScale(count) {
                return Math.sin(count * 0.1) * 0.05 + 1.05;
            },
            getOffset(count, rect) {
                return { x: 0, y: Math.sin(count * 0.1) * 2 };
            },
            getGlowIntensity(count) {
                return Math.sin(count * 0.15) * 10 + 15;
            },
            getBrightness(count) {
                return 0.3 + Math.sin(count * 0.1) * 0.1;
            },
        },
        pulse: {
            getScale(count) {
                return 1;
            },
            getOffset(count, rect) {
                return { x: 0, y: 0 };
            },
            getGlowIntensity(count) {
                return Math.sin(count * 0.2) * 15 + 20;
            },
            getBrightness(count) {
                const pulseWave = Math.sin(count * 0.2);
                return 0.2 + Math.max(0, pulseWave) * 0.3;
            },
        },
        bounce: {
            getScale(count) {
                const bounce = Math.abs(Math.sin(count * 0.15));
                return 1 + bounce * 0.1;
            },
            getOffset(count, rect) {
                const bounce = Math.abs(Math.sin(count * 0.15));
                return { x: 0, y: -bounce * 8 };
            },
            getGlowIntensity(count) {
                return 10;
            },
            getBrightness(count) {
                return 0.3;
            },
        },
        shake: {
            getScale(count) {
                return 1;
            },
            getOffset(count, rect) {
                return {
                    x: Math.sin(count * 0.8) * 2,
                    y: Math.cos(count * 0.7) * 1,
                };
            },
            getGlowIntensity(count) {
                return 12 + Math.random() * 5;
            },
            getBrightness(count) {
                return 0.3 + Math.random() * 0.1;
            },
        },
        slide: {
            getScale(count) {
                return 1;
            },
            getOffset(count, rect) {
                return {
                    x: Math.sin(count * 0.1) * rect.width * 0.1,
                    y: 0,
                };
            },
            getGlowIntensity(count) {
                return 10 + Math.abs(Math.sin(count * 0.1)) * 10;
            },
            getBrightness(count) {
                return 0.3 + Math.abs(Math.sin(count * 0.1)) * 0.2;
            },
        },
        // きらきら光るエフェクト
        sparkle: {
            getScale(count) {
                return 1 + Math.sin(count * 0.3) * 0.03;
            },
            getOffset(count, rect) {
                return { x: 0, y: 0 };
            },
            getGlowIntensity(count) {
                // 複数の正弦波を組み合わせてきらきら感を出す
                const sparkle1 = Math.sin(count * 0.5) * 10;
                const sparkle2 = Math.sin((count + 2) * 0.7) * 8;
                const sparkle3 = Math.sin((count + 4) * 0.3) * 6;
                return 15 + sparkle1 + sparkle2 + sparkle3;
            },
            getBrightness(count) {
                return 0.3 + Math.abs(Math.sin(count * 0.2)) * 0.2;
            },
        },
        // ジグザグ移動エフェクト
        zigzag: {
            getScale(count) {
                return 1;
            },
            getOffset(count, rect) {
                const baseX = Math.sin(count * 0.2) * 4;
                const zigX = Math.sin(count * 0.6) * 2;
                const zigY = Math.cos(count * 0.4) * 3;
                return {
                    x: baseX + zigX,
                    y: zigY,
                };
            },
            getGlowIntensity(count) {
                const fastPulse = Math.sin(count * 0.4) * 8;
                const slowPulse = Math.sin(count * 0.2) * 4;
                return 12 + fastPulse + slowPulse;
            },
            getBrightness(count) {
                return 0.3 + Math.abs(Math.sin(count * 0.3)) * 0.2;
            },
        },
        // 回転するようなエフェクト
        rotary: {
            getScale(count) {
                return 1 + Math.sin(count * 0.2) * 0.05;
            },
            getOffset(count, rect) {
                const radius = 3;
                const angle = count * 0.1;
                return {
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                };
            },
            getGlowIntensity(count) {
                return 12 + Math.sin(count * 0.2) * 8;
            },
            getBrightness(count) {
                return 0.3 + Math.abs(Math.sin(count * 0.2)) * 0.15;
            },
        },
    };

    // 背景を消す
    Window_MenuCommand.prototype.drawBackgroundRect = function (rect) {
        // 何も描画しない（背景を透明に）
    };

    // 選択カーソルを消す
    Window_MenuCommand.prototype._drawCursor = function (rect) {
        // 何も描画しない（選択カーソルを透明に）
    };

    // カーソルのアップデートを無効化
    Window_MenuCommand.prototype._updateCursor = function () {
        this._cursorSprite.visible = false;
        this._cursorSprite.alpha = 0;
    };

    // アップデート処理
    const _Window_MenuCommand_update = Window_MenuCommand.prototype.update;
    Window_MenuCommand.prototype.update = function () {
        _Window_MenuCommand_update.call(this);

        // 選択位置の変更を検知
        if (this.index() !== _lastSelectedIndex) {
            _lastSelectedIndex = this.index();
            this.refresh(); // 選択位置が変わったら必ずリフレッシュ
        }

        // アニメーション時のみ追加の更新
        if (enableAnimation) {
            _animationCount++;
            if (_animationCount % 2 === 0) {
                this.refresh();
            }
        }
    };

    // リフレッシュ処理のオーバーライド
    const _Window_MenuCommand_refresh = Window_MenuCommand.prototype.refresh;
    Window_MenuCommand.prototype.refresh = function () {
        this.contents.clear();
        _Window_MenuCommand_refresh.call(this);
    };

    // 描画処理
    Window_MenuCommand.prototype.drawItem = function (index) {
        if (enableAnimation) {
            this.drawAnimatedItem(index);
        } else {
            this.drawStaticItem(index);
        }
    };

    // アニメーション無効時の描画処理
    Window_MenuCommand.prototype.drawStaticItem = function (index) {
        const rect = this.itemLineRect(index);
        const commandName = this.commandName(index);
        const isSelected = this.index() === index;
        const commandStyle = getCommandStyle(commandName);

        const itemRect = {
            x: rect.x + 2,
            y: rect.y + 2,
            width: rect.width - 4,
            height: rect.height - 4,
        };

        const ctx = this.contents.context;
        const radius = 8;

        ctx.save();
        ctx.beginPath();

        // 角丸の描画
        this.drawRoundedRect(ctx, itemRect, radius);

        // グラデーションの設定
        const gradient = ctx.createLinearGradient(
            itemRect.x,
            itemRect.y,
            itemRect.x + itemRect.width,
            itemRect.y
        );

        // 選択時は色をより明るく（値を大きくする）
        const baseColor = isSelected
            ? this.adjustColor(commandStyle.backgroundColor, 50) // 30から50に変更
            : commandStyle.backgroundColor;
        const color2 = isSelected
            ? this.adjustColor(
                  commandStyle.backgroundColor2 || commandStyle.backgroundColor,
                  50
              )
            : commandStyle.backgroundColor2 || commandStyle.backgroundColor;
        const color3 = isSelected
            ? this.adjustColor(
                  commandStyle.backgroundColor3 ||
                      commandStyle.backgroundColor2 ||
                      commandStyle.backgroundColor,
                  50
              )
            : commandStyle.backgroundColor3 ||
              commandStyle.backgroundColor2 ||
              commandStyle.backgroundColor;

        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(0.5, color2);
        gradient.addColorStop(1, color3);

        // 基本の描画
        ctx.fillStyle = gradient;
        ctx.fill();

        if (isSelected) {
            // 白い縁取りをより明確に
            ctx.strokeStyle = "rgba(255, 255, 255, 1.0)"; // 透明度を1.0に
            ctx.lineWidth = 4; // 線を太く
            ctx.stroke();

            // 選択時の光彩効果を追加
            ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
            ctx.shadowBlur = 10;
            ctx.stroke();
        }

        ctx.restore();

        // テキストの描画（選択時は白色に）
        this.changeTextColor(isSelected ? "#FFFFFF" : commandStyle.textColor);
        this.drawText(
            commandName,
            itemRect.x + 4,
            itemRect.y,
            itemRect.width - 8,
            "center"
        );
    };

    // アニメーション有効時の描画処理（既存のdrawItem関数の内容）
    Window_MenuCommand.prototype.drawAnimatedItem = function (index) {
        const rect = this.itemLineRect(index);
        const commandName = this.commandName(index);
        const isSelected = this.index() === index;

        const style = animationStyles[parameters.MenuStyle || "breath"];
        const animationScale = isSelected ? style.getScale(_animationCount) : 1;
        const offset = isSelected
            ? style.getOffset(_animationCount, rect)
            : { x: 0, y: 0 };
        const glowIntensity = isSelected
            ? style.getGlowIntensity(_animationCount)
            : 0;
        const brightness = isSelected
            ? style.getBrightness(_animationCount)
            : 0;

        // コマンドのスタイルを取得
        const commandStyle = getCommandStyle(commandName);

        const itemRect = {
            x: rect.x + 2 + offset.x,
            y: rect.y + 2 + offset.y,
            width: rect.width - 4,
            height: rect.height - 4,
        };

        if (isSelected) {
            const scaleOffsetX = (itemRect.width * (animationScale - 1)) / 2;
            const scaleOffsetY = (itemRect.height * (animationScale - 1)) / 2;
            itemRect.x -= scaleOffsetX;
            itemRect.y -= scaleOffsetY;
            itemRect.width *= animationScale;
            itemRect.height *= animationScale;
        }

        const ctx = this.contents.context;
        const radius = 8;

        ctx.save();
        ctx.beginPath();

        // 角丸の描画
        this.drawRoundedRect(ctx, itemRect, radius);

        // グラデーションの計算
        const angle = Number(commandStyle.angle || 0);
        const centerX = itemRect.x + itemRect.width / 2;
        const centerY = itemRect.y + itemRect.height / 2;
        const distance = Math.max(itemRect.width, itemRect.height);

        const radians = (angle * Math.PI) / 180;
        const gradientStartX = centerX - (Math.cos(radians) * distance) / 2;
        const gradientStartY = centerY - (Math.sin(radians) * distance) / 2;
        const gradientEndX = centerX + (Math.cos(radians) * distance) / 2;
        const gradientEndY = centerY + (Math.sin(radians) * distance) / 2;

        const gradient = ctx.createLinearGradient(
            gradientStartX,
            gradientStartY,
            gradientEndX,
            gradientEndY
        );

        // 3段階グラデーションの設定
        gradient.addColorStop(0, commandStyle.backgroundColor);
        gradient.addColorStop(
            0.5,
            commandStyle.backgroundColor2 || commandStyle.backgroundColor
        );
        gradient.addColorStop(
            1,
            commandStyle.backgroundColor3 ||
                commandStyle.backgroundColor2 ||
                commandStyle.backgroundColor
        );

        // 通常の描画
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = gradient;
        ctx.fill();

        if (isSelected) {
            // 明るくするフィルター効果
            ctx.globalCompositeOperation = "overlay";
            ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
            ctx.fill();

            // 光彩効果の追加
            ctx.globalCompositeOperation = "source-over";
            ctx.shadowColor = commandStyle.backgroundColor;
            ctx.shadowBlur = glowIntensity;
            ctx.fill();

            // 縁取り効果
            ctx.strokeStyle = `rgba(255, 255, 255, ${
                0.5 + Math.sin(_animationCount * 0.1) * 0.3
            })`;
            ctx.lineWidth = 2;
            ctx.stroke();

            // 追加の光沢効果
            ctx.globalCompositeOperation = "soft-light";
            const gradientGlow = ctx.createLinearGradient(
                itemRect.x,
                itemRect.y,
                itemRect.x,
                itemRect.y + itemRect.height
            );
            gradientGlow.addColorStop(0, "rgba(255, 255, 255, 0.4)");
            gradientGlow.addColorStop(0.5, "rgba(255, 255, 255, 0)");
            gradientGlow.addColorStop(1, "rgba(255, 255, 255, 0.2)");
            ctx.fillStyle = gradientGlow;
            ctx.fill();
        }

        ctx.restore();

        // テキストの描画
        this.changeTextColor(commandStyle.textColor);
        if (isSelected) {
            this.contents.fontSize += 2;
            this.drawText(
                commandName,
                itemRect.x + 4,
                itemRect.y - 1,
                itemRect.width - 8,
                "center"
            );
            this.contents.fontSize -= 2;
        } else {
            this.drawText(
                commandName,
                itemRect.x + 4,
                itemRect.y - 1,
                itemRect.width - 8,
                "center"
            );
        }
    };

    // 角丸長方形を描画するヘルパー関数
    Window_MenuCommand.prototype.drawRoundedRect = function (
        ctx,
        rect,
        radius
    ) {
        ctx.moveTo(rect.x + radius, rect.y);
        ctx.lineTo(rect.x + rect.width - radius, rect.y);
        ctx.arcTo(
            rect.x + rect.width,
            rect.y,
            rect.x + rect.width,
            rect.y + radius,
            radius
        );
        ctx.lineTo(rect.x + rect.width, rect.y + rect.height - radius);
        ctx.arcTo(
            rect.x + rect.width,
            rect.y + rect.height,
            rect.x + rect.width - radius,
            rect.y + rect.height,
            radius
        );
        ctx.lineTo(rect.x + radius, rect.y + rect.height);
        ctx.arcTo(
            rect.x,
            rect.y + rect.height,
            rect.x,
            rect.y + rect.height - radius,
            radius
        );
        ctx.lineTo(rect.x, rect.y + radius);
        ctx.arcTo(rect.x, rect.y, rect.x + radius, rect.y, radius);
        ctx.closePath();
    };

    // 色の調整用ヘルパー関数を追加
    Window_MenuCommand.prototype.adjustColor = function (hex, percent) {
        const num = parseInt(hex.replace("#", ""), 16);
        const r = Math.min(255, Math.max(0, (num >> 16) + percent));
        const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + percent));
        const b = Math.min(255, Math.max(0, (num & 0x0000ff) + percent));
        return (
            "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)
        );
    };
})();
