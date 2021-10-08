/**================================================================================================
 *                                         GLobal Variables
 *================================================================================================**/
let canvas = document.getElementById("mon_canvas");
let ctx = canvas.getContext("2d");
let gameOver = false;
let backgroundPos = -3000;
let i = 0;
let mouse = {
    x: undefined, 
    y:undefined
};
class Sprites {
    constructor(image, posX, posY) {
        this.image = document.getElementById(image);
        this.posX = posX;
        this.posY = posY;
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
/**================================================================================================
 *                                          Global Object
 *================================================================================================**/
let gameBackground = new Sprites('background', 0, -3000);
let vaisseau = new Player('spaceship', 300, 380);
let flame = new Player('flame1', vaisseau.posX, vaisseau.posY+35);
let bullet = new Sprites('laserSmall', vaisseau.posX+30, vaisseau.posY-25);

function updateScreen(){
    gameBackground.draw();
    vaisseau.draw();
    flame.draw();
}

function scrollBackground(){
    if (gameBackground.posY > 0){
        gameBackground.posY = -3000;
    }
    gameBackground.posY += 0.6;
    updateScreen();

    if ( !gameOver ){
        requestAnimationFrame(scrollBackground);
    }
}
window.onload = () =>{
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(gameBackground.image, gameBackground.posX, gameBackground.posY);
    setInterval(scrollBackground(), 1);
    moveFlame();

    ctx.drawImage(vaisseau.image, vaisseau.posX, vaisseau.posY, vaisseau.image.width / 4, vaisseau.image.height / 4);
    ctx.drawImage(flame.image, flame.posX, flame.posY, vaisseau.image.width / 4, vaisseau.image.height / 4);
}


canvas.onmousemove = function(event) { 
    mouse.x = event.x - this.offsetLeft; 
    mouse.y = event.y - this.offsetTop;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    vaisseau.posX = mouse.x-( ( vaisseau.image.width / 4 ) / 2 ) - 2;
    flame.posX = mouse.x-( ( vaisseau.image.width / 4 ) / 2 ) - 2;
    vaisseau.draw();
    flame.draw();

    canvas.onclick = function(event) { 
        ctx.drawImage(bullet.image, mouse.x-( vaisseau.image.width / 14 ), bullet.posY, bullet.image.width / 1.8, bullet.image.height / 1.8);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function moveFlame(){
    if ( i % 2 == 0)
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
        await sleep(80);
        if ( !gameOver ){
            requestAnimationFrame(moveFlame);
        }
    }
    i++;
}


