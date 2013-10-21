/** 
 */
var stringDetectBrowser = {
	
	version: 1,

	ua: "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 2.0.50727)",

	os: "unknown",
	browser: "unknown",

	init: function() {
	},
	
	run: function() {
	
		if (/MSIE (\d+\.\d+);/.test(this.ua)) this.browser = "explorer";
		if (/Firefox[\/\s](\d+\.\d+)/.test(this.ua)) this.browser = "firefox";		
		if (/Opera[\/\s](\d+\.\d+)/.test(this.ua)) this.browser = "opera";		
		if (/Safari/.test(this.ua)) this.browser = "safari";		
		if (/Chrome/.test(this.ua)) this.browser = "chrome";		
		if (/Seamonkey/.test(this.ua)) this.browser = "seamonkey";		
		if (/Konqueror/.test(this.ua)) this.browser = "konqueror";		
		if (/Lynx/.test(this.ua)) this.browser = "lynx";		
	
		if (/Windows/i.test(this.ua)) this.os = "os";
		if (/Macintosh/i.test(this.ua)) this.os = "macintosh";
		if (/Linux/i.test(this.ua)) this.os = "linux";	
		if (/Smartphone/i.test(this.ua)) this.os = "windowsmobile";	
		if (/Symbian/i.test(this.ua)) this.os = "symbian";	
		if (/iPhone/i.test(this.ua)) this.os = "iphone";	
	
	}
	
}
