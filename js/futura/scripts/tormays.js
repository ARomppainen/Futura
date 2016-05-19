define(['futuraScript', 'glMatrix', 'input'], function(FuturaScript, glmat, Input) {
	"use strict"

	function Script() {
		this.ball1 = null;
		this.ball2 = null;
		this.first = true;
	}
	
	Script.prototype = new FuturaScript();
	
	Script.prototype.update = function(deltaTime) {
		if (this.first || Input.clicked("R")) {
			this.first = false;
			
			var mass, size, px, py, vx, vy;
		
			mass = parseFloat(document.getElementById("p1m").value);
			size = parseFloat(document.getElementById("p1s").value);
			px = parseFloat(document.getElementById("p1px").value);
			py = parseFloat(document.getElementById("p1py").value);
			vx = parseFloat(document.getElementById("p1vx").value);
			vy = parseFloat(document.getElementById("p1vy").value);
			
			this.ball1.physics.mass = mass;
			this.ball1.transform.setScale(size, size, 1.0);
			this.ball1.transform.setRotation(0, 0, 0);
			this.ball1.collider.scale = size;
			this.ball1.transform.setPosition(px, py, 0);
			this.ball1.physics.velocity[0] = vx;
			this.ball1.physics.velocity[1] = vy;
			//this.ball1.physics.aAcceleration = 0;
			this.ball1.physics.aVelocity = 0;
			
			mass = parseFloat(document.getElementById("p2m").value);
			size = parseFloat(document.getElementById("p2s").value);
			px = parseFloat(document.getElementById("p2px").value);
			py = parseFloat(document.getElementById("p2py").value);
			vx = parseFloat(document.getElementById("p2vx").value);
			vy = parseFloat(document.getElementById("p2vy").value);
			
			this.ball2.physics.mass = mass;
			this.ball2.transform.setScale(size, size, 1.0);
			this.ball2.transform.setRotation(0, 0, 45);
			this.ball2.collider.scale = size;
			this.ball2.transform.setPosition(px, py, 0);
			this.ball2.physics.velocity[0] = vx;
			this.ball2.physics.velocity[1] = vy;
			//this.ball2.physics.aAcceleration = 0;
			this.ball2.physics.aVelocity = 0;
			
			var e = parseFloat(document.getElementById("e").value);
			
			this.ball1.physics.elasticity = e;
			this.ball2.physics.elasticity = e;
		}
	}
	
	return Script;
});