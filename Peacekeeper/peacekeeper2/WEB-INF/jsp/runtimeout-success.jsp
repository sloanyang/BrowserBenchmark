<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<%@page import="com.opensymphony.xwork2.*"%>
<%@page import="com.opensymphony.xwork2.util.*"%>
<%@page import="org.apache.log4j.Logger"%>


<div style="text-align: center; padding: 225px 0 0 0; font-family: tahoma, arial; font-size: 12px">
  <p>Test timeout exceeded while running test <s:property value="testName" />.<br /><br /><a href="/" target="_top">Try running benchmark again</a></p>
</div>