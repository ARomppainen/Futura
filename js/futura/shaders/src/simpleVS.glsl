attribute vec3 vert;

void main(void) {
	gl_Position = vec4(vert, 1.0);
}