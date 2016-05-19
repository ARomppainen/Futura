define([
'scene', 
'camera', 
'mesh', 
'texture', 
'sceneObject', 
'progTexture',
'rotate'
], function(
Scene, 
Camera, 
Mesh, 
Texture, 
SceneObject, 
ProgSimple, 
ProgSimpleTex, 
ProgTexture,
RigidBody2D,
CircleCollider2D,
BoxCollider2D,
PolygonCollider2D,
FPSCamera,
Rotate,
Tormays
) {
	
	"use strict"

	function TestScene() {
	
	}
	
	TestScene.prototype = new Scene();
	
	TestScene.prototype.load = function() {
		
		// CAMERA
		
		this.camera = new Camera();
		//this.camera.setOrtho(2.5, 700.0 / 500.0, 10, -10);
		this.camera.setPersp(75.0, 700.0 / 500.0, 0.001, 100);
		this.camera.transform.setPosition(0.0, 0.0, 5.0);
		//this.camera.transform.setRotation(0, 45, 0);
		
		// SHADER PROGRAMS
		
		var prog = new ProgTexture();
		
		// MESHES
		
		/*
		var square = new Mesh();
		square.square();
		square.initBuffers();
		square.program = prog;
		//*/
		
		var circle = new Mesh();
		circle.circle(60);
		circle.initBuffers();
		circle.program = prog;
		
		var cube = new Mesh();
		cube.cube();
		cube.initBuffers();
		cube.program = prog;
		
		/*
		var verts = [
			 0.0,  0.5,
			-0.5,  0.2,
			-0.3, -0.4,
			 0.3, -0.4,
			 0.5,  0.2
		];
		
		var poly = new Mesh();
		poly.poly(verts);
		poly.initBuffers();
		poly.program = prog;
		//*/
		
		// TEXTURES
		
		var tex = new Texture();
		tex.load("js/textures/texture.png");
		
		// OBJECTS
		
		var obj = new SceneObject();
		obj.texture = tex;
		obj.mesh = circle;
		
		var obj2 = new SceneObject();
		obj2.texture = tex;
		obj2.mesh = circle;
		
		var globalScripts = new SceneObject();
		
		// SCRIPTS
		
		globalScripts.addScript(new FPSCamera());
		
		var tormays = new Tormays();
		tormays.ball1 = obj;
		tormays.ball2 = obj2;
		globalScripts.addScript(tormays);
		
		obj.addPhysics(new RigidBody2D());
		obj.addCollider(new CircleCollider2D());
		
		obj2.addPhysics(new RigidBody2D());
		obj2.addCollider(new CircleCollider2D());
		
		obj.physics.velocity[0] = 1.0;
		obj2.physics.velocity[0] = -1.0;
		
		// OBJECT TRANSFORMATIONS
		
		obj.transform.setPosition(-2.0, -0.2, 0.0);
		
		obj2.transform.setPosition(2.0, 0.2, 0.0);
		
		
		// ADD OBJECTS TO SCENE
		
		this.add(obj);
		this.add(obj2);
		this.add(globalScripts);
	}
	
	return TestScene;
});