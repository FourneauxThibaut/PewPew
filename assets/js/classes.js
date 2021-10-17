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
class Explosion extends Sprites {
    init( bulletX, targetY) {
        let currentExplosionFrame = 0;
        let frameWidth = explosionImg.width / explosionColumns;
        let frameHeight = explosionImg.height;
        ctx.drawImage(this.image, currentExplosionFrame * frameWidth, 0, this.x, this.y, frameWidth, frameHeight);
    }
    draw() {
        if (this.alive){
            ctx.drawImage(this.image, currentExplosionFrame * frameWidth, 0, this.x, this.y, frameWidth, frameHeight);
        }
    }
    update() {
        if (this.alive){
            // update the x value only if the object is alive
            currentExplosionFrame++;
            // Check if the bullet is on screen
            if (explosionColumns >= 6) {
                this.alive = false;
            }
        }
    }
}