define(['collider', 'collisionDetector2d'], function(Collider, Detector) {
	"use strict"
	
	function CircleCollider2D() {
	
	}
	
	CircleCollider2D.prototype = new Collider();
	
	CircleCollider2D.prototype.type = function() {
		return this.types.circle;
	}
	
	CircleCollider2D.prototype.checkCollisionCircle = function(obj) {
		return Detector.checkCollisionCircleCircle(this.obj, obj);
	}
	
	CircleCollider2D.prototype.checkCollisionPoly = function(obj) {
		return Detector.checkCollisionCirclePoly(this.obj, obj);
	}
	
	return CircleCollider2D;
});