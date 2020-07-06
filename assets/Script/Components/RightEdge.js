
cc.Class({
    extends: cc.Component,

    properties: {
        _collider:null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("init",this.init,this);
        this._collider = this.getComponent(cc.PhysicsBoxCollider);
    },
    init(event){
        let modifyHeight = event.detail.modifyHeight;    
        this._collider.size.height += modifyHeight;
        //this._collider.offset.y -= 100;
        this._collider.apply();
    },
    start () {

    },

    // update (dt) {},
});
