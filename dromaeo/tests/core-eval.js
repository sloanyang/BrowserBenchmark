(function(){

startTest("core-eval" ,'b0d71f6-2da4883');

// Try to force real results
var ret, tmp;

// The commands that we'll be evaling
var cmd = 'var str="";for(var i=0;i<10;i++){str += "a";}ret = str;';

// TESTS: eval()

for ( var num = 1; num <= 8; num *= 2 ) (function(num){

	test( "No eval", num, function(){
		for ( var n = 0; n < num; n++ ) {
			var str = "";
			for ( var i = 0; i < 100; i++ ) {
				str += "a";
			}
			ret = str;
		}
	});

	tmp = cmd;

	for ( var n = 0; n < num; n++ )
		tmp += tmp;

	test( "Normal eval", num, function(){
		eval(tmp);
	});

	test( "new Function", num, function(){
		(new Function(tmp))();
	});

	var fn;
	try {
	   fn = new Function(tmp);
	} catch(e){}

	test( "Pre-Compiled Function", num, function(){
		fn();
	});

})(num);

endTest();
})();
