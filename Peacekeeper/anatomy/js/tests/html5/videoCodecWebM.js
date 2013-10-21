/**
 * Test object.
 */
var videoCodecWebM = {

	extendClasses: ["video"],
	
	init: function()
	{
	
		benchmark.test.videoUrl = "riverfly04/riverfly04";
	
		benchmark.test.detectVideoSupport();

		$("#playground").css("background", "black");

		if (benchmark.test.support.webm)
		{
			benchmark.test.play("webm");
			benchmark.test.result = 1;
		} else {
			benchmark.test.finishDelay();
			benchmark.test.result = -1;
		}
	
	},
	
	finished: function() 
	{
		benchmark.test.oncomplete();
	}
	
}

