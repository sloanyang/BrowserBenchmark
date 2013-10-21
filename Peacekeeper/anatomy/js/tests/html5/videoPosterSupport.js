/**
 * Test object.
 */
var videoPosterSupport = {

	extendClasses: ["video"],

	init: function()
	{
	
		benchmark.test.videoUrl = "riverfly01/riverfly01";
	
		benchmark.test.detectVideoSupport();

    benchmark.test.testPlaybackSupport = false;

		$("#playground").css("background", "black");

		if (benchmark.test.support.poster)
		{
			benchmark.test.play();
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

