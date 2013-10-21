// Three.js r23 - http://github.com/mrdoob/three.js
var THREE=THREE||{};THREE.Color=function(a){this.autoUpdate=true;this.setHex(a)};THREE.Color.prototype={setRGBA:function(f,e,c,d){this.r=f;this.g=e;this.b=c;this.a=d;if(this.autoUpdate){this.updateHex();this.updateStyleString()}},setHex:function(a){this.hex=a;if(this.autoUpdate){this.updateRGBA();this.updateStyleString()}},copyRGB:function(a){this.r=a.r;this.g=a.g;this.b=a.b},copyRGBA:function(a){this.r=a.r;this.g=a.g;this.b=a.b;this.a=a.a},multiplySelfRGB:function(a){this.r*=a.r;this.g*=a.g;this.b*=a.b},updateHex:function(){this.hex=Math.floor(this.a*255)<<24|Math.floor(this.r*255)<<16|Math.floor(this.g*255)<<8|Math.floor(this.b*255)},updateRGBA:function(){this.a=(this.hex>>24&255)/255;this.r=(this.hex>>16&255)/255;this.g=(this.hex>>8&255)/255;this.b=(this.hex&255)/255},updateStyleString:function(){this.__styleString="rgba("+Math.floor(this.r*255)+","+Math.floor(this.g*255)+","+Math.floor(this.b*255)+","+this.a+")"},toString:function(){return"THREE.Color ( r: "+this.r+", g: "+this.g+", b: "+this.b+", a: "+this.a+", hex: "+this.hex+" )"}};THREE.Vector2=function(a,b){this.x=a||0;this.y=b||0};THREE.Vector2.prototype={set:function(a,b){this.x=a;this.y=b;return this},copy:function(a){this.x=a.x;this.y=a.y;return this},addSelf:function(a){this.x+=a.x;this.y+=a.y;return this},add:function(b,a){this.x=b.x+a.x;this.y=b.y+a.y;return this},subSelf:function(a){this.x-=a.x;this.y-=a.y;return this},sub:function(b,a){this.x=b.x-a.x;this.y=b.y-a.y;return this},multiplyScalar:function(a){this.x*=a;this.y*=a;return this},unit:function(){this.multiplyScalar(1/this.length());return this},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},lengthSq:function(){return this.x*this.x+this.y*this.y},negate:function(){this.x=-this.x;this.y=-this.y;return this},clone:function(){return new THREE.Vector2(this.x,this.y)},toString:function(){return"THREE.Vector2 ("+this.x+", "+this.y+")"}};THREE.Vector3=function(a,c,b){this.x=a||0;this.y=c||0;this.z=b||0};THREE.Vector3.prototype={set:function(a,c,b){this.x=a;this.y=c;this.z=b;return this},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;return this},add:function(b,a){this.x=b.x+a.x;this.y=b.y+a.y;this.z=b.z+a.z;return this},addSelf:function(a){this.x+=a.x;this.y+=a.y;this.z+=a.z;return this},addScalar:function(a){this.x+=a;this.y+=a;this.z+=a;return this},sub:function(b,a){this.x=b.x-a.x;this.y=b.y-a.y;this.z=b.z-a.z;return this},subSelf:function(a){this.x-=a.x;this.y-=a.y;this.z-=a.z;return this},cross:function(b,a){this.x=b.y*a.z-b.z*a.y;this.y=b.z*a.x-b.x*a.z;this.z=b.x*a.y-b.y*a.x;return this},crossSelf:function(c){var b=this.x,a=this.y,d=this.z;this.x=a*c.z-d*c.y;this.y=d*c.x-b*c.z;this.z=b*c.y-a*c.x;return this},multiplySelf:function(a){this.x*=a.x;this.y*=a.y;this.z*=a.z;return this},multiplyScalar:function(a){this.x*=a;this.y*=a;this.z*=a;return this},divideScalar:function(a){this.x/=a;this.y/=a;this.z/=a;return this},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},distanceToSquared:function(d){var c=this.x-d.x,b=this.y-d.y,a=this.z-d.z;return c*c+b*b+a*a},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z},negate:function(){this.x=-this.x;this.y=-this.y;this.z=-this.z;return this},normalize:function(){if(this.length()>0){this.multiplyScalar(1/this.length())}else{this.multiplyScalar(0)}return this},setLength:function(a){return this.normalize().multiplyScalar(a)},isZero:function(){var a=0.0001;return(Math.abs(this.x)<a)&&(Math.abs(this.y)<a)&&(Math.abs(this.z)<a)},clone:function(){return new THREE.Vector3(this.x,this.y,this.z)},toString:function(){return"THREE.Vector3 ( "+this.x+", "+this.y+", "+this.z+" )"}};THREE.Vector4=function(a,d,c,b){this.x=a||0;this.y=d||0;this.z=c||0;this.w=b||1};THREE.Vector4.prototype={set:function(a,d,c,b){this.x=a;this.y=d;this.z=c;this.w=b;return this},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;this.w=a.w;return this},add:function(b,a){this.x=b.x+a.x;this.y=b.y+a.y;this.z=b.z+a.z;this.w=b.w+a.w;return this},addSelf:function(a){this.x+=a.x;this.y+=a.y;this.z+=a.z;this.w+=a.w;return this},sub:function(b,a){this.x=b.x-a.x;this.y=b.y-a.y;this.z=b.z-a.z;this.w=b.w-a.w;return this},subSelf:function(a){this.x-=a.x;this.y-=a.y;this.z-=a.z;this.w-=a.w;return this},clone:function(){return new THREE.Vector4(this.x,this.y,this.z,this.w)},toString:function(){return"THREE.Vector4 ("+this.x+", "+this.y+", "+this.z+", "+this.w+")"}};THREE.Rectangle=function(){var f,h,d,g,a,c,e=true;function b(){a=d-f;c=g-h}this.getX=function(){return f};this.getY=function(){return h};this.getWidth=function(){return a};this.getHeight=function(){return c};this.getX1=function(){return f};this.getY1=function(){return h};this.getX2=function(){return d};this.getY2=function(){return g};this.set=function(j,m,i,k){e=false;f=j;h=m;d=i;g=k;b()};this.addPoint=function(i,j){if(e){e=false;f=i;h=j;d=i;g=j}else{f=Math.min(f,i);h=Math.min(h,j);d=Math.max(d,i);g=Math.max(g,j)}b()};this.addRectangle=function(i){if(e){e=false;f=i.getX1();h=i.getY1();d=i.getX2();g=i.getY2()}else{f=Math.min(f,i.getX1());h=Math.min(h,i.getY1());d=Math.max(d,i.getX2());g=Math.max(g,i.getY2())}b()};this.inflate=function(i){f-=i;h-=i;d+=i;g+=i;b()};this.minSelf=function(i){f=Math.max(f,i.getX1());h=Math.max(h,i.getY1());d=Math.min(d,i.getX2());g=Math.min(g,i.getY2());b()};this.instersects=function(i){return Math.min(d,i.getX2())-Math.max(f,i.getX1())>=0&&Math.min(g,i.getY2())-Math.max(h,i.getY1())>=0};this.empty=function(){e=true;f=0;h=0;d=0;g=0;b()};this.isEmpty=function(){return e};this.toString=function(){return"THREE.Rectangle (x1: "+f+", y1: "+g+", x2: "+d+", y1: "+h+", width: "+a+", height: "+c+")"}};THREE.Matrix4=function(){this._x=new THREE.Vector3();this._y=new THREE.Vector3();this._z=new THREE.Vector3()};THREE.Matrix4.prototype={n11:1,n12:0,n13:0,n14:0,n21:0,n22:1,n23:0,n24:0,n31:0,n32:0,n33:1,n34:0,n41:0,n42:0,n43:0,n44:1,identity:function(){this.n11=1;this.n12=0;this.n13=0;this.n14=0;this.n21=0;this.n22=1;this.n23=0;this.n24=0;this.n31=0;this.n32=0;this.n33=1;this.n34=0;this.n41=0;this.n42=0;this.n43=0;this.n44=1},copy:function(a){this.n11=a.n11;this.n12=a.n12;this.n13=a.n13;this.n14=a.n14;this.n21=a.n21;this.n22=a.n22;this.n23=a.n23;this.n24=a.n24;this.n31=a.n31;this.n32=a.n32;this.n33=a.n33;this.n34=a.n34;this.n41=a.n41;this.n42=a.n42;this.n43=a.n43;this.n44=a.n44},lookAt:function(d,c,b){var a=this._x,f=this._y,e=this._z;e.sub(d,c);e.normalize();a.cross(b,e);a.normalize();f.cross(e,a);f.normalize();this.n11=a.x;this.n12=a.y;this.n13=a.z;this.n14=-a.dot(d);this.n21=f.x;this.n22=f.y;this.n23=f.z;this.n24=-f.dot(d);this.n31=e.x;this.n32=e.y;this.n33=e.z;this.n34=-e.dot(d);this.n41=0;this.n42=0;this.n43=0;this.n44=1},transform:function(a){var d=a.x,c=a.y,b=a.z,e=a.w?a.w:1;a.x=this.n11*d+this.n12*c+this.n13*b+this.n14*e;a.y=this.n21*d+this.n22*c+this.n23*b+this.n24*e;a.z=this.n31*d+this.n32*c+this.n33*b+this.n34*e;e=this.n41*d+this.n42*c+this.n43*b+this.n44*e;if(a.w){a.w=e}else{a.x=a.x/e;a.y=a.y/e;a.z=a.z/e}return a},crossVector:function(b){var c=new THREE.Vector4();c.x=this.n11*b.x+this.n12*b.y+this.n13*b.z+this.n14*b.w;c.y=this.n21*b.x+this.n22*b.y+this.n23*b.z+this.n24*b.w;c.z=this.n31*b.x+this.n32*b.y+this.n33*b.z+this.n34*b.w;c.w=(b.w)?this.n41*b.x+this.n42*b.y+this.n43*b.z+this.n44*b.w:1;return c},multiply:function(d,c){this.n11=d.n11*c.n11+d.n12*c.n21+d.n13*c.n31+d.n14*c.n41;this.n12=d.n11*c.n12+d.n12*c.n22+d.n13*c.n32+d.n14*c.n42;this.n13=d.n11*c.n13+d.n12*c.n23+d.n13*c.n33+d.n14*c.n43;this.n14=d.n11*c.n14+d.n12*c.n24+d.n13*c.n34+d.n14*c.n44;this.n21=d.n21*c.n11+d.n22*c.n21+d.n23*c.n31+d.n24*c.n41;this.n22=d.n21*c.n12+d.n22*c.n22+d.n23*c.n32+d.n24*c.n42;this.n23=d.n21*c.n13+d.n22*c.n23+d.n23*c.n33+d.n24*c.n43;this.n24=d.n21*c.n14+d.n22*c.n24+d.n23*c.n34+d.n24*c.n44;this.n31=d.n31*c.n11+d.n32*c.n21+d.n33*c.n31+d.n34*c.n41;this.n32=d.n31*c.n12+d.n32*c.n22+d.n33*c.n32+d.n34*c.n42;this.n33=d.n31*c.n13+d.n32*c.n23+d.n33*c.n33+d.n34*c.n43;this.n34=d.n31*c.n14+d.n32*c.n24+d.n33*c.n34+d.n34*c.n44;this.n41=d.n41*c.n11+d.n42*c.n21+d.n43*c.n31+d.n44*c.n41;this.n42=d.n41*c.n12+d.n42*c.n22+d.n43*c.n32+d.n44*c.n42;this.n43=d.n41*c.n13+d.n42*c.n23+d.n43*c.n33+d.n44*c.n43;this.n44=d.n41*c.n14+d.n42*c.n24+d.n43*c.n34+d.n44*c.n44},multiplySelf:function(c){var p=this.n11,o=this.n12,k=this.n13,i=this.n14,f=this.n21,e=this.n22,d=this.n23,b=this.n24,a=this.n31,s=this.n32,r=this.n33,q=this.n34,n=this.n41,j=this.n42,h=this.n43,g=this.n44;this.n11=p*c.n11+o*c.n21+k*c.n31+i*c.n41;this.n12=p*c.n12+o*c.n22+k*c.n32+i*c.n42;this.n13=p*c.n13+o*c.n23+k*c.n33+i*c.n43;this.n14=p*c.n14+o*c.n24+k*c.n34+i*c.n44;this.n21=f*c.n11+e*c.n21+d*c.n31+b*c.n41;this.n22=f*c.n12+e*c.n22+d*c.n32+b*c.n42;this.n23=f*c.n13+e*c.n23+d*c.n33+b*c.n43;this.n24=f*c.n14+e*c.n24+d*c.n34+b*c.n44;this.n31=a*c.n11+s*c.n21+r*c.n31+q*c.n41;this.n32=a*c.n12+s*c.n22+r*c.n32+q*c.n42;this.n33=a*c.n13+s*c.n23+r*c.n33+q*c.n43;this.n34=a*c.n14+s*c.n24+r*c.n34+q*c.n44;this.n41=n*c.n11+j*c.n21+h*c.n31+g*c.n41;this.n42=n*c.n12+j*c.n22+h*c.n32+g*c.n42;this.n43=n*c.n13+j*c.n23+h*c.n33+g*c.n43;this.n44=n*c.n14+j*c.n24+h*c.n34+g*c.n44},multiplyScalar:function(a){this.n11*=a;this.n12*=a;this.n13*=a;this.n14*=a;this.n21*=a;this.n22*=a;this.n23*=a;this.n24*=a;this.n31*=a;this.n32*=a;this.n33*=a;this.n34*=a;this.n41*=a;this.n42*=a;this.n43*=a;this.n44*=a},determinant:function(){return(this.n14*this.n23*this.n32*this.n41-this.n13*this.n24*this.n32*this.n41-this.n14*this.n22*this.n33*this.n41+this.n12*this.n24*this.n33*this.n41+this.n13*this.n22*this.n34*this.n41-this.n12*this.n23*this.n34*this.n41-this.n14*this.n23*this.n31*this.n42+this.n13*this.n24*this.n31*this.n42+this.n14*this.n21*this.n33*this.n42-this.n11*this.n24*this.n33*this.n42-this.n13*this.n21*this.n34*this.n42+this.n11*this.n23*this.n34*this.n42+this.n14*this.n22*this.n31*this.n43-this.n12*this.n24*this.n31*this.n43-this.n14*this.n21*this.n32*this.n43+this.n11*this.n24*this.n32*this.n43+this.n12*this.n21*this.n34*this.n43-this.n11*this.n22*this.n34*this.n43-this.n13*this.n22*this.n31*this.n44+this.n12*this.n23*this.n31*this.n44+this.n13*this.n21*this.n32*this.n44-this.n11*this.n23*this.n32*this.n44-this.n12*this.n21*this.n33*this.n44+this.n11*this.n22*this.n33*this.n44)},transpose:function(){function a(d,e,c){var b=d[e];d[e]=d[c];d[c]=b}a(this,"n21","n12");a(this,"n31","n13");a(this,"n32","n23");a(this,"n41","n14");a(this,"n42","n24");a(this,"n43","n34");return this},clone:function(){var a=new THREE.Matrix4();a.n11=this.n11;a.n12=this.n12;a.n13=this.n13;a.n14=this.n14;a.n21=this.n21;a.n22=this.n22;a.n23=this.n23;a.n24=this.n24;a.n31=this.n31;a.n32=this.n32;a.n33=this.n33;a.n34=this.n34;a.n41=this.n41;a.n42=this.n42;a.n43=this.n43;a.n44=this.n44;return a},flatten:function(){return[this.n11,this.n21,this.n31,this.n41,this.n12,this.n22,this.n32,this.n42,this.n13,this.n23,this.n33,this.n43,this.n14,this.n24,this.n34,this.n44]},toString:function(){return"| "+this.n11+" "+this.n12+" "+this.n13+" "+this.n14+" |\n| "+this.n21+" "+this.n22+" "+this.n23+" "+this.n24+" |\n| "+this.n31+" "+this.n32+" "+this.n33+" "+this.n34+" |\n| "+this.n41+" "+this.n42+" "+this.n43+" "+this.n44+" |"}};THREE.Matrix4.translationMatrix=function(b,d,c){var a=new THREE.Matrix4();a.n14=b;a.n24=d;a.n34=c;return a};THREE.Matrix4.scaleMatrix=function(b,d,c){var a=new THREE.Matrix4();a.n11=b;a.n22=d;a.n33=c;return a};THREE.Matrix4.rotationXMatrix=function(b){var a=new THREE.Matrix4();a.n22=a.n33=Math.cos(b);a.n32=Math.sin(b);a.n23=-a.n32;return a};THREE.Matrix4.rotationYMatrix=function(b){var a=new THREE.Matrix4();a.n11=a.n33=Math.cos(b);a.n13=Math.sin(b);a.n31=-a.n13;return a};THREE.Matrix4.rotationZMatrix=function(b){var a=new THREE.Matrix4();a.n11=a.n22=Math.cos(b);a.n21=Math.sin(b);a.n12=-a.n21;return a};THREE.Matrix4.rotationAxisAngleMatrix=function(b,d){var a=new THREE.Matrix4(),f=Math.cos(d),j=Math.sin(d),i=1-f,h=b.x,g=b.y,e=b.z;a.n11=i*h*h+f;a.n12=i*h*g-j*e;a.n13=i*h*e+j*g;a.n21=i*h*g+j*e;a.n22=i*g*g+f;a.n23=i*g*e-j*h;a.n31=i*h*e-j*g;a.n32=i*g*e+j*h;a.n33=i*e*e+f;return a};THREE.Matrix4.makeInvert=function(b){var a=new THREE.Matrix4();a.n11=b.n23*b.n34*b.n42-b.n24*b.n33*b.n42+b.n24*b.n32*b.n43-b.n22*b.n34*b.n43-b.n23*b.n32*b.n44+b.n22*b.n33*b.n44;a.n12=b.n14*b.n33*b.n42-b.n13*b.n34*b.n42-b.n14*b.n32*b.n43+b.n12*b.n34*b.n43+b.n13*b.n32*b.n44-b.n12*b.n33*b.n44;a.n13=b.n13*b.n24*b.n42-b.n14*b.n23*b.n42+b.n14*b.n22*b.n43-b.n12*b.n24*b.n43-b.n13*b.n22*b.n44+b.n12*b.n23*b.n44;a.n14=b.n14*b.n23*b.n32-b.n13*b.n24*b.n32-b.n14*b.n22*b.n33+b.n12*b.n24*b.n33+b.n13*b.n22*b.n34-b.n12*b.n23*b.n34;a.n21=b.n24*b.n33*b.n41-b.n23*b.n34*b.n41-b.n24*b.n31*b.n43+b.n21*b.n34*b.n43+b.n23*b.n31*b.n44-b.n21*b.n33*b.n44;a.n22=b.n13*b.n34*b.n41-b.n14*b.n33*b.n41+b.n14*b.n31*b.n43-b.n11*b.n34*b.n43-b.n13*b.n31*b.n44+b.n11*b.n33*b.n44;a.n23=b.n14*b.n23*b.n41-b.n13*b.n24*b.n41-b.n14*b.n21*b.n43+b.n11*b.n24*b.n43+b.n13*b.n21*b.n44-b.n11*b.n23*b.n44;a.n24=b.n13*b.n24*b.n31-b.n14*b.n23*b.n31+b.n14*b.n21*b.n33-b.n11*b.n24*b.n33-b.n13*b.n21*b.n34+b.n11*b.n23*b.n34;a.n31=b.n22*b.n34*b.n41-b.n24*b.n32*b.n41+b.n24*b.n31*b.n42-b.n21*b.n34*b.n42-b.n22*b.n31*b.n44+b.n21*b.n32*b.n44;a.n32=b.n14*b.n32*b.n41-b.n12*b.n34*b.n41-b.n14*b.n31*b.n42+b.n11*b.n34*b.n42+b.n12*b.n31*b.n44-b.n11*b.n32*b.n44;a.n33=b.n13*b.n24*b.n41-b.n14*b.n22*b.n41+b.n14*b.n21*b.n42-b.n11*b.n24*b.n42-b.n12*b.n21*b.n44+b.n11*b.n22*b.n44;a.n34=b.n14*b.n22*b.n31-b.n12*b.n24*b.n31-b.n14*b.n21*b.n32+b.n11*b.n24*b.n32+b.n12*b.n21*b.n34-b.n11*b.n22*b.n34;a.n41=b.n23*b.n32*b.n41-b.n22*b.n33*b.n41-b.n23*b.n31*b.n42+b.n21*b.n33*b.n42+b.n22*b.n31*b.n43-b.n21*b.n32*b.n43;a.n42=b.n12*b.n33*b.n41-b.n13*b.n32*b.n41+b.n13*b.n31*b.n42-b.n11*b.n33*b.n42-b.n12*b.n31*b.n43+b.n11*b.n32*b.n43;a.n43=b.n13*b.n22*b.n41-b.n12*b.n23*b.n41-b.n13*b.n21*b.n42+b.n11*b.n23*b.n42+b.n12*b.n21*b.n43-b.n11*b.n22*b.n43;a.n44=b.n12*b.n23*b.n31-b.n13*b.n22*b.n31+b.n13*b.n21*b.n32-b.n11*b.n23*b.n32-b.n12*b.n21*b.n33+b.n11*b.n22*b.n33;a.multiplyScalar(1/b.determinant());return a};THREE.Matrix4.makeInvert3x3=function(p){var n=new THREE.Matrix3();var e=p.flatten();var o=e[10]*e[5]-e[6]*e[9],i=-e[10]*e[1]+e[2]*e[9],d=e[6]*e[1]-e[2]*e[5],k=-e[10]*e[4]+e[6]*e[8],g=e[10]*e[0]-e[2]*e[8],c=-e[6]*e[0]+e[2]*e[4],j=e[9]*e[4]-e[5]*e[8],f=-e[9]*e[0]+e[1]*e[8],a=e[5]*e[0]-e[1]*e[4];var h=e[0]*(o)+e[1]*(k)+e[2]*(j);if(h==0){throw"matrix not invertible"}var b=1/h;n.m[0]=b*o;n.m[1]=b*i;n.m[2]=b*d;n.m[3]=b*k;n.m[4]=b*g;n.m[5]=b*c;n.m[6]=b*j;n.m[7]=b*f;n.m[8]=b*a;return n};THREE.Matrix4.makeFrustum=function(f,s,e,p,i,h){var g,r,o,q,n,k,j;g=new THREE.Matrix4();r=2*i/(s-f);o=2*i/(p-e);q=(s+f)/(s-f);n=(p+e)/(p-e);k=-(h+i)/(h-i);j=-2*h*i/(h-i);g.n11=r;g.n12=0;g.n13=q;g.n14=0;g.n21=0;g.n22=o;g.n23=n;g.n24=0;g.n31=0;g.n32=0;g.n33=k;g.n34=j;g.n41=0;g.n42=0;g.n43=-1;g.n44=0;return g};THREE.Matrix4.makePerspective=function(e,c,g,b){var a,f,h,d;a=g*Math.tan(e*Math.PI/360);f=-a;h=f*c;d=a*c;return THREE.Matrix4.makeFrustum(h,d,f,a,g,b)};THREE.Matrix4.makeOrtho=function(c,q,k,a,g,f){var d,n,j,i,o,e,b;d=new THREE.Matrix4();o=q-c;e=a-k;b=f-g;n=(q+c)/o;j=(a+k)/e;i=(f+g)/b;d.n11=2/o;d.n12=0;d.n13=0;d.n14=-n;d.n21=0;d.n22=2/e;d.n23=0;d.n24=-j;d.n31=0;d.n32=0;d.n33=-2/b;d.n34=-i;d.n41=0;d.n42=0;d.n43=0;d.n44=1;return d};THREE.Matrix3=function(){this.m=[]};THREE.Matrix3.prototype={transpose:function(){var a;a=this.m[1];this.m[1]=this.m[3];this.m[3]=a;a=this.m[2];this.m[2]=this.m[6];this.m[6]=a;a=this.m[5];this.m[5]=this.m[7];this.m[7]=a;return this}};THREE.Vertex=function(a,b){this.position=a||new THREE.Vector3();this.positionWorld=new THREE.Vector3();this.positionScreen=new THREE.Vector3();this.normal=b||new THREE.Vector3();this.normalWorld=new THREE.Vector3();this.normalScreen=new THREE.Vector3();this.__visible=true};THREE.Vertex.prototype={toString:function(){return"THREE.Vertex ( position: "+this.position+", normal: "+this.normal+" )"}};THREE.Face3=function(e,d,h,g,f){this.a=e;this.b=d;this.c=h;this.centroid=new THREE.Vector3();this.normal=g instanceof THREE.Vector3?g:new THREE.Vector3();this.material=f instanceof Array?f:[f]};THREE.Face3.prototype={toString:function(){return"THREE.Face3 ( "+this.a+", "+this.b+", "+this.c+" )"}};THREE.Face4=function(f,e,j,i,h,g){this.a=f;this.b=e;this.c=j;this.d=i;this.centroid=new THREE.Vector3();this.normal=h instanceof THREE.Vector3?h:new THREE.Vector3();this.material=g instanceof Array?g:[g]};THREE.Face4.prototype={toString:function(){return"THREE.Face4 ( "+this.a+", "+this.b+", "+this.c+" "+this.d+" )"}};THREE.UV=function(b,a){this.u=b||0;this.v=a||0};THREE.UV.prototype={copy:function(a){this.u=a.u;this.v=a.v},toString:function(){return"THREE.UV ("+this.u+", "+this.v+")"}};THREE.Geometry=function(){this.vertices=[];this.faces=[];this.uvs=[]};THREE.Geometry.prototype={computeCentroids:function(){var c,b,a;for(c=0,b=this.faces.length;c<b;c++){a=this.faces[c];a.centroid.set(0,0,0);if(a instanceof THREE.Face3){a.centroid.addSelf(this.vertices[a.a].position);a.centroid.addSelf(this.vertices[a.b].position);a.centroid.addSelf(this.vertices[a.c].position);a.centroid.divideScalar(3)}else{if(a instanceof THREE.Face4){a.centroid.addSelf(this.vertices[a.a].position);a.centroid.addSelf(this.vertices[a.b].position);a.centroid.addSelf(this.vertices[a.c].position);a.centroid.addSelf(this.vertices[a.d].position);a.centroid.divideScalar(4)}}}},computeNormals:function(o){var e,b,p,g,i,j,m,k,d,c,a,h=new THREE.Vector3(),q=new THREE.Vector3();for(p=0,g=this.vertices.length;p<g;p++){i=this.vertices[p];i.normal.set(0,0,0)}for(j=0,m=this.faces.length;j<m;j++){k=this.faces[j];if(o&&k.vertexNormals.length){h.set(0,0,0);for(e=0,b=k.normal.length;e<b;e++){cd.addSelf(k.vertexNormals[e])}h.divideScalar(3);if(!h.isZero()){h.normalize()}k.normal.copy(h)}else{d=this.vertices[k.a];c=this.vertices[k.b];a=this.vertices[k.c];h.sub(a.position,c.position);q.sub(d.position,c.position);h.crossSelf(q);if(!h.isZero()){h.normalize()}k.normal.copy(h)}}},computeBoundingBox:function(){if(this.vertices.length>0){this.bbox={x:[this.vertices[0].position.x,this.vertices[0].position.x],y:[this.vertices[0].position.y,this.vertices[0].position.y],z:[this.vertices[0].position.z,this.vertices[0].position.z]};for(var a=1,b=this.vertices.length;a<b;a++){vertex=this.vertices[a];if(vertex.position.x<this.bbox.x[0]){this.bbox.x[0]=vertex.position.x}else{if(vertex.position.x>this.bbox.x[1]){this.bbox.x[1]=vertex.position.x}}if(vertex.position.y<this.bbox.y[0]){this.bbox.y[0]=vertex.position.y}else{if(vertex.position.y>this.bbox.y[1]){this.bbox.y[1]=vertex.position.y}}if(vertex.position.z<this.bbox.z[0]){this.bbox.z[0]=vertex.position.z}else{if(vertex.position.z>this.bbox.z[1]){this.bbox.z[1]=vertex.position.z}}}}},toString:function(){return"THREE.Geometry ( vertices: "+this.vertices+", faces: "+this.faces+" )"}};THREE.Camera=function(c,b,d,a){this.fov=c;this.aspect=b;this.position=new THREE.Vector3(0,0,0);this.target={position:new THREE.Vector3(0,0,0)};this.projectionMatrix=THREE.Matrix4.makePerspective(c,b,d,a);this.up=new THREE.Vector3(0,1,0);this.matrix=new THREE.Matrix4();this.autoUpdateMatrix=true;this.updateMatrix=function(){this.matrix.lookAt(this.position,this.target.position,this.up)};this.toString=function(){return"THREE.Camera ( "+this.position+", "+this.target.position+" )"}};THREE.Light=function(a){this.color=new THREE.Color(255<<24|a)};THREE.AmbientLight=function(a){THREE.Light.call(this,a)};THREE.AmbientLight.prototype=new THREE.Light();THREE.AmbientLight.prototype.constructor=THREE.AmbientLight;THREE.DirectionalLight=function(b,a){THREE.Light.call(this,b);this.position=new THREE.Vector3(0,1,0);this.intensity=a||1};THREE.DirectionalLight.prototype=new THREE.Light();THREE.DirectionalLight.prototype.constructor=THREE.DirectionalLight;THREE.PointLight=function(b,a){THREE.Light.call(this,b);this.position=new THREE.Vector3(0,0,0);this.intensity=a||1};THREE.DirectionalLight.prototype=new THREE.Light();THREE.DirectionalLight.prototype.constructor=THREE.PointLight;THREE.Object3D=function(a){this.position=new THREE.Vector3();this.rotation=new THREE.Vector3();this.scale=new THREE.Vector3(1,1,1);this.matrix=new THREE.Matrix4();this.matrixTranslation=new THREE.Matrix4();this.matrixRotation=new THREE.Matrix4();this.matrixScale=new THREE.Matrix4();this.screen=new THREE.Vector3();this.autoUpdateMatrix=true;this.updateMatrix=function(){this.matrixPosition=THREE.Matrix4.translationMatrix(this.position.x,this.position.y,this.position.z);this.matrixRotation=THREE.Matrix4.rotationXMatrix(this.rotation.x);this.matrixRotation.multiplySelf(THREE.Matrix4.rotationYMatrix(this.rotation.y));this.matrixRotation.multiplySelf(THREE.Matrix4.rotationZMatrix(this.rotation.z));this.matrixScale=THREE.Matrix4.scaleMatrix(this.scale.x,this.scale.y,this.scale.z);this.matrix.copy(this.matrixPosition);this.matrix.multiplySelf(this.matrixRotation);this.matrix.multiplySelf(this.matrixScale)}};THREE.Particle=function(a){THREE.Object3D.call(this);this.material=a instanceof Array?a:[a];this.autoUpdateMatrix=false};THREE.Particle.prototype=new THREE.Object3D();THREE.Particle.prototype.constructor=THREE.Particle;THREE.Line=function(b,a){THREE.Object3D.call(this);this.geometry=b;this.material=a instanceof Array?a:[a]};THREE.Line.prototype=new THREE.Object3D();THREE.Line.prototype.constructor=THREE.Line;THREE.Mesh=function(b,a,c){THREE.Object3D.call(this);this.geometry=b;this.material=a instanceof Array?a:[a];this.flipSided=false;this.doubleSided=false;this.overdraw=false;this.materialFaces={};this.sortFacesByMaterial();if(c){this.normalizeUVs()}this.geometry.computeBoundingBox()};THREE.Mesh.prototype=new THREE.Object3D();THREE.Mesh.prototype.constructor=THREE.Mesh;THREE.Mesh.prototype.sortFacesByMaterial=function(){var d,c,b,a;for(d=0,c=this.geometry.faces.length;d<c;d++){b=this.geometry.faces[d];a=b.material;if(this.materialFaces[a]==undefined){this.materialFaces[a]={faces:[]}}this.materialFaces[a].faces.push(d)}};THREE.Mesh.prototype.normalizeUVs=function(){var c,a;for(c=0,l=this.geometry.uvs.length;c<l;c++){var b=this.geometry.uvs[c];for(a=0,jl=b.length;a<jl;a++){if(b[a].u!=1){b[a].u=b[a].u-Math.floor(b[a].u)}if(b[a].v!=1){b[a].v=b[a].v-Math.floor(b[a].v)}}}};THREE.LineColorMaterial=function(c,b,a){this.lineWidth=a||1;this.color=new THREE.Color((b>=0?(b*255)<<24:4278190080)|c)};THREE.LineColorMaterial.prototype={toString:function(){return"THREE.LineColorMaterial ( color: "+this.color+", lineWidth: "+this.lineWidth+" )"}};THREE.MeshBitmapMaterial=function(a,b){this.bitmap=a;this.mode=b||THREE.MeshBitmapMaterialMode.UVMAPPING;this.toString=function(){return"THREE.MeshBitmapUVMappingMaterial ( bitmap: "+this.bitmap+", mode: "+this.mode+" )"}};THREE.MeshBitmapMaterialMode={UVMAPPING:0};THREE.MeshColorFillMaterial=function(b,a){this.color=new THREE.Color((a>=0?(a*255)<<24:4278190080)|b);this.toString=function(){return"THREE.MeshColorFillMaterial ( color: "+this.color+" )"}};THREE.MeshColorStrokeMaterial=function(c,b,a){this.lineWidth=a||1;this.color=new THREE.Color((b>=0?(b*255)<<24:4278190080)|c);this.toString=function(){return"THREE.MeshColorStrokeMaterial ( lineWidth: "+this.lineWidth+", color: "+this.color+" )"}};THREE.MeshFaceMaterial=function(){this.toString=function(){return"THREE.MeshFaceMaterial"}};THREE.ParticleBitmapMaterial=function(a){this.bitmap=a;this.offset=new THREE.Vector2();this.toString=function(){return"THREE.ParticleBitmapMaterial ( bitmap: "+this.bitmap+" )"}};THREE.ParticleCircleMaterial=function(b,a){this.color=new THREE.Color((a>=0?(a*255)<<24:4278190080)|b);this.toString=function(){return"THREE.ParticleCircleMaterial ( color: "+this.color+" )"}};THREE.ParticleDOMMaterial=function(a){this.domElement=a;this.toString=function(){return"THREE.ParticleDOMMaterial ( domElement: "+this.domElement+" )"}};THREE.Scene=function(){this.objects=[];this.lights=[];this.addObject=function(a){this.objects.push(a)};this.removeObject=function(b){for(var c=0,a=this.objects.length;c<a;c++){if(b==this.objects[c]){this.objects.splice(c,1);return}}};this.addLight=function(a){this.lights.push(a)};this.removeLight=function(b){for(var c=0,a=this.lights.length;c<a;c++){if(b==this.lights[c]){this.lights.splice(c,1);return}}};this.add=function(a){this.addObject(a)};this.toString=function(){return"THREE.Scene ( "+this.objects+" )"}};THREE.Projector=function(){var e=null,c,q,o=[],b,f,m=[],k,n,i=[],j,h,a=[],g=new THREE.Vector4(),d=new THREE.Matrix4(),p=new THREE.Matrix4();this.projectScene=function(K,H){var G,F,E,L,J,C,s,M,r,A,I,w,D,x,B,z,y,u,t;e=[];q=0,f=0,n=0,h=0;if(H.autoUpdateMatrix){H.updateMatrix()}d.multiply(H.projectionMatrix,H.matrix);s=K.objects;for(G=0,F=s.length;G<F;G++){M=s[G];r=M.matrix;if(M.autoUpdateMatrix){M.updateMatrix()}if(M instanceof THREE.Mesh){p.multiply(d,r);A=M.geometry.vertices;for(E=0,L=A.length;E<L;E++){I=A[E];w=I.positionScreen;w.copy(I.position);p.transform(w);I.__visible=w.z>0&&w.z<1}x=M.geometry.faces;for(J=0,C=x.length;J<C;J++){B=x[J];if(B instanceof THREE.Face3){z=A[B.a];y=A[B.b];u=A[B.c];if(z.__visible&&y.__visible&&u.__visible){if((M.doubleSided||(M.flipSided!=(u.positionScreen.x-z.positionScreen.x)*(y.positionScreen.y-z.positionScreen.y)-(u.positionScreen.y-z.positionScreen.y)*(y.positionScreen.x-z.positionScreen.x)<0))){c=o[q]=o[q]||new THREE.RenderableFace3();c.v1.copy(z.positionScreen);c.v2.copy(y.positionScreen);c.v3.copy(u.positionScreen);c.centroidWorld.copy(B.centroid);M.matrix.transform(c.centroidWorld);c.normalWorld.copy(B.normal);M.matrixRotation.transform(c.normalWorld);c.z=Math.max(z.positionScreen.z,Math.max(y.positionScreen.z,u.positionScreen.z));c.meshMaterial=M.material;c.faceMaterial=B.material;c.overdraw=M.overdraw;c.uvs=M.geometry.uvs[J];c.color=B.color;e.push(c);q++}}}else{if(B instanceof THREE.Face4){z=A[B.a];y=A[B.b];u=A[B.c];t=A[B.d];if(z.__visible&&y.__visible&&u.__visible&&t.__visible){if((M.doubleSided||(M.flipSided!=((t.positionScreen.x-z.positionScreen.x)*(y.positionScreen.y-z.positionScreen.y)-(t.positionScreen.y-z.positionScreen.y)*(y.positionScreen.x-z.positionScreen.x)<0||(y.positionScreen.x-u.positionScreen.x)*(t.positionScreen.y-u.positionScreen.y)-(y.positionScreen.y-u.positionScreen.y)*(t.positionScreen.x-u.positionScreen.x)<0)))){b=m[f]=m[f]||new THREE.RenderableFace4();b.v1.copy(z.positionScreen);b.v2.copy(y.positionScreen);b.v3.copy(u.positionScreen);b.v4.copy(t.positionScreen);b.centroidWorld.copy(B.centroid);M.matrix.transform(b.centroidWorld);b.normalWorld.copy(B.normal);M.matrixRotation.transform(b.normalWorld);b.z=Math.max(z.positionScreen.z,Math.max(y.positionScreen.z,Math.max(u.positionScreen.z,t.positionScreen.z)));b.meshMaterial=M.material;b.faceMaterial=B.material;b.overdraw=M.overdraw;b.uvs=M.geometry.uvs[J];b.color=B.color;e.push(b);f++}}}}}}else{if(M instanceof THREE.Line){p.multiply(d,r);A=M.geometry.vertices;for(E=0,L=A.length;E<L;E++){I=A[E];w=I.positionScreen;w.copy(I.position);p.transform(w);I.__visible=w.z>0&&w.z<1;if(E>0){D=M.geometry.vertices[E-1];if(I.__visible&&D.__visible){k=i[n]=i[n]||new THREE.RenderableLine();k.v1.copy(I.positionScreen);k.v2.copy(D.positionScreen);k.z=Math.max(I.positionScreen.z,D.positionScreen.z);k.material=M.material;e.push(k);n++}}}}else{if(M instanceof THREE.Particle){g.set(M.position.x,M.position.y,M.position.z,1);H.matrix.transform(g);H.projectionMatrix.transform(g);M.screen.set(g.x/g.w,g.y/g.w,g.z/g.w);if(M.screen.z>0&&M.screen.z<1){j=a[h]=a[h]||new THREE.RenderableParticle();j.x=M.screen.x;j.y=M.screen.y;j.z=M.screen.z;j.rotation=M.rotation.z;j.scale.x=M.scale.x*Math.abs(g.x/g.w-(g.x+H.projectionMatrix.n11)/(g.w+H.projectionMatrix.n14));j.scale.y=M.scale.y*Math.abs(g.y/g.w-(g.y+H.projectionMatrix.n22)/(g.w+H.projectionMatrix.n24));j.material=M.material;j.color=M.color;e.push(j);h++}}}}}e.sort(function(N,v){return v.z-N.z});return e}};THREE.DOMRenderer=function(){THREE.Renderer.call(this);var e=null,g=new THREE.Projector(),b=document.createElement("div"),a,c,f,d;this.domElement=b;this.setSize=function(i,h){a=i;c=h;f=a/2;d=c/2};this.render=function(q,s){var r,h,i,o,p,t,n,k,j;e=g.projectScene(q,s);for(r=0,h=e.length;r<h;r++){p=e[r];if(p instanceof THREE.RenderableParticle){k=p.x*f+f;j=p.y*d+d;for(i=0,o=p.material.length;i<o;i++){t=p.material[i];if(t instanceof THREE.ParticleDOMMaterial){n=t.domElement;n.style.left=k+"px";n.style.top=j+"px"}}}}}};THREE.CanvasRenderer=function(){var A=null,v=new THREE.Projector(),s=document.createElement("canvas"),t=s.getContext("2d"),o,G,r,e,D=new THREE.Rectangle(),q=new THREE.Rectangle(),z=new THREE.Rectangle(),m=false,p=new THREE.Color(4294967295),x=new THREE.Color(4294967295),g=new THREE.Color(4294967295),y=Math.PI*2,k=new THREE.Vector2(),i=new THREE.Vector3(),H=new THREE.UV(),F=new THREE.UV(),E=new THREE.UV(),C=new THREE.UV(),d=new THREE.Vector2(),b=new THREE.Vector2();this.domElement=s;this.autoClear=true;this.setSize=function(J,I){o=J;G=I;r=o/2;e=G/2;s.width=o;s.height=G;D.set(-r,-e,r,e)};this.clear=function(){if(!q.isEmpty()){q.inflate(1);q.minSelf(D);t.setTransform(1,0,0,-1,r,e);t.clearRect(q.getX(),q.getY(),q.getWidth(),q.getHeight());q.empty()}};this.render=function(aj,ae){var ai,L,N,Y,af,R,O,V,S,P,ac,aa,K,I,T,Q,ad,ab,M,J,X,W,al,ak,ah,ag,am,U,Z;if(this.autoClear){this.clear()}A=v.projectScene(aj,ae);t.setTransform(1,0,0,-1,r,e);m=aj.lights.length>0;if(m){B(aj,g)}for(ai=0,L=A.length;ai<L;ai++){N=A[ai];z.empty();if(N instanceof THREE.RenderableParticle){S=N.x*r;P=N.y*e;for(Y=0,af=N.material.length;Y<af;Y++){V=N.material[Y];n(S,P,N,V,aj)}}else{if(N instanceof THREE.RenderableLine){S=N.v1.x*r;P=N.v1.y*e;ac=N.v2.x*r;aa=N.v2.y*e;z.addPoint(S,P);z.addPoint(ac,aa);if(!D.instersects(z)){continue}t.beginPath();t.moveTo(S,P);t.lineTo(ac,aa);t.closePath();for(Y=0,af=N.material.length;Y<af;Y++){V=N.material[Y];f(S,P,ac,aa,N,V,aj)}}else{if(N instanceof THREE.RenderableFace3){N.v1.x*=r;N.v1.y*=e;N.v2.x*=r;N.v2.y*=e;N.v3.x*=r;N.v3.y*=e;if(N.overdraw){c(N.v1,N.v2);c(N.v2,N.v3);c(N.v3,N.v1)}S=N.v1.x;P=N.v1.y;ac=N.v2.x;aa=N.v2.y;K=N.v3.x;I=N.v3.y;z.addPoint(S,P);z.addPoint(ac,aa);z.addPoint(K,I);if(!D.instersects(z)){continue}Y=0;af=N.meshMaterial.length;while(Y<af){V=N.meshMaterial[Y++];if(V instanceof THREE.MeshFaceMaterial){R=0;O=N.faceMaterial.length;while(R<O){V=N.faceMaterial[R++];j(S,P,ac,aa,K,I,N,V,aj)}continue}j(S,P,ac,aa,K,I,N,V,aj)}}else{if(N instanceof THREE.RenderableFace4){N.v1.x*=r;N.v1.y*=e;N.v2.x*=r;N.v2.y*=e;N.v3.x*=r;N.v3.y*=e;N.v4.x*=r;N.v4.y*=e;d.copy(N.v2);b.copy(N.v4);if(N.overdraw){c(N.v1,N.v2);c(N.v2,N.v4);c(N.v4,N.v1)}S=N.v1.x;P=N.v1.y;ac=N.v2.x;aa=N.v2.y;T=N.v4.x;Q=N.v4.y;if(N.overdraw){c(N.v3,d);c(N.v3,b)}K=N.v3.x;I=N.v3.y;ad=d.x;ab=d.y;M=b.x;J=b.y;z.addPoint(S,P);z.addPoint(ac,aa);z.addPoint(K,I);z.addPoint(T,Q);if(!D.instersects(z)){continue}Y=0;af=N.meshMaterial.length;while(Y<af){V=N.meshMaterial[Y++];if(V instanceof THREE.MeshFaceMaterial){R=0;O=N.faceMaterial.length;while(R<O){V=N.faceMaterial[R++];h(S,P,ac,aa,K,I,T,Q,ad,ab,M,J,N,V,aj)}continue}h(S,P,ac,aa,K,I,T,Q,ad,ab,M,J,N,V,aj)}}}}}q.addRectangle(z)}t.setTransform(1,0,0,1,0,0)};function B(M,K){var J,L,I;K.setRGBA(1,1,1,1);for(J=0,L=M.lights.length;J<L;J++){I=M.lights[J];if(I instanceof THREE.AmbientLight){K.r*=I.color.r;K.g*=I.color.g;K.b*=I.color.b}}}function u(N,L,K){var J,M,I;for(J=0,M=N.lights.length;J<M;J++){I=N.lights[J];if(I instanceof THREE.DirectionalLight){K.r+=I.color.r;K.g+=I.color.g;K.b+=I.color.b}else{if(I instanceof THREE.PointLight){K.r+=I.color.r;K.g+=I.color.g;K.b+=I.color.b}}}}function a(O,M,K){var J,N,I,L;for(J=0,N=O.lights.length;J<N;J++){I=O.lights[J];if(I instanceof THREE.DirectionalLight){L=M.normalWorld.dot(I.position)*I.intensity;if(L>0){K.r+=I.color.r*L;K.g+=I.color.g*L;K.b+=I.color.b*L}}else{if(I instanceof THREE.PointLight){i.sub(I.position,M.centroidWorld);i.normalize();L=M.normalWorld.dot(i)*I.intensity;if(L>0){K.r+=I.color.r*L;K.g+=I.color.g*L;K.b+=I.color.b*L}}}}}function n(I,M,J,K,L){if(K instanceof THREE.ParticleCircleMaterial){if(m){x.copyRGB(g);u(L,J,x);p.copyRGBA(K.color);p.multiplySelfRGB(x);p.updateStyleString()}else{p=K.color}width=J.scale.x*r;height=J.scale.y*e;z.set(I-width,M-height,I+width,M+height);if(!D.instersects(z)){return}t.save();t.translate(I,M);t.rotate(-J.rotation);t.scale(width,height);t.beginPath();t.arc(0,0,1,0,y,true);t.closePath();t.fillStyle=p.__styleString;t.fill();t.restore()}else{if(K instanceof THREE.ParticleBitmapMaterial){bitmap=K.bitmap;bitmapWidth=bitmap.width/2;bitmapHeight=bitmap.height/2;scaleX=J.scale.x*r;scaleY=J.scale.y*e;width=scaleX*bitmapWidth;height=scaleY*bitmapHeight;offsetX=K.offset.x*scaleX;offsetY=K.offset.y*scaleY;z.set(I+offsetX-width,M+offsetY-height,I+offsetX+width,M+offsetY+height);if(!D.instersects(z)){return}t.save();t.translate(I,M);t.rotate(-J.rotation);t.scale(scaleX,-scaleY);t.translate(-bitmapWidth+K.offset.x,-bitmapHeight-K.offset.y);t.drawImage(bitmap,0,0);t.restore()}}}function f(I,O,K,J,L,M,N){if(M instanceof THREE.LineColorMaterial){if(m){x.copyRGB(g);u(N,L,x);p.copyRGBA(M.color);p.multiplySelfRGB(x);p.updateStyleString()}else{p=M.color}t.lineWidth=M.lineWidth;t.lineJoin="round";t.lineCap="round";t.strokeStyle=p.__styleString;t.stroke();z.inflate(t.lineWidth)}}function j(K,J,I,Q,P,O,L,N,M){if(N instanceof THREE.MeshColorFillMaterial){if(m){x.copyRGB(g);a(M,L,x);p.copyRGBA(N.color);p.multiplySelfRGB(x);p.updateStyleString()}else{p=N.color}t.beginPath();t.moveTo(K,J);t.lineTo(I,Q);t.lineTo(P,O);t.lineTo(K,J);t.closePath();t.fillStyle=p.__styleString;t.fill()}else{if(N instanceof THREE.MeshColorStrokeMaterial){if(m){x.copyRGB(g);a(M,L,x);p.copyRGBA(N.color);p.multiplySelfRGB(x);p.updateStyleString()}else{p=N.color}t.beginPath();t.moveTo(K,J);t.lineTo(I,Q);t.lineTo(P,O);t.lineTo(K,J);t.closePath();t.lineWidth=N.lineWidth;t.lineJoin="round";t.lineCap="round";t.strokeStyle=p.__styleString;t.stroke();z.inflate(t.lineWidth)}else{if(N instanceof THREE.MeshBitmapMaterial){bitmap=N.bitmap;bitmapWidth=bitmap.width-1;bitmapHeight=bitmap.height-1;H.copy(L.uvs[0]);F.copy(L.uvs[1]);E.copy(L.uvs[2]);H.u*=bitmapWidth;H.v*=bitmapHeight;F.u*=bitmapWidth;F.v*=bitmapHeight;E.u*=bitmapWidth;E.v*=bitmapHeight;w(bitmap,K,J,I,Q,P,O,H.u,H.v,F.u,F.v,E.u,E.v)}}}}function h(M,K,I,W,T,S,L,J,V,U,R,Q,N,P,O){if(P instanceof THREE.MeshColorFillMaterial){if(m){x.copyRGB(g);a(O,N,x);p.copyRGBA(P.color);p.multiplySelfRGB(x);p.updateStyleString()}else{p=P.color}t.beginPath();t.moveTo(M,K);t.lineTo(I,W);t.lineTo(T,S);t.lineTo(L,J);t.lineTo(M,K);t.closePath();t.fillStyle=p.__styleString;t.fill()}else{if(P instanceof THREE.MeshColorStrokeMaterial){if(m){x.copyRGB(g);a(O,N,x);p.copyRGBA(P.color);p.multiplySelfRGB(x);p.updateStyleString()}else{p=P.color}t.beginPath();t.moveTo(M,K);t.lineTo(I,W);t.lineTo(T,S);t.lineTo(L,J);t.lineTo(M,K);t.closePath();t.lineWidth=P.lineWidth;t.lineJoin="round";t.lineCap="round";t.strokeStyle=p.__styleString;t.stroke();z.inflate(t.lineWidth)}else{if(P instanceof THREE.MeshBitmapMaterial){bitmap=P.bitmap;bitmapWidth=bitmap.width-1;bitmapHeight=bitmap.height-1;H.copy(N.uvs[0]);F.copy(N.uvs[1]);E.copy(N.uvs[2]);C.copy(N.uvs[3]);H.u*=bitmapWidth;H.v*=bitmapHeight;F.u*=bitmapWidth;F.v*=bitmapHeight;E.u*=bitmapWidth;E.v*=bitmapHeight;C.u*=bitmapWidth;C.v*=bitmapHeight;w(bitmap,M,K,I,W,L,J,H.u,H.v,F.u,F.v,C.u,C.v);w(bitmap,V,U,T,S,R,Q,F.u,F.v,E.u,E.v,C.u,C.v)}}}}function w(ab,Q,P,W,V,K,I,U,T,Y,X,M,L){var J,aa,Z,O,N,S,R;t.beginPath();t.moveTo(Q,P);t.lineTo(W,V);t.lineTo(K,I);t.lineTo(Q,P);t.closePath();t.save();t.clip();J=U*(L-X)-Y*L+M*X+(Y-M)*T;aa=-(T*(K-W)-X*K+L*W+(X-L)*Q)/J;Z=(X*I+T*(V-I)-L*V+(L-X)*P)/J;O=(U*(K-W)-Y*K+M*W+(Y-M)*Q)/J;N=-(Y*I+U*(V-I)-M*V+(M-Y)*P)/J;S=(U*(L*W-X*K)+T*(Y*K-M*W)+(M*X-Y*L)*Q)/J;R=(U*(L*V-X*I)+T*(Y*I-M*V)+(M*X-Y*L)*P)/J;t.transform(aa,Z,O,N,S,R);t.drawImage(ab,0,0);t.restore()}function c(J,I){k.sub(I,J);k.unit();k.multiplyScalar(0.75);I.addSelf(k);J.subSelf(k)}};THREE.SVGRenderer=function(){var y=null,t=new THREE.Projector(),u=document.createElementNS("http://www.w3.org/2000/svg","svg"),m,C,r,b,A=new THREE.Rectangle(),x=new THREE.Rectangle(),j=false,n=new THREE.Color(4294967295),w=new THREE.Color(4294967295),d=new THREE.Color(4294967295),h=new THREE.Vector3(),e=[],o=[],D,q,g,B=1;this.domElement=u;this.autoClear=true;this.setQuality=function(E){switch(E){case"high":B=1;break;case"low":B=0;break}};this.setSize=function(F,E){m=F;C=E;r=m/2;b=C/2;u.setAttribute("viewBox",(-r)+" "+(-b)+" "+m+" "+C);u.setAttribute("width",m);u.setAttribute("height",C);A.set(-r,-b,r,b)};this.clear=function(){while(u.childNodes.length>0){u.removeChild(u.childNodes[0])}};this.render=function(W,T){var V,G,Q,U,L,I,H,O,M,J,S,R,F,E,N,K,P;if(this.autoClear){this.clear()}y=t.projectScene(W,T);q=0;g=0;j=W.lights.length>0;if(j){z(W,d)}for(V=0,G=y.length;V<G;V++){H=y[V];x.empty();if(H instanceof THREE.RenderableParticle){M=H.x*r;J=H.y*-b;for(Q=0,U=H.material.length;Q<U;Q++){O=H.material[Q];k(M,J,H,O,W)}}else{if(H instanceof THREE.RenderableLine){}else{if(H instanceof THREE.RenderableFace3){M=H.v1.x*r;J=H.v1.y*-b;S=H.v2.x*r;R=H.v2.y*-b;F=H.v3.x*r;E=H.v3.y*-b;x.addPoint(M,J);x.addPoint(S,R);x.addPoint(F,E);if(!A.instersects(x)){continue}Q=0;U=H.meshMaterial.length;while(Q<U){O=H.meshMaterial[Q++];if(O instanceof THREE.MeshFaceMaterial){L=0;I=H.faceMaterial.length;while(L<I){O=H.faceMaterial[L++];i(M,J,S,R,F,E,H,O,W)}continue}i(M,J,S,R,F,E,H,O,W)}}else{if(H instanceof THREE.RenderableFace4){M=H.v1.x*r;J=H.v1.y*-b;S=H.v2.x*r;R=H.v2.y*-b;F=H.v3.x*r;E=H.v3.y*-b;N=H.v4.x*r;K=H.v4.y*-b;x.addPoint(M,J);x.addPoint(S,R);x.addPoint(F,E);x.addPoint(N,K);if(!A.instersects(x)){continue}Q=0;U=H.meshMaterial.length;while(Q<U){O=H.meshMaterial[Q++];if(O instanceof THREE.MeshFaceMaterial){L=0;I=H.faceMaterial.length;while(L<I){O=H.faceMaterial[L++];f(M,J,S,R,F,E,N,K,H,O,W)}continue}f(M,J,S,R,F,E,N,K,H,O,W)}}}}}}};function z(I,G){var F,H,E;G.setRGBA(1,1,1,1);for(F=0,H=I.lights.length;F<H;F++){E=I.lights[F];if(E instanceof THREE.AmbientLight){G.r*=E.color.r;G.g*=E.color.g;G.b*=E.color.b}}}function s(J,H,G){var F,I,E;for(F=0,I=J.lights.length;F<I;F++){E=J.lights[F];if(E instanceof THREE.DirectionalLight){G.r+=E.color.r;G.g+=E.color.g;G.b+=E.color.b}else{if(E instanceof THREE.PointLight){G.r+=E.color.r;G.g+=E.color.g;G.b+=E.color.b}}}}function a(K,I,G){var F,J,E,H;for(F=0,J=K.lights.length;F<J;F++){E=K.lights[F];if(E instanceof THREE.DirectionalLight){H=I.normalWorld.dot(E.position)*E.intensity;if(H>0){G.r+=E.color.r*H;G.g+=E.color.g*H;G.b+=E.color.b*H}}else{if(E instanceof THREE.PointLight){h.sub(E.position,I.centroidWorld);h.normalize();H=I.normalWorld.dot(h)*E.intensity;if(H>0){G.r+=E.color.r*H;G.g+=E.color.g*H;G.b+=E.color.b*H}}}}}function k(E,I,F,G,H){D=v(g++);D.setAttribute("cx",E);D.setAttribute("cy",I);D.setAttribute("r",F.scale.x*r);if(G instanceof THREE.ParticleCircleMaterial){if(j){w.copyRGB(d);s(H,F,w);n.copyRGBA(G.color);n.multiplySelfRGB(w);n.updateStyleString()}else{n=G.color}D.setAttribute("style","fill: "+n.__styleString)}u.appendChild(D)}function c(){}function i(G,F,E,M,L,K,H,J,I){D=p(q++);D.setAttribute("d","M "+G+" "+F+" L "+E+" "+M+" L "+L+","+K+"z");if(J instanceof THREE.MeshColorFillMaterial){if(j){w.copyRGB(d);a(I,H,w);n.copyRGBA(J.color);n.multiplySelfRGB(w);n.updateStyleString()}else{n=J.color}D.setAttribute("style","fill: "+n.__styleString)}else{if(J instanceof THREE.MeshColorStrokeMaterial){if(j){w.copyRGB(d);a(I,H,w);n.copyRGBA(J.color);n.multiplySelfRGB(w);n.updateStyleString()}else{n=J.color}D.setAttribute("style","fill: none; stroke: "+n.__styleString+"; stroke-width: "+J.lineWidth+"; stroke-linecap: round; stroke-linejoin: round")}}u.appendChild(D)}function f(I,G,E,O,N,M,H,F,J,L,K){D=p(q++);D.setAttribute("d","M "+I+" "+G+" L "+E+" "+O+" L "+N+","+M+" L "+H+","+F+"z");if(L instanceof THREE.MeshColorFillMaterial){if(j){w.copyRGB(d);a(K,J,w);n.copyRGBA(L.color);n.multiplySelfRGB(w);n.updateStyleString()}else{n=L.color}D.setAttribute("style","fill: "+n.__styleString)}else{if(L instanceof THREE.MeshColorStrokeMaterial){if(j){w.copyRGB(d);a(K,J,w);n.copyRGBA(L.color);n.multiplySelfRGB(w);n.updateStyleString()}else{n=L.color}D.setAttribute("style","fill: none; stroke: "+n.__styleString+"; stroke-width: "+L.lineWidth+"; stroke-linecap: round; stroke-linejoin: round")}}u.appendChild(D)}function p(E){if(e[E]==null){e[E]=document.createElementNS("http://www.w3.org/2000/svg","path");if(B==0){e[E].setAttribute("shape-rendering","crispEdges")}return e[E]}return e[E]}function v(E){if(o[E]==null){o[E]=document.createElementNS("http://www.w3.org/2000/svg","circle");if(B==0){o[E].setAttribute("shape-rendering","crispEdges")}return o[E]}return o[E]}};THREE.WebGLRenderer=function(){var m=document.createElement("canvas"),c,d,e=new THREE.Matrix4(),k;this.domElement=m;this.autoClear=true;h();g();var a=0,n=1,f=2,j=3,i=4;this.setSize=function(p,o){m.width=p;m.height=o;c.viewport(0,0,m.width,m.height)};this.clear=function(){c.clear(c.COLOR_BUFFER_BIT|c.DEPTH_BUFFER_BIT)};this.setupLights=function(u){var s,t,o,r,q,p;c.uniform1i(d.enableLighting,u.lights.length);for(s=0,t=u.lights.length;s<t;s++){p=u.lights[s];if(p instanceof THREE.AmbientLight){o=p.color;c.uniform3f(d.ambientColor,o.r,o.g,o.b)}else{if(p instanceof THREE.DirectionalLight){o=p.color;r=p.position;q=p.intensity;c.uniform3f(d.lightingDirection,r.x,r.y,r.z);c.uniform3f(d.directionalColor,o.r*q,o.g*q,o.b*q)}else{if(p instanceof THREE.PointLight){o=p.color;r=p.position;q=p.intensity;c.uniform3f(d.pointPosition,r.x,r.y,r.z);c.uniform3f(d.pointColor,o.r*q,o.g*q,o.b*q)}}}}};this.createBuffers=function(K,v){var s=K.materialFaces[v];var B=K.material[v];var C=[];var E=[];var A=[];var t=[];var H=[];var D=[];var y=0;var G,x,z,w,I,F,J,u,r,q,p,o;for(G=0,x=s.faces.length;G<x;G++){z=s.faces[G];w=K.geometry.faces[z];I=w.color;F=w.vertexNormals;J=w.normal;u=K.geometry.uvs[z];if(w instanceof THREE.Face3){r=K.geometry.vertices[w.a].position;q=K.geometry.vertices[w.b].position;p=K.geometry.vertices[w.c].position;A.push(r.x,r.y,r.z);A.push(q.x,q.y,q.z);A.push(p.x,p.y,p.z);if(F.length==3){H.push(F[0].x,F[0].y,F[0].z);H.push(F[1].x,F[1].y,F[1].z);H.push(F[2].x,F[2].y,F[2].z)}else{H.push(J.x,J.y,J.z);H.push(J.x,J.y,J.z);H.push(J.x,J.y,J.z)}t.push(I.r,I.g,I.b,I.a);t.push(I.r,I.g,I.b,I.a);t.push(I.r,I.g,I.b,I.a);if(u){D.push(u[0].u,u[0].v);D.push(u[1].u,u[1].v);D.push(u[2].u,u[2].v)}C.push(y,y+1,y+2);E.push(y,y+1);E.push(y,y+2);E.push(y+1,y+2);y+=3}else{if(w instanceof THREE.Face4){r=K.geometry.vertices[w.a].position;q=K.geometry.vertices[w.b].position;p=K.geometry.vertices[w.c].position;o=K.geometry.vertices[w.d].position;A.push(r.x,r.y,r.z);A.push(q.x,q.y,q.z);A.push(p.x,p.y,p.z);A.push(o.x,o.y,o.z);if(F.length==4){H.push(F[0].x,F[0].y,F[0].z);H.push(F[1].x,F[1].y,F[1].z);H.push(F[2].x,F[2].y,F[2].z);H.push(F[3].x,F[3].y,F[3].z)}else{H.push(J.x,J.y,J.z);H.push(J.x,J.y,J.z);H.push(J.x,J.y,J.z);H.push(J.x,J.y,J.z)}t.push(I.r,I.g,I.b,I.a);t.push(I.r,I.g,I.b,I.a);t.push(I.r,I.g,I.b,I.a);t.push(I.r,I.g,I.b,I.a);if(u){D.push(u[0].u,u[0].v);D.push(u[1].u,u[1].v);D.push(u[2].u,u[2].v);D.push(u[3].u,u[3].v)}C.push(y,y+1,y+2);C.push(y,y+2,y+3);E.push(y,y+1);E.push(y,y+2);E.push(y,y+3);E.push(y+1,y+2);E.push(y+2,y+3);y+=4}}}if(!A.length){return}s.__webGLVertexBuffer=c.createBuffer();c.bindBuffer(c.ARRAY_BUFFER,s.__webGLVertexBuffer);c.bufferData(c.ARRAY_BUFFER,new Float32Array(A),c.STATIC_DRAW);s.__webGLNormalBuffer=c.createBuffer();c.bindBuffer(c.ARRAY_BUFFER,s.__webGLNormalBuffer);c.bufferData(c.ARRAY_BUFFER,new Float32Array(H),c.STATIC_DRAW);s.__webGLColorBuffer=c.createBuffer();c.bindBuffer(c.ARRAY_BUFFER,s.__webGLColorBuffer);c.bufferData(c.ARRAY_BUFFER,new Float32Array(t),c.STATIC_DRAW);s.__webGLUVBuffer=c.createBuffer();c.bindBuffer(c.ARRAY_BUFFER,s.__webGLUVBuffer);c.bufferData(c.ARRAY_BUFFER,new Float32Array(D),c.STATIC_DRAW);s.__webGLFaceBuffer=c.createBuffer();c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,s.__webGLFaceBuffer);c.bufferData(c.ELEMENT_ARRAY_BUFFER,new Uint16Array(C),c.STATIC_DRAW);s.__webGLLineBuffer=c.createBuffer();c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,s.__webGLLineBuffer);c.bufferData(c.ELEMENT_ARRAY_BUFFER,new Uint16Array(E),c.STATIC_DRAW);s.__webGLFaceCount=C.length;s.__webGLLineCount=E.length};this.renderMesh=function(p,t){var o,q,v,u,r,w,s;for(var v in p.materialFaces){r=p.materialFaces[v];u=p.material[v];if(!u){continue}if(!r.__webGLVertexBuffer){this.createBuffers(p,v)}for(o=0,q=p.material.length;o<q;o++){u=p.material[o];if((u instanceof THREE.MeshBitmapUVMappingMaterial||u instanceof THREE.MeshFaceColorFillMaterial||u instanceof THREE.MeshColorFillMaterial)&&!(o==v||v==u.decalIndex)){continue}if(u instanceof THREE.MeshColorFillMaterial){color=u.color;c.uniform4f(d.uniformColor,color.r*color.a,color.g*color.a,color.b*color.a,color.a);c.uniform1i(d.material,a)}else{if(u instanceof THREE.MeshColorStrokeMaterial){s=u.lineWidth;color=u.color;c.uniform4f(d.uniformColor,color.r*color.a,color.g*color.a,color.b*color.a,color.a);c.uniform1i(d.material,n)}else{if(u instanceof THREE.MeshFaceColorFillMaterial){c.uniform1i(d.material,f)}else{if(u instanceof THREE.MeshFaceColorStrokeMaterial){s=u.lineWidth;c.uniform1i(d.material,j)}else{if(u instanceof THREE.MeshBitmapUVMappingMaterial){if(!u.__webGLTexture&&u.loaded){u.__webGLTexture=c.createTexture();c.bindTexture(c.TEXTURE_2D,u.__webGLTexture);c.texImage2D(c.TEXTURE_2D,0,c.RGBA,c.RGBA,c.UNSIGNED_BYTE,u.bitmap);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,c.LINEAR);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,c.LINEAR_MIPMAP_LINEAR);c.generateMipmap(c.TEXTURE_2D);c.bindTexture(c.TEXTURE_2D,null)}c.activeTexture(c.TEXTURE0);c.bindTexture(c.TEXTURE_2D,u.__webGLTexture);c.uniform1i(d.diffuse,0);c.uniform1i(d.material,i)}}}}}c.bindBuffer(c.ARRAY_BUFFER,r.__webGLVertexBuffer);c.vertexAttribPointer(d.position,3,c.FLOAT,false,0,0);c.bindBuffer(c.ARRAY_BUFFER,r.__webGLNormalBuffer);c.vertexAttribPointer(d.normal,3,c.FLOAT,false,0,0);c.bindBuffer(c.ARRAY_BUFFER,r.__webGLColorBuffer);c.vertexAttribPointer(d.color,4,c.FLOAT,false,0,0);if(u instanceof THREE.MeshBitmapUVMappingMaterial){c.bindBuffer(c.ARRAY_BUFFER,r.__webGLUVBuffer);c.enableVertexAttribArray(d.uv);c.vertexAttribPointer(d.uv,2,c.FLOAT,false,0,0)}else{c.disableVertexAttribArray(d.uv)}if(u instanceof THREE.MeshBitmapUVMappingMaterial||u instanceof THREE.MeshFaceColorFillMaterial||u instanceof THREE.MeshColorFillMaterial){c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,r.__webGLFaceBuffer);c.drawElements(c.TRIANGLES,r.__webGLFaceCount,c.UNSIGNED_SHORT,0)}else{if(u instanceof THREE.MeshColorStrokeMaterial||u instanceof THREE.MeshFaceColorStrokeMaterial){c.lineWidth(s);c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,r.__webGLLineBuffer);c.drawElements(c.LINES,r.__webGLLineCount,c.UNSIGNED_SHORT,0)}}}}};this.setupMatrices=function(o,p){p.autoUpdateMatrix&&p.updateMatrix();o.autoUpdateMatrix&&o.updateMatrix();e.multiply(p.matrix,o.matrix);d.viewMatrixArray=new Float32Array(e.flatten());d.projectionMatrixArray=new Float32Array(p.projectionMatrix.flatten());k=THREE.Matrix4.makeInvert3x3(o.matrix).transpose();d.normalMatrixArray=new Float32Array(k.m);c.uniformMatrix4fv(d.viewMatrix,false,d.viewMatrixArray);c.uniformMatrix4fv(d.projectionMatrix,false,d.projectionMatrixArray);c.uniformMatrix3fv(d.normalMatrix,false,d.normalMatrixArray);c.uniformMatrix4fv(d.objMatrix,false,new Float32Array(o.matrix.flatten()))};this.render=function(s,r){var t,q,p;if(this.autoClear){this.clear()}this.setupLights(s);for(t=0,q=s.objects.length;t<q;t++){p=s.objects[t];this.setupMatrices(p,r);if(p instanceof THREE.Mesh){this.renderMesh(p,r)}else{if(p instanceof THREE.Line){}else{if(p instanceof THREE.Particle){}}}}};function h(){try{c=m.getContext("experimental-webgl",{antialias:true})}catch(o){}if(!c){alert("WebGL not supported");throw"cannot create webgl context"}c.clearColor(0,0,0,1);c.clearDepth(1);c.enable(c.DEPTH_TEST);c.depthFunc(c.LEQUAL);c.enable(c.BLEND);c.blendFunc(c.ONE,c.ONE_MINUS_SRC_ALPHA);c.clearColor(0,0,0,0)}function g(){d=c.createProgram();c.attachShader(d,b("fragment",["#ifdef GL_ES","precision highp float;","#endif","uniform sampler2D diffuse;","uniform vec4 uniformColor;","varying vec2 vertexUv;","varying vec4 vertexColor;","varying vec3 lightWeighting;","varying vec3 vNormal;","uniform int material;","void main(){","if(material==4) {","vec4 texelColor = texture2D(diffuse, vertexUv);","gl_FragColor = vec4(texelColor.rgb * lightWeighting, texelColor.a);","} else if(material==3) {","gl_FragColor = vec4(vertexColor.rgb * lightWeighting, vertexColor.a);","} else if(material==2) {","gl_FragColor = vec4(vertexColor.rgb * lightWeighting, vertexColor.a);","} else if(material==1) {","gl_FragColor = vec4(uniformColor.rgb * lightWeighting, uniformColor.a);","} else {","gl_FragColor = vec4(uniformColor.rgb * lightWeighting, uniformColor.a);","}","}"].join("\n")));c.attachShader(d,b("vertex",["attribute vec3 position;","attribute vec3 normal;","attribute vec4 color;","attribute vec2 uv;","uniform bool enableLighting;","uniform vec3 ambientColor;","uniform vec3 directionalColor;","uniform vec3 lightingDirection;","uniform vec3 pointColor;","uniform vec3 pointPosition;","uniform mat4 viewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 objMatrix;","uniform mat3 normalMatrix;","varying vec4 vertexColor;","varying vec2 vertexUv;","varying vec3 lightWeighting;","varying vec3 vNormal;","void main(void) {","vec4 mvPosition = viewMatrix * vec4( position, 1.0 );","vec4 mPosition = objMatrix * vec4( position, 1.0 );","vec3 transformedNormal = normalize(normalMatrix * normal);","if(!enableLighting) {","lightWeighting = vec3(1.0, 1.0, 1.0);","} else {","vec3 pointLight = normalize(pointPosition.xyz - mPosition.xyz);","float directionalLightWeighting = max(dot(transformedNormal, normalize(lightingDirection)), 0.0);","float pointLightWeighting = max(dot(transformedNormal, pointLight), 0.0);","lightWeighting = ambientColor + directionalColor * directionalLightWeighting + pointColor * pointLightWeighting;","}","vNormal = transformedNormal;","vertexColor = color;","vertexUv = uv;","gl_Position = projectionMatrix * mvPosition;","}"].join("\n")));c.linkProgram(d);if(!c.getProgramParameter(d,c.LINK_STATUS)){alert("Could not initialise shaders")}c.useProgram(d);d.viewMatrix=c.getUniformLocation(d,"viewMatrix");d.projectionMatrix=c.getUniformLocation(d,"projectionMatrix");d.normalMatrix=c.getUniformLocation(d,"normalMatrix");d.objMatrix=c.getUniformLocation(d,"objMatrix");d.enableLighting=c.getUniformLocation(d,"enableLighting");d.ambientColor=c.getUniformLocation(d,"ambientColor");d.directionalColor=c.getUniformLocation(d,"directionalColor");d.lightingDirection=c.getUniformLocation(d,"lightingDirection");d.pointColor=c.getUniformLocation(d,"pointColor");d.pointPosition=c.getUniformLocation(d,"pointPosition");d.material=c.getUniformLocation(d,"material");d.uniformColor=c.getUniformLocation(d,"uniformColor");d.color=c.getAttribLocation(d,"color");c.enableVertexAttribArray(d.color);d.position=c.getAttribLocation(d,"position");c.enableVertexAttribArray(d.position);d.normal=c.getAttribLocation(d,"normal");c.enableVertexAttribArray(d.normal);d.uv=c.getAttribLocation(d,"uv");c.enableVertexAttribArray(d.uv);d.diffuse=c.getUniformLocation(d,"diffuse");c.uniform1i(d.diffuse,0);d.viewMatrixArray=new Float32Array(16);d.projectionMatrixArray=new Float32Array(16)}function b(p,o){var q;if(p=="fragment"){q=c.createShader(c.FRAGMENT_SHADER)}else{if(p=="vertex"){q=c.createShader(c.VERTEX_SHADER)}}c.shaderSource(q,o);c.compileShader(q);if(!c.getShaderParameter(q,c.COMPILE_STATUS)){alert(c.getShaderInfoLog(q));return null}return q}};THREE.RenderableFace3=function(){this.v1=new THREE.Vector2();this.v2=new THREE.Vector2();this.v3=new THREE.Vector2();this.centroidWorld=new THREE.Vector3();this.normalWorld=new THREE.Vector3();this.z=null;this.color=null;this.material=null};THREE.RenderableFace4=function(){this.v1=new THREE.Vector2();this.v2=new THREE.Vector2();this.v3=new THREE.Vector2();this.v4=new THREE.Vector2();this.centroidWorld=new THREE.Vector3();this.normalWorld=new THREE.Vector3();this.z=null;this.color=null;this.material=null};THREE.RenderableParticle=function(){this.x=null;this.y=null;this.z=null;this.rotation=null;this.scale=new THREE.Vector2();this.color=null;this.material=null};THREE.RenderableLine=function(){this.v1=new THREE.Vector2();this.v2=new THREE.Vector2();this.z=null;this.color=null;this.material=null};

/**
 * Application log
 * 
 * Dependencies:
 * 		- None
 * 
 * @classDescription Log for application.
 * @namespace $UTIL
 */

// Define $UTIL namespace
if(typeof($UTIL) == "undefined") {	
	self.$UTIL = new function() {}
}

// Define AppLog class under $UTIL namesapce
if(typeof($UTIL.AppLog) == "undefined") {
	
	self.$UTIL.AppLog = new function() {
		
		/**
		 * Print debug message
		 * @param {Object} s - message to print
		 */
		this.Debug = function(s) {
			try {
				console.log("@"+s);
			} catch(e) {
				// fail silently
			}
		}
			
	}
}

/**
 * Math library
 * @namespace $UTIL
 */
// Define $UTIL namespace
if(typeof($UTIL) == "undefined") {	
	self.$UTIL = new function() {}
}

// Define Math under $UTIL namespace
if (typeof($UTIL.Math) == "undefined") {

	self.$UTIL.Math = new function(){
	
		this.Round = function(num, dec){
			return (Math.round((num) * Math.pow(10, dec)) / Math.pow(10, dec));
		}
		
		this.RandomInt = function(min, max){
			return ((Math.floor(Math.random() * (max - (min - 1)))) + min);
		}
		
		this.RandomFloat = function(min, max){
			return ((Math.random() * (max - (min))) + min);
		}
		
		this.RandomNonZeroNumber = function(min, max){
			var c = 0;
			
			while (c == 0) {
				c = this.RandomNumber(min, max);
			}
			
			return c;
		}
		
		
		
		this.degToRad = Math.PI / 180;
		this.radToDeg = 180 / Math.PI;
		
		
		// Bez Curve
		this.B1 = function(t){
			return t * t * t;
		}
		
		this.B2 = function(t){
			return 3 * t * t * (1 - t);
		}
		
		this.B3 = function(t){
			return (3 * t * (1 - t) * (1 - t));
		}
		
		this.B4 = function(t){
			return (1 - t) * (1 - t) * (1 - t);
		}
		
		this.BezierCurve = function(distance, cpStart, cpStartDirection, cpEndDirection, cpEnd){
			var point = new this.Point2D();
			
			point.x = (cpStart.x * this.B1(distance)) + (cpStartDirection.x * this.B2(distance)) +
			(cpEndDirection.x * this.B3(distance)) +
			(cpEnd.x * this.B4(distance));
			
			point.y = (cpStart.y * this.B1(distance)) + (cpStartDirection.y * this.B2(distance)) +
			(cpEndDirection.y * this.B3(distance)) +
			(cpEnd.y * this.B4(distance));
			
			return point;
		}
		
		this.Point2D = function(x, y){
			if (!x) 
				var x = 0;
			if (!y) 
				var y = 0;
			return {
				x: x,
				y: y
			};
		}
		
	}
}

Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

Array.prototype.RemoveObject = function(object) {
	var retVal = false;
    var index = -1;

    for (var i = 0; i < this.length; i++) {
        if (this[i] == object) {
            index = i;
            break;
        }
    }

    if (index != -1) {
        this.remove(index);
        retVal = true;
    }

    return retVal;
}

Array.prototype.contains = function(object) {
	var retVal = false;
	
	for (var i = 0; i < this.length; i++) {
        if (this[i] == object) {
            retVal = true;
            break;
        }
    }
	
	return retVal;
	
}

Array.prototype.pop = function(object) {
	
	var retVal = null;
	
	if(object) {
		this.RemoveObject(object);
		retVal = object;
	} else {
		retVal = this[this.length-1];
		this.remove(this.length-1);
	}
	
	return retVal;
}

Array.prototype.clone = function() {
	
	return this.slice(0);
	
}

function DeepCloneObject(obj) {
	var index, _index, tmp;
	
	if(typeof obj.constructor !== 'object') {
		return obj;
	} else {
		if (obj.concat) {
			tmp = [];
			for (index = 0, _index = obj.length; index < _index; index++) {
				tmp[index] = arguments.callee(obj[index]);
			}
			
		} else {
			tmp = {};
			for(index in obj) {
				tmp[index] = arguments.callee(obj[index]);
			}
		}
		return tmp;		
	}
}


Object.prototype.cloneObject = function() {
	
  var newObj = (this instanceof Array) ? [] : {};
  
  for (i in this) {
  	
    if (i == 'cloneObject') continue;
	
    if (this[i] && typeof this[i] == "object") {
    
		newObj[i] = this[i].cloneObject();
		
    } else {
		
		newObj[i] = this[i]
		
	} 
  } 
  
  return newObj;
}

// Define $UTIL namespace
if(typeof($UTIL) == "undefined") {	
	self.$UTIL = new function() {}
}

// Define $UTIL.Keyboard 
if(typeof($UTIL.Keyboard) == "undefined") {
    self.$UTIL.Keyboard = new function () {

        /*  LETTERS ---------------------------------------------------------*/
        this.KEY_A = 65;
        this.KEY_B = 66;
        this.KEY_C = 67;
        this.KEY_D = 68;
        this.KEY_E = 69;
        this.KEY_F = 70;
        this.KEY_G = 71;
        this.KEY_H = 72;
        this.KEY_I = 73;
        this.KEY_J = 74;
        this.KEY_K = 75;
        this.KEY_L = 76;
        this.KEY_M = 77;
        this.KEY_N = 78;
        this.KEY_O = 79;
        this.KEY_P = 80;
        this.KEY_Q = 81;
        this.KEY_R = 82;
        this.KEY_S = 83;
        this.KEY_T = 84;
        this.KEY_U = 85;
        this.KEY_V = 86;
        this.KEY_W = 87;
        this.KEY_X = 88;
        this.KEY_Y = 89;
        this.KEY_Z = 90;


        /*  NUMBER ROW ------------------------------------------------------*/
        this.KEY_TILDA = 192;
        this.KEY_0 = 48;
        this.KEY_1 = 49;
        this.KEY_2 = 50;
        this.KEY_3 = 51;
        this.KEY_4 = 52;
        this.KEY_5 = 53;
        this.KEY_6 = 54;
        this.KEY_7 = 55;
        this.KEY_8 = 56;
        this.KEY_9 = 57;
        this.KEY_MINUS_NUMROW = 189;
        this.KEY_PLUS_NUMROW = 187;
        this.KEY_BACKSPACE = 8;

        /*  ARROW KEYS ------------------------------------------------------*/
        this.KEY_UP = 38;
        this.KEY_DOWN = 40;
        this.KEY_LEFT = 37;
        this.KEY_RIGHT = 39;

        /*  NUMBER PAD ------------------------------------------------------*/
        this.KEY_PLUS_NUMPAD = 107
        this.KEY_MINUS_NUMPAD = 109;

        this.KEY_LEFT_NUMPAD = 52;
        this.KEY_RIGHT_NUMPAD = 54;
        this.KEY_UP_NUMPAD = 56;
        this.KEY_DOWN_NUMPAD = 50;

        /*  OTHER -----------------------------------------------------------*/
        this.KEY_RIGHT_CARET = 46;
        this.KEY_LEFT_CARET = 44;
        this.KEY_ENTER = 13;
        this.KEY_ESCAPE = 27;
        this.KEY_TAB = 9;
        this.KEY_SHIFT = 16;
        this.KEY_PAGE_UP = 33;
        this.KEY_PAGE_DOWN = 34;
        this.KEY_LEFT_BRACE = 219;
        this.KEY_RIGHT_BRACE = 221;
        this.KEY_BACK_SLASH = 220;
        this.KEY_DELETE = 46;



    }
}


/**
 * FpsData.js
 * 
 * @classDescription - This class keeps track of frame rate performance.
 * @dependencies - None
 * @author Seth McLaughlin
 */

// Define $UTIL namespace
if(typeof($UTIL) == "undefined") {	
	self.$UTIL = new function() {}
}

// Define FpsData under $UTIL namespace
if (typeof($UTIL.FpsData) == "undefined") {

    self.$UTIL.FpsData = function () {

        var second; 			// The current second - increase framerate value every update while this value remains unchanged
        var framesThisSecond; 	// Number of frames rendered this second
        var frameRate; 			// The current frame rate
        var lastBeginFrameTime; // Time (ms) of last BeginFrame call
        var frameTime;          // Time in frame (between BeginFrame and EndFrame)        
        var lastEndFrameTime;   // Time end frame last called
        var frameTimeLastUpdated; // Time last updated frame time
        var frameCount;         // Number of frames rendered
        var startTime;          // Time first BeginFrame was called

        Object.defineProperties(
			this,
            {
                "Fps":                                      // Current frame rate, capped at 60
			    {
			    writeable: false,
			    configurable: false,
			    enumerable: true,
			    get: function () {
			        var fps = Math.min(frameRate, 60);

			        if (fps > 57) {
			            fps = Math.round(fps / 10) * 10;
			        }

			        return fps;

			    }
			},

                "AvgFps":                               // AVG fps
			    {
			    writeable: false,
			    configurable: false,
			    enumerable: true,
			    get: function () {
			        var elapsedTime = (new Date().getTime() - startTime);
			        
			            var avgfps = frameCount / elapsedTime;

			            avgfps = Math.round(avgfps * 1000);
			        

			        return avgfps;

			    }
			},

			    "FrameCount":                               // Total frame count
			    {
			    writeable: false,
			    configurable: false,
			    enumerable: true,
			    get: function () {
			        return frameCount;

			    }
			},

                "FrameTime":                                // Average time spent executing frame update code (between beginframe and endframe)
                {
                writeable: false,
                configurable: false,
                enumerable: true,
                get: function () {
                    if (frameTime != undefined) {
                        return frameTime;
                    } else {
                        return 0;
                    }
                }
            }
        }
		);

        /**
        * Begin frame - called when frame rendering begins
        */
        this.BeginFrame = function () {

            var delta; 	// Delta time (ms) since last BeginFrame()
            var now; 	// Date object 

            now = new Date();

            if (typeof startTime == "undefined") {
                startTime = now.getTime();
            }

            delta = now.getTime() - lastBeginFrameTime;

            lastBeginFrameTime = now.getTime();

            if (lastBeginFrameTime != undefined && lastBeginFrameTime != undefined) {

            }

            return delta;
        }

        /**
        * End frame - called when frame rendering ends
        */
        this.EndFrame = function () {

            var now; // Date object

            now = new Date();

            if (now.getSeconds() == second) {
                framesThisSecond++;
            }
            else {
                second = now.getSeconds();
                frameRate = framesThisSecond;
                framesThisSecond = 1;
            }

            lastEndFrameTime = now.getTime();

            if (lastBeginFrameTime != undefined && lastEndFrameTime != undefined) {
                LogFrameTime(lastEndFrameTime - lastBeginFrameTime);
            }

            frameCount++;
        }

        /**
        * Log frame time
        */
        var LogFrameTime = function (_time) {

            var now = new Date().getTime();

            if (frameTimeLastUpdated == undefined) {
                frameTimeLastUpdated = now;
                frameTime = _time;
            } else if (now - frameTimeLastUpdated > 1000) {
                frameTimeLastUpdated = now;
                frameTime = _time;
            }
        }

        /**
        * Constructor
        */
        second = new Date().getSeconds();
        lastBeginFrameTime = new Date().getTime();
        framesThisSecond = 0;
        frameRate = 0;
        frameCount = 0;
    }
}



/**
 * Animate a single value over time, supports ease in / ease out
 * @param {Object} _startValue - The start value
 * @param {Object} _endValue - The end value
 * @param {Object} _speed - Speed, or number of iterations. Specify as fraction; Example: value of 1/50 causes animation to take 50 iterations to complete
 * @param {Object} _easeIn - ammount to ease in on the animation. Specify as float, 0-1. Example: value of 1 results in maximum ease in
 * @param {Object} _easeOut - ammount to ease in on the animation. Specify as float, 0-1. Example: value of 1 results in maximum ease out
 * @param {Object} _completeCallback - function that gets called when animation completes 
 */



self.Animator = function(_startValue, _endValue, _speed, _loop, _easeIn, _easeOut, _completeCallback, _timebased){
	
	// Load Dependencies
	// $UTIL.Script.Load("Math.js", "SMS");
	// $UTIL.Script.Load("Callback.js", "SMS");
		
	var startValue;			// Start value
	var endValue;			// End value
	var pathStart;			// Point for start of path
	var pathEnd;			// Point for end of path
	var pathStartCP;		// Start control point
	var pathEndCP;			// End control point
	var speed;				// Speed of animation
	var distance;			// Distance of animation
	var callback;			// Callback to call when animation completes
	var complete;			// Boolean indicating if animation is complete
	var timebased;			// Whether animation is time based (or frame based)
	var loop;				// Whether animation should loop
    var startTime;          // Time first nextValue called
    var lastNextValueTime;  // Last time nextValue was called
		
	Object.defineProperties(
		this,
		{
			"Complete" :				// Boolean flag indicating animation is complete
			{
				writeable : false,
				configurable : false,
				enumerable : true,
				get : function() {
					return complete;
				}
			},

            "Speed" :
            {
                writeable : true,
                enumerable : true,
                get : function() {
                    return speed;
                },
                set : function(value) {
                    speed = value;
                }
            },

            "ElapsedTime" :
            {
                writeable : false,
                enumerable : true,
                get : function() {
                    if(typeof startTime != "undefined" && typeof lastNextValueTime != "undefined") {
                        return lastNextValueTime - startTime;
                    } else {
                        return 0;
                    }
                }
            }
		}
	);
	
	startValue = _startValue;
	endValue = _endValue;
	speed = _speed;
	loop = _loop;
	timebased = _timebased;
	callback = _completeCallback;
		
	pathStart = new $UTIL.Math.Point2D(0, 0);
	pathEnd = new $UTIL.Math.Point2D(1, 1);
		
	pathStartCP = new $UTIL.Math.Point2D(.5 - (_easeIn * .5), .5);
	pathEndCP = new $UTIL.Math.Point2D(.5 + (_easeOut * .5), .5);

	distance = 1;
	complete = false;
		
	/**
		* Next value
		*/
	this.NextValue = function(_dt) {

        if(typeof startTime == "undefined") {
            startTime = new Date().getTime();
        }
		
		var delta = speed;
			
		if (_dt) {
			delta = speed * _dt;
		}
			
		distance = Math.max(0, distance - (delta));
			
		value = ($UTIL.Math.BezierCurve(distance, pathStart, pathStartCP, pathEndCP, pathEnd).x * (endValue - startValue)) + startValue;

        if(!complete) {
            lastNextValueTime = new Date().getTime();
        }
			
		if (distance == 0 && !complete) {
			complete = true;

            
                if (typeof(callback) == "function") {
                    callback();
                }
            
		}
			
		if(distance == 0 && loop) {
				
				
				var start = startValue;
				var end = endValue;
					
				startValue = end;
				endValue = start;
					
				distance = 1;
				
		}
			
		return value;
	}
}





/**
* Shooting Star
* @author Seth McLaughlin
*/
self.ShootingStar = function (_orientation) {

     var FRONT = 1;
     var BACK = 2;
     var LEFT = 3;
     var RIGHT = 4;

     var orientation = _orientation;

     var width = 129;
     var height = 30;
     var material = Materials.Star1.Material;

     var speed = 50;

     var mesh = new THREE.Mesh(new Plane(width, height, 3, 3), material );
     mesh.doubleSided = true;

     switch(orientation) {
        case FRONT:
            mesh.position = new THREE.Vector3(0, $UTIL.Math.RandomFloat(-500, 500), $UTIL.Math.RandomFloat(-2950, 950));
            mesh.rotation = new THREE.Vector3(.4, 0, 0);
        break;
        
        case BACK:
            mesh.position = new THREE.Vector3(0, $UTIL.Math.RandomFloat(-500, 500), $UTIL.Math.RandomFloat(-2950, 950));
            mesh.rotation = new THREE.Vector3(0, 180 * Math.PI / 180, 0);
        break;
        
        case LEFT:
            mesh.position = new THREE.Vector3($UTIL.Math.RandomFloat(-2950, 2950), $UTIL.Math.RandomFloat(-500, 500), -1000);
            mesh.rotation = new THREE.Vector3(0, 90 * Math.PI / 180, 0);
        break;
        
        case RIGHT: 
            mesh.position = new THREE.Vector3($UTIL.Math.RandomFloat(-2950, 2950), $UTIL.Math.RandomFloat(-500, 500), -1000);
            mesh.rotation = new THREE.Vector3(0, -90 * Math.PI / 180, 0);
        break;
     } 
     

    AddToLayer(mesh, 2);

        this.Update = function() {

            var movementSpeed = speed * gSimSpeed;

            switch(orientation) {
        case FRONT:
            mesh.position.x += movementSpeed;
            mesh.position.y += movementSpeed / 2;

            
        break;
        
        case BACK:
            mesh.position.x += movementSpeed;
        break;
        
        case LEFT:
           mesh.position.z += movementSpeed;
        break;
        
        case RIGHT: 
            mesh.position.z += movementSpeed;
        break;
     } 
            
            if(mesh.position.x > 5000 || mesh.position.z > 2000) {
                RemoveFromLayer(mesh, 2);
                RemoveEntity(this);
            }
        }
}

/**
 * UA String parser
 */
// Define $UTIL namespace
if(typeof($UTIL) == "undefined") {	
	self.$UTIL = new function() {}
}

// Define UaStringParser under $UTIL namespace
if (typeof($UTIL.UaStringParser) == "undefined") {

    self.$UTIL.UaStringParser = new function () {

        /**
        * Constructor
        */
        var userAgentString; 	// The user agent string
        var browserNameIndex; 	// Index in UA of browser name 		
        var friendlyBrowserName; // Friendly browser name
        var browserVersion; 		// Browser version	

        userAgentString = navigator.userAgent.toLowerCase();
        friendlyBrowserName = "Unknown";
        browserVersion = 0;

        var version;

        // Parse UA string for browser name and version
        if (version = /MSIE (\d+\.\d+)/.exec(navigator.userAgent)) {
            friendlyBrowserName = "Internet Explorer";
            browserVersion = parseFloat(version[1]);
        } else if (version = /Firefox\/(\d+\.\d+)/.exec(navigator.userAgent)) {
            friendlyBrowserName = "Firefox";
            browserVersion = parseFloat(version[1]);
        } else if (version = /Chrome\/(\d+\.\d+)/.exec(navigator.userAgent)) {
            friendlyBrowserName = "Chrome";
            browserVersion = parseFloat(version[1]);
        } else if (version = /Opera.*Version\/(\d+\.\d+)/.exec(navigator.userAgent)) {
            friendlyBrowserName = "Opera";
            browserVersion = parseFloat(version[1]);
        } else if (version = /Version\/(\d+\.\d+).*Safari/.exec(navigator.userAgent)) {
            friendlyBrowserName = "Safari";
            browserVersion = parseFloat(version[1]);
        }


        /** 
        * UA string
        */
        Object.defineProperty(
			this,
			"UA",
			{
			    value: userAgentString,
			    configurable: false,
			    writeable: false,
			    enumerable: true
			}
		);

        /** 
        * Browser name property
        */
        Object.defineProperty(
			this,
			"BrowserName",
			{
			    value: friendlyBrowserName,
			    configurable: false,
			    writeable: false,
			    enumerable: true
			}
		);

        /** 
        * Browser version property
        */
        Object.defineProperty(
			this,
			"BrowserVersion",
			{
			    value: browserVersion,
			    configurable: false,
			    writeable: false,
			    enumerable: true
			}
		);
    }
}



/**
* HUD
* @author Seth McLaughlin
*/
self.HUD = function () {

    var titleImage = document.getElementById("Title");
    var titleImageWidth = parseInt(titleImage.getAttribute("width"));
    var titleImageHeight = parseInt(titleImage.getAttribute("height"));

    var blackoutOpacity = 1;
    var blackoutOpacityFade = new Animator(1, 0, .05);
    var blackoutOpacityFadeout = false;
    var introOffset = 0;

    setTimeout(function(){blackoutOpacityFadeout=true;}, 3000);
    
    this.opacity = 1;

    this.Draw = function (_ctx) {
        
        if(blackoutOpacityFadeout && !blackoutOpacityFade.Complete) {
            blackoutOpacity = blackoutOpacityFade.NextValue();            
        }
        
        if(this.opacity <= 0) {
            return;
        }
        
        var spacer = "       ";
        var text = "";

        var fpsText = "";

        var oVelocity = gEarth.OrbitalVelocity;        

        if(oVelocity != -1) {
            var score = oVelocity + " km/s";        
            fpsText = gFpsData.AvgFps;
        } else {
            var score = "Calculating...";
        }

        text += "Using ";
        text += $UTIL.UaStringParser.BrowserName + " " + $UTIL.UaStringParser.BrowserVersion;
        text += spacer;
        text += "Solar System Rotations: ";
        text += gFpsData.FrameCount;
        text += spacer;
        text += "FPS: ";
        text += fpsText;
        text += spacer;
        text += "Window Size: ";
        text += gScreen.width + " x " + gScreen.height;
        text += spacer;
        text += "Press V to switch view and M to toggle miniview.";
        text += spacer;
        text += "Space photos courtesy of NASA";

        _ctx.save();
            _ctx.globalAlpha = 1;
            _ctx.fillStyle = "white";
            _ctx.fillText(text, 15, gScreen.height - 11);
            _ctx.font = "22px sans-serif";
            _ctx.fillText("GALACTIC SCORE " + score, 15, gScreen.height - 28);

            if(blackoutOpacity > 0) {
            introOffset += .09;
            _ctx.globalAlpha = blackoutOpacity;
            _ctx.fillStyle = "black";
            _ctx.fillRect(0, 0, _ctx.canvas.width, _ctx.canvas.height);

            _ctx.globalAlpha = blackoutOpacity * .85;
            _ctx.drawImage(titleImage, (gScreen.centerX - titleImageWidth / 2) + introOffset, gScreen.centerY - titleImageHeight / 2);

            }
        _ctx.restore();


       

    }
}

/**
* Materials Manager
*/
self.Materials = new function () {

    //----- Load image as material  -----------------------------------------//
    var LoadImageMaterial = function (path) {

        var canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;

        var material = new THREE.MeshBitmapMaterial(canvas);
        var image = new Image();

        image.onload = function () {
            material.bitmap = this;
        };

        image.src = path;
        return material;

    }    
  
    /* Image materials -----------------------------------------*/
    this.IE = { Material: LoadImageMaterial("textures/IELogo.png") };
    this.Earth = { Material: LoadImageMaterial("textures/earthBlue.jpg") };
    this.Moon = { Material: LoadImageMaterial("textures/moon.jpg") };
    this.MoonGlow = { Material: LoadImageMaterial("textures/moonglow.png") };
    this.EarthGlow = { Material: LoadImageMaterial("textures/earthglow.png") };
    this.MarsGlow = { Material: LoadImageMaterial("textures/marsglow.png") };
    this.VenusGlow = { Material: LoadImageMaterial("textures/mercuryglow.png") };
    this.MercuryGlow = { Material: LoadImageMaterial("textures/mercuryglow.png") };        
    this.Mercury = { Material: LoadImageMaterial("textures/mercury.jpg") };
    this.Venus = { Material: LoadImageMaterial("textures/venus.jpg") };
    this.Mars = { Material: LoadImageMaterial("textures/mars.jpg") };
    this.Jupiter = { Material: LoadImageMaterial("textures/jupiter.jpg") }; 

    this.Ring1 = { Material: LoadImageMaterial("textures/ring.png") };
    this.SunStatic = { Material: LoadImageMaterial("textures/sun.jpg") };
    this.SunFlat = { Material: LoadImageMaterial("textures/sunflat.png") };
    this.Space = { Material: LoadImageMaterial("textures/space.jpg") };
    this.Star1 = { Material: LoadImageMaterial("textures/star.png") };

    /* Solid color materials ------------------------------------*/
    this.Silver = { Material: new THREE.MeshColorFillMaterial(0xb6b6b6, 1) };
    this.Gray = { Material: new THREE.MeshColorFillMaterial(0x3d3d3d, .6) };    
    this.Red = { Material: new THREE.MeshColorFillMaterial(0xff0000, 1) };
    this.Green = { Material: new THREE.MeshColorFillMaterial(0x40890a, 1) };
    this.Yellow = { Material: new THREE.MeshColorFillMaterial(0xfcff00, 1) };
    this.Orange = { Material: new THREE.MeshColorFillMaterial(0xff971d, 1) };



}

/**
* Entity
* @author Seth McLaughlin
*/
self.Entity = function () {

    this.Update = function () {

    }
}

/**
 * @author mr.doob / http://mrdoob.com/
 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Sphere.as
 */

var Sphere = function ( radius, segments_width, segments_height, smooth ) {

	THREE.Geometry.call( this );

	var gridX = segments_width || 8,
	gridY = segments_height || 6;

	var i, j;
	var iHor = Math.max( 3, gridX );
	var iVer = Math.max( 2, gridY );
	var aVtc = [];

	for ( j = 0; j < ( iVer + 1 ) ; j++ ) {

		var fRad1 = j / iVer;
		var fZ = radius * Math.cos( fRad1 * Math.PI );
		var fRds = radius * Math.sin( fRad1 * Math.PI );
		var aRow = [];
		var oVtx = 0;

		for ( i = 0; i < iHor; i++ ) {

			var fRad2 = 2 * i / iHor;
			var fX = fRds * Math.sin( fRad2 * Math.PI );
			var fY = fRds * Math.cos( fRad2 * Math.PI );

			if ( !( ( j == 0 || j == iVer ) && i > 0 ) ) {

				oVtx = this.vertices.push( new THREE.Vertex( new THREE.Vector3( fY, fZ, fX ) ) ) - 1;

			}

			aRow.push( oVtx );

		}

		aVtc.push( aRow );

	}

	var n1, n2, n3, iVerNum = aVtc.length;

	for ( j = 0; j < iVerNum; j++ ) {

		var iHorNum = aVtc[ j ].length;

		if ( j > 0 ) {

			for ( i = 0; i < iHorNum; i++ ) {

				var bEnd = i == ( iHorNum - 1 );
				var aP1 = aVtc[ j ][ bEnd ? 0 : i + 1 ];
				var aP2 = aVtc[ j ][ ( bEnd ? iHorNum - 1 : i ) ];
				var aP3 = aVtc[ j - 1 ][ ( bEnd ? iHorNum - 1 : i ) ];
				var aP4 = aVtc[ j - 1 ][ bEnd ? 0 : i + 1 ];

				var fJ0 = j / ( iVerNum - 1 );
				var fJ1 = ( j - 1 ) / ( iVerNum - 1 );
				var fI0 = ( i + 1 ) / iHorNum;
				var fI1 = i / iHorNum;

				var aP1uv = new THREE.UV( 1 - fI0, fJ0 );
				var aP2uv = new THREE.UV( 1 - fI1, fJ0 );
				var aP3uv = new THREE.UV( 1 - fI1, fJ1 );
				var aP4uv = new THREE.UV( 1 - fI0, fJ1 );

				if ( j < ( aVtc.length - 1 ) ) {
                    n1 = this.vertices[aP1].position.clone();
                    n2 = this.vertices[aP2].position.clone();
                    n3 = this.vertices[aP3].position.clone();
                    n1.normalize();
                    n2.normalize();
                    n3.normalize();

                    if ( smooth )
                        this.faces.push( new THREE.Face3( aP1, aP2, aP3, [new THREE.Vector3(n1.x,n1.y,n1.z), new THREE.Vector3(n2.x,n2.y,n2.z), new THREE.Vector3(n3.x,n3.y,n3.z)] ) );
                    else
                        this.faces.push( new THREE.Face3( aP1, aP2, aP3 ) );
                    
					this.uvs.push( [ aP1uv, aP2uv, aP3uv ] );

				}

				if ( j > 1 ) {

                    n1 = this.vertices[aP1].position.clone();
                    n2 = this.vertices[aP3].position.clone();
                    n3 = this.vertices[aP4].position.clone();
                    n1.normalize();
                    n2.normalize();
                    n3.normalize();

                    if ( smooth )
                        this.faces.push( new THREE.Face3( aP1, aP3, aP4, [new THREE.Vector3(n1.x,n1.y,n1.z), new THREE.Vector3(n2.x,n2.y,n2.z), new THREE.Vector3(n3.x,n3.y,n3.z)] ) );
                    else
                        this.faces.push( new THREE.Face3( aP1, aP3, aP4 ) );
                    
					this.uvs.push( [ aP1uv, aP3uv, aP4uv ] );

				}

			}
		}
	}

	this.computeCentroids();
	this.computeNormals();
}

Sphere.prototype = new THREE.Geometry();
Sphere.prototype.constructor = Sphere;


/**
* Planet
* @author Seth McLaughlin
*/
self.Planet = function (_radius, _detail, _orbitRadius, _orbitCenter, _orbitSpeed, _rotationSpeed, _material, _layer) {

    Entity.call(this);

    var $this = this;               // This reference
    var mesh;                       // MESH object representing Planet
    var radius = _radius;
    var position = new THREE.Vector3(0, 0, 0);
    var rotation = new THREE.Vector3(0, 0, 0);
    var material = _material;
    var direction = new THREE.Vector3(1, 1, 1);
    var speed = new THREE.Vector3(10, 10, 10);
    var orbitRadius = _orbitRadius;
    var orbitCenter = _orbitCenter;
    var orbitSpeed = _orbitSpeed;
    var rotationSpeed = _rotationSpeed;
    var layer = _layer;
    var orbitalVelocity = 0;
    var orbits = 0;
    var orbitStartTime = 0;
    var orbitTime = 0;
    var lastX = 0;
    var lastZ = 0;
    var lastCos = -100;
    var lastSin = -100;


    Object.defineProperties(
        this,
        {
            "Rotation": {
                get: function () {
                    return rotation;
                },
                set: function (value) {
                    rotation = value;
                }
            },

            "Position": {
                get: function () {
                    return mesh.position;
                },
                set: function (value) {
                    mesh.position = value;
                }
            },

            "Radius": {
                get: function () {
                    return radius;
                },
                set: function (value) {
                    radius = value;
                }
            },

            "Direction": {
                get: function () {
                    return direction;
                },
                set: function (value) {
                    direction = value;
                }
            },

            "Speed": {
                get: function () {
                    return speed;
                },
                set: function (value) {
                    speed = value;
                }
            },

            "Orbits": {
                get: function () {
                    return orbits;
                }                
            },

            "OrbitalVelocity": {
                get: function () {
                    var time = (orbitTime - orbitStartTime) / (1000*60*60);

                    if(time > 0 && orbits >= 2) {
                        return $UTIL.Math.Round((orbits/2) / time, 2);
                    } else {
                        return -1;
                    }
                }
            },

            "BoundingBox": {
                get: function () {
                    var box = mesh.geometry.bbox;
                    var x = mesh.position.x;
                    var y = mesh.position.y;
                    var z = mesh.position.z;

                    return {
                        x: [box.x[0] + x, box.x[1] + x],
                        y: [box.y[0] + y, box.y[1] + y],
                        z: [box.z[0] + z, box.z[1] + z]
                    };
                }
            }
        }
    );

    mesh = new THREE.Mesh(new Sphere(radius, _detail.x, _detail.y, true), material);
    mesh.position = position;
    mesh.rotation = rotation;
    mesh.overdraw = true;
    //mesh.doubleSided = true;
    AddToLayer(mesh, _layer);

    this.Update = function () {

        lastX = mesh.position.x;
        lastZ = mesh.position.z;

        if(orbitStartTime == 0) {
            orbitStartTime = new Date().getTime();
        }

        var t = gFpsData.FrameCount;
        var radius = orbitRadius;

        var centerpoint = orbitCenter;

        if(typeof orbitCenter == "function") {
            centerpoint = orbitCenter();
        }

        this.cos = Math.cos(t * orbitSpeed * gSimSpeed * Math.PI / 180);
        this.sin = Math.sin(t * orbitSpeed * gSimSpeed * Math.PI / 180);
        

        mesh.position = new THREE.Vector3(
            Math.cos(t * orbitSpeed * gSimSpeed * Math.PI / 180) * radius + centerpoint.x,
            centerpoint.y,
            Math.sin(t * orbitSpeed * gSimSpeed * Math.PI / 180) * radius + centerpoint.z
        );   

        var standardRotation = 1/50;

        mesh.rotation.x += standardRotation * rotationSpeed.x * gSimSpeed;
        mesh.rotation.y += standardRotation * rotationSpeed.y * gSimSpeed;
        mesh.rotation.z += standardRotation * rotationSpeed.z * gSimSpeed;

       
        if((lastCos >= 0 && this.cos <= 0 || lastSin >= 0 && this.sin <= 0) && new Date().getTime() - orbitStartTime > 3000) {
            orbits++;            
            orbitTime = new Date().getTime();
        }   

        lastCos = this.cos;
        lastSin = this.sin;

    }

}

self.Planet.prototype = new Entity();
self.Planet.prototype.constructor = Planet;

/**
* Wall
* @author Seth McLaughlin
*/
self.Wall = function (_width, _height, _position, _rotation, _material) {

    Entity.call(this);

    var $this = this;               // This reference
    var mesh;                       // MESH object representing wall
    var width = _width;
    var height = _height;
    var position = _position;
    var rotation = _rotation;
    var material = _material;

    Object.defineProperties(
        this,
        {
            "Mesh": {
                get: function () {
                    return mesh;
                }
            },

            "BoundingBox": {
                get: function () {
                    var box = mesh.geometry.bbox;
                    var x = mesh.position.x;
                    var y = mesh.position.y;
                    var z = mesh.position.z;

                    return {
                        x: [box.x[0] + x, box.x[1] + x],
                        y: [box.y[0] + y, box.y[1] + y],
                        z: [box.z[0] + z, box.z[1] + z]
                    };
                }
            }
        }
    );

    mesh = new THREE.Mesh(new Plane(width, height, 3, 3), material );
    mesh.position = position;
    mesh.rotation = rotation;
    mesh.overdraw = true;
    mesh.doubleSided = true;
    AddToLayer(mesh, 2);

}

self.Wall.prototype = new Entity();
self.Wall.prototype.constructor = Wall;


/**
* Galaxy
* @author Seth McLaughlin
*/
self.Galaxy = function () {


    var $this = this;
    var walls = [];

    Object.defineProperties(
        this,
        {
            "Walls": {
                get: function () {
                    return walls;
                }
            },

            "CenterPoint": {
                value : new THREE.Vector3(0, 0, -1000)
            }
        }
    );

    // Front Wall    
    walls.push(new Wall(5000, 3000, new THREE.Vector3(0, 0, -3000), new THREE.Vector3(0, 0, 0), Materials.Space.Material));
    
    // Back Wall
    walls.push(new Wall(5000, 3000, new THREE.Vector3(0, 0, 1000), new THREE.Vector3(0, 180 * Math.PI / 180, 0), Materials.Space.Material));
    
    // Left Wall
    walls.push(new Wall(4500, 4000, new THREE.Vector3(-3000, 0, -1000), new THREE.Vector3(0, 90 * Math.PI / 180, 0), Materials.Space.Material));
   
    // Right Wall
    walls.push(new Wall(4500, 4000, new THREE.Vector3(3000, 0, -1000), new THREE.Vector3(0, -90 * Math.PI / 180, 0), Materials.Space.Material));
    
    

}

/**
* Scene2D
* @author Seth McLaughlin
*/
self.Scene2D = function () {

    var $this = this;               // This reference
    var entities = [];

    Object.defineProperties(
        this,
        {
            "Entities": {
                get: function () {
                    return entities;
                }
            }
        }
        );

    this.Add = function (_entity) {
        entities.push(_entity);
    }

    this.Remove = function (_entity) {
        entities.pop(_entity);
    }


}




/**
* CanvasRenderer2D
* @author Seth McLaughlin
*/
self.CanvasRenderer2D = function () {

    var $this = this;                
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    Object.defineProperties(
        this,
        {
        "DomElement" : {
            get : function() {
            return canvas;
            }
        }
        }
        );

    this.Render = function (_scene) {
        ctx.save();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        _scene.Entities.forEach(
            function(entity) {
                entity.Draw(ctx);
            },
            this
            );
        ctx.restore();

    }

    this.SetSize = function(_width, _height) {
        canvas.width = _width;
        canvas.height = _height;
    }

}


/**
 * @author mr.doob / http://mrdoob.com/
 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Plane.as
 */

var Plane = function ( width, height, segments_width, segments_height ) {

	THREE.Geometry.call( this );

	var ix, iy,
	width_half = width / 2,
	height_half = height / 2,
	gridX = segments_width || 1,
	gridY = segments_height || 1,
	gridX1 = gridX + 1,
	gridY1 = gridY + 1,
	segment_width = width / gridX,
	segment_height = height / gridY;


	for( iy = 0; iy < gridY1; iy++ ) {

		for( ix = 0; ix < gridX1; ix++ ) {

			var x = ix * segment_width - width_half;
			var y = iy * segment_height - height_half;

			this.vertices.push( new THREE.Vertex( new THREE.Vector3( x, - y, 0 ) ) );

		}

	}

	for( iy = 0; iy < gridY; iy++ ) {

		for( ix = 0; ix < gridX; ix++ ) {

			var a = ix + gridX1 * iy;
			var b = ix + gridX1 * ( iy + 1 );
			var c = ( ix + 1 ) + gridX1 * ( iy + 1 );
			var d = ( ix + 1 ) + gridX1 * iy;

			this.faces.push( new THREE.Face4( a, b, c, d ) );
			this.uvs.push( [
						new THREE.UV( ix / gridX, iy / gridY ),
						new THREE.UV( ix / gridX, ( iy + 1 ) / gridY ),
						new THREE.UV( ( ix + 1 ) / gridX, ( iy + 1 ) / gridY ),
						new THREE.UV( ( ix + 1 ) / gridX, iy / gridY )
					] );

		}

	}

	this.computeCentroids();
	this.computeNormals();

}

Plane.prototype = new THREE.Geometry();
Plane.prototype.constructor = Plane;


/**
* Main simulation code
* @author Seth McLaughlin
*/

var gMainCamera;        
var gMiniCamera;
var gScene;         
var gRenderer;      
var gMiniRenderer;
var gRenderer2D;
var gScene2D;
var gFpsData;
var gMouse;
var gScreen;
var gGalaxy;
var gCamera1, gCamera2;

var gSimSpeed = 1.0;

var gLayers = [ { visible : true, objects : [] },
                { visible : true, objects : [] },
                { visible : true, objects : [] },
                { visible : true, objects : [] },
                { visible : true, objects : [] },
                { visible : true, objects : [] } ];

var gEntities = [];

var gSun;
var gMercury;
var gMercuryGlow = [];
var gVenus;
var gVenusGlow = [];
var gEarth;
var gEarthGlow = [];
var gMars;
var gMarsGlow = [];
var gMoon;
var gMoonGlow = [];


var gHUD;

var gView;

var gMiniViewOn;
var gFullScreen;


window.addEventListener("load", Main, false);

//  Handle window resize event ----------------------------------------------//
function OnWindowResize(e) {

    // Update gScreen object
    gScreen.width = window.innerWidth;
    gScreen.height = window.innerHeight;
    gScreen.centerX = gScreen.width / 2;
    gScreen.centerY = gScreen.height / 2;

    // Update gRenderer
    if(gRenderer) gRenderer.setSize(gScreen.width, gScreen.height);
    if(gRenderer2D) gRenderer2D.SetSize(gScreen.width, gScreen.height);

}

//  Initialize demo ---------------------------------------------------------//
function Main() {

    gFpsData = new $UTIL.FpsData();
    gMouse = { x: 0, y: 0 };
    gScreen = { width: 0, height: 0, centerX: 0, centerY: 0 };
    
    OnWindowResize(null);

    gCamera1 = new THREE.Camera( 45, gScreen.width / gScreen.height, 1, 10000 );
    gCamera1.position = new THREE.Vector3(500, 150, -1300);
    gCamera1.target.position = new THREE.Vector3(-790, -290, 0);
    
    gCamera2 = new THREE.Camera( 45, gScreen.width / gScreen.height, 1, 10000 );    
    gCamera2.position = new THREE.Vector3(-1000, 320, 0);
    gCamera2.target.position = new THREE.Vector3(0, 0, -1000);
    
    gScene = new THREE.Scene();
    gScene2D = new Scene2D();

    gGalaxy = new Galaxy();
    gMiniViewOn = true;

    gFullScreen = false;
    
    CreatePlanets();
    Create2DEntities();
    CreateEnvironmentalEffects();

    gRenderer2D = new CanvasRenderer2D();
    gRenderer2D.SetSize(gScreen.width, gScreen.height);

    gRenderer = new THREE.CanvasRenderer();    
    gRenderer.setSize(gScreen.width, gScreen.height);

    gMiniRenderer = new THREE.CanvasRenderer();
    gMiniRenderer.setSize(gScreen.width * .15, gScreen.height * .15);
    
    gRenderer.domElement.addEventListener("mouseover", OnRenderSurfaceMouseOver, false);
    gRenderer.domElement.addEventListener("mouseout", OnRenderSurfaceMouseOut, false);
    gRenderer.domElement.addEventListener("mousemove", OnRenderSurfaceMouseMove, false);
    

    document.body.appendChild(gRenderer.domElement);
    document.body.appendChild(gMiniRenderer.domElement);
    document.body.appendChild(gRenderer2D.DomElement);

    gRenderer.domElement.id = "mainview";
    gMiniRenderer.domElement.id = "miniview";
    gRenderer2D.DomElement.id = "view2d";
    
    window.addEventListener("keyup", OnKeyUp, false);
    window.addEventListener("resize", OnWindowResize, false);

    ToggleView();
    ToggleMiniView();
    
    setInterval(Loop, 16);
}

//  Create Environmental Effects ------------------------------------------------------//
function CreateEnvironmentalEffects() {

    var orientation = $UTIL.Math.RandomInt(1, 4);
    var star = new ShootingStar(orientation);
    AddEntity(star);
    
    setTimeout(CreateEnvironmentalEffects, $UTIL.Math.RandomInt(0, 5000));
}

//  Create 2D entities ------------------------------------------------------//
function Create2DEntities() {
    gHUD = new HUD();
    gScene2D.Add(gHUD);
}

//  Add entity --------------------------------------------------------------//
function AddEntity(_entity) {
    gEntities.push(_entity);
}

//  Remove entity -----------------------------------------------------------//
function RemoveEntity(_entity) {
    gEntities.pop(_entity);
}

//  Create planets in solar system ------------------------------------------//
function CreatePlanets() {

    gMercury = new Planet( 8, new THREE.Vector2(8, 8), 180, gGalaxy.CenterPoint, 1.6, new THREE.Vector3(0, 1, 0), Materials.Mercury.Material, 1 );
    gVenus = new Planet( 17, new THREE.Vector2(8, 8), 217, gGalaxy.CenterPoint, 1.18, new THREE.Vector3(0, 1, 0), Materials.Venus.Material, 1 );
    
    gEarth = new Planet( 20, new THREE.Vector2(12, 12), 300, gGalaxy.CenterPoint, 1, new THREE.Vector3(0, 1, 0), Materials.Earth.Material, 1 );
    gMoon = new Planet( 4, new THREE.Vector2(5, 5), 30, GetMoonOrbitCenter, .7, new THREE.Vector3(0, 1, 0), Materials.Moon.Material, 1 );

    gMars = new Planet( 9, new THREE.Vector2(8, 8), 450, gGalaxy.CenterPoint, .81, new THREE.Vector3(0, 1, 0), Materials.Mars.Material, 1 );
    
   
    AddEntity(gMercury);
    AddEntity(gVenus);
    AddEntity(gEarth);
    AddEntity(gMoon);
    AddEntity(gMars);
   
    var ring;

    // Sun
    for(var i = 0; i < 15; i++) {
        ring = new THREE.Mesh(new Plane(200, 200, 1, 1), Materials.Ring1.Material );
        ring.position = gGalaxy.CenterPoint;
//        ring.position.x += i * 10;
//        ring.position.y += i *10;
//        ring.position.z += i *10;
//        ring.rotation = new THREE.Vector3(i * 20, i * 20, i * 20);
        ring.rotation = new THREE.Vector3(i * 15, i * 15, 0);
        ring.doubleSided = true;
        AddToLayer(ring, 3);
    }

    // Moon glow
    for(var i = 0; i < 2; i++) {
        ring = new THREE.Mesh(new Plane(11.5, 11.5, 1, 1), Materials.MoonGlow.Material );
        
        ring.position.x = gMoon.Position.x + i * 10;
        ring.position.y = gMoon.Position.y + i *10;
        ring.position.z = gMoon.Position.z + i *10;
        ring.rotation = new THREE.Vector3(i * 20, i * 20, i * 20);
        ring.doubleSided = true;
        ring.i = i;
        gMoonGlow.push(ring);
        AddToLayer(ring, 5);
    }


    // Earth glow
    for(var i = 0; i < 4; i++) {
        ring = new THREE.Mesh(new Plane(60, 60, 1, 1), Materials.EarthGlow.Material );
        
        ring.position.x = gEarth.Position.x + i * 10;
        ring.position.y = gEarth.Position.y + i *10;
        ring.position.z = gEarth.Position.z + i *10;
        ring.rotation = new THREE.Vector3(i * 20, i * 20, i * 20);
        ring.doubleSided = true;
        ring.i = i;
        gEarthGlow.push(ring);
        AddToLayer(ring, 5);
    }

    // Mercury glow
    for(var i = 0; i < 2; i++) {
        ring = new THREE.Mesh(new Plane(24, 24, 1, 1), Materials.MercuryGlow.Material );
        
        ring.position.x = gMercury.Position.x + i * 10;
        ring.position.y = gMercury.Position.y + i *10;
        ring.position.z = gMercury.Position.z + i *10;
        ring.rotation = new THREE.Vector3(i * 20, i * 20, i * 20);
        ring.doubleSided = true;
        ring.i = i;
        gMercuryGlow.push(ring);
        AddToLayer(ring, 5);
    }

    // Venus glow
    for(var i = 0; i < 2; i++) {
        ring = new THREE.Mesh(new Plane(51, 51, 1, 1), Materials.VenusGlow.Material );
        
        ring.position.x = gVenus.Position.x + i * 10;
        ring.position.y = gVenus.Position.y + i *10;
        ring.position.z = gVenus.Position.z + i *10;
        ring.rotation = new THREE.Vector3(i * 20, i * 20, i * 20);
        ring.doubleSided = true;
        ring.i = i;
        gVenusGlow.push(ring);
        AddToLayer(ring, 5);
    }

    // Mars glow
    for(var i = 0; i < 2; i++) {
        ring = new THREE.Mesh(new Plane(27, 27, 1, 1), Materials.MarsGlow.Material );
        
        ring.position.x = gMars.Position.x + i * 10;
        ring.position.y = gMars.Position.y + i *10;
        ring.position.z = gMars.Position.z + i *10;
        ring.rotation = new THREE.Vector3(i * 20, i * 20, i * 20);
        ring.doubleSided = true;
        ring.i = i;
        gMarsGlow.push(ring);
        AddToLayer(ring, 5);

    }


    
}

function GetMoonOrbitCenter() {
    return gEarth.Position;
}

//  Main loop to update and render scene ------------------------------------//
function Loop() {
    gFpsData.BeginFrame();
    
    Update();
    Render();

    gFpsData.EndFrame();
}

//  Render scene ------------------------------------------------------------//
function Render() {
    gRenderer.render(gScene, gMainCamera);
    gRenderer2D.Render(gScene2D);

    if(gMiniViewOn) {
        if(gFpsData.FrameCount % 3 == 0) {
            gMiniRenderer.render(gScene, gMiniCamera);
        }
    }
    
}

//  Update scene ------------------------------------------------------------//
function Update() {    
    
    gEntities.forEach(function(entity){entity.Update();},this);

    gMoonGlow.forEach(
        function(glow) {
            var i = glow.i;
            
            glow.position.x = gMoon.Position.x;
            glow.position.y = gMoon.Position.y;
            glow.position.z = gMoon.Position.z;
        },
        this
    );


     gEarthGlow.forEach(
        function(glow) {
            var i = glow.i;
            
            glow.position.x = gEarth.Position.x;
            glow.position.y = gEarth.Position.y;
            glow.position.z = gEarth.Position.z;
        },
        this
    );

    gMercuryGlow.forEach(
        function(glow) {
            var i = glow.i;
            
            glow.position.x = gMercury.Position.x;
            glow.position.y = gMercury.Position.y;
            glow.position.z = gMercury.Position.z;
        },
        this
    );

    gVenusGlow.forEach(
        function(glow) {
            var i = glow.i;
            
            glow.position.x = gVenus.Position.x;
            glow.position.y = gVenus.Position.y;
            glow.position.z = gVenus.Position.z;
        },
        this
    );

    gMarsGlow.forEach(
        function(glow) {
            var i = glow.i;
            
            glow.position.x = gMars.Position.x;
            glow.position.y = gMars.Position.y;
            glow.position.z = gMars.Position.z;
        },
        this
    );

    UpdateCameras();    
}

//  Update Cameras ----------------------------------------------------------//
function UpdateCameras() {
    
    var t = gFpsData.FrameCount + 100;
    var radius = 700;
    var speed = .05 * gSimSpeed;
    var centerpoint = gGalaxy.CenterPoint;
    
    gCamera1.position = new THREE.Vector3(
        Math.cos(t * speed * Math.PI / 180) * radius + centerpoint.x,
        Math.sin(t * speed * Math.PI / 180) * radius/3 + centerpoint.y,
        Math.sin(t * speed * Math.PI / 180) * radius + centerpoint.z
    );

    gCamera1.target.position = new THREE.Vector3(
        Math.cos(t * speed * Math.PI / 180) * 500 + centerpoint.x,
        Math.sin(t * speed * Math.PI / 180) * 200 + centerpoint.y,
        Math.sin(t * speed * Math.PI / 180) * 500 + centerpoint.z
    );

    centerpoint = gGalaxy.CenterPoint;
    speed = speed / 5;
    radius = 200;

    gCamera2.position = new THREE.Vector3(
        Math.cos(t * speed * Math.PI / 180) * radius + centerpoint.x,
        Math.sin(t * speed * Math.PI / 180) * radius/3 + centerpoint.y,
        Math.sin(t * speed * Math.PI / 180) * radius + centerpoint.z
    );

    gCamera2.target.position = gEarth.Position;

    
}

//  Handle Key Up Event -----------------------------------------------------//
function OnKeyUp(e) {
    switch (e.keyCode) {

        //  NUMBER ROW 1 KEY ------------------------------------------------//
        case $UTIL.Keyboard.KEY_1:
            ToggleLayer(1);
            break;

        //  NUMBER ROW 2 KEY ------------------------------------------------//
        case $UTIL.Keyboard.KEY_2:
            ToggleLayer(2);
            break;

        //  NUMBER ROW 3 KEY ------------------------------------------------//
        case $UTIL.Keyboard.KEY_3:
            ToggleLayer(3);
            break;

        //  NUMBER ROW 4 KEY ------------------------------------------------//
        case $UTIL.Keyboard.KEY_4:
            ToggleLayer(4);
            break;

        //  NUMBER ROW 5 KEY ------------------------------------------------//
        case $UTIL.Keyboard.KEY_5:
            ToggleLayer(5);
            break;

        //  S key -----------------------------------------------------------//
        case $UTIL.Keyboard.KEY_S:
            ToggleBackgroundMusic();
            break;

        //  V key -----------------------------------------------------------//
        case $UTIL.Keyboard.KEY_V:
            ToggleView();
            break;

        //  + key -----------------------------------------------------------//
        case $UTIL.Keyboard.KEY_PLUS_NUMROW:
        case $UTIL.Keyboard.KEY_PLUS_NUMPAD:
            if(!e.ctrlKey) {  IncreaseSimSpeed(); }
            break;

        //  - key -----------------------------------------------------------//
        case $UTIL.Keyboard.KEY_MINUS_NUMPAD:
        case $UTIL.Keyboard.KEY_MINUS_NUMROW:
            if(!e.ctrlKey) { DecreaseSimSpeed(); }
            break;

        //  R key -----------------------------------------------------------//
        case $UTIL.Keyboard.KEY_R:        
            Reset();
            break;

        //  M key -----------------------------------------------------------//
        case $UTIL.Keyboard.KEY_M:        
            ToggleMiniView();
            break;

        //  F key -----------------------------------------------------------//
        case $UTIL.Keyboard.KEY_F:        
            ToggleFullScreen();
            break;

        //  E key -----------------------------------------------------------//
        case $UTIL.Keyboard.KEY_E:        
            ToggleEarthFlip();
            break;
    }

    $UTIL.AppLog.Debug(e.keyCode + " - key pressed");
}

//  Toggle full screen (hide UI) --------------------------------------------//
function ToggleFullScreen() {
    gFullScreen = !gFullScreen;

    var returnButton = document.getElementById("DemoReturnButton");
    

    if(gFullScreen) {
        returnButton.style.display = "none";
    
        gHUD.opacity = 0;
    } else {
        returnButton.style.display = "inline";
    
        gHUD.opacity = 1;
    }

}

//  Flip Earth on X axis ----------------------------------------------------//
function ToggleEarthFlip() {
    var rotation = 60;

    if(gEarth.Rotation.x == rotation) {
        gEarth.Rotation.x = 0; 
    } else {
        gEarth.Rotation.x = rotation;
    }
}

//  Increase simulation speed -----------------------------------------------//
function IncreaseSimSpeed() {
    gSimSpeed++;
}

//  Decrease simulation speed -----------------------------------------------//
function DecreaseSimSpeed() {
    gSimSpeed = Math.max(1, gSimSpeed-1);
}

//  Toggle Mini View --------------------------------------------------------//
function ToggleMiniView() {
    gMiniViewOn = !gMiniViewOn;

    if(gMiniViewOn) {
       gMiniRenderer.domElement.style.display = "inline";
    } else {
       gMiniRenderer.domElement.style.display = "none";
    }    

}

//  Reset demo --------------------------------------------------------------//
function Reset() {
    gSimSpeed = 1;
    View2();
}

//  Show view 1 -------------------------------------------------------------//
function ToggleView() {
    if(typeof gView == "undefined") {
        gView = View2;
    } else if(gView == View1) {
        gView = View2;
    } else if(gView == View2) {
        gView = View1;
    }

    gView();

}

//  Show view 1 -------------------------------------------------------------//
function View1() {
    gMainCamera = gCamera1;
    gMiniCamera = gCamera2;
}

//  Show view 2 -------------------------------------------------------------//
function View2() {
    gMainCamera = gCamera2;
    gMiniCamera = gCamera1;
}

//  Toggle background music -------------------------------------------------//
function ToggleBackgroundMusic(e) {
    var audio = document.getElementById("bgMusic");
    audio.muted = !audio.muted;
    
}

//  Handle Mouse Over event -------------------------------------------------//
function OnRenderSurfaceMouseOver(e) {
    
}

//  Handle Mouse out event --------------------------------------------------//
function OnRenderSurfaceMouseOut(e) {
    
}

//  Handle Mouse move event -------------------------------------------------//
function OnRenderSurfaceMouseMove(e) {

    lon = ( event.clientX ) * 0.1;
	lat = ( event.clientY ) * 0.1;
}

//  Hide layer --------------------------------------------------------------//
function HideLayer(_layer) {
    
    if(_layer < 0 || _layer > gLayers.length-1) {
        $UTIL.AppLog.Debug("Cannot hide layer " + _layer + ": does not exist.");
        return;
    }

    var layer = gLayers[_layer];

    if(layer.visible) {
        layer.visible = false;
        $UTIL.AppLog.Debug("Hiding layer " + _layer + ".");
        layer.objects.forEach(
            function(mesh) {
                gScene.removeObject(mesh);
            },
            this);
    } else {
        $UTIL.AppLog.Debug("Layer " + _layer + " already hidden.");
    }

}

//  Show layer --------------------------------------------------------------//
function ShowLayer(_layer) {
    
    if(_layer < 0 || _layer > gLayers.length-1) {
        $UTIL.AppLog.Debug("Cannot show layer " + _layer + ": does not exist.");
        return;
    }

    var layer = gLayers[_layer];

    if(!layer.visible) {
        layer.visible = true;
        $UTIL.AppLog.Debug("Showing layer " + _layer + ".");
        layer.objects.forEach(
            function(mesh) {
                gScene.addObject(mesh);
            },
            this);
    } else {
        $UTIL.AppLog.Debug("Layer " + _layer + " already visible.");
    }

}

//  Toggle Layer ------------------------------------------------------------//
function ToggleLayer(_layer) {
    
    if(_layer < 0 || _layer > gLayers.length-1) {
        $UTIL.AppLog.Debug("Cannot toggle layer " + _layer + ": does not exist.");
        return;
    }

    var layer = gLayers[_layer];

    if(layer.visible) {
        HideLayer(_layer);
    } else {
        ShowLayer(_layer);
    }

}

//  Add object to scene -----------------------------------------------------//
function AddToLayer(_object, _layer) {
    
    if(_layer < 0 || _layer > gLayers.length-1) {
        $UTIL.AppLog.Debug("Cannot add object to layer " + _layer + ": layer does not exist.");
        return;
    }

    var layer = gLayers[_layer];
    layer.objects.push(_object);
    
    if(layer.visible) {
        gScene.addObject(_object);
    }
}

//  Remove object from scene ------------------------------------------------//
function RemoveFromLayer(_object, _layer) {
    
    if(_layer < 0 || _layer > gLayers.length-1) {
        $UTIL.AppLog.Debug("Cannot remove object from layer " + _layer + ": layer does not exist.");
        return;
    }

    var layer = gLayers[_layer];
    layer.objects.pop(_object);
    
    if(layer.visible) {
        gScene.removeObject(_object);
    }
}



