package
{
	import craftymind.Bullet;
	import craftymind.GameObject;
	import craftymind.PerformanceBar;
	import craftymind.Ship;
	
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	import flash.utils.getTimer;
	
	[SWF(width="480", height="640", backgroundColor="#000000", frameRate="60")]
	public class FlashGame extends Sprite
	{
		private var STAGE:Rectangle = new Rectangle(0, 0, 480, 640);
		public var context:BitmapData;
		private var header:PerformanceBar;
		
		[Embed(source="/assets/groundtile.png")]	private var GroundAsset:Class;
		[Embed(source="/assets/ship1.png")]			private var Ship1Asset:Class;
		[Embed(source="/assets/ship2.png")]			private var Ship2Asset:Class;
		[Embed(source="/assets/ship3.png")]			private var Ship3Asset:Class;
		[Embed(source="/assets/cloud.png")]			private var CloudAsset:Class;
		[Embed(source="/assets/bullet.png")]		private var PlayerBulletAsset:Class;
		[Embed(source="/assets/enemybullet.png")]	private var EnemyBulletAsset:Class;
		
		private var assets:Object = {
			Ground : new GroundAsset(),
			Ship1 : new Ship1Asset(),
			Ship2 : new Ship2Asset(),
			Ship3 : new Ship3Asset(),
			Cloud : new CloudAsset(),
			Bullet : new PlayerBulletAsset(),
			EnemyBullet : new EnemyBulletAsset()
		}
		
		public var gameTime:uint = 0;
		
		public function FlashGame()
		{
			super();
			//setup page
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;
			context = new BitmapData(STAGE.width, STAGE.height, false, 0x000000);
			var canvas:Bitmap = new Bitmap(context);
			addChild(canvas);
			header = new PerformanceBar("GM3 Flash Bitmap", stage.stageWidth);
			addChild(header);
			addEventListener(Event.ENTER_FRAME, loop);
			
			//initialize test variables
			gameTime = getTimer()+3000;
		}
		
		private function loop(evt:Event):void {
			gameTime = getTimer()+30000;
			context.lock();
			drawGround();
			drawPlanesBackdrop();
			drawClouds();
			drawEnemies();
			drawBullets();
			drawShip();
			context.unlock();
			header.updatePerformance();
		}
		
		private function drawGround():void {
			var tilesize:int = 128;
			var tileHeights:int = Math.ceil(STAGE.height / tilesize) *tilesize;
			var tileBaseY:int = Math.floor(gameTime/60) % tileHeights;
			var tileY:int = tileBaseY;
			while(tileY-tilesize > -tilesize){
				tileY -= tilesize;
			}
			while(tileY+tilesize < STAGE.height+tilesize){
				var tileX:int = 0;
				while(tileX+tilesize < STAGE.width+tilesize){
					context.copyPixels(assets.Ground.bitmapData, assets.Ground.bitmapData.rect, new Point(tileX, tileY));
					tileX += tilesize;
				}
				tileY += tilesize;
			}
		}
		
		private var backdropIndex:uint = 0;
		private var backdrops:Array = [];
		private function drawPlanesBackdrop():void {
			var shipCount:int = Math.floor(gameTime / 2000);
			var half:Number = STAGE.width/2;
			var ship:GameObject;
			while(backdropIndex < shipCount){
				backdropIndex++;
				ship = new GameObject();
				ship.time = backdropIndex*2000;
				ship.width = 48;
				ship.height = 48;
				ship.x = Math.random()*(half-48);
				backdrops.push(ship);
				ship = new GameObject();
				ship.time = 1000 + backdropIndex*2000;
				ship.width = 48;
				ship.height = 48;
				ship.x = half + (Math.random()*(half-48));
				backdrops.push(ship);
			}
			for(var i:int=backdrops.length-1; i>-1; i--){
				ship = backdrops[i];
				ship.y = (gameTime-ship.time) / 33;
				ship.y -= ship.height;
				if(ship.y > STAGE.height+ship.height){
					backdrops.splice(i, 1);
				}else{
					context.copyPixels(assets.Ship3.bitmapData, assets.Ship3.bitmapData.rect, new Point(Math.floor(ship.x), Math.floor(ship.y)));
				}
			}
		}
		
		private var cloudIndex:uint = 0;
		private var clouds:Array = [];
		private function drawClouds():void {
			var cloudCount:uint = Math.floor(gameTime / 3000);
			var half:Number = STAGE.width/2;
			var cloud:GameObject;
			while(cloudIndex < cloudCount){
				cloudIndex++;
				cloud = new GameObject();
				cloud.time = cloudIndex*3000;
				cloud.width = 128;
				cloud.height = 128;
				cloud.x = Math.random()*(half-128);
				clouds.push(cloud);
				cloud = new GameObject();
				cloud.time = 1500 + cloudIndex*3000;
				cloud.width = 128;
				cloud.height = 128;
				cloud.x = half + (Math.random()*(half-128));
				clouds.push(cloud);
			}
			for(var i:int=clouds.length-1; i>-1; i--){
				cloud = clouds[i];
				cloud.y = (gameTime-cloud.time) / 20;
				cloud.y -= cloud.height;
				if(cloud.y > STAGE.height+cloud.height){
					clouds.splice(i, 1);
				}else{
					context.copyPixels(assets.Cloud.bitmapData, assets.Cloud.bitmapData.rect, new Point(Math.floor(cloud.x), Math.floor(cloud.y)));
				}
			}
		}
		
		private var enemyIndex:uint = 0;
		private var enemies:Array = [];
		private function drawEnemies():void {
			var shipCount:uint = Math.floor(gameTime / 500);
			var ship:Ship;
			while(enemyIndex < shipCount){
				enemyIndex++;
				ship = new Ship();
				ship.time = enemyIndex*500;
				ship.width = 64;
				ship.height = 64;
				ship.x = Math.random()*(STAGE.width-64);
				enemies.push(ship);
			}
			for(var i:int=enemies.length-1; i>-1; i--){
				ship = enemies[i];
				ship.y = (gameTime-ship.time) / 5;
				ship.y -= ship.height;
				if(ship.y > STAGE.height+ship.height){
					enemies.splice(i, 1);
				}else{
					context.copyPixels(assets.Ship2.bitmapData, assets.Ship2.bitmapData.rect, new Point(Math.floor(ship.x), Math.floor(ship.y)));
					drawEnemyBullets(ship);
				}
			}
		}
		private function drawEnemyBullets(ship:Ship):void {
			var bulletCount:int = Math.floor((gameTime-ship.time) / 500);
			var bullet:Bullet;
			var down:Number = (Math.PI)/2;
			while(ship.bulletCount < bulletCount){
				ship.bulletCount++;
				bullet = new Bullet();
				bullet.time = ship.time + (ship.bulletCount*500);
				bullet.width = 20;
				bullet.height = 20;
				bullet.x = ship.x + 22;
				bullet.angle = down-0.5;
				ship.bullets.push(bullet);
				
				bullet = new Bullet();
				bullet.time = ship.time + (ship.bulletCount*500);
				bullet.width = 20;
				bullet.height = 20;
				bullet.x = ship.x + 22;
				bullet.angle = down;
				ship.bullets.push(bullet);
				
				bullet = new Bullet();
				bullet.time = ship.time + (ship.bulletCount*500);
				bullet.width = 20;
				bullet.height = 20;
				bullet.x = ship.x + 22;
				bullet.angle = down+0.5;
				ship.bullets.push(bullet);
			}
			for(var i:int=ship.bullets.length-1; i>-1; i--){
				bullet = ship.bullets[i];
				var distance:Number = (gameTime-bullet.time) / 4;
				bullet.x = ship.x + 22 + (Math.cos(bullet.angle)*distance);
				bullet.y = ship.y + ship.height + (Math.sin(bullet.angle)*distance);
				if(bullet.y > STAGE.height+bullet.height){
					ship.bullets.splice(i, 1);
				}else{
					context.copyPixels(assets.EnemyBullet.bitmapData, assets.EnemyBullet.bitmapData.rect, new Point(Math.floor(bullet.x), Math.floor(bullet.y)));
				}
			}
		}
		private var bulletIndex:uint = 0;
		private var bullets:Array = [];
		private function drawBullets():void {
			var bulletCount:uint = Math.floor(gameTime / 100);
			var bullet:GameObject;
			while(bulletIndex < bulletCount){
				bulletIndex++;
				bullet = new GameObject();
				bullet.time = bulletIndex*100;
				bullet.width = 20;
				bullet.height = 20;
				var freq:Number = gameTime % 3000;
				var usableWidth:Number = STAGE.width-64;
				if(freq < 1500){
					bullet.x = (freq/1500)*usableWidth;
				}else{
					freq -= 1500;
					bullet.x = usableWidth-((freq/1500)*usableWidth);
				}
				bullet.x += 20;
				bullets.push(bullet);
			}
			for(var i:int=bullets.length-1; i>-1; i--){
				bullet = bullets[i];
				var offset:Number = (gameTime-bullet.time) / 2;
				bullet.y = STAGE.height - 64 - offset;
				if(bullet.y < -bullet.height){
					bullets.splice(i, 1);
				}else{
					context.copyPixels(assets.Bullet.bitmapData, assets.Bullet.bitmapData.rect, new Point(Math.floor(bullet.x), Math.floor(bullet.y)));
				}
			}
		}
		
		private var player:GameObject = null;
		private function drawShip():void {
			if(player == null){
				player = new GameObject();
				player.width = 64;
				player.height = 64;
				player.y = STAGE.height - player.height;
			}
			var freq:Number = gameTime % 3000;
			var usableWidth:Number = STAGE.width-player.width;
			if(freq < 1500){
				player.x = (freq/1500)*usableWidth;
			}else{
				freq -= 1500;
				player.x = usableWidth-((freq/1500)*usableWidth);
			}
			context.copyPixels(assets.Ship1.bitmapData, assets.Ship1.bitmapData.rect, new Point(Math.floor(player.x), Math.floor(player.y)));
		}

	}
}