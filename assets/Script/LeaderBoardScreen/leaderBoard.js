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


const Emitter = require("Emitter");

cc.Class({
    extends: cc.Component,

    properties: {
        leaderItem: {
            default: null,
            type: cc.Prefab,
        },
        leaderBoard: {
            default: null,
            type: cc.ScrollView
        },
        btnMenu: {
            default: null,
            type: cc.Button
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.loadItem();
        this.btnMenu.node.on('click', this.goToMenu.bind(this))
    },

    start() {},
    goToMenu() {
        Emitter.instance.emit('changeScreen', 'mainScreen')
    },

    loadItem() {
        let itemData = JSON.parse(cc.sys.localStorage.getItem("leaderboard"));
        cc.log(itemData);
        if (itemData !== null) {
            itemData.sort((a, b) => {
                if (a.score > b.score) return -1;
                if (b.score > a.score) return 1;
                return 0;
            })
            itemData.slice(0, 9)
            itemData.map((item, index) => {
                let itemTemp = cc.instantiate(this.leaderItem)
                let itemDetail = itemTemp.getComponent('item')
                itemDetail.setItem(item, index + 1)
                cc.log(this.leaderBoard.content)
                cc.log(itemTemp)
                this.leaderBoard.content.addChild(itemTemp, 0)
                cc.log(itemDetail)
                cc.log(index)
            });
        }
    },


    // update (dt) {},
});