var ChainPointsUtils = (function(){
    let getGroundPoints = function(engineLevel,offsetY){
        let ret = new Array();
        let pointsNum = 72;
        if(engineLevel === "low")
        {
            pointsNum = 36;
        }
        else if(engineLevel === "middle")
        {
            pointsNum = 48;
        }
        let offsets = getCircleOffsets(1140,720,pointsNum);        
        for(let i = 0;i<=pointsNum;i++)
        {           
            ret.push(cc.p(offsets[i].x-360,offsetY-offsets[i].y));
        }
        return ret;
    };
    let getCircleOffsets=function(radius,length,pointsNum)
    {
        let ret = new Array();
        let angle = Math.asin(length/2/radius);
        cc.log(angle);
        let alpha = angle/pointsNum*2;
        cc.log(alpha);
        let y = radius*Math.cos(angle);        
        ret.push(cc.p(0,0));
        for(let i=1;i<=pointsNum;i++)
        {
            //let totalAngel = alpha*i;
            let offsetY = radius*Math.cos(angle-alpha*i)-y;
            let offsetX = length/2-radius*Math.sin(angle-alpha*i);
            ret.push(cc.p(offsetX,offsetY));
            //cc.log(offsetX+" "+offsetY);
        }
        return ret;       

    }
    return{
        getGroundPoints:getGroundPoints,
    }
})();
module.exports = ChainPointsUtils;