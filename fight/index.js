const Canvas = document.querySelector("canvas");
const c= Canvas.getContext("2d");


Canvas.width = 1024;
Canvas.height = 576;

c.fillRect(0,0,Canvas.width,Canvas.height)

class Sprite{
    constructor({position, velocity}){
        this.position = position;

        this.width = 50;
        this.height = 150;
    }

    draw(){
        c.fillStyle = "red";
        c.fillRect(this.position.x,this.position.y, this.width,this.height);
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
})

player.draw();