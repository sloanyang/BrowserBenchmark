/**
 * Image object.
 */
var batchImage = 
{
	id: "",
	src: "",
	imageData: null,
	canvasElement: null,
	imageElement: null
};

/**
 * Test.
 */
var workerContrast02 = 
{

	// This is custom test.
	isCustom: true,

	imageNames: ["kids_jumping.jpg", 
	              "kids_jumping.jpg", 
	              "kids_jumping.jpg", 
	              "kids_jumping.jpg"],
	images: [],
	loadedImages: 0,
	processedImages: 0,

	// Total amount of pixels.
	pixels: 0,
	
	width: 2560,
	height: 1597,

	init: function()
	{
	},

	run: function()
	{

		$("#playground")
		  .css("background", "black")
		  .css("padding-top", 100);
		benchmark.test.loadImages();
	
	},
	
	loadImages: function()
	{

		// Create images.
		for (var i = 0; i < workerContrast02.imageNames.length; i++)
		{
			var img = $.extend({}, batchImage);
			workerContrast02.images.push(img);
			//console.log(img);
			img.id = "image_" + i;
			img.imageElement = new Image();
			img.imageElement.onload = workerContrast02.imageLoaded;
			img.imageElement.src = "images/tests/worker/" + workerContrast02.imageNames[i];
		}
		
	},
	
	isSupported: function()
	{
		
		// Exclude browsers not supporting Workers correctly.
		if (typeof(Worker) != "undefined")
		{

      // Firefox 3 not supported.
      if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
      { 
        //test for Firefox/x.x or Firefox x.x (ignoring remaining digits);
        var ffversion = new Number(RegExp.$1) // capture x.x portion and store as a number
        if (ffversion >= 3 && ffversion < 4)
        {
          return false;
        }
      }

      // Windows safari crashes.
      if (!/.*Chrome.*/.test(navigator.userAgent) 
          && /Safari[\/\s](\d+\.\d+)/.test(navigator.userAgent) 
          && /.*Windows.*/.test(navigator.userAgent))
      {
          return false;
      }

      // iOS devices
      if (/.*iPad.*/.test(navigator.userAgent)
          || /.*iPod.*/.test(navigator.userAgent)
          || /.*iPhone.*/.test(navigator.userAgent))
      {
          return false;
      }

	// Just skip everything mobile
      if (/.*Mobi.*/.test(navigator.userAgent) )
      {
          return false;
      }



      // Not working on N9.
      if (/.*NokiaN9.*/.test(navigator.userAgent))
      {
          return false;
      }

			return true;

		} else {
			return false;
		}
	},
	
	imageLoaded: function(e)
	{
	
		// Add image to screen.
		for (var i = 0; i < workerContrast02.images.length; i++)
		{
			if (e.target == workerContrast02.images[i].imageElement)
			{
				// Add current image to screen.
				workerContrast02Ui.addImage(workerContrast02.images[i]);
			}
		}	
	
		workerContrast02.loadedImages++;
		if (workerContrast02.loadedImages == workerContrast02.images.length)
		{
			//console.log("All images loaded!");
			setTimeout("workerContrast02.startProcessing()", 4000);
		}
	},
	
	startProcessing: function()
	{

		benchmarkTimer.start();
	
		for (var i = 0; i < workerContrast02.images.length; i++)
		{
		
			// Create new worker.
			var worker = new Worker('js/tests/html5/workerContrastWorker.js');
			
			// Shortcut to image.
			var img = workerContrast02.images[i];

			// Add event listener.
			worker.addEventListener('message', workerContrast02.processComplete, false);

			// Create canvas.
			var canvas = document.createElement("canvas");
			canvas.width = benchmark.test.width;
			canvas.height = benchmark.test.height;
			var ctx = canvas.getContext("2d");
			
			// Calculate total amount of pixels.
			workerContrast02.pixels += canvas.width * canvas.height;
		
			// Draw image to canvas.
			ctx.drawImage(img.imageElement, 0, 0, canvas.width, canvas.height);

			// Get image data.
			img.imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			img.imageElement = false;

			// Start worker.
			worker.postMessage(img);

		}
	
	},
	
	processComplete: function(e)
	{

		// Create canvas.
		var canvas = document.createElement("canvas");
		
		canvas.width = benchmark.test.width;
		canvas.height = benchmark.test.height;
		var ctx = canvas.getContext("2d");
		
		ctx.putImageData(e.data.imageData, 0, 0);
		
		e.data.canvasElement = canvas;
		
		workerContrast02Ui.addEditedImage(e.data);
		
		workerContrast02.processedImages++;
		if (workerContrast02.processedImages == workerContrast02.images.length)
		{
			var elapsed = benchmarkTimer.end();
			
			var pixelsPerMillisecond = workerContrast02.pixels / elapsed;
			
			benchmark.test.result = pixelsPerMillisecond;

			setTimeout("benchmark.test.oncomplete()", 4000);
			
		}
		
	}


}

var workerContrast02Ui = {

	addImage: function(img)
	{

		var image = img.imageElement;

		// Create container.
		var container = $('<div class="worker-comparison"></div>');
		$(container).attr("id", "container-" + img.id);
		
		// Create image.
		$(image).addClass("worker-comparison-original");
		container.append(image);
		
		// Add to body.
		$("#playground").append(container);


	},

	addEditedImage: function(img)
	{
		
		// Get container.
		var container = $("#container-" + img.id);
		 
		// Add canvas
		$(img.canvasElement).addClass("worker-comparison-edited");
		$(container).append(img.canvasElement);
		
	}

}

