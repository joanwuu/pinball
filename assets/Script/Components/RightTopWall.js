cc.Class({
    extends: cc.Component,

    properties: {
        _collider:null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("init",this.init,this); 
        this._collider = this.getComponent(cc.PhysicsPolygonCollider);   
    },
    init(event){
        let modifyHeight = event.detail.modifyHeight;
        for(let i=0;i<this._collider.points.length;i++)
        {
            this._collider.points[i].y += modifyHeight/2;            
        }
        this._collider.apply();     
        cc.log(this.node); 
    },
    start () {

    },

    // update (dt) {},
});
