var GameState = require("GameState");
cc.Class({
    extends: cc.Component,

    properties: {
        aimNode:cc.Node,
        arrowNode:cc.Node,
        gameManager:cc.Node,
        _angle:null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.OnTouchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.OnTouchMove,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.OnTouchEnd,this);
    },
    
    
    start () {

    },
    OnTouchStart(event){
        if(cc.wltq.gameState !== GameState.GameIdle)
        {
            return;
        }
        this.aimNode.active = true;
        this.arrowNode.active = true;
        this.adjustAimNode(event.getLocation());
    },
    OnTouchMove(event){
        if(cc.wltq.gameState !== GameState.GameIdle)
        {
            return;
        }
        this.aimNode.active = true;
        this.arrowNode.active = true;
        this.adjustAimNode(event.getLocation());
    },
    OnTouchEnd(event){     
        if(cc.wltq.gameState !== GameState.GameIdle)
        {
            return;
        }   
        this.adjustAimNode(event.getLocation());
        this.aimNode.active = false;
        this.arrowNode.active = false;
        this.gameManager.emit("shoot",{angle:this._angle});
    },
    adjustAimNode(pos){        
        var maxAimLength = 1020;
        //cc.log(pos);
        //cc.log(cc.p(this.aimNode.x,this.aimNode.y));
        var distance = cc.pDistance(pos,cc.p(this.aimNode.x,this.aimNode.y));
        var scale = distance/maxAimLength;
        if(scale>1.0)
        {
            scale =1.0;
        }
        if(scale<0.3)
        {
            scale = 0.3;
        }
        var angle = (this.aimNode.x - pos.x)/360*75;
        this.aimNode.scale = scale;
        this.aimNode.rotation = angle;
        this.arrowNode.rotation = angle;
        this._angle = angle;

        // var offset = this._ballWidth + this._arrowHeight;
        // for(var i=0;i<Config.aimBallNum;i++)
        // {            
        //     var node = this.aimArrow.getChildByTag(i);
        //     node.scale = scale;
        //     node.y = offset +maxAimLength/(Config.aimBallNum-1)*i*scale;
        // }

        // var ratio = (pos.x-cc.ttdfk.shootPos.x)/(pos.y - cc.ttdfk.shootPos.y-Config.adsAreaHeight);         
        // var angle = Math.atan(ratio)*180/Math.PI;
        // if(cc.ttdfk.gameState !== GameState.GameShooting)
        // {
        //     this._aimAngle = angle;
        // }       
        // this.node.rotation = angle;
        // //cc.log(angle);
        // if((angle>Config.minAimAngle)||(angle<-1*Config.minAimAngle)||(pos.y - cc.ttdfk.shootPos.y-Config.adsAreaHeight)<0)
        // {
        //     this.aimArrow.active = false; 
        // }
        // else{
        //     this.aimArrow.active = true; 
        // }
    },

    update (dt) {},
});
