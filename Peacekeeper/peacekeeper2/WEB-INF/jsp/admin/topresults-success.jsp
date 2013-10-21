<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<html>
	<body>
		<div id="results" class="container">
		
			<div id="admin" align="center">
				<div id="adminLeft">
					<s:actionmessage/>
				
					<h2>Fastest system</h2>
					
					<p>
						Id: <s:property value="topResult.id"/><br/>
						Browser: <s:property value="topResult.browser.name"/><br/>
						Score: <s:property value="topResult.score"/><br/>
					</p>

					<p>					
						Cpu: <s:property value="topResult.systemInfo.cpuInformation.name"/><br/>
						Gpu: <s:property value="topResult.systemInfo.gpuInformation.name"/>
					</p>
					
					<p>
						<s:url id="url" value="resultDetails.action">
						    <s:param name="id" value="topResult.id" />
						</s:url>
						<s:a href="%{url}">Details</s:a>
					</p>
					
					<p>
						<s:form>
							<s:textfield name="topResultId"/>
							<s:hidden name="passwd"/>
							<s:submit key="Set top result"/>
						</s:form>
					</p>
				</div>
				
				<div id="adminRight">
					<h2>20 fastest results with system info</h2>
					
					<table border="1">
						<tr>
							<td><b>Id</b></td><td><b>Browser</b></td><td><b>Score</b></td><td><b>Details</b></td><td><b>Delete</b></td>
						</tr>
						<s:iterator value="results">
							<s:url id="details" value="resultDetails.action">
							    <s:param name="id" value="id" />
							</s:url>
							<s:url id="delete" value="deleteResult.action">
							    <s:param name="resultId" value="id" />
							    <s:param name="passwd" value="passwd" />
							</s:url>
							<tr>
								<td><s:property value="id"/></td>
								<td><s:property value="browser.name"/></td>
								<td><s:property value="score"/></td>
								<td><s:a href="%{details}">Details</s:a></td>
								<td><s:a href="%{delete}" onclick="javascript:return confirm('Confirm delete?')">Delete</s:a></td>
							</tr>
						</s:iterator>
					</table>
				</div>
			</div>

		</div>
	</body>
</html>