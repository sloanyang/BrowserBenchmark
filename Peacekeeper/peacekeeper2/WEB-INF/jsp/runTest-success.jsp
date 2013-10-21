<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en-US">
<head profile="http://gmpg.org/xfn/11">
<!-- Futuremark Peacekeeper -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Peacekeeper</title>

<!-- Fallback refresh after 120 seconds. -->
<meta http-equiv="refresh" content="120; url=runtimeout.action?testName=<s:property value="currentTest.name" />">

<link rel="stylesheet" href="css/test-style.css" type="text/css" media="screen" />

<script src="js/libs/jquery-1.6.4.min.js"></script>
<script src="js/benchmark.js"></script>
<script src="js/assetmanager.js"></script>

<s:iterator value="currentTest.requiredScripts">
  <script type="text/javascript" src="js/<s:property />"></script>
</s:iterator>

<script type="text/javascript">
benchmark.suiteProgress = <s:property value="suiteProgress" />;
benchmark.suiteCount = <s:property value="suiteCount" />;
benchmark.suiteName = "<s:property value="currentSuite.name" />";
benchmark.suiteTitle = "<s:property value="currentSuite.title" />";
benchmark.suiteBackground = "<s:property value="currentSuite.background" />";
benchmark.suiteDescription = "<s:property value="currentSuite.description" />";
benchmark.remainingTime = "<s:property value="currentSuite.remainingTime" />";
benchmark.testObjectName = "<s:property value="currentTest.name" />";
benchmark.testDescription = "<s:property value="currentTest.description" />";
</script>

<s:if test="currentTest.name == 'webglSphere'">

<script id="vsh_sphere" type="x-shader/x-vertex">
uniform mat4 uProjMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uNormalMatrix;
uniform vec3 uLightPos;

attribute vec4 aPosition;
attribute vec3 aNormal;
attribute vec3 aTangent;
attribute vec3 aTexCoord;

varying vec4 vPosition;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec2 vTexCoord;

void main()
{
    vPosition = uModelMatrix*aPosition;
	gl_Position = uProjMatrix*uViewMatrix*vPosition;

    vNormal = normalize(uNormalMatrix*vec4(aNormal, 0)).xyz;
    vTangent = normalize(uNormalMatrix*vec4(aTangent, 0)).xyz;
    vBinormal = cross(vNormal, vTangent);    
	vTexCoord = aTexCoord.xy;
/*
    vPosition = uViewMatrix*uModelMatrix*aPosition;
	gl_Position = uProjMatrix*vPosition;

    vNormal = normalize(uViewMatrix*uNormalMatrix*vec4(aNormal, 0)).xyz;
    vTangent = normalize(uViewMatrix*uNormalMatrix*vec4(aTangent, 0)).xyz;
    vBinormal = cross(vNormal, vTangent);
	vTexCoord = aTexCoord.xy;*/
}

</script>
<script id="fsh_sphere" type="x-shader/x-fragment">
precision mediump float;

const float normalScale = 1.0;
const float ambient = 0.5;
const float envFactor = 0.3;

uniform mat4 uViewMatrix;
uniform vec3 uLightPos;
uniform vec3 uEyePos;

uniform sampler2D uSampler0;
uniform sampler2D uSampler1;
uniform samplerCube uSampler2;

varying vec4 vPosition;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec2 vTexCoord;

void main()
{
                          
    vec3 lightDir = vec3(normalize(vec4(uLightPos, 1.0) - vPosition));

	vec3 bump = texture2D(uSampler1, vTexCoord).xyz;
	bump.xy = (bump.xy*2.0 - 1.0)*normalScale;
    
    vec3 bumpNormal = normalize(vNormal + vTangent*bump.y + vBinormal*bump.x);

    vec3 reflectDir = reflect(normalize(vPosition.xyz - uEyePos), bumpNormal);
	vec3 env = textureCube(uSampler2, reflectDir).xyz;
    
    float NdotL = clamp(dot(bumpNormal, lightDir), 0.0, 1.0);
    
    //vec3 ref = reflect(lightDir, bumpNormal);
    //vec3 eye = normalize(vPosition.xyz - uEyePos);
    //float specular = pow(abs(dot(ref, eye)), 5.0);
    
	vec3 color = texture2D(uSampler0, vTexCoord).xyz;
	gl_FragColor = vec4(color*min(NdotL + ambient, 1.0) + env*envFactor, 1.0);

}

</script>
<script id="vsh_cube" type="x-shader/x-vertex">
uniform mat4 uProjMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uNormalMatrix;
uniform vec3 uLightPos;
uniform vec3 uEyePos;

attribute vec4 aPosition;
attribute vec3 aNormal;
attribute vec3 aTangent;
attribute vec3 aTexCoord;

varying vec4 vPosition;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec2 vTexCoord;

void main()
{
    vPosition = uModelMatrix*aPosition;
	gl_Position = uProjMatrix*uViewMatrix*vPosition;

    vNormal = normalize(uNormalMatrix*vec4(aNormal, 0)).xyz;
    vTangent = normalize(uNormalMatrix*vec4(aTangent, 0)).xyz;
    vBinormal = cross(vNormal, vTangent);    
	vTexCoord = aTexCoord.xy;
}

</script>
<script id="fsh_cube" type="x-shader/x-fragment">
precision mediump float;

const float normalScale = 0.05;
const float opacity = 0.5;
const float diffuseTexture = 0.0;
const float envFactor = 0.9;
const float specularFactor = 0.15;

uniform mat4 uViewMatrix;
uniform vec3 uLightPos;
uniform vec3 uEyePos;

uniform sampler2D uSampler0;
uniform sampler2D uSampler1;
uniform samplerCube uSampler2;

varying vec4 vPosition;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec2 vTexCoord;

void main()
{

                          
    vec3 lightDir = vec3(normalize(vec4(uLightPos, 1.0) - vPosition));

	vec3 bump = texture2D(uSampler1, vTexCoord).xyz;
	bump.xy = (bump.xy*2.0 - 1.0)*normalScale;
    
    vec3 bumpNormal = normalize(vNormal + vTangent*bump.y + vBinormal*bump.x);
    
    vec3 reflectDir = reflect(normalize(vPosition.xyz - uEyePos), bumpNormal);
	vec3 env = textureCube(uSampler2, reflectDir).xyz;
    
    vec3 ref = reflect(lightDir, bumpNormal);
    vec3 eye = normalize(vPosition.xyz - uEyePos);
    // don't clamp the dot products 'cause transparent object
    float specular = pow(abs(dot(ref, eye)), 5.0);
    
	vec3 color = texture2D(uSampler0, vTexCoord).xyz;
    
	gl_FragColor = vec4(color*diffuseTexture + env*envFactor + vec3(specular)*specularFactor, opacity);
}

</script>

<script id="vsh_skybox" type="x-shader/x-vertex">
uniform mat4 uProjMatrix;
uniform mat4 uModelMatrix;
uniform mat3 uViewMatrix;

attribute vec4 aPosition;
attribute vec3 aTexCoord;

varying vec4 vPosition;
varying vec3 vTexCoord;

void main()
{
    vPosition = uModelMatrix*aPosition;
	gl_Position = uProjMatrix*mat4(uViewMatrix)*vPosition;

	vTexCoord = aTexCoord;
}

</script>
<script id="fsh_skybox" type="x-shader/x-fragment">
precision mediump float;

uniform samplerCube uSampler0;

varying vec4 vPosition;
varying vec3 vTexCoord;

void main()
{
	vec3 env = textureCube(uSampler0, vTexCoord).xyz;
	gl_FragColor = vec4(env, 1.0);
}

</script>

</s:if>

</head>
<body onload="benchmark.init()">

<div id="playground"></div>
<div id="hiddenPlayground"></div>

</body>
</html>
