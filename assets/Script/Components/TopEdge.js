cc.Class({
    extends: cc.Component,

    properties: {
        _collider:null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("init",this.init,this);
        this._collider = this.getComponent(cc.PhysicsChainCollider);
    },
    init(event){
        let modifyHeight = event.detail.modifyHeight;
        for(let i = 0;i<this._collider.points.length;i++)
        {
            this._collider.points[i].y +=  modifyHeight/2;
        }
        this._collider.apply();
    },
    onPostSolve(contact,selfCollider,otherCollider){
        //contact.setRestitution(0);        
    },

    start () {

    },

    // update (dt) {},
});
