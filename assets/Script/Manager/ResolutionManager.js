var Config = require("Config");

cc.Class({
    extends: cc.Component,

    properties: {
        ground:cc.Node,
        wall:cc.Node,
        aidBall:cc.Node,
        basket:cc.Node,
        ball:cc.Node,
        aimNode:cc.Node,
        arrow:cc.Node,
        time:cc.Node,
        score:cc.Node,

        triangle:cc.Node,
        square:cc.Node,
        pentagon:cc.Node,
        circle:cc.Node,
        addBuff:cc.Node,
        doubleBuff:cc.Node,
        //adsArea:cc.Node,
        //playArea:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {
        let winWidth = cc.director.getWinSize().width;
        //let ratio = winWidth/720;
        //cc.log("resolution ratio:"+ratio);
        let winHeight = cc.director.getWinSize().height;
        cc.log("winsize x:"+winWidth+" y:"+winHeight);

        let srcHeight = this.wall.height;
        let adsAreaHeight = Config.adsAreaHeight;//*ratio;
        let topHeight = Config.topHeight;
        let playAreaHeight = winHeight - adsAreaHeight - topHeight;

        let modifyHeight = playAreaHeight - srcHeight;
        cc.log("modifyHeight:"+modifyHeight);
        
        cc.wltq.resolution.winWidth = winWidth;
        cc.wltq.resolution.winHeight = winHeight;
        cc.wltq.resolution.modifyHeight = modifyHeight;
        cc.wltq.resolution.playAreaHeight = playAreaHeight;
        cc.wltq.resolution.adsAreaHeight = adsAreaHeight;
        cc.wltq.resolution.activeWidth = Config.activeWidth;
        cc.wltq.resolution.activeHeight = Config.activeHeight+modifyHeight;
        cc.wltq.resolution.brickWidth = cc.wltq.resolution.activeWidth/((Config.bricksNumPerRaw+1)*Config.bricksMargin+(Config.bricksNumPerRaw));        
        cc.wltq.rawNum = Math.round(cc.wltq.resolution.activeHeight/(cc.wltq.resolution.brickWidth*(1+Config.bricksMargin))-0.2);
        
        cc.log("cc.wltq.resolution.brickWidth:"+cc.wltq.resolution.brickWidth);
        cc.log("cc.wltq.rawNum:"+cc.wltq.rawNum);
        let ratio = cc.wltq.resolution.brickWidth/69;
        cc.wltq.resolution.brickBottomMargin = cc.wltq.resolution.activeHeight - cc.wltq.rawNum*(cc.wltq.resolution.brickWidth*(1+Config.bricksMargin));
        cc.log("ratio:"+ratio);

        
        //this.adsArea.emit("init",{x:0,y:winHeight/2*(-1),width:winWidth,height:adsAreaHeight});
        //this.playArea.emit("init",{x:0,y:winHeight/2*(-1)+adsAreaHeight,width:winWidth,height:playAreaHeight});
        this.ground.emit("init",{x:0,y:winHeight/2*(-1),width:winWidth,height:adsAreaHeight});
        this.wall.emit("init",{x:0,y:winHeight/2*(-1)+adsAreaHeight,width:winWidth,height:playAreaHeight,modifyHeight:modifyHeight});
        this.aidBall.emit("init",{x:0,y:winHeight/2*(-1)+adsAreaHeight,width:winWidth,height:playAreaHeight,modifyHeight:modifyHeight});
        this.basket.emit("init",{x:0,y:winHeight/2*(-1)+adsAreaHeight,width:winWidth,height:playAreaHeight,modifyHeight:modifyHeight});
        this.ball.emit("init",{modifyHeight:modifyHeight});
        this.aimNode.emit("init",{modifyHeight:modifyHeight});
        this.arrow.emit("init",{modifyHeight:modifyHeight});
        this.time.emit("init",{modifyHeight:modifyHeight});
        this.score.emit("init",{modifyHeight:modifyHeight});
        this.triangle.emit("init",{ratio:ratio});
        this.square.emit("init",{ratio:ratio});
        this.pentagon.emit("init",{ratio:ratio});
        this.circle.emit("init",{ratio:ratio});
        this.addBuff.emit("init",{ratio:ratio});
        this.doubleBuff.emit("init",{ratio:ratio});
    },

    update (dt) {},
});
