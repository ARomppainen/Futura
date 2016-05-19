define(function() {
	"use strict"
	
	function Scene() {
		this.tree = [];
		this.camera = null;
	}
	
	Scene.prototype = {
		add: function(obj) {
			this.tree.push(obj);
		},
		
		update: function(deltaTime) {
			var i, j;
			
			for (i = 0; i < this.tree.length; ++i) {
				for (j = 0; j < this.tree[i].scripts.length; ++j) {
					this.tree[i].scripts[j].update(deltaTime);
				}
			}
		},
		
		load: function() {
			// override to implement
		}
	}
	
	return Scene;
});