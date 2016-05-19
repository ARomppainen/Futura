define(["glMatrix", "util"], function(glmat, Util) {
	"use strict"
	
	function Transform() {
		this.position = glmat.vec3.fromValues(0.0, 0.0, 0.0);
		this.rotation = glmat.vec3.fromValues(0.0, 0.0, 0.0);
		this.scale = glmat.vec3.fromValues(1.0, 1.0, 1.0);
		this.modelMatrix = glmat.mat4.create();
		this.dirty = true;
	}
	
	Transform.prototype = {
		setPosition: function(x, y, z) {
			this.position = glmat.vec3.fromValues(x, y, z);
			this.dirty = true;
		},
		
		setRotation: function(x, y, z) {
			this.rotation = glmat.vec3.fromValues(x, y, z);
			this.dirty = true;
		},
		
		setScale: function(x, y, z) {
			this.scale = glmat.vec3.fromValues(x, y, z);
			this.dirty = true;
		},
		
		TranslateXYZ: function(x, y, z) {
			this.position[0] += x;
			this.position[1] += y;
			this.position[2] += z;
			this.dirty = true;
		},
		
		TranslateVec: function(vec) {
			this.position[0] += vec[0];
			this.position[1] += vec[1];
			this.position[2] += vec[2];
			this.dirty = true;
		},
		
		RotateAA: function(axis, angle) {
			// TODO: method stub
		},
		
		RotateXYZ: function(x, y, z) {
			this.rotation[0] += x;
			this.rotation[1] += y;
			this.rotation[2] += z;
			this.dirty = true;
		},
		
		RotateVecXYZ: function(vec) {
			this.rotation[0] += vec[0];
			this.rotation[1] += vec[1];
			this.rotation[2] += vec[2];
			this.dirty = true;
		},
		
		Scale: function(x, y, z) {
			this.scale[0] *= x;
			this.scale[1] *= y;
			this.scale[2] *= z;
			this.dirty = true;
		},
		
		ScaleVec: function(vec) {
			this.scale[0] *= vec[0];
			this.scale[1] *= vec[1];
			this.scale[2] *= vec[2];
			this.dirty = true;
		},
		
		Right: function() {
			var m = Util.RotationMatrix3(this.rotation);
			var v = glmat.vec3.fromValues(1.0, 0.0, 0.0);
			glmat.vec3.transformMat4(v, v, m);
			
			return v;
		},
		
		Left: function() {
			var m = Util.RotationMatrix3(this.rotation);
			var v = glmat.vec3.fromValues(-1.0, 0.0, 0.0);
			glmat.vec3.transformMat4(v, v, m);
			
			return v;
		},
		
		Up: function() {
			var m = Util.RotationMatrix3(this.rotation);
			var v = glmat.vec3.fromValues(0.0, 1.0, 0.0);
			glmat.vec3.transformMat4(v, v, m);
			
			return v;
		},
		
		Down: function() {
			var m = Util.RotationMatrix3(this.rotation);
			var v = glmat.vec3.fromValues(0.0, -1.0, 0.0);
			glmat.vec3.transformMat4(v, v, m);
			
			return v;
		},
		
		Forward: function() {
			var m = Util.RotationMatrix3(this.rotation);
			var v = glmat.vec3.fromValues(0.0, 0.0, -1.0);
			glmat.vec3.transformMat4(v, v, m);
			
			return v;
		},
		
		Backward: function() {
			var m = Util.RotationMatrix3(this.rotation);
			var v = glmat.vec3.fromValues(0.0, 0.0, 1.0);
			glmat.vec3.transformMat4(v, v, m);
			
			return v;
		},
		
		getModelMatrix: function() {
			if (this.dirty) {
				this.dirty = false;
				
				
				var M = glmat.mat4.create();
				
				var T = Util.TranslationMatrix3(this.position);
				var R = Util.RotationMatrix3(this.rotation);
				var S = Util.ScalingMatrix3(this.scale);
				
				glmat.mat4.multiply(M, M, T);
				glmat.mat4.multiply(M, M, R);
				glmat.mat4.multiply(M, M, S);
				
				this.modelMatrix = M;
			}
			
			return this.modelMatrix;
		},
		
		// http://3dgep.com/understanding-the-view-matrix/
		// http://www.codinglabs.net/article_world_view_projection_matrix.aspx
		getViewMatrix: function() {
			if (this.dirty) {
				this.dirty = false;
				
				var V = glmat.mat4.create();
				
				var T = Util.TranslationMatrix3(this.position);
				var R = Util.RotationMatrix3(this.rotation);
				
				glmat.mat4.multiply(V, V, T);
				glmat.mat4.multiply(V, V, R);
				
				glmat.mat4.invert(V, V);
				
				this.modelMatrix = V;
			}
			
			return this.modelMatrix;
		}
	}
	
	return Transform;

});