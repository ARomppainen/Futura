define(['gl'], function(gl) {
	"use strict"
	
	function handleTextureLoad(img) {
		gl.bindTexture(gl.TEXTURE_2D, img.tex);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
	
	function Texture() {
		this.img = null;
	}
	
	Texture.prototype = {
		load: function(source) {
			var img = new Image();
			img.src = source;
			img.tex = gl.createTexture();
			img.onload = function() {
				handleTextureLoad(img);
			}
		
			this.img = img;
		}
	}
	
	return Texture;
});