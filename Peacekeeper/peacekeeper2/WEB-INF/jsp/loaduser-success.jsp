<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<html>
<body>

<h1>Loaded user to session</h1>

<p>
	Loaded user to session succesfully.
</p>

<p>
	Id: <s:property value="#session.userid" /><br/>
	Key: <s:property value="#parameters.key" />
</p>

</body>
</html>