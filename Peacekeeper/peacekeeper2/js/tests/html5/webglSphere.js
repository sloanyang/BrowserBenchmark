/*
To get original version work on IE:

replace var -> var

Add this to mjs.js:

try { WebGLFloatArray; } catch (x) { 
    if (typeof(Float32Array) != "undefined")
    {
        WebGLFloatArray = Float32Array; 
    } else {
        WebGLFloatArray = function(i){};
    }
}



*/

var webglSphere = {
	
    version: 1,

    isCustom: true,
    
    unit: "fps",
	
    init: function() {
        $("#playground").append("<canvas id=\"glCanvas\" width=\"992\" height=\"558\" class=\"centeredcanvas\"></canvas>");
        setTimeout(webglSphere.finish, 20000);
    },

    run: function() {
        main();
    },
    
    finish: function() {
    
        var d = new Date();
        var time = d.getTime() - window.startTime;
        var fps = window.frames / (time / 1000);
    
        benchmark.test.result = fps;
        benchmark.test.oncomplete();
    },
    
    isSupported: function()
    {

        if (!window.WebGLRenderingContext) 
        {
            return false;
        }

        var canvas = $("<canvas></canvas>")[0];
        var contextNames = ["webgl", "experimental-webgl", "moz-webgl"];
        var context = null;
        for (var i = 0; i < contextNames.length; ++i) 
        {
            try 
            {
                context = canvas.getContext(contextNames[i]);
            } catch(e) {
            }
            if (context)
            {
                break; 
            }
        }
    
        if (!context) {
            return false;
        }
        
        return true;

    }

}



var programs = [{name: "shader_sphere", vertexShaderId: "vsh_sphere", fragmentShaderId: "fsh_sphere"},
                {name: "shader_cube", vertexShaderId: "vsh_cube", fragmentShaderId: "fsh_cube"},
                {name: "shader_skybox", vertexShaderId: "vsh_skybox", fragmentShaderId: "fsh_skybox"}];

var attribNames = ["aPosition", 
                   "aTangent",
                   "aNormal", 
                   "aTexCoord"];

var uniformNames = ["uProjMatrix",
                    "uViewMatrix",
                    "uModelMatrix",
                    "uNormalMatrix",
                    "uLightPos",
                    "uEyePos",
                    "uSampler0",
                    "uSampler1",
                    "uSampler2"];
                    
var textures = {};
var textureNames = ["stone", "stonenormal", "glass", "glassnormal"];

var currentProgram;





var stepsPerFrame = 5;
var frameStep = 1/60;
var gravity = -10;
var frameTime = 0;

var sphereDiv = 15; // Number of latitudes and longitudes of sphere object
var numSpheres = 6;
var sphereSize = 1.0;
var spheres = [];
var cube = {pos: [0, 0, 0], size: 4.0, orientation: M4x4.clone(M4x4.I)};

var pendingTextureLoads = 0;
var width = 512;
var height = 512;

var sphereBuffers;
var sphereBuffers2;
var cubeBuffers;

var skyboxTexture;
var skyboxTexCoords;

var paused = false;
var gl;

var lightPos = V3.$(1000, 1000, 1000);
var cameraLookAt = V3.$(0, 0, 0);
var cameraPlaneNormal = V3.normalize([0, 10, 4]); // Initial inclination of plane
var cameraPlaneAngle = Math.PI * 0.5; // current plane position
var cameraPlaneVel = 0.007; // rad/frame
var cameraMajorDistance = 30; // distance on major axis
var cameraMinorFactor = 0.4; // minor axis factor
var cameraMinorFactorSpeed = 1.0; // minor axis modifier speed
var cameraAzimuth = 0; // position on ellipse (rad)
var cameraVel = 0.02; // rad/frame

var cameraRotationMatrix = M4x4.clone(M4x4.I);

window.requestAnimFrame = function(){
    return (
        window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();


function keyPressed(e) {
    var eventobj = window.event ? event : e;
    var ch = eventobj.charCode ? eventobj.charCode : eventobj.keyCode;
    var k = String.fromCharCode(ch);
    if (k == " ") {
        if (paused) {
            paused = false;
            var canvas = document.getElementById("glCanvas");
            window.requestAnimFrame(frame, canvas);
        }
        else {
            paused = true;
        }
        
    }
}

var frame = function() {
    var canvas = document.getElementById("glCanvas");

    if (!paused)
        window.requestAnimFrame(frame, canvas);
    draw();
    frameTime += frameStep;
    window.frames++;
};

function main()
{
    document.onkeypress = keyPressed;
    
    var canvas = document.getElementById("glCanvas");
    width = canvas.width;
    height = canvas.height;
    
    gl = initWebGL(canvas);
    if (!gl) {
       return;
    }

    loadPrograms(gl);
    
    // set gl state
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    checkGLError();

    // set constant uniforms
    setCurrentProgram(gl, programs[0].program);
    gl.uniform1i(programs[0].uniforms.uSampler0, 0);
    gl.uniform1i(programs[0].uniforms.uSampler1, 1);
    gl.uniform1i(programs[0].uniforms.uSampler2, 2);
    checkGLError();        

    setCurrentProgram(gl, programs[1].program);
    gl.uniform1i(programs[1].uniforms.uSampler0, 0);
    gl.uniform1i(programs[1].uniforms.uSampler1, 1);
    gl.uniform1i(programs[1].uniforms.uSampler2, 2);
    checkGLError();        

    setCurrentProgram(gl, programs[2].program);
    gl.uniform1i(programs[2].uniforms.uSampler0, 0);
    checkGLError();       
    
    // load gfx
    loadTextures();
    skyboxTexture = loadCubeMap("images/tests/webgl/skybox4", "jpg");
    skyboxTexCoords = makeSkyboxTexCoords(gl);
    
    // make geometry buffers
    sphereBuffers = makeSphere(gl, 1.0, sphereDiv, sphereDiv);
    sphereBuffers2 = makeSphere(gl, 1.3, sphereDiv*2, sphereDiv*2);    
    cubeBuffers = makeBox(gl);
    
    // generate initial positions
    var sq = Math.ceil(Math.sqrt(numSpheres));
    var spacing = (cube.size - 1.0) / (sq/2);
    for (var i = 0; i < numSpheres; i++) {
        var r = Math.floor(i / sq);
        var c = i % sq;
        spheres.push( { pos: V3.$((c - (sq - 1)/2)*spacing, (r - (sq - 1)/2)*spacing, (r - (sq - 1)/2)*spacing), 
                        size: sphereSize,
                        orientation: M4x4.clone(M4x4.I),
                        velocity: V3.$(0, r*0.1 + c, 0),
                        angVelocity: [0, 1, 0, 0],
                        boing: 0.0} );
    }
        
    //window.console.log("Triangles: " + (2*cubeBuffers.numIndices + numSpheres*sphereBuffers.numIndices)/3);
    //window.console.log("Vertices: " + (2*cubeBuffers.numVertices + numSpheres*sphereBuffers.numVertices));

    var d = new Date();
    window.startTime = d.getTime();
    window.frames = 0;
    
    frame();
}

function checkGLError() {
    var error = gl.getError();
    if (error != gl.NO_ERROR) {
        var str = "GL Error: " + error;
        window.console.log(str);
        throw str;
    }
}

function drawSphere() {
    
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffers.vertexObject);
    gl.vertexAttribPointer(programs[0].attribs.aPosition, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffers.texCoordObject);
    gl.vertexAttribPointer(programs[0].attribs.aTexCoord, 2, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffers.normalObject);
    gl.vertexAttribPointer(programs[0].attribs.aNormal, 3, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffers.tangentObject);
    gl.vertexAttribPointer(programs[0].attribs.aTangent, 3, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereBuffers.indexObject);
    gl.drawElements(gl.TRIANGLES, sphereBuffers.numIndices, gl.UNSIGNED_SHORT, 0);

}

function drawSphereFrontAndBack() {
    
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffers2.vertexObject);
    gl.vertexAttribPointer(programs[0].attribs.aPosition, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffers2.texCoordObject);
    gl.vertexAttribPointer(programs[0].attribs.aTexCoord, 2, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffers2.normalObject);
    gl.vertexAttribPointer(programs[0].attribs.aNormal, 3, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffers2.tangentObject);
    gl.vertexAttribPointer(programs[0].attribs.aTangent, 3, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereBuffers2.indexObject);

    gl.cullFace(gl.FRONT);    
    gl.drawElements(gl.TRIANGLES, sphereBuffers2.numIndices, gl.UNSIGNED_SHORT, 0);
    
    gl.cullFace(gl.BACK);
    gl.drawElements(gl.TRIANGLES, sphereBuffers2.numIndices, gl.UNSIGNED_SHORT, 0);

}

function drawCube() {
    
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffers.vertexObject);
    gl.vertexAttribPointer(programs[1].attribs.aPosition, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffers.texCoordObject);
    gl.vertexAttribPointer(programs[1].attribs.aTexCoord, 2, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffers.normalObject);
    gl.vertexAttribPointer(programs[1].attribs.aNormal, 3, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffers.tangentObject);
    gl.vertexAttribPointer(programs[1].attribs.aTangent, 3, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeBuffers.indexObject);

    gl.cullFace(gl.FRONT);    
    gl.drawElements(gl.TRIANGLES, cubeBuffers.numIndices, gl.UNSIGNED_BYTE, 0);
    
    gl.cullFace(gl.BACK);
    gl.drawElements(gl.TRIANGLES, cubeBuffers.numIndices, gl.UNSIGNED_BYTE, 0);
    
}

function drawSkybox() {

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffers.vertexObject);
    gl.vertexAttribPointer(programs[2].attribs.aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programs[2].attribs.aPosition);
    gl.bindBuffer(gl.ARRAY_BUFFER, skyboxTexCoords);
    gl.vertexAttribPointer(programs[2].attribs.aTexCoord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programs[2].attribs.aTexCoord);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeBuffers.indexObject);
    gl.drawElements(gl.TRIANGLES, cubeBuffers.numIndices, gl.UNSIGNED_BYTE, 0);

    gl.disableVertexAttribArray(programs[2].attribs.aPosition);
    gl.disableVertexAttribArray(programs[2].attribs.aTexCoord);
    
}
    
function stepSpheres() {
    
    var step = frameStep / stepsPerFrame;
    var dp = V3.$(0, 0, 0);
    var axis = V3.$(0, 0, 0);
    var rot = M4x4.clone(M4x4.I);
    for (var s = 0; s < stepsPerFrame; s++) {
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].velocity[1] += step*gravity;
            V3.scale(spheres[i].velocity, step, dp);
            V3.add(spheres[i].pos, dp, spheres[i].pos);
            
            // angular velocity implemented by simply rotating around axis
            axis[0] = spheres[i].angVelocity[1];
            axis[1] = spheres[i].angVelocity[2];
            axis[2] = spheres[i].angVelocity[3];
            M4x4.makeRotate(step*spheres[i].angVelocity[0], axis, rot);
            M4x4.mul(rot, spheres[i].orientation, spheres[i].orientation);
        }
        computeSphereInnerSphereCollisions(spheres, cube);
        computeSphereSphereCollisions(spheres, cube);
    }
}

function draw() {

    if (pendingTextureLoads > 0) {
        return;
    }
    
    stepSpheres();
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    // rotate camera
    M4x4.makeRotate(cameraPlaneAngle, [0, 1, 0], cameraRotationMatrix);
    var n = M4x4.transformLineAffine(cameraRotationMatrix, cameraPlaneNormal);
    var major = V3.$(-n[2], 0, n[0]);
    if (V3.length(major) > 0.001) {
        V3.sub(major, V3.scale(cameraPlaneNormal, V3.dot(major, n)), major);
        V3.normalize(major, major);
    }
    else {
        major[0] = Math.sin(cameraPlaneAngle);
        major[1] = 0;
        major[2] = Math.cos(cameraPlaneAngle);
    }
    var minor = V3.cross(major, n);
    V3.scale(major, cameraMajorDistance, major);
    var minorScale = cameraMajorDistance*(cameraMinorFactor + Math.sin(frameTime*cameraMinorFactorSpeed)*(cameraMinorFactor/3));
    V3.scale(minor, minorScale, minor);
    var cameraPos = V3.add(V3.scale(major, Math.cos(cameraAzimuth), major),
                           V3.scale(minor, Math.sin(cameraAzimuth), minor));
                           
    cameraAzimuth += cameraVel;
    if (cameraAzimuth > Math.PI * 2) cameraAzimuth -= Math.PI * 2;
    cameraPlaneAngle += cameraPlaneVel;
    if (cameraPlaneAngle > Math.PI * 2) cameraPlaneAngle -= Math.PI * 2;
    
    // setup
    var projection = M4x4.makePerspective(60, width / height, 1, 500);
    var view = M4x4.makeLookAt(cameraPos, cameraLookAt, [0, 1, 0]);
    var viewNoTranslation = M4x4.topLeft3x3(view); // this is for skybox
    
    
    // *** SKYBOX ***
    // Set up uniforms    
    setCurrentProgram(gl, programs[2].program);
    
    gl.uniformMatrix4fv(programs[2].uniforms.uProjMatrix, gl.FALSE, projection);
    gl.uniformMatrix3fv(programs[2].uniforms.uViewMatrix, gl.FALSE, viewNoTranslation);
    gl.uniformMatrix4fv(programs[2].uniforms.uModelMatrix, gl.FALSE, M4x4.makeScale1(50));
    
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, skyboxTexture);

    gl.disable(gl.CULL_FACE);
    drawSkybox();
    gl.enable(gl.CULL_FACE);

    // *** SPHERES ***
    gl.enableVertexAttribArray(programs[0].attribs.aPosition);
    gl.enableVertexAttribArray(programs[0].attribs.aTexCoord);
    gl.enableVertexAttribArray(programs[0].attribs.aNormal);
    gl.enableVertexAttribArray(programs[0].attribs.aTangent);
    
    // Set up uniforms
    setCurrentProgram(gl, programs[0].program);
    
    gl.uniformMatrix4fv(programs[0].uniforms.uProjMatrix, gl.FALSE, projection);
    gl.uniformMatrix4fv(programs[0].uniforms.uViewMatrix, gl.FALSE, view);
    gl.uniform3fv(programs[0].uniforms.uLightPos, lightPos);
    gl.uniform3fv(programs[0].uniforms.uEyePos, cameraPos);
    
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textures.stone);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, textures.stonenormal);

    var model = M4x4.clone(M4x4.I);
    for (var i = 0; i < spheres.length; i++) {
        M4x4.makeTranslate(spheres[i].pos, model);
        M4x4.mul(model, spheres[i].orientation, model);
        // disable boing-boing, looks ugly as penetrates cube
        spheres[i].boing = 0.0;
        M4x4.scale3(spheres[i].size + Math.sin(frameTime*10)*spheres[i].boing*0.5, 
                    spheres[i].size + Math.cos(frameTime*10)*spheres[i].boing*0.5, 
                    spheres[i].size + Math.sin(frameTime*10)*spheres[i].boing*0.5,
                    model, model);
        spheres[i].boing *= 0.99;
        gl.uniformMatrix4fv(programs[0].uniforms.uModelMatrix, gl.FALSE, model);
        // no need to calculate normal matrix 'cause uniform scale
        gl.uniformMatrix4fv(programs[0].uniforms.uNormalMatrix, gl.FALSE, spheres[i].orientation);
    
        drawSphere();
    }

    gl.disableVertexAttribArray(programs[0].attribs.aPosition);
    gl.disableVertexAttribArray(programs[0].attribs.aTexCoord);
    gl.disableVertexAttribArray(programs[0].attribs.aNormal);
    gl.disableVertexAttribArray(programs[0].attribs.aTangent);

    // *** CUBE (transparent drawn last) *** 
    // Make model matrix for cube
    M4x4.makeTranslate(cube.pos, model);
    M4x4.rotate(0.005, V3.normalize([1, 0.2, 0]), cube.orientation, cube.orientation);
    M4x4.mul(model, cube.orientation, model);
    M4x4.scale1(cube.size, model, model);

    gl.enableVertexAttribArray(programs[1].attribs.aPosition);
    gl.enableVertexAttribArray(programs[1].attribs.aTexCoord);
    gl.enableVertexAttribArray(programs[1].attribs.aNormal);
    gl.enableVertexAttribArray(programs[1].attribs.aTangent);

    // Set up uniforms
    setCurrentProgram(gl, programs[1].program);
    
    gl.uniformMatrix4fv(programs[1].uniforms.uProjMatrix, gl.FALSE, projection);
    gl.uniformMatrix4fv(programs[1].uniforms.uViewMatrix, gl.FALSE, view);
    gl.uniformMatrix4fv(programs[1].uniforms.uModelMatrix, gl.FALSE, model);
    // no need to calculate normal matrix 'cause uniform scale
    gl.uniformMatrix4fv(programs[1].uniforms.uNormalMatrix, gl.FALSE, cube.orientation);
    gl.uniform3fv(programs[1].uniforms.uLightPos, lightPos);
    gl.uniform3fv(programs[1].uniforms.uEyePos, cameraPos);
    
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textures.glass);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, textures.glassnormal);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, skyboxTexture);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    //drawCube();
    drawSphereFrontAndBack();
    gl.disable(gl.BLEND);

    gl.disableVertexAttribArray(programs[1].attribs.aPosition);
    gl.disableVertexAttribArray(programs[1].attribs.aTexCoord);
    gl.disableVertexAttribArray(programs[1].attribs.aNormal);
    gl.disableVertexAttribArray(programs[1].attribs.aTangent);
    
    checkGLError();
}

function loadTexture(src)
{
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    ++pendingTextureLoads;
    var image = new Image();
    image.onload = function() {
        --pendingTextureLoads;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.texImage2D(
            gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        checkGLError();
        gl.generateMipmap(gl.TEXTURE_2D);
        draw();
    };
    image.src = "images/tests/webgl/" + src + ".png";
    return texture;
}

function loadTextures() {

    for (var i = 0; i < textureNames.length; ++i)
        textures[textureNames[i]] = loadTexture(textureNames[i]);
}

function loadCubeMap(base, suffix) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    var faces = [["posx", gl.TEXTURE_CUBE_MAP_POSITIVE_X],
                 ["negx", gl.TEXTURE_CUBE_MAP_NEGATIVE_X],
                 ["posy", gl.TEXTURE_CUBE_MAP_POSITIVE_Y],
                 ["negy", gl.TEXTURE_CUBE_MAP_NEGATIVE_Y],
                 ["posz", gl.TEXTURE_CUBE_MAP_POSITIVE_Z],
                 ["negz", gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]];
    for (var i = 0; i < faces.length; i++) {
        var url = base + "-" + faces[i][0] + "." + suffix;
        var face = faces[i][1];
        ++pendingTextureLoads;
        var image = new Image();
        image.onload = function(texture, face, image, url) {
            return function() {
                --pendingTextureLoads;
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
                gl.texImage2D(
                   face, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                checkGLError();
                draw();
            }
        }(texture, face, image, url);
        image.src = url;
    }
    return texture;
}

function setCurrentProgram(gl, program) {
    gl.useProgram(program);
    currentProgram = program;
}




function initWebGL(canvas, opt_attribs) {
    if (!window.WebGLRenderingContext) {
        alert("No WebGLRenderingContext, no WebGL support.");
        return null;
    }

    var contextNames = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
    var context = null;
    for (var i = 0; i < contextNames.length; ++i) {
        try {
            context = canvas.getContext(contextNames[i], opt_attribs);
        } catch(e) {}
        if (context)
            break;
    }
    
    if (!context) {
        alert("Can't get context");
    }
    
    context.console = ("console" in window) ? window.console : { log: function() { } };
    
    return context;
};

function loadShader(ctx, shaderId)
{
    var shaderScript = document.getElementById(shaderId);
    if (!shaderScript) {
        ctx.console.log("*** Error: shader script '" + shaderId + "' not found");
        return null;
    }

    if (shaderScript.type == "x-shader/x-vertex")
        var shaderType = ctx.VERTEX_SHADER;
    else if (shaderScript.type == "x-shader/x-fragment")
        var shaderType = ctx.FRAGMENT_SHADER;
    else {
        ctx.console.log("*** Error: shader script '" + shaderId + "' of undefined type '" + shaderScript.type + "'");
        return null;
    }

    var shader = ctx.createShader(shaderType);
    if (shader == null) {
        ctx.console.log("*** Error: unable to create shader '" + shaderId + "'");
        return null;
    }
    ctx.shaderSource(shader, shaderScript.text);

    ctx.compileShader(shader);

    var compiled = ctx.getShaderParameter(shader, ctx.COMPILE_STATUS);
    if (!compiled) {
        var error = ctx.getShaderInfoLog(shader);
        ctx.console.log("*** Error compiling shader '" + shaderId + "':"+error);
        ctx.deleteShader(shader);
        return null;
    }

    return shader;
}

function createProgram(ctx, program)
{
    program.vertexShader = loadShader(ctx, program.vertexShaderId);
    program.fragmentShader = loadShader(ctx, program.fragmentShaderId);

    program.program = ctx.createProgram();
    
    if (!program.program)
        return null;
    
    ctx.attachShader(program.program, program.vertexShader);
    ctx.attachShader(program.program, program.fragmentShader);
    program.attribs = {};
    for (var i = 0; i < attribNames.length; ++i) {
        ctx.bindAttribLocation(program.program, i, attribNames[i]);
        program.attribs[attribNames[i]] = i;
    }
    ctx.linkProgram(program.program);

    var linked = ctx.getProgramParameter(program.program, ctx.LINK_STATUS);
    if (!linked) {
        var error = ctx.getProgramInfoLog(program.program);
        ctx.console.log("Error in program linking:" + error);

        ctx.deleteProgram(program.program);
        ctx.deleteProgram(program.fragmentShader);
        ctx.deleteProgram(program.vertexShader);

        return null;
    }
}

function loadPrograms(ctx)
{
    for (var i = 0; i < programs.length; ++i) {
        createProgram(ctx, programs[i]);
        
        programs[i].uniforms = {};
        ctx.useProgram(programs[i].program);
        for (var j = 0; j < uniformNames.length; ++j) {
            programs[i].uniforms[uniformNames[j]] = ctx.getUniformLocation(programs[i].program, uniformNames[j]);
        }

    }
}



//
// makeSphere
//
// Create a sphere with the passed number of latitude and longitude bands and the passed radius.
// Sphere has vertices, normals and texCoords. Create VBOs for each as well as the index array.
// Return an object with the following properties:
//
//  normalObject        WebGLBuffer object for normals
//  tangentObject       WebGLBuffer object for tangents
//  texCoordObject      WebGLBuffer object for texCoords
//  vertexObject        WebGLBuffer object for vertices
//  indexObject         WebGLBuffer object for indices
//  numIndices          The number of indices in the indexObject
//  numVertices         The number of vertices in the vertexObject
//
function makeSphere(ctx, radius, lats, longs)
{
    var geometryData = [ ];
    var normalData = [ ];
    var tangentData = [ ];
    var texCoordData = [ ];
    var indexData = [ ];

    for (var latNumber = 0; latNumber <= lats; ++latNumber) {
        for (var longNumber = 0; longNumber <= longs; ++longNumber) {
            var theta = latNumber * Math.PI / lats;
            var phi = longNumber * 2 * Math.PI / longs;
            var sinTheta = Math.sin(theta);
            var sinPhi = Math.sin(phi);
            var cosTheta = Math.cos(theta);
            var cosPhi = Math.cos(phi);

            var x = cosPhi * sinTheta;
            var y = cosTheta;
            var z = sinPhi * sinTheta;
            var u = 1-(longNumber/longs);
            var v = latNumber/lats;

            normalData.push(x); 
            normalData.push(y);
            normalData.push(z);
            texCoordData.push(u);
            texCoordData.push(v);
            geometryData.push(radius * x);
            geometryData.push(radius * y);
            geometryData.push(radius * z);
            x = cosPhi * cosTheta;
            y = -sinTheta;
            z = sinPhi * cosTheta;
            tangentData.push(x);
            tangentData.push(y);
            tangentData.push(z);
        }
    }

    for (var latNumber = 0; latNumber < lats; ++latNumber) {
        for (var longNumber = 0; longNumber < longs; ++longNumber) {
            var first = (latNumber * (longs+1)) + longNumber;
            var second = first + longs + 1;
            indexData.push(first);
            indexData.push(first+1);
            indexData.push(second);

            indexData.push(second);
            indexData.push(first+1);
            indexData.push(second+1);
        }
    }

    var retval = { };

    retval.normalObject = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, retval.normalObject);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(normalData), ctx.STATIC_DRAW);

    retval.tangentObject = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, retval.tangentObject);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(tangentData), ctx.STATIC_DRAW);
    
    retval.texCoordObject = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, retval.texCoordObject);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(texCoordData), ctx.STATIC_DRAW);

    retval.vertexObject = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, retval.vertexObject);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(geometryData), ctx.STATIC_DRAW);

    retval.numIndices = indexData.length;
    retval.indexObject = ctx.createBuffer();
    ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, retval.indexObject);
    ctx.bufferData(ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), ctx.STREAM_DRAW);

    retval.numVertices = geometryData.length / 3;
    
    return retval;
}

//
// makeBox
//
// Create a box with vertices, normals and texCoords. Create VBOs for each as well as the index array.
// Return an object with the following properties:
//
//  normalObject        WebGLBuffer object for normals
//  tangentObject       WebGLBuffer object for tangents
//  texCoordObject      WebGLBuffer object for texCoords
//  vertexObject        WebGLBuffer object for vertices
//  indexObject         WebGLBuffer object for indices
//  numIndices          The number of indices in the indexObject
//  numVertices         The number of vertices in the vertexObject
//
function makeBox(ctx)
{
    // box
    //    v6----- v5
    //   /|      /|
    //  v1------v0|
    //  | |     | |
    //  | |v7---|-|v4
    //  |/      |/
    //  v2------v3
    //
    // vertex coords array
    var vertices = new Float32Array(
        [  1, 1, 1,  -1, 1, 1,  -1,-1, 1,   1,-1, 1,    // v0-v1-v2-v3 front
           1, 1, 1,   1,-1, 1,   1,-1,-1,   1, 1,-1,    // v0-v3-v4-v5 right
           1, 1, 1,   1, 1,-1,  -1, 1,-1,  -1, 1, 1,    // v0-v5-v6-v1 top
          -1, 1, 1,  -1, 1,-1,  -1,-1,-1,  -1,-1, 1,    // v1-v6-v7-v2 left
          -1,-1,-1,   1,-1,-1,   1,-1, 1,  -1,-1, 1,    // v7-v4-v3-v2 bottom
           1,-1,-1,  -1,-1,-1,  -1, 1,-1,   1, 1,-1 ]   // v4-v7-v6-v5 back
    );

    // normal array
    var normals = new Float32Array(
        [  0, 0, 1,   0, 0, 1,   0, 0, 1,   0, 0, 1,     // v0-v1-v2-v3 front
           1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,     // v0-v3-v4-v5 right
           0, 1, 0,   0, 1, 0,   0, 1, 0,   0, 1, 0,     // v0-v5-v6-v1 top
          -1, 0, 0,  -1, 0, 0,  -1, 0, 0,  -1, 0, 0,     // v1-v6-v7-v2 left
           0,-1, 0,   0,-1, 0,   0,-1, 0,   0,-1, 0,     // v7-v4-v3-v2 bottom
           0, 0,-1,   0, 0,-1,   0, 0,-1,   0, 0,-1 ]    // v4-v7-v6-v5 back
       );


    // tangent array
    var tangents = new Float32Array(
        [  1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,     // v0-v1-v2-v3 front
           0, 0, -1,  0, 0, -1,  0, 0, -1,  0, 0, -1,     // v0-v3-v4-v5 right
           1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,     // v0-v5-v6-v1 top
           0, 0, 1,   0, 0, 1,   0, 0, 1,   0, 0, 1,     // v1-v6-v7-v2 left
           1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,     // v7-v4-v3-v2 bottom
          -1, 0, 0,  -1, 0, 0,  -1, 0, 0,  -1, 0, 0 ]    // v4-v7-v6-v5 back
       );

    // texCoord array
    var texCoords = new Float32Array(
        [  1, 1,   0, 1,   0, 0,   1, 0,    // v0-v1-v2-v3 front
           0, 1,   0, 0,   1, 0,   1, 1,    // v0-v3-v4-v5 right
           1, 0,   1, 1,   0, 1,   0, 0,    // v0-v5-v6-v1 top
           1, 1,   0, 1,   0, 0,   1, 0,    // v1-v6-v7-v2 left
           0, 0,   1, 0,   1, 1,   0, 1,    // v7-v4-v3-v2 bottom
           0, 0,   1, 0,   1, 1,   0, 1 ]   // v4-v7-v6-v5 back
       );

    // index array
    var indices = new Uint8Array(
        [  0, 1, 2,   0, 2, 3,    // front
           4, 5, 6,   4, 6, 7,    // right
           8, 9,10,   8,10,11,    // top
          12,13,14,  12,14,15,    // left
          16,17,18,  16,18,19,    // bottom
          20,21,22,  20,22,23 ]   // back
      );

    var retval = { };

    retval.normalObject = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, retval.normalObject);
    ctx.bufferData(ctx.ARRAY_BUFFER, normals, ctx.STATIC_DRAW);

    retval.tangentObject = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, retval.tangentObject);
    ctx.bufferData(ctx.ARRAY_BUFFER, tangents, ctx.STATIC_DRAW);
    
    retval.texCoordObject = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, retval.texCoordObject);
    ctx.bufferData(ctx.ARRAY_BUFFER, texCoords, ctx.STATIC_DRAW);

    retval.vertexObject = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, retval.vertexObject);
    ctx.bufferData(ctx.ARRAY_BUFFER, vertices, ctx.STATIC_DRAW);

    ctx.bindBuffer(ctx.ARRAY_BUFFER, null);

    retval.indexObject = ctx.createBuffer();
    ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, retval.indexObject);
    ctx.bufferData(ctx.ELEMENT_ARRAY_BUFFER, indices, ctx.STATIC_DRAW);
    ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, null);

    retval.numIndices = indices.length;
    retval.numVertices = vertices.length / 3;

    return retval;
}

function makeSkyboxTexCoords(ctx) {

    var texCoords = new Float32Array(
        [  1, 1, 1,  -1, 1, 1,  -1,-1, 1,   1,-1, 1,    // v0-v1-v2-v3 front
           1, 1, 1,   1,-1, 1,   1,-1,-1,   1, 1,-1,    // v0-v3-v4-v5 right
           1, 1, 1,   1, 1,-1,  -1, 1,-1,  -1, 1, 1,    // v0-v5-v6-v1 top
          -1, 1, 1,  -1, 1,-1,  -1,-1,-1,  -1,-1, 1,    // v1-v6-v7-v2 left
          -1,-1,-1,   1,-1,-1,   1,-1, 1,  -1,-1, 1,    // v7-v4-v3-v2 bottom
           1,-1,-1,  -1,-1,-1,  -1, 1,-1,   1, 1,-1]   // v4-v7-v6-v5 back
       );

    texCoordObject = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, texCoordObject);
    ctx.bufferData(ctx.ARRAY_BUFFER, texCoords, ctx.STATIC_DRAW);
    
    return texCoordObject;
}
