define(['gl', 'glUtil', 'glMatrix', 'futura', 'scenes/testScene', 'input', 'util'],
	function (gl, glUtil, glmat, Futura, TestScene, Input, Util) {
	
	"use strict"
	
	var lastTime = 0;
	
	function keyDown(event) {
		Input.keyDown(event);
	}
	
	function keyUp(event) {
		Input.keyUp(event);
	}
	
	function mouseMove(event) {
		Input.mouse.move(event);
	}
	
	function mouseDown(event) {
		Input.mouse.keyDown(event);
	}
	
	function mouseUp(event) {
		Input.mouse.keyUp(event);
	}
	
	function tick(main) {
		var timeNow = new Date().getTime();
		var deltaTime = timeNow - lastTime;
		lastTime = timeNow;
	
		requestAnimFrame(tick);
		Futura.update(deltaTime);
		Input.mouse.clearDelta();
		Input.clearClicks();
		Futura.render();
		
	}
	
	function Main() {
		this.start = function() {
		
			// OPENGL SETTINGS
			gl.viewport(0, 0, 700, 500);
			gl.clearColor(0.0, 0.0, 0.0, 1.0);
			gl.enable(gl.DEPTH_TEST);
			
			// LOAD SCENE
			//var scene = new TestScene();
			var scene = new TestScene();
			scene.load();
			Futura.setScene(scene);
			
			// SET CALLBACK FUNCTIONS
			document.onkeydown = keyDown;
			document.onkeyup = keyUp;
			document.onmousemove = mouseMove;
			document.onmousedown = mouseDown;
			document.onmouseup = mouseUp;
			
			// START
			lastTime = new Date().getTime();
			tick();
		}
	}
	
	return new Main;
});