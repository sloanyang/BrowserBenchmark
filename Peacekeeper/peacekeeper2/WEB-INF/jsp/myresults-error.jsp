<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<%@page import="com.opensymphony.xwork2.*"%>
<%@page import="com.opensymphony.xwork2.util.*"%>
<%@page import="org.apache.log4j.Logger"%>

<html>
	<head>
		<title>Unexpected error occured</title>
	</head>

	<body>
		<div class="error" style="display:block">
			<s:actionerror/>
		</div>
	</body>
</html>