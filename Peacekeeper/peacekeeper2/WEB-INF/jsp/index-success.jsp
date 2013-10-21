<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<html>
	<head>
		<title></title>
    <script src="http://clients.futuremark.com/calico/js/calico.js"></script>
    <script src="http://java.com/js/deployJava.js"></script>
		<style>
		body {
			background: url(images/v2/bg.jpg) no-repeat center 67px;
    }
    </style>
    <script type="text/javascript">
  
      function toggleSingleMenu()
      {
        if ($("#single-test-menu").is(":visible"))
        {
          $("#single-test-menu").fadeOut();
        } else {
          $("#single-test-menu").fadeIn();
        }
      }
  
      function runSingleTest()
      {
      
        var testName = $("#single-test-name").val();
      
        var url = "";
        if (testName == "all")
        {
          var repeat = $("#repeat").is(":checked");
          url = "run.action?repeat=" + repeat;
        } else {
          var suiteName = testName.replace(/\-.*/i, "");
          var testName = testName.replace(/.*\-/i, "");
          var repeat = $("#repeat").is(":checked");
          url = "run.action?debug=true&repeat=" + repeat + "&forceSuiteName=" + suiteName + "&forceTestName=" + testName;
        }
        
        $("#single-test-form").attr("action", url).submit();
      
      }
      
      function startBatteryTest() {

        $("#battery-test-dialog").load("ajax/startBatteryTest.action");

      }

      function openBatteryTestDialog() {
      
        $("#battery-test-dialog").dialog({
          modal: true,
          width: 400,
          resizable: false
        });		
      
      }
      
      /**
       * Start benchmark.
       */
      function go() 
      {
      
        if ($("#analyze-enabled").is(":checked"))
        {
          window.location = "scan.action";
        } else {
          window.location = "run.action";
        }
      
      }
  
      $(document).ready(function() {
      
        $("body").addClass("front");
      
        // Do cookie check.
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;
        if (typeof(navigator.cookieEnabled) == "undefined" && !cookieEnabled) { 
          document.cookie = "testcookie"
          cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
        }
    
        if (!cookieEnabled) {
          $("#cookieError").show();
        } else {
          $("#startButton").show();
        }
        
        // Init scan.        
        jQuery.calico.setDebug(false, true);
        var status = jQuery.calico.checkSystemInfoScanSupport();
        if (status.supported) 
        {
          jQuery("#scan-supported").show();
        } else if (status.siScanNotSupportedJavaPluginMissing) {
          jQuery("#scan-not-supported").show();				    	   
        } else {
          jQuery("#scan-not-supported").show();				    	   
        }
        
      });


    </script>
  </head>
	<body>

  <script>
    var facebookAppId = '<s:property value="facebookAppId" />';
  </script>

	<s:if test="error">
		<script type="text/javascript">
			$(document).ready(function() {
				$("#error-dialog").dialog({
					modal: true,
					width: 400,
					resizable: false
				});		
			});
		</script>
    <div id="error-dialog" class="error-dialog" title="Error occurred">
			<p>An error occured during your benchmark run. Likely causes for this are </p>
			<ul>
				<li>Hitting back/forward/reload during the benchmark run</li>
				<li>Network connectivity issues during benchmark run</li>
				<li>Issues with the Peacekeeper server</li>
				<li>Cookies are disabled</li>
			</ul>
			<p>This should be a temporary error, so please try again in a bit and make sure cookies are enabled.</p>
		</div>
	</s:if>

  <div id="battery-test-dialog" title="Battery test">
    
    <p>Peacekeeper supports a simple battery test for your device. In the battery test mode Peacekeeper will loop all the tests until the battery is depleted.
    To start a new test, just click Go and you will be presented with a result 'key' that will allow you to check your result after
    the run is complete. If you wish to view a battery result from a previous run, enter your key to the field below.</p>
    <a href="javascript:startBatteryTest()"><img class="battery-go" src="images/v2/button-go.png" /></a>
    
    <h3 class="battery-test-title">Looking for your result?</h3>
    <p>Type result key to this field to see your result</p>
    <form method="get" action="batteryResults.action">
      <input type="text" class="battery-input" name="key" />
      <input type="submit" class="battery-submit" value="Open result" />
    </form>

  </div>

  <script type="text/javascript"></script><noscript>
    <div id="javaScriptError" class="error" style="display:block">
      <h1>Unable to run Peacekeeper</h1>
      Your browser either does support JavaScript or it has been disabled. Peacekeeper requires a JavaScript enabled browser with cookies enabled.
    </div>
  </noscript>

    <div id="run-button-area">
      <p class="front-result-count">Over <em>1,600,000</em> browsers tested since March 2009</p>
      <div class="scan-button" id="scan-supported">
        <a class="run-button" href="run.action"><img src="images/v2/button-go.png" /></a>
        <a class="run-without-scan" href="scan.action">Run with system analysis</a>
      </div>
      <div class="scan-button" id="scan-not-supported">
        <a class="run-button" href="run.action"><img src="images/v2/button-go.png" /></a>
      </div>
    </div>
    
    <div class="front-chart">
      <div id="front-chart-anchor">
        <img id="guy-chart-1" src="images/v2/guys/chrome-top.png" />
        <img id="guy-chart-2" src="images/v2/guys/opera-right.png" />
        <img id="guy-chart-3" src="images/v2/guys/ie-left.png" />
        <img id="guy-chart-4" src="images/v2/guys/firefox-right.png" />
        <img id="guy-chart-5" src="images/v2/guys/safari-left.png" />
      </div>
      <div class="front-chart-kingbrowser">Google Chrome</div>
      <img class="front-chart-title" src="images/v2/king-of-the-hill.png" />
      <div class="front-chart-since">19th September 2011<br />(Windows PC)</div>
    </div>

    <ul id="social">
      <li id="social-fb">
      <iframe src="//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FFuturemark&amp;send=false&amp;layout=button_count&amp;width=450&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:450px; height:21px;" allowTransparency="true"></iframe>
      </li>
      <li id="social-twitter">
        <a href="http://twitter.com/share?text=Which%20is%20the%20fastest%20browser%3F%20Find%20out%20with%20Peacekeeper&url=http%3A%2F%2Fpeacekeeper.futuremark.com%2F" class="twitter-share-button" data-count="horizontal" data-via="FM_Peacekeeper">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>
      </li>
      <li id="social-plus">
        <g:plusone size="small" annotation="inline"></g:plusone>
        <script type="text/javascript">
          (function() {
            var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
            po.src = 'https://apis.google.com/js/plusone.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
          })();
        </script>
    </ul>

    <div id="content">
      <p>Which is the fastest browser? Which is the best browser for you? Find out with Peacekeeper, the free universal browser test from Futuremark.</p>
      <p>Peacekeeper is a free and fast browser test that measures a browser's speed. If you use social networks like Facebook or Twitter, watch online video on YouTube, enjoy online shopping on Amazon or eBay, or just like reading news and blogs then switching to a faster browser could give you a smoother and more enjoyable browsing experience.</p>
      <p>Peacekeeper works with desktop PCs, notebooks, netbooks, tablets, smartphones and many other devices. It works with Windows, Mac, Linux, Android, iOS and other operating systems. If it has a browser, you can test it with Peacekeeper.</p>
      <p>If you're interested in how Peacekeeper works read our <a href="faq.action">FAQ</a>, or to get started, click on the "<a href="run.action">Test your Browser</a>" button now. To test your devices battery life, try our <a href="javascript:openBatteryTestDialog()">run battery test</a>.</p>

      <div class="clearfix" style="display:<% if (request.getParameter("debug") != null) { %>block<% } else { %>none<% } %>">
        <a href="javascript:toggleSingleMenu()" class="repeat-configuration">Repeat configuration</a>
        <form method="post" id="single-test-form">
        <div id="single-test-menu" class="clearfix">
          <ul class="clearfix">
            <li>
              <select id="single-test-name">
                <option value="all">Run all tests</option>
                <option value="html5-videoVideoSupport">videoVideoSupport</option>
                <option value="html5-videoSubtitleSupport">videoSubtitleSupport</option>
                <option value="html5-videoPosterSupport">videoPosterSupport</option>
                <option value="html5-videoCodecH264">videoCodecH264</option>
                <option value="html5-videoCodecMP4">videoCodecMP4</option>
                <option value="html5-videoCodecTheora">videoCodecTheora</option>
                <option value="html5-videoCodecWebM">videoCodecWebM</option>
                <option value="html5-webglSphere">webglSphere</option>
                <option value="html5-gamingSpitfire">gamingSpitfire</option>
                <option value="html5-workerContrast01">workerContrast01</option>
                <option value="html5-workerContrast02">workerContrast02</option>
                <option value="html5-workerContrast03">workerContrast03</option>
                <option value="render-renderGrid01">renderGrid01</option>
                <option value="render-renderGrid02">renderGrid02</option>
                <option value="render-renderGrid03">renderGrid03</option>
                <option value="render-renderPhysics">renderPhysics</option>
                <option value="experimental-experimentalRipple01">experimentalRipple01</option>
                <option value="experimental-experimentalRipple02">experimentalRipple02</option>
                <option value="experimental-experimentalRipple03">experimentalRipple03</option>
                <option value="experimental-experimentalMovie">experimentalMovie</option>
                <option value="array-arrayCombined">arrayCombined</option>
                <option value="array-arrayWeighted">arrayWeighted</option>
                <option value="dom-domGetElements">domGetElements</option>
                <option value="dom-domDynamicCreationCreateElement">domDynamicCreationCreateElement</option>
                <option value="dom-domDynamicCreationInnerHTML">domDynamicCreationInnerHTML</option>
                <option value="dom-domJQueryAttributeFilters">domJQueryAttributeFilters</option>
                <option value="dom-domJQueryBasicFilters">domJQueryBasicFilters</option>
                <option value="dom-domJQueryBasics">domJQueryBasics</option>
                <option value="dom-domJQueryContentFilters">domJQueryContentFilters</option>
                <option value="dom-domJQueryHierarchy">domJQueryHierarchy</option>
                <option value="dom-domQueryselector">domQueryselector</option>
                <option value="string-stringChat">stringChat</option>
                <option value="string-stringDetectBrowser">stringDetectBrowser</option>
                <option value="string-stringFilter">stringFilter</option>
                <option value="string-stringValidateForm">stringValidateForm</option>
                <option value="string-stringWeighted">stringWeighted</option>
              </select>
            </li>
            <li><input type="checkbox" id="repeat" /> Repeat 10 times</li>
            <li class="last"><button class="std" onclick="runSingleTest()">Start</button></li>
          </dl>
          <ul>
        </div>
        </form>
      </div>

    </div>
				
	</body>
</html>


