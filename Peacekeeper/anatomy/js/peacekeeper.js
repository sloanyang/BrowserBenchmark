var peacekeeper = {
	
	openResultId: 0,
	
	init: function() {
    $(".resultBarContainer .resultDetailsLabel").click(function(e) {
      var resultId = $(e.target).parent().parent().attr("resultid");
      if (resultId)
      {
        peacekeeper.openResult(resultId);
      }
    });
	},
	
	openMyResults: function()
	{

		$("#my-results-dialog").dialog({
			resizable: false,
			width: 600,
      modal: true
		}).load('myresults.action');

	},
	
	openResult: function(id, item) {

		$("#result-dialog").dialog({
			resizable: false,
			width: 600,
			height: 1000,
      modal: true
		});

		// Load box.
  	$("#result-dialog").html("");
		$.ajax({
			url: "ajax/resultDetails.action?id=" + id + "&r=" + Math.random(),
			dataType: "html",
			success: function(data) {
				
				// Add new shit.
				$("#result-dialog").dialog("close");
				$("#result-dialog").html(data);
				$("#result-dialog").dialog("open");
			}
		});

		
	},
	
	closeResult: function() {
	
		$("#resultDetails").hide();
	
	},
	
	toggleFAQItem: function(element) {
		element = $(element).parent().next(); 
		while(typeof(element[0]) != "undefined" && element[0].tagName.toLowerCase() != "h2") {
			if ($(element).css("display") == "none") {
				$(element).css("display", "block");
			} else {
				$(element).css("display", "none");
			}
			element = $(element).next();
		}
		
	}
}

$(document).ready(peacekeeper.init);