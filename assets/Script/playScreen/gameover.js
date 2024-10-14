// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var Emitter = require("Emitter");
cc.Class({
    extends: cc.Component,

    properties: {
        titleOver: {
            default: null,
            type: cc.Sprite,
        },
        savedName: {
            default: null,
            type: cc.EditBox,
        },
        btnSave: {
            default: null,
            type: cc.Button,
        },
        btnAgain: {
            default: null,
            type: cc.Button,
        },
        btnMenu: {
            default: null,
            type: cc.Button,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.scale = 0;
        cc.log(this.btnSave.interactable)
        this.btnSave.interactable = false
        this.savedName.node.on('text-changed', this.allowSaved.bind(this))
        this.btnSave.node.on('click', this.onSaveUserName.bind(this))
        this.btnMenu.node.on('click', this.onGoToMenu.bind(this))
        this.btnAgain.node.on('click', this.onPlayAgain.bind(this))
    },

    start() {
        cc.tween(this.node)
            .to(3, { scale: 1 }, { easing: "bounceOut" })
            .call(() => {
                this.animationTitle();
            })
            .start();
    },
    animationTitle() {
        cc.tween(this.titleOver.node)
            .repeatForever(
                cc.tween(this.titleOver.node)
                .to(1, { opacity: 100 })
                .to(0.5, { opacity: 255 })
            )
            .start();
    },
    allowSaved(evt) {
        if (evt.string !== '') {
            this.btnSave.interactable = true
        }
    },
    onSaveUserName() {
        this.node.active = false
        Emitter.instance.emit('save-name', this.savedName.string)
        Emitter.instance.emit('changeScreen', 'leaderBoardScreen')
    },
    onPlayAgain() {
        this.node.active = false
        Emitter.instance.emit('changeScreen', 'playScreen', true)
    },
    onGoToMenu() {
        this.node.active = false
        Emitter.instance.emit('changeScreen', 'mainScreen')
    },

    // update (dt) {},
});