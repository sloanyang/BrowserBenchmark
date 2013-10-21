<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<html>
	<body>
		<div id="results" class="container">
		
			<div id="admin" align="center">
				<div id="adminWide">
					<s:actionmessage/>
				
					<p>
						<b>Stop requested:</b> <s:if test="stop">Yes</s:if><s:else>No</s:else> 		
					</p>
				
					<b>Number of concurrent users running benchmark</b>
				
					<p>
						Active: <s:property value="concurrentUsersCounter.activeUsers"/>		
					</p>
					
					<p>
						Inactive: <s:property value="concurrentUsersCounter.inactiveUsers"/>		
					</p>
					
					<b>History</b>
					
					<p>
						<img src="<s:property value="concurrentUsersCounter.concurrentUserHistory.lastHourDataAsGoogleChart"/>"/>
						<img src="<s:property value="concurrentUsersCounter.concurrentUserHistory.lastDayDataAsGoogleChart"/>"/>
						<img src="<s:property value="concurrentUsersCounter.concurrentUserHistory.lastWeekDataAsGoogleChart"/>"/>
					</p>
					<b>Active users</b>
					
					<table border="1">
						<tr>
							<th>IP Address</th>
							<th>Session id</th>
							<th>Age (s)</th>
							<th>Result</th>
						</tr>
					
						<s:iterator value="concurrentUsersCounter.activeResults">
							<tr>
								<th><s:property value="ipAddress"/></th>
								<th><s:property value="sessionId"/></th>
								<th><s:property value="(now - result.created.time)/1000"/></th>
								<th><s:property value="result.toString()"/></th>
							</tr>
						</s:iterator>
					</table>
					
					<b>Inactive users</b>
					
					<table border="1">
						<tr>
							<th>IP Address</th>
							<th>Session id</th>
							<th>Age (s)</th>
							<th>Result</th>
						</tr>
						<s:iterator value="concurrentUsersCounter.inactiveResults">
							<tr>
								<th><s:property value="ipAddress"/></th>
								<th><s:property value="sessionId"/></th>
								<th><s:property value="(now - result.created.time)/1000"/></th>
								<th><s:property value="result.toString()"/></th>
							</tr>
						</s:iterator>
					</table>
					
				</div>

			</div>

		</div>
	</body>
</html>