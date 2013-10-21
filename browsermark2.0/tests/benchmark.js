var startTime=0;
var counter=0;
var operationsCount=0;
var animateReverse=false;
var preloadDone=false;
var benchmark={
startTimer:function(){
var a=new Date();
startTime=a.getTime()
},
elapsedTime:function(){
var b=new Date();
var a=b.getTime();
return a-startTime
},
increaseCounter:function(){
counter++
},
increaseElapsedTime:function(a){
startTime=startTime-a
},
submitResult:function(d,c,a){
window.location.href = "results.html?test=" + c.testName + "&score=" + d;
},
logger:function(a){
if(typeof(console)!="undefined"){
try{
for(prop in a){
if(a.hasOwnProperty(prop)){
if(typeof(a[prop])=="object"){
console.log(prop+":");
benchmark.logger(a[prop])
}
else{
console.log(prop+": "+a[prop])
}
}
}
}
catch(b){
console.log(b);
console.log(a)
}
}
},
init:function(){
setTimeout(benchmark.run,300)
},
run:function(){
guide=test.init();
if(typeof guide=="undefined"){}
else{
if(guide.isDoable==true){
if(guide.isConformity==true){
test.run(true,1)
}
else{
benchmark.startTimer();
if(guide.time!=null&&guide.time!=0){
while(benchmark.elapsedTime()<guide.time){
test.run(false,operationsCount);
if(guide.internalCounter==false){
benchmark.increaseCounter()
}
operationsCount++
}
}else{
for(operationsCount=0;operationsCount<guide.operations;operationsCount++){
test.run(false,operationsCount);
if(guide.internalCounter==false){
benchmark.increaseCounter()
}
}
}
test.run(true,operationsCount)
}
}
else{
benchmark.submitResult(0,guide,{});
if(debug){benchmark.logger({error:"Unable to do this test, skipping..."})}
}
}
},
timerBar:function(a){
$(a).css({width:($(a).width()-2)+"px"});
sessionStorage.span=$(a).width();
var b="4 minutes";
if(sessionStorage.span<420){
b="3.5 minutes";
if(sessionStorage.span<360){
b="3 minutes";
if(sessionStorage.span<300){
b="2.5 minutes";
if(sessionStorage.span<240){
b="2 minutes";
if(sessionStorage.span<180){
b="1.5 minutes";
if(sessionStorage.span<120){
b="1 minute";
if(sessionStorage.span<60){
b="few secs"
}
}
}
}
}
}
}
$(a).html(b)
}
};
$(window).load(function(){
benchmark.init();
if(typeof(Storage)!="undefined"){
var a=$("div#wrapper > div#exposure > div#footer > div#footer-content > p > span");
if(sessionStorage.length==0){
sessionStorage.span=$(a).width()
}
if($(a).width()>sessionStorage.span){
$(a).css({width:sessionStorage.span})
}
if(!debug){
setInterval(function(){benchmark.timerBar(a)},1000)
}
else{
$(a).html("DEBUG MODE")
}
}
});
var SEED=Math.PI;
var mathExtended={randFloat:function(){
var c=156355;
var b=449671;
var e=2;
var d=16901;
var g=1/(b);
SEED=c*(SEED&1)-d*(SEED>>1);
var f=(SEED*g);
return f},
randInt:function(){
var c=158089;
var b=213647;
var e=1;
var d=56258;
SEED=c*(SEED%e)-d*(SEED/e);
return SEED
},
setSeed:function(a){
SEED=a
},
roundFloat:function(b,c){
var a=Math.round(b*Math.pow(10,c))/Math.pow(10,c);
return a
},
median:function(d){
d.sort(mathExtended.numOrdA);
if(d.length%2==1){
var a=Math.floor(d.length/2);
return d[a]
}
else{
var c=Math.floor(d.length/2);
var b=c-1;
return((parseFloat(d[b])+parseFloat(d[c]))/2)}
},
numOrdA:function(d,c){return(d-c)}
};