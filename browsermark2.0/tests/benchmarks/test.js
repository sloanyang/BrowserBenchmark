var test={init:function(){$.ajax(nextTest,{async:false,type:"POST",data:{content_only:"1"}}).done(function(b){$("#content").html(b);var a=$(b).filter("#next_test").attr("data-next");$.getScript(nextTest+"/test.js",function(){nextTest=a;benchmark.init()})})},run:function(b,a){}};