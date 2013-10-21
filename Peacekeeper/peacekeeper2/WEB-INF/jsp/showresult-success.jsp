<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<html>
<body>


<a href="index.action">Go home!</a> | 
<a href="run.action">Run again</a> | 
<a href="run.action?repeat=true">Run again and repeat</a>


<h1>Results</h1>




<% 
	String serverName = request.getServerName();
	int port = request.getLocalPort();
	String url = serverName;
	if( port != 80 ) {
		url = url + ":" + port;
	}

%>

<p>
	Copy the following url to another browser to test it and compare your results:<br/><br/>
	<b>http://<%= url %>/peacekeeper/loadUser.action?key=<s:property value="key" /></b>
</p>

Result id <s:property value="result.id" /><br />

<p>
Test suites:<br/><br/>
<s:iterator value="result.testSuites">
	<s:property value="name" /><br/>
	<s:iterator value="tests">
		<s:property value="index" /> <s:property value="name" />, <s:property value="score.valueAsString" /><br/>
	</s:iterator>
</s:iterator>
</p>

<!-- Restart script. -->
<% if (request.getParameter("repeat") != null && request.getParameter("repeat").equals("true")) { %>
<h1>Restarting benchmark in <span id="count">10</span> seconds...</h1>
<script type="text/javascript">
var count = 10;
setInterval(function() {
	if (count == 0) {
		window.location = "run.action?repeat=true";
	} else {
		count--;
		document.getElementById("count").innerHTML = count;
	}
}, 1000);
</script>
<% } %>


</body>
</html>