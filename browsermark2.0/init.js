$(document).ready(function()
{
    // Calculate content minimum height
    $('#content').css('min-height', $(window).height() - 268 + 'px');

    $(window).resize(function()
    {
        // Calculate new content minimum height
        $('#content').css('min-height', $(window).height() - 268 + 'px');
    });

    // If no continent is selected, disable start buttons
    var startTestButtons = $('.start_test.enabled');
    if ($('#continent a').length > 0 && $('#continent a.activated').length == 0)
    {
        startTestButtons.removeClass('enabled');
        // hover highlight for continent heading
        $('.start_test').hover(function()
        {
            $('#select-continent').addClass('inverse-color');
        }, function()
        {
            $('#select-continent').removeClass('inverse-color');
        });
        // And same effect for mobile click
        $('.start_test').click(function()
        {
            $('#select-continent').toggleClass('inverse-color');
        });
    }

    // Continent selector
    $('#continent a').click(function()
    {
        // Disable button divs
        startTestButtons.removeClass('enabled');

        _this = this;

        var continentValue = $(this).attr('data-id');
        $.ajax({
            url: '/ajax/change_continent',
            type: 'POST',
            data: {continent: continentValue},
            async: false
        }).done(function()
        {
            $('#continent a').removeClass('activated');
            $('.start_test').unbind('hover');
            $('.start_test').unbind('click');
            $(_this).addClass('activated');

            // Enable button divs
            startTestButtons.addClass('enabled');

            $('.start_test.enabled').click(function()
            {
                var valid = $(this).attr('data-valid');

                var webgl = Modernizr.webgl == true ? '' : '?webgl=0';
                $.ajax({
                    url: '/ajax/valid',
                    type: 'POST',
                    data: {validity: valid},
                    async: false
                }).done(function()
                {
                    window.location.href = nextTest + webgl;
                });
            });

            // Push selection as event in GA
            _gaq.push(['_trackEvent', 'Continent', $(_this).html()]);
        });
    });

    $('.start_test.enabled').click(function()
    {
        var valid = $(this).attr('data-valid');

        var webgl = Modernizr.webgl == true ? '' : '?webgl=0';
        $.ajax({
            url: '/ajax/valid',
            type: 'POST',
            data: {validity: valid},
            async: false
        }).done(function()
        {
            window.location.href = nextTest + webgl;
        });
    });

    // If timer span not found and sessionStorage in use, reset timer
    if ($('span#remaining_time').length == 0 && typeof(Storage) != 'undefined')
    {
        sessionStorage.span = 999;
    }

    // Send info when browser identification was marked as invalid
    $('p#user_information input.send_info').click(function()
    {
        $.ajax(
        {
            url: '/ajax/given_name',
            type: 'POST',
            data:
            {
                given_name : $('p#user_information input.given_name').val(),
                results_id : $('p#user_information input[name=id]').val()
            }
        }).done(function(data)
        {
            $('div.help_us').first().html(data);
        });
    });

    if (debug || full)
    {
        $('#tests_dropdown select').change(function()
        {
            // Disable button divs
            var startTestButtons = $('.start_test.enabled');
            startTestButtons.toggleClass('enabled');
            $.ajax({
                url: '/ajax/test_selector',
                type: 'POST',
                data: {start: $('#tests_dropdown :selected').val()}
            }).done(function()
            {
                    // Update next test
                    nextTest = window.location.protocol + "//" + window.location.host + $('#tests_dropdown :selected').val();
                    // Enable button divs
                    startTestButtons.toggleClass('enabled');
            });
        });
    }

    $('.show_hide_meta').click(function()
    {
        // Find next meta paragraph
        var metaParagraph = $(this).next('p.meta_information');
        if ($(metaParagraph).css('display') == 'none')
        {
            // Show
            $(metaParagraph).show();
            // Change text
            $(this).html('Hide meta information');
        }
        else
        {
            // Hide
            $(metaParagraph).hide();
            // Change text
            $(this).html('Show meta information');
        }
    });

    // Share popups
    $('div.results_share a.url').click(function(event)
    {
        event.preventDefault();
        var url = $(this).attr('href');
        var width = $(this).attr('data-width');
        var height = $(this).attr('data-height');
        var media = $(this).attr('data-media');

        // Calculate left & top
        var left = Math.floor(($(window).width() - width) / 2);
        var top = Math.floor(($(window).height() - height) / 2);
        window.open(url, '_blank', 'width=' + width + ',height=' + height + ',toolbar=0,menubar=0,location=0,status=0,scrollbars=0,resizable=0,left=' + left + ',top=' + top);

        // Push selection as event in GA
        _gaq.push(['_trackEvent', media, 'Share', url]);

    });

});