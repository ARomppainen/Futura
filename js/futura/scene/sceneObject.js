define(['transform'], function(Transform) {

	function SceneObject() {
		this.name = "";
		this.transform = new Transform();
		this.scripts = [];
		
		this.collider = null;
		this.physics = null;
		
		this.mesh = null;
		this.texture = null;
		
		this.render = true;
	}
	
	SceneObject.prototype = {
		draw: function(camera) {
			if (this.mesh != null) {
				this.mesh.draw(camera, this.transform, this.texture);
			}
		},
		
		addScript: function(script) {
			script.register(this);
			this.scripts.push(script);
		},
		
		addCollider: function(script) {
			script.register(this);
			this.collider = script;
		},
		
		addPhysics: function(script) {
			script.register(this);
			this.physics = script;
		}
	}

	return SceneObject;
});