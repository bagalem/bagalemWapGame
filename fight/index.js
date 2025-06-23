const Canvas = document.querySelector("canvas");
const c= Canvas.getContext("2d");


Canvas.width = 1024;
Canvas.height = 576;

c.fillRect(0,0,Canvas.width,Canvas.height)

class Sprite{
    constructor({position, velocity}){
        this.position = position;

        this.velocity = velocity;

        this.width = 50;
        this.height = 150;
    }

    draw(){
        c.fillStyle = "red";
        c.fillRect(this.position.x,this.position.y, this.width,this.height);
    }

    update(){
        this.draw();

        this.position.y += this.velocity.y;
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    velocity:{
        x: 0,
        y: 10,
    },
})

const enemy =  new Sprite({
    position: {
        x: 300,
        y: 100,
    },
    velocity:{
        x: 0,
        y: 10,
    },
})



function aninmate(){
    window.requestAnimationFrame(aninmate);

    c.fillStyle = "black";
    c.fillRect(0,0,Canvas.width,Canvas.height);

    player.update();
    enemy.update();

}

aninmate();