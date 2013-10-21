/** 
 * Render simulated maps scene.
 */
var renderGrid = {
	
	version: 1,

	// This is fps-test.
	isFps: true,
	
	// Length in milliseconds.
	iterations: 15000,
	
	// Pixel dimensions for each level.
	dimensions: [
		{x:10, y:5},
		{x:25, y:10},
		{x:85, y:50}
	],
	
	// Number of horizontal and vertical pixels.
	width: 60,
	height: 40,
	
	// Pixel divs.
	pixels: new Array(),

	currentLevel: 0,
	
	init: function() {
	
		// Reset.
		var time = 0;
		this.initField(time);

	},
	
	/**
	 * Test is separated into three levels. Get current level based on time.
	 */
	getLevel: function(time) {
		return Math.floor(time / this.iterations * 3);
	},
	
	/**
	 * Init dimensions based on level.
	 */
	initDimensions: function(level) {
		this.width = this.dimensions[level].x;
		this.height = this.dimensions[level].y;
	},
	
	initField: function(time) {

		// Reinit dimensions.	
		this.initDimensions(this.getLevel(time));

		// Stage size.
		var stageWidth = $("#playground").width();
		var stageHeight = $("#playground").height();
		
		// Pixel width.
		var pixelWidth = Math.floor(stageWidth / this.width);
		var pixelHeight = Math.floor(stageHeight / this.height);

		$("#playground").html("");
		for (var y = 0; y < this.height; y++) {
			this.pixels[y] = new Array();
			for (var x = 0; x < this.width; x++) {
				var pixel = document.createElement("div");
				$(pixel).addClass("renderGrid_pixel");
				$(pixel).attr("id", x + "_" + y);
				$(pixel).width(pixelWidth);
				$(pixel).height(pixelHeight);
				$("#playground").append(pixel);
				this.pixels[y][x] = pixel;
			}
			$("#playground").append("<div style=\"clear:both\"></div>");
		}
	
	},
	
	run: function(time) {
	
		// Check if we should proceed to next level.
		if (this.getLevel(time) != this.currentLevel) {
			this.currentLevel = this.getLevel(time);
			this.initField(time);
		}
	
		for (var y = 0; y < this.height; y++) {
			for (var x = 0; x < this.width; x++) {
				var c = 1*Math.round((1 + Math.sin(x / 10 + time/800)) * 30)
						 + 1*Math.round((1 + Math.sin(y / 4 + time/800)) * 30)
						 + 1*Math.round((1 + Math.sin((y + x) / 4 - time/1200)) * 60);
				this.pixels[y][x].style.backgroundColor = this.hex(c, Math.round(c / 2), 0);
			}
		}
	},
	
	hex: function(r, g, b) {
		r = r.toString(16);
		g = g.toString(16);
		b = b.toString(16);
		if (r.length < 2) r = "0" + r;
		if (g.length < 2) g = "0" + g;
		if (b.length < 2) b = "0" + b;
		return "#" + r + g + b;
	}
		
}
