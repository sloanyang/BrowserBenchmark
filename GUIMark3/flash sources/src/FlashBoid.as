 
package  
{
	import craftymind.PerformanceBar;
	import craftymind.Vector3D;
	
	import flash.display.Graphics;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import soulwire.ai.Boid;

	/**
	 * Main
	 */
	[SWF(width="480", height="480", backgroundColor="#000000", frameRate="60")]
	public class FlashBoid extends Sprite 
	{
		private var header:PerformanceBar;
		private var context:Graphics;
		
		private var config : Object = {
			minForce:3.0,
			maxForce:6.0,
			minSpeed:6.0,
			maxSpeed:12.0,
			minWanderDistance:10.0,
			maxWanderDistance:100.0,
			minWanderRadius:5.0,
			maxWanderRadius:20.0,
			minWanderStep:0.1,
			maxWanderStep:0.9,
			numBoids:110
		};

		public function FlashBoid() {
			super();
			//setup page
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;
			var canvas:Sprite = new Sprite();
			context = canvas.graphics;
			canvas.addEventListener(MouseEvent.CLICK, toggleDraw);
			addChild(canvas);
			header = new PerformanceBar("GM3 Flash Compute", stage.stageWidth);
			addChild(header);
			addEventListener(Event.ENTER_FRAME, loop);
			
			//initialize test variables
			createBoids();
		}
		
		protected function createBoids():void {
			for (var i : int = 0;i < config.numBoids; i++) {
				
				var boid:Boid = new Boid();
				boid.color = 0xFFFFFF*random(0.4, 1.0);
				boid.edgeBehavior = Boid.EDGE_BOUNCE;
				boid.maxForce = random(config.minForce, config.maxForce);
				boid.maxSpeed = random(config.minSpeed, config.maxSpeed);
				boid.wanderDistance = random(config.minWanderDistance, config.maxWanderDistance);
				boid.wanderRadius = random(config.minWanderRadius, config.maxWanderRadius);
				boid.wanderStep = random(config.minWanderStep, config.maxWanderStep);
				boid.boundsRadius = stage.stageWidth / 2;
				boid.boundsCentre = new Vector3D(stage.stageWidth/2, stage.stageHeight/2, 0.0);
				boid.radius = 16;
				//add position and velocity
				boid.x = boid.boundsCentre.x + random(-100, 100);
				boid.y = boid.boundsCentre.y + random(-100, 100);
				boid.z = random(-100, 100);
				var vel : Vector3D = new Vector3D(random(-2, 2), random(-2, 2), random(-2, 2));
				boid.velocity.incrementBy(vel);
				
				boids.push(boid);
			}
		}
		
		private var drawEnabled:Boolean = true;
		private var boids : Vector.<Boid> = new Vector.<Boid>();
		
		private function loop(evt:Event):void{
			
			if(drawEnabled){
				context.clear();
				context.beginFill(0x000000, 1);
				context.drawRect(0, 0, 480, 480);
			}
			for (var i:int = 0; i < boids.length; i++){
				var boid:Boid = boids[i];
				boid.wander(0.3);
				// Add a mild attraction to the centre to keep them on screen
				boid.seek(boid.boundsCentre, 0.1);
				// Flock
				boid.flock(boids);
				boid.update();
				
				if(drawEnabled){
					context.lineStyle(1, boid.color, 1);
					context.moveTo(boid.oldPosition.x, boid.oldPosition.y);
					context.lineTo(boid.position.x, boid.position.y);
				}
			}
			header.updatePerformance();
		}
		
		private function toggleDraw(evt:MouseEvent):void {
			drawEnabled = !drawEnabled;
			context.clear();
			context.beginFill(0x000000, 1);
			context.drawRect(0, 0, 480, 480);
		}
		
		protected function random( min : Number, max : Number) : Number {
			return Math.random() * ( max - min ) + min;
		}
		
	}
}
