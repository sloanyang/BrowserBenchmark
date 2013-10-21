BrowserBenchmark
================

Collect famous web benchmarks so that they could be run locally. Currently we support following benchmarks:

<table>
  <th>Category</th><th>Name</th><th>Version</th><th>Metric</th><th>Description</th><th>External Link</th><th>Internal Link</th>
  <tr>
    <td>JS</td>
    <td>SunSpider</td>
    <td>1.0</td>
    <td>ms(-)</td>
    <td>From WebKit to test the core JS language only, and not other browser APIs</td>
    <td>http://www.webkit.org/perf/sunspider-1.0/sunspider-1.0/driver.html</td>
    <td>SunSpider/sunspider-1.0/sunspider-1.0/driver.html</td>
  </tr>
  <tr>
    <td>JS</td>
    <td>SunSpider</td>
    <td>0.9.1</td>
    <td>ms(-)</td>
    <td>From WebKit to test the core JS language only, and not other browser APIs</td>
    <td>http://www.webkit.org/perf/sunspider-0.9.1/sunspider-0.9.1/driver.html</td>
    <td>SunSpider/sunspider-0.9.1/sunspider-0.9.1/driver.html</td>
  </tr>
  <tr>
    <td>JS</td>
    <td>SunSpider</td>
    <td>0.9</td>
    <td>ms(-)</td>
    <td>From WebKit to test the core JS language only, and not other browser APIs</td>
    <td>http://www.webkit.org/perf/sunspider-0.9/sunspider-driver.html</td>
    <td>SunSpider/sunspider-0.9/sunspider-driver.html</td>
  </tr>  
  <tr>
    <td>JS</td>
    <td>V8 Benchmark Suite</td>
    <td>7</td>
    <td>score(+)</td>
    <td>From Google, and often it's target of complains from Mozilla, Opera, etc. Code gets from "svn checkout http://v8.googlecode.com/svn/trunk/ v8".</td>
    <td>http://v8.googlecode.com/svn/data/benchmarks/v7/run.html</td>
    <td>V8-Benchmark-Suite/v7/run.html</td>
  </tr>
  <tr>
    <td>JS</td>
    <td>Octane</td>
    <td>1</td>
    <td>score(+)</td>
    <td>From Google, and its goal is to measure the performance of JavaScript code found in large, real-world web applications. Code gets from "svn checkout http://octane-benchmark.googlecode.com/svn/trunk/ octane-benchmark".</td>
    <td>http://octane-benchmark.googlecode.com/svn/latest/index.html</td>
    <td>Octane/index.html</td>
  </tr>
  <tr>
    <td>JS</td>
    <td>Kraken</td>
    <td>1.1</td>
    <td>ms(-)</td>
    <td>From Mozilla and it should run what users usually run when browsing.</td>
    <td>http://krakenbenchmark.mozilla.org/kraken-1.1/driver.html</td>
    <td>kraken/kraken-1.1/driver.html</td>
  </tr>
  <tr>
    <td>JS</td>
    <td>Dromaeo</td>
    <td>None</td>
    <td>runs/second(+)</td>
    <td>From Mozilla, and it's gradually being replaced by Kraken. As it's still important for the time being, we leave it here.</td>
    <td>http://dromaeo.com/</td>
    <td>dromaeo/index.html</td>
  </tr>
  <tr>
    <td>Canvas 2D</td>
    <td>Speed Reading for mobile</td>
    <td>None</td>
    <td>second(-)</td>
    <td>From Microsoft</td>
    <td>http://ie.microsoft.com/testdrive/mobile/Performance/SpeedReading/Default.html</td>
    <td>microsoft/testdrive/mobile/Performance/SpeedReading/Default.html</td>
  </tr>
  <tr>
    <td>Canvas 2D</td>
    <td>Speed Reading for desktop</td>
    <td>None</td>
    <td>second(-)</td>
    <td>From Microsoft</td>
    <td>http://ie.microsoft.com/testdrive/Performance/SpeedReading/Default.html</td>
    <td>microsoft/testdrive/Performance/SpeedReading/index.html</td>
  </tr>
  <tr>
    <td>Canvas 2D</td>
    <td>Galactic for mobile</td>
    <td>None</td>
    <td>FPS(+)</td>
    <td>From Microsoft</td>
    <td>http://ie.microsoft.com/testdrive/mobile/Performance/Galactic/Default.html</td>
    <td>microsoft/testdrive/mobile/Performance/Galactic/index.html</td>
  </tr>
  <tr>
    <td>Canvas 2D</td>
    <td>Galactic for desktop</td>
    <td>None</td>
    <td>FPS(+)</td>
    <td>From Microsoft</td>
    <td>http://ie.microsoft.com/testdrive/Performance/Galactic/Default.html</td>
    <td>microsoft/testdrive/Performance/Galactic/Default.html</td>
  </tr>
  <tr>
    <td>Canvas 2D</td>
    <td>GUIMark 3 Bitmap</td>
    <td>None</td>
    <td>FPS(+)</td>
    <td>From Craftymind</td>
    <td>http://www.craftymind.com/factory/guimark3/bitmap/GM3_JS_Bitmap.html</td>
    <td>GUIMark3/bitmap/GM3_JS_Bitmap.html</td>
  </tr>
  <tr>
    <td>Canvas 2D</td>
    <td>GUIMark 3 Bitmap cache</td>
    <td>None</td>
    <td>FPS(+)</td>
    <td>From Craftymind</td>
    <td>http://www.craftymind.com/factory/guimark3/bitmap/GM3_JS_Bitmap_cache.html</td>
    <td>GUIMark3/bitmap/GM3_JS_Bitmap_cache.html</td>
  </tr>
  <tr>
    <td>Canvas 2D</td>
    <td>GUIMark 3 Vector</td>
    <td>None</td>
    <td>FPS(+)</td>
    <td>From Craftmind</td>
    <td>http://www.craftymind.com/factory/guimark3/vector/GM3_JS_Vector.html</td>
    <td>GUIMark3/vector/GM3_JS_Vector.html</td>
  </tr>
  <tr>
    <td>Canvas 2D</td>
    <td>FishIE Tank for mobile</td>
    <td>None</td>
    <td>FPS(+)</td>
    <td>From Microsoft</td>
    <td>http://ie.microsoft.com/testdrive/mobile/Performance/FishIETank/Default.html</td>
    <td>microsoft/testdrive/mobile/Performance/FishIETank/Default.html</td>
  </tr>
  <tr>
    <td>Canvas 2D</td>
    <td>FishIE Tank for desktop</td>
    <td>None</td>
    <td>FPS(+)</td>
    <td>From Microsoft</td>
    <td>http://ie.microsoft.com/testdrive/Performance/FishIETank/Default.html</td>
    <td>microsoft/testdrive/Performance/FishIETank/Default.html</td>
  </tr>
  <tr>
    <td>Canvas 2D</td>
    <td>Canvas Performance Benchmark</td>
    <td>None</td>
    <td>Score(+)</td>
    <td>From MindCat</td>
    <td>http://flashcanvas.net/examples/dl.dropbox.com/u/1865210/mindcat/canvas_perf.html</td>
    <td>canvas-perf/index.html</td>
  </tr>  
  <tr>
    <td>Comprehensive</td>
    <td>Peacekeeper</td>
    <td>2.0</td>
    <td>Score(+)</td>
    <td>Benchmark from Futuremark that is anatomised by ourself</td>
    <td>http://peacekeeper.futuremark.com/run.action</td>
    <td>Peacekeeper/anatomy/run.html</td>
  </tr>
  <tr>
    <td>Comprehensive</td>
    <td>Peacekeeper</td>
    <td>2.0</td>
    <td>Score(+)</td>
    <td>Benchmark from Futuremark, which needs to set up a server for it.</td>
    <td>http://peacekeeper.futuremark.com/run.action</td>
    <td>Peacekeeper/peacekeeper2/index.html</td>
  </tr>  
  <tr>
    <td>Comprehensive</td>
    <td>Browsermark</td>
    <td>2.0</td>
    <td>Score(+)</td>
    <td>From Rightware</td>
    <td>http://browsermark.rightware.com/tests</td>
    <td>browsermark2.0/index.html</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>



