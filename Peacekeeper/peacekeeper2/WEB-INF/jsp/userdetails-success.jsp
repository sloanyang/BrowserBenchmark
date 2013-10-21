<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<html>
<body>

<h1>Users details</h1>

<p>
	Id: <s:property value="user.id" /><br/>
	Key: <s:property value="user.key" />
</p>

<p>
	<b>Results:</b><br/><br/>
	<s:iterator value="user.results">
	
		<s:url id="url" action="resultDetails">
		    <s:param name="id" value="id" />
		</s:url>
		
		<s:a href="%{url}">
			<s:property value="id" />: <s:property value="browser.name" />
		</s:a>
		<br/>
		
	</s:iterator>
</p>

</body>
</html>