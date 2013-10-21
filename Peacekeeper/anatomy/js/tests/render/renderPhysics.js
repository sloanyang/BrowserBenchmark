/** 
 * Render animated bar diagram.
 */
var renderPhysics = {
	
	version: 1,

	// This is fps-test.
	isFps: true,
	
	initialSpeed: 1.5,
	
	// Length in milliseconds.
	iterations: 15000,

	assets: [ "images/tests/physics/bg.jpg",
	          "images/tests/physics/flower1.png",
	          "images/tests/physics/flower2.png" ],
	
	ballRadius: 16,
	
	ballAmount: 40,
	
	// Balls.
	balls: new Array(),
	positions: new Array(),
	speed: new Array(),
	rotations: new Array(),
	
	// Track collisions to avoid double collisions.
	colliedBalls: new Array(),
	
	frame: 0,
	
	box: false,
	
	init: function() {

		$("#playground").html("");
		
		// Create bg.
		var bg = assetManager.get("images/tests/physics/bg.jpg");
		$(bg).addClass("renderPhysics_bg");
		console.log(bg);
		$("#playground").append(bg);

    // Create box for items.		
		this.box = $("<div id=\"renderPhysics_box\"></div>");
		$("#playground").append(this.box);
		
		for (var i = 0; i < this.ballAmount; i++) {
			this.addBall(Math.random() * 992 - 2 * this.ballRadius,
						Math.random() * 558 - 2 * this.ballRadius,
						Math.random() * this.initialSpeed,
						Math.random() * this.initialSpeed,
						1 + i % 2);
		}

	},
	
	addBall: function(positionX, positionY, speedX, speedY, ballType) {

    if (ballType != 1 && ballType != 2) ballType = 1;

		// Add ball.
		this.balls.push(assetManager.get("images/tests/physics/flower" + ballType + ".png"));
		
		// Add speed.
		this.speed.push({
			x: speedX, 
			y: speedY
		});
		
		// Add position.
		this.positions.push({
			x: positionX, 
			y: positionY
		});
		
		this.rotations.push(0);

		// Set position.
		$(this.balls[this.balls.length - 1]).css("position", "absolute");
		$(this.balls[this.balls.length - 1]).css("left", this.positions[this.positions.length - 1].x);
		$(this.balls[this.balls.length - 1]).css("top", this.positions[this.positions.length - 1].y);

		$(this.balls[this.balls.length - 1]).css("width", "32");
		$(this.balls[this.balls.length - 1]).css("height", "32");

		// Append.
		$(this.box).append(this.balls[this.balls.length - 1]);

	},
	
	run: function(time) {
	
		//if (this.frame > 1) return;
	
		//logger.info("renderPhysics", time);
		this.frame++;
		
		// Move balls.
		for (var i = 0; i < this.balls.length; i++) {
			this.moveBall(i, this.speed[i].x, this.speed[i].y);
		}

		// Detect collisions.
		this.colliedBalls = new Array();
		for (var i = 0; i < this.balls.length; i++) {
		
			// Collisions to wall.
			if (this.positions[i].x < 0) {
				this.positions[i].x = 0; 
				this.speed[i].x = -this.speed[i].x; 
			}
			if (this.positions[i].x > 992 - 2 * this.ballRadius) {
				this.positions[i].x = 992 - 2 * this.ballRadius
				this.speed[i].x = -this.speed[i].x; 
			}
			if (this.positions[i].y < 0) { 
				this.positions[i].y = 0; 
				this.speed[i].y = -this.speed[i].y; 
			}
			if (this.positions[i].y > 558 - 2 * this.ballRadius) {
				this.positions[i].y = 558 - 2 * this.ballRadius
				this.speed[i].y = -this.speed[i].y; 
			}
			
			// Collisions to other objects.
			for (var k = 0; k < this.balls.length; k++) {
				if (i != k) {
					if (this.detectCollision(this.balls[i], this.balls[k])){
						this.collide(i, k);
					}
				}
			}
		
		}
		//console.log("-----------------------------");

	},
	
	/**
	 * Detect collision between two balls.
	 */
	detectCollision: function(ball1, ball2) {
	
		// Get coordinates.
		var x1 = ball1.style.left.replace("px", "");
		var y1 = ball1.style.top.replace("px", "");
		var x2 = ball2.style.left.replace("px", "");
		var y2 = ball2.style.top.replace("px", "");

		// Calculate distance.
		var dist = Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
	
		// Return true if collision.
		if (dist < 2 * this.ballRadius/* && !this.alreadyCollied(ball1, ball2)*/) {
			this.colliedBalls.push([ball1, ball2]);
			return true;
		} else {
			return false;
		}
	
	},
	
	alreadyCollied: function(ball1, ball2) {
		for (var i = 0; i < this.colliedBalls.length; i++) {
			if ((this.colliedBalls[i][0] == ball1 && this.colliedBalls[i][1] == ball2)
				|| (this.colliedBalls[i][0] == ball2 && this.colliedBalls[i][1] == ball1)) {
				return true;
			}
		}
		return false;
	},
	
	collide: function(i, k) {

		//console.log("renderPhysics", "Object " + i + " collides to " + k);
		
		// If balls are getting further, do not collide (because they have already did so).
		var currentDistance = Math.sqrt(Math.pow(this.positions[k].x - this.positions[i].x, 2)
										 + Math.pow(this.positions[k].y - this.positions[i].y, 2)); 
		var nextX1 = this.positions[i].x + this.speed[i].x;
		var nextY1 = this.positions[i].y + this.speed[i].y;
		var nextX2 = this.positions[k].x + this.speed[k].x;
		var nextY2 = this.positions[k].y + this.speed[k].y;
		var nextDistance = Math.sqrt(Math.pow(nextX2 - nextX1, 2)
										 + Math.pow(nextY2 - nextY1, 2)); 
		if (nextDistance > currentDistance) {
			return false;
		}

		// Positions.
		var p1 = this.positions[i];
		var p2 = this.positions[k];

		//console.log("renderPhysics", "Object 1 position " + p1.x + " " + p1.y);
		//console.log("renderPhysics", "Object 1 position " + p2.x + " " + p2.y);
		
		// Speed vectors.
		var s1 = this.speed[i];
		//console.log("renderPhysics", "Speed at start: " + this.speed[i].x + " " + this.speed[i].y);
		
		// Speeds.
		var originalSpeed1 = this.length(s1);

		// Normals.
		var n1 = {
			x: p2.x - p1.x,
			y: p2.y - p1.y
		};
		var n2 = {
			x: p1.x - p2.x,
			y: p1.y - p2.y
		};

		// Flip velocity vector about the normal.
		this.speed[i] = { 
			x: s1.x - this.dotProduct(s1, n2) * n2.x,
			y: s1.y - this.dotProduct(s1, n2) * n2.y
		}	

		// Normalize.
		this.speed[i] = { 
			x: this.normalize(this.speed[i]).x * originalSpeed1,
			y: this.normalize(this.speed[i]).y * originalSpeed1
		}
		
		//console.log("renderPhysics", "Speed at end: " + this.speed[i].x + " " + this.speed[i].y);

		// Push balls a little forward to avoid balls grabbing to each other.
		/*
		while(this.detectCollision(this.balls[i], this.balls[k])) {
			var x = this.speed[i].x / Math.abs(this.speed[i].x);
			var y = this.speed[i].y / Math.abs(this.speed[i].y);
			this.moveBall(i, x, y);
			//this.moveBall(k, this.speed[k].x, this.speed[k].y);
		}
		*/
		
		return;
	
	},
	
	moveBall: function(i, offsetX, offsetY) {
		this.positions[i].x += offsetX;
		this.positions[i].y += offsetY;
		this.rotations[i] += 5 * (i / this.balls.length);
		this.balls[i].style.left = this.positions[i].x + "px"; 
		this.balls[i].style.top = this.positions[i].y + "px"; 
		this.balls[i].style.MozTransform = "rotate(" + this.rotations[i] + "deg)"; 
	},
	
	dotProduct: function(a, b) {
		return a.x * b.x + a.y * b.y;
	},

	length: function(a) {
		return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
	},
	
	normalize: function(v) {
		var l = this.length(v);
		return {
			x: v.x / l,
			y: v.y / l
		}
	}

}