define(['gl'], function(gl) {
	"use strict"
	
	function MeshRenderer() {
	
	}
	
	MeshRenderer.prototype = {
		renderScene: function(scene) {
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			
			// just render each object individually
			
			var i;
			for (i = 0; i < scene.tree.length; ++i) {
				scene.tree[i].draw(scene.camera);
			}
			
			// advanced: sort objects by type and transparency
			// build dynamic batches and render objects using them
		}
	}
	
	return MeshRenderer;

});