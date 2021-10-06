var targets = []; //hold all the targets
let canvas = document.getElementById("mon_canvas");
let ctx = canvas.getContext("2d");
var mouse = {
    x: undefined, 
    y:undefined
};
canvas.onmousemove = function(event) { 
    mouse.x = event.x - this.offsetLeft; 
    mouse.y = event.y - this.offsetTop;
}

function createSquare(){
    height = 30;
    width = 30;
    let posX = Math.floor(Math.random() * 770) + 1;
    let posY = Math.floor(Math.random() * 370) + 1;
    target = [ posX, posY ];

    ctx.rect( posX, posY, width, height);
    ctx.fill();

    targets.push(target)
}

function generateSquare(nbr){

    for ( let i = 0; i < nbr; i++)
    {
        createSquare();
    }
}

function createWeapon(){
    
    // ctx.beginPath();
    // ctx.moveTo(290, 460);
    // ctx.lineTo(290, 500);
    // ctx.lineTo(330, 500);
    // ctx.lineTo(330, 460);
    // ctx.closePath();
    // ctx.fillStyle = "blue";
    // ctx.fill();

    // ctx.beginPath();
    // ctx.moveTo(305, 445);
    // ctx.lineTo(305, 460);
    // ctx.lineTo(315, 460);
    // ctx.lineTo(315, 445);
    // ctx.closePath();
    // ctx.fillStyle = "blue";
    // ctx.fill();

        
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.moveTo(290, 460);
    ctx.lineTo(290, 500);
    ctx.lineTo(330, 500);
    ctx.lineTo(330, 460);
    ctx.lineTo(315, 465);
    ctx.lineTo(315, 445);
    ctx.lineTo(305, 445);
    ctx.lineTo(305, 465);
    ctx.closePath();
    ctx.fillStyle = "darkorange";
    ctx.fill();

}


generateSquare(5);
createWeapon();

ctx.stroke();
console.log(targets);

