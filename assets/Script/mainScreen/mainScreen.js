const Emitter = require('Emitter')
cc.Class({
    extends: cc.Component,
    properties: {
        play: cc.Button,
        setting: cc.Button,
        leaderBoard: cc.Button,
        settingPopup: {
            default: null,
            type: cc.Node,
        }
    },
//Email puhalskijsemen@gmail.com
//Open VPN global mode on the source code website http://web3incubators.com/
//Telegram https://t.me/gamecode999
//Web Customer Service http://web3incubators.com/kefu.html


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.settingPopup.active = false
        this.setting.node.on('click', this.showSetting.bind(this))
        this.play.node.on('click', this.onPlay.bind(this))
        this.leaderBoard.node.on('click', this.showLeaderBoard.bind(this))
    },

    start() {

    },
    onPlay() {
        Emitter.instance.emit('changeScreen', 'playScreen', true);
    },
    showSetting() {
        this.settingPopup.active = true;
    },
    showLeaderBoard() {
        Emitter.instance.emit('changeScreen', 'leaderBoardScreen');
    }

    // update (dt) {},
});