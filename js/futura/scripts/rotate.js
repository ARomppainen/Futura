define(['futuraScript'], function(FuturaScript) {
	"use strict"
	
	function Script(speed) {
		this.rotSpeed = speed;
		this.rot = 0.0;
	}
	
	Script.prototype = new FuturaScript();
	
	Script.prototype.update = function(deltaTime) {
		this.rot += (this.rotSpeed * deltaTime / 1000.0) % 360;
		this.transform.setRotation(this.rot, this.rot, this.rot);
	}
	
	return Script;
});