
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.OnTouchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.OnTouchMove,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.OnTouchEnd,this);
    },
    OnTouchStart(event){},
    OnTouchMove(event){},
    OnTouchEnd(event){},
    start () {

    },

    // update (dt) {},
});
