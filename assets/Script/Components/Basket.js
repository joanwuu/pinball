var Config = require("Config");
var GameState = require("GameState");

cc.Class({
    extends: cc.Component,

    properties: {
        gameManager:cc.Node,
        balls:cc.Node,
        shootedBalls:cc.Node,
        _cacheBall:null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("init",this.init,this);   
        this.node.on("BeginShoot",this.onBeginShoot,this);
    },
    init(event){
        this.node.y += event.detail.modifyHeight/2;  
        cc.log(this.node);
    },
    start () {

    },
    onBeginContact(contact,selfCollider,otherCollider){
        if(cc.wltq.gameState !== GameState.GameShooting)
        {
            this._cacheBall = otherCollider.node;
            this.gameManager.emit("ChangeState",{state:GameState.GameIdle});
        }
        else
        {
            let angle = cc.wltq.angle;
            let pos = cc.p(otherCollider.node.x,otherCollider.node.y);
            let impulse = cc.v2(-Math.sin(angle)*Config.speed,-Math.cos(angle)*Config.speed);
            cc.log(angle);
            cc.log("impulse:"+impulse);
            otherCollider.restitution = Config.restitution;
            otherCollider.node.group = "shootedball";
            otherCollider.apply();
            otherCollider.body.applyLinearImpulse(impulse,pos,true);
            otherCollider.body.getComponent(cc.RigidBody).gravityScale = 0.000001;
        }    
    },
    onBeginShoot(event){
        if(this._cacheBall)
        {
            let angle = cc.wltq.angle;
            let pos = cc.p(this._cacheBall.x,this._cacheBall.y);
            let impulse = cc.v2(-Math.sin(angle)*Config.speed,-Math.cos(angle)*Config.speed);
            cc.log(angle);
            cc.log("impulse:"+impulse);
            this._cacheBall.group = "shootedball";
			this._cacheBall.getComponent(cc.RigidBody).applyLinearImpulse(impulse,pos,true);
            this._cacheBall.getComponent(cc.RigidBody).gravityScale = 0.000001;
            this._cacheBall.getComponent(cc.PhysicsCircleCollider).restitution = Config.restitution;
            this._cacheBall.getComponent(cc.PhysicsCircleCollider).apply();
            
            this._cacheBall = null;                
        }
    },
    // update (dt) {},
});
