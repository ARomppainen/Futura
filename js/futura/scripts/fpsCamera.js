define(['futura', 'futuraScript', 'input', 'glMatrix'], function(Futura, FuturaScript, Input, glmat) {
	"use strict"
	
	//var moveSpeed = 0.003;
	//var rotSpeed = 0.05;
	
	function Script() {
		this.moveSpeed = 0.003;
		this.rotSpeed = 0.05;
	}
	
	Script.prototype = new FuturaScript();
	
	Script.prototype.update = function(deltaTime) {
		if (Input.pressed("A")) {
			var v = Futura.scene.camera.transform.Left();
			glmat.vec3.scale(v, v, this.moveSpeed * deltaTime);
			Futura.scene.camera.transform.TranslateVec(v);
		} else if (Input.pressed("D")) {
			var v = Futura.scene.camera.transform.Right();
			glmat.vec3.scale(v, v, this.moveSpeed * deltaTime);
			Futura.scene.camera.transform.TranslateVec(v);
		}
			
		if (Input.pressed("W")) {
			var v = Futura.scene.camera.transform.Forward();
			glmat.vec3.scale(v, v, this.moveSpeed * deltaTime);
			Futura.scene.camera.transform.TranslateVec(v);
		} else if (Input.pressed("S")) {
			var v = Futura.scene.camera.transform.Backward();
			glmat.vec3.scale(v, v, this.moveSpeed * deltaTime);
			Futura.scene.camera.transform.TranslateVec(v);
		}
			
		
		/*
		if (Input.mouse.dx != 0) {
			Futura.scene.camera.transform.RotateXYZ(0, this.rotSpeed * -deltaTime * Input.mouse.dx, 0);
		}
			
		if (Input.mouse.dy != 0) {
			Futura.scene.camera.transform.RotateXYZ(this.rotSpeed * deltaTime * Input.mouse.dy, 0, 0);
		}
		//*/
			
		if (Input.pressed("Z")) {
			Futura.scene.camera.transform.Translate(0, this.moveSpeed * deltaTime, 0);
		} else if (Input.pressed("X")) {
			Futura.scene.camera.transform.Translate(0, -this.moveSpeed * deltaTime, 0);
		}
	}
	
	return Script;
});