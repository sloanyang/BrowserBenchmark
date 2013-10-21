/** 
 * Basic jQuery queries.
 * DOM3-core, p. 51
 */
var domJQueryContentFilters = {
	
	version: 1,

	hiddenPlayground: false,
	
	init: function() {
		
		// Create testing environment.
		this.hiddenPlayground = document.getElementById("hiddenPlayground");
		$.ajax({
			hiddenPlayground: this.hiddenPlayground,
			url: "resources/yougamersSource.html",
			async: false,
			cache: true,
			dataType: "text",
			success: function(data) {
				this.hiddenPlayground.innerHTML = data;
			}
		});
		
	},
	
	run: function() {

		$("p:contains('Sega')");
		$("body *:empty");
		$("div:empty");
		$("div:hidden");

	}
	
}




