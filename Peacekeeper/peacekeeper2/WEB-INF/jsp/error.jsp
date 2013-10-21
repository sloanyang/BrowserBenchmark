<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<%@page import="com.opensymphony.xwork2.*"%>
<%@page import="com.opensymphony.xwork2.util.*"%>
<%@page import="org.apache.log4j.Logger"%>

<html>
	<head>
		<title>Unexpected error</title>
	</head>

	<body>
		<div id="index" class="container">
		<div id="descriptionSpacer">
		</div>
		<div id="description">
			An unexpected error occurred. Please try again.
		</div>
	
		<% 
			Logger log = Logger.getLogger("error.jsp");
			ActionContext context = ActionContext.getContext(); 
			ValueStack vs = context.getValueStack();
			String exception = vs.findString("exception");
			String exceptionStack = vs.findString("exceptionStack");
			
			log.error(
					"Exception opening action " + context.getName() + " with parameters " + request.getQueryString() + "\n" + 
					"Exception: " + exception + "\nException Stack: " + exceptionStack);
		%>
	</body>
</html>