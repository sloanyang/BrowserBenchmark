$.urlParam = function(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return decodeURI(results[1] || 0);
}

function run(group, test){
	window.location.href = "tests.html?group=" + group + "&test=" + test;
}