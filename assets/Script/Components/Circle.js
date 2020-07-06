var RandomUtils = require("RandomUtils");
cc.Class({
    extends: cc.Component,

    properties: {
        _collider:null,
        scoreLabel:cc.Label,
        bricksNode:cc.Node,
        particle:cc.Node,
        playArea:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("init",this.init,this);
        this.node.on("SetScore",this.SetScore,this);
        this.node.on("SetRotation",this.SetRotation,this);
        this._collider = this.getComponent(cc.PhysicsCircleCollider);
    },
    init(event){
        this.node.width *= event.detail.ratio;
        this.node.height *= event.detail.ratio;
        this.scoreLabel.fontSize = Math.round(this.scoreLabel.fontSize*event.detail.ratio);
        this.scoreLabel.lineHeight = Math.round(this.scoreLabel.lineHeight*event.detail.ratio);

        this._collider.radius *= event.detail.ratio;
        this._collider.apply();
    },
    SetScore(event){
        let score = event.detail.score;
        this.scoreLabel.string = score;
        let rgb = RandomUtils.hsv2rgb(0.1+score/50,1,1);       
        this.node.setColor(cc.color(rgb.r,rgb.g,rgb.b));
    },
    SetRotation(event){
        let rotation = event.detail.rotation;
        this.node.rotation = rotation;
        this.scoreLabel.node.rotation = -rotation;
    },
    onBeginContact(contact,selfCollider,otherCollider){
        if(otherCollider.node.group === "shootedball" && otherCollider.body.getComponent(cc.RigidBody).gravityScale<1)
        {
            otherCollider.body.getComponent(cc.RigidBody).gravityScale = 1;
        }

        let score = this.scoreLabel.string;
        let size = otherCollider.getComponent("Ball")._size;
        if(score === 1)
        {
            if(selfCollider.node.isChildOf(this.bricksNode))
            {
                this.bricksNode.removeChild(selfCollider.node);
                cc.wltq.score++;
                let pNode = cc.instantiate(this.particle);
                pNode.active = true;
                pNode.x = selfCollider.node.x+360;
                pNode.y = selfCollider.node.y;
                pNode.getComponent(cc.ParticleSystem).autoRemoveOnFinish = true;
                this.playArea.addChild(pNode);
            }
        }
        else if(score ===2 && size ===2)
        {
            if(selfCollider.node.isChildOf(this.bricksNode))
            {
                this.bricksNode.removeChild(selfCollider.node);
                cc.wltq.score += 2;
                let pNode = cc.instantiate(this.particle);
                pNode.active = true;
                pNode.x = selfCollider.node.x+360;
                pNode.y = selfCollider.node.y;
                pNode.getComponent(cc.ParticleSystem).autoRemoveOnFinish = true;
                this.playArea.addChild(pNode);
            }            
        }        
        else if(size === 2)
        {
            cc.wltq.score+=2;
            this.node.emit("SetScore",{score:score-2});
        }
        else{
            cc.wltq.score++;
            this.node.emit("SetScore",{score:score-1});
        }
        
        
    },
    onPostSolve(contact,selfCollider,otherCollider){
        
    },
    start () {

    },

    // update (dt) {},
});
