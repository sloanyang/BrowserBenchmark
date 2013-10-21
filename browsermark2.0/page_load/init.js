var d = new Date();
var windowReady = 0;

$(window).ready(function()
{
    windowReady = d.getTime();

    // Calculations variables
    var startTime = window.location.search.substring(1);
    startTime = startTime.substring(startTime.indexOf('=')+1);
    var phpTime = $('span#php_loadtime').html();

    // Populate times in content
    $('span#window_load').html(windowLoad);
    $('span#window_ready').html(windowReady);

    // Calculate responsiveness
    var responsiveness = windowLoad - phpTime - startTime;
    $('span#responsiveness').html(responsiveness);

    // Calculate page load
    var pageLoad = windowReady - windowLoad;
    $('span#page_load').html(pageLoad);

    // Update few elements background
    $('.dostuff-' + startTime).css({backgroundColor: '#000'});
});