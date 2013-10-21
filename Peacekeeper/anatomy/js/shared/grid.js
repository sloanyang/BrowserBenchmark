/** 
 * Render simulated maps scene.
 */
var grid = {
	
	version: 1,

	// This is fps-test.
	isFps: true,
	
	//assets: ["images/tests/homokirahvi.gif", "images/tests/zeppozeus.gif"],

	// Length in milliseconds.
	iterations: 15000,
	
	// Number of horizontal and vertical pixels.
	width: 60,
	height: 40,
	
	// Pixel divs.
	pixels: new Array(),

	init: function() {
	
		// Reset.
		var time = 0;
		this.initField(time);

	},
	
	initField: function(time) {

		// Stage size.
		var stageWidth = $("#playground").width();
		var stageHeight = $("#playground").height();
		
		// Pixel width.
		var pixelWidth = Math.floor(stageWidth / this.width);
		var pixelHeight = Math.floor(stageHeight / this.height);

		$("#playground").html("<div id=\"gridPadding\"></div>");
		
		// Set padding.
    $("#playground").css("background", "black");
		$("#gridPadding")
		  .css("padding-left", (stageWidth - pixelWidth * this.width) / 2)
		  .css("padding-top", (stageHeight - pixelHeight * this.height) / 2);
		
		for (var y = 0; y < this.height; y++) {
			this.pixels[y] = new Array();
			for (var x = 0; x < this.width; x++) {
				var pixel = document.createElement("div");
				$(pixel).addClass("renderGrid_pixel");
				$(pixel).attr("id", x + "_" + y);
				$(pixel).width(pixelWidth);
				$(pixel).height(pixelHeight);
				$("#gridPadding").append(pixel);
				this.pixels[y][x] = pixel;
			}
			$("#gridPadding").append("<div style=\"clear:both\"></div>");
		}
	
	},
	
	run: function(time) {
		for (var y = 0; y < this.height; y++) {
			for (var x = 0; x < this.width; x++) {
				var r = 1*Math.round((1 + Math.sin(x / 10 + time/800)) * 50)
						 + 1*Math.round((1 + Math.sin(y / 4 + time/800)) * 50)
						 + 1*Math.round((1 + Math.sin((y + x) / 4 - time/1200)) * 43);
				if (r > 254) r = 254;
				var g = Math.round(r * 1.1);
				if (g < 0) g = 0;
				if (g > 254) g = 254;
				this.pixels[y][x].style.backgroundColor = this.hex(r, g, 0);
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