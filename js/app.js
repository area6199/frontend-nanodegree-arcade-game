// Enemies our player must avoid

class Enemy {
    constructor(x = -200, y = 60) {
        this.sprite = 'images/enemy-bug-without-border.png';
        this.x = x;
        const lane = [68, 151, 234];
        this.y = lane[Math.floor(Math.random() * lane.length)];
        this.speed = Math.random() * 250;
        this.width;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {

        this.x += this.speed * dt;

        // resets enemy position
        if (this.x > 500) {
            this.x = -100;
        }

        // check for collison
        this.imageWidth();
        if ((((player.x + player.width > this.x) && (!(player.x + player.width > this.x + player.width))) || ((this.x + this.width > player.x) && (!(this.x + this.width > player.x + this.width)))) && (this.y === player.y)) {
            player.death++;
            const selector = document.querySelector(".death");
            if (player.death === 1) {
                selector.innerHTML = "death: " + player.death;
            } else {
                selector.innerHTML = "deaths: " + player.death;
            }

            player.y = 400;
            player.x = 219;
        }


        //check victory

        if (player.y < -14 && player.move === true) {
            player.move = false;
            setTimeout(function () {
                player.y = 400;
                player.x = 219;
                player.survive++;
                player.move = true;
                const selector = document.querySelector(".survive");
                if (player.survive === 1) {
                    selector.innerHTML = "survive: " + player.survive;
                } else {
                    selector.innerHTML = "survives: " + player.survive;
                }
            }, 1000);

        }


        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
    }
    imageWidth() {
        const image = document.createElement('img');
        image.src = this.sprite;
        this.width = image.width;
    }



    // Draw the enemy on the screen, required method for game
    render(x = 0, y = 0) {
        // console.log("enemy render x: " + x +", y: "+ y);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// var Enemy = function () {
//     // Variables applied to each of our instances go here,
//     // we've provided one for you to get started

//     // The image/sprite for our enemies, this uses
//     // a helper we've provided to easily load images
//     this.sprite = 'images/enemy-bug.png';
// };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function (dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
// };

// Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function () {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(x = 219, y = 400) {
        this.sprite = 'images/char-boy-without-border.png';
        this.x = x;
        this.y = y;
        this.width;
        this.survive = 0;
        this.death = 0;
        this.move = true;
    }

    update(dt, xUp = 0, yUp = 0) {


        if ((xUp > 0 && this.x < 400) || (xUp < 0 && this.x > 19)) {
            this.x += xUp;
        }

        if ((yUp > 0 && this.y < 400) || (yUp < 0 && this.y > -15)) {
            this.y += yUp;
        }

    }
    render() {

        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        var img = document.createElement('img');
        this.imageWidth();

    }
    handleInput(movement) {
        if (this.move === true) {
            switch (movement) {
                case 'left':
                    player.update(0, -100, 0);
                    break;

                case 'up':
                    player.update(0, 0, -83);
                    break;

                case 'right':
                    player.update(0, 100, 0);
                    break;

                case 'down':
                    player.update(0, 0, 83);
                    break;

                default:
                    player.update(0, 0, 0);
                    break;
            }
        }

    }

    imageWidth() {
        const image = document.createElement('img');
        image.src = this.sprite;
        this.width = image.width;
    }

}


// Now instantiate your objects.

const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const enemy4 = new Enemy();
const enemy5 = new Enemy();
const enemy6 = new Enemy();



// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
//const allEnemies = [enemy1];
// Place the player object in a variable called player
const player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});