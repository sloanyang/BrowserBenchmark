<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<html>
  <head>
		<style>
		body {
			background: url(images/v2/hill-result.jpg) no-repeat center top;
    }
    </style>
		<!-- GetSatisfaction widget -->		
		<script type="text/javascript" charset="utf-8">
		  var is_ssl = ("https:" == document.location.protocol);
		  var asset_host = is_ssl ? "https://s3.amazonaws.com/getsatisfaction.com/" : "http://s3.amazonaws.com/getsatisfaction.com/";
		  document.write(unescape("%3Cscript src='" + asset_host + "javascripts/feedback-v2.js' type='text/javascript'%3E%3C/script%3E"));
		</script>
		<script type="text/javascript" charset="utf-8">
		  var feedback_widget_options = {};
		  feedback_widget_options.display = "overlay";  
		  feedback_widget_options.company = "futuremark";
		  feedback_widget_options.placement = "left";
		  feedback_widget_options.color = "#222";
		  feedback_widget_options.style = "idea";
		  feedback_widget_options.product = "futuremark_peacekeeper";
		  feedback_widget_options.limit = "3";
		  var feedback_widget = new GSFN.feedback_widget(feedback_widget_options);
		</script>
  </head>
	<body>

  <script>
    var facebookAppId = '<s:property value="facebookAppId" />';
  </script>

	<% 
	String serverName = request.getServerName();
	int port = request.getLocalPort();
	String url = serverName;
	if( port != 80 ) {
		url = url + ":" + port;
	}
	%>

	<!-- Dialogs -->
	<div id="result-dialog"></div>
	<div id="save-dialog" title="Save your result">
	  <p>Save this result by using <a href="javascript:facebookLogin()">Facebook</a></p>
	</div>
	<div id="run-dialog" class="clearfix" title="Use this address to test other browsers">
    <!--
  	<a class="run-dialog-button-area" href="run.action" class="">
  	  <img src="images/v2/button-go.png" />
  	</a>
  	<div class="run-dialog-login-button-area">
      <p>This result is owned by <span class="facebook-username">anonymous</span>. If this is you, please login before running benchmark.</p>
      <fb:login-button onlogin="facbookLoginComplete()">Login with Facebook</fb:login-button>
  	</div>
  	-->
  	<div class="run-dialog-copyurl-area">
      <input type="text" onclick="select()" value="http://peacekeeper.futuremark.com/results?key=<s:property value="key" />" />
  	</div>
	</div>
	<div id="setcomment-dialog" title="Name result">
	  <p>Give a name for this result</p>
	  <input type="text" name="comment" value="<s:if test="u.comment != ''"><s:property value="u.comment" /></s:if><s:else>New result</s:else>" style="width: 100%;" />
	  <input type="hidden" name="key" value="<s:property value="key" />" />
	</div>
	
	
  <s:if test="mode==@com.futuremark.peacekeeper.web.ResultsAction@MODE_LATEST_RESULT">
  	<img class="your-score-title" src="images/v2/your-result-title.png" />
  	<div class="your-score"><s:property value="highlightedResult.score" /></div>
  	<div class="your-html5-score">HTML5 Capabilities <s:property value="highlightedResult.getHTML5SupportCount()" />/6</div>
    <div class="facebook-box">
      <div id="user-facebook-info"><br /></div>
      <div id="user-comment"><s:if test="u.comment != ''">Result set name: <s:if test="userFbUid == 0"><a href="javascript:openSetCommentDialog()"><s:property value="u.comment" /></a></s:if><s:else><s:property value="u.comment" /></s:else></s:if></div>
    </div>
  	<s:if test="userFbUid == 0"><div id="save-result">Log in to save this result!</div></s:if>
    <div class="result-useragent">Detailed version information: <s:property value="highlightedResult.userAgent" /></div>
  </s:if>
  
  <s:if test="mode==@com.futuremark.peacekeeper.web.ResultsAction@MODE_THIS_BROWSER">
  	<img class="your-score-title" src="images/v2/your-result-title.png" />
    <!-- <s:property value="highlightedResult.browser.name"/> -->
    <!-- <a href="javascript:peacekeeper.openResult(<s:property value="highlightedResult.id"/>)">View details</a> -->
  	<div class="your-score"><s:property value="highlightedResult.score" /></div>
  	<div class="your-html5-score">HTML5 Capabilities <s:property value="highlightedResult.getHTML5SupportCount()" />/6</div>
    <div class="facebook-box">
      <div id="user-facebook-info"><br /></div>
      <div id="user-comment"><s:if test="u.comment != ''">Result set name: <a href="javascript:openSetCommentDialog()"><s:property value="u.comment" /></a></s:if></div>
    </div>
    <div class="result-useragent">Detailed browser version: <s:property value="highlightedResult.userAgent" /></div>
  </s:if>
  
  <s:if test="mode==@com.futuremark.peacekeeper.web.ResultsAction@MODE_RUN">
  	<img class="test-this-browser-title" src="images/v2/test-this-browser-title.png" />
  	<div class="your-score">
  	  <a class="" href="run.action" class=""><img src="images/v2/button-go.png" /></a>
  	</div>
    <div class="facebook-box">
      <div id="user-facebook-info"><br /></div>
      <div id="user-comment"><s:if test="u.comment != ''">Result set name: <a href="javascript:openSetCommentDialog()"><s:property value="u.comment" /></a></s:if></div>
    </div>
    <!--<s:property value="detector.browser.name" /></div>-->
    <div class="result-useragent">Detailed version information: <s:property value="detector.userAgent" /></div>
  </s:if>
  

  <div class="battery-test-result-title">Battery lifetime</div>
  <div class="battery-test-result"><s:property value="batteryLifetime" /></div>
  <div class="battery-test-result-details">
    Min score: <em><s:property value="minScore" /></em>
    Max score: <em><s:property value="maxScore" /></em>
    Average score: <em><s:property value="avgScore" /></em>
    Iterations: <em><s:property value="resultList().size()" /></em>
  </div>
  <div class="battery-test-result-browser">Detailed browser version: <s:property value="highlightedResult.userAgent" /></div>
  
  
	<div class="results">

    <h3 id="social-title">Share this result on:</h3>
    <ul id="social">
      <li id="social-fb">
        <a class="facebook-share-link" href="javascript:shareOnFacebook()">Like</a>
      </li>
      <li id="social-twitter">
        <s:if test="highlightedResult.score">
          <a href="http://twitter.com/share?text=I'm%20comparing%20browsers%20with%20Peacekeeper.%20<s:property value="highlightedResult.browser.name" />%20scored%20<s:property value="highlightedResult.score" />&url=http%3A%2F%2Fpeacekeeper.futuremark.com%2Fresults%3Fkey%3D<s:property value="key" />" class="twitter-share-button" data-count="none" data-via="FM_Peacekeeper">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>
        </s:if>
        <s:else>
          <a href="http://twitter.com/share?text=I'm%20comparing%20browsers%20with%20Peacekeeper.&url=http%3A%2F%2Fpeacekeeper.futuremark.com%2Fresults%3Fkey%3D<s:property value="key" />" class="twitter-share-button" data-count="none" data-via="FM_Peacekeeper">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>
        </s:else>
      </li>
      <li id="social-plus">
        <g:plusone size="small" annotation="none"></g:plusone>
        <script type="text/javascript">
          (function() {
            var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
            po.src = 'https://apis.google.com/js/plusone.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
          })();
        </script>
      </li>
      <li id="social-forums"><a href="http://www.yougamers.com/forum/forumdisplay.php?f=95&styleid=10" target="_blank" onclick="recordOutboundLink(this, 'Outbound Links', 'yougamers.com');return false;"><img src="images/v2/results-forums.png" /></a></li>
      <li id="social-support"><a href="faq.action"><img src="images/v2/results-support.png" /></a></li>
    </ul>

    <div class="copyurl-area">
      <input type="text" onclick="select()" value="http://peacekeeper.futuremark.com/results?key=<s:property value="key" />" />
    </div>

    
	</div>
	
  <% if (request.getParameter("repeat") != null && request.getParameter("repeat").equals("true")) { %>
  <%
  String redirectUrl = "";
  if (request.getParameter("forceSuiteName") != null && request.getParameter("forceTestName") != null)
  {
    redirectUrl = "run.action?repeat=true&debug=true&forceSuiteName=" + request.getParameter("forceSuiteName")  + "&forceTestName=" +  request.getParameter("forceTestName");
  } else {
    redirectUrl = "run.action?repeat=true&debug=true";
  }
  %>
    <div class="repeat-box">
      <h1>Benchmark is in repeat mode</h1>
      
        <s:if test="resultCountForBrowser < 10000000">
          Run <s:property value="resultCountForBrowser" />.
          <span id="count-label">Restarting benchmark in <span id="count">10</span> seconds...</span><br /><a href="javascript:cancelRepeat()" onClick="repeat=false">Cancel</a>
          <script type="text/javascript">
          function cancelRepeat() 
          { 
            repeat = false; 
            $("#count-label").html("Repeat cancelled.");
          }
          var count = 10;
          var repeat = true;
          setInterval(function() {
            if (!repeat) return;
            if (count == 0) {
              window.location = "<%= redirectUrl %>";
            } else {
              count--;
              document.getElementById("count").innerHTML = count;
            }
          }, 1000);
          </script>
        </s:if>
        <s:else>
          Repeat loop finished after <s:property value="resultCountForBrowser" /> runs.
        </s:else>

    </div>
  <% } %>
  
  
	<div class="result-columns">
  	<div class="hline"></div>
    <div class="result-column result-column-hwcenter">
      <h2>What's hot in PC hardware</h2>
      <h3>Hardware Center</h3>
      <p>Find detailed performance information on a huge range of PC components and systems. See what processors and graphics cards are most popular this week, and compare them for price and performance.</p>
      <a href="http://community.futuremark.com/hardware/" target="_blank" onclick="recordOutboundLink(this, 'Outbound Links', 'futuremark.com');return false;">Read more</a>
    </div>	
    <div class="result-column result-column-pcmark">
      <h2>More tests for your Windows PC</h2>
      <img src="images/v2/promo-pcmark-logo.png" />
      <p>PCMark 7 includes a wide range of tests covering image and video manipulation, web browsing, gaming, computation and storage to give you a complete picture of your PC's performance. </p>
      <a href="http://www.pcmark.com/benchmarks/pcmark7/" target="_blank" onclick="recordOutboundLink(this, 'Outbound Links', 'pcmark.com');return false;">Read more</a> | 
      <a href="http://www.pcmark.com/benchmarks/pcmark7/download/" target="_blank" onclick="recordOutboundLink(this, 'Outbound Links', 'pcmark.com');return false;">Free download</a>
    </div>	
  </div>	
  
  <div id="fb-root"></div>
  <script src="//connect.facebook.net/en_US/all.js"></script>
  <script>
  
    var userFbUid = <s:property value="userFbUid" />;
    var comment = '<s:property value="u.comment" />';
    var browserName = "<s:property value="highlightedResult.browser.name" />";
    var score = "<s:property value="highlightedResult.score" />";

    function checkLoginStatus_resultPage()
    {

      // Try to load result owners information.
      if (userFbUid != 0)
      {

        // Display rename dialog.
        if (userFbUid == currentFbUid && comment == "")
        {
          openSetCommentDialog();
        }

        FB.api('/' + userFbUid, function(userResponse) {
          
          // Display owner information.
          if (currentFbUid == userResponse.id)
          {
            $("#user-facebook-info").text("This result is locked to you.");
          } else {
            $("#user-facebook-info").text("This result is locked.");
          }
          
        });
      } else {

        // Result is unassigned but user is logged in.
        if (currentFbUid != 0)
        {

          // Assign result to user.          
          $.ajax({
            url: 'assignUser.action?key=<s:property value="key" />',
            success: function(data)
            {
              userFbUid = currentFbUid;
              checkLoginStatus_resultPage();
            }
          });
          
        } else {
          $("#user-facebook-info").text("This result is unlocked. Log in to lock this result!");
        }
        

      }

    }

    function openSaveDialog()
    {
      $("#save-dialog").dialog({
        resizable: false,
        width: 600,
        modal: true
      });
    }

    function shareOnFacebook()
    {
    
      var message = "";
      if (browserName != "" && score != "")
      {
        message = "I'm comparing browsers with Peacekeeper.  <s:property value="highlightedResult.browser.name" /> scored <s:property value="highlightedResult.score" />.";
      } else {
        message = "I'm comparing browsers with Peacekeeper.";
      }
    
      FB.ui({ 
        method: "feed", 
        message: "Check out my Peacekeeper result!",
        link: "http://peacekeeper.futuremark.com/results?key=<s:property value="key" />",
        picture: "http://peacekeeper.futuremark.com/images/v2/pk-logo-facebook.png",
        name: "Peacekeeper Universal Browser test",
        caption: message,
        description: "Which browser is fastest? Find out with Peacekeeper.",
        actions: [
          { name: "Which browser is fastest? Find out with Peacekeeper.", 
	    link: "http://peacekeeper.futuremark.com/" }
        ]
      });
    }
    
    function runBenchmark()
    {
      
      // User is logged in to facebook => hide login button
      if (currentFbUid != 0)
      {
        $("#run-dialog").addClass("no-facebook");
      } else {
        $("#run-dialog").removeClass("no-facebook");
      }

      $("#run-dialog").dialog({
        resizable: false,
        width: 700,
        modal: true
      });
      
    }
    
    function openSetCommentDialog()
    {
      $("#setcomment-dialog").dialog({
        resizable: false,
        width: 400,
        modal: true,
        buttons: 
        { 
          "Ok": function() 
          { 
            
            // Save result.
            $.ajax({
              url: 'saveComment.action',
              data: {
                key: '<s:property value="key" />',
                comment: $("#setcomment-dialog input[name=comment]").val()
              }
            });

            $(this).dialog("close"); 
          } 
        }
      }).prev('.ui-dialog-titlebar').find('a').hide();   
    }
    
  </script>  

</body>
</html>
