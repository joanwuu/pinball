cc.Class({
    extends: cc.Component,

    properties: {
        startPanel:cc.Node,
        gameManager:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_END,this.StartGame,this);
    },

    start () {

    },
    StartGame(){
        this.startPanel.active = false;
        this.gameManager.emit("start");
    },

    // update (dt) {},
});
