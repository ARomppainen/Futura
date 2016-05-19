define(['collider', 'glMatrix', 'collisionDetector2d'], function(Collider, glmat, Detector) {
	"use strict"
	
	function BoxCollider2D() {
		this.verts = [];
		this.normals = [];
		
		// initialize vertices
		this.verts.push(glmat.vec3.fromValues(0.5, 0.5, 0.0));
		this.verts.push(glmat.vec3.fromValues(-0.5, 0.5, 0.0));
		this.verts.push(glmat.vec3.fromValues(-0.5, -0.5, 0.0));
		this.verts.push(glmat.vec3.fromValues(0.5, -0.5, 0.0));
		
		// initialize normals
		this.normals.push(glmat.vec3.fromValues(1.0, 0.0, 0.0));
		this.normals.push(glmat.vec3.fromValues(0.0, 1.0, 0.0));
		this.normals.push(glmat.vec3.fromValues(-1.0, 0.0, 0.0));
		this.normals.push(glmat.vec3.fromValues(0.0, -1.0, 0.0));
	}
	
	BoxCollider2D.prototype = new Collider();
	
	BoxCollider2D.prototype.type = function() {
		return this.types.box;
	}
	
	BoxCollider2D.prototype.checkCollisionCircle = function(obj) {
		return Detector.checkCollisionCirclePoly(obj, this.obj);
	}
	
	BoxCollider2D.prototype.checkCollisionPoly = function(obj) {
		return Detector.checkCollisionPolyPoly(this.obj, obj);
	}
	
	return BoxCollider2D;
});