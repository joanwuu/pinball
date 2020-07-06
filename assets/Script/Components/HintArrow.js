cc.Class({
    extends: cc.Component,

    properties: {
        arrow1:cc.Node,
        arrow2:cc.Node,
        arrow3:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("init",this.init,this);
    },
    init(event){

    },

    start () {
        let looptime = 1.2;
        this.arrow1.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0),cc.tintTo(looptime/3,90,90,90),cc.callFunc(function(){this.arrow1.setColor(cc.color(200,200,200))}.bind(this)),cc.delayTime(looptime/3*2))));
        this.arrow2.runAction(cc.repeatForever(cc.sequence(cc.delayTime(looptime/3),cc.tintTo(looptime/3,90,90,90),cc.callFunc(function(){this.arrow2.setColor(cc.color(200,200,200))}.bind(this)),cc.delayTime(looptime/3))));
        this.arrow3.runAction(cc.repeatForever(cc.sequence(cc.delayTime(looptime/3*2),cc.tintTo(looptime/3,90,90,90),cc.callFunc(function(){this.arrow3.setColor(cc.color(200,200,200))}.bind(this)),cc.delayTime(0))));

    },

    update (dt) {
        //if()
    },
});
