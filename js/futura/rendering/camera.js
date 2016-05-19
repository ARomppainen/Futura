define(['transform', 'glMatrix', 'util'], function(Transform, glmat, Util) {
	"use strict"
	
	// http://www.songho.ca/opengl/gl_projectionmatrix.html
	function Perspective(fov, ar, near, far) {
		var mat = glmat.mat4.create();
		
		var f = 1.0 / Math.tan(0.5 * fov * Util.toRadians);
		mat[0] = f / ar;
		mat[5] = f;
		mat[10] = (near + far) / (near - far);
		mat[11] = -1.0;
		mat[14] = (2.0 * near * far) / (near - far);
		mat[15] = 0.0;
		
		return mat;
	}
	
	function Camera() {
		this.transform = new Transform();
	
		this.fov = 0;
		this.ar = 0;
		this.near = 0;
		this.far = 0;
		this.zoom = 0;
		this.ortho = false;
		this.persp = false;
		this.viewMatrix = glmat.mat4.create();
		this.projectionMatrix = glmat.mat4.create();
		this.viewProjectionMatrix = glmat.mat4.create();
		
		this.dirty = true;
	}
	
	Camera.prototype = {
		setOrtho: function(zoomLevel, aspectRatio, n, f) {
			this.ortho = true;
			this.persp = false;
			this.projectionDirty = true;
			
			this.zoom = zoomLevel;
			this.ar = aspectRatio;
			this.near = n;
			this.far = f;
		},
		
		setPersp: function(fieldOfView, aspectRatio, n, f) {
			this.persp = true;
			this.ortho = false;
			this.projectionDirty = true;
			
			this.fov = fieldOfView;
			this.ar = aspectRatio;
			this.near = n;
			this.far = f;
		},
		
		getViewProjectionMatrix: function() {
			var updated = false;
			
			if (this.transform.dirty) {
				this.updateView();
				
				updated = true;
			}
			
			if (this.dirty) {
				this.updateProjection();
			
				this.dirty = false;
				updated = true;
			}
			
			if (updated) {
				glmat.mat4.multiply(
					this.viewProjectionMatrix,
					this.projectionMatrix,
					this.viewMatrix);
			}
			
			return this.viewProjectionMatrix;
		},
		
		updateView: function() {
			this.viewMatrix = this.transform.getViewMatrix();
		},
		
		updateProjection: function() {
			if (this.ortho) {
				glmat.mat4.ortho(
					this.projectionMatrix,
					this.ar * this.zoom * -1,
					this.ar * this.zoom,
					this.zoom * -1,
					this.zoom,
					this.near,
					this.far);
			} else if (this.persp) {
				this.projectionMatrix = Perspective(
					this.fov,
					this.ar,
					this.near,
					this.far);
			}
		}
	}
	
	return Camera;

});