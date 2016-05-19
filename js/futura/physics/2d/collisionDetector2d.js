define(['glMatrix', 'collisionHandler2d', 'util'], function(glmat, Handler, Util) {
	"use strict"
	
	function Detector() {
	
	}
	
	Detector.prototype = {
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
			
			var collision = false;
			
			if (len < minDist && glmat.vec2.dot(relative, normal) < 0) {
				collision = true;
			}
			
			if (collision) {
				Handler.handleCollisionCircleCircle(A, B, normal);
			}
			
			return collision;
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
			var normal = glmat.vec3.create();
			glmat.vec3.scaleAndAdd(normal, A.transform.position, closest, -1);
			
			// TODO: tähän vielä suhteellinen nopeus...
			if (glmat.vec3.length(normal) < 0.5 * A.collider.scale) {
				return true;
			}
			
			// EDIT: tän pitäis olla ihan turhaa hommaa...
			// projisoidaan vielä polyn kulmapisteet normaalille
			glmat.vec3.normalize(normal, normal);
			
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
			
			var n; // collision normal
			var p; // collision point
			var flip = 1;
			var minPenetration = Number.POSITIVE_INFINITY;
			
			// testataan A:n normaalit
			var i;
			for (i = 0; i < normals.length; ++i) {
				var minA = this.getMinProjection(vertsA, normals[i]);
				var maxA = this.getMaxProjection(vertsA, normals[i]);
				var minB = this.getMinProjection(vertsB, normals[i]);
				var maxB = this.getMaxProjection(vertsB, normals[i]);
				
				/*
				if (maxA < minB || maxB < minA) {
					return false;
				}
				//*/
				
				
				if (maxA.value > minB.value) {
					var penetration = maxA.value - minB.value;
					
					if (penetration < minPenetration) {
						minPenetration = penetration;
						n = normals[i];
						p = minB.p;
					}
					
				} else {
					return false;
				}
				
				if (maxB.value > minA.value) {
					var penetration = maxB.value - minA.value;
					
					if (penetration < minPenetration) {
						minPenetration = penetration;
						n = normals[i];
						p = maxB.p;
						//flip = -1;
					}
					
				} else {
					return false;
				}
				//*/
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
				
				/*
				if (maxA < minB || maxB < minA) {
					return false;
				}
				//*/
				
				
				if (maxA.value > minB.value) {
					var penetration = maxA.value - minB.value;
					
					if (penetration < minPenetration) {
						minPenetration = penetration;
						n = normals[i];
						p = maxA.p;
						//flip = -1;
					}
					
				} else {
					return false;
				}
				
				if (maxB.value > minA.value) {
					var penetration = maxB.value - minA.value;
					
					if (penetration < minPenetration) {
						minPenetration = penetration;
						n = normals[i];
						p = minA.p;
						//flip = -1;
					}
					
				} else {
					return false;
				}
				//*/
			}
			
			Handler.handleCollisionPolyPoly(A, B, n, p, minPenetration, flip);
			
			return true;
			
			/*
			var relative = glmat.vec3.create();
			var va = A.physics.getSpeedOfPoint(p);
			var vb = B.physics.getSpeedOfPoint(p);
			glmat.vec3.scaleAndAdd(relative, va, vb, -1);
			//glmat.vec3.scaleAndAdd(relative, A.physics.velocity, B.physics.velocity, -1);
			
			var collision = false;
			
			if (glmat.vec2.dot(relative, n) < 0) {
				collision = true;
			}
			
			if (collision) {
				Handler.handleCollisionPolyPoly(A, B, n, p, minPenetration);
			}
			
			return collision;
			*/
		},
		
		getMinProjection: function(verts, normal) {
			var min = Number.POSITIVE_INFINITY;
			var point;
			
			var i;
			for (i = 0; i < verts.length; ++i) {
				var dot = glmat.vec2.dot(verts[i], normal);
				
				if (dot < min) {
					min = dot;
					point = verts[i];
				}
			}
			
			//return min;
			
			return {
				value: min,
				p: point
			};

		},
		
		getMaxProjection: function(verts, normal) {
			var max = Number.NEGATIVE_INFINITY;
			var point;
			
			var i;
			for (i = 0; i < verts.length; ++i) {
				var dot = glmat.vec2.dot(verts[i], normal);
				
				if (dot > max) {
					max = dot;
					point = verts[i];
				}
			}
			
			//return max;
			
			return {
				value: max,
				p: point
			};
			
		},
		
		getTransformedVerts: function(verts, position, rotation, scale) {
			var v = [];
			
			var i;
			for (i = 0; i < verts.length; ++i) {
				var vert = glmat.vec3.clone(verts[i]);
				
				// scale
				vert[0] *= scale;
				vert[1] *= scale;
				
				// rotate
				var S = Math.sin(rotation * Util.toRadians);
				var C = Math.cos(rotation * Util.toRadians);
				
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
				var vert = glmat.vec3.clone(normals[i]);
				
				var S = Math.sin(rotation * Util.toRadians);
				var C = Math.cos(rotation * Util.toRadians);
				
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
				var dist = glmat.vec3.squaredDistance(verts[i], point);
				
				if (dist < minDist) {
					minDist = dist;
					minIndex = i;
				}
			}
			
			return verts[minIndex];
		}
	}

	var instance;
	instance = new Detector();
	return instance;
});