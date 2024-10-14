// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//Email puhalskijsemen@gmail.com
//Open VPN global mode on the source code website http://web3incubators.com/
//Telegram https://t.me/gamecode999
//Web Customer Service http://web3incubators.com/kefu.html


//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var Emitter = require("Emitter");
cc.Class({
    extends: cc.Component,
    properties: {
        tank: cc.Node,
        bullet: cc.Prefab,
        shootSpeed: 1,
        rock: cc.Prefab,
        waveLabel: {
            default: null,
            type: cc.Label,
        },
        waveProgress: {
            default: null,
            type: cc.ProgressBar,
        },
        scoreLable: {
            default: null,
            type: cc.Label,
        },
        LosePopUp: cc.Node,
        _xSpeed: 0,
        _timer: 0,
        _losing: false,
        _playScore: {
            default: 0,
            type: cc.Integer,
            notify: function(val) {
                // this.scoreLable.string = Math.floor(val)
                this.updateScore(Math.round(val));
            },
        },
        _rockscore: 1,
        _wave: {
            default: 1,
            type: cc.Integer,
        },
        _playerArr: [],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.LosePopUp.active = false
        Emitter.instance.registerEvent("save-name", this.onSave.bind(this));
        Emitter.instance.registerEvent(
            "updateProgress",
            this.updateProgress.bind(this)
        );
        Emitter.instance.registerEvent("on-losing", this.onLose.bind(this));
        Emitter.instance.registerEvent("updateScore", this.updateScore.bind(this));
        Emitter.instance.registerEvent('playAgain', this.onPlayAgain.bind(this))
    },
    start() {
        this.node.active = false;
    },

    updateScore(score) {
        this.scoreLable.string = score;
    },
    onPlayAgain() {
        this.node.opacity = 255
        this._losing = false;
        this._playScore = 0
        this.wave = 1
        this.waveProgress.progress = 0
        this.scoreLable.string = 0
    },
    updateProgress(savedScore) {
        let temp = this._playScore + savedScore;
        cc.tween(this).to(1, { _playScore: temp }).start();
        let progress = this.waveProgress.progress;
        let update = progress + 1 / 8;
        cc.tween(this.waveProgress)
            .to(1, { progress: update })
            .call(() => {
                if (update == 1) {
                    cc.tween(this.waveProgress)
                        .to(1, { progress: 0 })
                        .call(() => {
                            cc.tween(this.waveLabel.node)
                                .to(1, { scale: 2 })
                                .to(1, { scale: 1 })
                                .start();
                            this._wave++;
                            this.waveLabel.string = "WAVE " + this._wave;
                        })
                        .start();
                }
            })
            .start();
    },
    onLose() {
        this.node.opacity = 100
        this.LosePopUp.active = true
        this._losing = true;
    },
    dropTheRock() {
        let rocks = cc.instantiate(this.rock);
        let score = parseInt(this._rockscore);
        rocks.getComponent("rock").setScore(score);
        rocks.setPosition(200, 100);
        this.node.addChild(rocks);
    },
    shoot() {
        let shoot = cc.instantiate(this.bullet);
        shoot.setPosition(this.tank.x, this.tank.y + 100);
        this.node.addChild(shoot);
    },
    update(dt) {
        if (!this._losing) {
            this._xSpeed += dt;
            this._timer += dt;
            if (this._xSpeed >= this.shootSpeed / 3) {
                this.shoot();
                this._xSpeed = 0;
            }
            if (this._timer > 3) {
                this._rockscore++;
                this.dropTheRock();
                this._timer = 0;
            }
        }
    },
    onSave(arg) {
        let playerInfo = {
            name: arg,
            score: this._playScore,
            wave: this._wave,
        };
        let itemData = JSON.parse(cc.sys.localStorage.getItem("leaderboard"));
        if (itemData != null) {
            this._playerArr = itemData;
        }
        this._playerArr.push(playerInfo);
        cc.log(this._playerArr);

        cc.sys.localStorage.setItem("leaderboard", JSON.stringify(this._playerArr));
    },
});