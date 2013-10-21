<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/struts-tags" prefix="s" %>

<script>
  var RESULT_ID = <s:property value="result.id" />;
  $(document).ready(function()
  {

    $("#resultComment, #editComment").click(function()
    {
      $("#resultComment").hide();
      $("#resultCommentForm").show();
    });

    $("#resultCommentSave").click(function()
    {
      var comment = $("#resultCommentInput").val();
      $("#resultComment p").html(comment);
      $("#resultComment").show();
      $("#resultCommentForm").hide();
      $.ajax({
        url: "saveResultComment.action",
        data: {
          resultId: RESULT_ID,
          comment: comment
        }
      });
    });

    $("#deleteResult").click(function()
    {
      if (confirm("Are you sure you want to delete this result?"))
      {
        window.location = "deleteResult.action?key=" + key + "&resultId=" + RESULT_ID;
      }
    });

  });
</script>

<div id="browserInfo" class="clearfix">
	<h2><s:property value="result.browser.name" /></h2>
	<h1><s:property value="result.score" /> Points</h1>
	<dl class="clearfix">
	  <dd>Version info</dd>
	  <dt><s:property value="result.userAgent" /></dt>
	  <dd>Comment</dd>
	  <dt>
	    <s:if test="isOwner()">
        <div id="resultComment">
          <p>
            <s:if test="result.comment == ''">
              Not set
            </s:if>
            <s:else>
              <s:property value="result.comment" />
            </s:else>
          </p>
        </div>
        <div id="resultCommentForm">
          <input id="resultCommentInput" value="<s:property value="result.comment" />" maxlength="200" />
          <input type="button" id="resultCommentSave" value="Save" class="std-button" />
        </div>
	    </s:if>
	    <s:else>
        <p>
          <s:if test="result.comment == ''">
            Not set.
          </s:if>
          <s:else>
            <s:property value="result.comment" />
          </s:else>
        </p>
	    </s:else>
	  </dt>
	</dl>
  <s:if test="isOwner()">
    <input type="button" id="deleteResult" value="Delete result" class="std-button" />
    <input type="button" value="Edit comment" id="editComment" class="std-button" />
  </s:if>
</div>
<div class="barContainerDetailsPadding">
	<div id="browserTitleKey"><span>Suite</span></div>
	<div id="browserTitleValue">Result</div>
	<s:iterator value="result.testSuites">
		<div class="barContainerDetails">

			  <s:if test="name != 'HTML5 Capabilities'">
          <div class="label suite"><span><s:property value="name" /></span></div>
          <div class="score suite"><s:property value="getText('{0,number,###0.00}', {suiteScore})"/></div>
          <div style="clear: both;"></div>
          <s:iterator value="tests">
            <div class="label"><span><s:property value="name" /></span></div>
            <div class="score">
              <s:if test="score.value > 0">
                <s:property value="getText('{0,number,###0.00}', {score.value})"/>
                <s:property value="score.unitName" />
              </s:if>
              <s:else>
                N/A
              </s:else>
            </div>
            <div style="clear: both;"></div>
          </s:iterator>
        </s:if>
        <s:else>
          <div class="label suite"><span><s:property value="name" /></span></div>
          <div class="score suite"><s:property value="result.getHTML5SupportCount()" />/7</div>
          <div style="clear: both;"></div>
          <s:iterator value="tests">
            <div class="label"><span><s:property value="name" /></span></div>
            <div class="score">
              <s:if test="score.value > 0">Yes</s:if><s:else>N/A</s:else>
              <s:if test="(name == 'gamingSpitfire' || name == 'webglSphere' || name == 'workerContrast01' || name == 'workerContrast02') && score.value > 0">
                (<s:property value="getText('{0,number,###0.00}', {score.value})"/> <s:property value="score.unitName" />)
              </s:if>
            </div>
            <div style="clear: both;"></div>
          </s:iterator>
        </s:else>

		</div>
	</s:iterator>
</div>

	