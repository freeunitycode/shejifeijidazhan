// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
//Email puhalskijsemen@gmail.com
//Open VPN global mode on the source code website http://web3incubators.com/
//Telegram https://t.me/gamecode999
//Web Customer Service http://web3incubators.com/kefu.html


cc.Class({
    extends: cc.Component,

    properties: {
        btnClear: {
            default: null,
            type: cc.Button
        },
        btnClose: {
            default: null,
            type: cc.Button,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.btnClose.node.on('click', this.onClose.bind(this))
        this.btnClear.node.on('click', this.onClear.bind(this))
    },

    start() {

    },
    onClear() {
        cc.sys.localStorage.removeItem('leaderboard')
        cc.log('OKAYYYYYY')
    },
    onClose() {
        this.node.active = false
    },

    // update (dt) {},
});