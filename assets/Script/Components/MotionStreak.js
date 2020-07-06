cc.Class({
    extends: cc.Component,

    properties: {
        ball:cc.Node,
    },
    
    onLoad () {},

    start () {
        
    },

    update (dt) {
        //this.node.rotation = 0;
        //this.node.runAction(cc.moveTo(0,this.ball.x,this.ball.y));
        this.node.x = this.ball.x;
        this.node.y = this.ball.y;
        //this.node.runAction(cc.follow(this.ball));
    },
});
