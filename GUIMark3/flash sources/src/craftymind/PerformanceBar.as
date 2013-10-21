package craftymind
{
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import flash.text.TextField;
	import flash.text.TextFormat;
	import flash.text.TextFormatAlign;
	import flash.utils.getTimer;
	
	public class PerformanceBar extends Sprite
	{
		private var meter:FPSMeter;
		private var title:String;
		private var label:TextField;
		
		private var _width:Number;
		
		public function PerformanceBar(name:String, width:Number) {
			super();
			meter = new FPSMeter();
			title = name;
			_width = width;
			createChildren();
		}
		public function updatePerformance():void {
			meter.increment();
			if(testState == 0){
				label.text = title+": "+meter.getFramerate()+" fps";
			}else if(testState == 1){
				continueTest();
				label.text = "Testing... "+meter.getFramerate()+" fps";
			}else{
				label.text = title;
			}
		}
		
		
		private var testBegin:int = 0;
		private var testData:Array = [];
		private var testState:uint = 0;
		private function startTest(evt:MouseEvent=null):void{
			testBegin = getTimer();
			testState = 1;
			testData = [];
		}
		private function continueTest():void{
			var time:uint = getTimer();
			testData.push(time);
			if(time-testBegin > 10000){
				testState = 2;
				var output:Number = testData.length/(time-testBegin)*1000;
				title = "Test Average: "+FPSMeter.formatNumber(output)+" fps";
			}
		}
		private function createChildren():void {
			//draw background
			graphics.beginFill(0x333333, 1);
			graphics.drawRect(0, 0, _width, 40);
			graphics.endFill();
			
			//label field
			label = new TextField();
			label.x = 8;
			label.y = 8;
			label.width = 370;
			label.defaultTextFormat = new TextFormat("Arial", 18, 0xCCCCCC, false);
			addChild(label);
			
			//button field
			var buttonText:TextField = new TextField();
			buttonText.x = 0;
			buttonText.y = 8;
			buttonText.width = 100;
			buttonText.text = "Start Test";
			buttonText.setTextFormat(new TextFormat("Arial", 18, 0xFFFFFF, true));
			buttonText.mouseEnabled = false;
			
			var button:Sprite = new Sprite();
			button.graphics.beginFill(0x333333);
			button.graphics.drawRect(0, 0, 100, 40);
			button.buttonMode = true;
			button.x = _width-100;
			button.addEventListener(MouseEvent.CLICK, startTest);
			button.addChild(buttonText);
			addChild(button);
		}

	}
}