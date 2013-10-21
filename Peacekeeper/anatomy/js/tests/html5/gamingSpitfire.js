/** 
 * 
 */
var gamingSpitfire = {
	
	version: 1,

	// This is custom test.
	isCustom: true,
	
	unit: "fps",
	
	init: function() {

		$("#playground").append("<div id=\"spitfire-statistics-anchor\"><div id=\"spitfire-statistics\">Loading...</div></div>");
		
		// Create stage.
		$("#playground").append("<div id=\"cr-stage\"></div>");
	
	},

	run: function() {
		console.log("Running test...");
		main.init();
		//setTimeout("gamingSpitfire.oncomplete()", 5000);
	},
	
	/**
	 * CSS3 transitions are required to run this test.
	 */
	isSupported: function()
	{
	
    var thisBody = document.body || document.documentElement,
    thisStyle = thisBody.style,
    support = thisStyle.transform !== undefined || thisStyle.WebkitTransform !== undefined || thisStyle.MozTransform !== undefined || thisStyle.msTransform !== undefined || thisStyle.OTransform !== undefined;

    if (support)
    {

      var ua = navigator.userAgent.toLowerCase();

      // Android devices.
      if (ua.indexOf("android") > -1)
      {
        return false;
      }

      // iOS devices
      if (/.*ipad.*/.test(ua)
          || /.*ipod.*/.test(ua)
          || /.*iphone.*/.test(ua))
      {
          return false;
      }

    }
    
    return support; 
  }
		
}

var gameConfig = {
	replayMode: true
}


/* main.js */


var main = {

	theEnd: function()
	{
		Crafty.pause();
		benchmark.test.result = statistics._averageFps;
		benchmark.test.oncomplete();
	},

	init: function()
	{

    // Use reel, is specified.
    if (typeof gamingReel != "undefined")
    {
      recorder._reel = gamingReel;
    }

		// Create game area.
		Crafty.init(50, 992, 558);

		Crafty.sprite(77, "images/tests/spitfire/plane.png", {
			grass1: [0,0],
			grass2: [1,0],
			grass3: [2,0],
			grass4: [3,0],
			flower: [0,1],
			bush1:  [0,2],
			bush2:  [1,2],
			player: [0,3]
		});

		Crafty.sprite(77, "images/tests/spitfire/enemy-frames.png", { enemySprite: [0, 0] });
		Crafty.sprite(64, "images/tests/spitfire/explosion-frames.png", { explosionSprite: [0, 0] });
		Crafty.sprite(60, "images/tests/spitfire/part1-frames.png", { part1Sprite: [0, 0] });
		Crafty.sprite(30, "images/tests/spitfire/part2-frames.png", { part2Sprite: [0, 0] });

		// The loading screen that will display while our assets load
		Crafty.scene("loading", function() 
		{
			// Load takes an array of assets and a callback when complete
			Crafty.load(
				[
					"images/tests/spitfire/balloon.png", 
					"images/tests/spitfire/plane.png", 
					"images/tests/spitfire/layout-bg.png", 
					"images/tests/spitfire/grass2.png",
					"images/tests/spitfire/layout-frame.png",
					"images/tests/spitfire/enemy-frames.png",
					"images/tests/spitfire/explosion-frames.png",
					"images/tests/spitfire/part1-frames.png",
					"images/tests/spitfire/part2-frames.png",
					"images/tests/spitfire/pilot.png",
					"images/tests/spitfire/smoke-frames.png",
					"images/tests/spitfire/ground-hangar.png",
					"images/tests/spitfire/ground-tower.png",
					"images/tests/spitfire/ground-tree.png"
				], function() 
			{			
				Crafty.scene("main"); //when everything is loaded, run the main scene
			});
		});


		// Black background 
		Crafty.background("#000");

		Crafty.scene("main", function() {

			statistics.log();

			// Add bg.
			var bg = Crafty.e("2D, DOM, image")
						.attr({w: Crafty.viewport.width, h: Crafty.viewport.height, x: 0, y: 0})
						.image("images/tests/spitfire/layout-bg.png");			
						
			// Add ground.
			main.createGround();

			Crafty.bind("enterframe", function() {

				if (Crafty.frame() > 2700) // To view everything, set this to 2700
				{
					main.theEnd();
				}			

			});

			// Create custom controls for player.
			Crafty.c('CustomControls', {
			
				_engineOn: true,
				_speed: 0,
				_angle: 0,

				_maxSpeed: 4,
				_acceleration: 0.05,
				_deacceleration: 0.03,
				_turnSpeed: 4,
				
				_lastBulletTime: 0,
				
				_turning: '',
			
				CustomControls: function() 
				{

					this.bind('enterframe', function(e) 
					{

						recorder.init(Crafty.frame(), this, gameConfig.replayMode);
						recorder.saveState(this);

            // Use recorded value if in replay mode.
            if (recorder._replayMode)
            {
              
              this._x = recorder.getProperty("x");
              this._y = recorder.getProperty("y");
              this.rotation = recorder.getProperty("rotation");
              
              if (recorder.getProperty("bullet"))
              {
                main.addBullet(recorder.getProperty("bulletX"), 
                                recorder.getProperty("bulletY"), 
                                recorder.getProperty("bulletRotation"))
              }
            
              return;

            }

						// Limit max speed based on angle. Plane goes down faster.
						var maxSpeed = this._maxSpeed + 4 * Math.sin(this._angle / 57.3);

						// Handle keys.
						if (this.isDown(Crafty.keys.UP_ARROW)) 
						{
							if (this._speed < maxSpeed)
							{
								this._speed += this._acceleration;
							} else {
								this._speed -= this._deacceleration;
							}
						} else {
							this._speed -= this._deacceleration;
							if (this._speed < 0)
							{
								this._speed = 0;
							}
						}
						
						if (this.isDown(Crafty.keys.SPACE)) 
						{
	
							var d = new Date();
							if (d.getTime() - this._lastBulletTime > 300)
							{
								this._lastBulletTime = d.getTime();
								main.addBullet(this._x, this._y, this._rotation);
							}
						
						}
						
						if (this.isDown(Crafty.keys.RIGHT_ARROW)) 
						{
							this._turning = "right";
							this._angle += this._turnSpeed;
						} else if (this.isDown(Crafty.keys.LEFT_ARROW))
						{
							this._turning = "left";
							this._angle -= this._turnSpeed;
						} else {
							this._turning = "";
						}

						// Calculate x and y movements.
						var xDelta = this._speed * Math.cos(this._angle * (Math.PI/180));
						var yDelta = this._speed * Math.sin(this._angle * (Math.PI/180));
						
						this.x += xDelta;
						this.y += yDelta;
						
						this.rotation = this._angle;
						
					});
					
					return this;
					
				}
	
			});

			// Explosion component
			Crafty.c('explosion', {
			
				_delay: 0,
				_startFrame: 0,
				_reelId: "explode",
			
				explosion: function(delay) 
				{

					statistics.addSprite();

					this._startFrame = Crafty.frame();
					this._delay = delay;

					// Init settings.
					this.animate(this._reelId, 0, 0, 25).origin("center");

					// Bind event handler.
					this.bind("enterframe", function(e) 
					{
						//console.log("Frame: " + e.frame + " Start frame: " + this._startFrame + " Delay: " + this._delay + " Is playing: " + this.isPlaying());
						var elapsed = e.frame - this._startFrame;
						if (!this.isPlaying() && elapsed == this._delay)
						{
							this.animate(this._reelId, 50);
						} else if (!this.isPlaying() && elapsed > this._delay + 100) {
							statistics.destroySprite();
							this.destroy();
						}

					})
		
					return this;
				}
			});

			// Waterdrop component
			Crafty.c('waterdrop', {
			
				_startFrame: 0,
			  _ySpeed: 0,
			
			  /**
			   * Initial x and y movements.
			   */
				waterdrop: function(xDelta, yDelta) 
				{

					statistics.addSprite();

					this._startFrame = Crafty.frame();

          // Set starting speed.
          this._ySpeed = yDelta;

					// Bind event handler.
					this.bind("enterframe", function(e) 
					{

            this._ySpeed += 0.1;

            // Move to new position.
            this.x += xDelta;
            this.y += this._ySpeed;
            
            // Calculate rotation.
            if (xDelta < 0)
            {
              this.rotation = 360 - 360 * (Math.atan(this._ySpeed, xDelta) / (2 * Math.PI)); 
            } else {
              this.rotation = 360 * (Math.atan(this._ySpeed, xDelta) / (2 * Math.PI)) - 180; 
            }

            // Destroy if it goes out of bounds.
            if(this.x > Crafty.viewport.width 
              || this.x < 0 
              || this.y > Crafty.viewport.height 
              || this.y < 0) 
            {
              statistics.destroySprite();
              this.destroy();
            }

					})
		
					return this;
				}
			});

			
			// Create player.
			statistics.addSprite();
			Crafty.e("2D, DOM, player, controls, CustomControls, animate, collision, health")
				.attr({
					x: 160, 
					y: 200, 
					w: 77,
					h: 53,
					z: 1,
					_lastAnimation: 'normal_idle',
					_direction: 'normal'
				})
				.CustomControls()
				.animate("normal_idle", 0, 0, 3)
				.origin("center")
				.bind("enterframe", function() 
				{

					// Add enemy.
					if (main.enemyPositions.length > main.enemyCounter)
					{
						var currentEnemy = main.enemyPositions[main.enemyCounter];
						if (Crafty.frame() > currentEnemy.frame)
						{
							main.addEnemy();
						}
					}

					// Not playing any of the reels.
					if (!this.isPlaying("normal_idle"))
					{
					  this.animate("normal_idle", 5);
					}
					
          return this;

				})
				.collision()
				.onHit("Enemy", function(collisionData)
				{
					// Destroy enemy.
					if(collisionData) 
					{
						for(var i = 0; i < collisionData.length; i++) 
						{
						
							// Enemy object.
							var enemy = collisionData[i].obj;
							
							// Add explosion.
							main.addExplosion(enemy.x, enemy.y);
							
							// Destroy enemy.
							statistics.destroySprite();
							enemy.destroy();
							
						}
    				}
    				
    				// Destroy player.
					statistics.destroySprite();
					this.destroy();
					recorder.log();
					
				})
				.onHit("ground", function(collisionData) 
				{
					statistics.destroySprite();
					this.destroy();
					recorder.log();
				})
				.onHit("bomb", function(collisionData)
				{
					statistics.destroySprite();
					this.destroy();
					recorder.log();
				});

		});

		Crafty.scene("loading");
		
	},

  addBullet: function(x, y, rotation)
  {

		recorder.addBullet(x, y, rotation);

  	statistics.addSprite();
    Crafty.e("2D, DOM, color, bullet")
      .attr({
        x: x + 30, 
        y: y + 30, 
        w: 2, 
        h: 2, 
        rotation: this._rotation, 
        xspeed: 10 * Math.sin((rotation + 90) / 57.3), 
        yspeed: 10 * Math.cos((rotation + 90) / 57.3)
      })
      .color("rgb(0, 0, 0)")
      .bind("enterframe", function() {

        this.x += this.xspeed;
        this.y -= this.yspeed;
    
        //destroy if it goes out of bounds
        if(this._x > Crafty.viewport.width || this._x < 0 || this._y > Crafty.viewport.height || this._y < 0) {
          statistics.destroySprite();
          this.destroy();
        }
      });

  },

	/**
	 * Add enemy plane.
	 */
	enemyCounter: 0,
	enemyPositions: [
		{ frame:100, 	y: 200	},
		{ frame:500, 	y: 400	},
		{ frame:700, 	y: 50	},
		{ frame:900, 	y: 300	},
		{ frame:1200, 	y: 100	},
		//{ frame:1400, 	y: 50	},
		{ frame:1500, 	y: 400	},
		//{ frame:1600, 	y: 200	},
		{ frame:1700, 	y: 400	},
		//{ frame:1750, 	y: 50	},
		//{ frame:1750, 	y: 200	},
		{ frame:3000, 	y: 60	}
	],
	addEnemy: function()
	{
	
		statistics.addSprite();
		Crafty.e("2D, DOM, player, animate, collision, Enemy, enemySprite, health")
			.attr({
				x: Crafty.viewport.width, 
				y: main.enemyPositions[main.enemyCounter++].y,
				w: 77,
				h: 53,
				z: 1,
				_lastBombDropped: 0
			})
			.animate("engine_on", 0, 0, 3)
			.origin("center")
			.bind("enterframe", function() 
			{
				
				// Play animation.
				if (!this.isPlaying()) this.animate("engine_on", 25);

				// If damaged, add smoke.
				if (this._mana < 75 && Crafty.frame() % 50 == 0)
				{
					main.addSmoke(this.x, this.y);
				}
				/*
				if (this._mana < 50 && (Crafty.frame() + 25) % 50 == 0)
				{
					main.addSmoke(this.x, this.y);
				}
				if (this._mana < 25 && (Crafty.frame() + 12) % 25 == 0)
				{
					main.addSmoke(this.x, this.y);
				}
				*/

				// Move plane.
				this.x--;

				// Destroy if it goes out of bounds.
				if(this._x < - this.w) 
				{
					statistics.destroySprite();
					this.destroy();
				}
					
				if (Crafty.frame() - this._lastBombDropped > 100)
				{
					this._lastBombDropped = Crafty.frame();

					// Drop bomb.
					statistics.addSprite();
					Crafty.e("2D, DOM, color, bomb, collision, image")
						.attr({
							x: this._x + 30, 
							y: this._y + 30, 
							w: 28, 
							h: 38, 
							xspeed: -1, 
							yspeed: 0
						})
						.image("images/tests/spitfire/balloon.png")
						.bind("enterframe", function() 
						{
						
							// Accelerate.
							if (this.yspeed < 5)
							{
								this.yspeed += 0.2;
							}
							
							// Move.
							this.x += this.xspeed;
							this.y += this.yspeed;

							// Destroy if it goes out of bounds.
							if(this._x > Crafty.viewport.width 
								|| this._x < 0 
								|| this._y > Crafty.viewport.height 
								|| this._y < 0) 
							{
								statistics.destroySprite();
								this.destroy();
							}

						})
						.collision()
						.onHit("ground", function(collisionData)
						{

							// Add explosion.
							main.addWaterSplash(this.x, this.y);

							statistics.destroySprite();
							this.destroy();
						})
						.onHit("house", function(collisionData)
						{

							// Add explosion.
							main.addExplosion(this.x - 80, this.y - 40);

							// Delete house.
							if(collisionData) 
							{
								for(var i = 0; i < collisionData.length; i++) 
								{
									collisionData[i].obj.destroy();
								}
							}

							statistics.destroySprite();
							this.destroy();
						});				
				}
				
			})
			.collision()
			.onHit("bullet", function(collisionData) 
			{
			
				// Reduce health.
				this.hurt(20);
				
				// Delete bullet.
				if(collisionData) 
				{
					for(var i = 0; i < collisionData.length; i++) 
					{
						statistics.destroySprite();
						collisionData[i].obj.destroy();
					}
    			}
    			
			})
			.bind("die", function(e) 
			{

				// Add explosion.
				main.addExplosion(this.x, this.y);

					statistics.destroySprite();
				this.destroy();
			});					

	},
	
	addSmoke: function(x, y)
	{

		var id, params;

		statistics.addSprite();
	
		// Add explosions.
		id = "smoke_" + Math.round(Math.random() * 1000);
		params = {}; params[id] = [0, 0];
		Crafty.sprite(40, "images/tests/spitfire/smoke-frames.png", params);
		Crafty.e("2D, DOM, animate, " + id)
			.attr({
				x: x, 
				y: y, 
				w: 40,
				h: 40,
				z: 1,
				_startFrame: Crafty.frame()
			})
			.animate("smoke", 0, 0, 6)
			.origin("center")
			.bind("enterframe", function() 
			{

				if (!this.isPlaying()) 
				{
				
					if (Crafty.frame() - this._startFrame > 100)
					{
						statistics.destroySprite();
						this.destroy();
						return;
					}
				
					this.animate("smoke", 40);
				}
				
				this.rotation += 1;
			});




	},

	/** 
	 * Edd water splash to given position.
	 */
  splashPositions: [
    [ {id: 1, x: -3, y: -3},{id: 2, x: -1, y: -4},{id: 3, x: 3, y: -3},
      {id: 1, x: -5, y: -2},{id: 2, x:  5, y: -1},{id: 3, x: 1, y: -7}],
    [ {id: 1, x: -5, y: -1},{id: 2, x:  2, y:  1},{id: 3, x: 0, y: -8},
      {id: 1, x: -2, y: -3},{id: 2, x:  -5, y: -2},{id: 3, x: -1, y: -4}],
    [ {id: 1, x: -2, y:  0},{id: 2, x: -5, y: -1},{id: 3, x: -3, y: -3},
      {id: 1, x: -2, y: -6},{id: 2, x:  -5, y: -2},{id: 3, x: 3, y: -4}]
  ],
  splashPositionId: 0,
  addWaterSplash: function(x, y)
	{

    main.splashPositionId = (main.splashPositionId + 1) % main.splashPositions.length;

		// Add drops.
		for (var i = 0; i < 3 /* main.splashPositions[main.splashPositionId].length */; i++)
		{
      Crafty.e("2D, DOM, image, waterdrop")
              .attr({ x: x, y: y, w: 30, h: 11, z: 1})
              .image("images/tests/spitfire/drop0" + main.splashPositions[main.splashPositionId][i].id + ".png")
              .waterdrop(main.splashPositions[main.splashPositionId][i].x, main.splashPositions[main.splashPositionId][i].y);
		}
	
  },
  
	/** 
	 * Edd explosion to given position.
	 */
	addExplosion: function(x, y)
	{
		var id, params;

		// Add explosions.
		id1 = "explosion_" + Math.round(Math.random() * 1000);
		params = {}; params[id] = [0, 0];
		Crafty.sprite(64, "images/tests/spitfire/explosion-frames.png", params);
		Crafty.e("2D, DOM, animate, explosion, " + id)
			.attr({ x: x, y: y, w: 64, h: 64, z: 1})
			.explosion(0);
			
		id1 = "explosion_" + Math.round(Math.random() * 1000);
		params = {}; params[id] = [0, 0];
		Crafty.sprite(64, "images/tests/spitfire/explosion-frames.png", params);
		Crafty.e("2D, DOM, animate, explosion, " + id)
			.attr({ x: x + 50, y: y + 20, w: 64, h: 64, z: 1})
			.explosion(10);

    /*
		id1 = "explosion_" + Math.round(Math.random() * 1000);
		params = {}; params[id] = [0, 0];
		Crafty.sprite(64, "images/tests/spitfire/explosion-frames.png", params);
		Crafty.e("2D, DOM, animate, explosion, " + id)
			.attr({ x: x + 100, y: y + 5, w: 64, h: 64, z: 1})
			.explosion(25);	
    */
    
		statistics.addSprite();
		Crafty.e("2D, DOM, animate, part1Sprite")
			.attr({ x: x, y: y, w: 60, h: 60, z: 1, _ySpeed: -7, _xSpeed: -2})
			.animate("part1Animation", 0, 0, 10)
			.animate("part1Animation", 25)
			.origin("center")
			.bind("enterframe", function() 
			{
				if (!this.isPlaying()) this.animate("part1Animation", 90);
				this.rotation -= -10;
				this._ySpeed += 0.2;
				this.x += this._xSpeed;
				this.y += this._ySpeed;

				// Destroy if it goes out of bounds.
				if(this._x > Crafty.viewport.width 
					|| this._x < 0 
					|| this._y > Crafty.viewport.height 
					|| this._y < 0) 
				{
					statistics.destroySprite();
					this.destroy();
				}
				
			});
		
		/*
		statistics.addSprite();
		Crafty.e("2D, DOM, animate, part1Sprite")
			.attr({ x: x + 150, y: y, w: 60, h: 60, z: 1, _ySpeed: -5, _xSpeed: 2})
			.animate("part1Animation", 0, 0, 10)
			.animate("part1Animation", 25)
			.origin("center")
			.bind("enterframe", function() 
			{
				if (!this.isPlaying()) this.animate("part1Animation", 90);
				this.rotation -= +10;
				this._ySpeed += 0.2;
				this.x += this._xSpeed;
				this.y += this._ySpeed;

				// Destroy if it goes out of bounds.
				if(this._x > Crafty.viewport.width 
					|| this._x < 0 
					|| this._y > Crafty.viewport.height 
					|| this._y < 0) 
				{
					statistics.destroySprite();
					this.destroy();
				}

			});
		*/
			
		statistics.addSprite();
		Crafty.e("2D, DOM, animate, part2Sprite")
			.attr({ x: x + 20, y: y, w: 30, h: 30, z: 1, _ySpeed: -5, _xSpeed: 0.5})
			.animate("part2Animation", 0, 0, 10)
			.animate("part2Animation", 25)
			.origin("center")
			.bind("enterframe", function() 
			{
				if (!this.isPlaying()) this.animate("part2Animation", 100);
				this.rotation -= -5;
				this._ySpeed += 0.2;
				this.x += this._xSpeed;
				this.y += this._ySpeed;

				// Destroy if it goes out of bounds.
				if(this._x > Crafty.viewport.width 
					|| this._x < 0 
					|| this._y > Crafty.viewport.height 
					|| this._y < 0) 
				{
					statistics.destroySprite();
					this.destroy();
				}

			});
		
	},
	
	createGround: function()
	{
		// Add ground.
		Crafty.e("2D, DOM, image, ground").attr({ w: 998, h: 13, x: 0, y: 545 }).image("images/tests/spitfire/grass2.png");			
		
		// Add house.
		// Crafty.e("2D, DOM, image, house").attr({ w: 63, h: 71, x: 180, y: 520 }).image("images/tests/spitfire/ground-tree.png");			
	}

}

/**
 * Record player movements.
 */
var recorder = {

	_reel: [],
	_frame: 0,
	_player: false,
	_replayMode: false,
	
	/**
	 * Save current keyboard state.
	 */
	saveState: function(player)
	{

		// If playing, stop recording.
		if (!recorder._replayMode)
		{

      var frameData = {
        x: player.x,
        y: player.y,
        rotation: player.rotation,
        bullet: false
      };

			recorder._reel[Crafty.frame()] = frameData;
			
			if (player.isDown(Crafty.keys.ENTER))
			{
				recorder.log();
			}

		}

	},
	
	log: function()
	{
		console.log(JSON.stringify(recorder._reel));
	},
	
	addBullet: function(x, y, rotation)
	{
	
	  if (typeof recorder._reel[Crafty.frame()] == "undefined")
	  {
  	  recorder._reel[Crafty.frame()] = {};
	  }
	  
	  recorder._reel[Crafty.frame()].bullet = true;
	  recorder._reel[Crafty.frame()].bulletX = x;
	  recorder._reel[Crafty.frame()].bulletY = y;
	  recorder._reel[Crafty.frame()].bulletRotation = rotation;

	},
	
	init: function(frame, player, replayMode)
	{
		recorder._frame = frame;
		recorder._player = player;
		recorder._replayMode = replayMode;
	},
	
	isPlaying: function()
	{

		if (!recorder._replayMode)
		{
			return true;
		}
	
		if (typeof(recorder._reel[recorder._frame]) == "undefined")
		{
			return false;
		} else {
			return true;
		}
	},
	
	getProperty: function(name)
	{

    // Get current state.
    if (typeof(recorder._reel[recorder._frame]) != "undefined" && 
        typeof(recorder._reel[recorder._frame][name]) != "undefined")
    {
      return recorder._reel[recorder._frame][name];
    } else {
      return 0;
    }

	},
	
	isDown: function(keyCode)
	{
	
		// If play mode, use recorded data.
		if (recorder._replayMode)
		{

			var currentFrame = {};

			// Get current state.
			if (typeof(recorder._reel[recorder._frame]) != "undefined")
			{
				currentFrame = recorder._reel[recorder._frame];
			} else {
				return false;
			}

			if (keyCode == Crafty.keys.UP_ARROW     && currentFrame.up)     return true;
			if (keyCode == Crafty.keys.LEFT_ARROW   && currentFrame.left)   return true;
			if (keyCode == Crafty.keys.RIGHT_ARROW  && currentFrame.right)  return true;
			if (keyCode == Crafty.keys.SPACE        && currentFrame.space)  return true;
			
			return false;
			
		} else {
		
			return recorder._player.isDown(keyCode);
		
		}
		
	}
	
}

var statistics = {

	_sprites: 0,
	_fps: 0,
	_averageFps: 0,
	_sum: 0,
	_count: 0,
	_measurements: [],

	addSprite: function() 
	{ 
		statistics._sprites++; 
	},
	
	destroySprite: function() 
	{ 
		statistics._sprites--; 
	},


	log: function() 
	{ 

		var currentFps = Crafty.timer.getFPS();
		if (isNaN(currentFps) || !isFinite(currentFps))
		{
		  currentFps = 0;
		}
		var sprites = statistics._sprites;
		statistics._sum += currentFps;
		statistics._count++;
		statistics._averageFps = statistics._sum / statistics._count;
		
		if (isNaN(statistics._averageFps) || !isFinite(statistics._averageFps))
		{
  		statistics._averageFps = 1;
		}
		
		statistics._measurements.push({
			frame: Crafty.frame(),
			sprites: sprites,
			currentFps: currentFps,
			averageFps: statistics._averageFps
		});
	
		$("#spitfire-statistics").html("Frame: " + Crafty.frame() + ". Currently running " + Math.round(currentFps) + " frames per second (average " + Math.round(statistics._averageFps) + "). There are " + statistics._sprites + " animated sprites on the stage.");
		setTimeout(statistics.log, 500);

	}
	
};

