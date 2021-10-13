/**================================================================================================
 **                                        Canvas Setup
 *================================================================================================**/
let canvas = document.querySelector('#mon_canvas');
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let gameOver = false;
let count = 0;
let mouse = {
    x: undefined, 
    y: undefined
};
/**================================================================================================
 **                                         Classes
 *?  Create Classes
 *@param Sprites
 *@param Player
 *@param Bullet
 *================================================================================================**/
class Sprites {
    constructor(image, posX, posY) {
        this.image = document.getElementById(image);
        this.posX = posX;
        this.posY = posY;
        this.width = this.image.width;
        this.height = this.image.height;
        this.alive = true;
    }
    draw(){
        ctx.drawImage(this.image, this.posX, this.posY);
    }
}
class Player extends Sprites {
    draw() {
        ctx.drawImage(this.image, this.posX, this.posY, this.width / 4, this.height / 4);
    }
}
class Pointer extends Sprites {
    draw() {
        ctx.drawImage(this.image, mouse.x-34, mouse.y-33.5);
    }
}
class Background extends Sprites {
    draw() {
        ctx.drawImage(this.image, this.posX, this.posY);
    }
    update() {
        if (this.posY > 0){
            gameBackground.posY = -4000;
        }
        this.posY += 0.7;
    }
}
class Bullet extends Sprites {
    init() {
        ctx.drawImage(this.image, this.posX, this.posY, this.width / 1.8, this.height / 1.8);
    }
    draw() {
        if (this.alive){
            ctx.drawImage(this.image, this.posX, this.posY, this.width / 1.8, this.height / 1.8);
        }
    }
    update() {
        if (this.alive){
            // update the x value only if the object is alive
            this.posY -= 5;
            // Check if the bullet is on screen
            if (this.posY <= -100) {
                this.alive = false;
            }
        }
    }
}
class Asteroid extends Sprites {
    init() {
        ctx.drawImage(this.image, this.posX, this.posY, this.width * 1.15, this.height * 1.15);
    }
    draw() {
        if (this.alive){
            ctx.drawImage(this.image, this.posX, this.posY, this.width * 1.15, this.height * 1.15);
        }
    }
    update() {
        if (this.alive){
            // update the x value only if the object is alive
            this.posY += 1;
            // Check if the bullet is on screen
            if (this.posY >= 600) {
                this.alive = false;
            }
        }
    }
}

/**================================================================================================
 **                                      Sprites & Obj
 *================================================================================================**/
    let gameBackground = new Background('background', 0, -4000);
    let vaisseau = new Player('spaceship', 300, 380);
    let flame = new Player('flame1', vaisseau.posX, vaisseau.posY+35);
    let crosshair = new Pointer('crosshair', mouse.x, mouse.y);
    let asteroidsSprites = ['asteroid1', 'asteroid2', 'asteroid3', 'asteroid4', 'asteroid5'];
    let explosionAnimationSprites = ['explosion1', 'explosion2', 'explosion3', 'explosion4', 'explosion5', 'explosion6'];
    let bullets = [];
    let asteroids = [];
    let explosions = [];
 
/**================================================================================================
 **                                      CreateBullet
 *?  initialise bullet on click
 *
 *================================================================================================**/
function createBullet() {
    let bullet = new Bullet('laserSmall', mouse.x-36, 380);
    bullets.push(bullet);
    bullet.init();
}

/**================================================================================================
 **                                      CreateExplosion
 *?  trigger explosion on colision
 *
 * TODO THIS NEED TO BE REMAKE
 *================================================================================================**/
function createExplosion(x, y) {
    explosion = new Asteroid(explosionAnimationSprites[0], x, y);
    explosions.push(explosion);
}

/**================================================================================================
 **                                      LookColision
 *?  trigger explosion on colision
 *
 *================================================================================================**/
function lookColision() {
    bullets.forEach(bulletElem => {
        asteroids.forEach(asteroidElem => {
            // Check x and y for overlap
            if (asteroidElem.posX > bulletElem.width + bulletElem.posX 
                || bulletElem.posX > asteroidElem.width + asteroidElem.posX 
                || asteroidElem.posY > bulletElem.height + bulletElem.posY 
                || bulletElem.posY > asteroidElem.height + asteroidElem.posY)
            {
                return false;
            }
            else
            {
                // delete bullet
                let bulletElemIndex = bullets.indexOf(bulletElem)
                bullets.splice(bulletElemIndex, 1); 

                // create explosion animation on the target place
                createExplosion(asteroidElem.posX, asteroidElem.posY);

                // delete target
                let asteroidElemIndex = asteroids.indexOf(asteroidElem)
                asteroids.splice(asteroidElemIndex, 1); 
                
            }
        });
    });
}

/**================================================================================================
 **                                      CreateAsteroid
 *
 *?  initialise Asteroid on random position with random sprite
 *
 *================================================================================================**/
 function createAsteroid() {
    let randomAsteroidSprite = asteroidsSprites[Math.floor(Math.random()*asteroidsSprites.length)];
    asteroid = new Asteroid(randomAsteroidSprite, Math.floor(Math.random() * 770) + 1, -100);
    asteroids.push(asteroid);
    asteroid.init();
}

/**================================================================================================
 **                                      GenerateAsteroid
 *
 *?  create x Asteroid
 *@argument numb
 *================================================================================================**/
 function generateAsteroid(numb) {
    for (let i = 0; i < numb; i++){
        createAsteroid();
    }
}

/**================================================================================================
 **                                 Delete death object
 *
 *?  delete objet.alive false
 *
 *================================================================================================**/
 function deleteDeathObj() {
    for(var i = 0; i < bullets.length; i++) {
        if(bullets[i].alive == false) {
            bullets.splice(i, 1);
        }
    }
    for(var i = 0; i < asteroids.length; i++) {
        if(asteroids[i].alive == false) {
            asteroids.splice(i, 1);
        }
    }
}
/**================================================================================================
 **                                      Async function
 *?  animating the flame
 *?  asteroid creation
 *
 *================================================================================================**/
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function moveFlame(){
    if ( count % 2 == 0)
    {
        flame.image = document.getElementById('flame2');
        await sleep(80);
        if ( !gameOver )
        {
            requestAnimationFrame(moveFlame);
        }
    }
    else
    {
        flame.image = document.getElementById('flame1');
        await sleep(700);
        if ( !gameOver )
        {
            requestAnimationFrame(moveFlame);
        }
    }
    count++;
}
async function spawnTargets(){
    // setInterval( () => generateAsteroid(1), 20000);
    generateAsteroid(Math.floor(Math.random() * 3));
    await sleep(Math.floor(Math.random() * 2000) + 100);
    if ( !gameOver )
    {
        requestAnimationFrame(spawnTargets);
    }
}
    
/**================================================================================================
 **                                         UpdateScreen
 *?  update all sprites in the list
 *
 *================================================================================================**/
function updateScreen() {
    if ( !gameOver )
    {
        gameBackground.update();
        for (let i = bullets.length; i--;) 
        {
            bullets[i].update();
        }
        for (let j = asteroids.length; j--;) 
        {
            asteroids[j].update();
        }
        // for (let k = 0; k < explosions.length; k++) 
        // {

        //     explosions[k].image = document.getElementById('explosion'+(k+1))
        // }
        moveFlame();
        lookColision();
    }
}

/**================================================================================================
 **                                         Render
 *?  reset and draw all element
 *
 *================================================================================================**/
function render() {
    // Here we render all the sprites after clearing the screen
    ctx.clearRect(0, 0, width, height);
    // Drawing the background
    gameBackground.draw();
    // Drawing the asteroids
    for (let i = 0; i < asteroids.length; i++) {
        asteroids[i].draw();
    }
    // Drawing the explosions
    for (let j = 0; j < explosions.length; j++) {
        explosions[j].draw();
    }
    // Drawing the bullets
    for (let k = 0; k < bullets.length; k++) {
        bullets[k].draw();
    }
    // Drawing the spaceship
    vaisseau.draw();
    // Drawing the spoaceship reactor
    flame.draw();
    // Drawing the crosshair
    crosshair.draw();
}

/**================================================================================================
 **                                     Event Listener
 *
 *================================================================================================**/
canvas.addEventListener('click', function() {
    createBullet();
});

canvas.onmousemove = function(event) { 
    mouse.x = event.x - this.offsetLeft; 
    mouse.y = event.y - this.offsetTop;
    
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    vaisseau.posX = mouse.x-( ( vaisseau.image.width / 4 ) / 2 ) - 2;
    flame.posX = mouse.x-( ( vaisseau.image.width / 4 ) / 2 ) - 2;
}

/**================================================================================================
 **                                         Loop
 *
 *================================================================================================**/
function loop() {
  // Very simple and naive game loop
  updateScreen();
  deleteDeathObj()
  render();
  if ( !gameOver )
    {
        requestAnimationFrame(loop);
    }
}

// Start the game
requestAnimationFrame(loop);
spawnTargets();