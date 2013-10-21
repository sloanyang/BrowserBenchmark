<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<html>
<body>

<h1>All users</h1>

<p>
<s:iterator value="users">

	<s:url id="url" action="userDetails">
	    <s:param name="id" value="id" />
	</s:url>
	
	<s:a href="%{url}">
		<s:property value="id" />: <s:property value="key" />
	</s:a>
	<br/>
	
</s:iterator>
</p>

</body>
</html>