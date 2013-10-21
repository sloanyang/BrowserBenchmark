(function(){

// The Great Computer Language Shootout
//  http://shootout.alioth.debian.org
//
//  Contributed by Ian Osgood

function pad(n,width) {
  var s = n.toString();
  while (s.length < width) s = ' ' + s;
  return s;
}

function primes(isPrime, n) {
  var i, count = 0, m = 10000<<n, size = m+31>>5;

  for (i=0; i<size; i++) isPrime[i] = 0xffffffff;

  for (i=2; i<m; i++)
    if (isPrime[i>>5] & 1<<(i&31)) {
      for (var j=i+i; j<m; j+=i)
        isPrime[j>>5] &= ~(1<<(j&31));
      count++;
    }
}

startTest("bitops-nsieve-bits" ,'b0d71f6-2da4883');

for ( var i = 2; i <= 5; i++ ) (function(i){
	test( "N-Sieve Bits", i, function(){
		var isPrime = new Array((10000<<i)+31>>5);
		primes(isPrime, i);
	});
})(i);

endTest();
})();
