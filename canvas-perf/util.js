/*
 *
 */

var log = {
  print: function (msg) {
    var out = document.getElementById("output");
    var txt = out.firstChild;
    txt.appendData(msg);
    txt.appendData("\r\n");
  },
  clear: function () {
    var out = document.getElementById("output");
    var txt = out.firstChild;
    txt.deleteData(0, txt.length);
  }
};

var util = {

  copy: function (dst, src, props) {
    for (var i = 0; i < props.length; i++) {
      var p = props[i];
      dst[p] = src[p];
    }
  },
  
  hex: function (x) {
    var v = x.toString(16);
    if (x < 16) {
      return "0" + v;
    } else {
      return v;
    }
  },

  getHSBColor: function (hue, sat, brt, alpha) {
    var r = 0, g = 0, b = 0;
    if (sat == 0) {
      r = g = b = Math.round(brt * 255);
    } else {
      var h = (hue - Math.floor(hue)) * 6;
      var f = h - Math.floor(h);
      var v = Math.round(255 * brt);
      var p = Math.round(255 * brt * (1 - sat));
      var q = Math.round(255 * brt * (1 - sat * f));
      var t = Math.round(255 * brt * (1 - (sat * (1 - f))));
      
      switch (Math.floor(h)) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
      }
    }
    if (!alpha) {
      return "#" + util.hex(r) + util.hex(g) + util.hex(b);
    } else {
      return [
        "rgba(",
        String(r), ",",
        String(g), ",",
        String(b), ",",
        String(alpha),
        ")"
      ].join("");
    }
  }
};