// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,
    properties: {
        launch: {
            url: cc.AudioClip,
            default: null
        },
        rebound: {
            url: cc.AudioClip,
            default: null
        },
        newball: {
            url: cc.AudioClip,
            default: null
        },
        double: {
            url: cc.AudioClip,
            default: null
        },
        gototop: {
            url: cc.AudioClip,
            default: null
        },
    },

    onLoad: function () {
        this.node.on("playLaunchSound",this.playLaunchSound,this);
        this.node.on("playNewballSound",this.playNewballSound,this);
        this.node.on("playReboundSound",this.playReboundSound,this);
        this.node.on("playDoubleSound",this.playDoubleSound,this);
        this.node.on("playGotoTopSound",this.playGotoTopSound,this);
    },
    playLaunchSound(){
        this.current = cc.audioEngine.play(this.launch, false, 1);
    },
    playNewballSound(){
        this.current = cc.audioEngine.play(this.newball, false, 1);
    },
    playReboundSound()
    {
        this.current = cc.audioEngine.play(this.rebound, false, 1);
    },
    playDoubleSound(){
        this.current = cc.audioEngine.play(this.double, false, 1);
    },
    playGotoTopSound(){
        this.current = cc.audioEngine.play(this.gototop, false, 1);
    },
    onDestroy: function () {
        cc.audioEngine.stop(this.current);
    }
});
