define([
	'gl',
	'shaderLoader',
	'text!simpleVS',
	'text!simpleFS'],

function(gl, ShaderLoader, vertexShader, fragmentShader) {
	"use strict"

	function ProgSimple() {
		this.pid = ShaderLoader.loadProgram(vertexShader, fragmentShader);
		
		gl.useProgram(this.pid);
		
		// apply shader attributes and get uniform hooks
		this.vert = gl.getAttribLocation(this.pid, "vert");
		gl.enableVertexAttribArray(this.vert);
		
		this.vertTexCoord = gl.getAttribLocation(this.pid, "vertTexCoord");
		gl.enableVertexAttribArray(this.vertTexCoord);
		
		this.tex = gl.getUniformLocation(this.pid, "tex");
	}
	
	ProgSimple.prototype = {
		use: function(mesh, camera, transform, texture) {
			gl.useProgram(this.pid);
		
			gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
			gl.vertexAttribPointer(this.vert, mesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
		}
	}
	
	return ProgSimple;
});