define(['glMatrix'], function(glmat) {
	"use strict"
	
	function Handler() {
	
	}

	Handler.prototype = {
		handleCollisionCircleCircle: function(A, B, normal) {
			var relative = glmat.vec3.create();
			glmat.vec3.scaleAndAdd(relative, A.physics.velocity, B.physics.velocity, -1);
			
			var impulse = glmat.vec3.dot(relative, normal) / ((1 / A.physics.mass) + (1 / B.physics.mass));
			
			// käytetään elastisuuksien kerkiarvoa
			var e = (A.physics.elasticity + B.physics.elasticity) * 0.5;
			impulse = impulse * (1 + e);
			
			A.physics.addImpulse(-impulse, normal);
			B.physics.addImpulse(impulse, normal);
		},
		
		handleCollisionCirclePoly: function(A, B, normal, point) {
			// tarvitaanko tätä lainkaan?
		},
		
		handleCollisionPolyPoly: function(A, B, normal, point, penetration, flip) {
			var relative = glmat.vec3.create();
			var va = A.physics.getSpeedOfPoint(point);
			var vb = B.physics.getSpeedOfPoint(point);
			glmat.vec3.scaleAndAdd(relative, va, vb, -1);
			
			var rap = glmat.vec3.create();
			var rbp = glmat.vec3.create();
			var ca = glmat.vec3.create();
			var cb = glmat.vec3.create();
			
			glmat.vec3.scaleAndAdd(rap, point, A.transform.position, -1);
			glmat.vec3.scaleAndAdd(rbp, point, B.transform.position, -1);
			
			glmat.vec3.cross(ca, rap, normal);
			glmat.vec3.cross(cb, rbp, normal);
			
			var divident = glmat.vec3.dot(relative, normal);
			var divisor = (1 / A.physics.mass) + (1 / B.physics.mass);
			divisor += glmat.vec3.squaredLength(ca) / A.physics.moi;
			divisor += glmat.vec3.squaredLength(cb) / B.physics.moi;
			
			// käytetään elastisuuksien keskiarvoa
			var e = (A.physics.elasticity + B.physics.elasticity) * 0.5;
			
			var impulse = (1 + e) * divident / divisor;
			
			var mtv = glmat.vec3.clone(normal);
			var mtvneg = glmat.vec3.clone(normal);
			glmat.vec3.scale(mtv, mtv, penetration * flip * 0.75);
			glmat.vec3.scale(mtvneg, mtvneg, -penetration * flip * 0.75);
			
			A.transform.TranslateVec(mtv);
			B.transform.TranslateVec(mtvneg);
			
			A.physics.addImpulse(-impulse, normal, point);
			B.physics.addImpulse(impulse, normal, point);
			
		}
	}
	
	var instance;
	instance = new Handler();
	return instance;
});