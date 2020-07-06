var Config = require("Config");
var GameState = require("GameState");
cc.Class({
    extends: cc.Component,

    properties: {
        //groundNode:cc.Node,
        gameManager:cc.Node,
        motionStreak:cc.Node,
        ballsNode:cc.Node,
        motionStreaksNode:cc.Node,
        _size:1,
        _reseted:false,
        _rigidBody:null,
        _collider:null,
        _points:null,
        _touchGround:false,
        _points:null,
        _pos:null,
        _needChangeColor:false,
        AddBallLabel:cc.Label,
        DoubleSizeLabel:cc.Label,
        SplitUpLabel:cc.Label,
        playArea:cc.Node,
        audioEngine:cc.Node,
        //_collider:null,
    },

   
    onLoad () {
        this.node.on("init",this.init,this);
        this.node.on("SyncPoints",this.resetPoints,this);
        this.node.on("NeedChangeColor",this.OnNeedChangeColor,this);
        this.node.on("ChangeSize",this.ChangeSize,this);
        this.node.on("AddBall",this.AddBall,this);
        this._rigidBody = this.getComponent(cc.RigidBody);
        this._collider = this.getComponent(cc.PhysicsCircleCollider);
        //this._collider = this.getComponent(cc.PhysicsCircleCollider);
    },
    init(event){
        this.node.y += event.detail.modifyHeight/2;
    },

    resetPoints(event){
        this._points = new Array();//event.detail.points;
        for(let i=0;i<event.detail.points.length;i++)
        {
            this._points.push(cc.v2(event.detail.points[i].x,event.detail.points[i].y-cc.wltq.resolution.winHeight/2+this.node.width/2+cc.wltq.resolution.modifyHeight/2));
        }
        cc.log(this._points);
    },
    OnNeedChangeColor(){
        this._needChangeColor = true;
        cc.log("OnNeedChangeColor:"+this._needChangeColor);
    },
    getActionPoints(){
        let ret = new Array();
        let x = this._pos.x;
        if(x>0)
        {
            for(let i=this._points.length-1;i>=0;i--)
            {
                if(this._points[i].x>-Config.edgeX && this._points[i].x<x)
                {
                    ret.push(this._points[i]);
                }
            }
            ret.push(cc.p(-Config.edgeX,Config.adsAreaHeight-cc.wltq.resolution.winHeight/2+this.node.width/2+cc.wltq.resolution.modifyHeight/2));
        }
        else{
            for(let i=0;i<this._points.length;i++)
            {
                if(this._points[i].x<Config.edgeX && this._points[i].x>x)
                {
                    ret.push(this._points[i]);
                }
            }
            ret.push(cc.p(Config.edgeX,Config.adsAreaHeight-cc.wltq.resolution.winHeight/2+this.node.width/2+cc.wltq.resolution.modifyHeight/2));
        }
        return ret;
    },
    start () {        
    },
    AddBall(event){
        this.audioEngine.emit("playNewballSound");
        let node = cc.instantiate(this.node);
        let ballsNum = this.ballsNode.children.length;
        this.ballsNode.addChild(node,1,ballsNum);
        let pos = cc.p(node.x,node.y);
        //let impulse = cc.v2(0,1000);
        let velocity = node.getComponent(cc.RigidBody).linearVelocity;
        cc.log("before velocity:"+velocity);
        velocity = cc.v2(-velocity.x,-velocity.y);
        // cc.log("end velocity:"+velocity);
        // if(Math.abs(velocity.y)<500)
        // {
        //     velocity.y = 500;
        // }
        node.getComponent(cc.RigidBody).linearVelocity = velocity;
        //node.getComponent(cc.RigidBody).applyLinearImpulse(impulse,pos,true);
        node.getComponent(cc.RigidBody).gravityScale = 1;
        node.getComponent(cc.PhysicsCircleCollider).apply();

        let follow = cc.instantiate(this.motionStreak);
        this.motionStreaksNode.addChild(follow,1,ballsNum);
        follow.x = node.x;
        follow.y = node.y;
        follow.getComponent(cc.MotionStreak).stroke = node.width;
        follow.getComponent("MotionStreak").ball = node;

        let label = cc.instantiate(this.AddBallLabel.node);
        this.playArea.addChild(label,2);
        label.x = this.node.x+cc.wltq.resolution.winWidth/2;
        label.y = this.node.y+20+cc.wltq.resolution.winHeight/2;        
        label.runAction(cc.sequence(cc.spawn(cc.moveBy(1,0,50),cc.fadeOut(1)),cc.callFunc(function(){
            this.playArea.removeChild(label);
        }.bind(this))));
        if(this._size === 2)
        {          
            node.emit("ChangeSize",{addBall:false});
        }
        //cc.log("add ball:"+this.ballsNode.children.length);
    },
    ChangeSize(event){
        if(this._size === 1)
        {
            this.audioEngine.emit("playDoubleSound");
            this._size = 2;
            let ratio = Math.sqrt(1.6);
            this.node.width *= ratio;
            this.node.height *= ratio;

            this._collider.radius *= ratio;
            this._collider.apply();

            let label = cc.instantiate(this.DoubleSizeLabel.node);
            this.playArea.addChild(label,2);
            label.x = this.node.x+cc.wltq.resolution.winWidth/2;
            label.y = this.node.y+20+cc.wltq.resolution.winHeight/2;            
            label.runAction(cc.sequence(cc.spawn(cc.moveBy(1,0,50),cc.fadeOut(1)),cc.callFunc(function(){
                this.playArea.removeChild(label);
            }.bind(this))));

            let tag = this.node.tag;
            let follow = this.motionStreaksNode.getChildByTag(tag);
            follow.getComponent(cc.MotionStreak).stroke = this.node.width;            
        }
        else
        {
            this._size = 1;
            let ratio = 1/Math.sqrt(1.6);
            this.node.width *= ratio;
            this.node.height *= ratio;

            this._collider.radius *= ratio;
            this._collider.apply();

            let tag = this.node.tag;
            let follow = this.motionStreaksNode.getChildByTag(tag);
            follow.getComponent(cc.MotionStreak).stroke = this.node.width;

            if(event.detail.addBall)
            {
                this.audioEngine.emit("playDoubleSound");
                let node = cc.instantiate(this.node);
                let ballsNum = this.ballsNode.children.length;
                this.ballsNode.addChild(node,1,ballsNum);
                let pos = cc.p(node.x,node.y);
                //let impulse = cc.v2(0,1000);
                let velocity = node.getComponent(cc.RigidBody).linearVelocity;
                velocity = cc.v2(-velocity.x,-velocity.y);
                // if(Math.abs(velocity.y)<500)
                // {
                //     velocity.y = 500;
                // }
                node.getComponent(cc.RigidBody).linearVelocity = velocity;
                //node.getComponent(cc.RigidBody).applyLinearImpulse(impulse,pos,true);
                node.getComponent(cc.RigidBody).gravityScale = 1;
                node.getComponent(cc.PhysicsCircleCollider).apply();
                //cc.log("split ball:"+this.ballsNode.children.length);

                let follow = cc.instantiate(this.motionStreak);
                this.motionStreaksNode.addChild(follow,1,ballsNum);
                follow.x = node.x;
                follow.y = node.y;
                follow.getComponent(cc.MotionStreak).stroke = node.width;
                follow.getComponent("MotionStreak").ball = node;

                let label = cc.instantiate(this.SplitUpLabel.node);
                this.playArea.addChild(label,2);
                label.x = this.node.x+cc.wltq.resolution.winWidth/2;
                label.y = this.node.y+20+cc.wltq.resolution.winHeight/2;                 
                label.runAction(cc.sequence(cc.spawn(cc.moveBy(1,0,50),cc.fadeOut(1)),cc.callFunc(function(){
                    this.playArea.removeChild(label);
                }.bind(this))));

            }            
        }        
    },
    
    onBeginContact(contact,selfCollider,otherCollider){
        //cc.log(otherCollider);
        let pos = cc.p(selfCollider.node.x,selfCollider.node.y);
        //cc.log(pos);   
        this._pos = pos; 
        //contact.disabled = true;   
        if(otherCollider.node.name === "Ground")
        {
            this._touchGround = true;      
            //cc.log("resume restitution");
            selfCollider.restitution = Config.restitution;
            selfCollider.apply();     
            
            let tag = selfCollider.node.tag;
            let follow = this.motionStreaksNode.getChildByTag(tag);
            //follow.getComponent(cc.MotionStreak).reset();
            //follow.active = false;
            //follow.getComponent(cc.MotionStreak).enabled = false;
            follow.getComponent(cc.MotionStreak).stroke = 0;
        }
        if(otherCollider.node.name === "AddBuff" || otherCollider.node.name === "DoubleBuff" )
        {
            contact.disabled = true;
        }
 
    },
    onPostSolve(contact,selfCollider,otherCollider){
        if(otherCollider.node.name === "Triangle" ||otherCollider.node.name === "Square" ||otherCollider.node.name === "Pentagon" ||otherCollider.node.name === "Circle" )
        {
            this.audioEngine.emit("playReboundSound");         
            let speed = cc.pDistance(cc.p(0,0),selfCollider.body.linearVelocity);            
            if(speed < 100)
            {               
                cc.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
                //contact.disabled = true;
                selfCollider.body.linearVelocity = cc.v2(selfCollider.body.linearVelocity.x*10,selfCollider.body.linearVelocity.y*10);
            }   
        }        
    },
    update (dt) {
        // this.node.rotation = 0;
        // cc.log(this.node.rotation);
        //return;
        if(this._touchGround)
        {   
            this._collider.restitution = 0;
            this._collider.apply();

            this.node.setColor(cc.color(255,255,0));
            this._rigidBody.active = false;
            //
            let points = this.getActionPoints(); 
            let topX = this._pos.x>0?-Config.edgeX:Config.edgeX;
            let topY = cc.wltq.resolution.winHeight/2;
            //cc.log(topX);
            //cc.log(topY);
            var act = cc.sequence(cc.cardinalSplineTo((Config.edgeX+Math.abs(this._pos.x))/Config.speed/2,points,1),
                        //cc.moveTo(1,cc.p(topX,topY)),
                        cc.callFunc(function(){ 
                            this.audioEngine.emit("playGotoTopSound");
                            let impulse = cc.v2(0,2000);                            
                            this._rigidBody.active = true;
                            //this._rigidBody.applyLinearImpulse(impulse,cc.p(this.node.x,this.node.y),true);
                            this._rigidBody.linearVelocity = impulse;
                            //this._rigidBody.gravityScale = 0;
                            //this._collider.apply();                                       
                        }.bind(this)),
                        cc.delayTime(1),
                        cc.callFunc(function(target,needChangeColor){
                            target.getComponent(cc.RigidBody).gravityScale = 1;
                            if(needChangeColor)
                            {
                                this.gameManager.emit("ChangeState",{state:GameState.GameShootEnd});
                                this._needChangeColor = false;
                            }
                        }.bind(this),this,this._needChangeColor),
                    );
            this.node.runAction(act);
            this._touchGround = false;
        }
    },
});
