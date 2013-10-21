<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<html>
	<body>
		<div id="results" class="container">
		
			<div id="admin" align="center">
				<div id="adminLeft">
					<s:actionmessage/>
				
					<h2>Cpu models shown in top list</h2>
				
					<p>
						<s:form>
							<s:textfield label="Column 1" name="cpuId1"/>
							<s:textfield label="Column 2" name="cpuId2"/>
							<s:textfield label="Column 3" name="cpuId3"/>
							<s:textfield label="Column 4" name="cpuId4"/>
							<s:hidden name="passwd"/>
							<s:submit key="Set cpu models"/>
						</s:form>
					</p>
				</div>

				<div id="adminRight">
					<h2>Cpu models</h2>
					
					<s:iterator value="cpuModels">
						<s:property value="id"/>, <s:property value="name"/><br/>
					</s:iterator>
				</div>

			</div>

		</div>
	</body>
</html>