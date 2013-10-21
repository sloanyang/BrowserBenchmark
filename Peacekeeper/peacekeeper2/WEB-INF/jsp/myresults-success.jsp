<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<%@page import="com.opensymphony.xwork2.*"%>
<%@page import="com.opensymphony.xwork2.util.*"%>
<%@page import="org.apache.log4j.Logger"%>


<s:if test="userList.size() > 0">

    <p>Select a result set</p>

    <div class="my-results-list">
      <s:iterator value="userList">
        <a href="<s:property value="resultActionUrl" />?key=<s:property value="keyString" />">
          <s:if test="comment != ''">
            <s:property value="comment" />
          </s:if>
          <s:else>
            <s:property value="keyString" />
          </s:else>
          <span><s:property value="visibleResults.size()" /> result sets</span>
        </a>
      </s:iterator>
    </div>

</s:if>
<s:else>

  <p class="my-results-empty">You don't have results yet.</p>

</s:else>