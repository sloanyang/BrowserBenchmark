var guide={isDoable:true,operations:0,time:null,internalCounter:true,testName:"General Page Load",testVersion:"2.0",compareScore:71.7,isConformity:0};var debugData={css:[],js:[],count:[],P:[],server:""};var ms=0;var pageLoads=[];var responsiveness=[];var internalOperations=0;var domainHost="";var diffPing=0;var downloadKBs=0;var test={init:function(){
//$.ajax({url:"/ajax/set_test",async:false,type:"POST",data:{test_name:guide.testName,test_version:guide.testVersion}});
domainParts=window.location.host.split(".");
domainHost=domainParts[domainParts.length-2]+"."+domainParts[domainParts.length-1];
document.domain=domainHost;
if($.browser.msie&&parseInt($.browser.version,10)<10){
if(continentServer!=window.location.protocol+"//"+window.location.hostname){
continentServer=window.location.protocol+"//"+window.location.hostname;forceContinent=1}}
debugData.server=continentServer;
var a=$("#content").append('<iframe name="testframe" width="1" height="1" frameborder="0"></iframe>');
var b=new Date();
ms=b.getTime();
$("iframe")[0].origin=domainHost;$("iframe")[0].src=continentServer+"/page_load/?rand="+ms;
$("iframe").remove();
return guide},
run:function(e,a){
c=new Date();startDownload=c.getTime();
$.ajax({"network_speed/download.php",async:false,cache:false}).done(function(d){
c=new Date();
endDownload=c.getTime();diffDownload=endDownload-startDownload;
downloadBytes=d.length;downloadKBs=(downloadBytes/1024)/(diffDownload/1000)});
var b=$("#content").append('<iframe name="testframe" width="1" height="1" frameborder="0"></iframe>');
var c=new Date();ms=c.getTime();$("iframe")[0].origin=domainHost;
$("iframe")[0].src=continentServer+"/page_load/?rand="+ms;
test.iframeLoaded(ms)},iframeLoaded:function(a){
$("iframe").load(function(){if($("iframe").contents().find("span#page_load")){
var n=parseFloat($("iframe").contents().find("span#page_load").html());
var i=parseFloat($("iframe").contents().find("span#responsiveness").html());
var k=0;$("iframe").contents().find("h3.dostuff-"+a).each(function(){
k++;var q=$(this).css("color");var s=$(this).css("background-color");
var r=["white","#FFF","#fff","#FFFFFF","#ffffff","rgb(255, 255, 255)","rgb(255,255,255)"];
var t=["black","#000","#000000","rgb(0, 0, 0)","rgb(0,0,0)"];
if($.inArray(q,r)){}else{
debugData.css[internalOperations]="CSS load failed: "+q+" was h3.dostuff-"+a+" color value when it should be white. 1000 milliseconds added to page load and 100 milliseconds added to responsiveness";n+=1000;i+=100}
if($.inArray(s,t)){}else{
debugData.js[internalOperations]="CSS load failed: "+s+" was h3.dostuff-"+a+" background-color value when it should be black. 1000 milliseconds added to page load and 100 milliseconds added to responsiveness";n+=1000;i+=100}});
if(k!=2){
debugData.count[internalOperations]="Wrong count: there should be two h3s but "+(k/3)+" h3s was found. 1000 milliseconds added to page load and 100 milliseconds added to responsiveness";n+=1000;i+=100}
var m=n+i;var f=100*n/m;var d=100-f;var c=(106.25/downloadKBs*1000)+i;
var l=(c-m)*f/100;var b=100*l/c;if(b>-35&&b<35){$("#network-error").hide();
var h=100-(b*f/100);var p=100-(b*d/100);debugData.P.push([downloadKBs,n,i,m,f,d,c,l,b,h,p]);
pageLoads.push(h);responsiveness.push(p)}else{$("#network-error").hide().show()}$("iframe").remove();
if(internalOperations==42){$.ajax({url:"network_speed/responsiveness.html",async:false,data:{values:responsiveness}});
var e=mathExtended.median(pageLoads);debugData.loadTimes=pageLoads;debugData.loadMedian=e;var o=e;var g=pageLoads.length;
var j=g/o*1000;debugData.elapsedTime=o;debugData.operations=g;debugData.ops=j;
benchmark.submitResult(j,guide,debugData)}else{internalOperations++;test.run(true,0)}}else{setTimeout(test.iframeLoaded(a),100)}})}};