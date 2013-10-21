[Introduction]
Peacekeeper is a free online browser benchmark tool. 
With Peacekeeper it¡¯s quick and easy to compare different 
browsers to find out which one offers the best performance
on your PC.
The sources are local version which we can run tests individually.

[Source Code Directories]
1.run.html 
Entry of the benchmark
2.js 
JS codes of peacekeeper. benchmark.js is the main JS to 
control test cases.
3.js/tests 
Each sub-directory is a test suite. 
Each *.js file in the sub-directory is a test case.
4.images/tests 
Each sub-directory is the images for a test suite.

[How to make peacekeeper run individual test case]
1.Get runTest.html via chrome development tools. 
Some test case need special runTest page 
such as webglSphere and gamingSpitfire.
2.Add common.js in js folder to parse parameters from url.
3.Change dowloaded runTest page to parse related suite name and test case name.
4.Get run.html via chrome development tools.
5.Change run.html add test case link in the left, 
make the iframe which run test case have correct location href(local url).
6.Change related url in index.html
7.Add results.html to display test results.
8.Change benchmark.js in js folder, 
send results via results.html after test case finish. 

[How to run individual test case]
Open run.html in the browser. For chrome, 
should add '--allow-file-access-from-files' command line argument.

[How were the tests selected and created?]
To create the tests we used a profiler to analyze JavaScript usage 
while browsing popular websites such as YouTube, Facebook, 
GMail and Meebo. The profiler collected data on the frequency 
in which different JavaScript functions were called on these sites 
and we used this data to create specific weighted tests for each function. 
In some situations the profiler is not able to collect accurate data
and for these, we implemented the tests using common techniques
and components to simulate the requirements of a typical webpage.
 
[What does it NOT test?]
Peacekeeper is a JavaScript performance benchmark. 
It does not test your browser¡¯s other features nor does 
it measure its security functionality. 
It does not check for W3C conformity, 
nor does it test external components such as Flash, 
though some add-ons may have a negative impact on the 
browsers performance in general. 
It does not test, nor is the score influenced by, 
your internet connection speed or latency.

[Tests in peacekeeper]
1.Rendering
These tests measure your browser's ability to render and modify specific elements 
used in typical web pages. Rendering tests manipulate the DOM tree in real-time. 
The tests measure display updating speed (frames per seconds).

    renderGrid01
    renderGrid02
    renderGrid03
    renderGrid 
This tests render a grid of square elements and animates the background colors. 
The test measures the browser's ability to manipulate huge amount of elements.

    renderPhysics 
This physics test simulates bouncing dandelion florts and their collision physics.
 The test measures both DOM update speed and mathematical methods.

2.HTML5 - WebGL
WebGL allows full blown 3D graphics to be rendered in a browser 
without the need for any external plug-ins. 
This test uses the MJS Matrix/Vector package. 
This is an HTML5 capability test and thus is not calculate into the overall score.

    webglSphere 
The test renders a simple transpared 3D cube, inside which are six bumbmapped spheres. 
The balls bounce within the cube with real (simplified) physics. 
The test is designed to be fairly light on the system - modern desktop computers 
should be able to run the test at full speed. 
The performance of the GL test is mostly dependant 
on the graphics and/or the CPU of the system, and less with the browser in question.

3.HTML5 - Video
These tests find out which HTML5 video formats are supposed by your browser. 
Peacekeeper only checks if your browser is able to play a specific format, 
no other valuation is done. . 
This is an HTML5 capability test and thus is not calculate into the overall score.

    videoPosterSupport
    videoCodecH264
    videoCodecTheora
    videoCodecWebM 

4.HTML5 - Web Worker
These tests use HTML5 Web Worker, 
which allows JavaScript to multhread - ie. the ability to perform multiple actions concurrently. 
This is an HTML5 capability test and thus is not calculate into the overall score.

	workerContrast01
	workerContrast02

5.HTML5 - Game
This test simulates a simple 2D, sprite-based game. 
The test itself is the real game, and what is shown is a recorded play. 
We use a slightly modified version of Crafy and the game is rendered through DOM, 
and all collision detections, 
physics and game logic is calculated as it would be for a real game. 
The amount of animated sprites increased during the test run to increase the load. 
This is an HTML5 capability test and thus is not calculate into the overall score.

    gamingSpitfire 

6.Canvas
These tests use HTML5 Canvas, 
which is a web technology for drawing and manipulating graphics without external plug-ins.

    experimentalRipple01 
Simulates a 'water ripple' effect by using HTML 5 Canvas. 
It measures the browser's ability to draw individual pixels.

    experimentalRipple02 
Same test as 'experimentalRipple01', but with a larger canvas and thus a heavier workload.

7.Data
Almost everything you see on a dynamic webpage uses JavaScript arrays. 
These tests measure your browser's ability to add, remove and modify data stored in an array. 
The Data suite consists of two tests:

    arrayCombined 
This test uses all features of the JavaScript Array object. 
This is a technical test that is not based on profiled data. 
The source data are different sized arrays of numbers.

    arrayWeighted 
This test is similar to 'arrayCombined', 
but the load is balanced based on profiled data. 
The source data is a list of all the countries in the world.

8.DOM operations

DOM, or Document Object Model, is the standard API JavaScript uses to create dynamic webpages. 
These tests emulate the methods used to create typical dynamic webpages. 
The DOM tests are based on development experience and the capabilities of the jQuery framework.

    domGetElements 
This test uses native DOM methods getElementById and getElementsByName. 
Both are widely used to get content from a DOM tree. The elements are not modified.

    domDynamicCreationCreateElement 
A common use of DOM is to dynamically create content with JavaScript, 
for example loading content from a server and injecting it to a page. 
There are two ways to accomplish this: setting the source as string to DOM's innerHTML-property 
or creating objects individually and then appending them to DOM. This test measures the latter.

    domDynamicCreationInnerHTML 
This test is similarl to the previous one, but uses the innerHTML-method.

    domJQueryAttributeFilters 
This test does a DOM query with jQuery. It searches elements with specific attributes.

    domJQueryBasicFilters 
This test uses basic filters to query elements from DOM.

    domJQueryBasics 
This test queries elements from DOM with very basic methods. 
This is similar to domGetElements, but uses jQuery rather than native methods.

    domJQueryContentFilters 
Query elements based on content. 
This does string searching and these methods are assumed to be time consuming.

    domJQueryHierarchy 
Query elements based on hierarchy, such as getting sibling, 
parent or child nodes from a DOM tree.

    domQueryselector 
HTML5 brings in teh QuerySelector, 
which allows JavaScript to search elements from the DOM tree directly 
without the need to iterate the whole tree through domGetElements

9.Text parsing
These tests measure your browser's performance in typical text manipulations 
such as using a profanity filter for chats, browser detection and form validation.

    stringChat 
This test removes swearing from artificial chat messages. 
Test measures looping and string replace-method.

    stringDetectBrowser 
There are differencies between browser behaviour, 
so browser name and version are often detected. 
This test uses string indexOf-method to detect browser and operating system.

    stringFilter 
This test filters a list of movies with a given keyword. 
The behaviour is known as filtering select or continuous filter. 
It's used to give real time suggestions while a user is filling input fields. 
The test uses simple regular expressions.

    stringValidateForm 
Live form validation is a common JavaScript use case. 
This test uses complex regular expressions to validate user input.

    stringWeighted 
This is an artificial test. 
Methods used and their intensities are chosen based on profiled data.

[How are the scores calculated?]
The overall score is the geometric mean of the main test scores
which in turn are the geometric mean of their respective individual test scores. 
Note that the HTML5 tests (prefixed with HTML5 in this document) 
are not calculated into the overall score. 
The HTML5 tests comprise their own HTML5 capability score, 
though for the tests for which there is a measurable metric, 
the score details may be viewed separately.

[What factors affect the score?]
Other than the browser itself, the most significant factor affecting 
the score is the type of CPU in your Internet device. 
After that, the power of your graphics chip affects the result somewhat, 
though mostly in situations where the card is very slow, 
or no drivers have been installed for it. 
Running other applications that consume system resources at the same time 
as the benchmark is running will naturally affect the score. 
The size of the viewable browser area also affects the score, 
so the screen resolution you use, the size of the browser window and whether 
the window is minimized affect the score as well. 
Beyond these, other factors are usually not significant. 
Your internet connection speed and network latency 
do not influence the score in any way. 