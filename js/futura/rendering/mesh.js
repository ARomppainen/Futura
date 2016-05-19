define(['gl'], function(gl) {
	"use strict"

	function Mesh() {
		this.vertexBuffer = null;
		this.normalBuffer = null;
		this.texCoordsBuffer = null;
		this.indexBuffer = null;
		this.program = null;
	}
	
	Mesh.prototype = {
		initBuffers: function() {
			this.vertexBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
			this.vertexBuffer.itemSize = 3;
			this.vertexBuffer.items = this.vertices.length / 3;
			
			this.normalBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);
			this.normalBuffer.itemSize = 3;
			this.normalBuffer.items = this.normals.length / 3;
			
			this.texCoordsBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordsBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texCoords), gl.STATIC_DRAW);
			this.texCoordsBuffer.itemSize = 2;
			this.texCoordsBuffer.items = this.texCoords.length / 2;
			
			this.indexBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
			this.indexBuffer.items = this.indices.length;
			
			this.vertices = null;
			this.normals = null;
			this.texCoords = null;
			this.indices = null;
		},
		
		square: function() {
			this.vertices = [
             0.5,  0.5,  0.0,
            -0.5,  0.5,  0.0,
             0.5, -0.5,  0.0,
            -0.5, -0.5,  0.0
			];
			
			this.normals = [
			 0.0, 0.0, 1.0,
			 0.0, 0.0, 1.0,
			 0.0, 0.0, 1.0,
			 0.0, 0.0, 1.0
			];
			
			this.texCoords = [
			 1.0, 1.0,
			 0.0, 1.0,
			 1.0, 0.0,
			 0.0, 0.0
			];
			
			this.indices = [
			 0, 1, 2,
			 2, 1, 3
			];
		},
		
		circle: function(points) {
			// start from position [0.5, 0] and calculate points
			// by going counterclockwise points times with 360 / points increments
			
			this.vertices = [0.0, 0.0, 0.0]; // start with the center point
			this.texCoords = [0.5, 0.5];
			this.normals = [];
			this.indices = [];
			
			var increment = 360.0 / points;
			var angle = 0.0;
			var toRadians = 3.14159265 / 180.0;
			
			var i;
			// calculate vertices and texture coordinates
			for (i = 0; i < points; ++i) {
				var x = Math.cos(angle * toRadians) * 0.5;
				var y = Math.sin(angle * toRadians) * 0.5;
				
				this.vertices.push(x);
				this.vertices.push(y);
				this.vertices.push(0.0);
				
				this.texCoords.push(x + 0.5);
				this.texCoords.push(y + 0.5);
				
				angle += increment;
			}
			
			// push the normals
			for (i = 0; i <= points; ++i) {
				this.normals.push(0.0);
				this.normals.push(0.0);
				this.normals.push(1.0);
			}
			
			// calculate the indices for glDrawElements
			for (i = 1; i < points; ++i) {
				this.indices.push(0);
				this.indices.push(i);
				this.indices.push(i + 1);
			}
			
			this.indices.push(0);
			this.indices.push(points);
			this.indices.push(1);
		},
		
		poly: function(verts) {
			this.vertices = [0.0, 0.0, 0.0];
			this.texCoords = [0.5, 0.5];
			this.normals = [];
			this.indices = [];
			
			var i;
			for (i = 0; i < verts.length; i += 2) {
				this.vertices.push(verts[i]);
				this.vertices.push(verts[i + 1]);
				this.vertices.push(0.0);
				
				this.texCoords.push(verts[i] + 0.5);
				this.texCoords.push(verts[i + 1] + 0.5);
				
				this.normals.push(0.0);
				this.normals.push(0.0);
				this.normals.push(1.0);
			}
			
			var size = verts.length / 2.0;
			for (i = 1; i < size; ++i) {
				this.indices.push(0);
				this.indices.push(i);
				this.indices.push(i + 1);
			}
			
			this.indices.push(0);
			this.indices.push(size);
			this.indices.push(1);
		},
		
		cube: function() {
			// front, back, left, right, up, down
			this.vertices = [
				 0.5,  0.5, 0.5,
				-0.5,  0.5, 0.5,
				 0.5, -0.5, 0.5,
				-0.5, -0.5, 0.5,
				
				-0.5,  0.5, -0.5,
				 0.5,  0.5, -0.5,
				-0.5, -0.5, -0.5,
				 0.5, -0.5, -0.5,
				
				-0.5,  0.5,  0.5,
				-0.5,  0.5, -0.5,
				-0.5, -0.5,  0.5,
				-0.5, -0.5, -0.5,
				
				0.5,  0.5, -0.5,
				0.5,  0.5,  0.5,
				0.5, -0.5, -0.5,
				0.5, -0.5,  0.5,
				
				 0.5, 0.5, -0.5,
				-0.5, 0.5, -0.5,
				 0.5, 0.5,  0.5,
				-0.5, 0.5,  0.5,
				
				 0.5, -0.5,  0.5,
				-0.5, -0.5,  0.5,
				 0.5, -0.5, -0.5,
				-0.5, -0.5, -0.5
			];
			
			this.normals = [
				0.0, 0.0, 1.0,
				0.0, 0.0, 1.0,
				0.0, 0.0, 1.0,
				0.0, 0.0, 1.0,
				
				0.0, 0.0, -1.0,
				0.0, 0.0, -1.0,
				0.0, 0.0, -1.0,
				0.0, 0.0, -1.0,
				
				-1.0, 0.0, 0.0,
				-1.0, 0.0, 0.0,
				-1.0, 0.0, 0.0,
				-1.0, 0.0, 0.0,
				
				1.0, 0.0, 0.0,
				1.0, 0.0, 0.0,
				1.0, 0.0, 0.0,
				1.0, 0.0, 0.0,
				
				0.0, 1.0, 0.0,
				0.0, 1.0, 0.0,
				0.0, 1.0, 0.0,
				0.0, 1.0, 0.0,
				
				0.0, -1.0, 0.0,
				0.0, -1.0, 0.0,
				0.0, -1.0, 0.0,
				0.0, -1.0, 0.0
			];
			
			this.texCoords = [];
			
			var i;
			for (i = 0; i < 6; ++i) {
				this.texCoords.push(1.0); this.texCoords.push(1.0);
				this.texCoords.push(0.0); this.texCoords.push(1.0);
				this.texCoords.push(1.0); this.texCoords.push(0.0);
				this.texCoords.push(0.0); this.texCoords.push(0.0);
			}
			
			this.indices = [];
			
			for (i = 0; i < 6; ++i) {
				this.indices.push(0 + i * 4);
				this.indices.push(1 + i * 4);
				this.indices.push(2 + i * 4);
				this.indices.push(2 + i * 4);
				this.indices.push(1 + i * 4);
				this.indices.push(3 + i * 4);
			}
		},
		
		draw: function(camera, transform, texture) {
			this.program.use(this, camera, transform, texture);
			
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
			gl.drawElements(gl.TRIANGLES, this.indexBuffer.items, gl.UNSIGNED_SHORT, 0);
		}
	}
	
	return Mesh;
});