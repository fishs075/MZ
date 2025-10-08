//
//  入手インフォメーション ver1.21
//
// ------------------------------------------------------
// Copyright (c) 2025 さかなのまえあし 
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author さかなのまえあし
//

var Imported = Imported || {};
Imported['GetInformationMZ'] = 1.21;

if (!Imported.CommonPopupCoreMZ) {
    console.error('CommonPopupCoreMZを導入してください。')
}
/*:
 * @target MZ
 * @plugindesc ver1.21/アイテムの入手などにスライドアニメするインフォメーションを追加するプラグインです。
 * @author さかなのまえあし
 * 
 * @param defaultparam
 * @text 基本設定
 * @desc 入手インフォメーション全体の有効/無効や、戦闘中の動作に関する基本設定です。
 * @default ーーーー
 *
 * @param Info Disable Switch Id
 * @text 無効化スイッチID
 * @desc 入手インフォメーションを無効化するためのスイッチのIDです。
 * このスイッチがONの時、インフォメーションが無効化されます。
 * @type switch
 * @default 10
 * 
 * @param Use Battle Info
 * @text 戦闘中に使用するかの設定
 * @desc 入手インフォメーションを戦闘中に使用するかの設定です。
 * true/falseで設定してください。
 * @type boolean
 * @default true
 * 
 * @param Use Rewards Info
 * @text 戦利品を表示するかの設定
 * @desc 戦利品を入手インフォメーションで表示するかの設定です。
 * true/falseで設定してください。
 * @type boolean
 * @default true
 * 
 * @param Use Rewards Info High
 * @text 戦利品を表示する高さの設定
 * @desc 戦利品を表示するポップアップの高さ位置の設定です。
 * @type select
 * @option messege
 * @option states
 * @default messege
 * 
 * 
 *
 * @param Infoparam
 * @text 表示挙動(演出)
 * @desc ポップアップの見た目や動き、表示位置に関する設定です。
 * @default ーーーー
 *
 * @param Info Pattern
 * @text 入手インフォの動作パターン
 * @desc 入手インフォメーションの動作パターンです。
 * Normal:普通 GrowUp:にょき Stretch:うにょーん
 * @type select
 * @option GrowUp
 * @option Normal
 * @option Stretch
 * @default GrowUp
 *
 * @param Info Font Size
 * @text 入手インフォの文字サイズ
 * @desc 入手インフォメーションの文字サイズです。
 * @type number
 * @default 20
 * 
 * @param Info Count
 * @text 入手インフォの表示時間
 * @desc 入手インフォメーションの表示時間です。
 * @type number
 * @default 120
 * 
 * @param Info Delay
 * @text 入手インフォのディレイ
 * @desc 入手インフォメーションのディレイです。
 * 連続で設定された時、この数値の表示ディレイがかかります。
 * @type number
 * @default 20
 * 
 * @param Info MoveWait
 * @text 入手インフォの移動時間
 * @desc 入手インフォメーションが完全に表示された状態の時間です。
 * @type number
 * @default 100
 * 
 * @param Info MoveFade
 * @text 入手インフォのフェード時間
 * @desc 入手インフォメーションのフェードの時間です。
 * @type number
 * @default 10
 *
 * @param Enable Out Move
 * @text 退場時の移動を行うかの設定
 * @desc 退場時の移動を行うかの設定です。
 * @type boolean
 * @default false
 *
 * @param Info Position
 * @text 入手インフォの表示位置
 * @desc 入手インフォメーションの表示位置です。
 * Topで画面上部に表示。Bottomで画面下部に表示。
 * @type select
 * @option Bottom
 * @option Top
 * @default Bottom
 * 
 * @param Info Slide Action
 * @text 入手インフォのスライド方向
 * @desc 入手インフォメーションのスライド方向です。Autoを指定すると、表示位置がBottomの場合はUp、それ以外はDownになります。
 * @type select
 * @option Auto
 * @option Up
 * @option Down
 * @default Auto
 * 
 * @param Info Sup X
 * @text 入手インフォの表示位置補正X座標
 * @desc 入手インフォメーションの表示位置補正X座標です。
 * @type number
 * @min -100
 * @default 0
 * 
 * @param Info Sup Y
 * @text 入手インフォの表示位置補正Y座標
 * @desc 入手インフォメーションの表示位置補正Y座標です。
 * @type number
 * @min -100
 * @default 0
 *
 * @param Info Width
 * @text 入手インフォの横幅
 * @desc 入手インフォメーションの横幅です。
 * @type number
 * @default 816
 *
 * @param Iconparam
 * @text アイコン設定
 * @desc 所持金やアクターに使用するアイコンの割り当て設定です。
 * @default ーーーー
 *
 * @param Gold Icon Index
 * @text 所持金のアイコンとして使用するアイコンのインデックス
 * @desc 所持金のアイコンとして使用するアイコンのインデックスです。
 * @type number
 * @default 314
 *
 * @param Actor Icon Start Index
 * @text アクターアイコンインデックス
 * @desc アクターのアイコンとして使用するアイコンの最初のインデックスです。
 * @type number
 * @default 320
 *
 * @param battleparam
 * @text 戦闘時の表示
 * @desc 戦闘終了時の遅延や、どの情報をポップアップするかの一覧設定です。
 * @default ーーーー
 *
 * @param Reward Popup Delay
 * @text 戦利品表示時に表示開始までにかけるディレイの数値
 * @desc 戦利品表示時に表示開始までにかけるディレイの数値です。
 * @type number
 * @default 0
 *
 * @param Battle Show List
 * @text 戦闘中に表示するインフォメーションのリスト
 * @desc 戦闘中に表示するインフォメーションのリストです。item,gold,
 * exp,skill,params,level,abp,classLevelで指定してください。
 * @default item,gold,exp,skill,params,level,abp,classLevel
 *
 * @param ExItemparam
 * @text 特殊アイテム表示
 * @desc 隠しアイテムA/Bを入手した際にポップアップを表示するかを設定します。
 * @default ーーーー
 *
 * @param Show Get Hide Item A
 * @text 隠しアイテムAを取得したときにポップアップを表示
 * @desc 隠しアイテムAを取得したときにポップアップを表示するかの設定です。
 * @default false
 * @type boolean
 *
 * @param Show Get Hide Item B
 * @text 隠しアイテムBを取得したときにポップアップを表示
 * @desc 隠しアイテムBを取得したときにポップアップを表示するかの設定です。
 * @default false
 * @type boolean
 *
 * @param Logparam
 * @text ログ呼び出し設定
 * @desc インフォメーションログの呼び出しキーやログ形式の設定です。
 * @default ーーーー
 *
 * @param Log Key
 * @text ログを呼び出すためのキー設定
 * @desc インフォメーションログを呼び出すためのキー設定です。
 * @default control
 * @type select
 * @option menu
 * @option control
 * @option pageup
 * @option pagedown
 * @option shift
 * @option tab
 * @option
 * @default
 *
 * @param Log Max
 * @text 保存するログの最大数
 * @desc 保存するログの最大数です。
 * @type number
 * @default 100
 *
 * @param Log Row
 * @text ログ1つ当たりの行数
 * @desc ログ1つ当たりの行数です。
 * @type number
 * @default 2
 *
 * @param Log Reverse
 * @text 並び順逆
 * @desc ログの並び順を逆にするかの設定です。
 * @type boolean
 * @default false
 *
 * @param Menu Info Log Name
 * @text メニュー追加名
 * @desc メニューに追加するインフォログ呼び出しコマンドの名前です。
 * 空白にすると、メニューにコマンドを追加しません。
 * @default
 *
 * @param tempItem
 * @text テンプレート: 所持金/アイテム
 * @desc 所持金とアイテム増減時に表示される文章テンプレート。_icon/_name/_num などの置換に対応します。
 * @default ーーーー
 *
 * @param Get Gold Text
 * @text 所持金の増加
 * @desc 所持金の増加で表示されるテキストです。。
 * _icon:上記で設定したアイコンインデックス _num:金額
 * @default 「\I[_icon]_num\C[14]\G\C[0]」 を\C[24]手に入れた！
 * 
 * @param Lost Gold Text
 * @text 所持金の減少
 * @desc 所持金の減少で表示されるテキストです。
 * _icon:上記で設定したアイコンインデックス _num:金額
 * @default 「\I[_icon]_num\C[14]\G\C[0]」 を\C[2]失った・・・
 * 
 * @param Get Item Text
 * @text アイテムの増加
 * @desc アイテムの増加で表示されるテキストです。
 * _icon:アイコン _name:名前　_desc1:解説1行目 _desc2:解説2行目
 * @default 「\I[_icon]_name」 を\C[24]手に入れた！\n\C[6]_desc1
 * 
 * @param Lost Item Text
 * @text アイテムの減少
 * @desc アイテムの減少で表示されるテキストです。
 * _icon:アイコン _name:名前　_desc1:解説1行目 _desc2:解説2行目
 * @default 「\I[_icon]_name」 を\C[2]失った・・・\n\C[6]_desc1
 * 
 * @param Get Item Text Num
 * @text アイテムの増加。2個以上。
 * @desc アイテム増加。2個以上。_icon:アイコン
 * _name:名前　_num:個数 _desc1:解説1行目 _desc2:解説2行目
 * @default 「\I[_icon]_name」 を\C[14]_num個\C[24]手に入れた！\n\C[6]_desc1
 * 
 * @param Lost Item Text Num
 * @text アイテムの減少。2個以上。
 * @desc アイテム減少。2個以上。_icon:アイコン
 * _name:名前　_num:個数 _desc1:解説1行目 _desc2:解説2行目
 * @default 「\I[_icon]_name」 を\C[14]_num個\C[2]失った・・・\n\C[6]_desc1
 * 
 * 
 * 
 * @param tempskill
 * @text テンプレート: スキル/経験値/レベル/能力値
 * @desc アクター固有の置換(_actor/_aicon)や、増減で文言が変化します。
 * @default ーーーー
 *
 * @param Get Skill Text
 * @text スキルの習得
 * @desc スキルの習得で表示されるテキストです。_actor:アクター名
 * _icon:アイコン _name:名前　_desc1:解説1行目 _desc2:解説2行目
 * @default _actorは「\I[_icon]_name」 を\C[24]覚えた！\n\C[6]_desc1
 * 
 * @param Lost Skill Text
 * @text スキルの忘却
 * @desc スキルの忘却で表示されるテキストです。_actor:アクター名
 * _icon:アイコン _name:名前　_desc1:解説1行目 _desc2:解説2行目
 * @default _actorは「\I[_icon]_name」 を \C[2]忘れてしまった・・・\n\C[6]_desc1
 * 
 * @param Exp Up Text
 * @text 経験値の増加
 * @desc 経験値の増加で表示されるテキストです。
 * _actor:アクター名  _name:経験値の名前 _num:経験値　
 * @default _actorは\C[14]_numポイント\C[0]の\C[4]_name\C[0]を\C[24]得た！
 * 
 * @param Exp Down Text
 * @text 経験値の減少
 * @desc 経験値の減少で表示されるテキストです。
 * _actor:アクター名  _name:経験値の名前　_num:経験値
 * @default _actorは\C[14]_numポイント\C[0]の\C[4]_name\C[0]を\C[2]失った・・・
 * 
 * @param Lv Up Text
 * @text レベルの増加
 * @desc レベルの増加で表示されるテキストです。
 * _actor:アクター名  _name:レベルの名前 _num:上がったレベル
 * @default _actorは\C[4]_name\C[0]が\C[14]_numポイント\C[24]上がった！
 * 
 * @param Lv Down Text
 * @text レベルの減少
 * @desc レベルの減少で表示されるテキストです。
 * _actor:アクター名  _name:レベルの名前　_num:下がったレベル
 * @default _actorは\C[4]_name\C[0]が\C[14]_numポイント\C[2]下がった・・・
 * 
 * @param Param Up Text
 * @text 能力値の増加
 * @desc 能力値の増加で表示されるテキストです。
 * _actor:アクター名  _name:能力値の名前 _num:上がったレベル
 * @default _actorは\C[4]_name\C[0]が\C[14]_numポイント\C[24]上がった！
 * 
 * @param Param Down Text
 * @text 能力値の減少
 * @desc 能力値の減少で表示されるテキストです。
 * _actor:アクター名  _name:能力値の名前　_num:下がったレベル
 * @default _actorは\C[4]_name\C[0]が\C[14]_numポイント\C[2]下がった・・・
 *
 * @param tempAbp
 * @text テンプレート: クラス/陣形
 * @desc HybridClass/BattleFormation使用時の置換(_classなど)に対応します。
 * @default ーーーー
 *
 * @param Abp Up Text
 * @text クラス経験値の増加
 * @desc クラス経験値の増加で表示されるテキストです。
 * _actor:アクター名  _name:経験値の名前 _num:経験値　
 * @default _actorは\C[14]_numポイント\C[0]の\C[4]_name\C[0]を\C[24]得た！
 * 
 * @param Abp Down Text
 * @text クラス経験値の減少
 * @desc クラス経験値の減少で表示されるテキストです。
 * _actor:アクター名  _name:経験値の名前　_num:経験値
 * @default _actorは\C[14]_numポイント\C[0]の\C[4]_name\C[0]を\C[2]失った・・・
 * 
 * @param Class Lv Up Text
 * @text クラスレベルの増加
 * @desc クラスレベルの増加で表示されるテキストです。 _class:クラス名
 * _actor:アクター名  _name:レベルの名前 _num:上がったレベル
 * @default _actorは\C[4]_classの_name\C[0]が\C[14]_numポイント\C[24]上がった！
 * 
 * @param Class Lv Down Text
 * @text クラスレベルの減少
 * @desc クラスレベルの減少で表示されるテキストです。 _class:クラス名
 * _actor:アクター名  _name:レベルの名前　_num:下がったレベル
 * @default _actorは\C[4]_classの_name\C[0]が\C[14]_numポイント\C[2]下がった・・・
 *
 * @param Formation Lv Up Text
 * @text 陣形レベルの増加
 * @desc 陣形レベルの増加で表示されるテキストです。
 * _name:陣形の名前　_num:上がったレベル
 * @default \C[4]_nameの熟練度\C[0]が\C[14]_numポイント\C[24]上がった！
 *
 * @param Formation Lv Max Text
 * @text 陣形をマスター
 * @desc 陣形をマスターした時に表示されるテキストです。
 * _name:陣形の名前
 * @default \C[4]_name\C[0]を\C[14]マスターした！
 *
 * @command showInfo
 * @text インフォメーション表示
 * @desc 任意のテキストをインフォメーションポップアップで表示します。
 *
 * @arg text
 * @text 表示テキスト
 * @desc 表示したいテキスト。制御文字（\I[n], \C[n]など）や改行（\n）が使用できます。
 * @type multiline_string
 * @default テキストを入力してください
 *
 * @help
 * このプラグインはYana様作のプラグインをMZに移植したものです
 * 
 * ------------------------------------------------------
 * プラグインコマンド (MZ)
 * ------------------------------------------------------
 * ◆インフォメーション表示
 * 任意のテキストをポップアップで表示します。
 * 制御文字（\I[n], \C[n]など）や改行（\n）が使用できます。
 * 
 * 例：
 * \I[87]魔法の鍵\C[0]を手に入れた！\n\C[6]不思議な力を感じる...
 * 
 * \FS[xx] フォントサイズを指定、は無効化されます
 * 
 * ------------------------------------------------------
 * このプラグインには「汎用ポップアップベース(CommonPopupCoreMZ.js)」のプラグインが必要です。
 * 汎用ポップアップベースより下に配置してください。
 * また、それぞれの表示テキストに何も記載しない場合、そのインフォメーションを無効化できます。
 * ------------------------------------------------------
 * 使い方
 * ------------------------------------------------------
 * 導入するだけで動作します。
 * 詳細な設定は、プラグインパラメータを参照してください。
 *
 * 戦闘中の高さはステータスウインドウとメッセージウインドウの高いほうに固定
 * 戦利品の高さはプラグインパラメーターで選択可能。
 * また、戦闘中は表示せず戦利品のみポップアップ表示も可能
 * 
 * 170524
 * それぞれのテキストの最初に追加することで、ポップアップ発生時にSEを追加する専用制御文字を追加しました。
 * _SE[名前[,音量,ピッチ,位相]]
 * ※音量、ピッチ、位相は省略可能です。省略した場合、音量=90,ピッチ=100，位相=0として扱われます。
 * 例：レベルアップのポップアップ時にSkill3のSEを鳴らす。
 * _SE[Skill3]_actorは\C[4]_name\C[0]が\C[14]_numポイント\C[24]上がった！
 * 
 * 
 * 
 * 連携プラグイン対応状況: 
 * - VXandAceHybridClass.js - MZ非対応
 * 経験値で成長するクラスとABPで成長するクラスを設定、クラスチェンジも可能
 * - BattleFormation.js - MZ非対応
 * 陣形に関するプラグインです
 * ２つともYana様作
 * 
 * 移植テスト環境
 * デフォルト解像度
 * フォントサイズ 16-32
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
 * バグ報告や使用方法等のお問合せは公式ツクールフォーラムにお願いします。
 * 素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * 更新履歴:
 * for さかなのまえあし
 * ver1.2.2:20251008
 * 表示位置のデフォルトを（空白）からBottomに変更
 * 表示位置TOPが大文字だったのでTopに調節（要再設定）
 * スライド方向にAutoを追加。
 * 
 * ver1.2.1:20251007
 * \FS[xx] フォントサイズを指定、は無効化されます
 * 
 * ver1.2:20251007
 * MV版を再度移植しなおし。余計な機能はつけづ元の機能の再現にのみ注力
 * 
 * for Yana
 * ver1.171:190213
 * 装備解除時にエラーが発生するバグを修正
 * 
 * （略）
 * 
 * ver1.00:
 * 公開
 */

/**
 * 入手インフォメーション(取得ログ/ポップアップ)のメイン実装。
 * - RPGツクールMZの各種増減処理をフックして、CommonPopupCore による
 *   取得ポップアップと情報ログを表示します。
 * - 本ファイルは表示テキストの差し替えや挙動制御をパラメータで行い、
 *   ログ画面(Scene_InfoLog)と表示用ウィンドウ(Window_InfoLog)も提供します。
 *
 * 注意:
 * - CommonPopupCoreMZ が必須です。表示は CommonPopupManager に委譲します。
 * - ゲーム中フラグ(CommonPopupManager._popEnable)で表示の有効/無効を切替えます。
 */
(function() {
    //===========================================================================
    // プラグインパラメータの読み込み
    //===========================================================================
    var parameters = PluginManager.parameters('GetInformationMZ');
    
    // ● 基本設定
    var infoDisableSwitchId = Number(parameters['Info Disable Switch Id'] || 10); // 無効化スイッチID
    var useBattleInfo = String(parameters['Use Battle Info'] || 'true') === 'true'; // 戦闘中に使用するか
    var useRewardsInfo = String(parameters['Use Rewards Info'] || 'true') === 'true'; // 戦利品表示をするか
    var useRewardsInfoHigh = String(parameters['Use Rewards Info High'] || 'messege') === 'messege'; // 戦利品表示の高さ位置
    
    
    // ● 表示テキストテンプレート（所持金）
    var getGoldText = String(parameters['Get Gold Text']);
    var lostGoldText = String(parameters['Lost Gold Text']);
    
    // ● 表示テキストテンプレート（アイテム）
    var getInfoText = String(parameters['Get Item Text']);
    var lostInfoText = String(parameters['Lost Item Text']);
    var getInfoTextNum = String(parameters['Get Item Text Num']);
    var lostInfoTextNum = String(parameters['Lost Item Text Num']);
    
    // ● 表示テキストテンプレート（スキル）
    var getInfoSkillText = String(parameters['Get Skill Text']);
    var lostInfoSkillText = String(parameters['Lost Skill Text']);
    
    // ● 表示テキストテンプレート（経験値）
    var ExpUpText = String(parameters['Exp Up Text']);
    var ExpDownText = String(parameters['Exp Down Text']);
    
    // ● 表示テキストテンプレート（レベル）
    var lvUpText = String(parameters['Lv Up Text']);
    var lvDownText = String(parameters['Lv Down Text']);
    
    // ● 表示テキストテンプレート（能力値）
    var ParamUpText = String(parameters['Param Up Text']);
    var ParamDownText = String(parameters['Param Down Text']);
    
    // ● 表示テキストテンプレート（クラス経験値・レベル）
    var abpUpText = String(parameters['Abp Up Text']);
    var abpDownText = String(parameters['Abp Down Text']);
    var clvUpText = String(parameters['Class Lv Up Text']);
    var clvDownText = String(parameters['Class Lv Down Text']);
    
    // ● 表示テキストテンプレート（陣形）
    var fLvUpText = String(parameters['Formation Lv Up Text']);
    var fLvMaxText = String(parameters['Formation Lv Max Text']);
    
    // ● 表示挙動設定（演出）
    var infoFontSize = Number(parameters['Info Font Size'] || 20);       // フォントサイズ
    var infoCount = Number(parameters['Info Count'] || 120);             // 表示時間（フレーム）
    var infoDelay = Number(parameters['Info Delay'] || 20);              // 連続表示時のディレイ
    var infoMoveWait = Number(parameters['Info MoveWait'] || infoCount); // 完全表示の時間
    var infoMoveFade = Number(parameters['Info MoveFade'] || 0);         // フェード時間
    var enableOutMove = parameters['Enable Out Move'] === 'true';        // 退場時移動するか
    var infoSlideCount = 60;                                             // スライドカウント（固定値）
    var infoPattern = parameters['Info Pattern'] || 'Normal';            // 動作パターン
    var infoPosition = String(parameters['Info Position'] || 'Bottom');        // 表示位置（Top/Bottom）
    var infoSlideActiontemp = String(parameters['Info Slide Action'] || 'Auto'); // スライド方向（Auto/Down/Up）
    var tempinfoSupX = Number(parameters['Info Sup X'] || 0);                // 位置補正X
    var infoSupX = tempinfoSupX -4;
    var tempinfoSupY = Number(parameters['Info Sup Y'] || 0);                // 位置補正Y
    var infoSupY = tempinfoSupY;
    var infoWidth = parameters['Info Width'] || 816;                     // ポップアップの横幅
    
    // ● アイコン設定
    var goldIconIndex = Number(parameters['Gold Icon Index'] || 314);    // 所持金アイコンIndex
    var actorIconStartIndex = Number(parameters['Actor Icon Start Index']); // アクターアイコン開始Index
    
    // ● 戦闘時の表示設定
    var rewardPopupDelay = Number(parameters['Reward Popup Delay']);     // 戦利品表示ディレイ
    var battleShowList = String(parameters['Battle Show List']).split(','); // 戦闘中表示項目リスト
    
    // ● 特殊アイテム表示
    var showGetHideItemA = parameters['Show Get Hide Item A'] === 'true'; // 隠しアイテムA表示
    var showGetHideItemB = parameters['Show Get Hide Item B'] === 'true'; // 隠しアイテムB表示
    
    // ● ログ設定
    var logKey = parameters['Log Key'] || "";                            // ログ呼び出しキー
    var logMax = Number(parameters['Log Max'] || 100);                   // ログ保存最大数
    var logRow = Number(parameters['Log Row'] || 1);                     // ログ1件の行数
    var logReverse = parameters['Log Reverse'] === 'true';               // ログ並び順を逆にするか
    var menuInfoLogName = parameters["Menu Info Log Name"] || '';        // メニューコマンド名


    // ● スライド方向の設定
    if(infoSlideActiontemp === 'Auto'){
        var infoSlideAction = infoPosition === 'Bottom' ? 'Up' : 'Down'; //表示位置がBottomの場合はUp、それ以外はDown
    }else{
        var infoSlideAction = infoSlideActiontemp;
    }


    //===========================================================================
    // プラグインコマンド: 任意テキストのインフォ表示 (MZ)
    // 使い方: プラグインコマンドから「インフォメーション表示」を選択
    //===========================================================================
    PluginManager.registerCommand('GetInformationMZ', 'showInfo', args => {
        // テキストを取得して表示
        const text = String(args.text || '');
        if (text) {
            CommonPopupManager.showInfo({}, text, null);
        }
    });

    //===========================================================================
    // CommonPopupManager: ポップアップ許可判定
    //===========================================================================
    /**
     * 現在、ポップアップを許可できるかを返します。
     * - 無効化スイッチや戦闘中使用可否の設定を考慮します。
     * @returns {boolean}
     */
    CommonPopupManager.popEnable = function() {
        // 戦闘中なら useBattleInfo、非戦闘時は常に true
        var useBattle = $gameParty.inBattle() ? useBattleInfo : true;
        // 無効化スイッチがOFFかつ、戦闘状態に応じた可否がtrueのときのみ許可
        return !$gameSwitches.value(infoDisableSwitchId) && useBattle;
    };

    //===========================================================================
    // Game_Interpreter: イベントコマンドのフック
    // （_popEnableフラグを一時的にONにして、コマンド実行中にポップアップを有効化）
    //===========================================================================
    
    // ● 所持金増減（command125）
    var _gInfo_GInterpreter_command125 = Game_Interpreter.prototype.command125;
    Game_Interpreter.prototype.command125 = function(params) {
        // コマンド実行前にフラグを有効化し、実行後に無効化
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        var result = _gInfo_GInterpreter_command125.call(this, params);
        CommonPopupManager._popEnable = false;
        return result;
    };
    
    // ● アイテム増減（command126）
    var _gInfo_GInterpreter_command126 = Game_Interpreter.prototype.command126;
    Game_Interpreter.prototype.command126 = function(params) {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        var result = _gInfo_GInterpreter_command126.call(this, params);
        CommonPopupManager._popEnable = false;
        return result;
    };
    
    // ● 武器増減（command127）
    var _gInfo_GInterpreter_command127 = Game_Interpreter.prototype.command127;
    Game_Interpreter.prototype.command127 = function(params) {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        var result = _gInfo_GInterpreter_command127.call(this, params);
        CommonPopupManager._popEnable = false;
        return result;
    };
    
    // ● 防具増減（command128）
    var _gInfo_GInterpreter_command128 = Game_Interpreter.prototype.command128;
    Game_Interpreter.prototype.command128 = function(params) {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        var result = _gInfo_GInterpreter_command128.call(this, params);
        CommonPopupManager._popEnable = false;
        return result;
    };
    
    // ● 経験値増減（command315）
    var _gInfo_GInterpreter_command315 = Game_Interpreter.prototype.command315;
    Game_Interpreter.prototype.command315 = function(params) {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        var result = _gInfo_GInterpreter_command315.call(this, params);
        CommonPopupManager._popEnable = false;
        return result;
    };
    
    // ● レベル変更（command316）
    var _gInfo_GInterpreter_command316 = Game_Interpreter.prototype.command316;
    Game_Interpreter.prototype.command316 = function(params) {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        var result = _gInfo_GInterpreter_command316.call(this, params);
        CommonPopupManager._popEnable = false;
        return result;
    };
    
    // ● 能力値変更（command317）
    var _gInfo_GInterpreter_command317 = Game_Interpreter.prototype.command317;
    Game_Interpreter.prototype.command317 = function(params) {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        var result = _gInfo_GInterpreter_command317.call(this, params);
        CommonPopupManager._popEnable = false;
        return result;
    };
    
    // ● スキル変更（command318）
    var _gInfo_GInterpreter_command318 = Game_Interpreter.prototype.command318;
    Game_Interpreter.prototype.command318 = function(params) {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        var result = _gInfo_GInterpreter_command318.call(this, params);
        CommonPopupManager._popEnable = false;
        return result;
    };

    //===========================================================================
    // Game_Actor / Game_Party: 各種増減処理のフック
    // （実際の増減処理後に、_popEnableがtrueならポップアップを表示）
    //===========================================================================
    
    /**
     * 能力値加算時のポップアップ表示
     * @param {number} paramId パラメータID（0:HP, 1:MP, 2:攻撃力...）
     * @param {number} value 加算値（正負両対応）
     */
    Game_Actor.prototype.addParam = function(paramId, value) {
        Game_BattlerBase.prototype.addParam.call(this, paramId, value);
        if (CommonPopupManager._popEnable) {
            // 戦闘中の場合、params表示が有効かチェック
            if ($gameParty.inBattle() && !battleShowList.contains('params')){ return }
            CommonPopupManager.showInfo({
                'name' : TextManager.param(paramId),  // "最大HP"等の名前
                'value' : value > 0                    // 増加/減少フラグ
            }, value, 'param', this.actorId());
        }
    };
    
    var _gInfo_GParty_gainGold = Game_Party.prototype.gainGold;
    /**
     * 所持金の増減時のポップアップ表示
     * @param {number} amount 変動額（正で増加、負で減少）
     */
    Game_Party.prototype.gainGold = function(amount) {
        _gInfo_GParty_gainGold.call(this, amount);
        if (CommonPopupManager._popEnable) {
            // 戦闘中の場合、gold表示が有効かチェック
            if ($gameParty.inBattle() && !battleShowList.contains('gold')){ return }
            var hash = {
                'name' : '',
                'iconIndex' : goldIconIndex,      // 所持金アイコン
                'description' : '',
                'value' : Math.abs(amount)        // 絶対値
            };
            CommonPopupManager.showInfo(hash, amount, 'gold');
        }
    };
    
    var _gInfo_GParty_gainItem = Game_Party.prototype.gainItem;
    /**
     * アイテム/装備の増減時のポップアップ表示
     * @param {RPG.Item|RPG.Weapon|RPG.Armor} item 対象データ
     * @param {number} amount 変動数（正で増加、負で減少）
     * @param {boolean} includeEquip 装備中も含めるか
     */
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
        var result = _gInfo_GParty_gainItem.call(this, item, amount, includeEquip);
        if (item) {
            // 隠しアイテムA（itypeId=3）/ 隠しアイテムB（itypeId=4）の表示判定
            var flag = (item.itypeId === 3 && showGetHideItemA) || (item.itypeId === 4 && showGetHideItemB);
            if (CommonPopupManager._popEnable) {
                // 戦闘中の場合、item表示が有効かチェック
                if (!(this.inBattle() && !battleShowList.contains('item'))) {
                    // 通常アイテム、または隠しアイテムで表示許可されている場合のみ
                    if ([3, 4].indexOf(item.itypeId) < 0 || flag) {
                        CommonPopupManager.showInfo(item, amount, 'item');
                    }
                }
            }
        }
        // YEP_CoreEngine互換処理
        if (Imported.YEP_CoreEngine) return result;
    };
    
    var _gInfo_GActor_learnSkill = Game_Actor.prototype.learnSkill;
    /**
     * スキル習得時のポップアップ表示
     * @param {number} skillId スキルID
     */
    Game_Actor.prototype.learnSkill = function(skillId) {
        var isLearn = this.isLearnedSkill(skillId);  // 習得前状態を記憶
        _gInfo_GActor_learnSkill.call(this, skillId);
        // 新たに習得した場合のみポップアップ
        if (CommonPopupManager._popEnable && !isLearn) {
            if ($gameParty.inBattle() && !battleShowList.contains('skill')){ return }
            CommonPopupManager.showInfo($dataSkills[skillId], 1, 'skill', this.actorId());
        }
    };
    
    var _gInfo_GActor_forgetSkill = Game_Actor.prototype.forgetSkill;
    /**
     * スキル忘却時のポップアップ表示
     * @param {number} skillId スキルID
     */
    Game_Actor.prototype.forgetSkill = function(skillId) {
        var isLearn = this.isLearnedSkill(skillId);  // 忘却前状態を記憶
        _gInfo_GActor_forgetSkill.call(this, skillId);
        // 実際に忘れた場合のみポップアップ
        if (CommonPopupManager._popEnable && isLearn) {
            if ($gameParty.inBattle() && !battleShowList.contains('skill')){ return }
            CommonPopupManager.showInfo($dataSkills[skillId], 2, 'skill', this.actorId());
        }
    };
    var _gInfo_GActor_changeExp = Game_Actor.prototype.changeExp;
    /**
     * 経験値変更時のポップアップ表示と連動処理
     * 経験値→レベルアップ→習得スキル の順に表示
     * @param {number} exp 目標経験値(累計)
     * @param {boolean} show レベルアップ表示(原仕様)
     */
    Game_Actor.prototype.changeExp = function(exp, show) {
        var tExp = exp - this.currentExp();  // 増減量を計算
        var plevel = this.level;             // 変更前レベルを記憶
        var pSkills = this._skills.clone();  // 変更前スキルリストを記憶
        
        // ● 経験値増減ポップアップ
        if (CommonPopupManager._popEnable) {
            if (!$gameParty.inBattle() || battleShowList.contains('exp')){
                CommonPopupManager.showInfo({
                    'name' : TextManager.exp,  // "経験値"
                    'value' : tExp > 0         // 増加/減少フラグ
                }, tExp, 'exp', this.actorId());
            }
        }
        
        // 元処理実行（内部でレベルが変動する可能性あり）
        // この間はポップアップを一時無効化
        var tempEnable = CommonPopupManager._popEnable;
        CommonPopupManager._popEnable = false;
        _gInfo_GActor_changeExp.call(this, exp, show);
        CommonPopupManager._popEnable = tempEnable;
        
        // ● レベル変動ポップアップ
        if ((this.level - plevel) !== 0){
            var upLevel = this.level - plevel;
            if (CommonPopupManager._popEnable) {
                if ($gameParty.inBattle() && !battleShowList.contains('level')){ return }
                CommonPopupManager.showInfo({
                    'name' : TextManager.level,
                    'value' : upLevel > 0
                }, upLevel, 'level', this.actorId());
            }   
        }
        
        // ● レベルアップで習得したスキルをポップアップ
        if (CommonPopupManager._popEnable) {
            this._skills.forEach(function(skillId){
                if (!pSkills.contains(skillId)){
                    CommonPopupManager.showInfo($dataSkills[skillId], 1, 'skill', this.actorId());
                }
            }.bind(this));
        }
    };
    
    var _gInfo_GActor_changeLevel = Game_Actor.prototype.changeLevel;
    /**
     * レベル変更時のポップアップ表示と連動処理
     * レベル→習得スキル の順に表示
     * @param {number} level 新レベル
     * @param {boolean} show レベルアップ表示(原仕様)
     */
    Game_Actor.prototype.changeLevel = function(level, show) {
        var upLevel = level - this.level;    // 変動量を計算
        var tempEnable = CommonPopupManager._popEnable;
        var pSkills = this._skills.clone();  // 変更前スキルリストを記憶
        
        // 元処理実行（ポップアップは一時無効化）
        CommonPopupManager._popEnable = false;
        _gInfo_GActor_changeLevel.call(this, level, show);
        CommonPopupManager._popEnable = tempEnable;
        
        if (CommonPopupManager._popEnable) {
            if ($gameParty.inBattle() && !battleShowList.contains('level')){ return }
            // ● レベル変動ポップアップ
            CommonPopupManager.showInfo({
                'name' : TextManager.level,
                'value' : upLevel > 0
            }, upLevel, 'level', this.actorId());
            
            // ● レベル変動で習得したスキルをポップアップ
            this._skills.forEach(function(skillId){
                if (!pSkills.contains(skillId)){
                    CommonPopupManager.showInfo($dataSkills[skillId], 1, 'skill', this.actorId());
                }
            }.bind(this));
        }
    };
    
    if (Imported['VXandAceHybridClass']){
        
        // Change Class Level
        var _gInfo_GInterpreter_changeClassLevel = Game_Interpreter.prototype.changeClassLevel;
        Game_Interpreter.prototype.changeClassLevel = function(actorId,level,show) {
            CommonPopupManager._popEnable = CommonPopupManager.popEnable();
            _gInfo_GInterpreter_changeClassLevel.call(this,actorId,level,show);
            CommonPopupManager._popEnable = false;
        };
        
        // Change Abp
        var _gInfo_GInterpreter_changeAbp = Game_Interpreter.prototype.changeAbp;
        Game_Interpreter.prototype.changeAbp = function(actorId,abp,show) {
            CommonPopupManager._popEnable = CommonPopupManager.popEnable();
            var result = _gInfo_GInterpreter_changeAbp.call(this,actorId,abp,show);
            CommonPopupManager._popEnable = false;
            return result;
        };
        
        var _gInfo_GActor_changeAbp = Game_Actor.prototype.changeAbp;
        Game_Actor.prototype.changeAbp = function(abp, show) {
            var tAbp = abp - this.currentAbp();
            var plevel = this.currentClassLevel();
            var pSkills = this._skills.clone();
            if (CommonPopupManager._popEnable) {
                if (!$gameParty.inBattle() || battleShowList.contains('abp')){
                    CommonPopupManager.showInfo({
                        'name' : TextManager.abp,
                        'value' : tAbp > 0
                    }, tAbp, 'abp', this.actorId());
                }
            }
            
            var tempEnable = CommonPopupManager._popEnable;
            CommonPopupManager._popEnable = false;
            
            _gInfo_GActor_changeAbp.call(this, abp, show);
            
            CommonPopupManager._popEnable = tempEnable;
            
            if ((this.currentClassLevel() - plevel) !== 0){
                var upLevel = this.currentClassLevel() - plevel;
                if (CommonPopupManager._popEnable) {
                    if ($gameParty.inBattle() && !battleShowList.contains('classLevel')){ return }
                    CommonPopupManager.showInfo({
                        'name' : TextManager.classLevel,
                        'value' : upLevel > 0
                    }, upLevel, 'classLevel', this.actorId(), this.currentClass().name);
                }   
            }
            if (CommonPopupManager._popEnable) {
                this._skills.forEach(function(skillId){
                    if (!pSkills.contains(skillId)){
                        CommonPopupManager.showInfo($dataSkills[skillId], 1, 'skill', this.actorId());
                    }
                }.bind(this));
            }
        };
        
        var _gInfo_GActor_changeClassLevel = Game_Actor.prototype.changeClassLevel;
        Game_Actor.prototype.changeClassLevel = function(level, show) {
            var upLevel = level - this.currentClassLevel();
            var tempEnable = CommonPopupManager._popEnable;
            var pSkills = this._skills.clone();
            CommonPopupManager._popEnable = false;
            _gInfo_GActor_changeClassLevel.call(this, level, show);
            CommonPopupManager._popEnable = tempEnable;
            if (CommonPopupManager._popEnable) {
                if ($gameParty.inBattle() && !battleShowList.contains('classLevel')){ return }
                CommonPopupManager.showInfo({
                    'name' : TextManager.classLevel,
                    'value' : upLevel > 0
                }, upLevel, 'classLevel', this.actorId(), this.currentClass().name);
                
                this._skills.forEach(function(skillId){
                    if (!pSkills.contains(skillId)){
                        CommonPopupManager.showInfo($dataSkills[skillId], 1, 'skill', this.actorId());
                    }
                }.bind(this));
            }   
        };
    }

    var __BManager_displayRewards = BattleManager.displayRewards;
    // 戦闘リザルト表示後: 陣形レベルの表示対応
    BattleManager.displayRewards = function () {
        __BManager_displayRewards.call(this);
        if (Imported['BattleFormation']) {
            $gameTemp._popupDelay = rewardPopupDelay;
            var upLevel = this._upBfLevel;
            var item = $gameParty.battleFormation();
            if (CommonPopupManager.popEnable() && item) {
                if ($gameParty.inBattle() && !battleShowList.contains('formationLevel')) return;
                if ($gameParty.isMaxBfLevel(item.id)) {
                    CommonPopupManager.showInfo({
                        'name': item.name,
                        'iconIndex': item.iconIndex,
                        'value': 'max'
                    }, upLevel, 'formationLevel', null, null);
                } else {
                    CommonPopupManager.showInfo({
                        'name': item.name,
                        'iconIndex': item.iconIndex,
                        'value': upLevel > 0
                    }, upLevel, 'formationLevel', null, null);
                }
            }
            $gameTemp._popupDelay = 0;
        }
    };

    //===========================================================================
    // CommonPopupManager.showInfo: ポップアップ表示の中核処理
    // 1. type に応じたテキストテンプレートを選択
    // 2. テンプレート内の置換文字列（_actor, _name, _icon 等）を実際の値で置換
    // 3. ビットマップを作成して描画
    // 4. CommonPopupCore にポップアップ設定を渡して表示
    //===========================================================================
    /**
     * ポップアップ表示の中核。テキスト整形と描画ビットマップ構築を行います。
     * @param {object} object 対象オブジェクト(アイテム/スキル/名称+iconIndex等)
     * @param {number|string} value 量(符号有) または 任意テキスト(デフォルト経路)
     * @param {('gold'|'item'|'exp'|'level'|'abp'|'classLevel'|'param'|'skill'|'formationLevel')} type 種別
     * @param {number|null} actor アクターID(必要な場合)
     * @param {string|null} c クラス名等の補助パラメータ
     */
    CommonPopupManager.showInfo = function(object, value, type, actor, c) {
        var text1 = null;
        if (value === 0) { return }  // 0は表示しない
        var se = {name:'',volume:90,pitch:100,pan:0};  // SE情報（後で_SE[]で上書き可能）
        
        // ■ステップ1: typeと増減に応じて、使用するテキストテンプレートを選択
        switch(type) {
            case 'gold':  // 所持金
                text1 = getGoldText;
                if (value < 0) { text1 = lostGoldText }
                break;
            case 'item':  // アイテム（個数により分岐）
                text1 = getInfoText;
                if (value > 1) {
                    text1 = getInfoTextNum      // 2個以上増加
                } else if (value === -1) {
                    text1 = lostInfoText        // 1個減少
                } else if (value < -1) {
                    text1 = lostInfoTextNum     // 2個以上減少
                }
                break;
            case 'exp':  // 経験値
                text1 = object.value ? ExpUpText : ExpDownText;
                break;
            case 'level':  // レベル
                text1 = object.value ? lvUpText : lvDownText;
                break;
            case 'abp':  // クラス経験値
                text1 = object.value ? abpUpText : abpDownText;
                break;
            case 'classLevel':  // クラスレベル
                text1 = object.value ? clvUpText : clvDownText;
                break;
            case 'param':  // 能力値
                text1 = object.value ? ParamUpText : ParamDownText;
                break;
            case 'skill':  // スキル（1=習得, 2=忘却）
                text1 = value === 1 ? getInfoSkillText : lostInfoSkillText;
                break;
            case 'formationLevel':  // 陣形レベル
                text1 = object.value === 'max' ? fLvMaxText : fLvUpText;
                break;
            default :  // プラグインコマンドから任意テキスト
                text1 = value;
        }
        if (text1 === '') return;      // 空テンプレートは表示しない
        if (text1 === 'null') return;  // 未設定も表示しない
        
        // ■ステップ2: テキスト先頭の _SE[名前,音量,ピッチ,位相] を解析してSE設定
        text1 = text1.replace(/^_se\[(.+?)\]/i,function(){
            var tx = arguments[1].split(',');
            se.name = tx[0];
            if (tx[1]) se.volume = parseInt(tx[1], 10);
            if (tx[2]) se.pitch = parseInt(tx[2], 10);
            if (tx[3]) se.pan = parseInt(tx[3], 10);
            return '';  // 制御文字を削除
        }.bind(this));
        
        // ■ステップ2.5: テキストから \FS[xx] 制御文字を削除（表示崩れ防止）
        text1 = text1.replace(/\\FS\[\d+\]/gi, '');
        
        // ■ステップ3: テキスト内の置換文字列を実際の値で置換
        var descs = object.description ? object.description.split(/\n/) : [];
        if (actor) {
            actor = $gameActors.actor(actor);
            text1 = text1.replace(/_actor/g, actor.name());                        // アクター名
            text1 = text1.replace(/_aicon/g, actor.actorId()+actorIconStartIndex-1); // アクターアイコン
        }
        if (c) { text1 = text1.replace(/_class/g, c) }                            // クラス名
        text1 = text1.replace(/_name/g, object.name);                             // アイテム/スキル名等
        text1 = text1.replace(/_icon/g, object.iconIndex);                        // アイコンIndex
        text1 = text1.replace(/_num/g, Math.abs(value));                          // 数値（絶対値）
        text1 = descs[0] ? text1.replace(/_desc1/g, descs[0]) : text1.replace(/_desc1/g, ''); // 説明1行目
        text1 = descs[1] ? text1.replace(/_desc2/g, descs[1]) : text1.replace(/_desc2/g, ''); // 説明2行目
        
        // ■ステップ4: 改行で分割し、空行を削除
        var texts = text1.split(/\n|\\n/);
        for (var i = 0; i < texts.length; i++) {
            // 色指定（\C[n]）や制御文字を除去して空行判定
            var text = texts[i].replace(/\\C\[\d+\]/gi, '').replace(/\\I\[\d+\]/gi, '');
            if (text.trim() === '') { delete texts[i] }  // trim()で空白も削除して判定
        }
        texts = texts.compact();  // undefined を削除
        
        // ■ステップ5: ログ記録（空行削除後のテキストを保存）
        $gameSystem.pushInfoLog(texts.join('\\n'));
        
        // ■ステップ6: ビットマップ作成と描画
        // 設定されたフォントサイズに基づいた正確な行高さを計算（MZの最小値制限を回避）
        var padding = Math.max(4, Math.floor(infoFontSize * 0.2));  // 行間用（フォントサイズの20%または最小4px）
        var vPadding = Math.max(4, Math.floor(infoFontSize * 0.25)); // 上下マージン（フォントサイズの25%または最小4px）
        var actualLineHeight = infoFontSize + padding;  // フォントサイズ + 行間
        var hightest = Math.floor(infoFontSize - 20)*0.8;
        // ビットマップの高さは上下マージンを加味
        var height = actualLineHeight * texts.length + vPadding * 2;
        var bitmap = new Bitmap(infoWidth, height);
        // 背景: 左半分は半透明黒、右半分はグラデーション
        bitmap.fillRect(0, 0, infoWidth / 2, bitmap.height, 'rgba(0,0,0,0.5)');
        bitmap.gradientFillRect(infoWidth / 2, 0, infoWidth / 2, bitmap.height, 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0)');
        this.window().contents = bitmap;
        this.window().contents.fontSize = infoFontSize;  // フォントサイズを明示的に設定
        this.window().drawTextEx('\\FS[' + infoFontSize + ']', 0, 0);  // フォントサイズ初期化
        for (var i = 0; i < texts.length; i++) {
            var text = '\\FS[' + infoFontSize + ']' + texts[i]
            // 上下マージン(vPadding)を先頭行のYに加算
            this.window().drawTextEx(text, 4, vPadding*0 + i * actualLineHeight + hightest);
        }
        // ■ステップ7: CommonPopupCore にポップアップ設定を渡す
        var arg = this.setPopup([]);
        arg.bitmap = bitmap;
        arg.se = se;
        arg.enableOutEffect = enableOutMove;  // 退場時移動を行うか
        
        // 演出パターンに応じた初期位置・アンカー設定
        if (infoPattern === 'GrowUp') {
            // にょき（下から伸びる、または上から伸びる）
            arg.x = 0 + infoSupX;
            arg.y = Graphics.boxHeight;
            arg.moveX = 0;
            arg.anchorX = 0;
            arg.anchorY = 1.0;  // 下端基準
            arg.pattern = -2;   // 拡大パターン
            if (infoSlideAction === 'Down') arg.anchorY = 0;  // 上から下へ
        } else if (infoPattern === 'Stretch'){
            // うにょーん（横伸び）
            arg.x = 0 + infoSupX;
            arg.y = Graphics.boxHeight - height;
            arg.moveX = 0;
            arg.anchorX = 0;
            arg.anchorY = 0;
            arg.pattern = -1;   // 横伸びパターン
        } else {
            // Normal（画面外から横スライド）
            arg.x = Graphics.boxWidth * -1 + infoSupX;  // 画面左外
            arg.y = Graphics.boxHeight - height;
            arg.moveX = Graphics.boxWidth;              // 画面内へ移動
            arg.anchorX = 0;
            arg.anchorY = 0;
        }
        
        // 表示位置がTopなら上部に調整
        if (infoPosition === 'Top') {
            arg.y = 0;
            //infoSlideAction = 'Down';
            infoSupX = tempinfoSupX -4;
            infoSupY = tempinfoSupY -4;

            if (infoPattern === 'GrowUp' && infoSlideAction !== 'Down') arg.y = height;
        } else {
            //infoSlideAction = 'Up';
            infoSupX = tempinfoSupX -4;
            infoSupY = tempinfoSupY +4;
        }
        arg.y += infoSupY;  // 補正値加算
        var messe_Window = 0;
        // 戦闘中のメッセージウィンドウと重ならないように調整
        if ($gameParty.inBattle() && (SceneManager._scene._messageWindow && SceneManager._scene._messageWindow.active)) {
            if (SceneManager._scene._messageWindow._positionType === 2) {
                var my = SceneManager._scene._messageWindow.y;
                arg.y = Math.min(arg.y, my - height + height * arg.anchorY);
            }
            messe_Window = arg.y;
        }
        // ステータスウィンドウと重ならないように調整
        if ((SceneManager._scene._statusWindow && SceneManager._scene._statusWindow.isOpen())){

                var sy = SceneManager._scene._statusWindow.y;
                arg.y = Math.min(arg.y,sy - height +  height * arg.anchorY);
            
        }
        //戦利品画面で高さメッセージの時

            if(useRewardsInfoHigh && CommonPopupManager._isRewardPhase) {

                    arg.y = messe_Window;

            }
        

        
        // 時間・フェード設定
        arg.moveY = 0;
        arg.count = infoCount;      // 表示時間
        arg.fixed = false;
        arg.extend = [infoMoveFade, infoMoveWait];  // [フェード時間, 完全表示時間]
        arg.slideCount = infoSlideCount;
        arg.delay = 0;
        arg.slideAction = infoSlideAction;
        
        // 連続表示時のディレイ計算
        if (!CommonPopupManager._tempCommonSprites) CommonPopupManager._tempCommonSprites = [];
        var array = CommonPopupManager._tempCommonSprites.compact();
        var ld = CommonPopupManager._lastIndex;
        if (ld !== undefined && ld >= 0 && array[ld]){
            // 既存ポップアップがあれば、最大ディレイ + infoDelay を設定
            array.sort(function(a,b){ return a.delay > b.delay ? -1 : 1 });
            arg.delay = array[0].delay + infoDelay;
        }
        // 戦利品表示などの特別なディレイがあれば加算
        if ($gameTemp._popupDelay && arg.delay === 0) arg.delay += $gameTemp._popupDelay;
        
        // ポップアップキューに追加
        CommonPopupManager._lastIndex = this._tempCommonSprites.setNullPos(arg);
    };

    //===========================================================================
    // BattleManager: 戦闘報酬獲得処理のフック
    //===========================================================================
    var _gInfo_BManager_gainRewards = BattleManager.gainRewards;
    BattleManager.gainRewards = function() {
        // 戦利品表示時のみポップアップを有効化し、ディレイを設定
        // 無効化スイッチがOFFかつ、戦利品表示時のみポップアップがtrueのときのみ許可

        CommonPopupManager._popEnable = !$gameSwitches.value(infoDisableSwitchId) && useRewardsInfo;

        // リザルト中（戦闘報酬獲得中）であることを示すフラグを設定
        CommonPopupManager._isRewardPhase = true;
        $gameTemp._isRewardPhase = true;

        $gameTemp._popupDelay = rewardPopupDelay;
        _gInfo_BManager_gainRewards.call(this);
        CommonPopupManager._popEnable = false;
        
        // リザルトフラグをクリア
        CommonPopupManager._isRewardPhase = false;
        $gameTemp._isRewardPhase = false;
        $gameTemp._popupDelay = 0;
    };

    //===========================================================================
    // Game_System: インフォログ管理
    // セーブデータに履歴を保存し、ログ画面から閲覧可能にします。
    //===========================================================================
    
    /**
     * インフォログにテキストを追加し、最大数を超えた分を削除します。
     * - 新しいログは配列先頭に追加（unshift）
     * @param {string} text ログ本文(改行含む)
     */
    Game_System.prototype.pushInfoLog =  function(text) {
        if (!this._infoLog) this._infoLog = [];
        this._infoLog.unshift(text);  // 先頭に追加
        if (this._infoLog.length > logMax) {
            // 最大数を超えたら古いログを削除
            for (;;) {
                if (this._infoLog.length <= logMax) break;
                this._infoLog.pop();
            }
        }
    };

    /**
     * インフォログ配列を返します。
     * @returns {string[]} ログテキストの配列（新しい順）
     */
    Game_System.prototype.infoLog = function() {
        if (!this._infoLog) this._infoLog = [];
        return this._infoLog;
    };


    //===========================================================================
    // Scene_Map: マップでのログ呼び出し処理
    // 設定されたキー入力でログ画面に遷移します。
    //===========================================================================
    var __SMap_updateScene = Scene_Map.prototype.updateScene;
    Scene_Map.prototype.updateScene = function() {
        __SMap_updateScene.call(this);
        if (!SceneManager.isSceneChanging()) {
            this.updateCallInfoLog();
        }
    };
    
    /**
     * ログ画面呼び出しの入力と移動停止を監視して実行します。
     * プレイヤーが移動中の場合は移動終了を待ちます。
     */
    Scene_Map.prototype.updateCallInfoLog = function() {
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

    /**
     * ログ呼び出しが可能か。
     * - logKey が設定されており、かつイベント実行中でない場合のみ true
     */
    Scene_Map.prototype.isInfoLogEnabled = function() {
        return logKey && !$gameMap.isEventRunning();
    };

    /**
     * 入力(設定キー/キャンセル)でログ呼び出しが行われたか。
     */
    Scene_Map.prototype.isInfoLogCalled = function() {
        return Input.isTriggered(logKey) || TouchInput.isCancelled();
    };

    /**
     * ログシーンをプッシュします。
     */
    Scene_Map.prototype.callInfoLog = function() {
        SoundManager.playOk();
        SceneManager.push(Scene_InfoLog);
        $gameTemp.clearDestination();
        this._mapNameWindow.hide();
        this._waitCount = 2;
    };

    //===========================================================================
    // Scene_InfoLog / Window_InfoLog (MZ対応版)
    // ログ閲覧用シーンと全画面ウィンドウ（Rectangle必須）
    //===========================================================================
    /**
     * インフォログ閲覧用のシーン。
     * - メニュー系の基底 `Scene_MenuBase` を継承
     * - 単一の全画面ウィンドウ `Window_InfoLog` を生成して追加する
     */
    class Scene_InfoLog extends Scene_MenuBase {
        create() {
            super.create();
            this.createInfoLogWindow();
        }

        // ログ閲覧ウィンドウを生成してシーンに追加
        createInfoLogWindow() {
            this._logWindow = new Window_InfoLog();
            this._logWindow.setHandler('cancel', this.popScene.bind(this));
            this.addWindow(this._logWindow);
        }
    }

    /**
     * インフォログの内容を一覧表示する全画面ウィンドウ。
     * - 行高さや行数はプラグイン設定（infoFontSize / logRow）に追従
     * - 上下スクロール矢印を右端寄せに配置
     * - 透明な背景の上に半透明帯を敷いて可読性を確保
     */
    class Window_InfoLog extends Window_Selectable {
        constructor() {
            const pad = 18; // standardPadding 相当（外枠に広げるための余白）
            // 画面全体を覆う矩形を生成（見た目はフチ無し全画面）
            const rect = new Rectangle(-pad, -pad, Graphics.boxWidth + pad * 2, Graphics.boxHeight + pad * 2);
            super(rect);
            this._max = $gameSystem.infoLog().length; // ログ件数をキャッシュ
            this._upArrowSprite.x = this.contentsWidth() - 16; // 矢印のX位置を右端へ
            this._upArrowSprite.y += 16;
            this._downArrowSprite.x = this.contentsWidth() - 16; // 矢印のX位置を右端へ
            this._downArrowSprite.y -= 16;
            this.backOpacity = 0; // ウィンドウ背景は透明（帯は個別描画）
            this.refresh();
            this.activate();
            // 逆順表示時は末尾から選択開始
            logReverse ? this.select(this.maxItems() - 1) : this.select(0);
        }

        standardPadding() { return 18 }

        // 1項目の表示高さ（行高さ×表示行数 + 上下マージン）
        itemHeight() { 
            // 引用コードと同じ計算方式を使用
            var padding = Math.max(4, Math.floor(infoFontSize * 0.2));  // 行間用（フォントサイズの20%または最小4px）
            var vPadding = Math.max(4, Math.floor(infoFontSize * 0.25)); // 上下マージン（フォントサイズの25%または最小4px）
            var actualLineHeight = infoFontSize + padding;  // フォントサイズ + 行間
            // ビットマップの高さは上下マージンを加味
            return actualLineHeight * logRow + vPadding * 2;
        }

        maxItems() { return this._max }

        // 設定されたフォントサイズから実用的な行高さを算出
        lineHeight() { 
            // MZの最小値制限を避けつつ、フォントに対し20%の余白を追加
            var padding = Math.max(4, Math.floor(infoFontSize * 0.2));  // フォントサイズの20%または最小4px
            return infoFontSize + padding;
        }

        itemRect(index) {
            const rect = super.itemRect(index);
            // 左右/上方向に少し内側へ寄せて帯と文字の余白を作る
            rect.y += 4;
            rect.x += 8;
            rect.width -= 16;
            return rect;
        }

        drawItem(index) {
            const rect = this.itemRect(index);
            let texts = $gameSystem.infoLog();
            if (logReverse) texts = texts.slice(0).reverse();
            const ts = texts[index].split('\\n');
            let yy = rect.y;
            //const h = rect.height;
            const h = this.itemHeight();
            let id = index + 1;
            if (logReverse) id = this.maxItems() - id + 1;

            var padding = Math.max(4, Math.floor(infoFontSize * 0.2));  // 行間用（フォントサイズの20%または最小4px）
            var vPadding = Math.max(2, Math.floor(infoFontSize * 0.25)); // 上下マージン（フォントサイズの25%または最小4px）
            var actualLineHeight = infoFontSize + padding;  // フォントサイズ + 行間（ポップアップと同じ計算）
            let hightest = Math.floor(infoFontSize - 12)*0.7;
            // 半透明の背景帯／通番／本文テキスト（複数行対応）を描画
            // 背景: 左半分は半透明黒、右半分はグラデーション（ポップアップ表示と同様）
            const bgWidth = this.contentsWidth() - 16;
            const bgX = 8;
            this.contents.fillRect(bgX, yy, bgWidth / 2, h, 'rgba(0,0,0,0.5)');
            this.contents.gradientFillRect(bgX + bgWidth / 2, yy, bgWidth / 2, h, 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0)');
            this.contents.fontSize = infoFontSize;
            this.changeTextColor(this.systemColor());
            this.drawText(('000' + id).slice(-3) + ':', 12, yy, 64);
            // 複数行テキストを順次描画（最大 logRow 行まで）
            for (let i = 0, max = ts.length; i < max; i++) {
                // 設定された最大行数を超える場合は打ち切り
                if (i >= logRow) break;
                
                // 各行のY座標を計算（行高さ × 行番号）
                yy = rect.y + i * actualLineHeight + vPadding;
                
                // テキストが1行のみかつ複数行表示可能な場合は垂直中央寄せ
                // 例: logRow=3でテキストが1行 → 真ん中の行に表示
                if (max === 1 && logRow > 1) yy += (this.lineHeight() * logRow) / 2 - (this.lineHeight() / 2);
                
                // 制御文字（アイコン・色など）を解釈しながらテキストを描画
                // X=64 は通番表示（'001:'など）の右側から開始
                this.drawTextEx('\\fs[' + infoFontSize + ']' + ts[i], 64, yy);
            }
        }

        drawScaledIcon(iconIndex, x, y, fontSize) {
            // フォントサイズに追従したアイコン描画（過度な拡縮は抑制）
            const bitmap = ImageManager.loadSystem("IconSet");
            const pw = ImageManager.iconWidth;
            const ph = ImageManager.iconHeight;
            const sx = (iconIndex % 16) * pw;
            const sy = Math.floor(iconIndex / 16) * ph;

            const defaultFontSize = 28;
            // フォントサイズに追従させつつ、極端な拡大・縮小を抑えるスケーリング
            const scale = Math.min((fontSize / defaultFontSize) * 0.9, 1.2);

            const dw = Math.floor(pw * scale);
            const dh = Math.floor(ph * scale);

            const yOffset = Math.max(0, Math.floor((fontSize - dh) / 2));
            const adjustedY = y + yOffset;

            this.contents.blt(bitmap, sx, sy, pw, ph, x, adjustedY, dw, dh);

            return dw;
        }

        processDrawIcon(iconIndex, textState) {
            // drawTextEx 処理中に呼ばれるアイコン描画フック
            if (textState.drawing) {
                const lineY = textState.y + (this.lineHeight() - this.contents.fontSize) / 2;
                const iconWidth = this.drawScaledIcon(
                    iconIndex,
                    textState.x + 2,
                    lineY,
                    this.contents.fontSize
                );
                textState.x += iconWidth + 4;
            }
        }












    }

    //===========================================================================
    // プラグインコマンド: インフォログ呼び出し
    // 「インフォログ 呼び出し」または「SceneInfoLog call」でログ画面を開きます。
    //===========================================================================
    var __GInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        __GInterpreter_pluginCommand.call(this, command, args);
        if (command === 'インフォログ' || command === 'SceneInfoLog') {
            switch (args[0]) {
                case '呼び出し':
                case 'call':
                    SceneManager.push(Scene_InfoLog);;
                    break;
            }
        }
    };

    //===========================================================================
    // メニューへのインフォログコマンド追加
    // menuInfoLogName が設定されている場合のみ追加されます。
    //===========================================================================
    var __WMCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        __WMCommand_addOriginalCommands.call(this);
        if (menuInfoLogName) this.addCommand(menuInfoLogName, 'infoLog', true);
    };

    var __SMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        __SMenu_createCommandWindow.call(this);
        this._commandWindow.setHandler('infoLog',   this.commandInfoLog.bind(this));
    };

    Scene_Menu.prototype.commandInfoLog = function() {
        SceneManager.push(Scene_InfoLog);
    };

    //===========================================================================
})();
