define(['gl'], function(gl) {
	"use strict"
	
	function ShaderLoader() {
	
	}
	
	ShaderLoader.prototype = {
		loadShader: function(type, source) {
			var shader = gl.createShader(type);
			
			gl.shaderSource(shader, source);
			gl.compileShader(shader);
			
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				throw new Error(gl.getShaderInfoLog(shader));
			}
			
			return shader;
		},
		
		loadProgram: function(vsSource, fsSource) {
			var program = gl.createProgram();
			
			gl.attachShader(program, this.loadShader(gl.VERTEX_SHADER, vsSource));
			gl.attachShader(program, this.loadShader(gl.FRAGMENT_SHADER, fsSource));
			gl.linkProgram(program);
			
			if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
				throw new Error("Could not initialize shader program!");
			}
			
			return program;
		}
	}
	
	var loader;
	loader = new ShaderLoader();
	return loader;
	
});