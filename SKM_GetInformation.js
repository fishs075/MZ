//
//  ポップアップ表示プラグイン ver1.0.0
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------


/*:ja
 * @target MZ
 * @plugindesc アイテムや経験値を入手、もしくはレベルアップするとポップアップが表示されます。
 * @author さかなのまえあし
 * 
 * 
 * 
 * 
 * 
 * 
 * 







 * @param 無効化スイッチID
 * @desc インフォメーションを無効化するスイッチのIDです。
 * このスイッチがONの時、インフォメーションが無効化されます。
 * @type switch
 * @default 10
 *
 * 
 * 

 * 
 * 
 * 
 * @param 戦闘中表示
 * @desc インフォメーションを戦闘中に使用するかの設定です。
 * @type boolean
 * @default true
 *
 * @param 戦利品表示
 * @desc 戦利品をインフォメーションで表示するかの設定です。
 * @type boolean
 * @default true
 *
 * 

 * 
 * 
 * 
 * @param MV形式報酬表示
 * @desc 戦利品の表示位置をMV版どおりにします（アクターウインドウ、メッセージウインドウの高いほうの上）
 * @type boolean
 * @default false
 *
 * @param 表示パターン
 * @desc インフォメーションの動作パターンです。
 * @type select
 * @option にょき
 * @value GrowUp
 * @option 普通
 * @value Normal
 * @option うにょーん
 * @value Stretch
 * @default GrowUp
 *
 * @param 文字サイズ
 * @desc インフォメーションの文字サイズです。
 * @type number
 * @default 20
 *
 * @param 表示時間
 * @desc インフォメーションの表示時間です。
 * @type number
 * @default 120
 *
 * @param 表示遅延
 * @desc 連続表示時のディレイフレーム数です。
 * @type number
 * @default 20
 *
 * @param 表示維持時間
 * @desc 完全表示状態を維持するフレーム数です。
 * @type number
 * @default 100
 *
 * @param フェード時間
 * @desc フェードイン・アウトにかけるフレーム数です。
 * @type number
 * @default 10
 *
 * @param 退場時移動有効
 * @desc 退場時の移動を行うかの設定です。
 * @type boolean
 * @default false
 *
 * @param 表示位置
 * @desc インフォメーションの表示位置です。
 * @type select
 * @option 下部
 * @value Bottom
 * @option 上部
 * @value Top
 * @default Bottom
 *
 * @param スライド方向
 * @desc インフォメーションのスライド方向です。
 * @type select
 * @option 上から下
 * @value Down
 * @option 下から上
 * @value Up
 * @default Up

 *
 * @param X位置補正
 * @desc 表示位置のX座標補正値です。
 * @type number
 * @min -1000
 * @default 0
 *
 * @param Y位置補正
 * @desc 表示位置のY座標補正値です。
 * @type number
 * @min -1000
 * @default 0
 *
 * @param 表示幅
 * @desc インフォメーションの横幅です。
 * @type number
 * @default 816
 *
 * @param 所持金アイコン
 * @desc 所持金表示に使用するアイコンのインデックスです。
 * @type number
 * @default 314
 *
 * @param アクターアイコン開始位置
 * @desc アクター表示用アイコンの開始インデックスです。
 * @type number
 * @default 320
 *
 * @param 戦利品表示遅延
 * @desc 戦利品表示開始までの遅延フレーム数です。
 * @type number
 * @default 0
 *
 * @param 隠しアイテムA表示
 * @desc 隠しアイテムAを取得時にポップアップを表示するか。
 * @type boolean
 * @default false
 *
 * @param 隠しアイテムB表示
 * @type boolean
 * @default false
 *
 * @param ログ設定
 * @text ログ設定
 *
 * @param ログ呼び出しキー
 * @parent ログ設定
 * @desc ログを表示するキーです。
 * @type select
 * @option メニュー
 * @value menu
 * @option コントロール
 * @value control
 * @option ページアップ
 * @value pageup
 * @option ページダウン
 * @value pagedown
 * @option シフト
 * @value shift
 * @option タブ
 * @value tab
 * @option なし
 * @value
 * @default
 *
 * @param ログ最大数
 * @parent ログ設定
 * @desc 保存するログの最大数です。
 * @type number
 * @default 100
 *
 * @param ログ行数
 * @parent ログ設定
 * @desc ログ1つあたりの行数です。
 * @type number
 * @default 2
 *
 * @param ログ逆順表示
 * @parent ログ設定
 * @desc ログを新しい順に表示するかの設定です。
 * @type boolean
 * @default false
 *
 * @param メニューログ名
 * @parent ログ設定
 * @desc メニューに追加するログ表示コマンドの名前です。
 * 空欄にするとメニューに追加しません。
 * @default
 * 
 * 
 *
 *
 * @param Battle Show List
 * @desc 戦闘中に表示するインフォメーションのリストです。item,gold,
 * exp,skill,params,levelで指定してください。
 * @default item,gold,exp,skill,params,level
 *
 * @param メッセージ設定
 * @text メッセージ設定
 *
 * @param 所持金増加テキスト
 * @parent メッセージ設定
 * @desc 所持金を入手した時のメッセージです。
 * _icon:アイコン _num:金額
 * @default 「\I[_icon]_num\C[14]\G\C[0]」 を\C[24]手に入れた！
 * @type string
 *
 * @param 所持金減少テキスト
 * @parent メッセージ設定
 * @desc 所持金を失った時のメッセージです。
 * _icon:アイコン _num:金額
 * @default 「\I[_icon]_num\C[14]\G\C[0]」 を\C[2]失った・・・
 * @type string
 *
 * @param アイテム入手テキスト
 * @parent メッセージ設定
 * @desc アイテムを1個入手した時のメッセージです。
 * _icon:アイコン _name:名前 _desc1:解説1行目
 * @default 「\I[_icon]_name」 を\C[24]手に入れた！\n\C[6]_desc1
 * @type string
 *
 * @param アイテム消失テキスト
 * @parent メッセージ設定
 * @desc アイテムを1個失った時のメッセージです。
 * _icon:アイコン _name:名前 _desc1:解説1行目
 * @default 「\I[_icon]_name」 を\C[2]失った・・・\n\C[6]_desc1
 * @type string
 *
 * @param アイテム入手複数テキスト
 * @parent メッセージ設定
 * @desc アイテムを複数入手した時のメッセージです。
 * _icon:アイコン _name:名前 _num:個数 _desc1:解説1行目
 * @default 「\I[_icon]_name」 を\C[14]_num個\C[24]手に入れた！\n\C[6]_desc1
 * @type string
 *
 * @param アイテム消失複数テキスト
 * @parent メッセージ設定
 * @desc アイテムを複数失った時のメッセージです。
 * _icon:アイコン _name:名前 _num:個数 _desc1:解説1行目
 * @default 「\I[_icon]_name」を\C[14]_num個\C[2]失った・・・\n\C[6]_desc1
 * @type string
 *
 * @param スキル習得テキスト
 * @parent メッセージ設定
 * @desc スキルを習得した時のメッセージです。
 * _actor:アクター名 _icon:アイコン _name:名前 _desc1:解説1行目
 * @default _actorは「\I[_icon]_name」 を\C[24]覚えた！\n\C[6]_desc1
 * @type string
 *
 * @param スキル忘却テキスト
 * @parent メッセージ設定
 * @desc スキルを忘れた時のメッセージです。
 * _actor:アクター名 _icon:アイコン _name:名前 _desc1:解説1行目
 * @default _actorは「\I[_icon]_name」を \C[2]忘れてしまった・・・\n\C[6]_desc1
 * @type string
 *
 * @param 経験値増加テキスト
 * @parent メッセージ設定
 * @desc 経験値を得た時のメッセージです。
 * _actor:アクター名 _name:経験値の名前 _num:経験値
 * @default _actorは\C[14]_numポイント\C[0]の\C[4]_name\C[0]を\C[24]得た！
 * @type string
 *
 * @param 経験値減少テキスト
 * @parent メッセージ設定
 * @desc 経験値を失った時のメッセージです。
 * _actor:アクター名 _name:経験値の名前 _num:経験値
 * @default _actorは\C[14]_numポイント\C[0]の\C[4]_name\C[0]を\C[2]失った・・・
 * @type string
 *
 * @param レベル上昇テキスト
 * @parent メッセージ設定
 * @desc レベルが上がった時のメッセージです。
 * _actor:アクター名 _name:レベルの名前 _num:上がった値
 * @default _actorは\C[4]_name\C[0]が\C[14]_numポイント\C[24]上がった！
 * @type string
 *
 * @param レベル減少テキスト
 * @parent メッセージ設定
 * @desc レベルが下がった時のメッセージです。
 * _actor:アクター名 _name:レベルの名前 _num:下がった値
 * @default _actorは\C[4]_name\C[0]が\C[14]_numポイント\C[2]下がった・・・
 * @type string
 *
 * @param 能力値上昇テキスト
 * @parent メッセージ設定
 * @desc 能力値が上がった時のメッセージです。
 * _actor:アクター名 _name:能力値の名前 _num:上がった値
 * @default _actorは\C[4]_name\C[0]が\C[14]_numポイント\C[24]上がった！
 * @type string
 *
 * @param 能力値減少テキスト
 * @parent メッセージ設定
 * @desc 能力値が下がった時のメッセージです。
 * _actor:アクター名 _name:能力値の名前 _num:下がった値
 * @default _actorは\C[4]_name\C[0]が\C[14]_numポイント\C[2]下がった・・・
 * @type string
 *
 * 
 * 
 * 
 * 


 * @help 
 * ------------------------------------------------------
 * 使い方
 * ------------------------------------------------------
 * MV版GetInformationをMZで動作させるために移植したプラグインです。
 * 必要だった基礎プラグインと一つにしました。
 * 
 * ■効果
 * アイテムや経験値を入手、もしくはレベルアップするとポップアップが表示されます。
 * 
 * 
 * 導入するだけで動作します。
 * 詳細な設定は、プラグインパラメータを参照してください。
 *
 * 
 * ■テキストの色変更
 * アイテムのメモ欄に
 * <NameColor:色番号>でアイテムの名前の色を変更することができます。
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * それぞれのテキストの最初に追加することで、ポップアップ発生時にSEを追加する専用制御文字を用意。
 * _SE[名前[,音量,ピッチ,位相]]
 * ※音量、ピッチ、位相は省略可能です。省略した場合、音量=90,ピッチ=100，位相=0として扱われます。
 * 例：レベルアップのポップアップ時にSkill3のSEを鳴らす。
 * _SE[Skill3]_actorは\C[4]_name\C[0]が\C[14]_numポイント\C[24]上がった！
 * 
 * 
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 * 当プラグインはMITライセンスで公開されています。
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 *
 * 素材利用は自己責任でお願いします。
 * 
 * 







 * 
 * 更新履歴
 * ver1.0.0 (2025/02/15) 移植してあったものを統合、リファクタリング。
 * 
 * 
 * 
 * 
 * 
 * 



 * 
 * 
 * 
 * 

 * 
 * 
 * 
 * 
 */

function Sprite_Popup() {
    this.initialize.apply(this, arguments);
}

Sprite_Popup.prototype = Object.create(Sprite.prototype);
Sprite_Popup.prototype.constructor = Sprite_Popup;

// CommonPopupManagerの機能を整理
window.CommonPopupManager = {
    // 基本プロパティ
    _state: {
        tempCommonSprites: null,
        lastIndex: null,
        readyPopup: [],
        setedPopups: [],
        popEnable: false,
        window: null,
        testBitmap: null,
    },

    // 初期化関連
    initialize() {
        this.initTempSprites();
        this._state.popEnable = false;
    },

    initTempSprites() {
        this._state.tempCommonSprites = new Array(POPUP_CONSTANTS.MAX_SPRITES);
        this._state.setedPopups = [];
        this._state.readyPopup = [];
    },

    // ポップアップ制御
    popEnable() {
        const useBattle = $gameParty.inBattle() ? useBattleInfo : true;
        return !$gameSwitches.value(infoDisableSwitchId) && useBattle;
    },

    // ウィンドウ管理
    window() {
        if (this._state.window) return this._state.window;
        this._state.window = new Window_Base(
            0,
            0,
            Graphics.boxWidth,
            Graphics.boxHeight
        );
        return this._state.window;
    },

    // ビットマップ管理
    testBitmap() {
        if (this._state.testBitmap) return this._state.testBitmap;
        this._state.testBitmap = new Bitmap(1, 1);
        return this._state.testBitmap;
    },

    // ポップアップ表示制御
    showInfo(object, value, type, actor, c) {
        try {
            // 基本的なパラメータチェック
            if (!object) {
                console.warn("CommonPopupManager: objectが未定義です");
                return;
            }
            if (value === 0) {
                return;
            }

            let text1 = this.generateTypeText(type, value, object);

            // メタ情報から文字のカラーを取得
            if (type === "item") {
                text1 = this.applyColorCode(text1, object);
            }

            // テキスト検証
            if (!text1 || text1 === "" || text1 === "null") {
                console.warn("CommonPopupManager: 無効なテキスト");
                return;
            }

            const { text: processedText, se } = this.processTextReplacements(text1, object, value, actor, c);
            text1 = processedText;

            const { bitmap, texts, oneHeight, height } = this.createInfoBitmap(text1);

            this.window().contents = bitmap;
            this.window().drawTextEx("\\FS[" + infoFontSize + "]", 0, 0);
            this.drawPopupTexts(texts, oneHeight);

            this.displayPopup(bitmap, se, height, texts);

        } catch (error) {
            console.error("CommonPopupManager.showInfo エラー:", error);
        }
    },

    // その他のメソッドは既存の実装を維持
};

(() => {
    "use strict";

    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    const parameters = PluginManager.parameters(pluginName);

    // パラメータ取得用のヘルパー関数
    const getParam = (paramName, defaultValue) => {
        const value = parameters[paramName];
        if (value === undefined) return defaultValue;

        // 数値パラメータの場合
        if (defaultValue !== undefined && typeof defaultValue === "number") {
            return Number(value || defaultValue);
        }
        // 真偽値パラメータの場合
        if (defaultValue !== undefined && typeof defaultValue === "boolean") {
            return String(value || defaultValue).toLowerCase() === "true";
        }
        // 文字列パラメータの場合
        return String(value || defaultValue);
    };

    // プラグインパラメータを機能ごとに分離
    const popupParams = {
        // ポップアップの基本設定
        base: {
            文字サイズ: getParam("文字サイズ", 20),
            表示幅: getParam("表示幅", 816),
            表示時間: getParam("表示時間", 120),
            表示遅延: getParam("表示遅延", 20),
            表示維持時間: getParam("表示維持時間", 100),
            フェード時間: getParam("フェード時間", 10),
        },
        // 表示位置関連
        position: {
            表示位置: getParam("表示位置", ""),
            スライド方向: getParam("スライド方向", ""),
            X位置補正: getParam("X位置補正", 0),
            Y位置補正: getParam("Y位置補正", 0),
            表示パターン: getParam("表示パターン", "GrowUp"),
        },
        // アイコン設定
        icon: {
            所持金アイコン: getParam("所持金アイコン", 314),
            アクターアイコン開始位置: getParam("アクターアイコン開始位置", 320),
        },
        // その他の設定
        other: {
            退場時移動有効: getParam("退場時移動有効", false),
            戦利品表示遅延: getParam("戦利品表示遅延", 0),
            隠しアイテムA表示: getParam("隠しアイテムA表示", false),
            隠しアイテムB表示: getParam("隠しアイテムB表示", false),
        },
    };

    // 情報表示関連のパラメータ
    const infoParams = {
        // 戦闘関連
        battle: {
            戦闘中表示: getParam("戦闘中表示", true),
            戦利品表示: getParam("戦利品表示", true),
            MV形式報酬表示: getParam("MV形式報酬表示", false),
        },
        // システム設定
        system: {
            無効化スイッチID: getParam("無効化スイッチID", 10),
        },
        // ログ関連設定
        log: {
            key: getParam("ログ呼び出しキー", ""),
            max: getParam("ログ最大数", 100),
            row: getParam("ログ行数", 1),
            reverse: getParam("ログ逆順表示", false),
            menuName: getParam("メニューログ名", ""),
        },
    };

    // メッセージテキスト設定を拡張
    const messageTexts = {
        gold: {
            get: getParam(
                "所持金増加テキスト",
                "「\\I[_icon]_num\\C[14]\\G\\C[0]」 を\\C[24]手に入れた！"
            ),
            lost: getParam(
                "所持金減少テキスト",
                "「\\I[_icon]_num\\C[14]\\G\\C[0]」 を\\C[2]失った・・・"
            ),
        },
        item: {
            get: getParam(
                "アイテム入手テキスト",
                "「\\I[_icon]_name」 を\\C[24]手に入れた！\\n\\C[6]_desc1"
            ),
            lost: getParam(
                "アイテム消失テキスト",
                "「\\I[_icon]_name」 を\\C[2]失った・・・\\n\\C[6]_desc1"
            ),
            getNum: getParam(
                "アイテム入手複数テキスト",
                "「\\I[_icon]_name」 を\\C[14]_num個\\C[24]手に入れた！\\n\\C[6]_desc1"
            ),
            lostNum: getParam(
                "アイテム消失複数テキスト",
                "「\\I[_icon]_name」を\\C[14]_num個\\C[2]失った・・・\\n\\C[6]_desc1"
            ),
        },
        skill: {
            get: getParam(
                "スキル習得テキスト",
                "_actorは「\\I[_icon]_name」 を\\C[24]覚えた！\\n\\C[6]_desc1"
            ),
            lost: getParam(
                "スキル忘却テキスト",
                "_actorは「\\I[_icon]_name」を \\C[2]忘れてしまった・・・\\n\\C[6]_desc1"
            ),
        },
        exp: {
            up: getParam(
                "経験値増加テキスト",
                "_actorは\\C[14]_numポイント\\C[0]の\\C[4]_name\\C[0]を\\C[24]得た！"
            ),
            down: getParam(
                "経験値減少テキスト",
                "_actorは\\C[14]_numポイント\\C[0]の\\C[4]_name\\C[0]を\\C[2]失った・・・"
            ),
        },
        level: {
            up: getParam(
                "レベル上昇テキスト",
                "_actorは\\C[4]_name\\C[0]が\\C[14]_numポイント\\C[24]上がった！"
            ),
            down: getParam(
                "レベル減少テキスト",
                "_actorは\\C[4]_name\\C[0]が\\C[14]_numポイント\\C[2]下がった・・・"
            ),
        },
        param: {
            up: getParam(
                "能力値上昇テキスト",
                "_actorは\\C[4]_name\\C[0]が\\C[14]_numポイント\\C[24]上がった！"
            ),
            down: getParam(
                "能力値減少テキスト",
                "_actorは\\C[4]_name\\C[0]が\\C[14]_numポイント\\C[2]下がった・・・"
            ),
        },
        abp: {
            up: getParam(
                "クラス経験値増加テキスト",
                "_actorは\\C[14]_numポイント\\C[0]の\\C[4]_name\\C[0]を\\C[24]得た！"
            ),
            down: getParam(
                "クラス経験値減少テキスト",
                "_actorは\\C[14]_numポイント\\C[0]の\\C[4]_name\\C[0]を\\C[2]失った・・・"
            ),
        },
        classLevel: {
            up: getParam(
                "クラスレベル上昇テキスト",
                "_actorは\\C[4]_classの_name\\C[0]が\\C[14]_numポイント\\C[24]上がった！"
            ),
            down: getParam(
                "クラスレベル減少テキスト",
                "_actorは\\C[4]_classの_name\\C[0]が\\C[14]_numポイント\\C[2]下がった・・・"
            ),
        },
        formation: {
            up: getParam(
                "陣形レベル上昇テキスト",
                "\\C[4]_nameの熟練度\\C[0]が\\C[14]_numポイント\\C[24]上がった！"
            ),
            max: getParam(
                "陣形マスターテキスト",
                "\\C[4]_name\\C[0]を\\C[14]マスターした！"
            ),
        },
    };

    // 変数の再割り当てと重複宣言の削除
    const {
        gold: { get: getGoldText, lost: lostGoldText },
        item: {
            get: getInfoText,
            lost: lostInfoText,
            getNum: getInfoTextNum,
            lostNum: lostInfoTextNum,
        },
        skill: { get: getInfoSkillText, lost: lostInfoSkillText },
        exp: { up: ExpUpText, down: ExpDownText },
        level: { up: lvUpText, down: lvDownText },
        param: { up: ParamUpText, down: ParamDownText },
        abp: { up: abpUpText, down: abpDownText },
        classLevel: { up: clvUpText, down: clvDownText },
        formation: { up: fLvUpText, max: fLvMaxText },
    } = messageTexts;

    // プラグインパラメータから変数を設定
    const {
        無効化スイッチID: infoDisableSwitchId,
        文字サイズ: infoFontSize,
        表示時間: infoCount,
        表示遅延: infoDelay,
        表示維持時間: infoMoveWait,
        フェード時間: infoMoveFade,
        退場時移動有効: enableOutMove,
        所持金アイコン: goldIconIndex,
        アクターアイコン開始位置: actorIconStartIndex,
        戦闘中表示: useBattleInfo,
        MV形式報酬表示: InfoMVstyle,
        戦利品表示: useRewardsInfo,
        表示位置: infoPosition,
        スライド方向: infoSlideAction,
        X位置補正: infoSupX,
        Y位置補正: infoSupY,
        表示パターン: infoPattern,
        表示幅: infoWidth,
        戦利品表示遅延: rewardPopupDelay,
        隠しアイテムA表示: showGetHideItemA,
        隠しアイテムB表示: showGetHideItemB,
    } = {
        無効化スイッチID: getParam("無効化スイッチID", 10),
        文字サイズ: getParam("文字サイズ", 20),
        表示時間: getParam("表示時間", 120),
        表示遅延: getParam("表示遅延", 20),
        表示維持時間: getParam("表示維持時間", 100),
        フェード時間: getParam("フェード時間", 10),
        退場時移動有効: getParam("退場時移動有効", false),
        所持金アイコン: getParam("所持金アイコン", 314),
        アクターアイコン開始位置: getParam("アクターアイコン開始位置", 320),
        戦闘中表示: getParam("戦闘中表示", true),
        MV形式報酬表示: getParam("MV形式報酬表示", false),
        戦利品表示: getParam("戦利品表示", true),
        表示位置: getParam("表示位置", ""),
        スライド方向: getParam("スライド方向", ""),
        X位置補正: getParam("X位置補正", 0),
        Y位置補正: getParam("Y位置補正", 0),
        表示パターン: getParam("表示パターン", "GrowUp"),
        表示幅: getParam("表示幅", 816),
        戦利品表示遅延: getParam("戦利品表示遅延", 0),
        隠しアイテムA表示: getParam("隠しアイテムA表示", false),
        隠しアイテムB表示: getParam("隠しアイテムB表示", false),
    };

    // ログ関連のパラメータ設定
    const logParams = {
        key: getParam("ログ呼び出しキー", ""),
        max: getParam("ログ最大数", 100),
        row: getParam("ログ行数", 1),
        reverse: getParam("ログ逆順表示", false),
        menuName: getParam("メニューログ名", ""),
    };

    // 固定値
    const infoSlideCount = 60;

    // バトル表示リスト
    const battleShowList = String(parameters["Battle Show List"] || "").split(
        ","
    );

    var _gInfo_GInterpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _gInfo_GInterpreter_pluginCommand.call(this, command, args);
        if (command === "ShowInfo" || command === "インフォ表示") {
            CommonPopupManager.showInfo({}, args[0], null);
        }
    };

    CommonPopupManager.popEnable = function () {
        var useBattle = $gameParty.inBattle() ? useBattleInfo : true;
        return !$gameSwitches.value(infoDisableSwitchId) && useBattle;
    };

    // ゲームコマンド関連の機能拡張
    const _GameInterpreter = {
        // 所持金の変更
        command125: Game_Interpreter.prototype.command125,
        // アイテムの変更
        command126: Game_Interpreter.prototype.command126,
        // 武器の変更
        command127: Game_Interpreter.prototype.command127,
        // 防具の変更
        command128: Game_Interpreter.prototype.command128,
        // 経験値の変更
        command315: Game_Interpreter.prototype.command315,
        // レベルの変更
        command316: Game_Interpreter.prototype.command316,
        // 能力値の変更
        command317: Game_Interpreter.prototype.command317,
        // スキルの変更
        command318: Game_Interpreter.prototype.command318,
    };

    // 各コマンドの拡張
    Game_Interpreter.prototype.command125 = function (params) {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        const result = _GameInterpreter.command125.call(this, params);
        CommonPopupManager._popEnable = false;
        return result;
    };

    Game_Interpreter.prototype.command126 = function (params) {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        const result = _GameInterpreter.command126.call(this, params);
        CommonPopupManager._popEnable = false;
        return result;
    };

    Game_Interpreter.prototype.command127 = function (params) {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        const result = _GameInterpreter.command127.call(this, params);
        CommonPopupManager._popEnable = false;
        return result;
    };

    Game_Interpreter.prototype.command128 = function (params) {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        const result = _GameInterpreter.command128.call(this, params);
        CommonPopupManager._popEnable = false;
        return result;
    };

    Game_Interpreter.prototype.command315 = function (params) {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        const result = _GameInterpreter.command315.call(this, params);
        CommonPopupManager._popEnable = false;
        return result;
    };

    Game_Interpreter.prototype.command316 = function (params) {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        const result = _GameInterpreter.command316.call(this, params);
        CommonPopupManager._popEnable = false;
        return result;
    };

    Game_Interpreter.prototype.command317 = function (params) {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        const result = _GameInterpreter.command317.call(this, params);
        CommonPopupManager._popEnable = false;
        return result;
    };

    Game_Interpreter.prototype.command318 = function (params) {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        const result = _GameInterpreter.command318.call(this, params);
        CommonPopupManager._popEnable = false;
        return result;
    };

    // Game_Actor拡張
    const _Game_Actor = {
        addParam: Game_Actor.prototype.addParam,
        changeExp: Game_Actor.prototype.changeExp,
        changeLevel: Game_Actor.prototype.changeLevel,
        learnSkill: Game_Actor.prototype.learnSkill,
        forgetSkill: Game_Actor.prototype.forgetSkill,
    };
/*
    PluginManager.registerCommand(
        pluginName,
        "CommonPopupAdd",
        function (args) {
            var argParam = Object.entries(args).map(
                ([key, value]) => `${key}:${value}`
            );
            argParam.unshift("add");

            var eventId = 0;
            for (var i = 0; i < argParam.length; i++) {
                if (argParam[i].match(/^eventId:(.+)/g)) {
                    eventId = Number(RegExp.$1);
                    break;
                }
            }

            var character = this.character(eventId);
            var arg = CommonPopupManager.setPopup(argParam, character);

            if (arg.backImage !== "") {
                CommonPopupManager.bltCheck(CommonPopupManager.makeBitmap(arg));
                CommonPopupManager._readyPopup.push(arg);
            } else {
                CommonPopupManager._readyPopup.push(arg);
            }
        }
    );

    PluginManager.registerCommand(
        pluginName,
        "CommonPopupClear",
        function (args) {
            CommonPopupManager.clearPopup();
        }
    );
*/

    Array.prototype.setNullPos = function (object) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === null || this[i] === undefined) {
                this[i] = object;
                return i;
            }
        }
        this.push(object);
    };

    Array.prototype.compact = function () {
        var result = [];
        for (var i = 0; i < this.length; i++) {
            if (this[i] !== null && this[i] !== undefined) {
                result.push(this[i]);
            }
        }
        return result;
    };

    CommonPopupManager.initTempSprites = function () {

        this._tempCommonSprites = new Array(POPUP_CONSTANTS.MAX_SPRITES);
        this._setedPopups = [];
        this._readyPopup = [];
    };

    CommonPopupManager.window = function () {
        if (this._window) {
            return this._window;
        }
        this._window = new Window_Base(
            0,
            0,
            Graphics.boxWidth,
            Graphics.boxHeight
        );
        return this._window;
    };

    CommonPopupManager.testBitmap = function () {
        if (this._testBitmap) {
            return this._testBitmap;
        }
        this._testBitmap = new Bitmap(1, 1);
        return this._testBitmap;
    };

    Sprite_Popup.prototype.initialize = function (index) {
        Sprite.prototype.initialize.call(this);
        this._index = index;
        this._count = 0;
        this._enable = false;
        this.update();
    };

    Sprite_Popup.prototype.setMembers = function (arg) {
        this._count = arg.count;
        this._arg = arg;
        this.anchor.x = arg.anchorX;
        this.anchor.y = arg.anchorY;
        this.x = arg.x;
        this.y = arg.y;
        this.z = 6;
        this.visible = true;
        this._enable = true;
        this.createBitmap();
        if (arg.slideCount) {

            CommonPopupManager._setedPopups.push([
                this._index,
                this.height,
                this._arg.slideCount,
            ]); //this.height + 8 の+8は移植にあたりウインドウがかぶってしまったのを補正するための値

            //        }
        }
    };

    Sprite_Popup.prototype.createBitmap = function () {
        if (this._arg.bitmap) {
            this.bitmap = this._arg.bitmap;
        } else {
            CommonPopupManager.window().resetFontSettings();
            var text = this._arg.text;
            var size = CommonPopupManager.window().textSizeEx(text);
            var width = size.width;
            var height = size.height;
            var sh = 8;
            //if (this._arg.back === 0){ sh = 2 }
            CommonPopupManager.window().createContents();

            this.bitmap = new Bitmap(width + 24, height + sh);
            this.drawBackRect(width + 24, height + sh);
            CommonPopupManager.window().drawTextEx(this._arg.text, 12, 4);
            this.bitmap.blt(
                CommonPopupManager.window().contents,
                0,
                0,
                width + 24,
                height + sh,
                this._arg.bx,
                this._arg.by
            );
        }
    };

    Sprite_Popup.prototype.drawBackRect = function (width, height) {
        if (this._arg.backImage !== "") {
            var bitmap = CommonPopupManager.makeBitmap(this._arg);
            var w = this._bitmap.width;
            var h = this._bitmap.height;
            if (typeof this._arg.back === "string") {
                w = bitmap.width > this._bitmap.width ? bitmap.width : w;
                h = bitmap.height > this._bitmap.height ? bitmap.height : h;
                if (w > this._bitmap.width || h > this._bitmap.height) {
                    this.bitmap = new Bitmap(w, h);
                }
            }
            this.bitmap.blt(
                bitmap,
                0,
                0,
                bitmap.width,
                bitmap.height,
                0,
                0,
                w,
                h
            );
            // bitmap.clear();
            // bitmap = null;
        } else {
            if (this._arg.back === "-1") {
            } else {
                var color1 = "rgba(" + this._arg.back + ")";

                var color2 = "rgba(0,0,0,0)";
                var dSize = width / 4;
                this.bitmap.gradientFillRect(
                    0,
                    0,
                    dSize,
                    height,
                    color2,
                    color1
                );
                this.bitmap.fillRect(dSize, 0, dSize * 2, height, color1);
                this.bitmap.gradientFillRect(
                    dSize * 3,
                    0,
                    dSize,
                    height,
                    color1,
                    color2
                );
            }
        }
    };

    Sprite_Popup.prototype.update = function () {
        Sprite.prototype.update.call(this);
        if (
            CommonPopupManager._tempCommonSprites[this._index] &&
            !this._enable
        ) {
            if (
                CommonPopupManager._tempCommonSprites[this._index].delay === 0
            ) {
                this.setMembers(
                    CommonPopupManager._tempCommonSprites[this._index]
                );
                if (this._arg && this._arg.se.name)
                    AudioManager.playSe(this._arg.se);
            } else {
                CommonPopupManager._tempCommonSprites[this._index].delay--;
            }
        }
        if (this._count > 0) {
            this._count--;
            if (!this._arg) {
                this.terminate();
                return;
            }
            switch (this._arg.pattern) {
                case POPUP_CONSTANTS.PATTERN.NORMAL:
                case "Normal":
                    this.updateSlide();
                    break;
                case POPUP_CONSTANTS.PATTERN.STRETCH:
                case "Stretch":
                    this.updateTurn();
                    break;
                case POPUP_CONSTANTS.PATTERN.GROW_UP:
                case "GrowUp":
                    this.updateGrowUp();
                    break;
                default:
                    this.updateAnime();
            }
            if (this._count === 0) this.terminate();
        }
        if (this._arg && this._arg.slideCount) this.updateMoveSlide();
    };

    Sprite_Popup.prototype.updateMoveSlide = function () {
        if (CommonPopupManager._setedPopups) {
            var array = CommonPopupManager._setedPopups.clone().reverse();
            var n = 0;
            for (var i = 0; i < array.length; i++) {
                if (this._index === array[i][0]) {
                    if (this._arg.slideAction === "Down") {
                        this.y = this.y + n;
                    } else {
                        this.y = this.y - n;
                    }
                }
                var sprite = CommonPopupManager._tempCommonSprites[array[i][0]];
                if (sprite.pattern === -2 || sprite.pattern === "GrowUp") {
                    n += array[i][1] * sprite.rate;
                } else {
                    n +=
                        array[i][1] *
                        ((this._arg.slideCount - array[i][2]) /
                            this._arg.slideCount);
                }
            }
            for (var i = 0; i < CommonPopupManager._setedPopups.length; i++) {
                CommonPopupManager._setedPopups[i][2]--;
                if (CommonPopupManager._setedPopups[i][2] < 0) {
                    CommonPopupManager._setedPopups[i][2] = 0;
                }
            }
            array = null;
        }
    };

    Sprite_Popup.prototype.updateSlide = function () {
        var originalWait = this._arg.count;
        var cnt = originalWait - this._count;
        this.opacity = 255;
        var act = [originalWait * 0.25, originalWait * 0.75];
        if (this._arg.extend !== "") {
            act = this._arg.extend;
        }
        //var oa = Math.max(originalWait - act[1],1);
        //var n1 = Math.max(originalWait / oa,0.1);
        var opTime1 = act[0];
        var moveX = 0;
        var moveY = 0;
        if (act[2]) {
            opTime1 = originalWait - act[2];
        }
        var opTime2 = originalWait - act[1];
        var n = 0;
        if (act[3]) {
            opTime2 = act[3];
        }
        // 登場演出
        if (cnt < act[0]) {
            var up = this._arg.moveY / act[0];
            var slide = this._arg.moveX / act[0];
            this.opacity = Math.floor(255 * (cnt / opTime1));
            moveX = Math.floor(slide * cnt);
            moveY = Math.floor(up * cnt);
            // 退場演出
        } else if (cnt >= act[1]) {
            var up = this._arg.moveY / (originalWait - act[1]);
            var slide = this._arg.moveX / (originalWait - act[1]);
            this.opacity = Math.floor(255 * (this._count / opTime2));
            if (this._arg.enableOutEffect) {
                moveX = Math.floor(this._arg.moveX * (this._count / opTime2)); //Math.floor((originalWait / n1) * slide);
                moveY = Math.floor(this._arg.moveY * (this._count / opTime2)); //Math.floor((originalWait / n1) * up);
            } else {
                moveX = this._arg.moveX; //Math.floor((originalWait / n1) * slide);
                moveY = this._arg.moveY; //Math.floor((originalWait / n1) * up);
            }
        } else {
            moveX = this._arg.moveX; //Math.floor((originalWait / n1) * slide);
            moveY = this._arg.moveY; //Math.floor((originalWait / n1) * up);
        }
        this._times = cnt;
        this.setPosition(moveX, moveY);
    };

    Sprite_Popup.prototype.updateTurn = function () {
        var originalWait = this._arg.count;
        var cnt = originalWait - this._count;
        var act = [originalWait * 0.25, originalWait * 0.75];
        if (this._arg.extend) act = this._arg.extend;
        if (this._count === 0) this.scale.x = 0;
        //var oa = Math.max(originalWait - act[1],1);
        //var n1 = Math.max(originalWait / oa,0.1);
        //var up = (this._arg.moveY / (originalWait / n1));
        //var slide = (this._arg.moveX / (originalWait / n1));
        var moveX = 0;
        var moveY = 0;
        if (cnt < act[0]) {
            var up = this._arg.moveY / act[0];
            var slide = this._arg.moveX / act[0];
            var rate = cnt / act[0];
            this.scale.x = rate;
            moveX = Math.floor(slide * cnt);
            moveY = Math.floor(up * cnt);
        } else if (cnt > act[1]) {
            var a1 = originalWait - act[1];
            var rate = this._count / a1;
            this.scale.x = rate;
            if (this._arg.enableOutEffect) {
                moveX = Math.floor(this._arg.moveX * (this._count / a1)); //Math.floor((originalWait / n1) * slide);
                moveY = Math.floor(this._arg.moveY * (this._count / a1)); //Math.floor((originalWait / n1) * up);
            } else {
                moveX = this._arg.moveX; //Math.floor((originalWait / n1) * up);
                moveY = this._arg.moveY; //Math.floor((originalWait / n1) * slide);
            }
        } else {
            this.scale.x = 1.0;
            moveX = this._arg.moveX; //Math.floor((originalWait / n1) * up);
            moveY = this._arg.moveY; //Math.floor((originalWait / n1) * slide);
        }
        this._times = cnt;
        this.setPosition(moveX, moveY);
    };

    Sprite_Popup.prototype.updateGrowUp = function () {
        var originalWait = this._arg.count;
        var cnt = originalWait - this._count;
        var act = [originalWait * 0.25, originalWait * 0.75];
        if (this._arg.extend) act = this._arg.extend;
        if (this._count === 0) this.scale.y = 0;
        //var oa = Math.max(originalWait - act[1],1);
        //var n1 = Math.max(originalWait / oa,0.1);
        //var up = (this._arg.moveY / (originalWait / n1));
        //var slide = (this._arg.moveX / (originalWait / n1));
        var moveX = 0;
        var moveY = 0;
        if (cnt < act[0]) {
            var up = this._arg.moveY / act[0];
            var slide = this._arg.moveX / act[0];
            var rate = cnt / act[0];
            this.scale.y = rate;
            moveX = Math.floor(slide * cnt);
            moveY = Math.floor(up * cnt);
            this._arg.rate = rate;
        } else if (cnt >= act[1]) {
            var a1 = originalWait - act[1];
            var rate = this._count / a1;
            this.scale.y = rate;
            this._arg.rate = rate;
            if (this._arg.enableOutEffect) {
                moveX = Math.floor(this._arg.moveX * (this._count / a1)); //Math.floor((originalWait / n1) * slide);
                moveY = Math.floor(this._arg.moveY * (this._count / a1)); //Math.floor((originalWait / n1) * up);
            } else {
                moveX = this._arg.moveX; //Math.floor((originalWait / n1) * up);
                moveY = this._arg.moveY; //Math.floor((originalWait / n1) * slide);
            }
        } else {
            this.scale.y = 1.0;
            this._arg.rate = 1.0;
            moveX = this._arg.moveX; //Math.floor((originalWait / n1) * up);
            moveY = this._arg.moveY; //Math.floor((originalWait / n1) * slide);
        }
        this._times = cnt;
        this.setPosition(moveX, moveY);
    };

    Sprite_Popup.prototype.setPosition = function (x, y) {
        this.x = this._arg.x + x + this._arg.sx;
        this.y = this._arg.y + y + this._arg.sy;
        if (this._arg.battler) {
            if ($gameParty.inBattle()) {
                this.x += this._arg.battler.x;
                this.y += this._arg.battler.y;
            } else {
                this.x += this._arg.battler._realX * $gameMap.tileWidth();
                this.y += this._arg.battler._realY * $gameMap.tileHeight();
            }
        }
        var xx = this.x;
        var yy = this.y;
        if (this._arg.fixed) {
            var dx = $gameMap._displayX;
            var dy = $gameMap._displayY;
            xx = this.x - dx * $gameMap.tileWidth();
            yy = this.y - dy * $gameMap.tileHeight();
            if (xx < 0 || yy < 0) {
                if (xx < 0 && $gameMap.isLoopHorizontal()) dx -= $dataMap.width;
                if (yy < 0 && $gameMap.isLoopVertical()) dy -= $dataMap.height;
                xx = this.x - dx * $gameMap.tileWidth();
                yy = this.y - dy * $gameMap.tileHeight();
            }
        }
        this.x = xx;
        this.y = yy;
    };

    Sprite_Popup.prototype.updateAnime = function () {
        var anime = $dataAnimations[Number(this._arg.pattern)];
        var frameId = Math.floor(
            (anime.frames.length * (this._arg.count - this._count)) /
                this._arg.count
        );
        if (frameId !== anime.frames.length) {
            var array = anime.frames[frameId][0];
            var x = array[1];
            var y = array[2];
            this.x = this._arg.x + x + this._arg.sx;
            this.y = this._arg.y + y + this._arg.sy;
            this.scale = new Point(array[3] / 100, array[3] / 100);
            this.rotation = array[4];
            this.opacity = array[6];
            this.blendMode = array[7];
        }
    };

    Sprite_Popup.prototype.terminate = function () {
        this.bitmap = null;
        this.visible = false;
        this._enable = false;
        this._count = 0;
        this._arg = null;

        if (CommonPopupManager._tempCommonSprites[this._index]) {
            CommonPopupManager._tempCommonSprites[this._index].terminate = true;
        }
        if (CommonPopupManager._setedPopups) {
            for (var i = 0; i < CommonPopupManager._setedPopups.length; i++) {
                if (CommonPopupManager._setedPopups[i][0] === this._index) {
                    delete CommonPopupManager._setedPopups[i];
                }
            }
            CommonPopupManager._setedPopups =
                CommonPopupManager._setedPopups.compact();
        }
    };

    Game_Interpreter.prototype.addPopup = function (argParam) {
        var eventId = 0;
        for (var i = 0; i < argParam.length; i++) {
            if (argParam[i].match(/^eventId:(.+)/g)) {
                eventId = Number(RegExp.$1);
                break;
            }
        }
        var character = this.character(eventId);
        var arg = CommonPopupManager.setPopup(argParam, character);
        if (arg.back > 0 || typeof arg.back === "string") {
            CommonPopupManager.bltCheck(CommonPopupManager.makeBitmap(arg));
            CommonPopupManager._readyPopup.push(arg);
        } else {
            CommonPopupManager._tempCommonSprites.setNullPos(arg);
        }
    };

    CommonPopupManager.setPopup = function (argParam, character) {
        var arg = {
            x: null,
            y: null,
            text: "", // 表示テキスト
            eventId: -1, // 表示するイベントのID
            count: 60, // 表示時間
            delay: 0, // 表示遅延
            moveX: 0, // 目標地点X(相対座標)
            moveY: -48, // 目標地点Y(相対座標)
            sx: 0, // 表示位置補正X
            sy: 0, // 表示位置補正Y
            pattern: 0, // 表示パターン
            back: -1, // 背景に使う画像インデックス
            backImage: "", // 背景に使う画像ファイル名
            bx: 0, // 内容の表示位置補正X
            by: 0, // 内容の表示位置補正Y
            extend: "", //
            fixed: true, //
            anchorX: 0.5,
            anchorY: 0.5,
            battler: null,
            se: { name: "", volume: 90, pitch: 100, pan: 0 },
            enableOutEffect: true,
        };
        var array = [
            "x",
            "y",
            "text",
            "eventId",
            "count",
            "delay",
            "moveX",
            "moveY",
            "sx",
            "sy",
            "pattern",
            "back",
            "bx",
            "by",
            "extend",
            "fixed",
            "anchorX",
            "anchorY",
            "slideCount",
        ];
        for (var i = 0; i < argParam.length; i++) {
            if (i > 0) {
                for (var j = 0; j < array.length; j++) {
                    var r = new RegExp("^(" + array[j] + ")" + ":(.+)");
                    if (argParam[i].match(r)) {
                        var code = RegExp.$1;
                        var value = RegExp.$2;
                        if (code === "text" || code === "extend") {
                            arg[code] = value;
                        } else if (code === "fixed") {
                            arg[code] = value === "true";
                        } else if (code === "back") {
                            arg[code] = value;
                        } else if (code === "pattern") {
                            arg[code] = value;
                        } else if (code === "backImage") {
                            arg[code] = value;
                        } else {
                            arg[code] = Number(value);
                        }
                    }
                }
            }
        }
        if (arg.x === null) {
            if (character) {
                var screenX = $gameParty.inBattle() ? 0 : character.screenX();
                var displayX = $gameParty.inBattle()
                    ? 0
                    : $gameMap._displayX * 48;
                arg.x = screenX + displayX;
            } else {
                arg.x = 0;
            }
        }
        if (arg.y === null) {
            if (character) {
                var screenY = $gameParty.inBattle() ? 0 : character.screenY();
                var displayY = $gameParty.inBattle()
                    ? 0
                    : $gameMap._displayY * 48;
                arg.y = screenY + displayY;
            } else {
                arg.y = 0;
            }
        }
        if (arg.extend) {
            arg.extend = eval(arg.extend);
        }

        arg.terminate = false;
        return arg;
    };

    CommonPopupManager.setPopUpdate = function () {
        if (this._readyPopup) {
            for (var i = 0; i < this._readyPopup.length; i++) {
                if (this._readyPopup[i]) {
                    var arg = this._readyPopup[i];
                    if (ImageManager.isReady()) {
                        this.startPopup(arg);
                        delete this._readyPopup[i];
                        this._readyPopup.compact();
                        return;
                    } else {
                        this.bltCheck(this.makeBitmap(arg));
                    }
                }
            }
        }
    };

    CommonPopupManager.makeBitmap = function (arg) {
        var fileName = arg.backImage;
        ImageManager.loadPicture(fileName);
        return ImageManager.loadPicture(fileName);
    };

    CommonPopupManager.bltCheck = function (bitmap) {
        this.testBitmap().blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0);
        bitmap = null;
    };

    CommonPopupManager.startPopup = function (arg) {
        CommonPopupManager._tempCommonSprites.setNullPos(arg);
    };

    CommonPopupManager.clearPopup = function (tag) {
        if (!CommonPopupManager._tempCommonSprites) {
            CommonPopupManager.initTempSprites();
        }

        for (var i = 0; i < CommonPopupManager._tempCommonSprites.length; i++) {
            if (CommonPopupManager._tempCommonSprites[i]) {
                if (
                    !tag ||
                    tag === CommonPopupManager._tempCommonSprites[i].tag
                ) {
                    CommonPopupManager._tempCommonSprites[i].delay = 0;
                    CommonPopupManager._tempCommonSprites[i].count = 1;
                    var sprite =
                        CommonPopupManager._tempCommonSprites[i].sprite;
                    if (sprite) sprite._count = 1;
                }
            }
        }
    };

    var _cPU_SsBase_initialize = Spriteset_Base.prototype.initialize;
    Spriteset_Base.prototype.initialize = function () {
        _cPU_SsBase_initialize.call(this);
        this.createSpritePopup();
    };

    var _cPU_SsBase_update = Spriteset_Base.prototype.update;
    Spriteset_Base.prototype.update = function () {
        _cPU_SsBase_update.call(this);

        if (this._popupContainer === "") {
            return;
        }
        if (CommonPopupManager._tempCommonSprites) {
            for (
                var i = 0;
                i < CommonPopupManager._tempCommonSprites.length;
                i++
            ) {
                if (CommonPopupManager._tempCommonSprites[i]) {
                    if (CommonPopupManager._tempCommonSprites[i].terminate) {
                        var sprite =
                            CommonPopupManager._tempCommonSprites[i].sprite;
                        this._popupContainer.removeChild(sprite);
                        delete CommonPopupManager._tempCommonSprites[i];
                    } else if (
                        !CommonPopupManager._tempCommonSprites[i].sprite
                    ) {
                        var sprite = new Sprite_Popup(i);
                        this._popupContainer.addChild(sprite);
                        CommonPopupManager._tempCommonSprites[i].sprite =
                            sprite;
                    }
                }
            }
        }
    };

    var _cPU_SBase_update = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function () {
        _cPU_SBase_update.call(this);
        if (CommonPopupManager) {
            CommonPopupManager.setPopUpdate();
        }
    };

    Spriteset_Base.prototype.createSpritePopup = function () {
        var width = Graphics.boxWidth;
        var height = Graphics.boxHeight;
        var x = (Graphics.width - width) / 2;
        var y = (Graphics.height - height) / 2;
        this._popupContainer = new Sprite();
        this._popupContainer.setFrame(x, y, width, height);
        this.addChild(this._popupContainer);
    };

    var _cPU_SBase_terminate = Scene_Base.prototype.terminate;
    Scene_Base.prototype.terminate = function () {
        _cPU_SBase_terminate.call(this);
        this.terminatePopup();
    };

    Scene_Base.prototype.terminatePopup = function () {
        if (!CommonPopupManager._tempCommonSprites) {
            CommonPopupManager.initTempSprites();
        }

        for (var i = 0; i < CommonPopupManager._tempCommonSprites.length; i++) {
            if (CommonPopupManager._tempCommonSprites[i]) {
                var sprite = CommonPopupManager._tempCommonSprites[i].sprite;

                if (sprite) sprite.terminate();
                delete CommonPopupManager._tempCommonSprites[i];
            }
        }
        CommonPopupManager._setedPopupss = [];
        CommonPopupManager._readyPopup = [];
    };

    var _cPU_SMap_launchBattle = Scene_Map.prototype.launchBattle;
    Scene_Map.prototype.launchBattle = function () {
        _cPU_SMap_launchBattle.call(this);
        this.terminatePopup();
    };

    //メッセージウインドウのアイコン描写を再設定

    Window_Message.prototype.drawIcon = function (iconIndex, x, y) {
        const bitmap = ImageManager.loadSystem("IconSet");
        const pw = ImageManager.iconWidth;
        const ph = ImageManager.iconHeight;
        const sx = (iconIndex % 16) * pw;
        const sy = Math.floor(iconIndex / 16) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
    };

    Window_Message.prototype.processDrawIcon = function (iconIndex, textState) {
        if (textState.drawing) {
            this.drawIcon(iconIndex, textState.x + 2, textState.y + 2);
        }
        textState.x += ImageManager.iconWidth + 4; // アイコンの実際の幅に基づいて位置を調整
    };



    //ここから MV Joint

    function isRect(value) {
        return typeof value === "object";
    }

    function rectlize(x, y, w, h) {
        if (isRect(x)) {
            return x;
        }
        var newRect = new Rectangle(x, y, w, h);
        return newRect;
    }

    var Window_Base_initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function (x, y, w, h) {
        var rect = rectlize(x, y, w, h);
        Window_Base_initialize.call(this, rect);
    };

    //ここまで MV Joint

    Game_Actor.prototype.addParam = function (paramId, value) {
        const paramObject = {
            name: TextManager.param(paramId),
            value: value > 0
        };
        
        this.executeWithPopupControl(
            () => _Game_Actor.addParam.call(this, paramId, value),
            "params",  // battleShowListで使用している文字列に合わせる
            value,
            paramObject
        );
    };

    // ポップアップ表示制御用のヘルパー関数
    Game_Actor.prototype.executeWithPopupControl = function(callback, type, value, object) {
        const tempEnable = CommonPopupManager._popEnable;
        if (tempEnable && $gameParty.inBattle() && !battleShowList.contains(type)) {
            CommonPopupManager._popEnable = false;
        }
        
        const result = callback.call(this);
        
        if (tempEnable && CommonPopupManager._popEnable) {
            CommonPopupManager.showInfo(object, value, type, this.actorId());
        }
        
        CommonPopupManager._popEnable = tempEnable;
        return result;
    };

    Game_Actor.prototype.changeExp = function (exp, show) {
        const expDiff = exp - this.currentExp();
        const preLevel = this.level;
        const preSkills = this._skills.clone();
        
        const expObject = {
            name: TextManager.exp,
            value: expDiff > 0
        };
        
        this.executeWithPopupControl(
            () => _Game_Actor.changeExp.call(this, exp, show),
            "exp",
            expDiff,
            expObject
        );
        
        // レベル変化の処理
        const levelDiff = this.level - preLevel;
        if (levelDiff !== 0) {
            const levelObject = {
                name: TextManager.level,
                value: levelDiff > 0
            };
            this.executeWithPopupControl(
                () => {},
                "level",
                levelDiff,
                levelObject
            );
        }
        
        // 新規習得スキルの処理
        this._skills.forEach((skillId) => {
            if (!preSkills.contains(skillId)) {
                this.executeWithPopupControl(
                    () => {},
                    "skill",
                    1,
                    $dataSkills[skillId]
                );
            }
        });
    };

    // Game_Party拡張
    const _Game_Party = {
        gainGold: Game_Party.prototype.gainGold,
        gainItem: Game_Party.prototype.gainItem,
    };

    // Game_Party用のポップアップ制御ヘルパー関数
    Game_Party.prototype.executeWithPopupControl = function(callback, type, object, value) {
        const result = callback.call(this);
        
        if (CommonPopupManager._popEnable) {
            if (!($gameParty.inBattle() && !battleShowList.contains(type))) {
                CommonPopupManager.showInfo(object, value, type);
            }
        }
        
        return result;
    };

    Game_Party.prototype.gainGold = function (amount) {
        const hash = {
            name: "",
            iconIndex: goldIconIndex,
            description: "",
            value: Math.abs(amount),
        };
        return this.executeWithPopupControl(
            () => _Game_Party.gainGold.call(this, amount),
            "gold",
            hash,
            amount
        );
    };

    Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
        if (!item) return _Game_Party.gainItem.call(this, item, amount, includeEquip);
  
        const isHiddenItem = item.itypeId === 3 || item.itypeId === 4;
        const shouldShowHidden =
            (item.itypeId === 3 && showGetHideItemA) ||
            (item.itypeId === 4 && showGetHideItemB);
  
        if (!isHiddenItem || shouldShowHidden) {
            return this.executeWithPopupControl(
                () => _Game_Party.gainItem.call(this, item, amount, includeEquip),
                "item",
                item,
                amount
            );
        }
  
        return _Game_Party.gainItem.call(this, item, amount, includeEquip);
    };
 
    const _gInfo_GActor_changeClassLevel = Game_Actor.prototype.changeClassLevel;
    Game_Actor.prototype.changeClassLevel = function (level, show) {
        const upLevel = level - this.currentClassLevel();
        const preSkills = this._skills.clone();
        
        // クラスレベル変更の処理
        const classObject = {
            name: TextManager.classLevel,
            value: upLevel > 0
        };
        
        this.executeWithPopupControl(
            () => _gInfo_GActor_changeClassLevel.call(this, level, show),
            "classLevel",
            upLevel,
            classObject,
            this.currentClass().name
        );
        
        // 新規習得スキルの処理
        this._skills.forEach(skillId => {
            if (!preSkills.contains(skillId)) {
                this.executeWithPopupControl(
                    () => {},
                    "skill",
                    1,
                    $dataSkills[skillId]
                );
            }
        });
    };

    const __BManager_displayRewards = BattleManager.displayRewards;

    // BattleManager用のポップアップ制御ヘルパー関数
    BattleManager.executeWithPopupControl = function(callback, type, object, value, delay = false) {
        if (!Imported["BattleFormation"]) return callback.call(this);
        if (!CommonPopupManager.popEnable()) return callback.call(this);
        if ($gameParty.inBattle() && !battleShowList.contains(type)) return callback.call(this);
        
        if (delay) {
            $gameTemp._popupDelay = rewardPopupDelay;
        }
        
        const result = callback.call(this);
        
        if (delay) {
            $gameTemp._popupDelay = 0;
        }
        
        return result;
    };

    BattleManager.displayRewards = function () {
        __BManager_displayRewards.call(this);
    };

    CommonPopupManager.generateTypeText = function(type, value, object) {
        switch (type) {
            case "gold":
                return value < 0 ? lostGoldText : getGoldText;
            case "item":
                if (value > 1) return getInfoTextNum;
                if (value === -1) return lostInfoText;
                if (value < -1) return lostInfoTextNum;
                return getInfoText;
            case "exp":
                return object.value ? ExpUpText : ExpDownText;
            case "level":
                return object.value ? lvUpText : lvDownText;
            case "abp":
                return object.value ? abpUpText : abpDownText;
            case "classLevel":
                return object.value ? clvUpText : clvDownText;
            case "param":
                return object.value ? ParamUpText : ParamDownText;
            case "skill":
                return value === 1 ? getInfoSkillText : lostInfoSkillText;
            default:
                return value;
        }
    };

    CommonPopupManager.showInfo = function (object, value, type, actor, c) {
        try {
            // 基本的なパラメータチェック
            if (!object) {
                console.warn("CommonPopupManager: objectが未定義です");
                return;
            }
            if (value === 0) {
                return;
            }

            let text1 = this.generateTypeText(type, value, object);

            // メタ情報から文字のカラーを取得
            if (type === "item") {
                text1 = this.applyColorCode(text1, object);
            }

            // テキスト検証
            if (!text1 || text1 === "" || text1 === "null") {
                console.warn("CommonPopupManager: 無効なテキスト");
                return;
            }

            const { text: processedText, se } = this.processTextReplacements(text1, object, value, actor, c);
            text1 = processedText;

            const { bitmap, texts, oneHeight, height } = this.createInfoBitmap(text1);

            this.window().contents = bitmap;
            this.window().drawTextEx("\\FS[" + infoFontSize + "]", 0, 0);
            this.drawPopupTexts(texts, oneHeight);

            this.displayPopup(bitmap, se, height, texts);

        } catch (error) {
            console.error("CommonPopupManager.showInfo エラー:", error);
        }
    };

    CommonPopupManager.displayPopup = function(bitmap, se, height, texts) {
        const arg = this.createPopupArguments(bitmap, se, height);
        arg.y += infoSupY;
        this.adjustBattleWindowPosition(arg, height);

        CommonPopupManager._lastIndex = this._tempCommonSprites.setNullPos(arg);

    };

    var _gInfo_BManager_gainRewards = BattleManager.gainRewards;
    BattleManager.gainRewards = function () {
        CommonPopupManager._popEnable =
            CommonPopupManager.popEnable() && useRewardsInfo;
        $gameTemp._popupDelay = rewardPopupDelay;
        _gInfo_BManager_gainRewards.call(this);
        CommonPopupManager._popEnable = false;
        $gameTemp._popupDelay = 0;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_System.prototype.pushInfoLog = function (text) {
        if (!this._infoLog) this._infoLog = [];
        this._infoLog.unshift(text);
        if (this._infoLog.length > logParams.max) {
            for (;;) {
                if (this._infoLog.length <= logParams.max) break;
                this._infoLog.pop();
            }
        }
    };

    Game_System.prototype.infoLog = function () {
        if (!this._infoLog) this._infoLog = [];
        return this._infoLog;
    };

    // Scene_Map拡張
    const _SMap_updateScene = Scene_Map.prototype.updateScene;
    Scene_Map.prototype.updateScene = function () {
        _SMap_updateScene.call(this);
        if (!SceneManager.isSceneChanging()) {
            this.updateCallInfoLog();
        }
    };

    Scene_Map.prototype.updateCallInfoLog = function () {
        if (this.isInfoLogEnabled()) {
            if (this.isInfoLogCalled()) {
                this.infoLogCalling = true;
            }
            if (this.infoLogCalling && !$gamePlayer.isMoving()) {
                this.callInfoLog();
            }
        } else {
            this.infoLogCalling = false;
        }
    };

    Scene_Map.prototype.isInfoLogEnabled = function () {
        return logParams.key && !$gameMap.isEventRunning();
    };

    Scene_Map.prototype.isInfoLogCalled = function () {
        return Input.isTriggered(logParams.key) || TouchInput.isCancelled();
    };

    Scene_Map.prototype.callInfoLog = function () {
        SoundManager.playOk();
        SceneManager.push(Scene_InfoLog);
        $gameTemp.clearDestination();
        this._mapNameWindow.hide();
        this._waitCount = 2;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    function Scene_InfoLog() {
        this.initialize.apply(this, arguments);
    }

    Scene_InfoLog.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_InfoLog.prototype.constructor = Scene_InfoLog;

    Scene_InfoLog.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createInfoLogWindow();
    };

    Scene_InfoLog.prototype.createInfoLogWindow = function () {
        this._logWindow = new Window_InfoLog();
        this._logWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(this._logWindow);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    function Window_InfoLog() {
        this.initialize.apply(this, arguments);
    }

    Window_InfoLog.prototype = Object.create(Window_Selectable.prototype);
    Window_InfoLog.prototype.constructor = Window_InfoLog;

    Window_InfoLog.prototype.initialize = function () {
        var x = -this.standardPadding();
        var y = -this.standardPadding();
        var width = Graphics.boxWidth + this.standardPadding() * 2;
        var height = Graphics.boxHeight + this.standardPadding() * 2;
        var rect = new Rectangle(x, y, width, height);
        this._max = $gameSystem.infoLog().length;
        Window_Selectable.prototype.initialize.call(this, rect);
        this._upArrowSprite.x = this.contentsWidth() - 16;
        this._upArrowSprite.y += 16;
        this._downArrowSprite.x = this.contentsWidth() - 16;
        this._downArrowSprite.y -= 16;
        this.backOpacity = 0;
        this.refresh();
        this.activate();
        logParams.reverse ? this.select(this.maxItems() - 1) : this.select(0);
    };

    Window_InfoLog.prototype.standardPadding = function () {
        return POPUP_CONSTANTS.DEFAULT_PADDING;
    };

    Window_InfoLog.prototype.itemHeight = function () {
        return this.lineHeight() * logParams.row;
    };

    Window_InfoLog.prototype.drawItem = function (index) {
        var rect = this.itemRect(index);
        var texts = $gameSystem.infoLog();
        if (logParams.reverse) texts = texts.slice(0).reverse();
        var color = "rgba(0,0,0,0.5)";
        var ts = texts[index].split("\\n");
        var yy = rect.y;
        var l = ts.length;
        var h = rect.height;
        var id = index + 1;
        if (logParams.reverse) id = this.maxItems() - id + 1;
        this.contents.fillRect(8, yy, this.contentsWidth() - 16, h, color);
        this.contents.fontSize = infoFontSize;
        this.changeTextColor(this.systemColor());
        this.drawText(("000" + id).slice(-3) + ":", 12, yy, 64);
        for (var i = 0, max = ts.length; i < max; i++) {
            if (i >= logParams.row) break;
            yy = rect.y + this.lineHeight() * i;
            if (max === 1 && logParams.row > 1)
                yy +=
                    (this.lineHeight() * logParams.row) / 2 -
                    this.lineHeight() / 2;
            this.drawTextEx("\\fs[" + infoFontSize + "]" + ts[i], 64, yy);
        }
    };

    Window_InfoLog.prototype.maxItems = function () {
        return this._max;
    };

    Window_InfoLog.prototype.lineHeight = function () {
        return infoFontSize + 8;
    };

    Window_InfoLog.prototype.itemRect = function (index) {
        var rect = Window_Selectable.prototype.itemRect.call(this, index);
        rect.y += 4;
        rect.x += 8;
        rect.width -= 16;
        return rect;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        __GInterpreter_pluginCommand.call(this, command, args);
        if (command === "インフォログ" || command === "SceneInfoLog") {
            switch (args[0]) {
                case "呼び出し":
                case "call":
                    SceneManager.push(Scene_InfoLog);
                    break;
            }
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WMCommand_addOriginalCommands =
        Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function () {
        __WMCommand_addOriginalCommands.call(this);
        if (logParams.menuName)
            this.addCommand(logParams.menuName, "infoLog", true);
    };

    var __SMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        __SMenu_createCommandWindow.call(this);
        this._commandWindow.setHandler(
            "infoLog",
            this.commandInfoLog.bind(this)
        );
    };

    Scene_Menu.prototype.commandInfoLog = function () {
        SceneManager.push(Scene_InfoLog);
    };

    // 定数の集約
    const POPUP_CONSTANTS = {
        // スプライト関連
        MAX_SPRITES: 50, // 最大スプライト数
        SLIDE_COUNT: 60, // スライドカウント

        // 表示位置
        DEFAULT_PADDING: 18, // デフォルトパディング
        ICON_PADDING: 4, // アイコンのパディング
        TEXT_X_OFFSET: 64, // テキストのX位置オフセット

        // アニメーション
        PATTERN: {
            NORMAL: 0,
            STRETCH: -1,
            GROW_UP: -2,
        },

        // デフォルト値
        DEFAULT_VOLUME: 90,
        DEFAULT_PITCH: 100,
        DEFAULT_PAN: 0,
    };

    CommonPopupManager.generatePopupText = function (
        object,
        value,
        type,
        actor,
        c
    ) {
        let text = null;

        // テキスト生成処理
        switch (type) {
            case "gold":
                text = value < 0 ? lostGoldText : getGoldText;
                break;
            case "item":
                text = this.generateItemText(object, value);
                break;
            // ... 他のケース
        }

        return this.processTextReplacements(text, object, value, actor, c);
    };

    CommonPopupManager.generateItemText = function (object, value) {
        let text = getInfoText;
        if (value > 1) {
            text = getInfoTextNum;
        } else if (value === -1) {
            text = lostInfoText;
        } else if (value < -1) {
            text = lostInfoTextNum;
        }

        // カラーコード処理
        return this.applyColorCode(text, object);
    };

    CommonPopupManager.createPopupBitmap = function (text1) {
        const texts = this.prepareTexts(text1);
        const oneHeight = infoFontSize + 8;
        const height = oneHeight * texts.length;

        const bitmap = new Bitmap(Graphics.boxWidth, height);
        this.drawPopupBackground(bitmap);
        this.drawPopupText(bitmap, texts, oneHeight);

        return bitmap;
    };

    CommonPopupManager.calculatePopupPosition = function (arg, height) {
        // 基本位置の計算
        const position = this.getBasePosition(arg, height);
        
        // 上部表示の場合の調整
        if (infoPosition === "Up") {
            position.y = 0;
            if (infoPattern === "GrowUp" && infoSlideAction !== "Down") {
                position.y = height;
            }
        }
        
        // Y位置の補正
        position.y += infoSupY;
        
        // バトル中の位置調整
        if ($gameParty.inBattle()) {
            this.adjustBattlePosition(position, height, arg.anchorY);
        }
        
        return position;
    };

    CommonPopupManager.getBasePosition = function(arg, height) {
        const position = { x: 0, y: 0 };
        
        switch (infoPattern) {
            case "GrowUp":
                position.x = 0 + infoSupX;
                position.y = Graphics.height;
                arg.moveX = 0;
                arg.anchorX = 0;
                arg.anchorY = 1.0;
                arg.pattern = POPUP_CONSTANTS.PATTERN.GROW_UP;
                if (infoSlideAction === "Down") arg.anchorY = 0;
                break;
                
            case "Stretch":
                position.x = 0 + infoSupX;
                position.y = Graphics.height - height;
                arg.moveX = 0;
                arg.anchorX = 0;
                arg.anchorY = 0;
                arg.pattern = POPUP_CONSTANTS.PATTERN.STRETCH;
                break;
                
            default:
                position.x = Graphics.boxWidth * -1 + infoSupX;
                position.y = Graphics.height - height;
                arg.moveX = Graphics.boxWidth;
                arg.anchorX = 0;
                arg.anchorY = 0;
        }
        
        return position;
    };

    CommonPopupManager.adjustBattlePosition = function(position, height, anchorY) {
        // メッセージウィンドウとの位置調整
        if (SceneManager._scene._messageWindow?.active) {
            if (SceneManager._scene._messageWindow._positionType === 2) {
                const messageY = SceneManager._scene._messageWindow.y;
                position.y = Math.min(position.y, messageY - height + height * anchorY);
            }
        }
        
        // ステータスウィンドウとの位置調整
        if (SceneManager._scene._statusWindow?.isOpen() && 
            (!$gameMessage.isBusy() || InfoMVstyle)) {
            const statusY = SceneManager._scene._statusWindow.y;
            position.y = Math.min(position.y, statusY - height + height * anchorY);
        }
    };

    CommonPopupManager.generateText = function(type, value, object) {
        switch (type) {
            case "gold":
                return value < 0 ? lostGoldText : getGoldText;
            case "item":
                if (value > 1) return getInfoTextNum;
                if (value === -1) return lostInfoText;
                if (value < -1) return lostInfoTextNum;
                return getInfoText;
            case "exp":
                return object.value ? ExpUpText : ExpDownText;
            case "level":
                return object.value ? lvUpText : lvDownText;
            case "abp":
                return object.value ? abpUpText : abpDownText;
            case "classLevel":
                return object.value ? clvUpText : clvDownText;
            case "param":
                return object.value ? ParamUpText : ParamDownText;
            case "skill":
                return value === 1 ? getInfoSkillText : lostInfoSkillText;
            default:
                return value;
        }
    };

    CommonPopupManager.processTextReplacements = function(text, object, value, actor, c) {
        if (!text) return null;

        // SEパラメータの抽出
        const { text: processedText, se } = this.extractSEParameters(text);
        text = processedText;  // 抽出後のテキストを使用

        // アクター関連の置換
        if (actor) {
            actor = $gameActors.actor(actor);
            text = text.replace(/_actor/g, actor.name());
            text = text.replace(
                /_aicon/g,
                actor.actorId() + actorIconStartIndex - 1
            );
        }

        // クラス名の置換
        if (c) {
            text = text.replace(/_class/g, c);
        }

        // 基本情報の置換
        text = text.replace(/_name/g, object.name || "");
        text = text.replace(/_icon/g, object.iconIndex || 0);
        text = text.replace(/_num/g, Math.abs(value));

        // 説明文の置換
        const descs = object.description ? object.description.split(/\n/) : [];
        text = descs[0] ? text.replace(/_desc1/g, descs[0]) : text.replace(/_desc1/g, "");
        text = descs[1] ? text.replace(/_desc2/g, descs[1]) : text.replace(/_desc2/g, "");

        return {
            text: text,
            se: se
        };
    };

    CommonPopupManager.extractSEParameters = function(text) {
        const se = { name: "", volume: 90, pitch: 100, pan: 0 };
        
        return {
            text: text.replace(/^_se\[(.+?)\]/i, (_, params) => {
                const [name, volume, pitch, pan] = params.split(",");
                se.name = name;
                if (volume) se.volume = parseInt(volume, 10);
                if (pitch) se.pitch = parseInt(pitch, 10);
                if (pan) se.pan = parseInt(pan, 10);
                return "";
            }),
            se: se
        };
    };

    CommonPopupManager.createPopupArguments = function(bitmap, se, height) {
        const arg = this.setPopup([]);
        arg.bitmap = bitmap;
        arg.se = se;
        arg.enableOutEffect = enableOutMove;
        
        this.setupPopupPosition(arg, height);
        if (infoPosition === "Top") {
            arg.y = 0;
            if (infoPattern === "GrowUp" && infoSlideAction !== "Down") {
                arg.y = height;
            }
        }
        
        // アニメーション関連の設定
        arg.moveY = 0;
        arg.count = infoCount;
        arg.fixed = false;
        arg.extend = [infoMoveFade, infoMoveWait];
        arg.slideCount = infoSlideCount;
        arg.delay = this.calculatePopupDelay();
        arg.slideAction = infoSlideAction;
        
        return arg;
    };

    CommonPopupManager.calculatePopupDelay = function() {
        let delay = 0;
        
        if (!this._tempCommonSprites) {
            this._tempCommonSprites = [];
        }
        
        const sprites = this._tempCommonSprites.compact();
        const lastIndex = this._lastIndex;
        
        if (lastIndex !== undefined && lastIndex >= 0 && sprites[lastIndex]) {
            sprites.sort((a, b) => a.delay > b.delay ? -1 : 1);
            delay = sprites[0].delay + infoDelay;
        }
        
        if ($gameTemp._popupDelay && delay === 0) {
            delay += $gameTemp._popupDelay;
        }
        
        return delay;
    };

    CommonPopupManager.createInfoBitmap = function(text1) {
        // テキストの分割と前処理
        const texts = text1.split(/\n|\\n/).filter(line => {
            const stripped = line.replace(/\\C\[\d+\]/g, "");
            return stripped !== "";
        }).compact();
 
        // システムログへの追加
        $gameSystem.pushInfoLog(text1);
 
        // ビットマップのサイズ計算
        const oneHeight = infoFontSize + 8;
        const height = oneHeight * texts.length;
        const bitmap = new Bitmap(Graphics.boxWidth, height);
 
        // 背景の描画
        this.drawBackground(bitmap);
 
        return { bitmap, texts, oneHeight, height };
    };

    CommonPopupManager.drawBackground = function(bitmap) {
        bitmap.fillRect(0, 0, infoWidth / 2, bitmap.height, "rgba(0,0,0,0.5)");
        bitmap.gradientFillRect(
            infoWidth / 2,
            0,
            infoWidth / 2,
            bitmap.height,
            "rgba(0,0,0,0.5)",
            "rgba(0,0,0,0)"
        );
    };

    CommonPopupManager.drawPopupTexts = function(texts, oneHeight) {
        texts.forEach((text, index) => {
            const formattedText = `\\FS[${infoFontSize}]${text}`;
            this.window().drawTextEx(formattedText, 8, index * oneHeight);
        });
    };

    // エラー種別の定義
    CommonPopupManager.ERROR_TYPES = {
        INVALID_OBJECT: "無効なオブジェクト",
        INVALID_TEXT: "無効なテキスト",
        BITMAP_CREATE_FAILED: "ビットマップ生成失敗",
        WINDOW_NOT_READY: "ウィンドウ未準備",
        INVALID_POSITION: "無効な位置情報"
    };

    // エラーログ出力の統一
    CommonPopupManager.logError = function(type, details = "") {
        console.error(`CommonPopupManager: ${this.ERROR_TYPES[type]}`, details);
    };

    // 警告ログ出力の統一
    CommonPopupManager.logWarning = function(type, details = "") {
        console.warn(`CommonPopupManager: ${this.ERROR_TYPES[type]}`, details);
    };

    // バリデーション関数の追加
    CommonPopupManager.validatePopupParameters = function(object, value, type) {
        if (!object) {
            this.logError("INVALID_OBJECT");
            return false;
        }

        if (value === 0 || value === undefined) {
            return false;
        }

        if (!this.isValidType(type)) {
            this.logWarning("INVALID_TYPE", type);
            return false;
        }

        return true;
    };

    // 型チェック関数
    CommonPopupManager.isValidType = function(type) {
        const validTypes = [
            "gold", "item", "exp", "level", "abp",
            "classLevel", "param", "skill"
        ];
        return validTypes.includes(type);
    };

    CommonPopupManager.optimizeBitmap = function(bitmap) {
        // ビットマップのキャッシュ管理
        if (!this._bitmapCache) {
            this._bitmapCache = new Map();
        }

        const key = this.generateBitmapKey(bitmap);
        if (this._bitmapCache.has(key)) {
            return this._bitmapCache.get(key);
        }

        // キャッシュサイズの制限
        if (this._bitmapCache.size > 20) {
            const oldestKey = this._bitmapCache.keys().next().value;
            this._bitmapCache.delete(oldestKey);
        }

        this._bitmapCache.set(key, bitmap);
        return bitmap;
    };

    CommonPopupManager.generateBitmapKey = function(bitmap) {
        return `${bitmap.width}_${bitmap.height}_${Date.now()}`;
    };

    CommonPopupManager.cleanupSprites = function() {
        // 不要なスプライトの削除
        if (this._tempCommonSprites) {
            this._tempCommonSprites = this._tempCommonSprites.filter(sprite => {
                if (!sprite || sprite.terminate) {
                    if (sprite && sprite.bitmap) {
                        sprite.bitmap.destroy();
                    }
                    return false;
                }
                return true;
            });
        }
    };

    CommonPopupManager.manageMemory = function() {
        // スプライトの定期的なクリーンアップ
        this.cleanupSprites();
        
        // ビットマップキャッシュの管理
        this.manageBitmapCache();
        
        // 不要なポップアップの削除
        this.cleanupPopups();
    };

    CommonPopupManager.manageBitmapCache = function() {
        if (!this._bitmapCache) return;
        
        const now = Date.now();
        const CACHE_LIFETIME = 60000; // 60秒
        
        // 古いキャッシュの削除
        for (const [key, data] of this._bitmapCache.entries()) {
            if (now - data.timestamp > CACHE_LIFETIME) {
                if (data.bitmap) {
                    data.bitmap.destroy();
                }
                this._bitmapCache.delete(key);
            }
        }
    };

    CommonPopupManager.cleanupPopups = function() {
        if (!this._setedPopups) return;
        
        // 終了したポップアップの削除
        this._setedPopups = this._setedPopups.filter(popup => {
            if (!popup || popup[2] <= 0) {
                return false;
            }
            return true;
        });
        
        // 配列の最適化
        if (this._setedPopups.length > 0 && this._setedPopups.length < this._setedPopups.capacity) {
            this._setedPopups = this._setedPopups.slice();
        }
    };

    // Scene_Base拡張
    var _Scene_Base_update = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function() {
        _Scene_Base_update.call(this);
        // 10秒ごとに軽いメモリ管理を実行
        if (Graphics.frameCount % 600 === 0) {
            this.performLightMemoryManagement();
        }
    };

    Scene_Base.prototype.performLightMemoryManagement = function() {
        if (CommonPopupManager._bitmapCache) {
            // 古いキャッシュのみを削除
            const now = Date.now();
            const CACHE_LIFETIME = 300000; // 5分
            
            for (const [key, data] of CommonPopupManager._bitmapCache.entries()) {
                if (now - data.timestamp > CACHE_LIFETIME) {
                    CommonPopupManager._bitmapCache.delete(key);
                }
            }
        }
    };

    CommonPopupManager.setupPopupPosition = function(arg, height) {
        switch (infoPattern) {
            case "GrowUp":
                arg.x = infoSupX;
                arg.y = Graphics.height;
                arg.moveX = 0;
                arg.anchorX = 0;
                arg.anchorY = 1.0;
                arg.pattern = -2;
                if (infoSlideAction === "Down") arg.anchorY = 0;
                break;
                
            case "Stretch":
                arg.x = infoSupX;
                arg.y = Graphics.height - height;
                arg.moveX = 0;
                arg.anchorX = 0;
                arg.anchorY = 0;
                arg.pattern = -1;
                break;
                
            default:
                arg.x = Graphics.boxWidth * -1 + infoSupX;
                arg.y = Graphics.height - height;
                arg.moveX = Graphics.boxWidth;
                arg.anchorX = 0;
                arg.anchorY = 0;
        }
    };

    CommonPopupManager.adjustBattleWindowPosition = function(arg, height) {
        // メッセージウィンドウとの位置調整
        if ($gameParty.inBattle() && 
            SceneManager._scene._messageWindow?.active) {
            if (SceneManager._scene._messageWindow._positionType === 2) {
                const messageWindowY = SceneManager._scene._messageWindow.y;
                arg.y = Math.min(arg.y, messageWindowY - height + height * arg.anchorY);
            }
        }

        // ステータスウィンドウとの位置調整
        if (SceneManager._scene._statusWindow?.isOpen() &&
            (!$gameMessage.isBusy() || InfoMVstyle)) {
            const statusWindowY = SceneManager._scene._statusWindow.y;
            arg.y = Math.min(arg.y, statusWindowY - height + height * arg.anchorY);
        }
    };

    CommonPopupManager.replaceTextPlaceholders = function(text, object, actor, className, value) {
        const descriptions = object.description?.split(/\n/) || [];
        
        if (actor) {
            const gameActor = $gameActors.actor(actor);
            text = text.replace(/_actor/g, gameActor.name());
            text = text.replace(
                /_aicon/g,
                gameActor.actorId() + actorIconStartIndex - 1
            );
        }
        
        const replacements = {
            _class: className || "",
            _name: object.name || "",
            _icon: object.iconIndex || "",
            _num: Math.abs(value),
            _desc1: descriptions[0] || "",
            _desc2: descriptions[1] || ""
        };
        
        return Object.entries(replacements).reduce((text, [key, value]) => {
            return text.replace(new RegExp(key, 'g'), value);
        }, text);
    };

    CommonPopupManager.getTextByType = function(type, value, object) {
        let text = null;
        
        switch (type) {
            case "gold":
                text = value < 0 ? lostGoldText : getGoldText;
                break;
            case "item":
                text = getInfoText;
                if (value > 1) {
                    text = getInfoTextNum;
                } else if (value === -1) {
                    text = lostInfoText;
                } else if (value < -1) {
                    text = lostInfoTextNum;
                }
                // メタ情報から文字のカラーを取得
                let colorCode = "";
                if (object.meta && object.meta.NameColor) {
                    const colorIndex = parseInt(object.meta.NameColor);
                    if (!isNaN(colorIndex) && colorIndex >= 0) {
                        colorCode = "\\C[" + colorIndex + "]";
                        defcolorCode = "\\C[0]";
                    }
                }
                // _nameの色を変更
                if (colorCode) {
                    text = text.replace(
                        /(_name)/g,
                        colorCode + "$1" + defcolorCode
                    );
                }
                break;
            case "exp":
                text = object.value ? ExpUpText : ExpDownText;
                break;
            case "level":
                text = object.value ? lvUpText : lvDownText;
                break;
            case "abp":
                text = object.value ? abpUpText : abpDownText;
                break;
            case "classLevel":
                text = object.value ? clvUpText : clvDownText;
                break;
            case "param":
                text = object.value ? ParamUpText : ParamDownText;
                break;
            case "skill":
                text = value === 1 ? getInfoSkillText : lostInfoSkillText;
                break;
            default:
                text = value;
        }
        
        return text;
    };

    CommonPopupManager.debugTest = function() {
        // アイテム獲得のテスト
        this.testPopup('item', {
            name: "ポーション",
            iconIndex: 176,
            description: "体力を回復する薬\n使用すると30回復"
        }, 1);
        
        // お金獲得のテスト
        this.testPopup('gold', {
            name: "所持金",
            iconIndex: 314
        }, 1000);
        
        // 経験値獲得のテスト
        this.testPopup('exp', {
            name: "経験値",
            value: true
        }, 100);
    };

    CommonPopupManager.testPopup = function(type, object, value) {
        try {
            this.showInfo(object, value, type);
            console.log(`テスト成功: ${type}のポップアップを表示`);
        } catch (error) {
            console.error(`テスト失敗: ${type}`, error);
        }
    };

    CommonPopupManager.openDebugMenu = function() {
        const scene = SceneManager._scene;
        const rect = new Rectangle(0, 0, 400, 300);
        rect.x = (Graphics.boxWidth - rect.width) / 2;
        rect.y = (Graphics.boxHeight - rect.height) / 2;
        
        const window = new Window_PopupDebugMenu(rect);
        scene.addWindow(window);
        window.show();
        window.activate();
    };

    CommonPopupManager.validatePopupParameters = function(object, value, type) {
        if (!object) {
            console.warn("CommonPopupManager: objectが未定義です");
            return false;
        }
        if (value === 0) {
            return false;
        }
        return true;
    };

    CommonPopupManager.applyColorCode = function(text, object) {
        let colorCode = "";
        let defcolorCode = "\\C[0]";
        
        if (object.meta && object.meta.NameColor) {
            const colorIndex = parseInt(object.meta.NameColor);
            if (!isNaN(colorIndex) && colorIndex >= 0) {
                colorCode = "\\C[" + colorIndex + "]";
            }
        }
    
        // _nameの色を変更
        if (colorCode) {
            text = text.replace(
                /(_name)/g,
                colorCode + "$1" + defcolorCode
            );
        }
        
        return text;
    };
})();

// Window_Baseの代わりに専用のウィンドウクラスを作成
function Window_CommonPopup() {
    this.initialize(...arguments);
}

Window_CommonPopup.prototype = Object.create(Window_Base.prototype);
Window_CommonPopup.prototype.constructor = Window_CommonPopup;

// 専用のアイコン描画メソッド
Window_CommonPopup.prototype.drawScaledIcon = function(iconIndex, x, y, fontSize) {
    const bitmap = ImageManager.loadSystem("IconSet");
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    
    // フォントサイズに基づくスケール計算
    const defaultFontSize = 28; // RPGツクールMZのデフォルトフォントサイズ
    const scale = Math.min(fontSize / defaultFontSize, 1.2); // 最大1.2倍まで
    
    // アイコンサイズの計算
    const dw = Math.floor(pw * scale);
    const dh = Math.floor(ph * scale);
    
    // Y位置の微調整（アイコンを垂直方向に中央揃え）
    const yOffset = Math.max(0, Math.floor((fontSize - dh) / 2));
    const adjustedY = y + yOffset;
    
    this.contents.blt(bitmap, sx, sy, pw, ph, x, adjustedY, dw, dh);
    
    return dw; // アイコンの描画幅を返す（テキスト位置の調整用）
};

// CommonPopupManagerの修正
CommonPopupManager.window = function() {
    if (this._window) {
        return this._window;
    }
    this._window = new Window_CommonPopup(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    return this._window;
};

// アイコン描画処理の修正
Window_CommonPopup.prototype.processDrawIcon = function(iconIndex, textState) {
    if (textState.drawing) {
        const lineY = textState.y + (this.lineHeight() - this.contents.fontSize) / 2;
        const iconWidth = this.drawScaledIcon(
            iconIndex,
            textState.x + 2,
            lineY,
            this.contents.fontSize
        );
        textState.x += iconWidth + 4; // アイコンの実際の幅に基づいて位置を調整
    }
};

// プラグインコマンドの登録
PluginManager.registerCommand("SKM_GetInformation", "testPopup", args => {
    const type = args.type;
    const value = Number(args.value || 1);
    const object = {
        name: args.name || "テストアイテム",
        iconIndex: Number(args.iconIndex || 0),
        description: args.description || "",
        value: args.value > 0  // exp等で使用
    };
    CommonPopupManager.showInfo(object, value, type);
});

// デバッグメニューウィンドウの作成
function Window_PopupDebugMenu() {
    this.initialize(...arguments);
}

Window_PopupDebugMenu.prototype = Object.create(Window_Command.prototype);
Window_PopupDebugMenu.prototype.constructor = Window_PopupDebugMenu;

Window_PopupDebugMenu.prototype.initialize = function(rect) {
    Window_Command.prototype.initialize.call(this, rect);
    this.select(0);
};

Window_PopupDebugMenu.prototype.makeCommandList = function() {
    this.addCommand("アイテム獲得テスト", "item");
    this.addCommand("お金獲得テスト", "gold");
    this.addCommand("経験値獲得テスト", "exp");
    this.addCommand("全パターンテスト", "all");
    this.addCommand("閉じる", "cancel");
};

Window_PopupDebugMenu.prototype.processOk = function() {
    const symbol = this.currentSymbol();
    if (symbol === "cancel") {
        this.close();
        return;
    }
    if (symbol === "all") {
        CommonPopupManager.debugTest();
    } else {
        CommonPopupManager.testPopup(symbol, this.getTestObject(symbol), this.getTestValue(symbol));
    }
};

Window_PopupDebugMenu.prototype.getTestObject = function(type) {
    switch (type) {
        case "item":
            return {
                name: "ポーション",
                iconIndex: 176,
                description: "体力を回復する薬\n使用すると30回復"
            };
        case "gold":
            return {
                name: "所持金",
                iconIndex: 314
            };
        case "exp":
            return {
                name: "経験値",
                value: true
            };
        default:
            return {};
    }
};

Window_PopupDebugMenu.prototype.getTestValue = function(type) {
    switch (type) {
        case "gold":
            return 1000;
        case "exp":
            return 100;
        default:
            return 1;
    }
};

const _Scene_Map_updateDebugMenu = Scene_Map.prototype.updateDebugMenu;
Scene_Map.prototype.updateDebugMenu = function() {
    _Scene_Map_updateDebugMenu.call(this);
    if (Input.isTriggered("debug") && $gameTemp.isPlaytest()) {
        CommonPopupManager.openDebugMenu();
    }
};

const params = PluginManager.parameters('SKM_GetInformation');
const debugKey = params['debugKey'] || '';

if (debugKey) {
    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        if (Input.isTriggered(debugKey) && $gameTemp.isPlaytest()) {
            CommonPopupManager.openDebugMenu();
        }
    };
}

const keepPopupsInMenu = params['keepPopupsInMenu'] || 'clear';

// Scene_Map でメニュー遷移時の処理
const _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
Scene_Map.prototype.callMenu = function() {
    this.terminatePopup();  // 常に消去する
    _Scene_Map_callMenu.call(this);
};

// Game_Party拡張
const _Game_Party = {
    gainGold: Game_Party.prototype.gainGold,
    gainItem: Game_Party.prototype.gainItem,
};

// 戦闘隊形関連の機能を追加
Game_Party.prototype.battleFormation = function() {
    if (!this._battleFormation) {
        this._battleFormation = {
            level: 0,
            exp: 0
        };
    }
    return this._battleFormation;
};

Game_Party.prototype.gainFormationExp = function(exp) {
    const formation = this.battleFormation();
    const maxLevel = 10;  // 最大レベル
    
    if (formation.level >= maxLevel) return false;
    
    formation.exp += exp;
    const nextExp = this.nextFormationLevelExp();
    
    if (formation.exp >= nextExp) {
        formation.level++;
        formation.exp = 0;
        return true;
    }
    
    return false;
};

Game_Party.prototype.nextFormationLevelExp = function() {
    const formation = this.battleFormation();
    return 100 * Math.pow(2, formation.level);  // レベルに応じて必要経験値増加
};

Game_Party.prototype.isMaxBfLevel = function() {
    const formation = this.battleFormation();
    return formation.level >= 10;  // 最大レベルは10
};
