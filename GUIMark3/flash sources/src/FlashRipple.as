package
{
	import craftymind.Drop;
	import craftymind.PerformanceBar;
	
	import flash.display.GradientType;
	import flash.display.Graphics;
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.geom.Matrix;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	import flash.utils.getTimer;
	
	[SWF(width="480", height="640", backgroundColor="#000000", frameRate="60")]
	public class FlashRipple extends Sprite
	{
		private var header:PerformanceBar;
		private var context:Graphics;
		
		
		private var vizTime:uint;
		private var dropIndex:uint = 0;
		private var drops:Array = [];
		
		public function FlashRipple()
		{
			super();
			//setup page
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;
			var canvas:Sprite = new Sprite();
			context = canvas.graphics;
			addChild(canvas);
			header = new PerformanceBar("GM3 Flash Vector", stage.stageWidth);
			addChild(header);
			addEventListener(Event.ENTER_FRAME, loop);
			
			//initialize test variables
			vizTime = getTimer();
		}
		
		private function loop(evt:Event):void {
			vizTime = getTimer();
			var drop:Drop;
			var dropCount:uint = Math.floor(vizTime / 200);
			while(dropIndex < dropCount){
				dropIndex++;
				drop = new Drop();
				drop.time = dropIndex*200;
				drop.x = 100+(Math.random()*280);
				drop.y = 140+(Math.random()*400);
				drop.color = Math.random()*0xFFFFFF;
				drop.radius = 0;
				drops.push(drop);
			}
			context.clear();
			for(var i:int=drops.length-1; i>-1; i--){
				drop = drops[i];
				if(vizTime-drop.time > 1200){
					drops.splice(i, 1);
				}else{
					drop.radius = easeOut(vizTime-drop.time, 0, 120, 1200);
					renderDrop(drop);
				}
			}
			header.updatePerformance();
		}
		
		private function easeOut(t:Number, b:Number, c:Number, d:Number):Number {
			return c*((t=t/d-1)*t*t + 1) + b;
		};
		private function easeIn(t:Number, b:Number, c:Number, d:Number):Number {
			return c*(t/=d)*t*t + b;
		};
		private function alphaRadius(value:Number, radius:Number, max:Number):Number{
			return easeIn(radius, value, -value, max);
		}
		private function alphaArrayRadius(value:Array, radius:Number, max:Number):Array{
			var out:Array = [];
			for each(var num:Number in value){
				out.push(easeIn(radius, num, -num, max));
			}
			return out;
		}
		
		private function renderDrop(drop:Drop):void {
			var mat:Matrix = new Matrix();
			var outerRadius:Number = drop.radius;
			
			if(outerRadius < 100){
				mat.identity();
				mat.createGradientBox(outerRadius*2, outerRadius*2, 0, drop.x-outerRadius, drop.y-outerRadius);
				//draw base
				context.lineStyle(2, drop.color, alphaRadius(0.7, outerRadius, 100));
				context.beginFill(drop.color, alphaRadius(0.2, outerRadius, 100));
				context.drawCircle(drop.x, drop.y, outerRadius);
				context.endFill();
				//draw gradient 1
				context.beginGradientFill(GradientType.RADIAL, [drop.color, drop.color, drop.color], alphaArrayRadius([0, 0.5, 0], outerRadius, 100), [148, 210, 242], mat);
				context.drawCircle(drop.x, drop.y, outerRadius);
				context.endFill();
				//draw gradient 2
				var midColor:uint = (drop.color & 0x7f7f7f) << 1;
				context.beginGradientFill(GradientType.RADIAL, [drop.color, midColor, 0xFFFFFF, 0xFFFFFF], alphaArrayRadius([0.1, 0.1, 0.5, 0], outerRadius, 100), [0, 92, 166, 195], mat);
				context.drawCircle(drop.x, drop.y, outerRadius);
				context.endFill();
			}
			
			var innerRadius:Number = drop.radius*0.4;
			mat.identity();
			mat.createGradientBox(innerRadius*2, innerRadius*2, 0, drop.x-innerRadius, drop.y-innerRadius);
			//draw inner base
			context.lineStyle(2, 0xFFFFFF, alphaRadius(0.7, outerRadius, 100));
			context.drawCircle(drop.x, drop.y, innerRadius);
			context.endFill();
			//draw inner gradient 1
			context.beginGradientFill(GradientType.RADIAL, [drop.color, drop.color, drop.color], alphaArrayRadius([0, 0.5, 0], innerRadius, 50), [83, 197, 231], mat);
			context.drawCircle(drop.x, drop.y, innerRadius);
			context.endFill();
			//draw inner gradient 2
			context.beginGradientFill(GradientType.RADIAL, [0xFFFFFF, 0xFFFFFF, 0xFFFFFF], alphaArrayRadius([0.6, 0.7, 0], innerRadius, 50), [0, 78, 169], mat);
			context.drawCircle(drop.x, drop.y, innerRadius);
			context.endFill();
			//draw inner gradient 3
			context.beginGradientFill(GradientType.RADIAL, [drop.color, drop.color], alphaArrayRadius([0.7, 0], innerRadius, 50), [27, 65], mat);
			context.drawCircle(drop.x, drop.y, innerRadius);
			context.endFill();
		}
	}
}