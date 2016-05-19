define(['futuraScript', 'glMatrix', 'util'], function(FuturaScript, glmat, Util) {
	"use strict"
	
	function RigidBody2D() {
		this.velocity = glmat.vec3.create();
		this.acceleration = glmat.vec3.create();
		this.mass = 1.0;
		this.elasticity = 1.0;
		//this.gravity = glmat.vec3.fromValues(0.0, -9.81, 0.0);
		this.gravity = glmat.vec3.fromValues(0.0, 0.0, 0.0);
		
		this.aVelocity = 0.0;		// angular velocity
		this.aAcceleration = 0.0;	// angular acceleration
		this.moi = 1.0; 			// moment of inertia
	}
	
	RigidBody2D.prototype = new FuturaScript();
	
	RigidBody2D.prototype.fixedUpdate = function(timeStep) {
		// calculate new velocity
		var a = glmat.vec3.create();
		glmat.vec3.add(a, this.acceleration, this.gravity);
		glmat.vec3.scale(a, a, timeStep * 0.001);
		glmat.vec3.add(this.velocity, this.velocity, a);
		
		// calculate new position
		var v = glmat.vec3.create();
		glmat.vec3.scale(v, this.velocity, timeStep * 0.001);
		this.transform.TranslateVec(v);
		
		// calculate new angular velocity
		this.aVelocity += this.aAcceleration * timeStep * 0.001;
		
		// calculate new angle
		this.transform.RotateXYZ(0, 0, this.aVelocity * timeStep * 0.001);
	}
	
	RigidBody2D.prototype.addImpulse = function(impulse, normal, point) {
		glmat.vec3.scaleAndAdd(
			this.velocity, 
			this.velocity, 
			normal, 
			impulse / this.mass);
			
			if (point != null) {
				var ctp = glmat.vec3.create();
				glmat.vec3.scaleAndAdd(ctp, point, this.transform.position, -1);
				this.aVelocity += impulse / this.moi * (ctp[0] * normal[1] - ctp[1] * normal[0]) * Util.toDegrees;
			}
	}
	
	RigidBody2D.prototype.getSpeedOfPoint = function(point) {
		var speed = glmat.vec3.create();
		speed[0] = this.velocity[0] - this.aVelocity * point[0] * Util.toRadians;
		speed[1] = this.velocity[1] + this.aVelocity * point[1] * Util.toRadians;
		
		return speed;
	}
	
	return RigidBody2D;
});