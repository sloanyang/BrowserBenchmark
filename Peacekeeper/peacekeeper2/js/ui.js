var ui = {
	
	resultActionUrl: "results",
	
	log: function(msg) {
		
		if (typeof(console) != "undefined") {
			console.log(msg);
		}
		//$("#output").append(msg + "<br />");
		
	},
	
	finalize: function(output) {
		
		this.showDescription();
		this.setTitle("Benchmark complete");
		this.setDescription(output);
		
	},

	toggleIcon: function() {
		if ($("#progressIcon").hasClass("progress1")) {
			$("#progressIcon").removeClass("progress1");
			$("#progressIcon").addClass("progress2");
		} else {
			$("#progressIcon").removeClass("progress2");
			$("#progressIcon").addClass("progress1");
		}
	},
	
	setProgressValue: function(status, remainingTime) {
		$("#progressBar").css("width", Math.round($("#progressBarAnchor").width() * status));
		$("#progressRemaining").html(remainingTime);
	},
	
	setProgressMessage: function(message) {
		$("#progressBarLabel").html(message);
	},
	
	setProgress: function(value, message) {
		$("#progressBarLabel").html(message);
		$("#progressBar").css("width", value);
	},
	
	/**
	 * Display playground.
	 */
	showPlayground: function(callbackScript) {
	
		$("#playgroundContainer").show();
		//$("#description").hide();
		//$("#playground").show();
		
	},
	
	hidePlayground: function(callbackScript) {
	
		$("#playgroundContainer").hide();
		//$("#description").hide();
		//$("#playground").show();
		
	},
	
	clearPlayground: function() {
		// Clear current content.
		$("#playground").html("");
	},
	
	/**
	 *
	 */
	showDescription: function() {
		$("#playgroundContainer").show();
		$("#description").show();
		$("#playground").hide();
	},
	
	setTitle: function(title) {
		$("#descriptionLeft span.title").text(title);
	},
	
	setCount: function(count, maxCount) {
		$("#descriptionLeft span.count").text("# " + count + "/" + maxCount);
	},
	
	setDescription: function(description) {
		$("#test-description").html(description);
		//$("#description").show();
		//$("#testFrame").hide();
	},
	
	hideDescription: function() {
		$("#test-description").hide();
		$("#testFrame").show();
	},
	
	/**
	 * Added delay to avoid backend crash.
	 */
	showResult: function(key, resultId) {
	  setTimeout("ui.showResultDelayed('" + key + "', " + resultId + ")", 5000);
  },
  
	showResultDelayed: function(key, resultId) {
	
		// Are we in repeat mode or not?
		var url = "" + window.location; 
		
		// Read request parameters.
		var parameters = new Array();
		parameters.push({key:"key",value:key});
		if (url.search("repeat=true") != -1) {
			parameters.push({key:"repeat",value:"true"});
		}
		if (url.search("debug=true") != -1) {
			parameters.push({key:"debug",value:"true"});
		}

		parameters.push({key:"resultId",value:resultId});
		
		var forceSuiteName = ui.getUrlParam("forceSuiteName");
		var forceTestName = ui.getUrlParam("forceTestName");
		if (forceSuiteName != "") parameters.push({key:"forceSuiteName",value:forceSuiteName});
		if (forceTestName != "") parameters.push({key:"forceTestName",value:forceTestName});
		
		// Create url.
		url = ui.resultActionUrl + "?";
		for (var i = 0; i < parameters.length; i++) {
			url += parameters[i].key + "=" + parameters[i].value + (i + 1 != parameters.length ? "&" : ""); 
		}		
		window.location = url;
	
	},

	showValidityCheck: function(key, testName) {
	
		window.location = "validityCheck.action?key=" + key + "&testName=" + testName;
	
	},
	
	throwError: function(message) {

    // Remove unload check.
	  window.onbeforeunload = null;

		window.location = "index.action?error=true&message=" + message;

	},
	
	getWindowSize: function() {
		return {
			width: $(window).width(),
			height: $(window).height()
		}
	},
	
	/**
	 * Show requested background.
	 */
	setBackground: function(background) {
	
    $("#background-container div").hide();

		// Blank is default.
		if (background == "") 
		{
      return
		}
	
	  // Show given bg.
    $("#background-" + background).show();
	
	},

  getUrlParam: function(name) {
    
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if (results == null) {
      return "";
    } else {
      return results[1];
    }
    
  }	
	
	
}