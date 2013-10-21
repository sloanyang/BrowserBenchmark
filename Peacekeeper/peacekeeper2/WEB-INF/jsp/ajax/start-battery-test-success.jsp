<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
	
<div class="battery-test-initialized">

  <p>Write this key down and click Go.</p>
  <h1><s:property value="user.keyString" /></h1>
    
  <a href="run.action?repeat=true"><img class="battery-go" src="images/v2/button-go.png" /></a>
  
</div>