/**
 * General CSS Resize
 *
 * CSS Resize test will have one, static div that contain divs that measurements are percentages. Some of those divs
 * also contain similar divs and some of those divs contains similar divs. Script will start to resize the primary div
 * and after each resize, script will measure each div each corner to see that div is still inside it parent div.
 *
 * From each corner that stays in parent div, counter is increased by one. As an additional score, script will measure
 * in second run does divs positions stayed same from first run same phase. If yes, round points are multiplied by two.
 *
 * To determine internal score, script will use operations/second (ops): counter / elapsed time in milliseconds x 1000
 * Final score is calculated with formula 1000 x (ops / compare).
 *
 * @version 2.0
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2012 Rightware
 **/

// Default guide for benchmark.js
var guide = {
    isDoable : true, // Always doable
    operations : 0,
    time : null,
    internalCounter : true,
    testName : 'General CSS Resize',
    testVersion : '2.0',
    compareScore : 156.2,
    isConformity : 0 // Not false but zero because this value is sent through POST which stringify values
};

var internalOperationsCount = 0;
var internalOperationsTotal = 9;
var divWidth = 498;
var divHeight = 498;
var offsetArray = [
    [],
    [],
    [],
    []
];

var debugData = {
    offsetFailure: [],
    outOfBorders: []
};

var test = {
    init : function()
    {
        // Save test but not asynchronous, before continue test must be saved to prevent mismatch error
		/*
        $.ajax(
        {
            url: '/ajax/set_test',
            async: false,
            type: 'POST',
            data:
            {
                test_name: guide.testName,
                test_version: guide.testVersion
            }
        });
		*/
        return guide;

    },
    measureCorners : function()
    {
        var roundValue = internalOperationsCount % 4;
        // Get all divs from resize div
        $('div#resize div').each(function(i)
        {
            var multiplier = 1;

            // Get parent offset
            var parentOffset = $(this).parent().offset();
            var parentLeft = Math.round(parentOffset.left);
            var parentTop = Math.round(parentOffset.top);
            var parentRight = Math.round(parentOffset.left + $(this).parent().width());
            var parentBottom = Math.round(parentOffset.top + $(this).parent().height());

            // Get measured div corners
            var divOffset = $(this).offset();
            var divLeft = Math.round(divOffset.left - parseInt($(this).css('margin-left')) - parseInt($(this).css('padding-left')) - parseInt($(this).css('border-left-width')));
            var divTop =Math.round(divOffset.top - parseInt($(this).css('margin-top')) - parseInt($(this).css('padding-top')) - parseInt($(this).css('border-top-width')));
            var divRight = Math.round(divOffset.left + $(this).outerWidth());
            var divBottom = Math.round(divOffset.top + $(this).outerHeight());

            // Check does element contain saved offset already
            try
            {
                if (typeof(offsetArray[roundValue][i]) != 'undefined')
                {
                    // Compare top and left to earlier offset
                    if (Math.round(offsetArray[roundValue][i].top) == Math.round(divOffset.top) && Math.round(offsetArray[roundValue][i].left) == Math.round(divOffset.left))
                    {
                        // Position same as in earlier round, give 2x multiplier
                        multiplier = 2;
                    }
                    else
                    {
                        var errorMessage = [
                            'Round ' + internalOperationsCount,
                            'Div #' + i,
                            '[' + Math.round(divOffset.top) + ',' + Math.round(divOffset.left) + '] != ' +
                            '[' +     Math.round(offsetArray[roundValue][i].top) + ',' + Math.round(offsetArray[roundValue][i].left) + ']'
                        ];
                        debugData.offsetFailure.push(errorMessage);
                    }
                }
                // Save offset
                offsetArray[roundValue].push(divOffset);
            }
            catch(e)
            {
                // Save offset
                offsetArray[roundValue].push(divOffset);
            }

            var error = false;
            if (divLeft >= parentLeft)
            {
                benchmark.increaseCounter();
                if (multiplier == 2)
                {
                    benchmark.increaseCounter();
                }
            }
            else
            {
                error = true;
            }
            if (divTop >= parentTop)
            {
                benchmark.increaseCounter();
                if (multiplier == 2)
                {
                    benchmark.increaseCounter();
                }
            }
            else
            {
                error = true
            }
            if (divRight <= parentRight)
            {
                benchmark.increaseCounter();
                if (multiplier == 2)
                {
                    benchmark.increaseCounter();
                }
            }
            else
            {
                error = true
            }
            if (divBottom <= parentBottom)
            {
                benchmark.increaseCounter();
                if (multiplier == 2)
                {
                    benchmark.increaseCounter();
                }
            }
            else
            {
                error = true
            }

            // If error
            if (error)
            {
                var errorMessage = [
                    'Round ' + internalOperationsCount,
                    'Div #' + i,
                    '[' + divTop + ',' + divRight + ',' + divBottom + ',' + divLeft + '] ' + 'not completely in it ' +
                    'parent [' + parentTop + ',' + parentRight + ',' + parentBottom + ',' + parentLeft + ']'
                ];
                debugData.outOfBorders.push(errorMessage);
            }
        });
    },
    run : function(isFinal, loopCount)
    {
        var resizeDiv = $('#content > div#resize');
        internalOperationsCount++;
        test.measureCorners();
        if (internalOperationsCount >= internalOperationsTotal)
        {
            elapsed = benchmark.elapsedTime();
            finalScore = counter / elapsed * 1000;
            debugData.elapsedTime = elapsed;
            debugData.operations = counter;
            debugData.ops = finalScore;

            //console.log(counter + '/' + (counter + falseCounter));
            //console.log(offsetArray);
            $('div#resize').remove();
            benchmark.submitResult(finalScore, guide, debugData);
        }
        else if (divWidth == 498 && divHeight == 498)
        {
            $(resizeDiv).animate({width: '998px'}, 500, function()
            {
                divWidth = 998;
                if (internalOperationsCount < internalOperationsTotal)
                {
                    test.run(isFinal, internalOperationsCount);
                }
            });
        }
        else if (divWidth == 998 && divHeight == 498)
        {
            $(resizeDiv).animate({height: '998px'}, 500, function()
            {
                divHeight = 998;
                if (internalOperationsCount < internalOperationsTotal)
                {
                    test.run(isFinal, internalOperationsCount);
                }
            });
        }
        else if (divWidth == 998 && divHeight == 998)
        {
            $(resizeDiv).animate({width: '498px'}, 500, function()
            {
                divWidth = 498;
                if (internalOperationsCount < internalOperationsTotal)
                {
                    test.run(isFinal, internalOperationsCount);
                }
            });
        }
        else
        {
            $(resizeDiv).animate({height: '498px'}, 500, function()
            {
                divHeight = 498;
                if (internalOperationsCount < internalOperationsTotal)
                {
                    test.run(isFinal, internalOperationsCount);
                }
            });
        }
    }
};