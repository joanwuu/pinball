
cc.Class({
    extends: cc.Component,

    properties: {
        timeLabel:cc.Label,
        _time:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("init",this.init,this);
    },
    init(event){
        this.node.y += event.detail.modifyHeight/2;
        this._time  = 0;
    },
    start () {

    },

    update (dt) {
        this._time += dt;
        let secends = Math.floor(this._time);
        let minite = Math.floor(secends/60);
        secends -= minite*60;
        minite = minite<10?"0"+minite:minite;
        secends = secends<10?"0"+secends:secends;
        this.timeLabel.string = minite+":"+secends;
    },
});
