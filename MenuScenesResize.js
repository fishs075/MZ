//=============================================================================
// RPG Maker MZ - Menu Scenes Resize Plugin
//=============================================================================

/*:
 * @target MZ
 * @plugindesc メニューシーン画面サイズ調整統合プラグイン v1.4.0
 * @author YourName
 * @url
 * @help MenuScenesResize.js
 * @version 1.4.0
 *
 * アイテム、スキル、装備、ステータス、セーブシーンでメニューバーの幅分だけ
 * 画面サイズを調整し、空いた箇所に反応しないメニューバーを表示します。
 *
 * @param enableItemScene
 * @text アイテムシーン有効
 * @desc アイテムシーンでメニューバーを表示するかどうか
 * @type boolean
 * @default true
 *
 * @param enableSkillScene
 * @text スキルシーン有効
 * @desc スキルシーンでメニューバーを表示するかどうか
 * @type boolean
 * @default true
 *
 * @param enableEquipScene
 * @text 装備シーン有効
 * @desc 装備シーンでメニューバーを表示するかどうか
 * @type boolean
 * @default true
 *
 * @param enableStatusScene
 * @text ステータスシーン有効
 * @desc ステータスシーンでメニューバーを表示するかどうか
 * @type boolean
 * @default true
 *
 * @param enableSaveScene
 * @text セーブシーン有効
 * @desc セーブシーンでメニューバーを表示するかどうか
 * @type boolean
 * @default true
 *
 * @param menuBarHeight
 * @text メニューバー高さ（共通）
 * @desc 全シーン共通のメニューバー総高さ（px）。0で自動（従来動作）
 * @type number
 * @min 0
 * @default 0
 *
 * @param menuBarWidth
 * @text メニューバー幅
 * @desc メニューバーの幅（ピクセル）
 * @type number
 * @min 100
 * @max 400
 * @default 240
 *
 * @param menuBarPosition
 * @text メニューバー位置
 * @desc メニューバーを表示する位置
 * @type select
 * @option Left
 * @value left
 * @option Right
 * @value right
 * @default left
 *
 * @param showMenuBarBackground
 * @text メニューバー背景表示
 * @desc メニューバーの背景を表示するかどうか
 * @type boolean
 * @default true
 *
 * @param menuBarOpacity
 * @text メニューバー透明度
 * @desc メニューバーの透明度（0-255）
 * @type number
 * @min 0
 * @max 255
 * @default 160
 *
 * @param showGoldBar
 * @text ゴールドバー表示
 * @desc メニューバー内の所持金（ゴールド）ウィンドウを表示する
 * @type boolean
 * @default true
 *

 *
 * @help
 * 
 * ============================================================================
 * 機能説明
 * ============================================================================
 * 
 * このプラグインは以下のメニューシーンに対応しています：
 * 
 * ・アイテムシーン - アイテムの使用・確認
 * ・スキルシーン - スキルの使用・確認
 * ・装備シーン - 装備の変更・確認
 * ・ステータスシーン - キャラクターステータスの確認
 * ・セーブシーン - ゲームのセーブ
 * 
 * 各シーンで個別に有効/無効を切り替えることができます。
 * 
 * ============================================================================
 * 利用規約
 * ============================================================================
 * このプラグインは無料で使用できます。
 * 
 */

(() => {
    'use strict';

    // パラメータの取得
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    const parameters = PluginManager.parameters(pluginName);
    const enableItemScene = parameters['enableItemScene'] === 'true';
    const enableSkillScene = parameters['enableSkillScene'] === 'true';
    const enableEquipScene = parameters['enableEquipScene'] === 'true';
    const enableStatusScene = parameters['enableStatusScene'] === 'true';
    const enableSaveScene = parameters['enableSaveScene'] === 'true';
    const menuBarWidth = Number(parameters['menuBarWidth'] || 240);
    const menuBarPosition = parameters['menuBarPosition'] || 'left';
    const showMenuBarBackground = parameters['showMenuBarBackground'] === 'true';
    const menuBarOpacity = Number(parameters['menuBarOpacity'] || 160);
    const showGoldBar = parameters['showGoldBar'] === 'true';
    const menuBarHeight = Number(parameters['menuBarHeight'] || 0);

    //=============================================================================
    // 共通メソッド
    //=============================================================================

    // メニューコマンドウィンドウを作成する共通メソッド
    function createMenuCommandWindow(scene, symbolName) {
        const rect = scene.menuCommandWindowRect();
        scene._menuCommandWindow = new Window_MenuCommand(rect);
        
        // 透明度設定（枠線は表示したまま）
        scene._menuCommandWindow.contentsOpacity = menuBarOpacity;
        scene._menuCommandWindow.opacity = 255; // 枠線は完全に表示
        
        // メニューコマンドの選択を無効化（表示のみ）
        scene._menuCommandWindow.deactivate();
        scene._menuCommandWindow.deselect();
        
        // 現在選択中のコマンドをハイライト
        const symbolIndex = scene._menuCommandWindow.findSymbol(symbolName);
        if (symbolIndex >= 0) {
            scene._menuCommandWindow.select(symbolIndex);
        }
        
        scene.addWindow(scene._menuCommandWindow);
    }

    // メニューゴールドウィンドウを作成する共通メソッド
    function createMenuGoldWindow(scene) {
        if (!showGoldBar) return;
        const rect = scene.menuGoldWindowRect();
        scene._goldWindow = new Window_Gold(rect);
        scene._goldWindow.contentsOpacity = menuBarOpacity;
        scene._goldWindow.opacity = 255;
        scene.addWindow(scene._goldWindow);
    }

    // 指定シーンのメニューバー総高さ（コマンド＋所持金）を取得
    function getConfiguredMenuBarHeight(scene) {
        return menuBarHeight > 0 ? menuBarHeight : 0;
    }

    // メニューコマンドウィンドウの矩形を取得する共通メソッド
    function getMenuCommandWindowRect(scene) {
        const x = menuBarPosition === 'left' ? 0 : Graphics.boxWidth - menuBarWidth;
        const y = scene.mainAreaTop();
        const width = menuBarWidth;
        const goldHeight = showGoldBar ? scene.calcWindowHeight(1, true) : 0;
        let availableTotalHeight;
        if (scene.constructor === Scene_Status || scene.constructor === Scene_Save) {
            availableTotalHeight = scene.mainAreaHeight();
        } else {
            availableTotalHeight = scene.helpAreaHeight() + scene.mainAreaHeight();
        }
        const configured = getConfiguredMenuBarHeight(scene);
        const totalHeight = configured > 0 ? Math.min(availableTotalHeight, configured) : availableTotalHeight;
        const height = Math.max(0, totalHeight - goldHeight);
        return new Rectangle(x, y, width, height);
    }

    // メニューゴールドウィンドウの矩形を取得する共通メソッド
    function getMenuGoldWindowRect(scene) {
        const x = menuBarPosition === 'left' ? 0 : Graphics.boxWidth - menuBarWidth;
        const goldHeight = showGoldBar ? scene.calcWindowHeight(1, true) : 0;
        let availableTotalHeight;
        if (scene.constructor === Scene_Status || scene.constructor === Scene_Save) {
            availableTotalHeight = scene.mainAreaHeight();
        } else {
            availableTotalHeight = scene.helpAreaHeight() + scene.mainAreaHeight();
        }
        // ゴールド位置は従来の最下部に固定（共通高さ設定の影響を受けない）
        const commandHeight = Math.max(0, availableTotalHeight - goldHeight);
        const y = scene.mainAreaTop() + commandHeight;
        const width = menuBarWidth;
        const height = goldHeight;
        return new Rectangle(x, y, width, height);
    }

    //=============================================================================
    // Scene_Item - アイテムシーンの拡張
    //=============================================================================

    if (enableItemScene) {
        // 元のScene_Item.prototype.createメソッドを保存
        const _Scene_Item_create = Scene_Item.prototype.create;
        
        Scene_Item.prototype.create = function() {
            _Scene_Item_create.call(this);
            createMenuCommandWindow(this, 'item');
            createMenuGoldWindow(this);
        };

        Scene_Item.prototype.menuCommandWindowRect = function() {
            return getMenuCommandWindowRect(this);
        };

        Scene_Item.prototype.menuGoldWindowRect = function() {
            return getMenuGoldWindowRect(this);
        };

        // カテゴリウィンドウの矩形を調整
        const _Scene_Item_categoryWindowRect = Scene_Item.prototype.categoryWindowRect;
        Scene_Item.prototype.categoryWindowRect = function() {
            const rect = _Scene_Item_categoryWindowRect.call(this);
            rect.width = Graphics.boxWidth - menuBarWidth;
            if (menuBarPosition === 'left') {
                rect.x = menuBarWidth;
            } else {
                rect.x = 0;
            }
            return rect;
        };

        // アイテムウィンドウの矩形を調整
        const _Scene_Item_itemWindowRect = Scene_Item.prototype.itemWindowRect;
        Scene_Item.prototype.itemWindowRect = function() {
            const rect = _Scene_Item_itemWindowRect.call(this);
            rect.width = Graphics.boxWidth - menuBarWidth;
            if (menuBarPosition === 'left') {
                rect.x = menuBarWidth;
            } else {
                rect.x = 0;
            }
            return rect;
        };

        // ヘルプウィンドウの矩形を調整
        const _Scene_Item_helpWindowRect = Scene_Item.prototype.helpWindowRect;
        Scene_Item.prototype.helpWindowRect = function() {
            const rect = _Scene_Item_helpWindowRect.call(this);
            rect.width = Graphics.boxWidth - menuBarWidth;
            if (menuBarPosition === 'left') {
                rect.x = menuBarWidth;
            } else {
                rect.x = 0;
            }
            return rect;
        };

        // アクターウィンドウの矩形を調整
        const _Scene_ItemBase_actorWindowRect = Scene_ItemBase.prototype.actorWindowRect;
        Scene_ItemBase.prototype.actorWindowRect = function() {
            if (this.constructor === Scene_Item) {
                const wx = menuBarPosition === 'left' ? menuBarWidth : 0;
                const wy = this.mainAreaTop();
                const ww = Graphics.boxWidth - menuBarWidth;
                const wh = this.mainAreaHeight();
                return new Rectangle(wx, wy, ww, wh);
            } else {
                return _Scene_ItemBase_actorWindowRect.call(this);
            }
        };

        // showActorWindowメソッドをオーバーライド
        const _Scene_ItemBase_showActorWindow = Scene_ItemBase.prototype.showActorWindow;
        Scene_ItemBase.prototype.showActorWindow = function() {
            if (this.constructor === Scene_Item) {
                this._actorWindow.show();
                this._actorWindow.activate();
            } else {
                _Scene_ItemBase_showActorWindow.call(this);
            }
        };
    }

    //=============================================================================
    // Scene_Skill - スキルシーンの拡張
    //=============================================================================

    if (enableSkillScene) {
        const _Scene_Skill_create = Scene_Skill.prototype.create;
        
        Scene_Skill.prototype.create = function() {
            _Scene_Skill_create.call(this);
            createMenuCommandWindow(this, 'skill');
            createMenuGoldWindow(this);
        };

        Scene_Skill.prototype.menuCommandWindowRect = function() {
            return getMenuCommandWindowRect(this);
        };

        Scene_Skill.prototype.menuGoldWindowRect = function() {
            return getMenuGoldWindowRect(this);
        };

        // スキルタイプウィンドウの矩形を調整
        const _Scene_Skill_skillTypeWindowRect = Scene_Skill.prototype.skillTypeWindowRect;
        Scene_Skill.prototype.skillTypeWindowRect = function() {
            const ww = this.mainCommandWidth();
            const wh = this.calcWindowHeight(3, true);
            let wx, wy;
            
            if (menuBarPosition === 'left') {
                wx = this.isRightInputMode() ? Graphics.boxWidth - ww : menuBarWidth;
            } else {
                wx = this.isRightInputMode() ? Graphics.boxWidth - ww - menuBarWidth : 0;
            }
            wy = this.mainAreaTop();
            
            return new Rectangle(wx, wy, ww, wh);
        };

        // ステータスウィンドウの矩形を調整
        const _Scene_Skill_statusWindowRect = Scene_Skill.prototype.statusWindowRect;
        Scene_Skill.prototype.statusWindowRect = function() {
            const ww = Graphics.boxWidth - this.mainCommandWidth() - menuBarWidth;
            const wh = this._skillTypeWindow.height;
            let wx, wy;
            
            if (menuBarPosition === 'left') {
                wx = this.isRightInputMode() ? menuBarWidth : Graphics.boxWidth - ww;
            } else {
                wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww - menuBarWidth;
            }
            wy = this.mainAreaTop();
            
            return new Rectangle(wx, wy, ww, wh);
        };

        // スキルウィンドウの矩形を調整
        const _Scene_Skill_itemWindowRect = Scene_Skill.prototype.itemWindowRect;
        Scene_Skill.prototype.itemWindowRect = function() {
            let wx, wy, ww, wh;
            
            if (menuBarPosition === 'left') {
                wx = menuBarWidth;
            } else {
                wx = 0;
            }
            wy = this._statusWindow.y + this._statusWindow.height;
            ww = Graphics.boxWidth - menuBarWidth;
            wh = this.mainAreaHeight() - this._statusWindow.height;
            
            return new Rectangle(wx, wy, ww, wh);
        };

        // ヘルプウィンドウの矩形を調整
        const _Scene_Skill_helpWindowRect = Scene_Skill.prototype.helpWindowRect;
        Scene_Skill.prototype.helpWindowRect = function() {
            const rect = _Scene_Skill_helpWindowRect.call(this);
            rect.width = Graphics.boxWidth - menuBarWidth;
            if (menuBarPosition === 'left') {
                rect.x = menuBarWidth;
            } else {
                rect.x = 0;
            }
            return rect;
        };

        // アクターウィンドウの矩形を調整（スキル用）
        const _Scene_ItemBase_actorWindowRect_Skill = Scene_ItemBase.prototype.actorWindowRect;
        Scene_ItemBase.prototype.actorWindowRect = function() {
            if (this.constructor === Scene_Skill) {
                const wx = menuBarPosition === 'left' ? menuBarWidth : 0;
                const wy = this.mainAreaTop();
                const ww = Graphics.boxWidth - menuBarWidth;
                const wh = this.mainAreaHeight();
                return new Rectangle(wx, wy, ww, wh);
            } else {
                return _Scene_ItemBase_actorWindowRect_Skill.call(this);
            }
        };

        // showActorWindowメソッドをオーバーライド（スキル用）
        const _Scene_ItemBase_showActorWindow_Skill = Scene_ItemBase.prototype.showActorWindow;
        Scene_ItemBase.prototype.showActorWindow = function() {
            if (this.constructor === Scene_Skill) {
                this._actorWindow.show();
                this._actorWindow.activate();
            } else {
                _Scene_ItemBase_showActorWindow_Skill.call(this);
            }
        };
    }

    //=============================================================================
    // Scene_Equip - 装備シーンの拡張
    //=============================================================================

    if (enableEquipScene) {
        const _Scene_Equip_create = Scene_Equip.prototype.create;
        
        Scene_Equip.prototype.create = function() {
            _Scene_Equip_create.call(this);
            createMenuCommandWindow(this, 'equip');
            createMenuGoldWindow(this);
        };

        Scene_Equip.prototype.menuCommandWindowRect = function() {
            return getMenuCommandWindowRect(this);
        };

        Scene_Equip.prototype.menuGoldWindowRect = function() {
            return getMenuGoldWindowRect(this);
        };

        // ステータスウィンドウの矩形を調整
        const _Scene_Equip_statusWindowRect = Scene_Equip.prototype.statusWindowRect;
        Scene_Equip.prototype.statusWindowRect = function() {
            let wx, wy, ww, wh;
            
            if (menuBarPosition === 'left') {
                wx = menuBarWidth;
            } else {
                wx = 0;
            }
            wy = this.mainAreaTop();
            ww = this.statusWidth();
            wh = this.mainAreaHeight();
            
            return new Rectangle(wx, wy, ww, wh);
        };

        // コマンドウィンドウの矩形を調整
        const _Scene_Equip_commandWindowRect = Scene_Equip.prototype.commandWindowRect;
        Scene_Equip.prototype.commandWindowRect = function() {
            let wx, wy, ww, wh;
            
            if (menuBarPosition === 'left') {
                wx = menuBarWidth + this.statusWidth();
            } else {
                wx = this.statusWidth();
            }
            wy = this.mainAreaTop();
            ww = Graphics.boxWidth - this.statusWidth() - menuBarWidth;
            wh = this.calcWindowHeight(1, true);
            
            return new Rectangle(wx, wy, ww, wh);
        };

        // スロットウィンドウの矩形を調整
        const _Scene_Equip_slotWindowRect = Scene_Equip.prototype.slotWindowRect;
        Scene_Equip.prototype.slotWindowRect = function() {
            const commandWindowRect = this.commandWindowRect();
            let wx, wy, ww, wh;
            
            if (menuBarPosition === 'left') {
                wx = menuBarWidth + this.statusWidth();
            } else {
                wx = this.statusWidth();
            }
            wy = commandWindowRect.y + commandWindowRect.height;
            ww = Graphics.boxWidth - this.statusWidth() - menuBarWidth;
            wh = this.mainAreaHeight() - commandWindowRect.height;
            
            return new Rectangle(wx, wy, ww, wh);
        };

        // アイテムウィンドウの矩形を調整
        const _Scene_Equip_itemWindowRect = Scene_Equip.prototype.itemWindowRect;
        Scene_Equip.prototype.itemWindowRect = function() {
            return this.slotWindowRect();
        };

        // ヘルプウィンドウの矩形を調整
        const _Scene_Equip_helpWindowRect = Scene_Equip.prototype.helpWindowRect;
        Scene_Equip.prototype.helpWindowRect = function() {
            const rect = _Scene_Equip_helpWindowRect.call(this);
            rect.width = Graphics.boxWidth - menuBarWidth;
            if (menuBarPosition === 'left') {
                rect.x = menuBarWidth;
            } else {
                rect.x = 0;
            }
            return rect;
        };
    }

    //=============================================================================
    // Scene_Status - ステータスシーンの拡張
    //=============================================================================

    if (enableStatusScene) {
        const _Scene_Status_create = Scene_Status.prototype.create;
        
        Scene_Status.prototype.create = function() {
            _Scene_Status_create.call(this);
            createMenuCommandWindow(this, 'status');
            createMenuGoldWindow(this);
        };

        Scene_Status.prototype.menuCommandWindowRect = function() {
            return getMenuCommandWindowRect(this);
        };

        Scene_Status.prototype.menuGoldWindowRect = function() {
            return getMenuGoldWindowRect(this);
        };

        // プロフィールウィンドウの矩形を調整
        const _Scene_Status_profileWindowRect = Scene_Status.prototype.profileWindowRect;
        Scene_Status.prototype.profileWindowRect = function() {
            let ww, wh, wx, wy;
            
            ww = Graphics.boxWidth - menuBarWidth;
            wh = this.profileHeight();
            if (menuBarPosition === 'left') {
                wx = menuBarWidth;
            } else {
                wx = 0;
            }
            wy = this.mainAreaBottom() - wh;
            
            return new Rectangle(wx, wy, ww, wh);
        };

        // ステータスウィンドウの矩形を調整
        const _Scene_Status_statusWindowRect = Scene_Status.prototype.statusWindowRect;
        Scene_Status.prototype.statusWindowRect = function() {
            let wx, wy, ww, wh;
            
            if (menuBarPosition === 'left') {
                wx = menuBarWidth;
            } else {
                wx = 0;
            }
            wy = this.mainAreaTop();
            ww = Graphics.boxWidth - menuBarWidth;
            wh = this.statusParamsWindowRect().y - wy;
            
            return new Rectangle(wx, wy, ww, wh);
        };

        // ステータスパラメータウィンドウの矩形を調整
        const _Scene_Status_statusParamsWindowRect = Scene_Status.prototype.statusParamsWindowRect;
        Scene_Status.prototype.statusParamsWindowRect = function() {
            const ww = this.statusParamsWidth();
            const wh = this.statusParamsHeight();
            let wx, wy;
            
            if (menuBarPosition === 'left') {
                wx = menuBarWidth;
            } else {
                wx = 0;
            }
            wy = this.mainAreaBottom() - this.profileHeight() - wh;
            
            return new Rectangle(wx, wy, ww, wh);
        };

        // ステータス装備ウィンドウの矩形を調整
        const _Scene_Status_statusEquipWindowRect = Scene_Status.prototype.statusEquipWindowRect;
        Scene_Status.prototype.statusEquipWindowRect = function() {
            const ww = Graphics.boxWidth - this.statusParamsWidth() - menuBarWidth;
            const wh = this.statusParamsHeight();
            let wx, wy;
            
            if (menuBarPosition === 'left') {
                wx = menuBarWidth + this.statusParamsWidth();
            } else {
                wx = this.statusParamsWidth();
            }
            wy = this.mainAreaBottom() - this.profileHeight() - wh;
            
            return new Rectangle(wx, wy, ww, wh);
        };
    }

    //=============================================================================
    // Scene_Save - セーブシーンの拡張
    //=============================================================================

    if (enableSaveScene) {
        const _Scene_Save_create = Scene_Save.prototype.create;
        
        Scene_Save.prototype.create = function() {
            _Scene_Save_create.call(this);
            createMenuCommandWindow(this, 'save');
            createMenuGoldWindow(this);
        };

        Scene_Save.prototype.menuCommandWindowRect = function() {
            return getMenuCommandWindowRect(this);
        };

        Scene_Save.prototype.menuGoldWindowRect = function() {
            return getMenuGoldWindowRect(this);
        };

        // ヘルプウィンドウの矩形を調整
        const _Scene_File_helpWindowRect = Scene_File.prototype.helpWindowRect;
        Scene_File.prototype.helpWindowRect = function() {
            // Scene_Saveの場合のみ調整を適用
            if (this.constructor === Scene_Save) {
                let wx, wy, ww, wh;
                
                if (menuBarPosition === 'left') {
                    wx = menuBarWidth;
                } else {
                    wx = 0;
                }
                wy = this.mainAreaTop();
                ww = Graphics.boxWidth - menuBarWidth;
                wh = this.calcWindowHeight(1, false);
                
                return new Rectangle(wx, wy, ww, wh);
            } else {
                // 他のシーン（Scene_Load等）では元の処理を実行
                return _Scene_File_helpWindowRect.call(this);
            }
        };

        // リストウィンドウの矩形を調整
        const _Scene_File_listWindowRect = Scene_File.prototype.listWindowRect;
        Scene_File.prototype.listWindowRect = function() {
            // Scene_Saveの場合のみ調整を適用
            if (this.constructor === Scene_Save) {
                let wx, wy, ww, wh;
                
                if (menuBarPosition === 'left') {
                    wx = menuBarWidth;
                } else {
                    wx = 0;
                }
                wy = this.mainAreaTop() + this._helpWindow.height;
                ww = Graphics.boxWidth - menuBarWidth;
                wh = this.mainAreaHeight() - this._helpWindow.height;
                
                return new Rectangle(wx, wy, ww, wh);
            } else {
                // 他のシーン（Scene_Load等）では元の処理を実行
                return _Scene_File_listWindowRect.call(this);
            }
        };
    }

    //=============================================================================
    // プラグイン終了
    //=============================================================================

})();
