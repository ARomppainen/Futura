define(function() {
	"use strict"
	
	function FuturaScript() {
		this.obj = null;
		this.transform = null;
	}
	
	FuturaScript.prototype = {
		init: function() {
			// override to implement
		},
		
		register: function(obj) {
			this.obj = obj;
			this.transform = obj.transform;
			this.init();
		},
	
		update: function(deltaTime) {
			// override to implement
		},
		
		fixedUpdate: function(timeStep) {
			// override to implement
		}
	}
	
	return FuturaScript;
});