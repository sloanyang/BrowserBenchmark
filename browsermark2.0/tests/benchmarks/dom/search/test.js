var guide={isDoable:true,operations:0,time:4000,internalCounter:false,testName:"DOM Search",testVersion:"2.0",compareScore:2788.6,isConformity:0};var test={init:function(){
//$.ajax({url:"/ajax/set_test",async:false,type:"POST",data:{test_name:guide.testName,test_version:guide.testVersion}});
return guide},run:function(c,h){var d=$("#logo");var i=$("#technologies");var f=$("#item222");var j=$("a");var g=$("h1");var b=$("div");if(c){$("div#hidden_playground").remove();var k=benchmark.elapsedTime();var e=counter/k*1000;benchmark.submitResult(e,guide,{elapsedTime:k,operations:counter,ops:e})}}};