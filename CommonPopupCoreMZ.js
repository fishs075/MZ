//
//  汎用ポップアップコア ver1.10
//  RPGツクールMV/MZ対応の汎用的なポップアップシステムを提供するベースプラグイン
//
// ------------------------------------------------------
// Copyright (c) 2025 さかなのまえあし
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author さかなのまえあし
//

// プラグインの読み込み状況を管理するグローバル変数
var Imported = Imported || {};
Imported['CommonPopupCoreMZ'] = 1.10; // このプラグインのバージョン情報を記録

/*:ja
 * @target MZ
 * @plugindesc [v1.10] 汎用ポップアップコア
 * @author さかなのまえあし
 * @version 1.10
 *
 * 
 * 
 * 
 * @param textBackColor
 * @text 背景カラー
 * @desc ポップアップの背景カラーです。
 * @type struct<BackgroundColor>
 * @default {"red":"0","green":"0","blue":"0","alpha":"0.6"}
 * 
 * @param textBackFileName
 * @text 背景画像ファイル名
 * @desc ポップアップの背景画像名です。
 * %dがインデックスに変換されます。
 * @default popup_back%d
 * 
 * @command showPopup
 * @text ポップアップ表示
 * @desc ポップアップを表示します。
 * 
 * @arg text
 * @text 表示テキスト
 * @desc 表示するテキストを入力してください。
 * @type string
 * @default 
 * 
 * @arg eventId
 * @text イベントID
 * @desc 表示位置の基準となるイベントID（-1でプレイヤー）
 * @type number
 * @min -1
 * @default -1
 * 
 * @arg count
 * @text 表示時間
 * @desc 表示時間（フレーム数）
 * @type number
 * @min 1
 * @default 60
 * 
 * @arg delay
 * @text 表示遅延
 * @desc 表示開始までの遅延時間（フレーム数）
 * @type number
 * @min 0
 * @default 0
 * 
 * @arg moveX
 * @text 移動X
 * @desc X方向の移動量
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @arg moveY
 * @text 移動Y
 * @desc Y方向の移動量
 * @type number
 * @min -9999
 * @max 9999
 * @default -48
 * 
 * @arg sx
 * @text 位置補正X
 * @desc X座標の補正値
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @arg sy
 * @text 位置補正Y
 * @desc Y座標の補正値
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @arg pattern
 * @text 表示パターン
 * @desc 表示パターン（0:フェード、-1:横ストレッチ、-2:縦ストレッチ）
 * @type select
 * @option フェード
 * @value 0
 * @option 横ストレッチ
 * @value -1
 * @option 縦ストレッチ
 * @value -2
 * @default 0
 * 
 * @arg back
 * @text 背景
 * @desc 背景設定（-1:透明、0:グラデーション、1以上:画像インデックス）
 * @type number
 * @min -1
 * @default -1
 * 
 * @command clearPopup
 * @text ポップアップ消去
 * @desc 表示中の全ポップアップを消去します。
 * 
 * 
 * 
 * @help CommonPopupCoreMZ.js
 * 
 * このプラグインはYana様作のプラグインをMZに移植したものです
 * 汎用的なポップアップの仕組みを提供するためのベースプラグインです。
 * 
 * 
 * ■ プラグインコマンド（MZ）
 * ポップアップ表示
 * 
 * ■ 使用例
 * プレイヤーの上にテストと240フレームポップアップさせる
 * CommonPopup add text:テスト count:240 eventId:-1
 * 
 * ■ パラメータ詳細
 * text:表示テキスト
 * eventId:表示するイベントのID
 * count:表示時間
 * delay:表示遅延
 * moveX:目標地点X(相対座標)
 * moveY:目標地点Y(相対座標)
 * sx:表示位置補正X
 * sy:表示位置補正Y
 * pattern:表示パターン　0がフェード、-1が横ストレッチ、-2が縦ストレッチ
 * back:-1:透明背景,0:背景カラーで塗りつぶし,1以上:画像インデックス
 * bx:内容の表示位置補正X
 * by:内容の表示位置補正Y
 * extend:表示タイミングの調整用配列で指定。 例:extend:[20,50] 20フレーム掛けて出現し、50フレーム目から消え始める。
 * fixed:画面に固定するか？ true/falseで指定。
 * anchorX:アンカーポイントX
 * anchorY:アンカーポイントY
 * slideCount:新しいポップアップが発生した際、上にスライドさせる速度。
 *
 * ■ スクリプトでの使用方法
 * イベントコマンドのスクリプトを使う場合：
 * this.addPopup(["add","text:テスト","count:120"…]);
 *
 * 移動ルート内のスクリプトで使用する場合：
 * $gameMap._interpreter.addPopup(["add","text:テスト","count:120"…]);
 * 
 * 
 * 
 * 
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
 * このプラグインは、汎用的なポップアップの仕組みを提供するプラグインです。
 * このプラグイン単体ではプラグインコマンドを追加する以外の機能はありません。
 * 追加機能として、
 * ・\I[x]で描画されるアイコンのサイズが文字サイズに追従する。
 * ・文字サイズ変更の制御文字、\FS[x]が追加される。
 * の2点が追加されます。
 * ------------------------------------------------------
 * 更新履歴:
 * for さかなのまえあし
 * ver1.10:20251007
 * RPGツクールMZ用に再移植。元の機能の再現にのみ注力
 * 
 * for Yana
 * ver1.06:180513
 * 一部の処理が正常に動作していなかったバグを修正。
 * 
 * （略）
 * 
 * ver1.00:
 * 公開
 */
/*~struct~BackgroundColor:
 * @param red
 * @text 赤 (R)
 * @desc 赤の値 (0-255)
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param green
 * @text 緑 (G)
 * @desc 緑の値 (0-255)
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param blue
 * @text 青 (B)
 * @desc 青の値 (0-255)
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param alpha
 * @text 不透明度 (Alpha)
 * @desc 不透明度 (0.0-1.0)
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0.6
 */






// ポップアップ表示用のスプライトクラス
// 個々のポップアップの表示、アニメーション、位置制御を担当
function Sprite_Popup() {
    this.initialize.apply(this, arguments);
};

// ポップアップシステム全体を管理する静的クラス
// ポップアップの生成、管理、削除を一元的に制御
function CommonPopupManager() {
    throw new Error('This is a static class'); // インスタンス化を禁止
};
    
// 即座実行関数でプラグインのメイン処理をカプセル化
(function(){
    'use strict';
    
    // ツクールのバージョン判定
    const isMZ = Utils && Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.0.0";
    const isMV = !isMZ;
    
    // プラグインパラメータの取得と初期化（MV/MZ対応）
    var parameters = PluginManager.parameters('CommonPopupCore');
    
    // 背景色パラメータの取得と処理
    var commonPopupTextBackColor;
    if (isMZ) {
        // MZ: 構造体形式で取得
        var backColorParam = parameters['textBackColor'];
        if (backColorParam) {
            try {
                var colorObj = JSON.parse(backColorParam);
                var r = Number(colorObj.red || 0);
                var g = Number(colorObj.green || 0);
                var b = Number(colorObj.blue || 0);
                var a = Number(colorObj.alpha || 0.6);
                commonPopupTextBackColor = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
            } catch (e) {
                // パース失敗時はデフォルト値
                commonPopupTextBackColor = 'rgba(0,0,0,0.6)';
            }
        } else {
            commonPopupTextBackColor = 'rgba(0,0,0,0.6)';
        }
    } else {
        // MV: カンマ区切り文字列またはrgba形式で取得
        var backColorParam = String(parameters['Text Back Color'] || '0,0,0,0.6');
        commonPopupTextBackColor = backColorParam.startsWith('rgba(') ? backColorParam : 'rgba(' + backColorParam + ')';
    }
    
    var commonPopupTextBackFileName = String(parameters['textBackFileName'] || parameters['Text Back FileName'] || 'popup_back%d'); // 背景画像ファイル名パターン
    
    // プラグインコマンド処理（MV/MZ対応）
    if (isMV) {
        // MV用のプラグインコマンド処理
        var _cPU_GInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function(command, args) {
            _cPU_GInterpreter_pluginCommand.call(this, command, args);
            if (command === 'CommonPopup' || command === 'ポップアップ') {
                switch (args[0]) {
                    case 'add':
                    case '表示':
                        this.addPopup(args);
                        break;
                    case 'clear':
                    case '消去':
                        CommonPopupManager.clearPopup();
                        break;
                }
            }
        };
    } else {
        // MZ用のプラグインコマンド処理
        PluginManager.registerCommand('CommonPopupCore', 'showPopup', args => {
            const interpreter = $gameMap._interpreter;
            const params = ['add'];
            if (args.text) params.push('text:' + args.text);
            if (args.eventId) params.push('eventId:' + args.eventId);
            if (args.count) params.push('count:' + args.count);
            if (args.delay) params.push('delay:' + args.delay);
            if (args.moveX) params.push('moveX:' + args.moveX);
            if (args.moveY) params.push('moveY:' + args.moveY);
            if (args.sx) params.push('sx:' + args.sx);
            if (args.sy) params.push('sy:' + args.sy);
            if (args.pattern) params.push('pattern:' + args.pattern);
            if (args.back) params.push('back:' + args.back);
            interpreter.addPopup(params);
        });
        
        PluginManager.registerCommand('CommonPopupCore', 'clearPopup', args => {
            CommonPopupManager.clearPopup();
        });
    }
    
    // Arrayプロトタイプの拡張：空いている位置にオブジェクトを挿入
    Array.prototype.setNullPos = function(object){
        // 配列内のnullまたはundefinedの位置を探す
        for(var i=0; i < this.length; i++){
            if (this[i] === null || this[i] === undefined){
                this[i] = object;
                return i; // 挿入した位置のインデックスを返す
            }
        }
        // 空きがない場合は末尾に追加
        this.push(object);
    };
    
    // Arrayプロトタイプの拡張：nullとundefinedを除去した新しい配列を返す
    Array.prototype.compact = function() {
        var result = [];
        for (var i = 0; i < this.length; i++) {
            if (this[i] !== null && this[i] !== undefined) {
                result.push(this[i]);
            }
        }
        return result;
    };
    
    // CommonPopupManagerの初期化メソッド
    // ポップアップ管理用の配列を初期化
    CommonPopupManager.initTempSprites = function(){
        this._tempCommonSprites = new Array(50); // 最大50個のポップアップを管理
        this._setedPopups = []; // スライド処理用のポップアップ情報
        this._readyPopup = []; // 画像読み込み待ちのポップアップ
    };
    
    // テキスト描画用のウィンドウオブジェクトを取得（シングルトン）
    // MZではWindow_BaseのコンストラクタがRectangle必須のため、専用のWindow_CommonPopupを使用
    // （メッセージウィンドウの仕様差異に引きずられない独立した描画用ウィンドウ）
    CommonPopupManager.window = function(){
        if (this._window){return this._window } // 既に作成済みなら再利用
        

            // MZでは専用のWindow_CommonPopupクラスを使用
            this._window = new Window_CommonPopup(new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight));

        
        return this._window;
    };
    



    // 画像読み込み確認用のテストビットマップを取得（シングルトン）
    CommonPopupManager.testBitmap = function(){
        if (this._testBitmap){return this._testBitmap } // 既に作成済みなら再利用
        this._testBitmap = new Bitmap(1,1); // 1x1の小さなビットマップ
        return this._testBitmap;
    };
    
    // Sprite_PopupクラスのプロトタイプチェーンをSpriteから継承
    Sprite_Popup.prototype = Object.create(Sprite.prototype);
    Sprite_Popup.prototype.constructor = Sprite_Popup;
        
    // Sprite_Popupの初期化メソッド
    Sprite_Popup.prototype.initialize = function(index){
        Sprite.prototype.initialize.call(this); // 親クラスの初期化を呼び出し
        this._index = index; // 管理配列内でのインデックス
        this._count = 0; // 表示残り時間（フレーム数）
        this._enable = false; // ポップアップが有効かどうか
        this.update(); // 初回更新処理
    };
    
    // ポップアップの設定値を適用し、表示を開始するメソッド
    Sprite_Popup.prototype.setMembers = function(arg){
        this._count = arg.count; // 表示時間を設定
        this._arg = arg; // 全設定パラメータを保存
        this.anchor.x = arg.anchorX; // アンカーポイントX（0.0-1.0）
        this.anchor.y = arg.anchorY; // アンカーポイントY（0.0-1.0）
        this.x = arg.x; // 初期X座標
        this.y = arg.y; // 初期Y座標
        this.z = 6; // 表示優先度（高い値ほど手前に表示）
        this.visible = true; // 表示状態にする
        this._enable = true; // ポップアップを有効化
        this.createBitmap(); // ビットマップ（画像）を生成
        // スライド機能が有効な場合、管理配列に追加
        if (arg.slideCount){
            CommonPopupManager._setedPopups.push([this._index, this.height, this._arg.slideCount]);
        }
    };
    
    // ポップアップ用のビットマップ（画像）を生成するメソッド
    Sprite_Popup.prototype.createBitmap = function(){
        if (this._arg.bitmap){
            // 既存のビットマップが指定されている場合はそれを使用
            this.bitmap = this._arg.bitmap;
        }else{
            // テキストからビットマップを生成する場合
            CommonPopupManager.window().resetFontSettings(); // フォント設定をリセット
            var text = this._arg.text; // 表示するテキスト
            
            // MV/MZ対応のテキストサイズ計算
            var width, height;
            if (isMZ) {
                // MZではtextSizeExを使用
                var size = CommonPopupManager.window().textSizeEx(text);
                width = size.width;
                height = size.height;
            } else {
                // MVでは従来のtextWidthを使用
                width = CommonPopupManager.window().textWidth(text);
                height = CommonPopupManager.window().contents.fontSize + 8;
            }
            
            var sh = 8; // 背景の高さ調整値
            if (this._arg.back === 0){ sh = 2 } // 背景タイプが0の場合は調整値を変更
            CommonPopupManager.window().createContents(); // ウィンドウの内容を作成
            this.bitmap = new Bitmap(width+24,height+sh); // ビットマップを作成（余白込み）
            this.drawBackRect(width+24,height+sh); // 背景を描画
            CommonPopupManager.window().drawTextEx(this._arg.text,12,4); // テキストを描画
            // ウィンドウの内容をビットマップに転送
            this.bitmap.blt(CommonPopupManager.window().contents,0,0,width+24,height+sh,this._arg.bx,this._arg.by+2);
        }
    };
    
    // ポップアップの背景を描画するメソッド
    Sprite_Popup.prototype.drawBackRect = function(width,height){
        // MZではプラグインコマンドから文字列で渡されるため、数値に変換
        var backValue = (typeof this._arg.back === 'string' && !isNaN(Number(this._arg.back))) 
            ? Number(this._arg.back) 
            : this._arg.back;
        
        switch (backValue){
            case 0:
                // グラデーション背景を描画
                var color1 = commonPopupTextBackColor; // 中央の色
                var color2 = 'rgba(0,0,0,0)'; // 透明色
                var dSize = width / 4; // 4分割したサイズ
                // 左端：透明→中央色のグラデーション
                this.bitmap.gradientFillRect(0,0,dSize,height,color2,color1);
                // 中央：単色で塗りつぶし
                this.bitmap.fillRect(dSize,0,dSize*2,height,color1);
                // 右端：中央色→透明のグラデーション
                this.bitmap.gradientFillRect(dSize*3,0,dSize,height,color1,color2);
                break;
            case -1:
                // 透明背景（何も描画しない）
                break;
            default:
                // 画像ファイルを背景として使用
                var bitmap = CommonPopupManager.makeBitmap(this._arg);
                var w = this._bitmap.width;
                var h = this._bitmap.height;
                // 文字列指定の場合はサイズを調整
                if (typeof this._arg.back === 'string') {
                    w = bitmap.width > this._bitmap.width ? bitmap.width : w;
                    h = bitmap.height > this._bitmap.height ? bitmap.height : h;
                    if (w > this._bitmap.width || h > this._bitmap.height){
                        this.bitmap = new Bitmap(w,h); // サイズを拡張
                    }
                }
                // 背景画像をビットマップに転送
                this.bitmap.blt(bitmap,0,0,bitmap.width,bitmap.height,0,0,w,h);
                bitmap.clear(); // メモリ解放
                bitmap = null;
        }
    };
    
    // ポップアップの毎フレーム更新処理
    Sprite_Popup.prototype.update = function(){
        Sprite.prototype.update.call(this); // 親クラスの更新処理
        
        // ポップアップが未有効で、管理配列にデータがある場合
        if (CommonPopupManager._tempCommonSprites[this._index] && !this._enable){
            if (CommonPopupManager._tempCommonSprites[this._index].delay === 0){
                // 遅延時間が0になったら表示開始
                this.setMembers(CommonPopupManager._tempCommonSprites[this._index]);
                // SEが設定されている場合は再生
                if (this._arg && this._arg.se.name) AudioManager.playSe(this._arg.se);
            }else{
                // 遅延時間をカウントダウン
                CommonPopupManager._tempCommonSprites[this._index].delay--;
            }
        }
        
        // 表示時間が残っている場合の処理
        if (this._count > 0){
            this._count--; // 残り時間を減らす
            if (!this._arg){
                this.terminate(); // 設定がない場合は終了
                return;
            }
            
            // 表示パターンに応じた更新処理を実行
            switch(this._arg.pattern){
                case 0:
                case '0':
                case 'Normal':
                    this.updateSlide(); // 通常のスライドアニメーション
                    break;
                case -1:
                case '-1':
                case 'Stretch':
                    this.updateTurn(); // 横ストレッチアニメーション
                    break;
                case -2:
                case '-2':
                case 'GrowUp':
                    this.updateGrowUp(); // 縦ストレッチアニメーション
                    break;
                default:
                    this.updateAnime(); // カスタムアニメーション
            }
            
            // 表示時間が終了したら終了処理
            if (this._count === 0) this.terminate();
        }
        
        // スライド機能が有効な場合の位置更新
        if (this._arg && this._arg.slideCount) this.updateMoveSlide();
    };
    
    // 複数のポップアップが表示された際のスライド処理
    // 新しいポップアップが出現すると、既存のポップアップが上（または下）にスライドする
    Sprite_Popup.prototype.updateMoveSlide = function(){
        if (CommonPopupManager._setedPopups) {
            var array = CommonPopupManager._setedPopups.clone().reverse(); // 配列を逆順にコピー
            var n = 0; // 累積移動量
            
            // 各ポップアップの移動量を計算
            for (var i = 0; i < array.length; i++) {
                if (this._index === array[i][0]) {
                    // 自分のポップアップの場合、移動量を適用
                    if (this._arg.slideAction === 'Down'){
                        this.y = this.y + n; // 下方向にスライド
                    } else {
                        this.y = this.y - n; // 上方向にスライド（デフォルト）
                    }
                }
                
                // 次のポップアップの移動量を計算
                var sprite = CommonPopupManager._tempCommonSprites[array[i][0]];
                if (sprite.pattern === -2 || sprite.pattern === 'GrowUp'){
                    // 縦ストレッチの場合はスケール率を考慮
                    n += (array[i][1] * sprite.rate);
                } else {
                    // 通常の場合はスライド進行度を考慮
                    n += (array[i][1] * ((this._arg.slideCount - array[i][2]) / this._arg.slideCount));
                }
            }
            
            // スライドカウンターを減らす
            for (var i = 0; i < CommonPopupManager._setedPopups.length; i++) {
                CommonPopupManager._setedPopups[i][2]--;
                if (CommonPopupManager._setedPopups[i][2] < 0) {
                    CommonPopupManager._setedPopups[i][2] = 0
                }
            }
            array = null; // メモリ解放
        }
    };
    
    // 通常のスライドアニメーション更新処理（フェードイン・アウト付き）
    Sprite_Popup.prototype.updateSlide = function(){
        var originalWait = this._arg.count; // 総表示時間
        var cnt = originalWait - this._count; // 経過時間
        this.opacity = 255; // 基本不透明度
        
        // アニメーション区間の設定（デフォルト：25%で登場、75%で退場開始）
        var act = [originalWait * 0.25, originalWait * 0.75];
        if (this._arg.extend !== ''){ act = this._arg.extend } // カスタム設定があれば使用
        
        var opTime1 = act[0]; // フェードイン時間
        var moveX = 0; // X方向移動量
        var moveY = 0; // Y方向移動量
        if (act[2]){ opTime1 = originalWait - act[2] } // 拡張設定
        var opTime2 = originalWait - act[1]; // フェードアウト時間
        if (act[3]){ opTime2 = act[3] } // 拡張設定
        
        // 登場演出フェーズ
        if (cnt < act[0]){
            var up = (this._arg.moveY / act[0]); // Y方向の移動速度
            var slide = (this._arg.moveX / act[0]); // X方向の移動速度
            this.opacity = Math.floor(255 * (cnt / opTime1)); // フェードイン
            moveX = Math.floor(slide * cnt); // X座標計算
            moveY = Math.floor(up * cnt); // Y座標計算
        // 退場演出フェーズ
        }else if (cnt >= act[1]){
            var up = (this._arg.moveY / (originalWait - act[1]));
            var slide = (this._arg.moveX / (originalWait - act[1]));
            this.opacity = Math.floor(255 * (this._count / opTime2)); // フェードアウト
            if (this._arg.enableOutEffect) {
                // 退場エフェクトが有効な場合は移動も逆算
                moveX = Math.floor(this._arg.moveX * (this._count / opTime2));
                moveY = Math.floor(this._arg.moveY * (this._count / opTime2));
            } else {
                // 無効な場合は最終位置で固定
                moveX = this._arg.moveX;
                moveY = this._arg.moveY;
            }
        // 表示維持フェーズ
        }else{
            moveX = this._arg.moveX; // 最終位置
            moveY = this._arg.moveY;
        }
        this._times = cnt; // 経過時間を記録
        this.setPosition(moveX,moveY); // 位置を設定
    };

    // 横ストレッチアニメーション更新処理
    // ポップアップが横方向に伸縮しながら表示される
    Sprite_Popup.prototype.updateTurn = function() {
        var originalWait = this._arg.count; // 総表示時間
        var cnt = originalWait - this._count; // 経過時間
        var act = [originalWait * 0.25, originalWait * 0.75]; // アニメーション区間
        if (this._arg.extend) act = this._arg.extend; // カスタム設定
        if (this._count === 0) this.scale.x = 0; // 終了時は横幅0
        
        var moveX = 0; // X方向移動量
        var moveY = 0; // Y方向移動量
        
        // 登場フェーズ：横幅が0から1に拡大
        if (cnt < act[0]){
            var up = (this._arg.moveY / act[0]);
            var slide = (this._arg.moveX / act[0]);
            var rate = cnt / act[0]; // 拡大率（0.0～1.0）
            this.scale.x = rate; // 横スケールを設定
            moveX = Math.floor(slide * cnt);
            moveY = Math.floor(up * cnt);
        // 退場フェーズ：横幅が1から0に縮小
        } else if (cnt > act[1]) {
            var a1 = originalWait - act[1];
            var rate = this._count / a1; // 縮小率（1.0～0.0）
            this.scale.x = rate; // 横スケールを設定
            if (this._arg.enableOutEffect) {
                // 退場エフェクトが有効な場合は位置も変化
                moveX = Math.floor(this._arg.moveX * (this._count / a1));
                moveY = Math.floor(this._arg.moveY * (this._count / a1));
            } else {
                // 無効な場合は最終位置で固定
                moveX = this._arg.moveX;
                moveY = this._arg.moveY;
            }
        // 表示維持フェーズ：通常サイズで表示
        } else {
            this.scale.x = 1.0; // 通常サイズ
            moveX = this._arg.moveX;
            moveY = this._arg.moveY;
        }
        this._times = cnt; // 経過時間を記録
        this.setPosition(moveX,moveY); // 位置を設定
    };

    // 縦ストレッチアニメーション更新処理
    // ポップアップが縦方向に伸縮しながら表示される
    Sprite_Popup.prototype.updateGrowUp = function() {
        var originalWait = this._arg.count; // 総表示時間
        var cnt = originalWait - this._count; // 経過時間
        var act = [originalWait * 0.25, originalWait * 0.75]; // アニメーション区間
        if (this._arg.extend) act = this._arg.extend; // カスタム設定
        if (this._count === 0) this.scale.y = 0; // 終了時は縦幅0
        
        var moveX = 0; // X方向移動量
        var moveY = 0; // Y方向移動量
        
        // 登場フェーズ：縦幅が0から1に拡大
        if (cnt < act[0]){
            var up = (this._arg.moveY / act[0]);
            var slide = (this._arg.moveX / act[0]);
            var rate = cnt / act[0]; // 拡大率（0.0～1.0）
            this.scale.y = rate; // 縦スケールを設定
            moveX = Math.floor(slide * cnt);
            moveY = Math.floor(up * cnt);
            this._arg.rate = rate; // スライド処理用にレートを保存
        // 退場フェーズ：縦幅が1から0に縮小
        } else if (cnt >= act[1]) {
            var a1 = originalWait - act[1];
            var rate = this._count / a1; // 縮小率（1.0～0.0）
            this.scale.y = rate; // 縦スケールを設定
            this._arg.rate = rate; // スライド処理用にレートを保存
            if (this._arg.enableOutEffect) {
                // 退場エフェクトが有効な場合は位置も変化
                moveX = Math.floor(this._arg.moveX * (this._count / a1));
                moveY = Math.floor(this._arg.moveY * (this._count / a1));
            } else {
                // 無効な場合は最終位置で固定
                moveX = this._arg.moveX;
                moveY = this._arg.moveY;
            }
        // 表示維持フェーズ：通常サイズで表示
        } else {
            this.scale.y = 1.0; // 通常サイズ
            this._arg.rate = 1.0;
            moveX = this._arg.moveX;
            moveY = this._arg.moveY;
        }
        this._times = cnt; // 経過時間を記録
        this.setPosition(moveX,moveY); // 位置を設定
    };

    // ポップアップの位置を設定するメソッド
    // 基本座標、移動量、補正値、バトラー追従、画面固定などを考慮
    Sprite_Popup.prototype.setPosition = function(x,y) {
        // 基本位置 + 移動量 + 補正値
        this.x = this._arg.x + x + this._arg.sx;
        this.y = this._arg.y + y + this._arg.sy;
        
        // バトラー（キャラクター）に追従する場合
        if (this._arg.battler){
            if ($gameParty.inBattle()) {
                // 戦闘中：バトラーの画面座標を加算
                this.x += this._arg.battler.x;
                this.y += this._arg.battler.y;
            } else {
                // マップ中：バトラーのマップ座標をピクセル座標に変換して加算
                this.x += this._arg.battler._realX * $gameMap.tileWidth();
                this.y += this._arg.battler._realY * $gameMap.tileHeight();
            }
        }
        
        var xx = this.x;
        var yy = this.y;
        
        // 画面に固定する場合（スクロールに追従しない）
        if (this._arg.fixed){
            var dx = $gameMap._displayX; // マップの表示X座標
            var dy = $gameMap._displayY; // マップの表示Y座標
            // スクロール分を差し引いて画面固定座標に変換
            xx = this.x - dx * $gameMap.tileWidth();
            yy = this.y - dy * $gameMap.tileHeight();
            
            // ループマップでの座標補正
            if (xx < 0 || yy < 0){
                if (xx < 0 && $gameMap.isLoopHorizontal()) dx -= $dataMap.width;
                if (yy < 0 && $gameMap.isLoopVertical()) dy -= $dataMap.height;
                xx = this.x - dx * $gameMap.tileWidth();
                yy = this.y - dy * $gameMap.tileHeight();
            }
        }
        
        // 最終座標を設定
        this.x = xx;
        this.y = yy;
    };

    // カスタムアニメーション更新処理
    // データベースのアニメーションデータを使用してポップアップをアニメーション
    Sprite_Popup.prototype.updateAnime = function(){
        var anime = $dataAnimations[Number(this._arg.pattern)]; // アニメーションデータを取得
        // 現在のフレーム番号を計算（進行度に応じて）
        var frameId = Math.floor((anime.frames.length * (this._arg.count - this._count)) / this._arg.count);
        
        // フレームが有効範囲内の場合
        if (frameId !== anime.frames.length ){
            var array = anime.frames[frameId][0]; // フレームデータを取得
            var x = array[1]; // X座標
            var y = array[2]; // Y座標
            // アニメーションの座標を基本座標に加算
            this.x = this._arg.x + x + this._arg.sx;
            this.y = this._arg.y + y + this._arg.sy;
            // アニメーションの各種プロパティを適用
            this.scale = new Point(array[3]/100,array[3]/100); // スケール（%を小数に変換）
            this.rotation = array[4]; // 回転角度
            this.opacity = array[6]; // 不透明度
            this.blendMode = array[7]; // ブレンドモード
        }       
    };
    
    // ポップアップの終了処理
    // リソースの解放と管理配列からの削除を行う
    Sprite_Popup.prototype.terminate = function(){
        this.bitmap = null; // ビットマップを解放
        this.visible = false; // 非表示にする
        this._enable = false; // 無効化
        this._count = 0; // カウンターをリセット
        this._arg = null; // 設定データを解放

        // 管理配列内のデータに終了フラグを設定
        if (CommonPopupManager._tempCommonSprites[this._index]) {
            CommonPopupManager._tempCommonSprites[this._index].terminate = true;
        }
        
        // スライド管理配列から自分のエントリを削除
        if (CommonPopupManager._setedPopups) {
            for (var i = 0; i < CommonPopupManager._setedPopups.length; i++) {
                if (CommonPopupManager._setedPopups[i][0] === this._index) {
                    delete CommonPopupManager._setedPopups[i]; // エントリを削除
                }
            }
            // 配列を圧縮（null要素を除去）
            CommonPopupManager._setedPopups = CommonPopupManager._setedPopups.compact();
        }
    };
    
    // Game_Interpreterにポップアップ追加メソッドを追加
    // プラグインコマンドやスクリプトから呼び出される
    Game_Interpreter.prototype.addPopup = function(argParam){
        var eventId = 0; // デフォルトはプレイヤー
        
        // パラメータからeventIdを抽出
        for (var i=0;i<argParam.length;i++){
            if (argParam[i].match(/^eventId:(.+)/g)){
                eventId = Number(RegExp.$1); // マッチした数値を取得
                break;
            }
        }
        
        var character = this.character(eventId); // キャラクターオブジェクトを取得
        var arg = CommonPopupManager.setPopup(argParam,character); // ポップアップ設定を作成
        
        // 背景画像が必要な場合は画像読み込み待ちキューに追加
        if (arg.back > 0 || typeof arg.back === 'string'){
            CommonPopupManager.bltCheck(CommonPopupManager.makeBitmap(arg)); // 画像読み込み確認
            CommonPopupManager._readyPopup.push(arg); // 待機キューに追加
        }else{
            // 背景画像が不要な場合は直接管理配列に追加
            CommonPopupManager._tempCommonSprites.setNullPos(arg);
        }
    };
    
    // ポップアップの設定オブジェクトを作成するメソッド
    // パラメータ文字列を解析してポップアップの各種設定を決定
    CommonPopupManager.setPopup = function(argParam,character){
        // デフォルト設定値
        var arg = {
            x:null,                 // X座標（nullの場合はキャラクター座標を使用）
            y:null,                 // Y座標（nullの場合はキャラクター座標を使用）
            text:'',                // 表示テキスト
            eventId:-1,             // 表示するイベントのID（-1はプレイヤー）
            count:60,               // 表示時間（フレーム数）
            delay:0,                // 表示遅延（フレーム数）
            moveX:0,                // 目標地点X（相対座標）
            moveY:-48,              // 目標地点Y（相対座標、デフォルトは上方向）
            sx:0,                   // 表示位置補正X
            sy:0,                   // 表示位置補正Y
            pattern:0,              // 表示パターン（0:通常、-1:横ストレッチ、-2:縦ストレッチ）
            back:-1,                // 背景（-1:透明、0:グラデーション、1以上:画像インデックス）
            bx:0,                   // 内容の表示位置補正X
            by:0,                   // 内容の表示位置補正Y
            extend:'',              // 表示タイミング調整用配列
            fixed:true,             // 画面固定フラグ
            anchorX:0.5,            // アンカーポイントX（0.0-1.0）
            anchorY:0.5,            // アンカーポイントY（0.0-1.0）
            battler:null,           // 追従するバトラーオブジェクト
            se:{name:'',volume:90,pitch:100,pan:0}, // 表示時SE設定
            enableOutEffect:true    // 退場エフェクト有効フラグ
        };
        // 解析対象のパラメータ名一覧
        var array = ['x','y','text','eventId','count','delay','moveX','moveY',
                     'sx','sy','pattern','back','bx','by','extend','fixed',
                     'anchorX','anchorY', 'slideCount'];
        
        // パラメータ文字列を解析してargオブジェクトに設定
        for (var i=0;i < argParam.length;i++){
            if (i > 0){ // 最初の要素（'add'など）はスキップ
                for (var j=0;j < array.length;j++){
                    // "パラメータ名:値" の形式をチェック
                    var r = new RegExp('^(' + array[j] + ')' + ':(.+)');
                    if (argParam[i].match(r)){
                        var code = RegExp.$1; // パラメータ名
                        var value = RegExp.$2; // 値
                        
                        // パラメータの型に応じて変換
                        if (code === 'text' || code === 'extend'){
                            arg[code] = value; // 文字列のまま
                        }else if (code === 'fixed'){
                            arg[code] = value === 'true'; // boolean変換
                        }else if (code === 'back'){
                            // 数値または文字列（画像ファイル名）
                            arg[code] = (Number(value) !== NaN) ? value : Number(value);
                        } else {
                            arg[code] = Number(value); // 数値変換
                        }
                    }
                }
            }
        }
        // X座標が未指定の場合、キャラクター座標を使用
        if (arg.x === null){
            if (character){
                var screenX = $gameParty.inBattle() ? 0 : character.screenX(); // キャラクターの画面X座標
                var displayX = $gameParty.inBattle() ? 0 : $gameMap._displayX * 48; // マップスクロール分
                arg.x = screenX + displayX; // 実際の座標を計算
            } else {
                arg.x = 0; // キャラクターがない場合は原点
            }
        }
        
        // Y座標が未指定の場合、キャラクター座標を使用
        if (arg.y === null) {
            if (character) {
                var screenY = $gameParty.inBattle() ? 0 : character.screenY(); // キャラクターの画面Y座標
                var displayY = $gameParty.inBattle() ? 0 : $gameMap._displayY * 48; // マップスクロール分
                arg.y = screenY + displayY; // 実際の座標を計算
            } else {
                arg.y = 0; // キャラクターがない場合は原点
            }
        }
        
        // extend（表示タイミング調整）が文字列の場合は配列に変換
        if (arg.extend) {
            arg.extend = eval(arg.extend); // 文字列を配列として評価
        }
        
        arg.terminate = false; // 終了フラグを初期化
        return arg; // 設定オブジェクトを返す
    };
    
    CommonPopupManager.setPopUpdate = function(){
        if (this._readyPopup){
            for (var i=0;i<this._readyPopup.length;i++){
                if (this._readyPopup[i]){
                    var arg = this._readyPopup[i];
                    if(ImageManager.isReady()){
                        this.startPopup(arg);
                        delete this._readyPopup[i];
                        this._readyPopup.compact();
                        return;
                    }else{
                        this.bltCheck(this.makeBitmap(arg));
                    }
                }
            }
        }
    };
    
    CommonPopupManager.makeBitmap = function(arg){
        // back が -1（透明背景）や 0（グラデーション背景）の場合は画像読み込み不要
        // MZのプラグインコマンド引数は文字列になるため、数値文字列の判定も行う
        var backValue = arg.back;
        
        // 数値または数値文字列の場合
        if (typeof backValue === 'number' || !isNaN(Number(backValue))) {
            var numValue = Number(backValue);
            if (numValue <= 0) {
                // -1（透明背景）や0（グラデーション背景）の場合は空のビットマップを返す
                return new Bitmap(1, 1);
            } else {
                // 1以上の場合は画像インデックスとして処理
                var fileName = commonPopupTextBackFileName;
                fileName = fileName.replace(/%d/g, numValue);
                return ImageManager.loadSystem(fileName);
            }
        } else {
            // 文字列の場合はpicturesフォルダから読み込み
            var fileName = backValue;
            return ImageManager.loadPicture(fileName);
        }
    };
    
    CommonPopupManager.bltCheck = function(bitmap){
        this.testBitmap().blt(bitmap,0,0,bitmap.width,bitmap.height,0,0);
        //this.testBitmap().clear();
        //bitmap.clear();
        bitmap = null;
    };
    
    CommonPopupManager.startPopup = function(arg){
        CommonPopupManager._tempCommonSprites.setNullPos(arg);
    };

    CommonPopupManager.clearPopup = function(tag) {
        if (!CommonPopupManager._tempCommonSprites){
            CommonPopupManager.initTempSprites();
        }

        for(var i=0;i<CommonPopupManager._tempCommonSprites.length;i++){
            if (CommonPopupManager._tempCommonSprites[i]){
                if (!tag || tag === CommonPopupManager._tempCommonSprites[i].tag) {
                    CommonPopupManager._tempCommonSprites[i].delay = 0;
                    CommonPopupManager._tempCommonSprites[i].count = 1;
                    var sprite = CommonPopupManager._tempCommonSprites[i].sprite;
                    if (sprite) sprite._count = 1;
                }
            }
        }
    };

    // === RPGツクールMVとの統合部分 ===
    
    // Spriteset_Baseの初期化処理を拡張
    // ポップアップ用のコンテナを作成
    var _cPU_SsBase_initialize = Spriteset_Base.prototype.initialize;
    Spriteset_Base.prototype.initialize = function(){
        _cPU_SsBase_initialize.call(this); // 元の初期化処理
        this.createSpritePopup(); // ポップアップコンテナを作成
    };
    
    // Spriteset_Baseの更新処理を拡張
    // ポップアップスプライトの生成・削除を管理
    var _cPU_SsBase_update = Spriteset_Base.prototype.update;
    Spriteset_Base.prototype.update = function(){
        _cPU_SsBase_update.call(this); // 元の更新処理
        if (this._popupContainer === undefined){ return } // コンテナが未作成なら終了
        
        // 管理配列内の各ポップアップをチェック
        if(CommonPopupManager._tempCommonSprites){
            for(var i=0;i<CommonPopupManager._tempCommonSprites.length;i++){
                if (CommonPopupManager._tempCommonSprites[i]){
                    if (CommonPopupManager._tempCommonSprites[i].terminate){
                        // 終了フラグが立っている場合はスプライトを削除
                        var sprite = CommonPopupManager._tempCommonSprites[i].sprite;
                        this._popupContainer.removeChild(sprite);
                        delete CommonPopupManager._tempCommonSprites[i]
                    }else if (!CommonPopupManager._tempCommonSprites[i].sprite){
                        // スプライトが未作成の場合は新規作成
                        var sprite = new Sprite_Popup(i);
                        this._popupContainer.addChild(sprite);
                        CommonPopupManager._tempCommonSprites[i].sprite = sprite;
                    }
                }
            }
        }
    };
    
    // Scene_Baseの更新処理を拡張
    // 画像読み込み待ちポップアップの処理を行う
    var _cPU_SBase_update = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function(){
        _cPU_SBase_update.call(this); // 元の更新処理
        if(CommonPopupManager){ CommonPopupManager.setPopUpdate() }; // 画像読み込み待ち処理
    };
    
    // ポップアップ用のコンテナスプライトを作成するメソッド
    // MZではSprite.setFrameにRectangleを要求しMVとクリップ挙動が異なるため、
    // クリッピングは行わず位置のみを直接指定して互換性を確保する
    Spriteset_Base.prototype.createSpritePopup = function() {
        var width = Graphics.boxWidth; // ゲーム画面の幅
        var height = Graphics.boxHeight; // ゲーム画面の高さ
        var x = (Graphics.width - width) / 2; // 中央揃えのX座標
        var y = (Graphics.height - height) / 2; // 中央揃えのY座標
        this._popupContainer = new Sprite(); // コンテナスプライトを作成
        
        // MV/MZ対応のsetFrame処理
        if (isMZ) {
            // MZではsetFrameを使わずに直接位置とサイズを設定
            this._popupContainer.x = x;
            this._popupContainer.y = y;
            // MZではsetFrameは不要
        } else {
            // MVでは従来の引数形式
            this._popupContainer.setFrame(x, y, width, height);
        }
        
        this.addChild(this._popupContainer); // シーンに追加
    };
    
    // Scene_Baseの終了処理を拡張
    // シーン終了時に全ポップアップを削除
    var _cPU_SBase_terminate = Scene_Base.prototype.terminate;
    Scene_Base.prototype.terminate = function(){
        _cPU_SBase_terminate.call(this); // 元の終了処理
        this.terminatePopup(); // ポップアップ終了処理
    };
    
    // 全ポップアップを強制終了するメソッド
    Scene_Base.prototype.terminatePopup = function(){
        if (!CommonPopupManager._tempCommonSprites){
            CommonPopupManager.initTempSprites(); // 管理配列が未初期化なら初期化
        }
        
        // 全ポップアップを終了
        for(var i=0;i<CommonPopupManager._tempCommonSprites.length;i++){
            if (CommonPopupManager._tempCommonSprites[i]){
                var sprite = CommonPopupManager._tempCommonSprites[i].sprite;
                if (sprite) sprite.terminate(); // スプライトを終了
                delete CommonPopupManager._tempCommonSprites[i]; // 管理配列から削除
            }
        }
        
        // 各種管理配列をクリア
        CommonPopupManager._setedPopupss = []; // スライド管理配列
        CommonPopupManager._readyPopup = []; // 画像読み込み待ち配列
    };

    // Scene_Mapの戦闘開始処理を拡張
    // 戦闘開始時にマップ上のポップアップを削除
    var _cPU_SMap_launchBattle = Scene_Map.prototype.launchBattle;
    Scene_Map.prototype.launchBattle = function(){
        _cPU_SMap_launchBattle.call(this); // 元の戦闘開始処理
        this.terminatePopup(); // ポップアップを削除
    };
    
    // === 追加機能：アイコンサイズの文字サイズ追従 ===
    /*
    // Window_Base.drawIconメソッドを再定義
    // アイコンサイズを現在の文字サイズに合わせて調整
    Window_Base.prototype.drawIcon = function(iconIndex, x, y ,dx ,dy) {
        var bitmap = ImageManager.loadSystem('IconSet'); // アイコンセット画像を読み込み
        const pw = ImageManager.iconWidth; // 元のアイコン幅
        const ph = ImageManager.iconHeight; // 元のアイコン高さ
        var sx = iconIndex % 16 * pw; // アイコンセット内のX座標
        var sy = Math.floor(iconIndex / 16) * ph; // アイコンセット内のY座標

        const dw = ( dx || Math.floor((this.contents.fontSize / $gameSystem.mainFontSize()) * ImageManager.iconWidth) )
        const dh = ( dy || Math.floor((this.contents.fontSize / $gameSystem.mainFontSize()) * ImageManager.iconWidth) ) 


        // 現在の文字サイズに応じてアイコンサイズを計算
        var n = Math.floor((this.contents.fontSize / this.standardFontSize()) * Window_Base._iconWidth);
        var nn = (32 - n) / 2; // 未使用変数（位置調整用？）
        // 計算されたサイズでアイコンを描画
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, dw, dh);
    };

    // Window_Base.processDrawIconメソッドを再定義
    // アイコン描画後のテキスト位置を調整されたアイコンサイズに合わせる
    Window_Base.prototype.processDrawIcon = function(iconIndex, textState) {
        this.drawIcon(iconIndex, textState.x + 2, textState.y + 2); // アイコンを描画
        // 調整されたアイコンサイズを計算
        var n = Math.floor((this.contents.fontSize / this.standardFontSize()) * Window_Base._iconWidth);
        textState.x += n + 4; // テキスト位置をアイコンサイズ分進める
    };


    Window_Base.prototype.standardFontSize = function() {
        return $gameSystem.mainFontSize();
    };
*/
// Window_Baseの代わりに専用のウィンドウクラスを作成
function Window_CommonPopup() {
    this.initialize(...arguments);
}

Window_CommonPopup.prototype = Object.create(Window_Base.prototype);
Window_CommonPopup.prototype.constructor = Window_CommonPopup;

// 専用のアイコン描画メソッド
Window_CommonPopup.prototype.drawScaledIcon = function (
    iconIndex,
    x,
    y,
    fontSize
) {
    const bitmap = ImageManager.loadSystem("IconSet");
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;

    // フォントサイズに基づくスケール計算
    const defaultFontSize = 28; // RPGツクールMZのデフォルトフォントサイズ
    const scale = Math.min(fontSize / defaultFontSize, 1.2); // 最大1.2倍まで

    // アイコンサイズの計算
    const dw = Math.floor(pw * scale * 0.8);
    const dh = Math.floor(ph * scale * 0.8);

    // Y位置の微調整（アイコンを垂直方向に中央揃え）
    const yOffset = Math.max(0, Math.floor((fontSize - dh) / 2));
    // テキストタイプの場合のみ位置調整を適用
    const adjustedY =
        y + yOffset + (CommonPopupManager._type === "text" ? -1 : 0);

    this.contents.blt(bitmap, sx, sy, pw, ph, x, adjustedY, dw, dh);

    return dw; // アイコンの描画幅を返す（テキスト位置の調整用）
};



// アイコン描画処理の修正
Window_CommonPopup.prototype.processDrawIcon = function (iconIndex, textState) {
    if (textState.drawing) {
        const lineY =
            textState.y + (this.lineHeight() - this.contents.fontSize) / 2;
        const iconWidth = this.drawScaledIcon(
            iconIndex,
            textState.x + 2,
            lineY,
            this.contents.fontSize
        );
        textState.x += iconWidth + 4; // アイコンの実際の幅に基づいて位置を調整
    }
};





    // === 追加機能：フォントサイズ制御文字 ===
    
    // YEP_MessageCore（MV）やVisuMZ_MessageCore（MZ）との競合を避けるための条件分岐
    const hasMessageCorePlugin = (isMV && Imported.YEP_MessageCore) || 
                                 (isMZ && PluginManager._scripts && PluginManager._scripts.includes('VisuMZ_1_MessageCore'));
    
    if (!hasMessageCorePlugin) {
        // Window_Base.processEscapeCharacterメソッドを拡張
        // \FS[FontSize]制御文字を追加
        var _cPU_Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
        Window_Base.prototype.processEscapeCharacter = function (code, textState) {
            if (code === 'FS') {
                // \FS[数値]でフォントサイズを変更
                var param = this.obtainEscapeParam(textState);
                if (param != '') {
                    this.makeFontSize(param) // フォントサイズを設定
                }
            } else {
                // その他の制御文字は元の処理に委譲
                _cPU_Window_Base_processEscapeCharacter.call(this, code, textState);
            }
        };
    }
    
    // フォントサイズを設定するメソッド
    Window_Base.prototype.makeFontSize = function(fontSize) {
        this.contents.fontSize = fontSize; // コンテンツのフォントサイズを変更
    };
    
    // === MZ専用のWindow_CommonPopupクラス ===
    if (isMZ) {
        // CommonPopup専用の軽量ウィンドウ。
        // メッセージウィンドウと独立させ、制御文字やアイコンスケールの取り扱いを簡潔にする。
        class Window_CommonPopup extends Window_Base {
            constructor(x, y, width, height) {
                // MZではRectangleオブジェクトが必要
                const rect = new Rectangle(x, y, width, height);
                super(rect);
            }

            drawScaledIcon(iconIndex, x, y, fontSize) {
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
        
        // Window_CommonPopupクラスをグローバルスコープで利用可能にする
        globalThis.Window_CommonPopup = Window_CommonPopup;
    }
})();
