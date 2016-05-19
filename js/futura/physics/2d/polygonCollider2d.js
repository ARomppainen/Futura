define(['collider', 'glMatrix', 'collisionDetector2d'], function(Collider, glmat, Detector) {
	"use strict"
	
	function PolygonCollider2D(vertices) {
		this.verts = [];
		this.normals = [];
		
		// initialize vertices
		var i;
		for (i = 0; i < vertices.length; i += 2) {
			this.verts.push(glmat.vec3.fromValues(vertices[i], vertices[i+1], 0.0));
		}
		
		// initialize normals
		var n = glmat.vec3.create();
		
		for (i = 0; i < this.verts.length - 1; ++i) {
			glmat.vec3.scaleAndAdd(n, this.verts[i], this.verts[i+1], -1);
			this.normals.push(glmat.vec3.fromValues(-n[1], n[0], 0.0));
		}
		
		glmat.vec3.scaleAndAdd(n, this.verts[this.verts.length - 1], this.verts[0], -1);
		this.normals.push(glmat.vec3.fromValues(-n[1], n[0], 0.0));
	}
	
	PolygonCollider2D.prototype = new Collider();
	
	PolygonCollider2D.prototype.type = function() {
		return this.types.poly;
	}
	
	PolygonCollider2D.prototype.checkCollisionCircle = function(obj) {
		return Detector.checkCollisionCirclePoly(obj, this.obj);
	}
	
	PolygonCollider2D.prototype.checkCollisionPoly = function(obj) {
		return Detector.checkCollisionPolyPoly(this.obj, obj);
	}
	
	return PolygonCollider2D;
});