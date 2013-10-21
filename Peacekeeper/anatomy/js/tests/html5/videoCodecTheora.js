/**
 * Test object.
 */
var videoCodecTheora = {

	extendClasses: ["video"],

	init: function()
	{
	
		benchmark.test.videoUrl = "riverfly03/riverfly03";
	
		benchmark.test.detectVideoSupport();

		$("#playground").css("background", "black");

		if (benchmark.test.support.theora)
		{
			benchmark.test.play("theora");
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

