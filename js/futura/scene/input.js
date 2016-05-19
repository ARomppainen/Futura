define(function() {
	"use strict"
	
	function Mouse() {
		this.keys = {};
		this.x = 0;
		this.y = 0;
		this.dx = 0;
		this.dy = 0;
		this.init = false;
	}
	
	Mouse.prototype = {
		move: function(event) {
			if (this.init) {
				this.dx += event.clientX - this.x;
				this.dy += this.y - event.clientY;
			}
		
			this.x = event.clientX;
			this.y = event.clientY;
			
			this.init = true;
		},
	
		keyDown: function(event) {
			//TODO: method stub
		},
		
		keyUp: function(event) {
			//TODO: method stub
		},
		
		pressed: function(key) {
			//TODO: method stub
		},
		
		clearDelta: function() {
			this.dx = 0;
			this.dy = 0;
		}
	}
	
	
	function Input() {
		this.keys = {};
		this.clicks = {};
		this.mouse = new Mouse();
	}
	
	Input.prototype = {
		keyDown: function(event) {
			this.keys[event.keyCode] = true;
			this.clicks[event.keyCode] = true;
		},
		
		keyUp: function(event) {
			this.keys[event.keyCode] = false;
		},
		
		pressed: function(key) {
			return this.keys[String.charCodeAt(key)];
		},
		
		clicked: function(key) {
			return this.clicks[String.charCodeAt(key)];
		},
		
		clearClicks: function() {
			this.clicks = {};
		}
	}
	
	var instance;
	instance = new Input();
	return instance;
});