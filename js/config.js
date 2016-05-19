require.config({
	paths: {
		glMatrix: 'lib/gl-matrix-min',
		text: 'lib/text',
		domReady: 'lib/domReady',
		glUtil: 'lib/webgl-utils',
		
		futura: 'futura/futura',
		util: 'futura/util',
		
		scene: 'futura/scene/scene',
		sceneObject: 'futura/scene/sceneObject',
		input: 'futura/scene/input',
		futuraScript: 'futura/scene/futuraScript',
		
		gl: 'futura/rendering/gl',
		renderer: 'futura/rendering/meshRenderer',
		transform: 'futura/rendering/transform',
		camera: 'futura/rendering/camera',
		texture: 'futura/rendering/texture',
		mesh: 'futura/rendering/mesh',
		
		physics: 'futura/physics/physics',
		collider: 'futura/physics/collider',
		collisionDetector2d: 'futura/physics/2d/collisionDetector2d',
		collisionHandler2d: 'futura/physics/2d/collisionHandler2d',
		rigidBody2d: 'futura/physics/2d/rigidBody2d',
		boxCollider2d: 'futura/physics/2d/boxCollider2d',
		circleCollider2d: 'futura/physics/2d/circleCollider2d',
		polygonCollider2d: 'futura/physics/2d/polygonCollider2d',
		
		shaderLoader: 'futura/shaders/shaderLoader',
		
		progTexture: 'futura/shaders/progTexture',
		textureVS: 'futura/shaders/src/textureVS.glsl',
		textureFS: 'futura/shaders/src/textureFS.glsl',
		
		progSimple: 'futura/shaders/progSimple',
		simpleVS: 'futura/shaders/src/simpleVS.glsl',
		simpleFS: 'futura/shaders/src/simpleFS.glsl',
		
		progSimpleTex: 'futura/shaders/progSimpleTex',
		simpleTexVS: 'futura/shaders/src/simpleTexVS.glsl',
		simpleTexFS: 'futura/shaders/src/simpleTexFS.glsl',
		
		fpsCamera: 'futura/scripts/fpsCamera',
		rotate: 'futura/scripts/rotate',
		tormays: 'futura/scripts/tormays'
	}
});

require(['main'], function(Main) {
	Main.start();
});