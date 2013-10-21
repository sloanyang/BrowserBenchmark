<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator" %>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/page" prefix="page" %>
<!doctype html>
<html lang="en" itemscope itemtype="http://schema.org/Product">
<head>
  <meta charset="utf-8">
  <title>Peacekeeper - free universal browser test from Futuremark</title>
  <meta name="description" content="Find out which browser is the fastest browser with this quick and easy browser speed test. Any device, any OS, if it has a browser you can test it now.">
  <meta name="author" content="Futuremark">
  <meta name="viewport" content="width=1000">
	<link rel="icon" type="image/gif" href="images/icons/favicon2.gif" />
  <link rel="stylesheet" href="css/application-style2.css">
  <link rel="stylesheet" href="css/jquery-ui-smoothness/jquery-ui-1.8.13.custom.css">
	<script src="js/libs/jquery-1.6.4.min.js"></script>
	<script src="js/libs/jquery-ui-1.8.13.custom.min.js"></script>
	<script src="js/peacekeeper.js"></script>
	<script src="http://clients.futuremark.com/calico/js/calico.js"></script>
	<script src="http://java.com/js/deployJava.js"></script>
  <meta itemprop="name" content="Peacekeeper">
  <meta itemprop="description" content="Which is the fastest browser? Find out with Peacekeeper">
  <meta property="og:title" content="Peacekeeper - free universal browser test from Futuremark"/>
  <meta property="og:type" content="browser test"/>
  <meta property="og:url" content="http://peacekeeper.futuremark.com/"/>
  <meta property="og:image" content="http://peacekeeper.futuremark.com/images/v2/facebook-helmet.jpg"/>
  <meta property="og:site_name" content="Peacekeeper"/>
  <meta property="og:description" content="Find out which browser is the fastest browser with this quick and easy browser speed test. Any device, any OS, if it has a browser you can test it now."/>
</head>
<body>

  <div id="wrapper">
    <div id="header">
      <div id="cloud-left"><p>Works with all browsers on Windows, Mac, Linux, Android, iOS and more</p></div>
      <div id="logo-area">
        <h1>
          <a href="/"><img src="images/v2/pk-logo.png" /></a>
        </h1>
        <p>Over <em>1,600,000</em> browsers tested since March 2009</p>
      </div>
      <div id="header-right">
        <div id="cloud-right">
          <p>Works with PCs, notebooks, netbooks, tablets, smartphones and other HTML5 compatible devices.</p>
        </div>
      </div>
    </div>






    <% 
    String serverName = request.getServerName();
    int port = request.getLocalPort();
    String url = serverName;
    if (port != 80) 
    {
      url = url + ":" + port;
    }
    %>
    
    
    <div id="scan">
        <p>Analyzing your system. This may take a while...</p>
        <script type="text/javascript" language="JavaScript">
          var scanCallback = function(result) 
          {
    
            var url = "";
    
            if (result.success) {
    
              url = "run.action?sysInfoId=" + result.systemInfoId;
    
            } else {
    
              url = "run.action?submitinfoid=" + result.submitInfoId;
    
            }
    
            setTimeout(function() {
              window.location = url;
            }, 100);     
            
         }
            
        jQuery.calico.setCalicoBaseUrl("http://clients.futuremark.com/calico");
        
        jQuery.calico.runSystemInfoScan(
            {servicename:"Peacekeeper 2",
             width: 160,
             height: 20,
             containerRef: "#scan",
             bgimage: "http://<%= url %>/peacekeeper2/images/v2/scan-loader.gif", 
             problemimage: "http://<%= url %>/peacekeeper2/images/v2/scan-loader.gif",
             callback: scanCallback
             });
        
        </script>
    
    </div>
    
    <div class="scan-skip-area">
      <p>Skip analysis and continue to benchmark:</p>
      <a href="run.action"><img src="images/v2/button-go.png" /></a>
    </div>  







    <div id="footer">
      <ul>
        <li><a href="http://www.futuremark.com/companyinfo/aboutus/" onclick="recordOutboundLink(this, 'Outbound Links', 'futuremark.com/aboutus');return false;">Company</a></li>
        <li><a href="http://www.futuremark.com/contactinfo/contactus/" onclick="recordOutboundLink(this, 'Outbound Links', 'futuremark.com/contactus');return false;">Contact</a></li>
        <li><a href="http://www.futuremark.com/companyinfo/legal/privacystatement/" onclick="recordOutboundLink(this, 'Outbound Links', 'futuremark.com/legal/privacystatement');return false;">Privacy</a></li>
        <li><a href="http://www.futuremark.com/companyinfo/advertising/" onclick="recordOutboundLink(this, 'Outbound Links', 'futuremark.com/advertising');return false;">Advertise</a></li> 
        <li><a href="http://clients.futuremark.com/peacekeeper/index.action" onclick="recordOutboundLink(this, 'Outbound Links', 'Peacekeeper 1');return false;">Peacekeeper V1</a></li>
        <li class="fm-logo"><a href="http://www.futuremark.com/" onclick="recordOutboundLink(this, 'Outbound Links', 'futuremark.com');return false;"><img src="images/v2/fm-logo.png" /></a></li>
      </ul>
    </div>
  </div>
  
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
      setTimeout('document.location = "' + link.href + '"', 100);
    }
  </script>

  <script src="http://clients.futuremark.com/dibbs/navigationRibbon/navigationRibbonJs"></script>

</body>
</html>