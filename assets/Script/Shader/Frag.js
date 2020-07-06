module.exports =
`
#ifdef GL_ES
precision mediump float;
#endif
varying vec2 v_texCoord;
// uniform float time;
// uniform vec2 mouse_touch;
// uniform vec2 resolution;

uniform vec2 point0;
uniform vec2 point1;
uniform vec4 color;
uniform float width;


void main( void ) {

	vec4 v = texture2D(CC_Texture0, v_texCoord).rgba;    
	gl_FragColor = v;//vec4(f, f, f, v.a);
	
	
	// vec2 position = ( gl_FragCoord.xy / resolution.xy ) + mouse_touch / 4.0;

	// float color = 1.0;
	// // color += sin( position.x * cos( time / 15.0 ) * 80.0 ) + cos( position.y * cos( time / 15.0 ) * 10.0 );
	// // color += sin( position.y * sin( time / 10.0 ) * 40.0 ) + cos( position.x * sin( time / 25.0 ) * 40.0 );
	// // color += sin( position.x * sin( time / 5.0 ) * 10.0 ) + sin( position.y * sin( time / 35.0 ) * 80.0 );
	// // color *= sin( time / 10.0 ) * 0.5;

	// gl_FragColor = vec4( vec3( color, color * 0.5, color * 0.75 ), 1.0 );

}
`