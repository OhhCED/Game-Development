// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1350;
canvas.height = 680;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "res/conner.png";

/*var createPlatform = false;
var platformImage = new Image();
platformImage.onload = function () {
	for(var i =0;i < canvas.width; i+=64) {
        	 var ground = (i,canvas.width - 64, 'res/brick.png');
        	 ground.body.immovable =true;
	}
}
/*function createPlatform() {
        for(var i =0;i < canvas.width; i+=64) {
         var ground = platforms.create(i,canvas.width - 64, 'res/brick.png');
         ground.body.immovable =true;
 }
}
*/
// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "res/tux_angry2.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "res/tuxhat2.png";

// Game objects
var hero = {
	speed: 200 // movement in pixels per second
};

var monster = {};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches player2
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the player2 somewhere on the screen randomly
	monster.x = 138 + (Math.random() * (canvas.width - 100));
	monster.y = 0 + (Math.random() * (canvas.height - 100));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}
	if (87 in keysDown) { //Monster Movement up
		monster.y -= hero.speed * modifier;
	}
	if (83 in keysDown) { //Monster Movement down
		monster.y += hero.speed * modifier;
	}
	if (65 in keysDown) { //Monster Movement left
		monster.x -= hero.speed * modifier;
	}
	if (68 in keysDown) { //Monster Movement right
		monster.x += hero.speed * modifier
	}

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Penguins Caught: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
