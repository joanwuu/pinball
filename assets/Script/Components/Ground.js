var Config = require("Config");
var ChainPointsUtils = require("ChainPointsUtils");

cc.Class({
    extends: cc.Component,

    properties: {
        leftWheel:cc.Node,
        righttWheel:cc.Node,
        //hintArrow:cc.Node,
        ball:cc.Node,
        ballsNode:cc.Node,
        //shootedBallsNode:cc.Node,
        _physicsChainCollider:null,
        _receiveBallsNum:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("init",this.init,this);

        this._physicsChainCollider = this.getComponent(cc.PhysicsChainCollider);
        let points = ChainPointsUtils.getGroundPoints(Config.engineLevel,Config.adsAreaHeight);
        cc.log(points);
        this._physicsChainCollider.points = points;
    },
    init(event){
        this.node.x = event.detail.x;
        this.node.y = event.detail.y;
        this.node.width = event.detail.width;
        this.node.height = event.detail.height;
        this.leftWheel.emit("init",{direction:"anticlockwise"});
        this.righttWheel.emit("init",{direction:"clockwise"});
        //this.hintArrow.emit("init");
        this.ball.emit("SyncPoints",{points:this._physicsChainCollider.points});
        cc.log(this.node);
    },
    start () {

    },
    onBeginContact(contact,selfCollider,otherCollider){
        let ball = otherCollider.node.getComponent("Ball");
        if(ball._reseted===false)
        {
            this._receiveBallsNum++;
            //cc.log("this._receiveBallsNum:"+this._receiveBallsNum);
            //cc.log("ballsNum:"+this.ballsNode.children.length);
            if(this._receiveBallsNum === (this.ballsNode.children.length))
            {
                this._receiveBallsNum = 0;
                otherCollider.node.emit("NeedChangeColor");            
            }
            otherCollider.node.group = "resetball";
            //otherCollider.node.zIndex = 1;
            otherCollider.body.gravityScale = 0;
            //cc.log(otherCollider.node.group);
            ball._reseted = true;
        }
        
    },
    onPostSolve(contact,selfCollider,otherCollider){
        //contact.setRestitution(0);        
    },
    update (dt) {},
});
