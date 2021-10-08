let canvas = document.getElementById("mon_canvas");
let ctx = canvas.getContext("2d");
let gameOver = false;
let backgroundPos = -3000;
let mouse = {
    x: undefined, 
    y:undefined
};


class sprites {
    constructor(image, posX, posY) {
        this.image = document.getElementById(image);
        this.posX = posX;
        this.posY = posY;
    }
    draw(){
        ctx.drawImage(this.image, this.posX, this.posY);
    }
}

canvas.onmousemove = function(event) { 
    mouse.x = event.x - this.offsetLeft; 
    mouse.y = event.y - this.offsetTop;
}

let gameBackground = new sprites('background', 0, -3000)
function scrollBackground(gameBackground){
    let ctx = canvas.getContext("2d");
    if (gameBackground.posY > 0){
        gameBackground.posY = -3000;
    }
    gameBackground.posY += 2;
    ctx.drawImage(this.image, this.posX, this.posY);
    console.log(gameBackground, gameBackground.posX, gameBackground.posY); 
    console.log(gameBackground);

    requestAnimationFrame(scrollBackground);
}




window.onload = () =>{
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // let gameBackground = new sprites('background', 0, -3000);
    ctx.drawImage(gameBackground.image, gameBackground.posX, gameBackground.posY);

    setInterval(scrollBackground(gameBackground), 3000);

    // setInterval(scrollBackground(gameBackground), 3000);
                            


                        // var mousedownID = -1;  //Global ID of mouse down interval
                        // function mousedown(event) {
                        // if(mousedownID==-1)  //Prevent multimple loops!
                        //     mousedownID = setInterval(whilemousedown, 1 /*execute every 100ms*/);
                        
                        
                        // }
                        // function mouseup(event) {
                        // if(mousedownID!=-1) {  //Only stop if exists
                        //     clearInterval(mousedownID);
                        //     mousedownID=-1;
                        // }
                        
                        // }
                        // function whilemousedown() {
                        //     if (gameBackground.posY > 0){
                        //         gameBackground.posY = -3000;
                        //     }
                        //     gameBackground.posY += 10;
                        //     gameBackground.draw();
                        //     console.log(gameBackground, gameBackground.posX, gameBackground.posY); 
                        // }
                        // //Assign events
                        // document.addEventListener("mousedown", mousedown);
                        // document.addEventListener("mouseup", mouseup);
                        // //Also clear the interval when user leaves the window with mouse
                        // document.addEventListener("mouseout", mouseup);







    console.log(gameBackground);

    let vaisseau = new sprites('spaceship', 300, 380);
    ctx.drawImage(vaisseau.image, vaisseau.posX, vaisseau.posY, vaisseau.image.width / 4, vaisseau.image.height / 4);


    let flame = new sprites('flame1', vaisseau.posX, vaisseau.posY+35);
    ctx.drawImage(flame.image, flame.posX, flame.posY, vaisseau.image.width / 4, vaisseau.image.height / 4);
    

    let bullet1 = new sprites('laserSmall', vaisseau.posX+30, vaisseau.posY-25);
    ctx.drawImage(bullet1.image, bullet1.posX, bullet1.posY, bullet1.image.width / 1.8, bullet1.image.height / 1.8);

    return gameBackground, vaisseau, flame, bullet1;
}

