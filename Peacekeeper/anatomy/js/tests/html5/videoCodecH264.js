/**
 * Test object.
 */
var videoCodecH264 = {

	extendClasses: ["video"],

	init: function()
	{

		benchmark.test.videoUrl = "riverfly02/riverfly02";
	
		benchmark.test.detectVideoSupport();

		$("#playground").css("background", "black");

		if (benchmark.test.support.h264)
		{
			benchmark.test.play("mp4");
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

