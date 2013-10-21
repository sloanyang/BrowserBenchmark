/** 
 * document.detElementById
 * DOM3-core, p. 51
 */
var domGetElements = {
	
	version: 1,

	iterations: 100000,
	
	hiddenPlayground: false,
	
	init: function() {
		
		// Create testing environment.
		this.hiddenPlayground = document.getElementById("hiddenPlayground");
		$.ajax({
			hiddenPlayground: this.hiddenPlayground,
			url: "resources/htmlsource.html",
			async: false,
			cache: true,
			dataType: "text",
			success: function(data) {
				this.hiddenPlayground.innerHTML = data;
			}
		});
		
	},
	
	run: function() {

		// Get element by id.
		document.getElementById("logo");
		document.getElementById("technologies");
		document.getElementById("item222");
		
		document.getElementsByTagName("a");
		document.getElementsByTagName("h1");
		document.getElementsByTagName("div");
		
	}
	
}


