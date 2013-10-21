/**
 * 1. Load test.
 * 2. Load assets.
 * //3. Calibrate browser. (Measure the speed of getTime-method.)
 * 4. Run test.
 *    a. Init.
 *    b. Run.
 *    c. Submit result.
 */
var benchmark = {
	
	// Start time.
	startTime: 0,
	
	// Selected test name.
	suiteName: "",
	suiteTitle: "",
	suiteDescription: "",
	testObjectName: "",
	suiteBackground: "",
	timeRemaining: 0,
	
	suiteProgress: 0,
	suiteCount: 0,
	
	// Test object.
	test: null,
	
	// Test suites.
	suites: false,
	
	// Suite id.
	suiteId: 0,
	
	// Test id.
	testId: 0,
	
	// Amount of unloaded tests.
	unloadedTests: 0,
	
	// Total time.
	totalTime: 0,
	
	// Values for progress bar.
	totalTests: 0,
	completedTests: 0,
	
	displayBox: true,
	
	// Currently active FPS test
	currentTest: false,
	
	// Number of rendered frames.
	renderedFrames: 0,
	
	// Time to run one "brute force" test (milliseconds).
	testTimeLimit: 2000,
	testOperationLimit: 100000,
	
	// Submit counter.
	submitResultCount: 0,

	init: function() {

    // Prevent user from navigating away.
	 // window.onbeforeunload = benchmark.leavePageConfirm;

		parent.ui.setProgressMessage("Starting test...");
		parent.ui.toggleIcon();
		
		parent.ui.setBackground(benchmark.suiteBackground);
		//parent.ui.showPlayground();

		// Avoid zero division.
		if (benchmark.suiteCount == 0) benchmark.suiteCount = 1;
		
		// Set test repeat limit to ~infinity on other browser than IE.
		// IE counts operations, other browsers count time. 
		if (navigator.userAgent.toString().indexOf("MSIE") == -1) {
			benchmark.testOperationLimit = 99999999;
		}
		
		// Set title.
		parent.ui.setTitle(benchmark.suiteTitle);
		parent.ui.setProgressValue(benchmark.suiteProgress / benchmark.suiteCount, benchmark.remainingTime);
		parent.ui.setCount(benchmark.suiteProgress + 1, benchmark.suiteCount);


		// Load script.
		parent.ui.setProgressMessage("Loading test... ");
		parent.logger.info("benchmark.loadTest", "Load test.");
		$.ajax({
			url: "js/tests/" + benchmark.suiteName + "/" + benchmark.testObjectName + ".js",
			dataType: "script",
			async: false,
			success: function() {
				parent.logger.info("benchmark.loadTest", "Test loaded.");
				eval ("benchmark.test = " + benchmark.testObjectName);
			},
			error: function() {
				parent.logger.info("benchmark.loadTest", "Test load failed!");
				benchmark.test = false;
			}
		});

    // Check that test file is loaded properly.
		if (!benchmark.test)
		{
      benchmark.test = {};
      benchmark.failedFinalize();
			return;
		}
		
		// Init values.
		var isFps = false;
		var isCustom = false;
		if (typeof(benchmark.test.isFps) != "undefined") isFps = true;
		if (typeof(benchmark.test.isCustom) != "undefined") isCustom = true;

		// Set description, if not fps-test.
		if (!benchmark.test.isFps && !benchmark.test.isCustom) {
			//parent.ui.hidePlayground();
			parent.ui.showPlayground();
			parent.ui.setDescription(benchmark.testDescription);
		} else {
			parent.ui.showPlayground();
			parent.ui.setDescription(benchmark.testDescription);
		}

		// Give rendering engine some time to update screen...
		setTimeout(benchmark.loadSourceAssets, 1);

	},

	/**
	 * Load external source core required by the test.
	 */
	loadSourceAssets: function() {
	
		// Start loading assets.
		parent.logger.info("benchmark", "Looking for source assets...");
		parent.ui.setProgressMessage("Loading assets...");

		// Get source assets from tests.
		if (typeof(benchmark.test.extendClasses) != "undefined") {
			for (var j = 0; j < benchmark.test.extendClasses.length; j++) {
				//parent.logger.info("benchmark", "Extending: " + benchmark.test.extendClasses[j]);
				assetManager.add("js/shared/" + benchmark.test.extendClasses[j] + ".js", assetManager.TYPE_SOURCE);
			}
		}

		// Start benchmark after load.
		assetManager.onload = benchmark.applySourceAssets;

		assetManager.onerror = function() {
      benchmark.throwError("assets-cannot-be-loaded");
		};

		// Load assests.
		parent.logger.info("benchmark", "Loading " + assetManager.assets.length + " classes...");
		assetManager.load();

	},

	/**
	 * Extend test class with loaded classes.
	 */
	applySourceAssets: function() {

		// Extend class with loaded classes.
		if (typeof(benchmark.test.extendClasses) != "undefined") {
			for (var i = 0; i < benchmark.test.extendClasses.length; i++) {
			
				// Evaluate extending class.
				eval(assetManager.get(benchmark.test.extendClasses[i]));
				
				// Add properties to base class.
				eval("benchmark.extend(benchmark.test, " + benchmark.test.extendClasses[i] + ");"); 
			} 
		}

		// At this point we can check if test is supported.
		if (!benchmark.isSupported(benchmark.test)) 
		{
      benchmark.failedFinalize();
			return;
		}	
		
		// Clear current assets and prepare to load image assets.
		assetManager.clear();
		
		// Continue to load image.
		benchmark.loadImageAssets();

	},

	/**
	 * Load image assets required by the test.
	 */
	loadImageAssets: function() {

		// Start loading assets.
		parent.logger.info("benchmark", "Looking for assets...");
		parent.ui.setProgressMessage("Loading assets...");
		
		// Get image assets from tests.
		if (typeof(benchmark.test.assets) != "undefined") {
			for (var j = 0; j < benchmark.test.assets.length; j++) {
				//parent.logger.info("benchmark", "Adding asset " + benchmark.test.assets[j]);
				assetManager.add(benchmark.test.assets[j]);
			}
		}

		// Start benchmark after load.
		assetManager.onload = benchmark.run;

		// Load assests.
		parent.ui.setProgressMessage("Now running");
		parent.logger.info("benchmark", "Load " + assetManager.assets.length + " assets...");
		assetManager.load();


	},

	run: function() {

		parent.logger.info("benchmark", "Test run loop.");
		
		if (benchmark.test.isFps) {

			// Start running fps-test.
			benchmark.runFPSTest();
			
		} else if (benchmark.test.isCustom) {

			// Custom test. 
			benchmark.runCustomTest();

		} else {

			// Show description.
			//parent.ui.showDescription();
			// parent.ui.setTitle(benchmark.suiteName);
			//parent.ui.setCount(benchmark.suiteId, benchmark.suites.length);
			//parent.ui.setDescription(benchmark.suites[benchmark.suiteId].description);

			// Run brute force test.
			benchmark.test.result = benchmark.runTest();

			// Submit result.
			benchmark.submitResult(benchmark.test,
									benchmark.suiteName, 
									benchmark.testObjectName,
									benchmark.test.result);

		}

		// Update progress.
		// parent.ui.setProgressValue(++benchmark.completedTests / benchmark.totalTests);



	},
	
	failedFinalize: function()
	{

    // Delay 
    $("#playground").html("<div id=\"test-not-supported\">This test is not supported by this browser, skipping to next test.</div>");
  
    setTimeout(function()
    {
      // Mark test failed.
      benchmark.test.result = -1;

      // Submit result.
      benchmark.submitResult(benchmark.test,
                  benchmark.suiteName, 
                  benchmark.testObjectName,
                  benchmark.test.result);

    }, 4000);

	},
	
	/**
	 * Finalize benchmark and get result.
	 */ 
	finalize: function()
	{

    // Remove unload check.
	  window.onbeforeunload = null;

		var url = window.location.toString();
		var random = Math.random();
		
		url = "runTest.action?random=" + random;
		
		parent.logger.info("benchmark.runTest", "Proceed to next test.");
		window.location.reload(url);

		//window.location.replace(url);

		/*
		$.get(
			"/peacekeeper/showAndSaveResult.action",
			function(data) {
				parent.ui.finalize(data);
			}
		);
		*/
		
	},

	
	/** 
	 * Start timer.
	 */
	startTimer: function() {
		var d = new Date();
		benchmark.startTime = d.getTime();
	},
	
	/**
	 * Return elapsed time.
	 */
	elapsedTime: function() {
		var d = new Date();
		var endTime = d.getTime();
		return endTime - benchmark.startTime;
	},
	
	/**
	 * Run test.
	 */
	runTest: function() {
		
		
		parent.logger.info("benchmark.runTest", "Start running test.");

		// Initialize test.
		benchmark.test.init();

		// Start timer.	
		benchmark.startTimer();
		
		// Run test until time limit is reached.
		var i = 0;
		while (benchmark.elapsedTime() < this.testTimeLimit && i < benchmark.testOperationLimit) {
			i++;
			benchmark.test.run(i);
		}
		
		// Get elapsed time.
		var elapsedTime = benchmark.elapsedTime();
		
		// Calculate operations per second.
		var ops = i / (elapsedTime / 1000);

		parent.logger.info("benchmark", "Elapsed time " + elapsedTime 
					+ ". Operations: " + i
					+ ". Operations per second: " + ops);

		// Return (operations per second)
		return ops; //i / (this.testTimeLimit / 1000); 
		
	},

	/**
	 * Run FPS test.
	 */
	runFPSTest: function(test) {
	
		// Clear parent.ui.
		// parent.ui.clearPlayground();
		
		// Reset frame counter.
		benchmark.fpsFrame = 0;
		
		// If oninitcomplete function is enabled, let test complete initialization manually.
		var automaticInitComplete = true;
		if (typeof(benchmark.test.oninitcomplete) != "undefined") {
			automaticInitComplete = false;
		}
		
		// Init animation frame.
    window.requestAnimFrame = (function()
    {
      return function(callback, element) 
      {
        window.setTimeout(callback, 5);
      };
    })();		
    
		// Create init complete function.
		benchmark.test.oninitcomplete = function() {

			parent.logger.info("benchmark.runFPSTest", "Init complete.");
	
			// Start timer.
			benchmark.startTimer();
	
			// Start animation.
			benchmark.runFPSTestFrame();
			
		}

		// Initialize test.
		parent.logger.info("benchmark.runFPSTest", "Init test.");
		benchmark.test.init();

		// Complete initialization automatically.
		if (automaticInitComplete) {
			benchmark.test.oninitcomplete();
		}		
		
	},
	
	runFPSTestFrame: function() {

		// Calculate current frame.
		var testTime = benchmark.elapsedTime();

		// If all frames are rendered, quit.
		if (testTime > benchmark.test.iterations) {

			//parent.logger.info("Average fps: " + Math.round(benchmark.renderedFrames / (testTime / 1000)));
			//alert("Average fps: " + Math.round(benchmark.renderedFrames / (testTime / 1000)));

			// Save test result.
			benchmark.test.result = benchmark.renderedFrames / (testTime / 1000);
			
			// Submit result.
			benchmark.submitResult(benchmark.test, 
									benchmark.suiteName, 
									benchmark.testObjectName,
									benchmark.test.result);

			return;
		}

		// Render frame.
		benchmark.renderedFrames++;
		try {
			benchmark.test.run(testTime);
		} catch(e) {
			parent.logger.info("benchmark.runFPSTestFrame", "FPS-test frame failed: " + e);			
		}

		// Proceed to next frame.
    requestAnimFrame(benchmark.runFPSTestFrame, null);
		
	},
	
	/**
	 * Run custom test.
	 */
	runCustomTest: function()
	{

		benchmark.test.init();
		benchmark.test.run();
		benchmark.test.oncomplete = benchmark.customTestComplete
		
	},
	
	/**
	 * Custom test is complete.
	 */
	customTestComplete: function()
	{

		// Submit result.
		benchmark.submitResult(benchmark.test, 
								benchmark.suiteName, 
								benchmark.testObjectName,
								benchmark.test.result);

	},

	/**
	 * Submit test result to server and continue to next test.
	 */	

	submitResult: function(test, suiteName, testName, result) {

		parent.logger.info("benchmark.submitResult", "Submitting test " + testName + " from suite " + suiteName + " result: " + result);		
// Detect unit.
		var unit = "";
		if (typeof test.unit != "undefined")
		{
		  unit = test.unit;
		} else {
		  unit = test.isFps ? "fps" : "ops";
		}	

		//var url = "addResult.action" 
		var url = "results.html"
										+ "?suite=" + suiteName 
										+ "&name=" + testName 
										+ "&version=" + 2 
										+ "&unit=" + unit
										+ "&score=" + result;
		//$("#testFrame").src=url;
		window.location.replace(url);
		
	}, 
/*	submitResult: function(test, suiteName, testName, result)
	{

		parent.logger.info("benchmark.submitResult", "Submitting test " + testName + " from suite " + suiteName + " result: " + result);			
		
		var windowSize = parent.ui.getWindowSize();

		// Detect unit.
		var unit = "";
		if (typeof test.unit != "undefined")
		{
		  unit = test.unit;
		} else {
		  unit = test.isFps ? "fps" : "ops";
		}
       parent.location.hash=null;
    // Submit result.
    $.ajax({
      url: "addResult.action",
      async: true,
      cache: true,
      dataType: "text",
      timeout: 10000,
      data: 
      {
        suite: suiteName,
        name: testName,
        version: 2,
        unit: unit,
        score: result
      },
      
      success: function(data) 
      {
        if (data != null) //"OK") 
        {
          parent.logger.info("benchmark.submitResult", "Submit ok.");			
       		benchmark.finalize();
        } else {
          //benchmark.throwError("submit-failed-invalid-server-response");
        }
      },

      error: function(jqXHR, textStatus, errorThrown) 
      {

        // Try 10 times to submit.
        var submitResultLimit = 10;
        
        // Debug statistics.
        $.ajax({url: "error.html?error=submit-failed&reason=" + textStatus});
    
        // Increase counter.
        benchmark.submitResultCount++;
    
        // If all submits failed, quit.
        if (benchmark.submitResultCount == submitResultLimit) 
        {
          benchmark.throwError("submit-failed-server-not-responding");
          return;
        }
    
        parent.logger.info("benchmark.submitResult", "Submit failed, retrying...");
        setTimeout(function () {
          benchmark.submitResult(test, suiteName, testName, result);
        }, 5000);

      }
    });

	},
*/
	/**
	 * Test if browser supports this test.
	 */
	isSupported: function(test) {

		// If test is not implemented, consider test as supported.
		if (typeof(test.isSupported) ==  "undefined") {
			return true;
		}

		return test.isSupported();

	},

	leavePageConfirm: function(e)
	{
      if(window.event) 
      {
        window.event.returnValue = false;
      }
      
      return "Benchmark is still running.";
	},
	
	throwError: function(message)
	{
	  window.onbeforeunload = null;
    parent.ui.throwError(message);
	},
		
	/**
	 * Extend base-object with properties from extend-object.
	 */
	extend: function(base, extend) {
		for (var key in extend) {
			if (typeof(base[key]) == "undefined") {
				base[key] = extend[key];
			}
		}
	}
	
}



/**
 * Init console.
 */
if (typeof console == 'undefined') {
	var console = {};
	console.log = function(msg) {
		return;
	};
}

