//used to generate random speed for the enemies
function generateRandomSpd() {
	return Math.floor((Math.random() * 250) + 100);
}
// Enemies our player must avoid
var Enemy = function() {
	
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	this.x = 0;
	this.y = Math.floor((Math.random() * 3) + 1) * 83 - 30; //creates enemies on random rock tile
	this.side = 101;
	this.upDown = 83;
	this.resetPos = -this.side;
	this.randomSpd = generateRandomSpd();
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	
	if(this.x < this.side * 5) {
		this.x += this.randomSpd * dt;
	}
	
	//once the enemies reach the end, loops them back to the beginning with random location and speed
	else {
		this.y = (this.upDown * Math.floor((Math.random() * 3) + 1) - 30);
		this.x = this.resetPos;
		this.randomSpd = generateRandomSpd();
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();

const allEnemies = [enemy1, enemy2, enemy3];

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
	constructor() {
		this.x = 202;
		this.y = 385;
		this.side = 101; //tile pixel from the engine
		this.upDown = 83; //tile pixel from the engine
		this.sprite = 'images/char-pink-girl.png';
	}
	

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	
	handleInput(inputKey) {
		switch(inputKey) {
			case 'right':
				if(this.x < this.side * 4){
					this.x += this.side;
				}
				break;
			case 'left':
				if(this.x > 0){
					this.x -= this.side;
				}
				break;
			case 'down':
				if(this.y < ((this.upDown * 5) - 30)){
					this.y += this.upDown;
				}
				break;
			case 'up':
				if(this.y > -30){
					this.y -= this.upDown;
				}			
				break;
		}
	}
	
	update() {
		//if the player gets to the water area reset the char to start position
		if(this.y === -30){
			alert("You won!!");
			this.reset();
		}
		
		for(let enemy of allEnemies) {
			if (this.y === enemy.y && (enemy.x + ((enemy.side)/2) > this.x && enemy.x < this.x + (this.side/2))) {
				alert("game over");
				this.reset();
			}
		}
	}
	
	reset() {
		this.x = this.side * 2;
		this.y = this.upDown * 5 - 30;
	}
}

const player = new Player();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

