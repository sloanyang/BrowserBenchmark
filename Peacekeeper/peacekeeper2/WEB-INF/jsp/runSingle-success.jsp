<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en-US">
<head profile="http://gmpg.org/xfn/11">
<!-- Futuremark Peacekeeper -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Peacekeeper</title>
<link rel="stylesheet" href="css/common-style.css" type="text/css" media="screen" />
<link rel="stylesheet" href="css/benchmark-style.css" type="text/css" media="screen" />
<link rel="stylesheet" href="css/tests.css" type="text/css" media="screen" />
<script type="text/javascript" src="js/logger.js"></script>
<script type="text/javascript" src="js/timeline.js"></script>
<script type="text/javascript" src="js/assetmanager.js"></script>
<script type="text/javascript" src="js/conf.js"></script>
<script type="text/javascript" src="js/jquery-1.3.1.min.js"></script>
<script type="text/javascript" src="js/ui.js"></script>
</head>
<body>

<div id="bg">

	<div id="progressBarContainer">
		<div id="progressBarContainer2" onclick="$('#log').toggle()">
			<div id="progressBarBg"><div id="progressBarLabel">Calibrating...</div></div>
			<div id="progressBar"><div id="progressBarInnerLabel">Calibrating...</div></div>
		</div>
	</div>
	
	<div id="playgroundContainer" style="display:none"><div id="playgroundContainerHeader"><div id="playgroundContainerFooter">
		<div id="playgroundInfoAnchor"><div id="playgroundInfo">
			<div id="playgroundTitle"><div class="padding"><div class="bg">Unnamed</div></div></div>
			<div id="playgroundCount"><div class="padding"><div class="bg">Test 0/0</div></div></div>
		</div></div>
		<div id="playgroundPadding">
			<iframe id="singleButtonFrame" width="850" height="500" frameborder="no" scrolling="no" src=""></iframe>
			<div id="description">
			</div>
		</div>
	</div></div></div>
	
	<div id="runSingleForm">
		<input class="input" type="text" id="testSuiteName" value="array" />
		<input class="input" type="text" id="testName" value="arrayConcat" />
		<input class="input" type="text" id="limit" value="10" />
		<input class="button" type="button" id="singleButton" value="Run" />
	</div>
	
	<script type="text/javascript">
		$(document).ready(function(){
			$("#singleButton").click(function(){
				$("#runSingleForm").hide();
				$("#playgroundContainer").show();
				$("#singleButtonFrame").attr("src", "runSingleTest.action?testSuiteName=" + $("#testSuiteName").val() + "&testName=" + $("#testName").val() + "&limit=" + $("#limit").val());		
			});
		});
	</script>
	
	<div id="output"></div>
	
	<div id="log">
		Loading Peacemaker...
	</div>

</div>

</body>
</html>
