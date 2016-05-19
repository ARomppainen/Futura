define([
	'gl',
	'shaderLoader',
	'text!textureVS',
	'text!textureFS'],

function(gl, ShaderLoader, vertexShader, fragmentShader) {
	"use strict"

	function ProgTexture() {
	
		this.pid = ShaderLoader.loadProgram(vertexShader, fragmentShader);
		
		gl.useProgram(this.pid);
		
		// apply shader attributes and get uniform hooks
		this.vert = gl.getAttribLocation(this.pid, "vert");
		gl.enableVertexAttribArray(this.vert);
		
		this.vertTexCoord = gl.getAttribLocation(this.pid, "vertTexCoord");
		gl.enableVertexAttribArray(this.vertTexCoord);
		
		this.camera = gl.getUniformLocation(this.pid, "camera");
		this.model = gl.getUniformLocation(this.pid, "model");
		this.tex = gl.getUniformLocation(this.pid, "tex");
	}
	
	ProgTexture.prototype = {
		use: function(mesh, camera, transform, texture) {
			gl.useProgram(this.pid);
		
			gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
			gl.vertexAttribPointer(this.vert, mesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, mesh.texCoordsBuffer);
			gl.vertexAttribPointer(this.vertTexCoord, mesh.texCoordsBuffer.itemSize, gl.FLOAT, false, 0, 0);
			
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, texture.img.tex);
			gl.uniform1i(this.tex, 0);
			
			gl.uniformMatrix4fv(this.camera, false, camera.getViewProjectionMatrix());
			gl.uniformMatrix4fv(this.model, false, transform.getModelMatrix());
		}
	}
	
	return ProgTexture;
});