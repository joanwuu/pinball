var Config = require("Config");

var RandomUtils=(function(){
    
    var getRandomShape = function(level)
    {
        let rand = cc.random0To1()*60;
        let ret = "square";
        if(level<50)
        {
            if(rand<10)
            {
                ret = "triangle";
            }
            else if(rand<20){
                ret = "square";
            }
            else if(rand<30){
                ret = "pentagon";
            }
            else if(rand<40){
                ret = "circle";
            }
            else if(rand<50){
                ret = "addbuff";
            }
            else if(rand<60){
                ret = "doublebuff";
            }
        }
        else if(level<75)
        {
            if(rand<11)
            {
                ret = "triangle";
            }
            else if(rand<22){
                ret = "square";
            }
            else if(rand<33){
                ret = "pentagon";
            }
            else if(rand<44){
                ret = "circle";
            }
            else if(rand<52){
                ret = "addbuff";
            }
            else if(rand<60){
                ret = "doublebuff";
            }
        }else if(level<100)
        {
            if(rand<12)
            {
                ret = "triangle";
            }
            else if(rand<24){
                ret = "square";
            }
            else if(rand<36){
                ret = "pentagon";
            }
            else if(rand<48){
                ret = "circle";
            }
            else if(rand<54){
                ret = "addbuff";
            }
            else if(rand<60){
                ret = "doublebuff";
            }
        }else{
            if(rand<14)
            {
                ret = "triangle";
            }
            else if(rand<28){
                ret = "square";
            }
            else if(rand<42){
                ret = "pentagon";
            }
            else if(rand<56){
                ret = "circle";
            }
            else if(rand<58){
                ret = "addbuff";
            }
            else if(rand<60){
                ret = "doublebuff";
            }
        }
        
        return ret;
    };
    var getRandomRotation = function(){
        let rand = cc.random0To1()*6;
        let ret = 0;
        if(rand<1)
        {
            ret = 0;
        }
        else if(rand<2){
            ret = 15;
        }
        else if(rand<3){
            ret = 30;
        }
        else if(rand<4){
            ret = 45;
        }
        else if(rand<5){
            ret = 60;
        }
        else if(rand<6){
            ret = 75;
        }
        return ret;
    };
    var getRandomScore = function(level){
        let ret = level * scoreRatio(level);
        let rand = cc.random0To1();
        if(rand <0.3)
        {
            ret -= 1;
        }else if(rand<0.4)
        {
            ret -= 2;
        }
        else if(rand>0.7)
        {
            ret +=1;
        }
        else if(rand>0.6)
        {
            ret +=2;
        }
        if(ret <1)
        {
            ret =1;
        }
        return ret;
    };
    var scoreRatio = function(level){
        let rand = cc.random0To1();
        let ratio = 1;
        if(level<4)
        {
            if(rand<0.2)
            {
                ratio = 2;
            }
        }
        else if (level<10)
        {
            if(rand<0.3)
            {
                ratio = 2;
            }else if(rand<0.4)
            {
                ratio = 3;
            }
        }
        else
        {
            if(rand<0.4)
            {
                ratio = 2;
            }else if(rand<0.5)
            {
                ratio = 3;
            }
        }
        return ratio;
    };


    var hsv2rgb = function(h, s, v) {
		var r, g, b;
		if ( s == 0 ) {
			r = v * 255;
			g = v * 255;
			b = v * 255;
		} else {
			var var_h = h * 6;
			if ( var_h == 6 ) {
				var_h = 0;
			}
			
			var var_i = Math.floor( var_h );
			var var_1 = v * ( 1 - s );
			var var_2 = v * ( 1 - s * ( var_h - var_i ) );
			var var_3 = v * ( 1 - s * ( 1 - ( var_h - var_i ) ) );
            var var_r,var_g,var_b;
			if ( var_i == 0 ) {
				var_r = v;
				var_g = var_3;
				var_b = var_1;
			} else if ( var_i == 1 ) {
				var_r = var_2;
				var_g = v;
				var_b = var_1;
			} else if ( var_i == 2 ) {
				var_r = var_1;
				var_g = v;
				var_b = var_3
			} else if ( var_i == 3 ) {
				var_r = var_1;
				var_g = var_2;
				var_b = v;
			} else if ( var_i == 4 ) {
				var_r = var_3;
				var_g = var_1;
				var_b = v;
			} else {
				var_r = v;
				var_g = var_1;
				var_b = var_2
			}

			r = var_r * 255
			g = var_g * 255
			b = var_b * 255

		}
		return  {
			r: Math.round(r),
			g: Math.round(g),
			b: Math.round(b)
		};
    }
    var getGenerateBricksNum = function(level){
        var newBlockCount = 3;
        if(level>50)
        {
            newBlockCount = 4;
        }
        else if(level>75)
        {
            newBlockCount = 5;
        }
        else if(level>100){
            newBlockCount = 6;
        }
        var random = cc.random0To1();
        if(random > 0.5) {
            newBlockCount = 1 + Math.floor((random-0.5)*2*(Config.bricksNumPerRaw));
        }
        if(newBlockCount>(Config.bricksNumPerRaw))
        {
            newBlockCount = Config.bricksNumPerRaw;//max 6
        }        
        return newBlockCount;
    };
    // var getGenerateExtraBallsNum = function(level,count){
    //     var extraBallsNum =1;
    //     var random = cc.random0To1();
    //     if(level<10 && random>0.5)
    //     {
    //         extraBallsNum = 2;
    //     }else if(level<20 && random > 0.7)
    //     {
    //         extraBallsNum = 2;
    //     }
    //     return extraBallsNum;
    // };
    var getGenerateBricksIndexs= function(brickCount,extralBallCount){
        var availablePos = new Array();
        for(var i=0;i<Config.bricksNumPerRaw;i++)
        {
            availablePos.push(i);
        }

        var indexs = new Array();
        for(var i=0;i<brickCount;i++)
        {
            var posIndex =  Math.floor(cc.random0To1()*availablePos.length);
            var pos = availablePos[posIndex];
            availablePos.splice(posIndex, 1);
            indexs.push(pos);
        }
        var extraballIndexs = new Array();
        for(var i=0;i<extralBallCount;i++)
        {
            var posIndex =  Math.floor(cc.random0To1()*availablePos.length);
            var pos = availablePos[posIndex];
            availablePos.splice(posIndex, 1);
            extraballIndexs.push(pos);
        }
        
        return {"indexs":indexs,
                "extraballPos":extraballIndexs,
            };
    };
    return {        
        hsv2rgb:hsv2rgb,
        getRandomShape:getRandomShape,
        getRandomRotation:getRandomRotation,
        getRandomScore:getRandomScore,
        getGenerateBricksNum:getGenerateBricksNum,
        getGenerateBricksIndexs:getGenerateBricksIndexs,
    };
    

})();
module.exports = RandomUtils;