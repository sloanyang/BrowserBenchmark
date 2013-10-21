/** 
 * Basic jQuery queries.
 * DOM3-core, p. 51
 */
var domJQueryBasics = {
	
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

		$("#chosenOne");
		$("div");
		$(".title");
		$("*", document.body);
		$("div.title:nth-child(1)");

	}
	
}


