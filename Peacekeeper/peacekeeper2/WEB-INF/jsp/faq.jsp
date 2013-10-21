<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<html>
	<head>
		<title></title>
		<script>
		$(document).ready(function() {
      $("#facebook-login-loading").hide();
		});
		</script>
	</head>

	<body>

	<div id="faq" class="container">
		<div id="descriptionSpacer">
		</div>

		<div id="description">
			<div id="faqHeader"></div>
			<div id="faqBg"><div class="padding">
				
				<h1>Frequently Asked Questions</h1>
				
				<h2><a href="javascript:void(0)" onclick="peacekeeper.toggleFAQItem(this)">What is Peacekeeper?</a></h2>
				<p>Peacekeeper is a free online browser benchmark tool. With Peacekeeper it’s quick and easy to compare different browsers to find out which one offers the best
				performance on your PC. </p>
	
				<h2><a href="javascript:void(0)" onclick="peacekeeper.toggleFAQItem(this)">What's with the name?</a></h2>
				<p>The name "Peacekeeper" is inspired by the well established concept of "browser wars". The fact is that competition between browsers has never been as hotly 
				contested, nor have internet users had as many choices as they do now. The big five: Internet Explorer, Firefox, Safari, Chrome and Opera, all see regular releases 
				of new and innovative features and each camp’s followers keep many a forum busy with heated discussion and opinion. Until now, words were the only shots fired in 
				the long-running browser wars. With Peacekeeper however, web users finally have an easy to use tool for measuring and comparing the performance of different web 
				browsers. Just like a real peacekeeping force, the Peacekeeper benchmark is impartial, objective and seeks to resolve conflict. </p>
				
				<h2><a href="javascript:void(0)" onclick="peacekeeper.toggleFAQItem(this)">What can I use it for?</a></h2>
				<p>Peacekeeper will show you which browser performs best. At the end of the test your browser receives a score indicating its overall performance. 
				It’s simple to compare scores by running Peacekeeper again in a different browser. Changing browsers to one that's faster can mean that pages with dynamic content 
				will be more responsive. </p>
				
				<h2><a href="javascript:void(0)" onclick="peacekeeper.toggleFAQItem(this)">What does it test?</a></h2>
				<p>Peacekeeper measures your browser's performance by testing its JavaScript functionality. JavaScript is a widely used programming language used in the creation of 
				modern websites to provide features such as animation, navigation, forms and other common requirements. By measuring a browser’s ability to handle commonly used 
				JavaScript functions Peacekeeper can evaluate its performance.</p>

				<h2><a href="javascript:void(0)" onclick="peacekeeper.toggleFAQItem(this)">What does a Peacekeeper score represent?</a></h2>
				<p>Peacekeeper scores are measured in operations per second or rendered frames per second depending on the test. When "browser X" scores twice as much as "browser Y"
				on the same PC it means that for a given test either:</p>
				
				<ul>
				<li>X ran twice as many operations as Y in the same time period
				<li>Or X ran the test in half the time as Y
				<li>Or X rendered the test with twice the frame rate of Y
				</ul>
				
				<p>Or in plain language, by choosing a browser with a high Peacekeeper score you are ensuring a faster and smoother web experience within the limits of your internet 
				connection speed.</p>

				
				<h2><a href="javascript:void(0)" onclick="peacekeeper.toggleFAQItem(this)">How were the tests selected and created?</a></h2>
				<p>To create the tests we used a profiler to analyze JavaScript usage while browsing popular websites such as <a href="http://www.youtube.com" target="_blank">YouTube</a>,
				<a href="http://www.facebook.com" target="_blank">Facebook</a>, <a href="http://gmail.google.com/" target="_blank">GMail</a> and 
				<a href="http://www.meebo.com/" target="_blank">Meebo</a>. The profiler collected data on the frequency in which different JavaScript functions were called on these 
				sites and we used this data to create specific weighted tests for each function. In some situations the profiler is not able to collect accurate data and for these, 
				we implemented the tests using common techniques and components to simulate the requirements of a typical webpage.</p>
				
				<h2><a href="javascript:void(0)" onclick="peacekeeper.toggleFAQItem(this)">What does it NOT test?</a></h2>
				<p>Peacekeeper is a JavaScript performance benchmark. It does not test your browser’s other features nor does it measure its security functionality. It does not check 
				for <a href="http://acid3.acidtests.org/" target="_blank">W3C conformity</a>, nor does it test external components such as Flash, though some add-ons may have a negative
				impact on the browsers performance in general. It does not test, nor is the score 
				influenced by, your internet connection speed or latency.</p>

				<h2><a href="javascript:void(0)" onclick="peacekeeper.toggleFAQItem(this)">What are the individual tests?</a></h2>

				<p>
					
				
				<h3>Rendering</h3>
					
				<p>These tests measure your browser's ability to render and modify specific elements used in typical web pages. Rendering tests manipulate the DOM tree in real-time. 
				The tests measure display updating speed (frames per seconds).</p> 
				
				<ul>
					
					<li>renderGrid<br />
					This test renders a grid of square elements and animates the background colors. The test measures the browser's ability to manipulate huge amount of elements.</li>
				
								
					<li>renderPhysics<br />
					This physics test simulates bouncing dandelion florts and their collision physics. The test measures both DOM update speed and mathematical methods.</li>

				</ul>

				<h3>HTML5 - WebGL</h3>
				
				<p>WebGL allows full blown 3D graphics to be rendered in a browser without the need for any external plug-ins. This test uses the <a href="http://code.google.com/p/webgl-mjs/">MJS Matrix/Vector package</a></p>
			
				<ul>
					<li>webglCube<br />
						The test renders a simple transpared 3D cube, inside which are six bumbmapped spheres. The balls bounce within the cube with real (simplified) physics.
						The test is designed to be fairly light on the system - modern desktop computers should be able to run the test at full speed. The performance of the GL
						test is mostly dependant on the graphics and/or the CPU of the system, and less with the browser in question.
				</ul>
				
				<h3>HTML5 - Video</h3>
				
				<p>These tests find out which HTML5 video formats are supposed by your browser. Peacekeeper only checks if your browser is able to play a specific format,
				no other valuation is done. These tests do not affect the overall score and are designed to only show the video capabilities for your browser.</p>
			
				<ul>
					<li>videoVideoSupport</li>
					<li>videoSubtitleSupport</li>
					<li>videoPosterSupport</li>
					<li>videoCodecH264</li>
					<li>videoCodecMP4</li>
					<li>videoCodecTheora</li>
					<li>videoCodecWebM</li>
				</ul>

				<h3>HTML5 - Canvas</h3>
				
				<p>These tests use HTML5 Canvas, which is a web technology for drawing and manipulating graphics without external plug-ins.</p>
			
				<ul>
					<li>experimentalRipple01<br />
					Simulates a 'water ripple' effect by using <a href="http://en.wikipedia.org/wiki/Canvas_(HTML_element)">HTML 5 Canvas</a>. It measures the browser's ability to draw individual pixels.</li>
					
					<li>experimentalRipple02<br />
					Same test as 'experimentalRipple01', but with a larger canvas and thus a heavier workload.</li>
					
				</ul>
				
				<h3>HTML5 - Web Worker</h3>
				
				<p>These tests use HTML5 Web Worker, which allows JavaScript to multhread - ie. the ability to perform multiple actions concurrently.</p>
			
				<h3>HTML5 - Game</h3>
				
				<p>This test simulates a simple 2D, sprite-based game. The test itself is the real game, and what is shown is a recorded play. We use a slightly modified version of <a href="http://craftyjs.com/">Crafy</a> and the game is rendered through DOM, and all collision detections, physics and game logic is calculated as it would be for a real game. The amount of animated sprites increased during the test run to increase the load.</p>

				<ul>
					<li>worker01<br />
					In this test multiple images are processed at the same time. With increasing amounts of images being processed simultaneously, the underlying system and
					the capabilities for the CPU will come into play.
					
				</ul>

				<h3>Data</h3>
				<p>Almost everything you see on a dynamic webpage uses JavaScript arrays. These tests measure your browser's ability to add, remove and modify data stored in an array. 
				The Data suite consists of two tests:</p>
				
				<ul>
					<li>arrayCombined<br />
					This test uses all features of the JavaScript Array object. This is a technical test that is not based on profiled data. The source data are different sized 
					arrays of numbers.</li>
					
					<li>arrayWeighted<br />
					This test is similar to 'arrayCombined', but the load is balanced based on profiled data. The source data is a list of all the countries in the world.</li>
				</ul>

				<h3>DOM operations</h3>
				
				<p>DOM, or Document Object Model, is the standard API JavaScript uses to create dynamic webpages. These tests emulate the methods used to create typical dynamic 
				webpages. The DOM tests are based on development experience and the capabilities of the <a href="http://jquery.com/" target="_blank">jQuery</a> framework.</p>

				<ul>				
					<li>domGetElements<br />
					This test uses native DOM methods getElementById and getElementsByName. Both are widely used to get content from a DOM tree. The elements are not modified.</li>
					
					<li>domDynamicCreationCreateElement<br />
					A common use of DOM is to dynamically create content with JavaScript, for example loading content from a server and injecting it to a page. There are two 
					ways to accomplish this: setting the source as string to DOM's innerHTML-property or creating objects individually and then appending them to DOM.  This test 
					measures the latter.</li> 
					
					<li>domDynamicCreationInnerHTML<br />
					This test is similarl to the previous one, but uses the innerHTML-method.</li> 
					
					<li>domJQueryAttributeFilters<br />
					This test does a DOM query with jQuery. It searches elements with specific attributes.</li>
					
					<li>domJQueryBasicFilters<br />
					This test uses basic filters to query elements from DOM.</li> 
					
					<li>domJQueryBasics<br />
					This test queries elements from DOM with very basic methods. This is similar to domGetElements, but uses jQuery rather than native methods.</li>
					
					<li>domJQueryContentFilters<br />
					Query elements based on content. This does string searching and these methods are assumed to be time consuming.</li>
					
					<li>domJQueryHierarchy<br />
					Query elements based on hierarchy, such as getting sibling, parent or child nodes from a DOM tree.</li>
					
					<li>domQueryselector<br />
					HTML5 brings in teh QuerySelector, which allows JavaScript to search elements from the DOM tree directly without the need to iterate the whole tree through domGetElements 
				</ul>

				<h3>Text parsing</h3>
				<p>These tests measure your browser's performance in typical text manipulations such as using a profanity filter for chats, browser detection and form validation.<p/>

				<ul>
					<li>stringChat<br />
					This test removes swearing from artificial chat messages. Test measures looping and string replace-method.</li>
				
					<li>stringDetectBrowser<br />
					There are differencies between browser behaviour, so browser name and version are often detected. This test uses string indexOf-method to detect browser and operating system.</li>
				
					<li>stringFilter<br />
					This test filters a list of movies with a given keyword. The behaviour is known as filtering select or continuous filter. It's used to give real time suggestions while a user is filling input fields. The test uses simple regular expressions.</li>
				
					<li>stringValidateForm<br />
					Live form validation is a common JavaScript use case. This test uses complex regular expressions to validate user input.</li>
				 
					<li>stringWeighted<br />
					This is an artificial test. Methods used and their intensities are chosen based on profiled data.</li> 
				</ul>			


				<h2><a href="javascript:void(0)" onclick="peacekeeper.toggleFAQItem(this)">How are  the scores calculated?</a></h2>
				<p>The overall score is the geometric mean of the main test scores which in turn are the geometric mean of their respective individual test scores. </p>
				

				<h2><a href="javascript:void(0)" onclick="peacekeeper.toggleFAQItem(this)">What factors affect the score?</a></h2>
				<p>Other than the browser itself, the most significant factor affecting the score is the type of CPU in your Internet device. After that, the power of your graphics chip affects 
				the result somewhat, though mostly in situations where the card is very slow, or no drivers have been installed for it. Running other applications that consume system resources at 
				the same time as the benchmark is running will naturally affect the score. The size of the viewable browser area also affects the score, so the screen resolution you use, the size 
				of the browser window and whether the window is minimized affect the score as well. Beyond these, other factors are usually not significant. Your internet connection speed and network 
				latency do not influence the score in any way.</p>
				
				<a name="whyscan"></a><h2><a href="javascript:void(0)" onclick="peacekeeper.toggleFAQItem(this)">Why do you need to scan my system and what are you looking for?</a></h2>
				<p>Peacekeeper scans your PC hardware details by default in order to link your browser’s performance with your hardware details. The scan is not a requirement (nor is it even available 
				on all platforms) and the performance evaluation is just as accurate without it. However, the scan allows us to provide richer services such as the lists of most popular hardware and 
				browsers for example.</p>

				<p>The system scan itself is the same as used in all Futuremark products, such as 3DMark, PCMark, VirtualMark and the Game-o-Meter. It scans specifically for details of your PC’s 
				hardware: CPU model and speed, graphics card, memory, motherboard information and other components. It does not scan any of your files or installed programs, nor does it collect any 
				personally identifiable information (PII). <a href="http://www.futuremark.com/companyinfo/legal/privacystatement/" target="_blank">Read our privacy policy.</a></p>
			
				<a name="whynoscan"></a><h2><a href="javascript:void(0)" onclick="peacekeeper.toggleFAQItem(this)">What are the system requirements?</a></h2>
				<p>Peacekeeper will work with almost any modern web browser. To use our system scan feature that pairs your performance score 
				with your system hardware details, you need to be running Windows with either Internet Explorer or a browser that has the <a href="http://java.com/" target="_blank">Java-Plug-in</a> 
				installed.</p>
			
				<h2><a href="javascript:void(0)" onclick="peacekeeper.toggleFAQItem(this)">How are the top lists generated?</a></h2>
				<p>These lists are compiled from data collected from the people who use Peacekeeper. Note that since the system scan is only available on Windows systems, the hardware related lists 
				only reflects scores obtained on Windows systems.</p>

				<h2><a href="javascript:void(0)" onclick="peacekeeper.toggleFAQItem(this)">Why are there no Linux/Mac/Other lists of the top scores?</a></h2>
				<p>Currently, our system scan technology only works on Windows PCs. Without knowing the hardware details of a system, the performance score alone is not enough to create a list of 
				top scores. </p>
				
				<h2><a href="javascript:void(0)" onclick="peacekeeper.toggleFAQItem(this)">Where can I get support or give feedback?</a></h2>
				<p>The web is changing all the time and Peacekeeper will too. We want to hear your thoughts on how Peacekeeper could be improved. Peacekeeper has a dedicated
				<a href="http://www.yougamers.com/forum/forumdisplay.php?f=95" target="_blank">discussion board</a> on the Futuremark website where you can tell us your thoughts, get 
				support or leave feedback. For product updates and news of new browsers you 
				can <a href="http://www.twitter.com/fm_peacekeeper" target="_blank">follow @FM_Peacekeeper on Twitter</a>. 
				</p>
				<p>
				For business or press enquiries please email peacekeeper@futuremark.com</p> 
				
			</div></div>
			<div id="faqFooter"></div>
		</div>
		

	</div>
	</body>
</html>


