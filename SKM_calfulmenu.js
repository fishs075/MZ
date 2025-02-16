/*:
 * @plugindesc ポップでカラフルなメニュー画面
 * @author さかなのまえあし
 * @target MZ
 * @url https://github.com/fishs075/MZ/blob/main/SKM_calfulmenu.js
 *
 * @help SKM_calfulmenu.js
 *
 * ■ 更新履歴
 * v1.0.1 (2025/02/16)
 * - 選択時の演出を3パターンに分離（アニメーション/発光のみ/なし）
 * - 発光パターンの追加（フロー、リップル）
 * - 枠線機能の追加
 * - コードの最適化
 *
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
 * 2. 選択時の演出パターン
 *    プラグインパラメータで演出パターンを切り替えることができます。
 *    - アニメーションパターン（6種類）
 *      - ブリーズ：ふわふわと浮遊
 *      - バウンス：軽やかに跳ねる
 *      - シェイク：小刻みに振動
 *      - スライド：横方向に揺れる
 *      - ジグザグ：ギザギザと動く
 *      - ロータリー：回転
 *    - 発光パターン（4種類）
 *      - パルス：光の波動
 *      - スパークル：きらきらと光る
 *      - フロー：左から右へ流れる発光
 *      - リップル：波紋のような発光
 *    - なし：シンプルな表示
 *
 * 3. 枠線カスタマイズ
 *    - 枠線の有効/無効切り替え
 *    - 枠線の太さ調整（1-8px）
 *    - 枠線の色設定
 *      - プリセット（白、黒、赤、青、黄）
 *      - カスタムカラー（HTMLカラーコード）
 * 
 * 
 * ■ 使い方
 * 1. プラグインパラメータ「メニューカラー設定」で
 *    各コマンドの色をプリセットから選択できます。
 *
 * 2. アニメーションスタイルを選択することで、
 *    選択時の動きをカスタマイズできます。
 *
 * 3. 演出パターンを切り替えることで、
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
 * 7. 枠線カスタマイズ
 *    設定したカラーの周囲に枠線を表示することができます。
 *
 * 
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
 * @param SelectionEffect
 * @text 選択時の演出（スタイル）
 * @type select
 * @option アニメーション（動きと光で演出）
 * @value animation
 * @option 発光のみ
 * @value glow
 * @option なし
 * @value none
 * @desc 選択時の演出効果を設定します。
 * @default animation
 *
 * @param AnimationStyle
 * @text アニメーションスタイル
 * @type select
 * @option ブリーズ（ふわふわ）
 * @value breath
 * @option バウンス（跳ねる）
 * @value bounce
 * @option シェイク（小刻み振動）
 * @value shake
 * @option スライド（横揺れ）
 * @value slide
 * @option ジグザグ（ギザギザ）
 * @value zigzag
 * @option ロータリー（回転）
 * @value rotary

 * @default breath
 * @parent SelectionEffect
 *
 * @param GlowStyle
 * @text 発光スタイル
 * @type select
 * @option パルス（光の波動）
 * @value pulse
 * @option スパークル（きらきら）
 * @value sparkle
 * @option フロー（左から右）
 * @value flow
 * @option リップル（波紋）
 * @value ripple
 * @default pulse
 * @parent SelectionEffect
 *
 * @param CustomColors
 * @text メニューカラー設定
 * @type struct<MenuColors>[]
 * @desc メニューコマンドごとの色設定
 * @default ["{\"commandName\":\"アイテム\",\"colorScheme\":\"neon_blue\"}", "{\"commandName\":\"スキル\",\"colorScheme\":\"neon_pink\"}", "{\"commandName\":\"装備\",\"colorScheme\":\"gold_metal\"}", "{\"commandName\":\"ステータス\",\"colorScheme\":\"forest_gradient\"}", "{\"commandName\":\"並び替え\",\"colorScheme\":\"ocean_gradient\"}", "{\"commandName\":\"オプション\",\"colorScheme\":\"silver_metal\"}", "{\"commandName\":\"セーブ\",\"colorScheme\":\"sunrise\"}", "{\"commandName\":\"ゲーム終了\",\"colorScheme\":\"midnight\"}"]
 *
 * @param EnableBorder
 * @text 枠線表示
 * @type boolean
 * @on 有効
 * @off 無効
 * @desc メニューコマンドの周りに枠線を表示するか設定します。
 * @default false
 *
 * @param BorderWidth
 * @text 枠線の太さ
 * @type number
 * @min 1
 * @max 8
 * @desc 枠線の太さをピクセル単位で指定します。
 * @default 2
 * @parent EnableBorder
 * 
 * @param BorderColor
 * @text 枠線の色
 * @type select
 * @option 白
 * @value #FFFFFF
 * @option 黒
 * @value #000000
 * @option 赤
 * @value #FF0000
 * @option 青
 * @value #0000FF
 * @option 黄
 * @value #FFFF00
 * @option カスタム
 * @value custom
 * @desc 枠線の色を選択します。
 * @default #FFFFFF
 * @parent EnableBorder
 * 
 * @param CustomBorderColor
 * @text カスタム枠線色
 * @type string
 * @desc 枠線の色をHTMLカラーコードで指定します。BorderColorでカスタムを選択時のみ有効
 * @default #FFFFFF
 * @parent BorderColor
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

    // プラグインパラメータの解析
    const selectionEffect = parameters.SelectionEffect || "animation";
    const isAnimationEnabled = selectionEffect === "animation";
    const isGlowEnabled = selectionEffect === "glow";

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
                return {
                    backgroundColor: customStyle.backgroundColor,
                    backgroundColor2: customStyle.backgroundColor2,
                    backgroundColor3: customStyle.backgroundColor3,
                    textColor: customStyle.textColor,
                    angle: Number(customStyle.angle || 0),
                };
            }
            return COLOR_PRESETS[customStyle.colorScheme] || COLOR_PRESETS.simple_blue;
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
        // 左から右へ流れる発光
        flow: {
            getScale(count) {
                return 1;
            },
            getOffset(count) {
                return { x: 0, y: 0 };
            },
            getGlowIntensity(count) {
                return 15;
            },
            getBrightness(count) {
                return 0.2;
            },
            getGlowGradient(ctx, rect, count) {
                const gradient = ctx.createLinearGradient(
                    rect.x - rect.width,
                    rect.y,
                    rect.x + rect.width * 2,
                    rect.y
                );
                
                const position = (count % 100) / 100;
                gradient.addColorStop(Math.max(0, position - 0.3), "rgba(0, 0, 0, 0.2)");
                gradient.addColorStop(position, "rgba(255, 255, 255, 0.8)");
                gradient.addColorStop(Math.min(1, position + 0.3), "rgba(0, 0, 0, 0.2)");
                
                return gradient;
            }
        },
        // 波紋のような発光
        ripple: {
            getScale(count) {
                return 1;
            },
            getOffset(count) {
                return { x: 0, y: 0 };
            },
            getGlowIntensity(count) {
                return 12 + Math.sin(count * 0.1) * 4;
            },
            getBrightness(count) {
                return 0.2;
            },
            getGlowGradient(ctx, rect, count) {
                const gradient = ctx.createRadialGradient(
                    rect.x + rect.width / 2,
                    rect.y + rect.height / 2,
                    0,
                    rect.x + rect.width / 2,
                    rect.y + rect.height / 2,
                    rect.width
                );
                
                const phase = (count % 60) / 60;
                gradient.addColorStop(phase, "rgba(255, 255, 255, 0.8)");
                gradient.addColorStop(Math.min(1, phase + 0.2), "rgba(0, 0, 0, 0.2)");
                
                return gradient;
            }
        }
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

    // アップデート処理を修正
    const _Window_MenuCommand_update = Window_MenuCommand.prototype.update;
    Window_MenuCommand.prototype.update = function () {
        _Window_MenuCommand_update.call(this);

        // 選択位置の変更を検知
        if (this.index() !== _lastSelectedIndex) {
            _lastSelectedIndex = this.index();
            this.refresh();
        }

        // アニメーションまたは発光エフェクト時のみ更新
        if (isAnimationEnabled || isGlowEnabled) {
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
        if (isAnimationEnabled) {
            this.drawAnimatedItem(index);
        } else if (isGlowEnabled) {
            this.drawGlowItem(index);
        } else {
            this.drawStaticItem(index);
        }
    };

    // グラデーション作成のヘルパー関数を追加
    Window_MenuCommand.prototype.createCommandGradient = function (ctx, rect, style) {
        const angle = Number(style.angle || 0);
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;
        const distance = Math.max(rect.width, rect.height);

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

        gradient.addColorStop(0, style.backgroundColor);
        gradient.addColorStop(0.5, style.backgroundColor2 || style.backgroundColor);
        gradient.addColorStop(
            1,
            style.backgroundColor3 ||
                style.backgroundColor2 ||
                style.backgroundColor
        );

        return gradient;
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
        const gradient = this.createCommandGradient(ctx, itemRect, commandStyle);
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

        if (enableBorder) {
            // 通常の描画の後に枠線を追加
            ctx.strokeStyle = borderColor;
            ctx.lineWidth = borderWidth;
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

    // アニメーション有効時の描画処理
    Window_MenuCommand.prototype.drawAnimatedItem = function (index) {
        const rect = this.itemLineRect(index);
        const commandName = this.commandName(index);
        const isSelected = this.index() === index;

        const style = animationStyles[parameters.AnimationStyle || "breath"];
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

        // グラデーションの設定
        const gradient = this.createCommandGradient(ctx, itemRect, commandStyle);
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

        if (enableBorder) {
            // 通常の描画の後に枠線を追加
            ctx.strokeStyle = borderColor;
            ctx.lineWidth = borderWidth;
            ctx.stroke();
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

    // 発光エフェクト時の描画処理を追加
    Window_MenuCommand.prototype.drawGlowItem = function (index) {
        const rect = this.itemLineRect(index);
        const commandName = this.commandName(index);
        const isSelected = this.index() === index;
        const commandStyle = getCommandStyle(commandName);

        const style = animationStyles[parameters.GlowStyle || "pulse"];
        const glowIntensity = isSelected ? style.getGlowIntensity(_animationCount) : 0;
        const brightness = isSelected ? style.getBrightness(_animationCount) : 0;

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
        const gradient = this.createCommandGradient(ctx, itemRect, commandStyle);
        ctx.fillStyle = gradient;
        ctx.fill();

        if (isSelected) {
            // 発光エフェクト
            ctx.globalCompositeOperation = "overlay";
            ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
            ctx.fill();

            // 光彩効果
            ctx.globalCompositeOperation = "source-over";
            ctx.shadowColor = commandStyle.backgroundColor;
            ctx.shadowBlur = glowIntensity;
            ctx.fill();

            // 縁取り効果
            ctx.strokeStyle = `rgba(255, 255, 255, 0.8)`;
            ctx.lineWidth = 2;
            ctx.stroke();

            if (style.getGlowGradient) {
                // カスタム発光エフェクト
                ctx.globalCompositeOperation = "overlay";
                ctx.fillStyle = style.getGlowGradient(ctx, itemRect, _animationCount);
                ctx.fill();
            }
        }

        if (enableBorder) {
            ctx.strokeStyle = borderColor;
            ctx.lineWidth = borderWidth;
            ctx.stroke();
        }

        ctx.restore();

        // テキストの描画
        this.changeTextColor(isSelected ? "#FFFFFF" : commandStyle.textColor);
        this.drawText(
            commandName,
            itemRect.x + 4,
            itemRect.y,
            itemRect.width - 8,
            "center"
        );
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

    // プラグインパラメータの解析に追加
    const enableBorder = parameters.EnableBorder === "true";
    const borderWidth = Number(parameters.BorderWidth || 2);
    const borderColor = parameters.BorderColor === "custom" 
        ? parameters.CustomBorderColor 
        : parameters.BorderColor;
})();
