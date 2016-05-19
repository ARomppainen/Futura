precision mediump float;

uniform sampler2D tex;

varying vec2 fragTexCoord;

void main(void) {
	gl_FragColor = texture2D(tex, fragTexCoord);
}