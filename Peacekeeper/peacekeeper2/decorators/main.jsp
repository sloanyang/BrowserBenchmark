<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator" %>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/page" prefix="page" %>
<!doctype html>
<html lang="en" itemscope itemtype="http://schema.org/Product">
<head>
  <meta charset="utf-8">
  <title>Peacekeeper - free universal browser test for HTML5 from Futuremark</title>
  <meta name="description" content="See which HTML5 browser is the fastest browser with this free browser speed test. Test your PC, smartphone or tablet. Works with any browser on any device.">
  <meta name="author" content="Futuremark">
  <meta name="viewport" content="width=1000">
	<link rel="icon" type="image/gif" href="images/icons/favicon2.gif" />
  <link rel="stylesheet" href="css/application-style2.css">
  <link rel="stylesheet" href="css/jquery-ui-smoothness/jquery-ui-1.8.13.custom.css">
	<script src="js/libs/jquery-1.6.4.min.js"></script>
	<script src="js/libs/jquery-ui-1.8.13.custom.min.js"></script>
	<script src="js/peacekeeper.js"></script>
  <meta itemprop="name" content="Peacekeeper">
  <meta itemprop="description" content="Which is the fastest browser? Find out with Peacekeeper">
  <meta property="og:title" content="Peacekeeper - free universal browser test for HTML5 from Futuremark"/>
  <meta property="og:type" content="browser test"/>
  <meta property="og:url" content="http://peacekeeper.futuremark.com/"/>
  <meta property="og:image" content="http://peacekeeper.futuremark.com/images/v2/facebook-helmet.jpg"/>
  <meta property="og:site_name" content="Peacekeeper"/>
  <meta property="og:description" content="See which HTML5 browser is the fastest browser with this free browser speed test. Test your PC, smartphone or tablet. Works with any browser on any device."/>
  <decorator:head />
</head>
<body>

  <div id="wrapper">
    <div id="header">
      <div id="cloud-left"><p>Works with all browsers on Windows, Mac, Linux, Android, iOS and more</p></div>
      <div id="logo-area">
        <h1>
          <!--<div id="logo-beta-anchor"><img id="logo-beta" src="images/v2/beta.png" /></div>-->
          <a href="/"><img src="images/v2/pk-logo.png" /></a>
          <div class="tagline">The Universal Browser Test</div>
        </h1>
      </div>
      <div id="header-right">

        <div id="facebook-login-button">
          <fb:login-button onlogin="facbookLoginComplete()">Login with Facebook</fb:login-button>
        </div>
        <div id="facebook-login-status">
          Hi <span class="facebook-username"></span>! <a href="javascript:peacekeeper.openMyResults()">View your results</a>.
        </div>
        <div id="facebook-login-loading"></div>

        <div id="cloud-right">
          <p>Works with PCs, notebooks, netbooks, tablets, smartphones and other HTML5 compatible devices.</p>
        </div>
  
      </div>
    </div>

  	<decorator:body />

    <div id="footer">
      <ul>
        <li><a href="http://www.futuremark.com/companyinfo/aboutus/" onclick="recordOutboundLink(this, 'Outbound Links', 'futuremark.com/aboutus');return false;">Company</a></li>
        <li><a href="http://www.futuremark.com/contactinfo/contactus/" onclick="recordOutboundLink(this, 'Outbound Links', 'futuremark.com/contactus');return false;">Contact</a></li>
        <li><a href="http://www.futuremark.com/companyinfo/legal/privacystatement/" onclick="recordOutboundLink(this, 'Outbound Links', 'futuremark.com/legal/privacystatement');return false;">Privacy</a></li>
        <li><a href="http://www.futuremark.com/companyinfo/advertising/" onclick="recordOutboundLink(this, 'Outbound Links', 'futuremark.com/advertising');return false;">Advertise</a></li> 
        <li><a href="http://clients.futuremark.com/peacekeeper1/index.action" onclick="recordOutboundLink(this, 'Outbound Links', 'Peacekeeper 1');return false;">Peacekeeper V1</a></li>
        <li class="fm-logo"><a href="http://www.futuremark.com/" onclick="recordOutboundLink(this, 'Outbound Links', 'futuremark.com');return false;"><img src="images/v2/fm-logo.png" /></a></li>
      </ul>
    </div>
  </div>

  <div id="my-results-dialog" title="My results"></div>
  
  <div id="fb-root"></div>
  <script src="//connect.facebook.net/en_US/all.js"></script>
  <script>
  
    if (typeof facebookAppId == "undefined")
    {
      var facebookAppId = 0;
    }
  
    FB.init({
      appId  : facebookAppId,
      status : true, // check login status
      cookie : true, // enable cookies to allow the server to access the session
      xfbml  : true, // parse XFBML
      oauth :  false // enables OAuth 2.0
    });


    var currentFbUid = 0;
    
    /**
     * Login complete after button click.
     */
    function facbookLoginComplete()
    {

      // On result page, reload page after login.
      if (window.location.toString().indexOf("results.action") != -1)
      {
        window.location.reload();
      } 
      // On other pages just check login status.
      else {
        checkLoginStatus();      
      }
      
    }
    
    /**
     * Check login status.
     */
    function checkLoginStatus()
    {
    
      console.log("Checking login status...");
  
      $("#facebook-login-button").hide();
      $("#facebook-login-status").hide();
      $("#facebook-login-loading").show();

      FB.getLoginStatus(function(response) {

        if (response.status == "connected") {
        
          console.log("Logged in as " + response.authResponse.userID);
          currentFbUid = response.authResponse.userID;

          FB.api('/me', function(user) {
           if(user != null) 
           {
              $("#facebook-login-button").hide();
              $("#facebook-login-status").show();
              $("#facebook-login-loading").hide();
              $(".facebook-username").text(user.name);
           } else {
              $("#facebook-login-button").show();
              $("#facebook-login-status").hide();
              $("#facebook-login-loading").hide();
           }
          });

        } else {
          console.log("Not logged in...");
          $("#facebook-login-button").show();
          $("#facebook-login-status").hide();
          $("#facebook-login-loading").hide();
        }

        if (typeof(checkLoginStatus_resultPage) != "undefined")
        {
          checkLoginStatus_resultPage();
        }
  
      });
      

    }
    
    checkLoginStatus();

  </script>


	<script type="text/javascript">
		var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
		document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
		</script>
		<script type="text/javascript">
		var orbTracker = _gat._getTracker("UA-1629879-4");
		orbTracker._trackPageview();
		var fmNetworkTracker = _gat._getTracker("UA-1629879-7");
		fmNetworkTracker._setDomainName("none");
		fmNetworkTracker._setAllowLinker(true);
		fmNetworkTracker._trackPageview();
	</script>
  <script type="text/javascript">
    function recordOutboundLink(link, category, action) 
    {
      orbTracker._trackEvent(category, action);
      $.ajax({
        url: "/?action=" + action,
        error: function()
        {
          setTimeout('document.location = "' + link.href + '"', 100);
        },
        success: function()
        {
          setTimeout('document.location = "' + link.href + '"', 100);
        }
      });
    }
  </script>

  <script src="http://clients.futuremark.com/dibbs/navigationRibbon/navigationRibbonJs"></script>

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

</body>
</html>
