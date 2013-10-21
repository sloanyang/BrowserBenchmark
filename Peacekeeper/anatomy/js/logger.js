var logger = {
	
	info: function(object, msg) {
		var url = window.location + "";
		if (url.indexOf("debug=true") != -1) {
			var output = object + ": " + msg;
			if (typeof(console) != "undefined") {
				console.log(output);
			}
			$("#log").show();
			$("#log").html(output + "<br />" + $("#log").html());
		}
	}
	
}