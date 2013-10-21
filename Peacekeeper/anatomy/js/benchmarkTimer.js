/** 
 * Timer.
 */
var benchmarkTimer = {

	_startTime: 0,

	start: function()
	{
		var d = new Date();
		benchmarkTimer._startTime = d.getTime();
	},
	
	end: function()
	{
		var d = new Date();
		var elapsed = d.getTime() - benchmarkTimer._startTime;
		return elapsed;
	}

};
