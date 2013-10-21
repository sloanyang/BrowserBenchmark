/*
 * Copyright (C) 2010 MindCat. All Rights Reserved.
 *
 * http://d.hatena.ne.jp/mindcat/
 */


var perfdefs =
  [
    [ "hline",                 1000,  30 ],
    [ "vline",                 1000,  15 ],
    [ "line",                  1000,   6 ],
    [ "rect",                  1000,   5 ],
    [ "fill_rect",              500,   5 ],
    [ "lines",                 1000,   8 ],
    [ "arc",                   1000,   4 ],
    [ "fill_arc",              1000,   7 ],
    [ "bezier",                1000,   3 ],
    [ "fill_bezier",           1000,   4 ],
    [ "quad",                  1000,   4 ],
    [ "curves",                  50,   5 ],
    [ "fill_curves",             50,   8 ],
    [ "stroke_star",           1000,   7 ],
    [ "fill_star",             1000,  12 ],
    [ "transform",               10,   0.2 ],
    [ "image",                  100,   0.3 ],
    [ "image_scale",            100,   0.8 ],
    [ "image_rotate",            15,   0.3 ],
    [ "linear_gradient",        100,   2 ],
    [ "radial_gradient",        100,   0.3 ],
    [ "text",                   100,   0.6 ],
    [ "clip",                   100,   0.8 ]
   ];


function canvas_perf () {
  var cvs = document.getElementById("cvs");
  var gfx = cvs.getContext("2d");
  var WIDTH = parseInt(cvs.width);
  var HEIGHT = parseInt(cvs.height);
  var ALPHA = 0.5;
  var counter = 0;
  var alpha = false;
  var curr_perf_func;
  var curr_perf_times;
  var test_num = 0;
  var start_time = 0;
  var perfTimer = null;
  var drawTimer = null;
  var image_png01 = null;
  var image_png02 = null;
  var image_jpg01 = null;
  var image_jpg02 = null;
  var result = {};

  function getGraphics() {
    return gfx;
  }

  function count() {
    counter++;
  }

  function getColor(a) {
    return util.getHSBColor(Math.random(), 1, 1, a ? ALPHA : false);
  }

  function getCounterColor(a) {
    return util.getHSBColor((counter % 10000) / 10000.0, 1, 1,
                            a ? ALPHA : false);
  }

  function getImage01(a) {
    return a ? image_png01 : image_jpg01;
  }

  function getImage02(a) {
    return a ? image_png02 : image_jpg02;
  }

  var star_xpoints = [
    10000, 12245, 19511, 13633, 15878, 10000, 4122, 6367, 489, 7755
  ];
  var star_ypoints = [
    0, 6910, 6910, 11180, 18090, 13820, 18090, 11180, 6910, 6910
  ];

  function make_star(g) {
    g.moveTo(star_xpoints[0], star_ypoints[0]);
    for (var i = 1, n = star_xpoints.length; i < n; i++) {
      g.lineTo(star_xpoints[i], star_ypoints[i]);
    }
    g.closePath();
  }

  function setup() {
    set_images();
    var cvs = document.getElementById("cvs");
    var g = cvs.getContext("2d");
    try {
      splash(g);
    } catch (ex) {
      log.print("onload:>>> ex=" + ex);
    }
    var elem = document.getElementById("alpha");
    elem.onchange = function (evt) {
      alpha = evt.target.checked;
    };
  }

  function start() {
    log.print("Start perfomance test");
    test_num = -1;
    alpha = document.getElementById("alpha").checked;
    result = {};
    nextTest();
  }

  function stop() {
    if (perfTimer) {
      var g = getGraphics();
      g.restore();
      clearTimeout(perfTimer);
      perfTimer = null;
    }
    if (drawTimer) {
      clearInterval(drawTimer);
      drawTimer = null;
    }
  }

  function splash(g) {
    var w = WIDTH;
    var h = HEIGHT;
    var s = Math.min(w, h);
    var x = (w - s) / 2;
    var y = (h - s) / 2;
    for (var i = 0; i < s; i++) {
      var rw = s - i * 2;
      if (rw < 0) break;
      g.strokeStyle = "lime";
      g.strokeRect(x + i, y + i, x + rw, y + rw);
      i++;
      rw = s - i * 2;
      g.strokeStyle = "blue";
      g.beginPath();
      g.moveTo(x + i,      y + i);
      g.lineTo(x + i + rw, y + i);
      g.lineTo(x + i + rw, y + i + rw);
      g.lineTo(x + i,      y + i + rw);
      g.closePath();
      g.stroke();
    }
    var txt = "Canvas Performance Test";
    g.beginPath();
    g.fillStyle = "yellow";
    g.font = "Bold 30pt Serif";
    g.fillText(txt, 10, h/2 + 10);
  }

  function set_images() {
    var cnt = 4;
    if (!image_png01) {
      image_png01 = new Image;
      image_png01.onload = function () {
        if (--cnt == 0) {
          log.print("Ready!!");
        }
      };
      image_png01.src = "mandel.png";
    }
    if (!image_jpg01) {
      image_jpg01 = new Image;
      image_jpg01.onload = function () {
        if (--cnt == 0) {
          log.print("Ready!!");
        }
      };
      image_jpg01.src = "mandel.jpg";
    }
    if (!image_png02) {
      image_png02 = new Image;
      image_png02.onload = function () {
        if (--cnt == 0) {
          log.print("Ready!!");
        }
      };
      image_png02.src = "mandel.png";
    }
    if (!image_jpg02) {
      image_jpg02 = new Image;
      image_jpg02.onload = function () {
        if (--cnt == 0) {
          log.print("Ready!!");
        }
      };
      image_jpg02.src = "mandel.jpg";
    }
  }

  var CanvasPerfTest = {
    empty: function (N, a) {
      for (var i = 0; i < N; i++) {
        count();
      }
    },
    hline: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var g = getGraphics();
      for (var i = 0; i < N; i++) {
        var x1 = Math.random() * w;
        var x2 = Math.random() * w;
        var y  = Math.random() * h;
        g.beginPath();
        g.strokeStyle = getColor(a);
        g.moveTo(x1, y);
        g.lineTo(x2, y);
        g.stroke();
        count();
      }
    },
    vline: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var g = getGraphics();
      for (var i = 0; i < N; i++) {
        var x  = Math.random() * w;
        var y1 = Math.random() * h;
        var y2 = Math.random() * h;
        g.beginPath();
        g.strokeStyle = getColor(a);
        g.moveTo(x, y1);
        g.lineTo(x, y2);
        g.stroke();
        count();
      }
    },
    line: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var g = getGraphics();
      for (var i = 0; i < N; i++) {
        var x1 = Math.random() * w;
        var x2 = Math.random() * w;
        var y1 = Math.random() * h;
        var y2 = Math.random() * h;
        g.beginPath();
        g.strokeStyle = getColor(a);
        g.moveTo(x1, y1);
        g.lineTo(x2, y2);
        g.stroke();
        count();
      }
    },
    rect: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var g = getGraphics();
      for (var i = 0; i < N; i++) {
        var x1 = Math.random() * w;
        var x2 = Math.random() * w;
        var y1 = Math.random() * h;
        var y2 = Math.random() * h;
        g.beginPath();
        g.strokeStyle = getColor(a);
        g.strokeRect(Math.min(x1, x2), Math.min(y1, y2),
                     Math.abs(x2 - x1), Math.abs(y2 - y1));
        count();
      }
    },
    fill_rect: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var g = getGraphics();
      for (var i = 0; i < N; i++) {
        var x1 = Math.random() * w;
        var x2 = Math.random() * w;
        var y1 = Math.random() * h;
        var y2 = Math.random() * h;
        var x = Math.min(x1, x2);
        var y = Math.min(y1, y2);
        g.beginPath();
        g.fillStyle = getColor(a);
        g.fillRect(Math.min(x1, x2),  Math.min(y1, y2),
                   Math.abs(x2 - x1), Math.abs(y2 - y1));
        count();
      }
    },
    lines: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var g = getGraphics();
      var x = Math.random() * w;
      var y = Math.random() * h;
      g.beginPath();
      g.strokeStyle = getColor(a);
      g.moveTo(x, y);
      for (var i = 0; i < N; i++) {
        x = Math.random() * w;
        y = Math.random() * h;
        g.lineTo(x, y);
        count();
      }
      g.stroke();
    },
    arc: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var pi2 = Math.PI * 2;
      var g = getGraphics();
      for (var i = 0; i < N; i++) {
        var x = Math.random() * w;
        var y = Math.random() * h;
        var r = Math.random() * Math.min(Math.min(x, w - x),
                                         Math.min(y, h - y));
        g.beginPath();
        g.strokeStyle = getColor(a);
        g.arc(x, y, r, 0, pi2, true);
        g.stroke();
        count();
      }
    },
    fill_arc: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var pi2 = Math.PI * 2;
      var g = getGraphics();
      for (var i = 0; i < N; i++) {
        var x = Math.random() * w;
        var y = Math.random() * h;
        var r = Math.random() * Math.min(Math.min(x, w - x),
                                         Math.min(y, h - y));
        g.beginPath();
        g.fillStyle = getColor(a);
        g.arc(x, y, r, 0, pi2, true);
        g.fill();
        count();
      }
    },
    bezier: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var g = getGraphics();
      for (var i = 0; i < N; i++) {
        var x0 = Math.random() * w;
        var x1 = Math.random() * w;
        var x2 = Math.random() * w;
        var x3 = Math.random() * w;
        var y0 = Math.random() * h;
        var y1 = Math.random() * h;
        var y2 = Math.random() * h;
        var y3 = Math.random() * h;
        g.beginPath();
        g.strokeStyle = getColor(a);
        g.moveTo(x0, y0);
        g.bezierCurveTo(x1, y1, x2, y2, x3, y3);
        g.stroke();
        count();
      }
    },
    fill_bezier: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var g = getGraphics();
      /*
       *   x0----xm----x1
       *
       *   x3----xn----x2
       */
      for (var i = 0; i < N; i++) {
        var x0 = Math.random() * w;
        var x1 = Math.random() * w;
        var x2 = Math.random() * w;
        var x3 = Math.random() * w;
        var y0 = Math.random() * h;
        var y1 = Math.random() * h;
        var y2 = Math.random() * h;
        var y3 = Math.random() * h;
        var xm = (x0 + x1) / 2;
        var ym = (y0 + y1) / 2;
        var xn = (x2 + x3) / 2;
        var yn = (y2 + y3) / 2;
        g.beginPath();
        g.fillStyle = getColor(a);
        g.moveTo(xm, ym);
        g.bezierCurveTo(x1, y1, x2, y2, xn, yn);
        g.bezierCurveTo(x3, y3, x0, y0, xm, ym);
        g.closePath();
        g.fill();
        count();
      }
    },
    quad: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var g = getGraphics();
      for (var i = 0; i < N; i++) {
        var x0 = Math.random() * w;
        var x1 = Math.random() * w;
        var x2 = Math.random() * w;
        var y0 = Math.random() * h;
        var y1 = Math.random() * h;
        var y2 = Math.random() * h;
        g.beginPath();
        g.strokeStyle = getColor(a);
        g.moveTo(x0, y0);
        g.quadraticCurveTo(x1, y1, x2, y2);
        g.stroke();
        count();
      }
    },
    delta: 0,
    curves: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var cp = w / 2; // center point
      var rr = w / 2;
      var pi2 = Math.PI * 2;
      var nn = 32;    // must be even
      var step = pi2 / nn;
      var g = getGraphics();
      var delta = this.delta;
      for (var i = 0; i < N; i++) {
        var angle = delta;
        var x = cp + rr * Math.cos(angle);
        var y = cp + rr * Math.sin(angle);
        g.beginPath();
        g.strokeStyle = getColor(a);
        g.moveTo(x, y);
        for (var j = 1; j < nn; j += 2) {
          angle = j * step + delta;
          var r = rr * Math.random() / 8;
          x = cp + r * Math.cos(angle);
          y = cp + r * Math.sin(angle);
          angle = (j + 1) * step + delta;
          var x2 = cp + rr * Math.cos(angle);
          var y2 = cp + rr * Math.sin(angle);
          g.quadraticCurveTo(x, y, x2, y2);
          count();
        }
        g.stroke();
      }
      this.delta += 0.05;
    },
    fill_curves: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var cp = w / 2; // center point
      var rr = w / 2;
      var pi2 = Math.PI * 2;
      var nn = 32;    // must be even
      var step = pi2 / nn;
      var g = getGraphics();
      var delta = this.delta;
      for (var i = 0; i < N; i++) {
        var angle = delta;
        var x = cp + rr * Math.cos(angle);
        var y = cp + rr * Math.sin(angle);
        g.beginPath();
        g.fillStyle = getColor(a);
        g.moveTo(x, y);
        for (var j = 1; j < nn; j += 2) {
          angle = j * step + delta;
          var r = rr * Math.random() / 8;
          x = cp + r * Math.cos(angle);
          y = cp + r * Math.sin(angle);
          angle = (j + 1) * step + delta;
          var x2 = cp + rr * Math.cos(angle);
          var y2 = cp + rr * Math.sin(angle);
          g.quadraticCurveTo(x, y, x2, y2);
          count();
        }
        g.fill();
      }
      this.delta += 0.05;
    },
    stroke_star: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var g = getGraphics();
      g.strokeStyle = getCounterColor(a);
      g.lineWidth = 500;
      for (var j = 0; j < h; j += 40) {
        for (var i = 0; i < w; i += 40) {
          g.beginPath();
          g.save();
          g.translate(i, j);
          g.rotate(counter / 2000.0);
          g.scale(0.002, 0.002);
          make_star(g);
          g.stroke();
          g.restore();
          count();
        }
      }
    },
    fill_star: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var g = getGraphics();
      g.fillStyle = getCounterColor(a);
      for (var j = 0; j < h; j += 40) {
        for (var i = 0; i < w; i += 40) {
          g.beginPath();
          g.save();
          g.translate(i, j);
          g.rotate(counter / 2000.0);
          g.scale(0.002, 0.002);
          make_star(g);
          g.fill();
          g.restore();
          count();
        }
      }
    },
    transform: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var g = getGraphics();
      for (var nn = 0; nn < N; nn++) {
        g.strokeStyle = getColor(a);
        for (var i = 0; i < w; i += 50) {
          g.beginPath();
          g.moveTo(i, 0);
          g.lineTo(i, h);
          g.stroke();
        }
        for (var j = 0; j < h; j += 50) {
          g.beginPath();
          g.moveTo(0, j);
          g.lineTo(w, j);
          g.stroke();
        }
        g.beginPath();
        g.translate(w/2, h/2);
        g.rotate(0.02);
        g.scale(1.004, 0.996);
        g.translate(-w/2, -h/2);
        g.stroke();
        count();
      }
    },
    image: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var img = getImage01(a);
      var iw = img.width;
      var ih = img.height;
      var pw = w - iw;
      var ph = h - ih;
      var g = getGraphics();
      for (var i = 0; i < N; i++) {
        var x = Math.random() * pw;
        var y = Math.random() * ph;
        g.beginPath();
        g.drawImage(img, x, y);
        count();
      }
    },
    image_scale: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var img = getImage01(a);
      var g = getGraphics();
      for (var i = 0; i < N; i++) {
        var x1 = Math.random() * w;
        var x2 = Math.random() * w;
        var y1 = Math.random() * h;
        var y2 = Math.random() * h;
        g.beginPath();
        g.drawImage(img,
                    Math.min(x1, x2),  Math.min(y1, y2),
                    Math.abs(x2 - x1), Math.abs(y2 - y1));
        count();
      }
    },
    image_rotate: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var img = getImage02(a);
      var iw = img.width;
      var ih = img.height;
      var pw = w - iw;
      var ph = h - ih;
      var g = getGraphics();
      for (var i = 0; i < N; i++) {
        g.beginPath();
        g.save();
        g.translate(w/2, h/2);
        g.rotate(counter / 50.0);
        g.translate(-iw/2, -ih/2);
        g.drawImage(img, 0, 0);
        g.restore();
        count();
      }
    },
    linear_gradient: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var STOPS = 10;
      var g = getGraphics();
      var brush = g.createLinearGradient(0, 0, 100, 100);
      for (var i = 0; i < STOPS; i++) {
        var r = i / (STOPS - 1);
        var c = util.getHSBColor(r, 1, 1, a ? ALPHA : false);
        brush.addColorStop(r, c);
      }
      for (var i = 0; i < N; i++) {
        var x1 = Math.random() * w;
        var x2 = Math.random() * w;
        var y1 = Math.random() * h;
        var y2 = Math.random() * h;
        var xx = Math.min(x1, x2);
        var yy = Math.min(y1, y2);
        var ww = Math.abs(x2 - x1);
        var hh = Math.abs(y2 - y1);
        g.beginPath();
        g.save();
        g.transform(ww/100, 0, 0, hh/100, xx, yy);
        g.fillStyle = brush;
        g.rect(0, 0, 100, 100);
        g.fill();
        g.restore();
        count();
      }
    },
    radial_gradient: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var STOPS = 10;
      var g = getGraphics();
      var brush = g.createRadialGradient(20, 20, 20, 50, 50, 70);
      for (var i = 0; i < STOPS; i++) {
        var r = i / (STOPS - 1);
        var c = util.getHSBColor(r, 1, 1, a ? ALPHA : false);
        brush.addColorStop(r, c);
      }
      for (var i = 0; i < N; i++) {
        var x1 = Math.random() * w;
        var x2 = Math.random() * w;
        var y1 = Math.random() * h;
        var y2 = Math.random() * h;
        var xx = Math.min(x1, x2);
        var yy = Math.min(y1, y2);
        var ww = Math.abs(x2 - x1);
        var hh = Math.abs(y2 - y1);
        g.beginPath();
        g.save();
        g.transform(ww/100, 0, 0, hh/100, xx, yy);
        g.fillStyle = brush;
        g.rect(0, 0, 100, 100);
        g.fill();
        g.restore();
        count();
      }
    },
    text: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var txt = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var g = getGraphics();
      var tw = g.measureText(txt).width;
      var off = Math.abs(w - tw) / 2;
      for (var i = 0; i < N; i++) {
        var x = off + Math.random() * (w - tw);
        var y = Math.random() * h;
        g.save();
        g.font = "Bold 20pt Serif";
        g.fillStyle = getColor(a);
        g.fillText(txt, x, y);
        g.restore();
        count();
      }
    },
    clip: function (N, a) {
      var w = WIDTH;
      var h = HEIGHT;
      var g = getGraphics();
      var img = getImage02(a);
      g.beginPath();
      g.save();
      var sc = w / 20000;
      g.translate(0, 20);
      g.scale(sc, sc);
      make_star(g);
      g.restore();
      g.clip();
      for (var i = 0; i < N; i++) {
        var x1 = Math.random() * w;
        var x2 = Math.random() * w;
        var y1 = Math.random() * h;
        var y2 = Math.random() * h;
        g.drawImage(img, x1, y1);
        g.beginPath();
        g.lineWidth = 10;
        g.strokeStyle = getColor(a);
        g.moveTo(x1, y1);
        g.lineTo(x2, y2);
        g.stroke();
        count();
      }
    }
  };

  function clear() {
    var g = getGraphics();
    g.fillStyle = "black";
    g.fillRect(0, 0, WIDTH, HEIGHT);
  }

  function setTestNumber(num) {
    clear();
    counter = 0;
    test_num = num;
    var pf = perfdefs[num];
    if (pf) {
      curr_perf_func = CanvasPerfTest[pf[0]];
      curr_perf_times = pf[1];
      start_time = (new Date).getTime();
      return true;
    } else {
      return false;
    }
  }

  function nextTest() {
    if (perfTimer) {
      clearTimeout(perfTimer);
      perfTimer = null;
    }
    if (drawTimer) {
      clearInterval(drawTimer);
      drawTimer = null;
    }
    var g = getGraphics();
    g.save();
    if (setTestNumber(test_num + 1)) {
      perfTimer = setTimeout(function () {
        g.restore();
        perfDone();
        nextTest();
      }, 3000);
      drawTimer = setInterval(function () {
        curr_perf_func.call(CanvasPerfTest, curr_perf_times, alpha);
      }, 1);
    } else {
      showScore();
    }
  }

  function perfDone() {
    var now = (new Date).getTime();
    var item = perfdefs[test_num][0];
    var value = counter / (now - start_time);
    var ratio = value / perfdefs[test_num][2];
    var msg = item + ": " + value.toPrecision(3) + " (" + ratio.toPrecision(3) + ")";
    result[item] = { value: value, ratio: ratio };
    log.print(msg);
  }

  function showScore() {
    var g = getGraphics();
    var x = 20;
    var y = 10;
    var total = 0;
    try {
      g.save();
      g.beginPath();
      g.fillStyle = "yellow";
      g.font = "bold 16px sans-serif";
      g.textBaseline = "top";
      for (var i = 0, n = perfdefs.length; i < n; i++) {
        var item = perfdefs[i][0];
        var s = result[item];
        total += 1 / s.ratio;
        g.fillText(item + ": " + s.ratio.toPrecision(3), x, y);
        y += 16;
      }
      var score = (n / total).toPrecision(3);
      y += 10;
      g.fillStyle = "red";
      g.font = "bold 24px sans-serif";
      g.fillText("Score: " + score, x, y);
      log.print("Total Score: " + score);
    } finally {
      g.restore();
    }
  }

  setup();
  
  return {
    start: start,
    stop: stop
  };
}
