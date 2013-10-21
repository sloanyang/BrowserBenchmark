var guide={isDoable:true,operations:0,time:0,internalCounter:false,testName:"Conformity HTML5",testVersion:"2.0",compareScore:1,isConformity:1};var debugData={validElements:[],invalidElements:[],validAttributes:[],invalidAttributes:[],validSelectors:[],invalidSelectors:[],validEvents:[],invalidEvents:[],validMisc:[],invalidMisc:[],pts:0,max:0};var maxPoints=0;var test={init:function(){
//$.ajax({url:"/ajax/set_test",async:false,type:"POST",data:{test_name:guide.testName,test_version:guide.testVersion}});
return guide},isValidElement:function(a){return !(document.createElement("foobarbaz").toString()==document.createElement(a).toString())},testAttributes:function(a,c,b){$.each(c,function(d){var e=$("<"+a+"></"+a+">");if(typeof(b[d])=="object"){$.each(b[d],function(f){maxPoints++;e.attr(c[d],b[d][f]);if(e.attr(c[d])==b[d][f]){benchmark.increaseCounter();debugData.validAttributes.push(a+" "+c[d]+'="'+b[d][f]+'"')}else{debugData.invalidAttributes.push(a+" "+c[d]+'="'+b[d][f]+'"')}})}else{maxPoints++;e.attr(c[d],b[d]);if(e.attr(c[d])==b[d]){benchmark.increaseCounter();debugData.validAttributes.push(a+" "+c[d]+'="'+b[d]+'"')}else{debugData.invalidAttributes.push(a+" "+c[d]+'="'+b[d]+'"')}}})},testCssSelectors:function(b){var a=$('<input type="text"></input>');$("#content").append(a);$.each(b,function(c){maxPoints++;try{if($("input:"+b[c]).length>0){benchmark.increaseCounter();debugData.validSelectors.push(":"+b[c])}else{debugData.invalidSelectors.push(":"+b[c])}}catch(d){debugData.invalidSelectors.push(":"+b[c])}});a.remove()},testEvents:function(a,b){var c=document.createElement(a);$.each(b,function(d){maxPoints++;if(b[d] in c){benchmark.increaseCounter();debugData.validEvents.push(a+" "+b[d])}else{debugData.invalidEvents.push(a+" "+b[d])}})},run:function(d,e){var c=["article","aside","bdi","command","details","summary","figure","figcaption","footer","header","hgroup","mark","meter","nav","progress","ruby","rt","rp","section","time","wbr","audio","video","source","embed","track","canvas","datalist","keygen","output","svg"];var h="embed";$.each(c,function(l){maxPoints++;if(test.isValidElement(c[l])){benchmark.increaseCounter();debugData.validElements.push(c[l]);if(c[l]=="audio"||c[l]=="video"){h=c[l]}}else{debugData.invalidElements.push(c[l])}});var f=["acronym","applet","basefont","big","center","dir","font","frame","frameset","noframes","strike","tt"];var k="* (element is removed from HTML5 specifications)";$.each(f,function(l){if(!test.isValidElement(f[l])){benchmark.increaseCounter();debugData.validElements.push(f[l]+k);k="*"}else{debugData.invalidElements.push(f[l]+k);k="*"}});var b=["hidden","draggable","dropzone","contenteditable","contextmenu","spellcheck"];var j=["hidden",true,["copy","move","link"],true,"some-menu",true];test.testAttributes("div",b,j);newInputs=["color","date","datetime","datetime-local","email","month","number","range","search","tel","time","url","week"];$.each(newInputs,function(l){maxPoints++;if(Modernizr.inputtypes[newInputs[l]]){debugData.validElements.push('input type="'+newInputs[l]+'"');benchmark.increaseCounter()}else{debugData.invalidElements.push('input type="'+newInputs[l]+'"')}});b=["autocomplete","autofocus","form","formaction","formenctype","formmethod","formnovalidate","formtarget","height","width","list","min","max","multiple","pattern","placeholder","required","step"];$.each(b,function(l){maxPoints++;if(Modernizr.input[b[l]]){debugData.validAttributes.push("input "+b[l]);benchmark.increaseCounter()}else{debugData.invalidAttributes.push("input "+b[l])}});b=["autocomplete","novalidate"];j=[["on","off"],"novalidate"];test.testAttributes("form",b,j);$.each(b,function(){});j=[["on","off"],"autofocus","someform","someprocessor.php","multipart/form-data",["post","get"],"formnovalidate","_blank",300,600,"somedatalist","1900-01-01","2049-12-31","multiple","[a-zA-Z0-9-_.+]","Some placeholder","required",3];test.testAttributes("input",b,j);var g=["valid","invalid","optional","required","in-range","out-of-range","read-write","read-only"];test.testCssSelectors(g);var a=["onafterprint","onbeforeprint","onbeforeonload","onerror","onhaschange","onmessage","onoffline","ononline","onpagehide","onpageshow","onpoststate","onredo","onresize","onstorage","onundo","onunload"];test.testEvents("body",a);a=["oncontextmenu","onformchange","onforminput","oninput","oninvalid"];test.testEvents("input",a);a=["ondrag","ondragend","ondragenter","ondragover","ondragstart","ondrop","onmousewheel","onscroll"];test.testEvents("div",a);a=["oncanplay","oncanplaythrough","ondurationchange","onemptied","onended","onerror","onloadeddata","onloadedmetadata","onloadstart","onpause","onplay","onplaying","onprogress","onratechange","onreadystatechange","onseeked","onseeking","onstalled","onsuspend","ontimeupdate","onvolumechange","onwaiting"];test.testEvents(h,a);maxPoints++;if(Modernizr.applicationcache){benchmark.increaseCounter();debugData.validMisc.push("applicationCache")}else{debugData.invalidMisc.push("applicationCache")}maxPoints++;if(Modernizr.canvas){benchmark.increaseCounter();debugData.validMisc.push("Canvas")}else{debugData.invalidMisc.push("Canvas")}maxPoints++;if(Modernizr.canvastext){benchmark.increaseCounter();debugData.validMisc.push("Canvas Text")}else{debugData.invalidMisc.push("Canvas Text")}maxPoints++;if(Modernizr.draganddrop){benchmark.increaseCounter();debugData.validMisc.push("Drag and Drop")}else{debugData.invalidMisc.push("Drag and Drop")}maxPoints++;if(Modernizr.history){benchmark.increaseCounter();debugData.validMisc.push("History Management")}else{debugData.invalidMisc.push("History Management")}maxPoints++;if(Modernizr.audio.ogg){benchmark.increaseCounter();debugData.validMisc.push("HTML5 Audio ogg")}else{debugData.invalidMisc.push("HTML5 Audio ogg")}maxPoints++;if(Modernizr.audio.mp3){benchmark.increaseCounter();debugData.validMisc.push("HTML5 Audio mp3")}else{debugData.invalidMisc.push("HTML5 Audio mp3")}maxPoints++;if(Modernizr.audio.wav){benchmark.increaseCounter();debugData.validMisc.push("HTML5 Audio wav")}else{debugData.invalidMisc.push("HTML5 Audio wav")}maxPoints++;if(Modernizr.audio.m4a){benchmark.increaseCounter();debugData.validMisc.push("HTML5 Audio m4a")}else{debugData.invalidMisc.push("HTML5 Audio m4a")}maxPoints++;if(Modernizr.video.ogg){benchmark.increaseCounter();debugData.validMisc.push("HTML5 Video ogg")}else{debugData.invalidMisc.push("HTML5 Video ogg")}maxPoints++;if(Modernizr.video.webm){benchmark.increaseCounter();debugData.validMisc.push("HTML5 Video webm")}else{debugData.invalidMisc.push("HTML5 Video webm")}maxPoints++;if(Modernizr.video.h264){benchmark.increaseCounter();debugData.validMisc.push("HTML5 Video h264")}else{debugData.invalidMisc.push("HTML5 Video h264")}maxPoints++;if(Modernizr.indexedDB){benchmark.increaseCounter();debugData.validMisc.push("indexedDB")}else{debugData.invalidMisc.push("indexedDB")}maxPoints++;if(Modernizr.localstorage){benchmark.increaseCounter();debugData.validMisc.push("localStorage")}else{debugData.invalidMisc.push("localStorage")}maxPoints++;if(Modernizr.postmessage){benchmark.increaseCounter();debugData.validMisc.push("Cross-window Messaging")}else{debugData.invalidMisc.push("Cross-window Messaging")}maxPoints++;if(Modernizr.sessionstorage){benchmark.increaseCounter();debugData.validMisc.push("sessionStorage")}else{debugData.invalidMisc.push("sessionStorage")}maxPoints++;if(Modernizr.websockets){benchmark.increaseCounter();debugData.validMisc.push("Web Sockets")}else{debugData.invalidMisc.push("Web Sockets")}maxPoints++;if(Modernizr.websqldatabase){benchmark.increaseCounter();debugData.validMisc.push("Web SQL Database")}else{debugData.invalidMisc.push("Web SQL Database")}maxPoints++;if(Modernizr.webworkers){benchmark.increaseCounter();debugData.validMisc.push("Web Workers")}else{debugData.invalidMisc.push("Web Workers")}maxPoints++;if(Modernizr.geolocation){benchmark.increaseCounter();debugData.validMisc.push("Geolocation API")}else{debugData.invalidMisc.push("Geolocation API")}maxPoints++;if(Modernizr.inlinesvg){benchmark.increaseCounter();debugData.validMisc.push("Inline SVG")}else{debugData.invalidMisc.push("Inline SVG")}maxPoints++;if(Modernizr.smil){benchmark.increaseCounter();debugData.validMisc.push("SMIL")}else{debugData.invalidMisc.push("SMIL")}maxPoints++;if(Modernizr.svg){benchmark.increaseCounter();debugData.validMisc.push("SVG")}else{debugData.invalidMisc.push("SVG")}maxPoints++;if(Modernizr.svgclippaths){benchmark.increaseCounter();debugData.validMisc.push("SVG Clip paths")}else{debugData.invalidMisc.push("SVG Clip paths")}maxPoints++;if(Modernizr.touch){benchmark.increaseCounter();debugData.validMisc.push("Touch Events")}else{debugData.invalidMisc.push("Touch Events")}maxPoints++;if(Modernizr.webgl){benchmark.increaseCounter();debugData.validMisc.push("WebGL")}else{debugData.invalidMisc.push("WebGL")}debugData.pts=counter;debugData.max=maxPoints;var i=(counter/maxPoints)*100;benchmark.submitResult(i,guide,debugData)}};