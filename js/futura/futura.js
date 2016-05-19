define(['physics', 'renderer'], function(Physics, MeshRenderer) {
	"use strict"
	
	function Futura() {
		this.scene = null;
		this.renderer = new MeshRenderer();
	}

	Futura.prototype = {
		
		setScene: function(newScene) {
			this.scene = newScene;
			Physics.registerObjects(this.scene);
		},
		
		update: function(deltaTime) {
			this.scene.update(deltaTime); // updates scripts
			Physics.update(deltaTime); // updates physics at fixed intervals
		},
		
		render: function() {
			this.renderer.renderScene(this.scene);
		}
	}
	
	var engine;
	engine = new Futura();
	return engine;
});