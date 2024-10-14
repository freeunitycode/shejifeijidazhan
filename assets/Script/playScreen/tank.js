// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const Emitter = require("Emitter");
cc.Class({
    extends: cc.Component,

    properties: {
        maxSpeed: 0,
        accel: 0,
        _losing: false
    },

    onLoad() {
        let collider = this.node.getComponent(cc.BoxCollider);
        collider.size.width = 52
        collider.size.height = 67
        this.accLeft = false;
        this.accRight = false;
        this.speed = 0;
        Emitter.instance.registerEvent('playAgain', this.onPlayAgain.bind(this))
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onMove, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onStop, this);
    },
    onMove(evt) {
        switch (evt.keyCode) {
            case cc.macro.KEY.a:
                {
                    this.accLeft = true;
                    break;
                }
            case cc.macro.KEY.d:
                {
                    this.accRight = true;
                    break;
                }
        }
    },
    onStop(evt) {
        switch (evt.keyCode) {
            case cc.macro.KEY.a:
                {
                    this.accLeft = false;
                    this.speed = 0;
                    break;
                }
            case cc.macro.KEY.d:
                {
                    this.accRight = false;
                    this.speed = 0;
                    break;
                }
        }
    },
    start() {},
    onCollisionEnter: function(other, self) {
        if (other.node.group == 'rock') {
            this.onLose()
            other.node.destroy()
            this._losing = true

        }
    },
    onLose() {
        Emitter.instance.emit('on-losing')
    },
    onPlayAgain() {
        this._losing = false
    },
    directionMoving(dt) {
        if (this.accLeft && this.node.x > -308) {
            this.speed -= 20
        } else if (this.accRight && this.node.x < 308) {
            this.speed += 20
        } else {
            this.speed = 0
        }
        if (Math.abs(this.speed) > this.maxSpeed) {
            this.speed = (this.maxSpeed * this.speed) / Math.abs(this.speed);
        }
        this.node.x += this.speed * dt;
    },
    update(dt) {
        if (!this._losing) {
            this.directionMoving(dt)
        }

    },
});