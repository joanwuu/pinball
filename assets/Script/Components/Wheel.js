// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("init",this.init,this);
    },

    init(event){
        if(event.detail.direction ==="clockwise")
        {
            let act = cc.repeatForever(cc.rotateBy(0.75,330));
            this.node.runAction(act);
        }
        else if(event.detail.direction === "anticlockwise"){
            let act = cc.repeatForever(cc.rotateBy(0.75,-330));
            this.node.runAction(act);
        }
        
    },
    start () {

    },

    update (dt) {},
});
