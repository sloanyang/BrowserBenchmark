/** 
 * Generic ripple object. See test specific object in the bottom.
 */
var ripples = {
	
	version: 1,

	// This is fps-test.
	isFps: true,
	
	// Length in milliseconds.
	iterations: 15000,

	// Frame counter.
	frame: 0,
	
	// Time for fps counter.
	fpsStartTime: 0,

	// Size of buffer.
	width: 85,
	height: 50,
	
	// Render size.
	renderWidth: 340,
	renderHeight: 200,
	
	// Canvas size.
	canvasWidth: 992,
	canvasHeight: 558,
	
	// Ripple start points.
	ripplePoints: [
		{x:0.5,y:0.5,start:0},
		{x:0.2,y:0.3,start:0},
		{x:0.7,y:0.6,start:0},
		{x:0.2,y:0.2,start:4000},
		{x:0.7,y:0.2,start:6000},
		{x:0.2,y:0.8,start:8000},
		{x:0.5,y:0.3,start:12000},
		{x:0.2,y:0.6,start:16000},
		{x:0.8,y:0.2,start:20000},
		{x:0.3,y:0.8,start:24000},
		{x:0.6,y:0.2,start:28000}
	],
	
	a: false, // previous frame
	b: false, // frame before previous frame
	
	pixelWidth: 0,
	pixelHeight: 0,
	
	// Bg image.
	bg: null,
	
	// FPS label.
	fpsLabel: null,
	
	isSupported: function() {

		try {
			$("body").append("<canvas id=\"rippleTestCanvas\"></canvas>");
			document.getElementById("rippleTestCanvas").getContext("2d");
			return true;
		} catch(e) {
			return false;
		}
	
	},
		
	init: function() {
		
		// with fps: $("#playground").html('<div id="anchor"><canvas id="ripples" width="850" height="500"></canvas><div id="fps">FPS:</div></div>');
		$("#playground").css("background", "black").html('<div id="anchor"><canvas id="ripples" width="850" height="500"></canvas></div>');

		// Get start time.
		var d = new Date();
		this.startTime = d.getTime();
		
		// Get fps-div.
		this.fpsLabel = document.getElementById("fps");

		// Pixel sizes.
		this.pixelWidth = Math.floor(this.renderWidth / this.width);
		this.pixelHeight = Math.floor(this.renderHeight / this.height);
		
		// Top left corner position of the rendered effect.
		this.xPosition = this.canvasWidth / 2 - (this.pixelWidth * this.width) / 2;
		this.yPosition = this.canvasHeight / 2 - (this.pixelHeight * this.height) / 2;
		
		
		// Init canvas.
		var canvas = document.getElementById('ripples');
		this.ctx = canvas.getContext('2d');

		// Create buffers.
		this.a = new Buffer(this.width, this.height);
		this.b = new Buffer(this.width, this.height);
		
	},

	processBuffers: function() {

		var damping = 0.02;
	
		for (var x = 2; x < this.width - 2; x++) {
			for (var y = 2; y < this.height - 2; y++) {
				this.b.set(x, y,
						(
						  this.a.get(x - 2, y)
						+ this.a.get(x + 2, y)
						+ this.a.get(x, y - 2)
						+ this.a.get(x, y + 2)
						+ this.a.get(x - 1, y)
						+ this.a.get(x + 1, y)
						+ this.a.get(x, y - 1)
						+ this.a.get(x, y + 1)
						+ this.a.get(x - 1, y - 1)
						+ this.a.get(x + 1, y + 1)
						+ this.a.get(x + 1, y - 1)
						+ this.a.get(x - 1, y + 1)
						) / 12 * 2  - this.b.get(x, y));
				this.b.set(x, y, this.b.get(x, y) - this.b.get(x, y) * damping);
			}
		}
		
	
	},
	
	render: function() {

		for (var x = 2; x < this.width - 2; x++) {
			for (var y = 2; y < this.height - 2; y++) {
			
				var color = this.b.get(x, y);

				var progress = color / 256;
				var rMin = 0, rMax = 140, 
					gMin = 0, gMax = 166, 
					bMin = 0, bMax = 62;

				var rDelta = (rMax - rMin) / 2;
				var rValue = Math.round(rMin + rDelta + rDelta * progress);
				var gDelta = (gMax - gMin) / 2;
				var gValue = Math.round(gMin + gDelta + gDelta * progress);
				var bDelta = (bMax - bMin) / 2;
				var bValue = Math.round(bMin + bDelta + bDelta * progress);
				this.ctx.fillStyle = "rgb("+rValue+", "+gValue+", "+bValue+")";
				this.ctx.fillRect(this.xPosition + x * this.pixelWidth, 
									this.yPosition + y * this.pixelHeight,  
									this.pixelWidth, 
									this.pixelHeight);
				
			}
		}		
	},
	
	swapBuffers: function() {
		var c = this.b;
		this.b = this.a;
		this.a = c;
	},
	
	clear: function() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	},
	
	addRipple: function(time) {
	
		var ripplePoints = new Array();
		for (var i = 0; i < this.ripplePoints.length; i++) {
			if (this.ripplePoints[i].start < time) {
				this.a.sphere(
					Math.floor(this.width * this.ripplePoints[i].x), 
					Math.floor(this.height * this.ripplePoints[i].y), 
					Math.floor(this.width * 0.1), 256);
			} else {
				ripplePoints.push(this.ripplePoints[i]);
			}
		}
		this.ripplePoints = ripplePoints;
	
	},
	
	updateFPS: function() {

		if (this.frame % 5 == 0) {
		
			var currentDate = new Date();
			var fps = Math.round((5 / ((currentDate.getTime() - this.fpsStartTime) / 1000 )) * 100) / 100;
			this.fpsLabel.innerHTML = "FPS: " + fps;
			this.fpsStartTime = currentDate.getTime();
		}
	
	},
	
	run: function(time) {

		this.clear();
		this.addRipple(time);
		this.processBuffers();
		this.render();
		this.swapBuffers();
		//this.updateFPS();
		
		this.frame++;

	}
	
	
}

function Buffer(newWidth, newHeight) {

	// Dimensions.
	this.width = newWidth;
	this.height = newHeight;
	
	// Data.
	this.data = new Array();

	// Init arrays.
	for (var x = 0; x < this.width; x++) {
		this.data[x] = new Array();
		for (var y = 0; y < this.height; y++) {
			this.data[x][y] = 0;
		}
	}

	this.sphere = function(sphereX, sphereY, radius, depth) {
		for (var x = 0; x < this.width; x++) {
			for (var y = 0; y < this.height; y++) {
				var d = this.distance(sphereX, sphereY, x, y);
				if (d < radius) {
					this.data[x][y] = this.data[x][y] + depth * ((radius - Math.sqrt(d)) / radius);
					//this.data[x][y] = this.data[x][y] + Math.round((1 - d / radius) * 256);
					if (this.data[x][y] > 256) this.data[x][y] = 256;
				}
			}
		}
	}
	
	this.ripple = function(sphereX, sphereY, radius) {
	
		for (var x = 0; x < this.width; x++) {
			for (var y = 0; y < this.height; y++) {
				var d = this.distance(sphereX, sphereY, x, y);
				if (d < radius) {
					this.set(x, y, Math.sin((d / radius) * Math.PI) * 70);//Math.round((1 - d / radius) * 256);
				}
			}
		}
	
	}

	this.hardRipple = function(sphereX, sphereY, radius) {
	
		for (var x = 0; x < this.width; x++) {
			for (var y = 0; y < this.height; y++) {
				var d = this.distance(sphereX, sphereY, x, y);
				if (d < radius && d > radius * 0.8) {
					this.set(x, y, 256);//Math.round((1 - d / radius) * 256);
				}
			}
		}
	
	}
	
	
	this.distance = function(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
	}
	
	/**
	 * Get value.
	 */
	this.get = function(x, y) {
		if (typeof(this.data[x]) != "undefined" && typeof(this.data[x][y]) != "undefined") {
			return this.data[x][y];
		} else {
			return 0;
		}
	}
	
	/**
	 * Set value.
	 */
	this.set = function(x, y, value) {
		if (typeof(this.data[x]) != "undefined" && typeof(this.data[x][y]) != "undefined") {
			this.data[x][y] = Math.round(value);
		}
	}
	
}