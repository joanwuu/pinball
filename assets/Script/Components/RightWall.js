
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
    init(event)
    {
        let modifyHeight = event.detail.modifyHeight; 
        this._collider.size.height += modifyHeight;          
        //this._collider.offset.y = 60+this._collider.size.height/2;
        this._collider.apply();
        cc.log(this.node);
    },
    onBeginContact(contact,selfCollider,otherCollider){
        if(otherCollider.node.group === "shootedball" && otherCollider.body.getComponent(cc.RigidBody).gravityScale<1)
        {
            otherCollider.body.getComponent(cc.RigidBody).gravityScale = 1;
        }
    },
    start () {

    },

    // update (dt) {},
});
