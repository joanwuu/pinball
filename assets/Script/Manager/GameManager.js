var Config = require("Config");
var GameState = require("GameState");
var RandomUtils = require("RandomUtils");
cc.Class({
    extends: cc.Component,

    properties: {        
        ball:cc.Node,
        motionStreak:cc.Node,
        triangle:cc.Node,
        square:cc.Node,
        pentagon:cc.Node,
        circle:cc.Node,
        addBuff:cc.Node,
        doubleBuff:cc.Node,
        basket:cc.Node,
        //playArea:null,
        ballsNode:cc.Node,
        bricksNode:cc.Node,
        motionStreaksNode:cc.Node,
        ground:cc.Node,
        startPanel:cc.Node,
        audioEngine:cc.Node,
        _children:null,
        _ballsNum:0,
        //_startBall:null,
    },

    onLoad () {

        this.node.on("start",this.StartGame,this);       
        this.node.on("shoot",this.Shoot,this); 
        this.node.on("ChangeState",this.OnChangeState,this);
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        physicsManager.gravity = cc.v2(0,-1000);
        if(Config.debug)
        {
            physicsManager.debugDrawFlags = cc.PhysicsManager.DrawBits.e_pairBit |cc.PhysicsManager.DrawBits.e_shapeBit ;
        }
        //
        //cc.log("physics engine enabled");
        // |cc.PhysicsManager.DrawBits.e_pairBit | cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        //  cc.PhysicsManager.DrawBits.e_jointBit ;
        cc.wltq = {};
        cc.wltq.score = 0;
        cc.wltq.resolution = {};
        //cc.wltq.balls = new Array();
    },

    start () {
        cc.wltq.gameState = GameState.None;
        cc.wltq.level = 0;
        cc.wltq.score = 0;
    },
    GenerateBricks(needMove = true){
        let level = cc.wltq.level;        
        cc.wltq.level++;
        let bricksNum = RandomUtils.getGenerateBricksNum(level);
        let indexs = RandomUtils.getGenerateBricksIndexs(bricksNum,0).indexs;
        let checkNode = this.bricksNode.children;
        // indexs=new Array(0,1,2,3,4,5);
        //cc.log("level:"+level);       

        for(let i=0;i<indexs.length;i++)
        {      
            let index = indexs[i];     
            let shape = RandomUtils.getRandomShape(level);
            let brick = null;
            //shape = "addbuff";
            // if(cc.random0To1()>0.5)
            // {
            //     shape = "doublebuff";
            // }
            if(shape==="triangle")
            {
                brick = cc.instantiate(this.triangle);                     
                this.bricksNode.addChild(brick,1,level); 
                brick.emit("SetScore",{score:RandomUtils.getRandomScore(level)});         
                brick.emit("SetRotation",{rotation:RandomUtils.getRandomRotation()});
            }
            else if(shape==="square")
            {
                brick = cc.instantiate(this.square);               
                this.bricksNode.addChild(brick,1,level); 
                brick.emit("SetScore",{score:RandomUtils.getRandomScore(level)});
                brick.emit("SetRotation",{rotation:RandomUtils.getRandomRotation()});
            }
            else if(shape==="pentagon")
            {
                brick = cc.instantiate(this.pentagon);               
                this.bricksNode.addChild(brick,1,level); 
                brick.emit("SetScore",{score:RandomUtils.getRandomScore(level)});
                brick.emit("SetRotation",{rotation:RandomUtils.getRandomRotation()});
            }
            else if(shape==="circle")
            {
                brick = cc.instantiate(this.circle);                
                this.bricksNode.addChild(brick,1,level); 
                brick.emit("SetScore",{score:RandomUtils.getRandomScore(level)});
                brick.emit("SetRotation",{rotation:RandomUtils.getRandomRotation()});
            }
            else if(shape==="addbuff")
            {
                brick = cc.instantiate(this.addBuff);
                this.bricksNode.addChild(brick,1,level); 
                brick.emit("runAction");                
            }
            else if(shape==="doublebuff")
            {
                brick = cc.instantiate(this.doubleBuff)
                this.bricksNode.addChild(brick,1,level);
                brick.emit("runAction");  
            }    
            
            let bottomOffset = cc.wltq.resolution.brickBottomMargin;
            let leftOffset = (cc.wltq.resolution.winWidth - cc.wltq.resolution.activeWidth)/2;            
            brick.x = index*(1+Config.bricksMargin)*cc.wltq.resolution.brickWidth+leftOffset - cc.wltq.resolution.winWidth/2+cc.wltq.resolution.brickWidth/2+Config.bricksMargin*cc.wltq.resolution.brickWidth;
            brick.y = -1*(1+Config.bricksMargin)*cc.wltq.resolution.brickWidth+cc.wltq.resolution.brickWidth/2+cc.wltq.resolution.adsAreaHeight+bottomOffset+60;
        } 
     
        let children = this.bricksNode.children;    
        let moveTime = 0;   
        for(let i=0;i<children.length;i++)
        {
            if((level-children[i].tag)>(cc.wltq.rawNum-1) && (children[i].name==="AddBuff" || children[i].name === "DoubleBuff"))
            {
                children[i].active = false;//mark for delelte
            }
            if(needMove)
            {
                moveTime = 0.8;
                let action = cc.sequence(cc.moveBy(moveTime,cc.p(0,(1+Config.bricksMargin)*cc.wltq.resolution.brickWidth)),cc.callFunc(function(){                    
                    //cc.log("move");
                }));
                children[i].runAction(action);
            }
            else
            {
                children[i].y += (1+Config.bricksMargin)*cc.wltq.resolution.brickWidth;
            }            
        }   
        let gameOver = false;
        let shakeTime = 0;
        let needShake = false;
        //children = this.bricksNode.children;   
        for(let i=0;i<children.length;i++)
        {
            if((level-children[i].tag)>(cc.wltq.rawNum-3) && (children[i].name!=="AddBuff" && children[i].name !== "DoubleBuff"))
            {               
                needShake = true;               
            }
            if((level-children[i].tag)>(cc.wltq.rawNum-2) && (children[i].name!=="AddBuff" && children[i].name !== "DoubleBuff"))
            {
                gameOver = true;
            }
        }
        if(needShake)
        {
            shakeTime = 1;
            //let shakePos = new Array();
            let distance = 5;
            // for(let i=0;i<10;i++)
            // {
            //     shakePos.push(cc.v2(cc.randomMinus1To1()*distance,cc.randomMinus1To1()*distance));
            // }
            
            for(let i=0;i<children.length;i++)
            {
                
                let x = children[i].x;
                let y = children[i].y+(1+Config.bricksMargin)*cc.wltq.resolution.brickWidth;
                let action = cc.sequence(cc.delayTime(moveTime+0.01),
                cc.moveTo(0.05,x+cc.randomMinus1To1()*distance,y+cc.randomMinus1To1()*distance),
                cc.moveTo(0.05,x+cc.randomMinus1To1()*distance,y+cc.randomMinus1To1()*distance),
                cc.moveTo(0.05,x+cc.randomMinus1To1()*distance,y+cc.randomMinus1To1()*distance),
                cc.moveTo(0.05,x+cc.randomMinus1To1()*distance,y+cc.randomMinus1To1()*distance),
                cc.moveTo(0.05,x+cc.randomMinus1To1()*distance,y+cc.randomMinus1To1()*distance),
                cc.moveTo(0.05,x+cc.randomMinus1To1()*distance,y+cc.randomMinus1To1()*distance),
                cc.moveTo(0.05,x+cc.randomMinus1To1()*distance,y+cc.randomMinus1To1()*distance),
                cc.moveTo(0.05,x+cc.randomMinus1To1()*distance,y+cc.randomMinus1To1()*distance),
                cc.moveTo(0.05,x+cc.randomMinus1To1()*distance,y+cc.randomMinus1To1()*distance),
                cc.moveTo(0.05,x+cc.randomMinus1To1()*distance,y+cc.randomMinus1To1()*distance),
                cc.moveTo(0.05,x+cc.randomMinus1To1()*distance,y+cc.randomMinus1To1()*distance),
                cc.moveTo(0.05,x+cc.randomMinus1To1()*distance,y+cc.randomMinus1To1()*distance),
                cc.moveTo(0.05,x+cc.randomMinus1To1()*distance,y+cc.randomMinus1To1()*distance),
                cc.moveTo(0.05,x+cc.randomMinus1To1()*distance,y+cc.randomMinus1To1()*distance),
                cc.moveTo(0.05,x+cc.randomMinus1To1()*distance,y+cc.randomMinus1To1()*distance),
                cc.moveTo(0.05,x+cc.randomMinus1To1()*distance,y+cc.randomMinus1To1()*distance),
                cc.moveTo(0.05,x+cc.randomMinus1To1()*distance,y+cc.randomMinus1To1()*distance),
                cc.moveTo(0.05,x+cc.randomMinus1To1()*distance,y+cc.randomMinus1To1()*distance),
                cc.moveTo(0.05,x+cc.randomMinus1To1()*distance,y+cc.randomMinus1To1()*distance),
                cc.moveTo(0.05,x,y));
                if((level-children[i].tag)>(cc.wltq.rawNum-3)&& gameOver === false  && (children[i].name!=="AddBuff" && children[i].name !== "DoubleBuff"))
                {               
                    children[i].runAction(action);
                }
                if((level-children[i].tag)>(cc.wltq.rawNum-2) && (children[i].name!=="AddBuff" && children[i].name !== "DoubleBuff"))
                {
                    children[i].runAction(action);
                }
            }
        }
        
        this.bricksNode.runAction(cc.sequence(cc.delayTime(moveTime+shakeTime+0.02),cc.callFunc(function(){
            if( gameOver)
            {
                this.GameOver();
            }
            else
            {
                cc.wltq.gameState = GameState.GameIdle; 
            }

        }.bind(this))));
        
    },
    
    StartGame(){
        cc.wltq.gameState = GameState.GameIdle;
        cc.wltq.score = 0;
        cc.wltq.level = 0;

        this.bricksNode.removeAllChildren(true);
        this.ballsNode.removeAllChildren(true);
        this.motionStreaksNode.removeAllChildren(true);
        this.ground.getComponent("Ground")._receiveBallsNum = 0;

        //cc.wltq.balls = new Array();
        var ball = cc.instantiate(this.ball);
        ball.x = 0;
        ball.y = 460+cc.wltq.resolution.modifyHeight;      
        this.ballsNode.addChild(ball,1,0);
        ball.group="shootball";
        ball.getComponent(cc.PhysicsCircleCollider).apply();
        ball.getComponent(cc.RigidBody).active = false;

        let follow = cc.instantiate(this.motionStreak);
        this.motionStreaksNode.addChild(follow,1,0);
        follow.x = ball.x;
        follow.y = ball.y;
        follow.getComponent(cc.MotionStreak).stroke = ball.width;
        follow.getComponent("MotionStreak").ball = ball;



        this._children = this.ballsNode.children;
        this._ballsNum = this._children.length;       

        for(let i=0;i<3;i++){
            this.GenerateBricks(false);
        }
        
                
        //cc.director.getScheduler().schedule(this.GenerateBricks, this, 1,cc.wltq.rawsNum,0,false);
    },
    GameOver(){
        this.startPanel.active = true;
    },
    Shoot(event){        
        cc.wltq.angle = event.detail.angle/180*Math.PI;       
        // let rigidBody = this._startBall.getComponent(cc.RigidBody);
        // let collider = this._startBall.getComponent(cc.PhysicsCircleCollider);
        
        // this._startBall.group = "shootedball";
        // let angle = cc.wltq.angle;
        // let pos = cc.p(this._startBall.x,this._startBall.y);
        // let impulse = cc.v2(-Math.sin(angle)*Config.speed,-Math.cos(angle)*Config.speed);        
        
        // collider.restitution = 0.6;
        // collider.apply();
        // rigidBody.applyLinearImpulse(impulse,pos,true);
        // rigidBody.gravityScale = 0.000001;
        // rigidBody.active = true;

        if(this._ballsNum)
        {
            this.schedule(this.ShootABall,0.2,this._ballsNum-1,0); 
        }        
        cc.wltq.gameState = GameState.GameShooting;
    },
    ShootABall(){
        let ret = this.getMinDistanceBall();
        let ball = ret.ball;       

        //cc.log("distance:"+ret.distance);
        let ratio =1;
        if(ball.getComponent("Ball")._size ===2)
        {
            //ratio = 1.6;
        }
        ball.group = "shootedball";
        let collider = ball.getComponent(cc.PhysicsCircleCollider);
        let rigidBody = ball.getComponent(cc.RigidBody);
        let angle = cc.wltq.angle;
        let pos = cc.p(ball.x,ball.y);
        let impulse = cc.v2(-Math.sin(angle)*Config.speed*ratio,-Math.cos(angle)*Config.speed*ratio);        
       

        if(ret.distance<10)
        {
            let posB = cc.p(0,460+cc.wltq.resolution.modifyHeight);
            let action = cc.sequence(cc.moveTo(0.2,posB),cc.callFunc(function(){
                
                //rigidBody.applyLinearImpulse(impulse,posB,true);
                //rigidBody.applyForceToCenter(impulse,true);
                this.audioEngine.emit("playLaunchSound");
                rigidBody.linearVelocity = impulse;
                rigidBody.gravityScale = 0;
                rigidBody.active = true;
                collider.restitution = Config.restitution;
                collider.apply();
               
                ball.getComponent("Ball")._reseted = false;
                let tag = ball.tag;
                let follow = this.motionStreaksNode.getChildByTag(tag);
                //follow.active = true;
                //follow.getComponent(cc.MotionStreak).enabled = true;
                //follow.getComponent(cc.MotionStreak).reset();      
                follow.getComponent(cc.MotionStreak).stroke = ball.width;          
                
            }.bind(this)));
            ball.runAction(action);
        }
        else
        {
            let posA = cc.p(0,460+cc.wltq.resolution.modifyHeight+42);
            let posB = cc.p(0,460+cc.wltq.resolution.modifyHeight);
            let action = cc.sequence(cc.moveTo(0.1,posA),cc.moveTo(0.1,posB),cc.callFunc(function(){
                this.audioEngine.emit("playLaunchSound");
                //rigidBody.applyLinearImpulse(impulse,posB,true);
                //rigidBody.applyForceToCenter(impulse,true);
                rigidBody.linearVelocity = impulse;
                rigidBody.gravityScale = 0;
                rigidBody.active = true;
                collider.restitution = Config.restitution;
                collider.apply();
               
                ball.getComponent("Ball")._reseted = false;
                let tag = ball.tag;
                let follow = this.motionStreaksNode.getChildByTag(tag);
                //follow.active = true;
                //follow.getComponent(cc.MotionStreak).enabled = true;      
                //follow.getComponent(cc.MotionStreak).reset();
                follow.getComponent(cc.MotionStreak).stroke = ball.width;
                         
                
            }.bind(this)));
            ball.runAction(action);       
        }      
        
    },
    OnChangeState(event){
        let state = event.detail.state;
        //cc.log("stateChange");
        if(state === GameState.GameShootEnd && cc.wltq.gameState === GameState.GameShooting)
        {
            let balls = this.ballsNode.children;
            for(let i=0;i<balls.length;i++)
            {
                balls[i].setColor(cc.color(255,255,255));
                balls[i].group="shootball";
                //balls[i].zIndex = 2;
                balls[i].getComponent(cc.RigidBody).gravityScale = 1;
                balls[i].getComponent(cc.PhysicsCircleCollider).apply();
            }
            //this.GenerateBricks();
            //this.GoToBasket();
            cc.wltq.gameState = GameState.GameShootEnd;
            this._children = this.ballsNode.children;
            this._ballsNum = this._children.length;
            let ret = this.getMinDistanceBall();
            let ball = ret.ball;
            //cc.log(ball);
            //cc.log(ret.distance);
            let posA = cc.p(0,460+cc.wltq.resolution.modifyHeight+42);
            let posB = cc.p(0,460+cc.wltq.resolution.modifyHeight);
            let action = cc.sequence(cc.moveTo(0.1,posA),cc.moveTo(0.1,posB),cc.callFunc(function(){
                //cc.log("reset position");
                //ball.setColor(cc.color(255,0,0));
                this.GenerateBricks(true);                
            }.bind(this)));
            ball.runAction(action);
        }
        else if(state === GameState.GameIdle && cc.wltq.gameState === GameState.GameShootEnd)
        {
            //cc.wltq.gameState = GameState.GameIdle;
        }
        else if(state === GameState.GameShooting && cc.wltq.gameState === GameState.GameIdle)
        {
            cc.wltq.gameState = GameState.GameShooting;
        }       
        else {
            cc.log("wrong state change: now:"+cc.wltq.gameState+" new:"+state);
        } 
    },
    getMinDistanceBall(){
        let children = this._children;
        let ballsNum = this._ballsNum;
        let minDistance = 720*1280;
        let index = 0;
        //cc.log("getMinDistanceBall");
        
        
        for(let i=0;i<ballsNum;i++)
        {
            
            //cc.log(cc.p(children[i].x,children[i].y));
            //cc.log(cc.p(0,460+cc.wltq.resolution.modifyHeight));
            let distance = cc.pDistance(new cc.v2(children[i].x,children[i].y),new cc.v2(0,460+cc.wltq.resolution.modifyHeight));
            //cc.log(distance);
            //cc.log(children[i].group)
            if(distance<minDistance && children[i].group === "shootball")
            {
                index = i;
                minDistance = distance;
            }
        }
        //children[i].group = "shootedball";
        
        let collider = children[index].getComponent(cc.PhysicsCircleCollider);
        let rigidBody = children[index].getComponent(cc.RigidBody);
        rigidBody.active = false;
        collider.apply();
        
        //cc.log(index);
        return {ball:children[index],distance:minDistance};
    },
    update (dt) {},
});
