// SINGLETON
define(['domReady!'], function() {
	"use strict";
	
	var gl;
	var canvas = document.getElementById("webgl-canvas");
	
	try {
		gl = canvas.getContext("experimental-webgl");
	} catch (e) {
		alert(e);
	}
	
	if (!gl) {
		alert("Could not initialize WebGL!");
	}
	
	return gl;
});