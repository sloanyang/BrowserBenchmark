(function(){

startTest("object-array" ,'b0d71f6-2da4883');

var ret = [], tmp, num = 500;

for ( var i = 16384; i <= 131072; i *= 2 ) (function(i){

	// TESTS: Array Building

	test("Array Construction, []", i, function(){
		for ( var j = 0; j < num; j++ ) {
			ret = [];
			ret.length = i;
		}
	});

	test("Array Construction, new Array()", i, function(){
		for ( var j = 0; j < num; j++ )
			ret = new Array(i);
	});

	test("Array Construction, push", i, function(){
		ret = [];
		for ( var j = 0; j < i; j++ )
			ret.push(j);
	});

	i /= 128;

	test("Array Deconstruction, pop", i, function(){
		for ( var j = 0; j < i; j++ )
			tmp = ret.pop();
	});

	test("Array Construction, unshift", i, function(){
		ret = [];
		for ( var j = 0; j < i; j++ )
			ret.unshift(j);
	});

	test("Array Deconstruction, shift", i, function(){
		for ( var j = 0; j < i; j++ )
			tmp = ret.shift();
	});

	test("Array Construction, splice", i, function(){
		ret = [];
		for ( var j = 0; j < i; j++ )
			ret.splice(0,0,j);
	});

	test("Array Deconstruction, splice", i, function(){
		for ( var j = 0; j < i; j++ )
			tmp = ret.splice(0,1);
	});

})(i);

endTest();
})();
