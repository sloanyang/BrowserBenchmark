<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<html>
<body>

	<div id="results" class="container">
		<div id="admin" align="center">
			<h1>Result details</h1>
			
			<p>
				<s:url id="delete" value="deleteResult.action">
				    <s:param name="resultId" value="id" />
				    <s:param name="passwd" value="passwd" />
				</s:url>
				<s:a href="%{delete}" onclick="javascript:return confirm('Confirm delete?')">Delete</s:a>
			</p>
			<p>
				Id: <s:property value="result.id" /><br/>
				Score: <s:property value="result.score" /><br/>
				Date: <s:property value="result.created" /><br/><br/>
				
				Browser: <s:property value="result.browser.name" /><br/>
				Browser version: <s:property value="result.browserVersion" /><br/>
				User-agent: <s:property value="result.userAgent" /><br/><br/>
				
				Ip address: <s:property value="result.ipAddress" /><br/>
				Country: <s:property value="result.countryCode" /><br/><br/>
				
				CPU: <s:property value="result.systemInfo.cpuInformation.name" /><br/>
				GPU: <s:property value="result.systemInfo.gpuInformation.name" /><br/><br/>
			</p>
			
			<p>
				<b>Test suites:</b><br/><br/>
				<s:iterator value="result.testSuites">
					<b><s:property value="name" /></b><br/>
					<s:iterator value="tests">
						<s:property value="index" /> <s:property value="name" />, <s:property value="score.valueAsString" /><br/>
					</s:iterator>
				</s:iterator>
			</p>
		</div>
	</div>

</body>
</html>