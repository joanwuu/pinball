
cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("init",this.init,this);
    },
    init(event){
        this.node.y += event.detail.modifyHeight/2;
        this.scoreLabel.string = 0;
    },

    start () {

    },

    update (dt) {
        this.scoreLabel.string = cc.wltq.score;
    },
});
