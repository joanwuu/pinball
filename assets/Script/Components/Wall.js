var Config = require("Config");
cc.Class({
    extends: cc.Component,

    properties: {
        leftWall:cc.Node,
        rightWall:cc.Node,
        leftTopWall:cc.Node,
        rightTopWall:cc.Node,
        leftEdge:cc.Node,
        rightEdge:cc.Node,
        topEdge:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("init",this.init,this);        
    },
    init(event){
        this.node.x = event.detail.x;
        this.node.y = event.detail.y;
        this.node.width = event.detail.width;
        this.node.height = event.detail.height;
        
        let modifyHeight = event.detail.modifyHeight;
        this.leftWall.emit("init",{y:event.detail.y,modifyHeight:modifyHeight});
        this.rightWall.emit("init",{y:event.detail.y,modifyHeight:modifyHeight});
        this.leftTopWall.emit("init",{y:event.detail.y,modifyHeight:modifyHeight});
        this.rightTopWall.emit("init",{y:event.detail.y,modifyHeight:modifyHeight});
        this.leftEdge.emit("init",{y:event.detail.y,modifyHeight:modifyHeight});
        this.rightEdge.emit("init",{y:event.detail.y,modifyHeight:modifyHeight});
        this.topEdge.emit("init",{y:event.detail.y,modifyHeight:modifyHeight});
        cc.log(this.node);
        
        // cc.log(this.node);

        // this._leftCollider.offset.y = this._leftCollider.offset.y+modifyHeight;
        // this._rightCollider.offset.y = this._rightCollider.offset.y+modifyHeight;
        
    
        // for(let i=0;i<this._leftTopCollider.points.length;i++)
        // {
        //     this._leftTopCollider.points[i].y += modifyHeight;            
        // }
        // for(let i=0;i<this._rightTopCollider.points.length;i++)
        // {
        //     this._rightTopCollider.points[i].y += modifyHeight;            
        // }
        // this._rightTopCollider.apply();
       
    },
    start () {

    },

    update (dt) {
       
    },
});
