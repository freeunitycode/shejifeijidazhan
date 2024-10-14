const Emitter = require('events')
//Email puhalskijsemen@gmail.com
//Open VPN global mode on the source code website http://web3incubators.com/
//Telegram https://t.me/gamecode999
//Web Customer Service http://web3incubators.com/kefu.html


class mEmitter {
    constructor(){
        this._emitter = new Emitter()
        this._emitter.setMaxListeners(100)
    }
    emit(...args){
        this._emitter.emit(...args);
    }
    registerEvent(event,listener){
        this._emitter.on(event,listener);
    }
    registerOnce(event,listener){
        this._emitter.once(event,listener);
    }
    removeEvent(event,listener){
        this._emitter.removeListener(event,listener);
    }
    destroy(){
        this._emitter.removeAllListeners();
        this._emitter=null;
        mEmitter.instance=null;
    }
}
mEmitter.instance=null
module.exports=mEmitter