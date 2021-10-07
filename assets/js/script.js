var targets = []; //hold all the targets
let canvas = document.getElementById("mon_canvas");
let ctx = canvas.getContext("2d");
let backgroundPos = -2500;
let mouse = {
    x: undefined, 
    y:undefined
};

canvas.onmousemove = function(event) { 
    mouse.x = event.x - this.offsetLeft; 
    mouse.y = event.y - this.offsetTop;
    console.log(mouse.x);
}
function createAsteroid(){

    let asteroid1 = document.getElementById('asteroid1');
    let asteroid2 = document.getElementById('asteroid2');
    let asteroids = [ asteroid1, asteroid2 ];
    let randomAsteroid = asteroids[Math.floor(Math.random() * asteroids.length)];
    let posX = Math.floor(Math.random() * 770) + 1;
    target = [ posX, -15 ];
    targets.push(target)

    ctx.drawImage(randomAsteroid, posX, 1, randomAsteroid.width * 1.6, randomAsteroid.height * 1.6);
}

function generateAsteroid(nbr){

    for ( let i = 0; i < nbr; i++)
    {
        createAsteroid();
    }
}

function createShip(){
        
    let spaceship = document.getElementById('spaceship');
    let flame1 = document.getElementById('flame1');
    ctx.drawImage(flame1, 300, 420, spaceship.width / 4, spaceship.height / 4);
    ctx.drawImage(spaceship, 300, 380, spaceship.width / 4, spaceship.height / 4);
}

function createBullet(){

    let bullet = document.getElementById('laserSmall');
    ctx.drawImage(bullet, 20, 50, bullet.width / 1.8, bullet.height / 1.8);
}

function createBackground(){

    let background = document.getElementById('background');
    ctx.drawImage(background, 0, backgroundPos);
}

function scrollBackground(){
    background.requestAnimationFrame(scrollBackground); 
    ctx.clearRect(0,0,canvas.width,canvas.height); 
    backgroundPos+=2;
}

window.onload = () =>{
    
    let bullet = document.getElementById('laserSmall');
    ctx.drawImage(bullet, 20, 50, bullet.width / 1.8, bullet.height / 1.8);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    createBackground();
    generateAsteroid(4);
    createShip();
    createBullet();
}

ctx.stroke();
console.log(targets);

