
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
        let action1 = cc.repeatForever(cc.rotateBy(1,90));
        let action2 = cc.repeatForever(cc.spawn(cc.rotateBy(1,-180),cc.sequence(cc.scaleTo(0.5,0.8,0.8),cc.scaleTo(0.5,1,1))));        
        this.node.runAction(action1);
        this.ball.runAction(action2);
    },
    onBeginContact(contact,selfCollider,otherCollider){
        if(selfCollider.node.isChildOf(this.bricksNode))
        {            
            this.bricksNode.removeChild(selfCollider.node);
            otherCollider.node.emit("ChangeSize",{addBall:true});
            contact.disabled = true;
        }       
    },
    onPostSolve(contact,selfCollider,otherCollider){
        
    },

    start () {

    },

    // update (dt) {},
});
