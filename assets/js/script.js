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
    y:undefined
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
        this.alive = true;
    }
    draw(){
        ctx.drawImage(this.image, this.posX, this.posY);
    }
}
class Player extends Sprites {
    draw() {
        ctx.drawImage(this.image, this.posX, this.posY, this.image.width / 4, this.image.height / 4);
    }
}
class Background extends Sprites {
    draw() {
        ctx.drawImage(this.image, this.posX, this.posY);
    }
    update() {
        if (this.posY > 0){
            gameBackground.posY = -3000;
        }
        this.posY += 0.6;
    }
}
class Bullet extends Sprites {
    init() {
        ctx.drawImage(this.image, this.posX, this.posY, this.image.width / 1.8, this.image.height / 1.8);
    }
    draw() {
        if (this.alive){
            if ( this.image.id == "laser" ){
                ctx.drawImage(this.image, this.posX-7, this.posY, this.image.width / 1.8, this.image.height / 1.8);
            }
            else if ( this.image.id == "laserSmall"){
                ctx.drawImage(this.image, this.posX, this.posY, this.image.width / 1.8, this.image.height / 1.8);
            }
        }
    }
    update() {
        if (this.alive){
            if ( this.posY <= 300 )
            {
                this.image = document.getElementById('laser');
            }
            // update the x value only if the object is alive
            this.posY -= 5;
            // Check if the bullet is on screen
            if (this.posY <= -100) {
                this.alive = false;
            }
        }
    }
}

/**================================================================================================
 **                                      Sprites & Obj
 *================================================================================================**/
    let gameBackground = new Background('background', 0, -3000);
    let vaisseau = new Player('spaceship', 300, 380);
    let flame = new Player('flame1', vaisseau.posX, vaisseau.posY+35);
    let bullets = [];
 
/**================================================================================================
 **                                      CreateBullet
 *?  initialise bullet on click
 *
 *================================================================================================**/
function createBullet() {
    bullet = new Bullet('laserSmall', mouse.x-36, 380);
    bullets.push(bullet);
    bullet.init();
}

/**================================================================================================
 **                                      Move Flame
 *?  Flame animation with 2 image 
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
        if ( !gameOver ){
            requestAnimationFrame(moveFlame);
        }
    }
    else
    {
        flame.image = document.getElementById('flame1');
        await sleep(700);
        if ( !gameOver ){
            requestAnimationFrame(moveFlame);
        }
    }
    count++;
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
        moveFlame();
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
  gameBackground.draw();
  for (let j = 0; j < bullets.length; j++) {
    bullets[j].draw();
  }
  vaisseau.draw();
  flame.draw();
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
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
  render();
  requestAnimationFrame(loop);
}

// Start the game
requestAnimationFrame(loop);