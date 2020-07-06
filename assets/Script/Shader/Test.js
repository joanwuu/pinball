
var Vert = require("Vert");
var Frag = require("Frag");

cc.Class({
    extends: cc.Component,

    properties: {        
    },

    
    onLoad () {
        this.SetUpGLProgarm();
    },

    start () {

    },

    update (dt) {
        if(this._program){
            this._program.use();
            this.updateGLParameters();
            if(cc.sys.isNative){
                var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
                glProgram_state.setUniformVec2( "point0", 0.0,0.0 );
                glProgram_state.setUniformFloat( "point1" , 0.0,100.0);
                glProgram_state.setUniformVec4( "color" , 1.0,1.0,1.0,0.5);
                glProgram_state.setUniformVec2( "width" , this.node.width);    
            }else{
                this._program.setUniformLocationWith2f( this._program.getUniformLocationForName('point0'), 0.0,0.0 );
                this._program.setUniformLocationWith2f( this._program.getUniformLocationForName('point1'), 0.0,100.0);
                this._program.setUniformLocationWith4f(this._program.getUniformLocationForName('color'), 1.0,1.0,1.0,0.5);
                this._program.setUniformLocationWith1f(this._program.getUniformLocationForName('width'),this.node.width);
            }
        }
    },
    updateGLParameters(){
        // this.parameters.time = (Date.now() - this.parameters.startTime)/1000;
        // this.parameters.resolution.x = ( this.node.getContentSize().width );
        // this.parameters.resolution.y = ( this.node.getContentSize().height );
    },
    SetUpGLProgarm()
    {        
        if (cc.sys.isNative) {
            cc.log("use native GLProgram");
            this._program = new cc.GLProgram();
            this._program.initWithString(Vert, Frag);

            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);

            this._program.link();
            this._program.updateUniforms();
            this.updateGLParameters();
                  
        }else{
            this._program = new cc.GLProgram();
            this._program.initWithVertexShaderByteArray(Vert, Frag);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);

            this._program.link();
            this._program.updateUniforms();
            this._program.use();
            this.updateGLParameters();    
            cc.log(this._program);        
        }        
        this.setProgram( this.node._sgNode ,this._program );
    },
    
    setProgram:function (node, program) {
        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
            node.setGLProgramState(glProgram_state);
        }else{
            node.setShaderProgram(program); 
        }       
    
        var children = node.children;
        if (!children)
            return;
    
        for (var i = 0; i < children.length; i++)
            this.setProgram(children[i], program);
    }

});
