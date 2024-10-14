// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const stt = {
    init: true,
};//Email puhalskijsemen@gmail.com
//Open VPN global mode on the source code website http://web3incubators.com/
//Telegram https://t.me/gamecode999
//Web Customer Service http://web3incubators.com/kefu.html


const colorarr = [
    { r: 225, g: 97, b: 63 },
    { r: 50, g: 255, b: 0 },
    { r: 39, g: 105, b: 231 },
    { r: 223, g: 31, b: 229 },
];
const Emitter = require("Emitter");
cc.Class({
    extends: cc.Component,
    properties: {
        score: {
            default: 99,
            type: cc.Integer,
            serializable: false,
        },
        dir: {
            default: 1,
            type: cc.Integer,
            serializable: false,
            notify: function() {
                this.getRand();
            },
        },
        maxScale: {
            default: 0.4,
        },
        _destroy: false,
        _losing: {
            default: false,
        },
        _existTime: 0,
    },

    onLoad() {
        this._initScore = this.score;
        this.losing = this.onLosing.bind(this);
        Emitter.instance.registerEvent("on-losing", this.losing);
        this.getRand();
        this.status = stt.init;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        this.getColor();
    },

    start() {
        this.onFalling();
    },
    getRand() {
        this.rand = Math.floor(Math.random() * 100);
    },
    setScore(val) {
        this.score = val;
        this.node.children[0].getComponent(cc.Label).string = this.score;
    },
    getColor() {
        var rand = Math.floor(Math.random() * 4);
        this.node.color = new cc.Color(colorarr[rand]);
    },
    onLosing() {
        cc.log(this)
        
        this._losing = true;
        this.node.destroy()
        // if (this) {
        //     this.node.stopAllActions();       
        // }
    },
    onBounce() {
        // var x = this.node.x;
        // var y = this.node.y;
        var dir = Math.random() < 0.5 ? -1 : 1;
        var x = dir * this.rand;
        if (Math.abs(this.node.x) + 52 >= cc.winSize.width / 2) {
            cc.log("touch wall");
            this.dir = this.dir * -1;
            cc.log(Math.abs(this.node.x) + ":" + cc.winSize.width / 2);
        }
        var bezier = [cc.v2(0, 0), cc.v2(x, 300), cc.v2(x, 600)];
        var bezierBy = cc.bezierBy(2, bezier);
        var seq = cc.sequence(
            bezierBy,
            cc.callFunc(() => {
                this.status = true;
                this.onFalling();
            })
        );
        this.node.runAction(seq);
    },
    onCollisionEnter: function(other, self) {
        if (other.node.group == "ground") {
            this.status = false;
            this.node.stopAllActions();
            this.onBounce();
        } else if (other.node.group == "bullet" && !this._destroy) {
            var dame = other.node.getComponent("bullet").getDame();
            this.updateScore(dame);
            other.node.destroy();
        }
    },
    updateScore(dame) {
        if (!this._losing) {
            if (this.maxScale <= this.node.scale) {
                // this.node.scale -= dame / (this.score);
                cc.tween(this.node)
                    .by(0.5, { scale: -dame / (this.score * 5) })
                    .start()
            }
            this.score -= dame;
            if (this.score <= 0) {
                this._destroy = true
                this.node.children[0].getComponent(cc.Label).string = 0
                cc.log(this._initScore)
                Emitter.instance.emit("updateProgress", this._initScore);
                this.onDisapper();
            } else {
                this.node.children[0].getComponent(cc.Label).string = this.score;
            }


        }
    },
    onFalling() {
        let dir = Math.random() < 0.5 ? -1 : 1;
        let x = dir * this.rand;
        let bezier = [cc.v2(0, 0), cc.v2(x, -600), cc.v2(x * 20, -1000)];
        let bezierBy = cc.bezierBy(3, bezier);
        this.node.runAction(bezierBy);
    },
    onDisapper() {
        cc.log('diapper')
        Emitter.instance.removeEvent("on-losing", this.losing);
        cc.tween(this.node)
            .to(0.5, { scale: 0 })
            .call(() => {
                this.node.destroy();
            })
            .start()

    },
    update(dt) {
        this._existTime += dt;
        if (this._existTime > 5 && !this._losing) {
            this.onDisapper();
        }
    },
});