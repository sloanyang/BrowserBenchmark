var video = {
	
  version: 1,
  
  isCustom: true,
  
  iOS: !!navigator.userAgent.match('iPhone OS') || !!navigator.userAgent.match('iPad'),
  
  videoUrl: "riverfly01/riverfly01",
  
  testPlaybackSupport: true,
	
	/*
    init: function() {

		var src = "<dl class=\"videoSupport-support\">";
		src += "<dd>Video playback:</dd><dt>" + (benchmark.test.support.video ? '<span class=\"yes\">Yes' : '<span class=\"no\">No') + "</span></dt>";
		src += "<dd>Poster image:</dd><dt>" + (benchmark.test.support.poster ? '<span class=\"yes\">Yes' : '<span class=\"no\">No') + "</span></dt>";
		src += "<dd>Subtitles:</dd><dt>" + (benchmark.test.support.track ? '<span class=\"yes\">Yes' : '<span class=\"no\">No') + "</span></dt>";
		src += "<dd>Codecs:</dd><dt>" 
				+ (benchmark.test.support.mp4 ? 'MP4 ' : '')
				+ (benchmark.test.support.h264 ? 'H.264 ' : '')
				+ (benchmark.test.support.theora ? 'Theora ' : '')
				+ (benchmark.test.support.webm ? 'WebM ' : '')
		src += "</dd></dl>";
		$("#playground").append(src);
		
    },
	*/
    
  play: function(format)
  {
		
    // Create player.
    $("#playground").append("<div id=\"videoplayer-container\"></div>");
			
		// Append video.
		if (format == "mp4")
		{
			$("#videoplayer-container").append("<video id=\"videoplayer\" width=\"640\" height=\"360\" autobuffer autoplay> \
										<source src=\"resources/videos/" + this.videoUrl + ".mp4\" type=\"video/mp4\" />\
									</video>");
		} else if (format == "webm")
		{
			$("#videoplayer-container").append("<video id=\"videoplayer\" width=\"640\" height=\"360\" autobuffer autoplay> \
										<source src=\"resources/videos/" + this.videoUrl + ".webm\" type=\"video/webm\" />\
									</video>");
		} else if (format == "ogg")
		{
			$("#videoplayer-container").append("<video id=\"videoplayer\" width=\"640\" height=\"360\" autobuffer autoplay> \
										<source src=\"resources/videos/" + this.videoUrl + ".ogv\" type=\"video/ogg\" />\
									</video>");
		} else {
			$("#videoplayer-container").append("<video id=\"videoplayer\" width=\"640\" height=\"360\" autobuffer autoplay> \
										<source src=\"resources/videos/" + this.videoUrl + ".mp4\" type=\"video/mp4\" /> \
										<source src=\"resources/videos/" + this.videoUrl + ".webm\" type=\"video/webm\" /> \
										<source src=\"resources/videos/" + this.videoUrl + ".ogv\" type=\"video/ogg\" />\
									</video>");
		}

    // Bind loading events.
    $("#playground").append("<div class=\"videoplayer-loading-label\">Initializing...</div>");
    $("#videoplayer").bind("progress", benchmark.test.updateProgress);
    $("#videoplayer").bind("play", function(){
      $(".videoplayer-loading-label").text("");
    });

    // Bind ended function and fallback.
    if (benchmark.test.testPlaybackSupport)
    {
  		$("#videoplayer").bind("ended", benchmark.test.detectPlaySupportAndFinish);
      setTimeout(benchmark.test.detectPlaySupportAndFinish, 40000);
    } else {
  		$("#videoplayer").bind("ended", benchmark.test.finished);
      setTimeout(benchmark.test.finished, 40000);
    }

  },

	finishDelay: function()
	{
		$("#playground").append("<div class=\"videoSupport-not-supported\">Codec not supported by this browser.</div>");
		setTimeout(benchmark.test.finished, 3000);
	},

  updateProgress: function(e)
  {
  
    if ($("#videoplayer")[0].readyState != $("#videoplayer")[0].HAVE_ENOUGH_DATA)
    {
    
      var progress = 0;
      
      if (e.total && e.loaded)
      {
        $(".videoplayer-loading-label").text("Buffering " + Math.round(e.loaded / e.total) + "%");
      } else if (typeof $("#videoplayer")[0].buffered != "undefined") {

        // Get elements.
        var video = $("#videoplayer")[0];
        var buffered = video.buffered;

        // Calculate total buffered time.
        var bufferedTime = 0;
        for (var i = 0; i < buffered.length; i++) 
        {
          bufferedTime += buffered.end(i) - buffered.start(i)
        }
        
        progress = Math.round(bufferedTime / video.duration * 100);
        
      }

      if (progress > 0)
      {
        $(".videoplayer-loading-label").text("Buffering " + progress + "%");
      } else {
        $(".videoplayer-loading-label").text("Buffering...");
      }
      
      
    } else {
      $(".videoplayer-loading-label").text("");
    }

  },

	detectVideoSupport: function()
	{

		// Create element for testing video support.
		benchmark.test.element = document.createElement('video');

		// Check support
		benchmark.test.support = {
			video: 	!!benchmark.test.element.canPlayType,
			track: 	'track' in document.createElement('track'),
			poster: 'poster' in benchmark.test.element,
			mp4: 	!!benchmark.test.element.canPlayType && benchmark.test.canPlayType('video/mp4; codecs="mp4v.20.8"'),
			h264: 	!!benchmark.test.element.canPlayType && (benchmark.test.canPlayType('video/mp4; codecs="avc1.42E01E"') || benchmark.test.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')),
			theora: !!benchmark.test.element.canPlayType && benchmark.test.canPlayType('video/ogg; codecs="theora"'),
			webm: 	!!benchmark.test.element.canPlayType && benchmark.test.canPlayType('video/webm; codecs="vp8"')
		};

	},

  /**
   * Check that video is actually playing.
   */
  detectPlaySupportAndFinish: function()
  {
    var player = $("#videoplayer");
    if (player.length > 0 && player[0].currentTime > 0)
    {
			benchmark.test.result = 1;
      benchmark.test.finished();      
    } else {
			benchmark.test.result = -1;
      benchmark.test.finished();      
    }
  },

  run: function() 
  {
  },

	canPlayType: function(t) 
	{
		if (benchmark.test.iOS)
			return benchmark.test.element.canPlayType(t) == 'probably' || benchmark.test.element.canPlayType(t) == 'maybe';
		else 
			return benchmark.test.element.canPlayType(t) == 'probably';
	}

}
