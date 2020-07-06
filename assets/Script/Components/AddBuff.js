
cc.Class({
    extends: cc.Component,

    properties: {
        ball:cc.Node,
        _collider:null,
        bricksNode:cc.Node,
        ballsNode:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("init",this.init,this);
        this.node.on("runAction",this.runAction,this);
        this._collider = this.getComponent(cc.PhysicsCircleCollider);
    },
    init(event){
        this.node.width *= event.detail.ratio;
        this.node.height *= event.detail.ratio;
        this.ball.width *= event.detail.ratio;
        this.ball.height *= event.detail.ratio;

        this._collider.radius *= event.detail.ratio;
        this._collider.apply();       
        
    },
    runAction(){
        let action1 = cc.repeatForever(cc.sequence(cc.scaleTo(0.3,1.1,1.1),cc.scaleTo(0.3,1,1)));
        let action2 = cc.repeatForever(cc.sequence(cc.scaleTo(0.3,1.1,1.1),cc.scaleTo(0.3,1,1)));
        this.node.runAction(action1);
        this.ball.runAction(action2);
    },
    onBeginContact(contact,selfCollider,otherCollider){
        if(selfCollider.node.isChildOf(this.bricksNode))
        {            
            this.bricksNode.removeChild(selfCollider.node);
            //for(let i=0;i<10;i++)
            otherCollider.node.emit("AddBall");
            contact.disabled = true;
        }       
    },
    onPostSolve(contact,selfCollider,otherCollider){
        
    },

    start () {

    },

    // update (dt) {},
});
