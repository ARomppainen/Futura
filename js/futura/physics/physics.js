define(['glMatrix'], function(glmat) {
	"use strict"
	
	function Physics() {
		this.timeStep = 5; // milliseconds
		this.counter = 0;
		this.colliders = [];
		this.physics = [];
	}
	
	Physics.prototype = {
		update: function(deltaTime) {
			this.counter += deltaTime;
			
			while (this.counter >= this.timeStep) {
				this.counter -= this.timeStep;
				this.fixedUpdate(this.timeStep);
			}
		},
		
		fixedUpdate: function(timeStep) {
			this.checkCollisions();
			this.updatePhysics(timeStep);
		},
		
		registerObjects: function(scene) {
			this.colliders = [];
			this.physics = [];
			
			var i;
			for (i = 0; i < scene.tree.length; ++i) {
				if (scene.tree[i].collider != null) {
					this.colliders.push(scene.tree[i]);
				}
				
				if (scene.tree[i].physics != null) {
					this.physics.push(scene.tree[i]);
				}
			}
		},
		
		checkCollisions: function() {
			var types;
			if (this.colliders.length > 0) {
				types = this.colliders[0].collider.types;
			}
			
			var i, j;
			for (i = 0; i < this.colliders.length - 1; ++i) {
				var A = this.colliders[i];
			
				for (j = i + 1; j < this.colliders.length; ++j) {
					var B = this.colliders[j];
					
					var collision = false;
					
					// pannaan myös toi perus collisionin handlaaminen tonne erikseen
					// tää palauttaa true jos oli collision nii voidaan ajaa kustomiscriptejä
					
					if (B.collider.type() == types.circle) {
						collision = A.collider.checkCollisionCircle(B);
					} else if (B.collider.type() == types.box) {
						collision = A.collider.checkCollisionPoly(B);
					} else if (B.collider.type() == types.poly) {
						collision = A.collider.checkCollisionPoly(B);
					}
					
					if (collision) {
					// TODO: run custom collision scripts
					}
				}
			}
		},
		
		updatePhysics: function(timeStep) {
			var i;
			for (i = 0; i < this.physics.length; ++i) {
				this.physics[i].physics.fixedUpdate(timeStep);
			}
		}
		
		/*
		handleCollision: function(A, B) {
		
		}
		*/
	}
	
	var instance;
	instance = new Physics();
	return instance;
});