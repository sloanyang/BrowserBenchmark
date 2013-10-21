<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<html>
<body>

<h1>Validity check</h1>

<p>
key: <s:property value="key" /><br />
bounds %: <s:property value="@com.futuremark.peacekeeper.web.ValidityCheckAction@BOUNDS_PERCENTAGE" /><br />
probability limit %: <s:property value="@com.futuremark.peacekeeper.web.ValidityCheckAction@ERROR_LIMIT" /><br />
</p>

<table class="validityTable" cellspacing="0" cellpadding="0">
	<tr>
		<td>#</td>
		<td>testName</td>
		<td>count</td>
		<td>min</td>
		<td>max</td>
		<td>average</td>
		<td>stdev</td>
		<td>lower limit</td>
		<td>higher limit</td>
		<td>lower std normal</td>
		<td>higher std normal</td>
		<td>f1</td>
		<td>f2</td>
		<td>probability</td>
		<td>valid</td>
	</tr>
	<s:iterator value="table" status="stat">
		<s:if test="![0].get(13)">
			<tr class="validityError">
		</s:if>
		<s:else>
			<tr class="validityOk">
		</s:else>
			<td><s:property value="#stat.count" /></td>
			<s:iterator>
				<td><s:property /></td>
			</s:iterator>
		</tr>
	</s:iterator>
</table>

</body>
</html>