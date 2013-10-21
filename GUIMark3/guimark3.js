
TimeUtil = {
	startTime: new Date().getTime(),
	getTimer: function(){
		return new Date().getTime()-TimeUtil.startTime;
	}
}

function FPSMeter(){
	var sampleFPS = 0;
	var lastSampledTime = 0;
	var sampleFrames = 0;
	
	this.sampleDuration = 500;
	this.increment = function(){
		sampleFrames++;
	}
	this.getFramerate = function(){
		var diff = TimeUtil.getTimer()-lastSampledTime;
		if(diff >= this.sampleDuration){
			var rawFPS = sampleFrames/(diff/1000);
			sampleFPS = FPSMeter.formatNumber(rawFPS);
			sampleFrames = 0;
			lastSampledTime = TimeUtil.getTimer();
		}
		return sampleFPS;
	}
}
FPSMeter.formatNumber = function(val){
	//format as XX.XX
	return Math.floor(val*100)/100;
}


function PerformanceBar(name, elem){
	var meter = new FPSMeter();
	var title = name;
	var label;
	var action;
	this.updatePerformance = function(){
		meter.increment();
		if(testState == 0){
			label.innerHTML = title+": "+meter.getFramerate()+" fps";
		}else if(testState == 1){
			this.continueTest();
			label.innerHTML = "Testing... "+meter.getFramerate()+" fps";
		}else{
			label.innerHTML = title;
		}
	}
	
	//test runner
	var testBegin = 0;
	var testData = [];
	var testState = 0;
	this.startTest = function(){
		testBegin = TimeUtil.getTimer();
		testState = 1;
		testData = [];
	}
	this.continueTest = function(){
		var time = TimeUtil.getTimer();
		testData.push(time);
		if(time-testBegin > 10000){
			testState = 2;
			var output = testData.length/(time-testBegin)*1000;
			title = "Test Results: "+FPSMeter.formatNumber(output)+" fps";
		}
	}
	
	this.createChildren = function(elem){
		elem.innerHTML = "<span id='testlabel'></span><span id='testaction'>Start Test</a>";
		label = document.getElementById('testlabel');
		action = document.getElementById('testaction');
		action.addEventListener('click', this.startTest, false);
	}
	this.createChildren(elem);
}