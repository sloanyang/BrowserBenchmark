/** 
 * Remove swearing.
 * Load is based on profiled data. Uses replace-method.
 */
var stringChat = {
	
	version: 1,

	messages: ["Nulla blandit congue odio. Cras rutrum nulla a est. Sed eros ligula, blandit in, aliquet id.",
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
				"Proin varius justo vitae dolor.",
				"Aliquam sed eros. Maecenas viverra. Duis risus enim, rhoncus posuere, sagittis tincidunt.",
				"Ullamcorper at, purus. Quisque in lectus vitae tortor rhoncus dictum. Ut molestie semper sapien. ",
				"Suspendisse potenti. Sed quis elit. Suspendisse potenti. Aenean sodales.",
				"Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. ",
				"Phasellus pulvinar venenatis augue. Suspendisse mi. Suspendisse id velit. ",
				"Proin eleifend pharetra augue. Praesent vestibulum metus vitae pede.",
				"Cras augue lectus, venenatis sed, molestie viverra, ornare at, justo. "],

	bannedWords: ["cock","cockandball","cockbite","cockboy","cockface","cockhead","cocklick","cocknball","cocksmoke","cocksniff"],

	init: function() {
	
	},
	
	run: function() {

		// Remove swearing.
		for (var i = 0; i < this.messages.length; i++) {
			for (var k = 0; k < this.bannedWords.length; k++) {
				this.messages[i] = this.messages[i].replace(this.bannedWords[k]);
			}
		}
		
		// Safe to go...

	}
	
}
