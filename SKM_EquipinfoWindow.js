//=============================================================================
// SKM_EquipinfoWindow.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 装備情報プレビュープラグイン v1.0.0
 * @author さかなのまえあし
 * @url https://github.com/fishs075/MZ/blob/main/SKM_EquipinfoWindow.js
 *
 * @param ParamLabels
 * @text 基本パラメータ表示名
 * @type struct<ParamLabel>[]
 * @desc 基本パラメータの表示名を設定します
 * @default ["{\"ParamId\":\"2\",\"Label\":\"功：\",\"Description\":\"攻撃力パラメータの表示名\"}","{\"ParamId\":\"4\",\"Label\":\"魔：\",\"Description\":\"魔法力パラメータの表示名\"}","{\"ParamId\":\"3\",\"Label\":\"防：\",\"Description\":\"防御力パラメータの表示名\"}","{\"ParamId\":\"5\",\"Label\":\"魔防：\",\"Description\":\"魔法防御パラメータの表示名\"}","{\"ParamId\":\"6\",\"Label\":\"敏捷性：\",\"Description\":\"敏捷性パラメータの表示名\"}","{\"ParamId\":\"7\",\"Label\":\"運：\",\"Description\":\"運パラメータの表示名\"}","{\"ParamId\":\"0\",\"Label\":\"追加HP：\",\"Description\":\"最大HPパラメータの表示名\"}","{\"ParamId\":\"1\",\"Label\":\"追加MP：\",\"Description\":\"最大MPパラメータの表示名\"}"]
 *
 *
 * @param TraitParamLabels
 * @text 通常能力値の表示名
 * @type struct<TraitParamLabel>[]
 * @desc 通常能力値（攻撃力などの倍率）の表示名を設定します
 * @default ["{\"ParamId\":\"2\",\"Label\":\"攻撃力\",\"Description\":\"攻撃力パラメータの表示名\"}","{\"ParamId\":\"4\",\"Label\":\"魔法力\",\"Description\":\"魔法力パラメータの表示名\"}","{\"ParamId\":\"3\",\"Label\":\"防御力\",\"Description\":\"防御力パラメータの表示名\"}","{\"ParamId\":\"5\",\"Label\":\"魔法防御\",\"Description\":\"魔法防御パラメータの表示名\"}","{\"ParamId\":\"6\",\"Label\":\"敏捷性\",\"Description\":\"敏捷性パラメータの表示名\"}","{\"ParamId\":\"7\",\"Label\":\"運\",\"Description\":\"運パラメータの表示名\"}","{\"ParamId\":\"0\",\"Label\":\"最大HP\",\"Description\":\"最大HPパラメータの表示名\"}","{\"ParamId\":\"1\",\"Label\":\"最大MP\",\"Description\":\"最大MPパラメータの表示名\"}"]
 *
 *
 *
 * @param XParamLabels
 * @text 追加能力値の表示名
 * @desc 追加能力値（命中率など）の表示名を設定します
 * @type struct<XParamLabel>[]
 * @default ["{\"ParamId\":\"0\",\"Label\":\"命中率\",\"Description\":\"命中率の表示名\"}","{\"ParamId\":\"1\",\"Label\":\"回避率\",\"Description\":\"回避率の表示名\"}","{\"ParamId\":\"2\",\"Label\":\"クリティカル率\",\"Description\":\"クリティカル率の表示名\"}","{\"ParamId\":\"3\",\"Label\":\"クリティカル回避率\",\"Description\":\"クリティカル回避率の表示名\"}","{\"ParamId\":\"4\",\"Label\":\"魔法回避率\",\"Description\":\"魔法回避率の表示名\"}","{\"ParamId\":\"5\",\"Label\":\"魔法反射率\",\"Description\":\"魔法反射率の表示名\"}","{\"ParamId\":\"6\",\"Label\":\"反撃率\",\"Description\":\"反撃率の表示名\"}","{\"ParamId\":\"7\",\"Label\":\"HP再生率\",\"Description\":\"HP再生率の表示名\"}","{\"ParamId\":\"8\",\"Label\":\"MP再生率\",\"Description\":\"MP再生率の表示名\"}","{\"ParamId\":\"9\",\"Label\":\"TP再生率\",\"Description\":\"TP再生率の表示名\"}"]
 *
 * @param SParamLabels
 * @text 特殊能力値の表示名
 * @desc 特殊能力値（狙われ率など）の表示名を設定します
 * @type struct<SParamLabel>[]
 * @default ["{\"ParamId\":\"0\",\"Label\":\"狙われ率\",\"Description\":\"狙われ率の表示名\"}","{\"ParamId\":\"1\",\"Label\":\"防御効果率\",\"Description\":\"防御効果率の表示名\"}","{\"ParamId\":\"2\",\"Label\":\"回復効果率\",\"Description\":\"回復効果率の表示名\"}","{\"ParamId\":\"3\",\"Label\":\"薬の知識\",\"Description\":\"薬の知識の表示名\"}","{\"ParamId\":\"4\",\"Label\":\"MP消費率\",\"Description\":\"MP消費率の表示名\"}","{\"ParamId\":\"5\",\"Label\":\"TPチャージ率\",\"Description\":\"TPチャージ率の表示名\"}","{\"ParamId\":\"6\",\"Label\":\"物理ダメージ率\",\"Description\":\"物理ダメージ率の表示名\"}","{\"ParamId\":\"7\",\"Label\":\"魔法ダメージ率\",\"Description\":\"魔法ダメージ率の表示名\"}","{\"ParamId\":\"8\",\"Label\":\"床ダメージ率\",\"Description\":\"床ダメージ率の表示名\"}","{\"ParamId\":\"9\",\"Label\":\"経験値獲得率\",\"Description\":\"経験値獲得率の表示名\"}"]
 *
 * @param SpecialFlagLabels
 * @text 特殊フラグの表示名
 * @desc 特殊フラグ（自動戦闘など）の表示名を設定します
 * @type struct<SpecialFlagLabel>[]
 * @default ["{\"ParamId\":\"0\",\"Label\":\"自動戦闘\",\"Description\":\"自動戦闘の表示名\"}","{\"ParamId\":\"1\",\"Label\":\"防御\",\"Description\":\"防御の表示名\"}","{\"ParamId\":\"2\",\"Label\":\"身代わり\",\"Description\":\"身代わりの表示名\"}","{\"ParamId\":\"3\",\"Label\":\"TP持ち越し\",\"Description\":\"TP持ち越しの表示名\"}"]
 *
 * @param PartyAbilityLabels
 * @text パーティ能力の表示名
 * @desc パーティ能力（エンカウント半減など）の表示名を設定します
 * @type struct<PartyAbilityLabel>[]
 * @default ["{\"ParamId\":\"0\",\"Label\":\"エンカウント半減\",\"Description\":\"エンカウント半減の表示名\"}","{\"ParamId\":\"1\",\"Label\":\"エンカウント無効\",\"Description\":\"エンカウント無効の表示名\"}","{\"ParamId\":\"2\",\"Label\":\"不意打ち無効\",\"Description\":\"不意打ち無効の表示名\"}","{\"ParamId\":\"3\",\"Label\":\"先制攻撃率アップ\",\"Description\":\"先制攻撃率アップの表示名\"}","{\"ParamId\":\"4\",\"Label\":\"獲得金額2倍\",\"Description\":\"獲得金額2倍の表示名\"}","{\"ParamId\":\"5\",\"Label\":\"アイテム入手率2倍\",\"Description\":\"アイテム入手率2倍の表示名\"}","{\"ParamId\":\"6\",\"Label\":\"経験値獲得率2倍\",\"Description\":\"経験値獲得率2倍の表示名\"}"]
 *
 *
 * @param ShowAsResistance
 * @text 耐性表示
 * @desc 属性と弱体の効果を耐性値として表示するか、有効度として表示するか選択します。
 * @type boolean
 * @on 耐性値表示
 * @off 有効度表示
 * @default true
 *
 *

 * @help SKM_EquipinfoWindow.js
 *
 * ■概要
 * このプラグインは、メニュー画面や装備選択画面、ショップ画面で装備にカーソルを合わせた際に、
 * 詳細な情報をプレビューウィンドウで表示する機能を追加します。
 *
 * ■主な機能
 * 1. 装備品の基本パラメータ表示
 *    - 攻撃力、防御力、魔法力などの基本パラメータ
 *    - 追加パラメータ（HP、MP、敏捷性、運）
 *
 *    プラグインパラメータで、各能力値の表示名を変更できます。
 *    例：
 *    攻： → ATK：
 *    魔： → MAT：
 *    防： → DEF：
 *    魔防： → MDF：
 *    敏捷性： → AGI：
 *    運： → LUK：
 *    追加HP： → HP+：
 *    追加MP： → MP+：
 *
 * 2. 特殊能力（特徴）の表示
 *    - 通常能力値（倍率）
 *    - 追加能力値（命中率、回避率など）
 *    - 特殊能力値（狙われ率、回復効果率など）
 *    - 属性耐性、ステート耐性
 *    - 特殊フラグ（二刀流、自動戦闘など）
 *    - パーティ能力（エンカウント半減、エンカウント無効など）
 *    - などの特徴に設定できるパラメーター
 * 
 * 3. メモ欄による追加特徴
 *    アイテムのメモ欄に以下の形式で記述することで、
 *    他プラグインによる効果や独自の特徴テキストを追加できます：
 *    <trait:表示したい特徴テキスト>
 *    この特徴はいくつでも追加できます
 *
 * 4. スペシャルな特徴の表示
 *    アイテムのメモ欄に以下の形式で記述することで、
 *    特に目立たせたい特徴を記述できます
 *    これを設定すること自体に効果はありません：
 *    <special_trait:表示テキスト>
 *    例１：<special_trait:聖なる力が宿っている>
 *    ※スペシャルな特徴は他の特徴と区別して強調表示されます
 *    例２：<special_trait:毒付与率： +50%>
 *    ※毒ステートの付与率を50%以上に設定しておくことで
 *    ※この武器の特徴として毒付与率が50%上昇したという印象を与える効果が期待できます
 *
 *    注：このタグは一つのアイテムに付き一つしか設定できません
 *
 * ■使用方法
 * 1. プラグインをプロジェクトに導入
 * 2. プラグインパラメータで表示名をカスタマイズ
 * 3. 必要に応じてメモ欄に追加特徴を記述
 *
 * ■表示例
 * 鉄の剣
 * 功： 　3　魔： 　0
 * 防： 　0　魔防： 0
 *
 * 属性耐性：+20%
 * 命中率：+5%
 *
 * ■注意事項

 * ・攻撃時スキルは特徴に設定しても表示されないので、メモ欄に記述してください。
 * ・他のウィンドウ拡張プラグインとの競合にご注意ください
 *
 * ■プラグインコマンド
 * このプラグインには、プラグインコマンドはありません。
 *
 * ■更新履歴
 * v1.0.0 (2025/02/06) - 初版リリース
 *
 * ■利用規約
 * ・クレジット表記は不要です
 * ・商用利用可
 * ・改変可
 * ・素材単体の再配布禁止
 *
 * ■サポート
 * 不具合や要望がありましたら、GitHubのIssuesにてご報告ください。
 *
 */

/*~struct~ParamLabel:
 * @param ParamId
 * @text パラメータID
 * @type number
 * @min 0
 * @max 7
 * @desc パラメータのID（2:攻撃力, 3:防御力, 4:魔法力, 5:魔法防御）
 *
 * @param Label
 * @text 表示名
 * @type string
 * @desc パラメータの前に表示する文字列
 *
 * @param Description
 * @text 説明
 * @type string
 * @desc パラメータの説明（プラグイン管理用）
 */

/*~struct~TraitParamLabel:
 * @param ParamId
 * @text パラメータID
 * @type number
 * @min 0
 * @max 7
 * @desc パラメータのID（2:攻撃力, 3:防御力, 4:魔法力, 5:魔法防御）
 *
 * @param Label
 * @text 表示名
 * @type string
 * @desc パラメータの表示名
 *
 * @param Description
 * @text 説明
 * @type string
 * @desc パラメータの説明（プラグイン管理用）
 */

/*~struct~XParamLabel:
 * @param ParamId
 * @text パラメータID
 * @type number
 * @min 0
 * @max 9
 * @desc 追加能力値のID（0:命中率, 1:回避率, 2:クリティカル率, など）
 *
 * @param Label
 * @text 表示名
 * @type string
 * @desc パラメータの表示名
 *
 * @param Description
 * @text 説明
 * @type string
 * @desc パラメータの説明（プラグイン管理用）
 */

/*~struct~SParamLabel:
 * @param ParamId
 * @text パラメータID
 * @type number
 * @min 0
 * @max 9
 * @desc 特殊能力値のID（0:狙われ率, 1:防御効果率, 2:回復効果率, など）
 *
 * @param Label
 * @text 表示名
 * @type string
 * @desc パラメータの表示名
 *
 * @param Description
 * @text 説明
 * @type string
 * @desc パラメータの説明（プラグイン管理用）
 */

/*~struct~SpecialFlagLabel:
 * @param ParamId
 * @text パラメータID
 * @type number
 * @min 0
 * @max 3
 * @desc 特殊フラグのID（0:自動戦闘, 1:防御, 2:身代わり, 3:TP持ち越し）
 *
 * @param Label
 * @text 表示名
 * @type string
 * @desc 特殊フラグの表示名
 *
 * @param Description
 * @text 説明
 * @type string
 * @desc パラメータの説明（プラグイン管理用）
 */

/*~struct~PartyAbilityLabel:
 * @param ParamId
 * @text パラメータID
 * @type number
 * @min 0
 * @max 6
 * @desc パーティ能力のID（0:エンカウント半減, 1:エンカウント無効, など）
 *
 * @param Label
 * @text 表示名
 * @type string
 * @desc パーティ能力の表示名
 *
 * @param Description
 * @text 説明
 * @type string
 * @desc パラメータの説明（プラグイン管理用）
 */

(() => {
    "use strict";

    const pluginName = "SKM_EquipinfoWindow";
    const parameters = PluginManager.parameters(pluginName);
    const showAsResistance = parameters.ShowAsResistance === "true";

    // 特徴コードを定数として定義
    const TRAIT_CODES = {
        ELEMENT_RATE: 11, // 属性有効度
        DEBUFF_RATE: 12, // 弱体有効度
        STATE_RATE: 13, // ステート有効度
        STATE_RESIST: 14, // ステート無効化
        PARAM: 21, // 通常能力値
        XPARAM: 22, // 追加能力値
        SPARAM: 23, // 特殊能力値
        ATTACK_ELEMENT: 31, // 攻撃時属性
        ATTACK_STATE: 32, // 攻撃時ステート
        ATTACK_SPEED: 33, // 攻撃速度補正
        ATTACK_TIMES: 34, // 攻撃追加回数
        STYPE_ADD: 41, // スキルタイプ追加
        STYPE_SEAL: 42, // スキルタイプ封印
        SKILL_ADD: 43, // スキル追加
        SKILL_SEAL: 44, // スキル封印
        EQUIP_WTYPE: 51, // 武器タイプ装備
        EQUIP_ATYPE: 52, // 防具タイプ装備
        EQUIP_FIX: 53, // 装備固定
        EQUIP_SEAL: 54, // 装備封印
        SLOT_TYPE: 55, // スロットタイプ
        ACTION_PLUS: 61, // 行動回数追加
        SPECIAL_FLAG: 62, // 特殊フラグ
        COLLAPSE_TYPE: 63, // 消滅エフェクト
        PARTY_ABILITY: 64, // パーティ能力
    };

    // XパラメータとSパラメータのラベルを解析
    const parseParamLabels = (paramString) => {
        try {
            const parsed = JSON.parse(paramString).map((json) =>
                JSON.parse(json)
            );
            const labels = {};
            parsed.forEach((param) => {
                labels[param.ParamId] = param.Label;
            });
            return labels;
        } catch (e) {
            return {};
        }
    };
    const paramLabels = parseParamLabels(parameters.ParamLabels);
    const traitParamLabels = parseParamLabels(parameters.TraitParamLabels);
    const xparamLabels = parseParamLabels(parameters.XParamLabels);
    const sparamLabels = parseParamLabels(parameters.SParamLabels);
    // 特殊フラグのラベルを解析
    const specialFlagLabels = parseParamLabels(parameters.SpecialFlagLabels);
    // パーティ能力のラベルを解析
    const partyAbilityLabels = parseParamLabels(parameters.PartyAbilityLabels);

    // デフォルトのラベル
    // デフォルトのラベルを修正
    const defaultLabels = {
        0: "追加HP：",
        1: "追加MP：",
        2: "功：",
        3: "防：",
        4: "魔：",
        5: "魔防：",
        6: "敏捷性：",
        7: "運：",
    };

    // デフォルトの特徴パラメータラベル
    const defaultTraitParamLabels = {
        0: "最大HP",
        1: "最大MP",
        2: "攻撃力",
        3: "防御力",
        4: "魔法力",
        5: "魔法防御",
        6: "敏捷性",
        7: "運",
    };

    const defaultXParamLabels = {
        0: "命中率",
        1: "回避率",
        2: "クリティカル率",
        3: "クリティカル回避率",
        4: "魔法回避率",
        5: "魔法反射率",
        6: "反撃率",
        7: "HP再生率",
        8: "MP再生率",
        9: "TP再生率",
    };

    const defaultSParamLabels = {
        0: "狙われ率",
        1: "防御効果率",
        2: "回復効果率",
        3: "薬の知識",
        4: "MP消費率",
        5: "TPチャージ率",
        6: "物理ダメージ率",
        7: "魔法ダメージ率",
        8: "床ダメージ率",
        9: "経験値獲得率",
    };

    // デフォルトの特殊フラグラベル
    const defaultSpecialFlagLabels = {
        0: "自動戦闘",
        1: "防御",
        2: "身代わり",
        3: "TP持ち越し",
    };

    // デフォルトのパーティ能力ラベル
    const defaultPartyAbilityLabels = {
        0: "エンカウント半減",
        1: "エンカウント無効",
        2: "不意打ち無効",
        3: "先制攻撃率アップ",
        4: "獲得金額2倍",
        5: "アイテム入手率2倍",
        6: "経験値獲得率2倍",
    };

    // 特徴の優先順位を定義(並べ替えの順番)
    const TRAIT_PRIORITY = {
        [TRAIT_CODES.ATTACK_ELEMENT]: 1, // 攻撃時属性
        // 基礎パラメータ関連
        [TRAIT_CODES.PARAM]: 2, // 通常能力値
        [TRAIT_CODES.XPARAM]: 3, // 追加能力値
        [TRAIT_CODES.SPARAM]: 4, // 特殊能力値
        // メタタグの特殊な特徴（優先的に表示）（もう使わないかもしれない）
        special: 5, // メタタグの特殊な特徴用

        // その他の特徴（既存の順序）

        [TRAIT_CODES.ATTACK_STATE]: 6, // 攻撃時ステート
        [TRAIT_CODES.ATTACK_SPEED]: 7, // 攻撃速度補正
        [TRAIT_CODES.ATTACK_TIMES]: 8, // 攻撃追加回数
        [TRAIT_CODES.ELEMENT_RATE]: 9, // 属性有効度
        [TRAIT_CODES.DEBUFF_RATE]: 10, // 弱体有効度
        [TRAIT_CODES.STATE_RATE]: 11, // ステート有効度
        [TRAIT_CODES.STATE_RESIST]: 12, // ステート無効化

        [TRAIT_CODES.STYPE_ADD]: 13, // スキルタイプ追加
        [TRAIT_CODES.STYPE_SEAL]: 14, // スキルタイプ封印
        [TRAIT_CODES.SKILL_ADD]: 15, // スキル追加
        [TRAIT_CODES.SKILL_SEAL]: 16, // スキル封印
        [TRAIT_CODES.EQUIP_WTYPE]: 17, // 武器タイプ装備
        [TRAIT_CODES.EQUIP_ATYPE]: 18, // 防具タイプ装備
        [TRAIT_CODES.EQUIP_FIX]: 19, // 装備固定
        [TRAIT_CODES.EQUIP_SEAL]: 20, // 装備封印
        [TRAIT_CODES.SLOT_TYPE]: 21, // スロットタイプ（二刀流かどうか）
        [TRAIT_CODES.ACTION_PLUS]: 22, // 行動回数追加
        [TRAIT_CODES.SPECIAL_FLAG]: 23, // 特殊フラグ
        [TRAIT_CODES.COLLAPSE_TYPE]: 24, // 消滅エフェクト
        [TRAIT_CODES.PARTY_ABILITY]: 25, // パーティ能力
    };

    // makeTraitText関数の定義
    function makeTraitText(trait) {
        // 特徴の効果を判定する関数
        const getEffectType = (text, value) => {
            if (!text) return null;

            // 数値を含む特徴の場合
            if (
                text.includes("%") ||
                text.includes("+") ||
                text.includes("-")
            ) {
                const numValue = parseFloat(text.match(/-?\d+\.?\d*/));
                // 耐性値がプラスなら有利、マイナスなら不利
                if (
                    trait.code === Game_BattlerBase.TRAIT_ELEMENT_RATE ||
                    trait.code === Game_BattlerBase.TRAIT_DEBUFF_RATE ||
                    trait.code === Game_BattlerBase.TRAIT_STATE_RATE
                ) {
                    if (showAsResistance) {
                        if (numValue > 0) return "positive";
                        if (numValue < 0) return "negative";
                        return "neutral";
                    } else {
                        if (numValue < 100) return "positive";
                        if (numValue > 100) return "negative";
                        return "neutral";
                    }
                }
                // その他の特徴は従来通り
                if (numValue > 0) return "positive";
                if (numValue < 0) return "negative";
                return "neutral";
            }

            // 特殊な特徴の場合
            switch (trait.code) {
                case TRAIT_CODES.SLOT_TYPE:
                    return trait.value === 1 ? "positive" : "neutral"; // 二刀流は有利
                case TRAIT_CODES.SPECIAL_FLAG:
                    return "descriptive";

                case TRAIT_CODES.PARTY_ABILITY:
                    return "positive"; // パーティ能力はすべて有利
                case TRAIT_CODES.STATE_RESIST:
                    return "positive"; // 状態無効は有利

                case TRAIT_CODES.STYPE_ADD:
                case TRAIT_CODES.SKILL_ADD:
                    return "positive"; // スキル系追加は有利

                case TRAIT_CODES.STYPE_SEAL:
                case TRAIT_CODES.SKILL_SEAL:
                    return "negative"; // スキル系封印は不利

                case TRAIT_CODES.ATTACK_ELEMENT:
                case TRAIT_CODES.EQUIP_WTYPE:
                case TRAIT_CODES.EQUIP_ATYPE:
                    return "descriptive"; // 属性や装備タイプは説明的な特徴
                case TRAIT_CODES.EQUIP_FIX:
                    return "descriptive"; // 属性や装備タイプは説明的な特徴                    return "descriptive"; // 属性や装備タイプは説明的な特徴
                case TRAIT_CODES.EQUIP_SEAL:
                    return "descriptive"; // 属性や装備タイプは説明的な特徴
                case TRAIT_CODES.COLLAPSE_TYPE: // 消失エフェクトを追加
                    return "descriptive"; // 消失エフェクトは説明的な特徴として表示
                default:
                    return "neutral";
            }
        };

        let text;

        switch (trait.code) {
            case TRAIT_CODES.ELEMENT_RATE:
                const elementName = $dataSystem.elements[trait.dataId];
                if (showAsResistance) {
                    // 耐性値表示（例：炎耐性: +20%）
                    const elementRate = Math.round((1 - trait.value) * 100);
                    const elementSign = elementRate > 0 ? "+" : "";
                    text = `${elementName}耐性: ${elementSign}${elementRate}%`;
                } else {
                    // 有効度表示（例：炎有効度: 80%）
                    const elementRate = Math.round(trait.value * 100);
                    text = `${elementName}有効度: ${elementRate}%`;
                }
                break;

            case TRAIT_CODES.PARAM:
                const paramLabel =
                    traitParamLabels[trait.dataId] ||
                    defaultTraitParamLabels[trait.dataId];
                const paramRate = Math.round(trait.value * 100 - 100);
                const paramSign = paramRate > 0 ? "+" : "";
                text = `${paramLabel}: ${paramSign}${paramRate}%`;
                break;

            case TRAIT_CODES.XPARAM:
                const xparamName =
                    xparamLabels[trait.dataId] ||
                    defaultXParamLabels[trait.dataId];
                const xparamValue = Math.round(trait.value * 100);
                const xparamSign = xparamValue > 0 ? "+" : "";
                text = `${xparamName}: ${xparamSign}${xparamValue}%`;
                break;

            case TRAIT_CODES.SPARAM:
                const sparamName =
                    sparamLabels[trait.dataId] ||
                    defaultSParamLabels[trait.dataId];
                const sparamValue = Math.round(trait.value * 100 - 100);
                const sparamSign = sparamValue > 0 ? "+" : "";
                text = `${sparamName}: ${sparamSign}${sparamValue}%`;

                // 値が大きいほど不利になるパラメータを判定
                if ([0, 4, 6, 7, 8].includes(trait.dataId)) {
                    // 0: 狙われ率
                    // 4: MP消費率
                    // 6: 物理ダメージ率
                    // 7: 魔法ダメージ率
                    // 8: 床ダメージ率
                    if (trait.value < 1)
                        return {
                            text: text,
                            effectType: "positive",
                        };
                    if (trait.value > 1)
                        return {
                            text: text,
                            effectType: "negative",
                        };
                    return {
                        text: text,
                        effectType: "neutral",
                    };
                }
                break;

            case TRAIT_CODES.ATTACK_ELEMENT:
                text = `攻撃属性: ${$dataSystem.elements[trait.dataId]}`;
                break;

            case TRAIT_CODES.ATTACK_STATE:
                text = `攻撃時: ${$dataStates[trait.dataId].name}: ${Math.round(
                    trait.value * 100
                )}%`;
                break;

            case TRAIT_CODES.ATTACK_SPEED:
                text = `攻撃速度: ${trait.value > 0 ? "+" : ""}${trait.value}`;
                break;

            case TRAIT_CODES.ATTACK_TIMES:
                text = `追加攻撃: +${trait.value}回`;
                break;

            case TRAIT_CODES.STYPE_ADD:
                text = `スキルタイプ追加: ${
                    $dataSystem.skillTypes[trait.dataId]
                }`;
                break;

            case TRAIT_CODES.STYPE_SEAL:
                text = `スキルタイプ封印: ${
                    $dataSystem.skillTypes[trait.dataId]
                }`;
                break;

            case TRAIT_CODES.SKILL_ADD:
                text = `スキル追加: ${$dataSkills[trait.dataId].name}`;
                break;

            case TRAIT_CODES.SKILL_SEAL:
                text = `スキル封印: ${$dataSkills[trait.dataId].name}`;
                break;

            case TRAIT_CODES.EQUIP_WTYPE:
                text = `武器タイプ装備: ${
                    $dataSystem.weaponTypes[trait.dataId]
                }`;
                break;
            case TRAIT_CODES.EQUIP_ATYPE:
                text = `防具タイプ装備: ${
                    $dataSystem.armorTypes[trait.dataId]
                }`;
                break;
            case TRAIT_CODES.EQUIP_FIX:
                text = `装備固定: ${$dataSystem.equipTypes[trait.dataId]}`;
                break;

            case TRAIT_CODES.EQUIP_SEAL:
                text = `装備封印: ${$dataSystem.equipTypes[trait.dataId]}`;

                break;

            case TRAIT_CODES.SLOT_TYPE:
                text = `追加特徴: ${
                    trait.dataId === 1 ? "二刀流" : "通常装備"
                }`;
                break;

            case TRAIT_CODES.ACTION_PLUS:
                text = `追加行動: ${Math.round(trait.value * 100)}%`;
                break;

            case TRAIT_CODES.DEBUFF_RATE:
                const debuffParamName = TextManager.param(trait.dataId);
                if (showAsResistance) {
                    // 耐性値表示（例：攻撃力弱体耐性: +30%）
                    const debuffRate = Math.round((1 - trait.value) * 100);
                    const debuffSign = debuffRate > 0 ? "+" : "";
                    text = `${debuffParamName}弱体耐性: ${debuffSign}${debuffRate}%`;
                } else {
                    // 有効度表示（例：攻撃力弱体有効度: 70%）
                    const debuffRate = Math.round(trait.value * 100);
                    text = `${debuffParamName}弱体有効度: ${debuffRate}%`;
                }
                break;

            case TRAIT_CODES.STATE_RATE:
                const stateName = $dataStates[trait.dataId].name;
                if (showAsResistance) {
                    // 耐性値表示（例：毒耐性: +50%）
                    const stateRate = Math.round((1 - trait.value) * 100);
                    const stateSign = stateRate > 0 ? "+" : "";
                    text = `${stateName}耐性: ${stateSign}${stateRate}%`;
                } else {
                    // 有効度表示（例：毒有効度: 50%）
                    const stateRate = Math.round(trait.value * 100);
                    text = `${stateName}有効度: ${stateRate}%`;
                }
                break;

            case TRAIT_CODES.STATE_RESIST:
                const resistStateName = $dataStates[trait.dataId].name;
                text = `${resistStateName}無効化`;
                break;

            case TRAIT_CODES.COLLAPSE_TYPE: // 消失エフェクトの処理を追加
                const collapseTypes = ["通常", "ボス", "瞬間消去", "消滅"];
                text = `消失ＥＦ: ${collapseTypes[trait.dataId]}`;
                break;

            // makeTraitText関数内の特殊フラグの処理部分を修正
            case TRAIT_CODES.SPECIAL_FLAG:
                const flagLabel =
                    specialFlagLabels[trait.dataId] ||
                    defaultSpecialFlagLabels[trait.dataId];
                text = `${flagLabel}`;
                break;

            case TRAIT_CODES.PARTY_ABILITY:
                const abilityLabel =
                    partyAbilityLabels[trait.dataId] ||
                    defaultPartyAbilityLabels[trait.dataId];
                text = `${abilityLabel}`;
                break;

            default:
                return null;
        }

        if (!text) return null;

        const effectType = getEffectType(text, trait.value);
        // 有効度表示の場合は判定を反転
        const finalEffectType = showAsResistance
            ? effectType
            : effectType === "positive"
            ? "negative"
            : effectType === "negative"
            ? "positive"
            : effectType;

        if (finalEffectType === "neutral") return null;

        return {
            text: text,
            effectType: finalEffectType,
        };
    }

    // パラメータIDに対応するラベルを取得する関数を修正
    function getLabelForParam(paramId) {
        return paramLabels[paramId] || defaultLabels[paramId] || paramId + "：";
    }

    // 既存の関数を修正
    const attackLabel = () => getLabelForParam(2);
    const magicLabel = () => getLabelForParam(4);
    const defenseLabel = () => getLabelForParam(3);
    const mdefenseLabel = () => getLabelForParam(5);
    const agilityLabel = () => getLabelForParam(6);
    const luckLabel = () => getLabelForParam(7);
    const hpLabel = () => getLabelForParam(0);
    const mpLabel = () => getLabelForParam(1);

    //-----------------------------------------------------------------------------
    // Window_ItemPreview
    //-----------------------------------------------------------------------------

    function Window_ItemPreview() {
        this.initialize(...arguments);
    }

    Window_ItemPreview.prototype = Object.create(Window_Base.prototype);
    Window_ItemPreview.prototype.constructor = Window_ItemPreview;

    Window_ItemPreview.prototype.initialize = function () {
        const width = 100; // 初期幅
        const height = this.fittingHeight(7) + this.standardPadding() * 4;
        const rect = new Rectangle(0, 0, width, height);

        Window_Base.prototype.initialize.call(this, rect);
        this._item = null;
        this.initTraitCache();
        this.opacity = 255;
        this.contentsOpacity = 255;
        this.backOpacity = 192;
        this.openness = 255;
        this._isShopMode = SceneManager._scene instanceof Scene_Shop;
        this.hide();
        this.createContents();
    };

    Window_ItemPreview.prototype.show = function () {
        if (!this.visible) {
            this.visible = true;
            this.opacity = 255;
            this.backOpacity = 192;
            this.contentsOpacity = 255;
            this.openness = 255;
        }
    };

    Window_ItemPreview.prototype.hide = function () {
        this.visible = false;
        this.openness = 0;
    };

    // fittingHeightメソッドを追加
    Window_ItemPreview.prototype.fittingHeight = function (numLines) {
        return numLines * this.lineHeight() + this.standardPadding() * 2;
    };

    Window_ItemPreview.prototype.standardFontSize = function () {
        return 18; // フォントサイズを16pxから18pxに変更
    };

    Window_ItemPreview.prototype.lineHeight = function () {
        return this.standardFontSize() + 6;
    };

    Window_ItemPreview.prototype.setItem = function (item) {
        if (!item || this._item === item) return;

        this.clearTraitCache();
        this._item = item;
        this.refresh();
    };

    // レイアウトタイプを判定するメソッドを修正
    Window_ItemPreview.prototype.determineLayout = function () {
        if (!this._item) return "two-column";

        // 通常特徴の行数を計算
        const normalTraitLines = this._item.traits
            ? this._item.traits
                  .map((trait) => makeTraitText(trait))
                  .filter(Boolean).length
            : 0;

        // 追加特徴の行数を計算
        const extraTraits = this.collectExtraTraits();
        const extraTraitLines = extraTraits ? extraTraits.length : 0;

        // メタ特徴（特別な特徴）の行数を計算
        const metaTraits = this.getMetaTraits();
        const metaTraitLines = metaTraits ? metaTraits.length : 0;

        // パラメータ行数を計算
        const hasBaseParams = this.hasAnyBaseParams();
        const additionalParams = [
            this._item.params[6], // 敏捷性
            this._item.params[7], // 運
            this._item.params[0], // HP
            this._item.params[1], // MP
        ].filter((value) => value !== 0);
        const additionalParamLines = additionalParams.length;

        // 左列に表示するものが全くない場合は強制的に2カラム
        if (
            !hasBaseParams &&
            additionalParamLines === 0 &&
            metaTraitLines === 0
        ) {
            return "two-column";
        }

        // 特徴の合計行数を計算
        const totalTraitLines = normalTraitLines + extraTraitLines;

        // 左列の合計行数（パラメータ + メタ特徴）
        const leftColumnLines =
            (hasBaseParams ? 2 : 0) + // 基本パラメータがある場合は2行
            additionalParamLines +
            (metaTraitLines > 0 ? metaTraitLines + 1 : 0);

        // 4列表示の条件判定
        const TRAIT_THRESHOLD = 3; // 特徴の最小行数
        const PARAM_THRESHOLD = 4; // パラメータの最小行数

        return (totalTraitLines >= TRAIT_THRESHOLD || // 特徴が3行以上
            (totalTraitLines > 0 && metaTraitLines > 0)) && // 特徴があり、かつメタ特徴もある
            leftColumnLines >= PARAM_THRESHOLD // パラメータ+メタ特徴で4行以上
            ? "four-column"
            : "two-column";
    };

    // refresh関数を修正
    Window_ItemPreview.prototype.refresh = function () {
        if (this._item) {
            const layout = this.determineLayout();
            this.adjustWindowSize(layout);
            this.contents.clear();
            this.drawItemDetails(layout);
        }
    };

    // アイテム詳細描画メソッドを追加
    Window_ItemPreview.prototype.drawItemDetails = function (layout) {
        const x = this.standardPadding();
        let y = 0;

        // 文字サイズを小さくする
        this.contents.fontSize = Math.floor(this.standardFontSize() * 0.9);

        // アイテム名を描画
        if (this._item.iconIndex) {
            const iconSize = Math.floor(ImageManager.iconWidth * 0.65);
            this.drawIconCustomSize(
                this._item.iconIndex,
                x,
                y + (this.lineHeight() - iconSize) / 2,
                iconSize
            );
            this.drawText(
                this._item.name,
                x + iconSize + 8,
                y,
                this.contents.width - iconSize - 16
            );
        } else {
            this.drawText(this._item.name, x, y, this.contents.width - 16);
        }
        y += this.lineHeight();

        // 4列表示時の右列開始位置
        const rightColumnX = Math.floor(this.contents.width * 0.5);

        // パラメータと特徴を描画する際にdrawTextExを使用
        const drawParameterText = (text, px, py, width) => {
            this.drawTextEx(text, px, py, width);
            return py + this.lineHeight();
        };

        // 左側のパラメータを描画する関数を修正
        y = this.drawLeftSideParameters(x, y, layout);

        // 特徴と追加特徴の有無をチェック

        const hasTraits = this._item.traits && this._item.traits.length > 0;
        const extraTraits = this.collectExtraTraits();
        const hasExtraTraits = extraTraits && extraTraits.length > 0;

        // いずれかの特徴がある場合に描画
        if (hasTraits || hasExtraTraits) {
            if (layout === "four-column") {
                this.drawTraits(rightColumnX, this.lineHeight(), true);
            } else {
                // 基礎パラメータまたはmeta特徴がある場合は空行を追加
                const hasBaseParams = this.hasAnyBaseParams();
                const hasParams =
                    this.hasAnyBaseParams() ||
                    [6, 7, 0, 1].some((id) => this._item.params[id] !== 0);
                const hasMetaTraits =
                    this.getMetaTraits() && this.getMetaTraits().length > 0;
                if (hasBaseParams || hasParams || hasMetaTraits) {
                    y += this.lineHeight(); // 空行
                }

                this.drawTraits(x, y, false);
            }
        }

        // パラメータや特徴が一切ない場合は「特殊効果なし」を表示
        if (!hasTraits && !hasExtraTraits) {
            const hasBaseParams = this.hasAnyBaseParams();
            const hasParams =
                this.hasAnyBaseParams() ||
                [6, 7, 0, 1].some((id) => this._item.params[id] !== 0);

            if (!hasBaseParams && !hasParams) {
                this.changeTextColor(ColorManager.textColor(7)); // グレー色で表示
                this.drawText(
                    "特殊効果なし",
                    x,
                    y,
                    this.contents.width - x * 2
                );
            }
        }

        // フォントサイズを元に戻す
        this.resetFontSettings();
    };

    // 左側のパラメータを描画する関数を修正
    Window_ItemPreview.prototype.drawLeftSideParameters = function (
        x,
        y,
        layout
    ) {
        const paramWidth = Math.floor(
            (layout === "four-column"
                ? this.contents.width * 0.45
                : this.contents.width - x * 2) / 2
        );

        let currentY = y;
        let hasDrawnBaseParams = false;
        let hasDrawnAnyParams = false;

        // 基礎パラメータが1つでもあれば描画
        if (this.hasAnyBaseParams()) {
            hasDrawnBaseParams = true;
            hasDrawnAnyParams = true;
            // 基本パラメータ（功/魔、防/魔防）を2列で描画
            const params = [
                { id: 2, label: attackLabel() }, // 功
                { id: 4, label: magicLabel() }, // 魔
                { id: 3, label: defenseLabel() }, // 防
                { id: 5, label: mdefenseLabel() }, // 魔防
            ];

            // 2列でパラメータを描画
            for (let i = 0; i < 4; i += 2) {
                const leftParam = params[i];
                const rightParam = params[i + 1];

                // 左側のパラメータ
                this.changeTextColor(this.basicParamLabelColor());
                this.drawText(leftParam.label, x, currentY, paramWidth);
                this.changeTextColor(this.paramValueColor());
                this.drawText(
                    String(this._item.params[leftParam.id]),
                    x,
                    currentY,
                    paramWidth - this.textWidth(" "),
                    "right"
                );

                // 右側のパラメータ
                this.changeTextColor(this.basicParamLabelColor());
                this.drawText(
                    rightParam.label,
                    x + paramWidth + this.textWidth(" "),
                    currentY,
                    paramWidth
                );
                this.changeTextColor(this.paramValueColor());
                this.drawText(
                    String(this._item.params[rightParam.id]),
                    x + paramWidth,
                    currentY,
                    paramWidth,
                    "right"
                );

                currentY += this.lineHeight();
            }
        }

        // 追加パラメータ（0以外の値のみ）を描画
        const additionalParams = [
            { id: 6, label: agilityLabel() }, // 敏捷性
            { id: 7, label: luckLabel() }, // 運
            { id: 0, label: hpLabel() }, // HP
            { id: 1, label: mpLabel() }, // MP
        ];

        additionalParams.forEach((param) => {
            if (this._item.params[param.id] !== 0) {
                hasDrawnAnyParams = true;
                this.changeTextColor(this.paramLabelColor());
                this.drawText(param.label, x, currentY, paramWidth);
                this.changeTextColor(this.paramValueColor());
                this.drawText(
                    String(this._item.params[param.id]),
                    x,
                    currentY,
                    paramWidth,
                    "right"
                );
                currentY += this.lineHeight();
            }
        });

        // メタ特徴の描画
        const metaTraits = this.getMetaTraits();
        if (metaTraits && metaTraits.length > 0) {
            // パラメータが1つでもあれば空行を追加
            if (hasDrawnAnyParams) {
                currentY += this.lineHeight();
            }
            metaTraits.forEach((trait) => {
                this.changeTextColor(ColorManager.textColor(31));
                this.drawText(
                    trait.text,
                    x,
                    currentY,
                    layout === "four-column"
                        ? paramWidth * 2
                        : this.contents.width - x * 2
                );
                currentY += this.lineHeight();
            });
        }

        return currentY;
    };

    // カスタムサイズでアイコンを描画するメソッドを追加
    Window_ItemPreview.prototype.drawIconCustomSize = function (
        iconIndex,
        x,
        y,
        size
    ) {
        const bitmap = ImageManager.loadSystem("IconSet");
        const pw = ImageManager.iconWidth;
        const ph = ImageManager.iconHeight;
        const sx = (iconIndex % 16) * pw;
        const sy = Math.floor(iconIndex / 16) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, size, size);
    };

    // ウィンドウの余白を小さく
    Window_ItemPreview.prototype.standardPadding = function () {
        return 6; // 現在の値を確認して適切な値に調整
    };

    // ウィンドウの幅を調整するメソッドも修正
    Window_ItemPreview.prototype.adjustWindowWidth = function () {
        this.resetFontSettings();
        this.contents.fontSize = this.standardFontSize();

        // アイテム名の幅を計算
        const iconSize = this._item.iconIndex
            ? Math.floor(ImageManager.iconWidth * 0.65) + 8
            : 0;
        const nameWidth =
            this.textWidth(this._item.name) +
            iconSize +
            this.standardPadding() * 2 +
            16;

        // 各パラメータの最大幅を計算
        const maxValueWidth = this.textWidth("888"); // 3桁分の固定幅
        const maxLabelWidth = Math.max(
            this.textWidth(attackLabel() + " "),
            this.textWidth(magicLabel() + " "),
            this.textWidth(defenseLabel() + " "),
            this.textWidth(mdefenseLabel() + " ")
        );

        // 2列表示の必要幅を計算
        const twoColumnWidth = (maxLabelWidth + maxValueWidth + 16) * 2 + 32;

        // 必要な幅の大きい方を採用
        const requiredWidth = Math.max(nameWidth, twoColumnWidth);

        // 最小幅と最大幅の制限
        const minWidth = Math.floor(Graphics.boxWidth * 0.25);
        const maxWidth = Math.floor(Graphics.boxWidth * 0.5);

        // 新しい幅を設定
        const newWidth = Math.min(Math.max(requiredWidth, minWidth), maxWidth);

        if (this.width !== newWidth) {
            this.width = newWidth;
            this.createContents();
        }
    };

    // パラメータ表示用の色設定を追加
    Window_ItemPreview.prototype.paramLabelColor = function () {
        return ColorManager.systemColor(); // 通常のラベル色（#dcdcdc）
    };

    Window_ItemPreview.prototype.paramValueColor = function () {
        return ColorManager.paramchangeTextColor(1); // 値の色（#ffff00）
    };

    // 基本パラメータ（攻撃力～魔法防御）用の色を追加
    Window_ItemPreview.prototype.basicParamLabelColor = function () {
        return ColorManager.textColor(6); // 薄い黄色（#ffffcc）
    };

    // ウィンドウサイズの調整メソッドを追加
    Window_ItemPreview.prototype.adjustWindowSize = function (layout) {
        // 基本の幅を計算
        this.resetFontSettings();
        this.contents.fontSize = this.standardFontSize();

        // アイテム名の幅を計算
        const iconSize = this._item.iconIndex
            ? Math.floor(ImageManager.iconWidth * 0.65) + 8
            : 0;
        const nameWidth =
            this.textWidth(this._item.name) +
            iconSize +
            this.standardPadding() * 2 +
            16;

        // 各パラメータの最大幅を計算
        const maxValueWidth = this.textWidth("8888"); // 4桁分の固定幅
        const maxLabelWidth = Math.max(
            this.textWidth(attackLabel() + " "),
            this.textWidth(magicLabel() + " "),
            this.textWidth(defenseLabel() + " "),
            this.textWidth(mdefenseLabel() + " ")
        );

        // 2列表示時は2つのパラメータカラムの幅が必要
        const parameterWidth = (maxLabelWidth + maxValueWidth + 16 + 16) * 1.5;

        // 特徴の最大幅を計算
        let maxTraitWidth = 0;
        if (this._item.traits) {
            this._item.traits.forEach((trait) => {
                const traitInfo = makeTraitText(trait);
                if (traitInfo) {
                    const traitWidth = this.textWidth(traitInfo.text);
                    maxTraitWidth = Math.max(maxTraitWidth, traitWidth);
                }
            });
        }

        // 必要な幅の計算
        let baseWidth;
        if (layout === "four-column") {
            // 4列表示時は左側のパラメータ幅と右側の特徴幅を別々に計算
            const leftColumnWidth = parameterWidth;
            const rightColumnWidth = maxTraitWidth + this.standardPadding() * 4;
            baseWidth = Math.max(
                nameWidth,
                leftColumnWidth + rightColumnWidth // 左列と右列の幅を合算
            );
        } else {
            // 2列表示時
            baseWidth = Math.max(
                nameWidth,
                parameterWidth,
                maxTraitWidth + this.standardPadding() * 4
            );
        }

        // 基準解像度（816）に対する現在の解像度の比率を計算
        const BASE_WIDTH = 816;
        const resolutionRatio = Graphics.boxWidth / BASE_WIDTH;

        // 解像度に応じてウィンドウの比率を調整
        let minRatio, maxRatio;
        if (Graphics.boxWidth <= 816) {
            // デフォルト (816x624)以下
            minRatio = layout === "four-column" ? 0.35 : 0.2;
            maxRatio = layout === "four-column" ? 0.6 : 0.4;
        } else if (Graphics.boxWidth <= 1280) {
            // HD (1280x720)以下
            minRatio = layout === "four-column" ? 0.25 : 0.15;
            maxRatio = layout === "four-column" ? 0.4 : 0.3;
        } else {
            // フルHD (1920x1080)など、より大きな解像度
            minRatio = layout === "four-column" ? 0.2 : 0.12;
            maxRatio = layout === "four-column" ? 0.35 : 0.25;
        }

        // 最小幅と最大幅の制限を設定
        const minWidth = Math.floor(Graphics.boxWidth * minRatio);
        const maxWidth = Math.floor(Graphics.boxWidth * maxRatio);
        baseWidth = Math.min(Math.max(baseWidth, minWidth), maxWidth);

        // 高さを計算
        const lineCount = this.calcLineCount(layout);
        const height = this.calcHeight(lineCount);

        // サイズが変更された場合のみcontentsを再作成
        if (this.width !== baseWidth || this.height !== height) {
            this.move(this.x, this.y, baseWidth, height);
            this.createContents();
        }
    };

    // 行数を計算するメソッドを修正
    Window_ItemPreview.prototype.calcLineCount = function (layout) {
        // 基本行数の計算
        const baseLines = this.calcBaseLines();

        // 特徴関連の行数を計算
        const traitLines = this.calcTraitLines(layout);

        // レイアウトに応じて行数を計算
        if (layout === "four-column") {
            // 4カラムの場合は左右の行数を比較して大きい方を採用
            const leftColumnLines = baseLines; // 左側（基本パラメータ）の行数
            const rightColumnLines = traitLines; // 右側（特徴）の行数
            return Math.max(leftColumnLines, rightColumnLines);
        } else {
            // 2カラムの場合は行数を合算

            return baseLines + traitLines;
        }
    };

    // 基本パラメータの行数を計算
    Window_ItemPreview.prototype.calcBaseLines = function () {
        let lines = 1; // アイテム名の行

        // 基礎パラメータが存在する場合のみ2行を追加
        if (this.hasAnyBaseParams()) {
            lines += 2; // 基本パラメータ（功/魔、防/魔防）
        }

        // 追加パラメータ（0以外の値のみ）
        const additionalParams = [
            this._item.params[6], // 敏捷性
            this._item.params[7], // 運
            this._item.params[0], // HP
            this._item.params[1], // MP
        ].filter((value) => value !== 0).length;

        return lines + additionalParams;
    };

    // 特徴関連の行数を計算
    Window_ItemPreview.prototype.calcTraitLines = function (layout) {
        const metaTraits = this.getMetaTraits();
        const extraTraits = this.collectExtraTraits();
        const normalTraits = this._item.traits || [];

        const metaTraitLines = metaTraits ? metaTraits.length : 0;
        const extraTraitLines = extraTraits ? extraTraits.length : 0;
        const normalTraitLines = normalTraits
            .map((trait) => makeTraitText(trait))
            .filter(Boolean).length;

        if (layout === "four-column") {
            return this.calcFourColumnTraitLines(
                normalTraitLines,
                metaTraitLines,
                extraTraitLines
            );
        } else {
            return this.calcTwoColumnTraitLines(
                normalTraitLines,
                metaTraitLines,
                extraTraitLines
            );
        }
    };

    // 4列表示時の特徴行数を計算
    Window_ItemPreview.prototype.calcFourColumnTraitLines = function (
        normalTraitLines,
        metaTraitLines,
        extraTraitLines
    ) {
        const leftColumnLines =
            this.calcBaseLines() +
            (metaTraitLines > 0 ? metaTraitLines + 1 : 0);
        const rightColumnLines =
            normalTraitLines +
            extraTraitLines +
            (normalTraitLines > 0 || extraTraitLines > 0 ? 1 : 0);

        return Math.max(leftColumnLines, rightColumnLines);
    };

    // 2列表示時の特徴行数を計算
    Window_ItemPreview.prototype.calcTwoColumnTraitLines = function (
        normalTraitLines,
        metaTraitLines,
        extraTraitLines
    ) {
        let lines = 0;
        const hasNormalOrExtraTraits =
            normalTraitLines > 0 || extraTraitLines > 0;

        // 通常特徴または追加特徴がある場合のみ空行を追加
        if (hasNormalOrExtraTraits) {
            const hasParams =
                this.hasAnyBaseParams() ||
                [6, 7, 0, 1].some((id) => this._item.params[id] !== 0);
            if (metaTraitLines > 0 || hasParams) {
                lines += 1; // 特徴セクションの空行
            }
        }

        if (normalTraitLines > 0) {
            lines += normalTraitLines;
        }

        if (extraTraitLines > 0) {
            lines += extraTraitLines;
        }

        // メタ特徴の行数を追加（基礎パラメータまたは追加パラメータがある場合のみ空行を追加）
        if (metaTraitLines > 0) {
            const hasBaseParams = this.hasAnyBaseParams();
            const hasParams =
                this.hasAnyBaseParams() ||
                [6, 7, 0, 1].some((id) => this._item.params[id] !== 0);
            if (metaTraitLines > 0 && (hasParams || hasBaseParams)) {
                lines += 1; // メタ特徴の前の空行
            }
            lines += metaTraitLines;
        }

        return lines;
    };

    // 高さを計算するメソッドを修正（元に戻す）
    Window_ItemPreview.prototype.calcHeight = function (lineCount) {
        // 基本のパディングを設定
        const basePadding = this.standardPadding() * 2;

        // コンテンツの高さを計算
        const contentsHeight = lineCount * this.lineHeight();
        const nocontentsHeight = (lineCount + 1) * this.lineHeight();

        // アイテム名のみの場合
        if (lineCount <= 1) {
            return nocontentsHeight + basePadding * 2;
        }

        // パラメータとmeta特徴の有無をチェック
        const hasParams =
            this.hasAnyBaseParams() ||
            [6, 7, 0, 1].some((id) => this._item.params[id] !== 0);
        const hasMetaTraits =
            this.getMetaTraits() && this.getMetaTraits().length > 0;
        const hasTraits = this._item.traits && this._item.traits.length > 0;
        const hasExtraTraits =
            this.collectExtraTraits() && this.collectExtraTraits().length > 0;

        // パラメータやmeta特徴がない場合は余分なパディングを減らす
        if (!hasParams && !hasMetaTraits && !hasTraits && !hasExtraTraits) {
            return contentsHeight + basePadding;
        }

        // 通常のパディングを適用
        return contentsHeight + basePadding * 2;
    };

    // 特徴を描画するメソッドを修正
    Window_ItemPreview.prototype.drawTraits = function (x, y, isRightColumn) {
        // キャッシュを導入しつつ、色分け機能を維持
        if (!this._traitCache) {
            this._traitCache = new Map();
        }

        const cacheKey = this._item ? this._item.id : 0;
        let sortedTraits = this._traitCache.get(cacheKey);

        if (!sortedTraits) {
            // 特徴のソート処理を維持
            sortedTraits = [];
            if (this._item.traits) {
                this._item.traits.forEach((trait) => {
                    const traitInfo = makeTraitText(trait);
                    if (traitInfo) {
                        sortedTraits.push({
                            priority: TRAIT_PRIORITY[trait.code] || 999,
                            dataId: trait.dataId,
                            code: trait.code,
                            traitInfo: traitInfo,
                        });
                    }
                });
            }

            // 追加特徴の処理も維持
            const extraTraits = this.collectExtraTraits();
            if (extraTraits && extraTraits.length > 0) {
                extraTraits.forEach((trait) => {
                    if (trait && trait.traitInfo) {
                        sortedTraits.push(trait);
                    }
                });
            }

            // 優先順位でソート
            sortedTraits.sort((a, b) => {
                if (a.priority !== b.priority) return a.priority - b.priority;
                if (a.code !== b.code) return a.code - b.code;
                return (a.dataId || 0) - (b.dataId || 0);
            });

            this._traitCache.set(cacheKey, sortedTraits);
        }

        let currentY = y;
        const traitWidth = isRightColumn
            ? Math.floor(this.contents.width * 0.5) - this.standardPadding() * 2
            : this.contents.width - x;

        // 特徴の描画処理（色分けを維持）
        sortedTraits.forEach(({ traitInfo }) => {
            if (!traitInfo || traitInfo.text === "") {
                currentY += this.lineHeight();
                return;
            }

            // 特徴の描画（色分け処理を維持）
            const parts = traitInfo.text.split(": ");
            if (parts.length === 3) {
                // 3パーツある場合の描画処理
                this.changeTextColor(this.paramLabelColor());
                this.drawText(parts[0] + ": ", x, currentY, traitWidth);
                let currentX = x + this.textWidth(parts[0] + ": ");

                // 第2パーツ（強調部分）
                this.changeTextColor(ColorManager.textColor(6));
                this.drawText(parts[1] + ": ", currentX, currentY, traitWidth);
                currentX += this.textWidth(parts[1] + ": ");

                // 第3パーツ（値部分）の色分け
                this.changeTextColor(this.getTraitColor(traitInfo.effectType));
                const remainingWidth = traitWidth - (currentX - x);
                this.drawText(parts[2], currentX, currentY, remainingWidth);
            } else if (parts.length === 2) {
                // 2パーツある場合の描画処理
                this.changeTextColor(this.paramLabelColor());
                this.drawText(parts[0] + ": ", x, currentY, traitWidth);

                // 値部分の色分け
                const labelWidth = this.textWidth(parts[0] + ": ");
                this.changeTextColor(this.getTraitColor(traitInfo.effectType));
                this.drawText(
                    parts[1],
                    x + labelWidth,
                    currentY,
                    traitWidth - labelWidth
                );
            } else {
                // 単一パーツの場合の描画処理
                this.changeTextColor(this.getTraitColor(traitInfo.effectType));
                this.drawText(traitInfo.text, x, currentY, traitWidth);
            }

            currentY += this.lineHeight();
        });

        return currentY;
    };

    // 特徴の色を取得する関数を維持
    Window_ItemPreview.prototype.getTraitColor = function (effectType) {
        switch (effectType) {
            case "positive":
                return ColorManager.powerUpColor();
            case "negative":
                return ColorManager.powerDownColor();
            case "descriptive":
                return ColorManager.textColor(6);
            default:
                return this.paramLabelColor();
        }
    };

    // メタタグから追加特徴を収集する関数を修正
    Window_ItemPreview.prototype.collectExtraTraits = function () {
        if (!this._item || !this._item.note) return [];

        const extraTraits = [];
        const noteText = this._item.note;
        const tagPattern = /<trait:\s*(.+?)>/g;
        let match;

        while ((match = tagPattern.exec(noteText)) !== null) {
            const traitText = match[1].trim();
            if (traitText) {
                extraTraits.push({
                    priority: 999,
                    code: 0,
                    dataId: 0,
                    traitInfo: {
                        text: traitText,
                        effectType: "descriptive",
                    },
                });
            }
        }

        return extraTraits;
    };

    // スペシャル特徴を取得する関数（シンプル化）
    Window_ItemPreview.prototype.getSpecialTrait = function () {
        if (!this._item || !this._item.meta || !this._item.meta.specialTrait)
            return null;

        const traitText = this._item.meta.specialTrait;
        if (!traitText) return null;

        return {
            priority: TRAIT_PRIORITY.special,
            code: 0, // 特殊な特徴用のコード
            dataId: 0, // 特殊な特徴用のID
            traitInfo: {
                text: traitText,
                effectType: "descriptive",
            },
        };
    };

    // getMetaTraits関数も同様に修正
    Window_ItemPreview.prototype.getMetaTraits = function () {
        if (!this._item || !this._item.meta) return null;

        const metaTraits = [];

        // メタタグから特殊な特徴を解析して追加
        // 例: <specialTrait:火属性>
        if (this._item.meta.specialTrait) {
            metaTraits.push({
                text: this._item.meta.specialTrait,
                effectType: "descriptive",
            });
        }

        return metaTraits.length > 0 ? metaTraits : null;
    };

    //-----------------------------------------------------------------------------
    // Window_ItemList
    //-----------------------------------------------------------------------------

    const _Window_ItemList_initialize = Window_ItemList.prototype.initialize;
    Window_ItemList.prototype.initialize = function (rect) {
        _Window_ItemList_initialize.call(this, rect);
        this.createPreviewWindow();
    };

    Window_ItemList.prototype.createPreviewWindow = function () {
        // シーンチェックを強化
        const isValidScene =
            !(SceneManager._scene instanceof Scene_Shop) &&
            !(SceneManager._scene instanceof Scene_Battle) &&
            SceneManager._scene instanceof Scene_MenuBase;

        if (isValidScene) {
            this._previewWindow = new Window_ItemPreview();
            SceneManager._scene.addWindow(this._previewWindow);
        }
    };

    const _Window_ItemList_update = Window_ItemList.prototype.update;
    Window_ItemList.prototype.update = function () {
        _Window_ItemList_update.call(this);
        this.updatePreviewWindow();
    };

    Window_ItemList.prototype.updatePreviewWindow = function () {
        if (!this._previewWindow) return;

        if (this.active && this.item()) {
            const item = this.item();
            if (DataManager.isWeapon(item) || DataManager.isArmor(item)) {
                const rect = this.itemLineRect(this.index());
                const globalPos = this.getGlobalPosition(rect);

                this._previewWindow.setItem(item);
                this._previewWindow.updatePosition(
                    globalPos.x,
                    globalPos.y,
                    this
                );
                this._previewWindow.show();

                // ウィンドウを最前面に
                const scene = SceneManager._scene;
                if (scene) {
                    scene._windowLayer.removeChild(this._previewWindow);
                    scene._windowLayer.addChild(this._previewWindow);
                }
            } else {
                this._previewWindow.hide();
            }
        } else {
            this._previewWindow.hide();
        }
    };

    //-----------------------------------------------------------------------------
    // Window_EquipItem
    //-----------------------------------------------------------------------------

    const _Window_EquipItem_initialize = Window_EquipItem.prototype.initialize;
    Window_EquipItem.prototype.initialize = function (rect) {
        _Window_EquipItem_initialize.call(this, rect);
        this.createPreviewWindow();
    };

    Window_EquipItem.prototype.createPreviewWindow =
        Window_ItemList.prototype.createPreviewWindow;
    Window_EquipItem.prototype.updatePreviewWindow =
        Window_ItemList.prototype.updatePreviewWindow;

    const _Scene_Item_create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function () {
        _Scene_Item_create.call(this);
    };

    Window_ItemPreview.prototype.adjustWindowHeight = function () {
        const layout = this.determineLayout();

        // calcLineCountを使用して総行数を取得
        const totalLines = this.calcLineCount(layout);

        // ウィンドウの高さを計算
        const newHeight = this.calcHeight(totalLines);

        // サイズが変更された場合のみcontentsを再作成
        if (this.height !== newHeight) {
            this.height = newHeight;
            this.createContents();
        }
    };

    // refresh時にウィンドウの高さも調整
    const _Window_ItemPreview_refresh = Window_ItemPreview.prototype.refresh;
    Window_ItemPreview.prototype.refresh = function () {
        if (this._item) {
            this.adjustWindowHeight();
        }
        _Window_ItemPreview_refresh.call(this);
    };

    // 特徴テキストの描画処理を修正
    Window_ItemPreview.prototype.drawTraitText = function (text, x, y, width) {
        return this.drawTextEx(text, x, y);
    };

    //-----------------------------------------------------------------------------
    // Scene_Shop
    //-----------------------------------------------------------------------------
    const _Scene_Shop_create = Scene_Shop.prototype.create;
    Scene_Shop.prototype.create = function () {
        _Scene_Shop_create.call(this);
        this.createHoverWindow();
    };

    Scene_Shop.prototype.createHoverWindow = function () {
        this._hoverWindow = new Window_ItemPreview();
        this.addWindow(this._hoverWindow);
    };

    const _Scene_Shop_update = Scene_Shop.prototype.update;
    Scene_Shop.prototype.update = function () {
        _Scene_Shop_update.call(this);
        this.updateHoverWindow();
    };

    Scene_Shop.prototype.updateHoverWindow = function () {
        if (!this._hoverWindow) return;

        const buyWindow = this._buyWindow;
        const sellWindow = this._sellWindow;
        if (!buyWindow || !sellWindow) return;

        const activeWindow = buyWindow.active
            ? buyWindow
            : sellWindow.active
            ? sellWindow
            : null;

        try {
            if (activeWindow && activeWindow.item()) {
                const item = activeWindow.item();
                if (DataManager.isWeapon(item) || DataManager.isArmor(item)) {
                    const rect = activeWindow.itemLineRect(
                        activeWindow.index()
                    );
                    if (!rect) return;

                    const globalPos = activeWindow.getGlobalPosition(rect);
                    this._hoverWindow.setItem(item);
                    this._hoverWindow.updatePosition(
                        globalPos.x,
                        globalPos.y,
                        activeWindow
                    );
                    this._hoverWindow.show();
                } else {
                    this._hoverWindow.hide();
                }
            } else {
                this._hoverWindow.hide();
            }
        } catch (e) {
            console.error("SKM_EquipinfoWindow: Error in updateHoverWindow", e);
            this._hoverWindow.hide();
        }
    };

    //-----------------------------------------------------------------------------
    // Window_Base
    //-----------------------------------------------------------------------------
    Window_Base.prototype.getGlobalPosition = function (rect) {
        const x = this.x + rect.x;
        const y = this.y + rect.y;
        return { x: x, y: y };
    };

    //-----------------------------------------------------------------------------
    // Window_ItemPreview
    //-----------------------------------------------------------------------------
    Window_ItemPreview.prototype.updatePosition = function (
        x,
        y,
        sourceWindow
    ) {
        if (!sourceWindow || !this.contents) return;

        // 既存の位置計算処理
        const padding = this.standardPadding() * 4;
        const itemCenterY = y + this.lineHeight() / 2;
        const screenCenterY = Graphics.boxHeight / 2;

        // ソースウィンドウの情報を取得
        const sourceRect = sourceWindow
            ? {
                  x: sourceWindow.x,
                  y: sourceWindow.y,
                  width: sourceWindow.width,
                  height: sourceWindow.height,
              }
            : null;

        // X座標の計算
        let newX;
        if (sourceRect) {
            const rightEdgeX = x + this.width + padding;

            if (rightEdgeX > Graphics.boxWidth - padding * 2) {
                // 右端を超える場合は左側に表示
                newX = x - this.width - padding;
            } else {
                // それ以外は右側に表示
                newX = x + padding;
            }

            // 左端を超える場合の調整
            if (newX < padding) {
                newX = x + padding;
            }
        } else {
            newX = x + padding;
        }

        // 画面端での最終調整
        newX = Math.min(newX, Graphics.boxWidth - this.width - padding);
        newX = Math.max(padding, newX);

        // Y座標の計算を改善
        let newY;
        const itemHeight = this.lineHeight();

        if (itemCenterY < screenCenterY) {
            // 画面上部の場合
            // アイテムの表示領域の下端から表示開始
            newY = y + itemHeight + padding;

            // 下端チェック
            if (newY + this.height > Graphics.boxHeight - padding) {
                // 下に入りきらない場合は上に表示
                newY = y - this.height - padding / 2;
            }
        } else {
            // 画面下部の場合
            // アイテムの表示領域の上端から表示開始（より密着）
            newY = y - this.height + padding / 4;

            // 上端チェック
            if (newY < padding) {
                // 上に入りきらない場合は下に表示
                newY = y + itemHeight + padding;
            }
        }

        // 画面端での最終調整
        newY = Math.min(newY, Graphics.boxHeight - this.height - padding);
        newY = Math.max(padding, newY);

        this.x = newX;
        this.y = newY;
    };

    // ウィンドウ同士の重なりをチェックするメソッドを追加
    Window_ItemPreview.prototype.isOverlapping = function (x, y, sourceRect) {
        return (
            x < sourceRect.x + sourceRect.width &&
            x + this.width > sourceRect.x &&
            y < sourceRect.y + sourceRect.height &&
            y + this.height > sourceRect.y
        );
    };

    // アイテムリストでの位置更新処理を修正
    Window_ItemList.prototype.updatePreviewWindow = function () {
        if (!this._previewWindow) return;

        if (this.active && this.item()) {
            const item = this.item();
            if (DataManager.isWeapon(item) || DataManager.isArmor(item)) {
                const rect = this.itemLineRect(this.index());
                const globalPos = this.getGlobalPosition(rect);

                this._previewWindow.setItem(item);
                this._previewWindow.updatePosition(
                    globalPos.x,
                    globalPos.y,
                    this
                );
                this._previewWindow.show();

                // ウィンドウを最前面に
                const scene = SceneManager._scene;
                if (scene) {
                    scene._windowLayer.removeChild(this._previewWindow);
                    scene._windowLayer.addChild(this._previewWindow);
                }
            } else {
                this._previewWindow.hide();
            }
        } else {
            this._previewWindow.hide();
        }
    };

    // ショップ画面での位置更新処理を修正
    Scene_Shop.prototype.updateHoverWindow = function () {
        const buyWindow = this._buyWindow;
        const sellWindow = this._sellWindow;
        const activeWindow = buyWindow.active
            ? buyWindow
            : sellWindow.active
            ? sellWindow
            : null;

        if (activeWindow && activeWindow.item()) {
            const item = activeWindow.item();
            if (DataManager.isWeapon(item) || DataManager.isArmor(item)) {
                const rect = activeWindow.itemLineRect(activeWindow.index());
                const globalPos = activeWindow.getGlobalPosition(rect);

                this._hoverWindow.setItem(item);
                this._hoverWindow.updatePosition(
                    globalPos.x,
                    globalPos.y,
                    activeWindow
                );
                this._hoverWindow.show();
            } else {
                this._hoverWindow.hide();
            }
        } else {
            this._hoverWindow.hide();
        }
    };

    const _Scene_Base_terminate = Scene_Base.prototype.terminate;
    Scene_Base.prototype.terminate = function () {
        _Scene_Base_terminate.call(this);
        this.terminatePreviewWindows();
    };

    Scene_Base.prototype.terminatePreviewWindows = function () {
        // 各ウィンドウのプレビューを安全に破棄
        const windows = [
            this._itemWindow,
            this._equipWindow,
            this._buyWindow,
            this._sellWindow,
        ];

        windows.forEach((window) => {
            if (window && window._previewWindow) {
                window._previewWindow.destroy();
                window._previewWindow = null;
            }
        });

        if (this._hoverWindow) {
            this._hoverWindow.destroy();
            this._hoverWindow = null;
        }
    };

    Window_ItemList.prototype.show = function () {
        Window_Selectable.prototype.show.call(this);
        if (this._previewWindow) {
            this._previewWindow.hide(); // 一旦非表示に
        }
    };

    Window_ItemList.prototype.hide = function () {
        Window_Selectable.prototype.hide.call(this);
        if (this._previewWindow) {
            this._previewWindow.hide();
        }
    };

    Window_ItemList.prototype.destroy = function () {
        if (this._previewWindow) {
            this._previewWindow.contents.clear();
            this._previewWindow.destroy();
            this._previewWindow = null;
        }
        Window_Selectable.prototype.destroy.call(this);
    };

    const parsePluginParameters = (paramString) => {
        try {
            if (!paramString) return {};
            const parsed = JSON.parse(paramString).map((json) =>
                typeof json === "string" ? JSON.parse(json) : json
            );
            return parsed.reduce((acc, param) => {
                if (param && param.ParamId !== undefined && param.Label) {
                    acc[param.ParamId] = param.Label;
                }
                return acc;
            }, {});
        } catch (e) {
            console.error(
                "SKM_EquipinfoWindow: プラグインパラメータの解析に失敗しました:",
                e
            );
            return {};
        }
    };

    Window_ItemPreview.prototype.initTraitCache = function () {
        // キャッシュサイズを制限（例：最大100アイテム）
        this._traitCache = new Map();
        this._maxCacheSize = 100;
    };

    Window_ItemPreview.prototype.addToTraitCache = function (key, value) {
        if (this._traitCache.size >= this._maxCacheSize) {
            // 最も古いエントリを削除
            const firstKey = this._traitCache.keys().next().value;
            this._traitCache.delete(firstKey);
        }
        this._traitCache.set(key, value);
    };

    // キャッシュクリア処理の追加
    Window_ItemPreview.prototype.clearTraitCache = function () {
        if (this._traitCache) {
            this._traitCache.clear();
        }
    };

    // setItem時のキャッシュクリア
    const _Window_ItemPreview_setItem = Window_ItemPreview.prototype.setItem;
    Window_ItemPreview.prototype.setItem = function (item) {
        if (!item || this._item === item) return;

        this.clearTraitCache();
        this._item = item;
        this.refresh();
    };

    // セーブ/ロード時のキャッシュクリア
    const _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        _DataManager_extractSaveContents.call(this, contents);
        if (SceneManager._scene) {
            SceneManager._scene.clearAllPreviewCaches();
        }
    };

    // シーンでのキャッシュクリア
    Scene_Base.prototype.clearAllPreviewCaches = function () {
        const windows = [
            this._itemWindow,
            this._buyWindow,
            this._sellWindow,
            this._equipWindow,
        ];

        windows.forEach((window) => {
            if (window && window._previewWindow) {
                window._previewWindow.clearTraitCache();
            }
        });
    };

    // destroy時のキャッシュクリア
    const _Window_ItemPreview_destroy = Window_ItemPreview.prototype.destroy;
    Window_ItemPreview.prototype.destroy = function () {
        this.clearTraitCache();
        _Window_ItemPreview_destroy.call(this);
    };

    // 基礎パラメータが全て0かどうかを判定する関数を追加
    Window_ItemPreview.prototype.hasAnyBaseParams = function () {
        if (!this._item) return false;

        // 基礎パラメータ（攻撃力、魔力、防御力、魔法防御力）のいずれかが0でないかチェック
        return [2, 3, 4, 5].some((id) => this._item.params[id] !== 0);
    };
})();
