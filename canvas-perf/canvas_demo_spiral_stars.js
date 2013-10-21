/*
 * Copyright (C) 2010 MindCat. All Rights Reserved.
 *
 * http://d.hatena.ne.jp/mindcat/
 */


function canvas_demo_spiral_stars() {
  var cvs = document.getElementById("cvs");
  var gfx = cvs.getContext("2d");
  var WIDTH = parseInt(cvs.width);
  var HEIGHT = parseInt(cvs.height);
  var NUM = 300; // number of stars
  var stars = [];
  var timer;
  var begin;
  var count;

  function start() {
    if (!timer) {
      log.print("Start demo");
      count = 0;
      begin = (new Date).getTime();
      timer = setInterval(function () {
        draw()
        if (count++ >= 100) {
          var now = (new Date).getTime();
          log.print((count * 1000 / (now - begin)).toPrecision(3) + "fps");
          begin = now;
          count = 0;
        }
      }, 5);
    }
  }

  function stop() {
    if (timer) {
      log.print("Stop");
      clearInterval(timer);
      timer = null;
    }
  }
  
  function clear() {
    gfx.fillStyle = "black";
    gfx.fillRect(0, 0, WIDTH, HEIGHT);
  }
  
  function getColor(a) {
    return util.getHSBColor(Math.random(), 1, 1, (a == 0) ? 1.0 : 0.5);
  }

  function Star() {
    var w = WIDTH;
    var h = HEIGHT;
    var g = gfx;
    var cx = w / 2;
    var cy = h / 2;

    function setProp(size, color) {
      this.size = size;
      this.color = color;
      var brush = g.createRadialGradient(0, 0, 0,
                                         0, 0, size*2);
      brush.addColorStop(0, color);
      brush.addColorStop(0.5, "rgba(0,0,0,0)");
      this.brush = brush;
    }
    function setLoc(dist, angle) {
      this.dist = dist;
      this.angle = angle;
    }
    function draw(da, dd) {
      var x = cx + this.dist * Math.cos(this.angle);
      var y = cy + this.dist * Math.sin(this.angle);
      g.beginPath();
      g.fillStyle = this.brush;
      g.save();
      g.translate(x, y);
      g.arc(0, 0, this.size, this.size, 0, 2 * Math.PI, 0);
      g.fill();
      g.restore();
      this.angle += da;
      this.dist -= dd;
      if (this.dist < 0) {
        this.dist = cx;
      }
    }
    
    return {
      setProp: setProp,
      setLoc: setLoc,
      draw: draw
    };
  }
  
  function init() {
    for (var i = 0; i < NUM; i++) {
      var s = new Star;
      s.setProp(20, util.getHSBColor(i / NUM, 1.0, 1.0));
      s.setLoc(WIDTH * i / NUM / 2, 0.0);
      stars.push(s);
    }
  }

  function draw() {
    var cx = WIDTH / 2;
    var cy = HEIGHT / 2;
    clear();
    for (var i = 0; i < NUM; i++) {
      stars[i].draw(i / NUM / 2, 1);
    }
  }

  init();
  
  return {
    start: start,
    stop: stop
  };
}

