define(['glMatrix'], function(glmat) {
	"use strict"

	function Util() {
		this.toRadians = 3.14159265 / 180.0;
		this.toDegrees = 180.0 / 3.14159265;
	}
	
	// http://www.blackpawn.com/texts/pointinpoly/default.html
	Util.prototype = {
	
		RotationMatrix2: function(rotation) {
			var S = Math.sin(rotation * this.toRadians);
			var C = Math.cos(rotation * this.toRadians);
			
			var mat = glmat.mat2.create();
			
			mat[0] = C;
			mat[1] = S;
			mat[2] = -S;
			mat[3] = C;
			
			return mat;
		},
	
		// http://www.cs.princeton.edu/~gewang/projects/darth/stuff/quat_faq.html#Q36
		RotationMatrix3: function(rotation) {
			/*
			var A = Math.cos(rotation[0] * this.toRadians);
			var B = Math.sin(rotation[0] * this.toRadians);
			var C = Math.cos(rotation[1] * this.toRadians);
			var D = Math.sin(rotation[1] * this.toRadians);
			var E = Math.cos(rotation[2] * this.toRadians);
			var F = Math.sin(rotation[2] * this.toRadians);
			
			var AD = A * D;
			var BD = B * D;
			
			var mat = glmat.mat4.create();
			
			mat[0]  =   C * E;
			mat[1]  =  -C * F;
			mat[2]  =   D;
			mat[4]  =  BD * E + A * F;
			mat[5]  = -BD * F + A * E;
			mat[6]  =  -B * C;
			mat[8]  = -AD * E + B * F;
			mat[9]  =  AD * F + B * E;
			mat[10] =  A * C;
			
			return mat;
			//*/
			
			var cb = Math.cos(rotation[0] * this.toRadians);
			var sb = Math.sin(rotation[0] * this.toRadians);
			var ch = Math.cos(rotation[1] * this.toRadians);
			var sh = Math.sin(rotation[1] * this.toRadians);
			var ca = Math.cos(rotation[2] * this.toRadians);
			var sa = Math.sin(rotation[2] * this.toRadians);

			var sbsh = sb * sh;
			var sbch = sb * ch;
			var cbsa = cb * sa;
			
			var mat = glmat.mat4.create();
			
			mat[0] = ch * ca;
			mat[1] = sa;
			mat[2] = -sh * ca;
			mat[4] = -cbsa * ch + sbsh;
			mat[5] = ca * cb;
			mat[6] = cbsa * sh + sbch;
			mat[8] = sbch * sa + sh * cb;
			mat[9] = -ca * sb;
			mat[10] = -sbsh * sa + ch * cb;
			
			return mat;
			//*/
		},
		
		ScalingMatrix3: function(scale) {
			var mat = glmat.mat4.create();
			
			mat[0] = scale[0];
			mat[5] = scale[1];
			mat[10] = scale[2];
			
			return mat;
		},
		
		TranslationMatrix3: function(translation) {
			var mat = glmat.mat4.create();
			
			mat[12] = translation[0];
			mat[13] = translation[1];
			mat[14] = translation[2];
			
			return mat;
		},
	
		sameSide: function(p1, p2, a, b) {
			
			var v1 = glmat.vec3.fromValues(a[0] - b[0], a[1] - b[1], 0.0);
			var v2 = glmat.vec3.fromValues(a[0] - p1[0], a[1] - p1[1], 0.0);
			var v3 = glmat.vec3.fromValues(a[0] - p2[0], a[1] - p2[1], 0.0);
			
			var cp1 = glmat.vec3.create();
			var cp2 = glmat.vec3.create();
			
			glmat.vec3.cross(cp1, v1, v2);
			glmat.vec3.cross(cp2, v1, v3);
			
			if (glmat.vec3.dot(cp1, cp2) >= 0) {
				return true;
			}
			
			return false;
		},
		
		pointInPoly: function(point, a, b, c) {
			var origo = glmat.vec3.create();
		
			if (this.sameSide(point, origo, a, b) &&
				this.sameSide(point, origo, b, c) &&
				this.sameSide(point, origo, c, a)) {
					return true;
				}
				
				
			return false;
		}/*,
		
		// http://www.metanetsoftware.com/technique/tutorialA.html
		// http://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
		// http://www.sevenson.com.au/actionscript/sat/
		
		checkCollisionCircleCircle: function(A, B) {
			var normal = glmat.vec3.create();
			glmat.vec3.scaleAndAdd(normal, A.transform.position, B.transform.position, -1);
			var len = glmat.vec3.length(normal);
			glmat.vec3.normalize(normal, normal);
			
			var relative = glmat.vec3.create();
			glmat.vec3.scaleAndAdd(relative, A.physics.velocity, B.physics.velocity, -1);
				
			var minDist = A.collider.scale * 0.5 + B.collider.scale * 0.5;
			
			return len < minDist && glmat.vec3.dot(relative, normal) < 0;
		},
		
		checkCollisionCirclePoly: function(A, B) {
			var verts = this.getTransformedVerts(
				B.collider.verts,
				B.transform.position,
				B.transform.rotation[2],
				B.collider.scale);
			
			var normals = this.getTransformedNormals(
				B.collider.normals,
				B.transform.rotation[2]);
			
			// testataan monikulmion normaalit
			var i;
			for (i = 0; i < normals.length; ++i) {
				var minP = this.getMinProjection(verts, normals[i]);
				var maxP = this.getMaxProjection(verts, normals[i]);
				
				var dot = glmat.vec2.dot(A.transform.position, normals[i]);
				var minC = dot - 0.5 * A.collider.scale;
				var maxC = dot + 0.5 * A.collider.scale;
				
				if (maxP < minC || maxC < minP) {
					return false;
				}
			}
			
			// testataan polyn lähimmän kulmapisteen etäisyys ympyrään
			var closest = this.getClosestVertex(verts, A.transform.position);
			var normal = glmat.vec2.create();
			glmat.vec2.scaleAndAdd(normal, A.transform.position, closest, -1);
			
			// TODO: tähän vielä suhteellinen nopeus...
			if (glmat.vec2.length(normal) < 0.5 * A.collider.scale) {
				return true;
			}
			
			// projisoidaan vielä polyn kulmapisteet normaalille
			glmat.vec2.normalize(normal, normal);
			
			var minP = this.getMinProjection(verts, normal);
			var maxP = this.getMaxProjection(verts, normal);
				
			var dot = glmat.vec2.dot(A.transform.position, normal);
			var minC = dot - 0.5 * A.collider.scale;
			var maxC = dot + 0.5 * A.collider.scale;
			
			if (maxP < minC || maxC < minP) {
				return false;
			}
			
			// TODO: tähän myös suhteellinen nopeus...
			return true;
		},
		
		checkCollisionPolyPoly: function(A, B) {
			var vertsA = this.getTransformedVerts(
				A.collider.verts,
				A.transform.position,
				A.transform.rotation[2],
				A.collider.scale);
				
			var vertsB = this.getTransformedVerts(
				B.collider.verts,
				B.transform.position,
				B.transform.rotation[2],
				B.collider.scale);
				
			var normals = this.getTransformedNormals(
				A.collider.normals,
				A.transform.rotation[2]);
			
			// testataan A:n normaalit
			var i;
			for (i = 0; i < normals.length; ++i) {
				var minA = this.getMinProjection(vertsA, normals[i]);
				var maxA = this.getMaxProjection(vertsA, normals[i]);
				var minB = this.getMinProjection(vertsB, normals[i]);
				var maxB = this.getMaxProjection(vertsB, normals[i]);
				
				if (maxA < minB || maxB < minA) {
					return false;
				}
			}
			
			normals = this.getTransformedNormals(
				B.collider.normals,
				B.transform.rotation[2]);
			
			// testataan B:n normaalit
			for (i = 0; i < normals.length; ++i) {
				var minA = this.getMinProjection(vertsA, normals[i]);
				var maxA = this.getMaxProjection(vertsA, normals[i]);
				var minB = this.getMinProjection(vertsB, normals[i]);
				var maxB = this.getMaxProjection(vertsB, normals[i]);
				
				if (maxA < minB || maxB < minA) {
					return false;
				}
			}
			
			// TODO: lisää suhteellinen nopeus
			return true;
		},
		
		getMinProjection: function(verts, normal) {
			var min = Number.POSITIVE_INFINITY;
			
			var i;
			for (i = 0; i < verts.length; ++i) {
				var dot = glmat.vec2.dot(verts[i], normal);
				
				if (dot < min) {
					min = dot;
				}
			}
			
			return min;
		},
		
		getMaxProjection: function(verts, normal) {
			var max = Number.NEGATIVE_INFINITY;
			
			var i;
			for (i = 0; i < verts.length; ++i) {
				var dot = glmat.vec2.dot(verts[i], normal);
				
				if (dot > max) {
					max = dot;
				}
			}
			
			return max;
		},
		
		getTransformedVerts: function(verts, position, rotation, scale) {
			var v = [];
			
			var i;
			for (i = 0; i < verts.length; ++i) {
				var vert = glmat.vec2.clone(verts[i]);
				
				// scale
				vert[0] *= scale;
				vert[1] *= scale;
				
				// rotate
				var S = Math.sin(rotation * this.toRadians);
				var C = Math.cos(rotation * this.toRadians);
				
				var x = vert[0] * C - vert[1] * S;
				var y = vert[0] * S + vert[1] * C;
				
				// translate
				vert[0] = x + position[0];
				vert[1] = y + position[1];
				
				v.push(vert);
			}
			
			return v;
		},
		
		getTransformedNormals: function(normals, rotation){
			var n = [];
			
			var i;
			for (i = 0; i < normals.length; ++i) {
				var vert = glmat.vec2.clone(normals[i]);
				
				var S = Math.sin(rotation * this.toRadians);
				var C = Math.cos(rotation * this.toRadians);
				
				var x = vert[0] * C - vert[1] * S;
				var y = vert[0] * S + vert[1] * C;
				
				vert[0] = x;
				vert[1] = y;
				
				n.push(vert);
			}
			
			return n;
		},
		
		getClosestVertex: function(verts, point) {
			var minDist = Number.POSITIVE_INFINITY;
			var minIndex;
			
			var i;
			for (i = 0; i < verts.length; ++i) {
				var dist = glmat.vec2.squaredDistance(verts[i], point);
				
				if (dist < minDist) {
					minDist = dist;
					minIndex = i;
				}
			}
			
			return verts[minIndex];
		}*/
	}
	
	var instance;
	instance = new Util;
	return instance;
});