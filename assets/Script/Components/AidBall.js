var Config = require("Config");
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("init",this.init,this);    
        
    },
    init(event){
        this.node.y += event.detail.modifyHeight/2;        
    },
    start () {

    },
    onBeginContact(contact,selfCollider,otherCollider){        
        //cc.log(otherCollider.node.group); 
    },

    update (dt) {},
});
