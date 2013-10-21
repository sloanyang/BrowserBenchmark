<%@ page contentType="text/html; charset=UTF-8" %>
<%@page import="java.util.List"%>
<%@page import="com.futuremark.jane.util.*"%>
<%@page import="com.futuremark.peacekeeper.repositories.*"%>
<%@page import="com.futuremark.peacekeeper.model.*"%>
<%@page import="com.futuremark.peacekeeper.model.impl.*"%>
<%@page import="org.springframework.context.support.*"%>
<%@page import="org.springframework.beans.factory.*"%>
<%@page import="org.hibernate.*"%>
<html>
<body>

<h1>Stored results</h1>

<ul>
<%
Transaction tx = null;
try {
	SessionFactory sessionFactory = (SessionFactory)ApplicationContextHelper.getInstance().getBean("sessionFactory");
	org.hibernate.Session hibernateSession = sessionFactory.getCurrentSession();
	tx = hibernateSession.beginTransaction();
	
	ResultRepository repository = (ResultRepository)ApplicationContextHelper.getInstance().getBean("resultRepository");
	List<ResultImpl> results = repository.findAll();
	
	for(ResultImpl r : results) {
%>
		<li><%= r.getId() %>, <%= r.getBrowser().getName() %></li>
<%
	}
} catch(Exception e) {
	if( tx != null ) {
		tx.rollback();
	}
} finally {
	if( tx != null ) {
		tx.commit();
	}
}
%>
</ul>
</body>
</html>