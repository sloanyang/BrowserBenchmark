/** 
 * document.querySelector
 */
var domQueryselector = {
	
	version: 1,

	iterations: 100000,
	
	hiddenPlayground: false,
	
	init: function() {
		
		// Create testing environment.
		this.hiddenPlayground = document.getElementById("hiddenPlayground");
		$.ajax({
			hiddenPlayground: this.hiddenPlayground,
			url: "resources/htmlsource4.html",
			async: false,
			cache: true,
			dataType: "text",
			success: function(data) {
				this.hiddenPlayground.innerHTML = data;
			}
		});
		
	},
	
	isSupported: function()
	{
	  return document.querySelector ? true : false;
	},
	
	run: function() {
		document.querySelector("body");
		document.querySelector("#fmLogo");
		document.querySelector("div.mainMenuArea > div:first-child");
		document.querySelector(".LinkToMoreMedium");
		document.querySelector("a *");
		document.querySelector("div");
		document.querySelector("a[target=_blank]");
		document.querySelector("a");
		
	}
	
}


