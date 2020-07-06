
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("init",this.init,this);
    },

    init(event){
        this.node.x = event.detail.x;
        this.node.y = event.detail.y;
        //this.width = event.detail.width;
        //this.height = event.detail.height;
        cc.log(this.node.x);
        cc.log(this.node.y);
    },

    start () {

    },

    // update (dt) {},
});
