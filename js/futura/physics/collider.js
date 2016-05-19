define(['futuraScript', 'util'], function(FuturaScript, Util) {
	"use strict"
	
	var types = {
		box: 1,
		circle: 2,
		poly: 3
	};
	
	function Collider() {
		this.scale = 1.0;
		this.types = types;
	}
	
	Collider.prototype = new FuturaScript();
	
	return Collider;
});