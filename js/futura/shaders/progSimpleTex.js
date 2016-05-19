define([
	'gl',
	'shaderLoader',
	'text!simpleTexVS',
	'text!simpleTexFS'],

function(gl, ShaderLoader, vertexShader, fragmentShader) {
	"use strict"

	function ProgSimpleTex() {
		this.pid = ShaderLoader.loadProgram(vertexShader, fragmentShader);
		
		gl.useProgram(this.pid);
		
		// apply shader attributes and get uniform hooks
		this.vert = gl.getAttribLocation(this.pid, "vert");
		gl.enableVertexAttribArray(this.vert);
		
		this.vertTexCoord = gl.getAttribLocation(this.pid, "vertTexCoord");
		gl.enableVertexAttribArray(this.vertTexCoord);
		
		this.tex = gl.getUniformLocation(this.pid, "tex");
	}
	
	ProgSimpleTex.prototype = {
		use: function(mesh, camera, transform, texture) {
			gl.useProgram(this.pid);
		
			gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
			gl.vertexAttribPointer(this.vert, mesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, mesh.texCoordsBuffer);
			gl.vertexAttribPointer(this.vertTexCoord, mesh.texCoordsBuffer.itemSize, gl.FLOAT, false, 0, 0);
			
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, texture.img.tex);
			gl.uniform1i(this.tex, 0);
		}
	}
	
	return ProgSimpleTex;
});