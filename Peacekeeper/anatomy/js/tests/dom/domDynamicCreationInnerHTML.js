/** 
 * document.innerhHTML
 * Not a standard command, but supported by most browsers.
 */
var domDynamicCreationInnerHTML = {
	
	version: 1,

	hiddenPlayground: false,
	
	init: function() {
		
		// Create testing environment.
		this.hiddenPlayground = document.getElementById("hiddenPlayground");

	},
	
	run: function() {

		this.hiddenPlayground.innerHTML = '<div class="item"><div class="borderHorizontal"></div><div class="itemContent"><div class="padding"><div class="scoreArea"><div class="score">10451</div><div class="product">3DMark06</div></div><div class="infoArea"><div>AMD Athlon(tm) 7750 Dual-Core Processor 2702 MHz ATI Radeon HD 4850</div></div><div style="clear: both;"></div></div></div></div>';

	}
	
}


