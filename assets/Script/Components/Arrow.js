cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("init",this.init,this);
    },
    init(event){
        this.node.y += event.detail.modifyHeight;
        this.node.active = false;
    },
    start () {

    },

    // update (dt) {},
});
