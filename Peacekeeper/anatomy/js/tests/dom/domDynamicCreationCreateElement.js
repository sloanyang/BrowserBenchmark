/** 
 * document.createElement
 * DOM3-core, p. 48
 */
var domDynamicCreationCreateElement = {
	
	version: 1,

	hiddenPlayground: false,
	
	init: function() {
		
		// Create testing environment.
		this.hiddenPlayground = document.getElementById("hiddenPlayground");

	},
	
	run: function() {
	
		/*
		<div class="item">
			<div class="borderHorizontal"></div>
			<div class="itemContent">
				<div class="padding">
					<div class="scoreArea">
						<div class="score">10451</div>
						<div class="product">3DMark06</div>
					</div>
					<div class="infoArea">
						<div>AMD Athlon(tm) 7750 Dual-Core Processor 2702 MHz ATI Radeon HD 4850</div>
					</div>
					<div style="clear: both;"></div>
				</div>
			</div>
		</div>
		*/		
	
		// Create elements.
	
		var score = document.createElement("div");
		score.className = "score";
		score.innerHTML = "10451";
	
		var product = document.createElement("div");
		product.className = "product";
		product.innerHTML = "3DMark06";
	
		var scoreArea = document.createElement("div");
		scoreArea.className = "scoreArea";
	
		var infoAreaPadding = document.createElement("div");
		infoAreaPadding.innerHTML = "AMD Athlon(tm) 7750 Dual-Core Processor 2702 MHz ATI Radeon HD 4850";
		
		var infoArea = document.createElement("div");
		infoArea.className = "infoArea";
		
		var clear = document.createElement("div");
		clear.style.clear = "both";
		
		var padding = document.createElement("div");
		padding.className = "padding";

		var itemContent = document.createElement("div");
		itemContent.className = "itemContent";

		var borderHorizontal = document.createElement("div");
		borderHorizontal.className = "borderHorizontal";
		
		var item = document.createElement("div");
		item.className = "item";
		
		scoreArea.appendChild(score);
		scoreArea.appendChild(product);
		infoArea.appendChild(infoAreaPadding);

		padding.appendChild(scoreArea);
		padding.appendChild(infoArea);
		padding.appendChild(clear);
		
		itemContent.appendChild(padding);
		
		item.appendChild(borderHorizontal);
		item.appendChild(itemContent);
		
		this.hiddenPlayground.appendChild(item);
		
	}
	
}


