import {FRUITS} from "./fruits.js";

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World,
    Body = Matter.Body,
    Events = Matter.Events;

const engine = Engine.create();

const render = Render.create({
    engine,
    element: document.body,
    options: {
        wireframes : false,
        background : '#F7F4C8',
        width : 620,
        height:850,
    }
});

const world = engine.world;

const LeftWall = Bodies.rectangle(15,395, 30,790,{
                            //x좌표, y좌표 width,hright
    isStatic : true,
    render: {fillStyle: '#E6B143'}                            
});

const RightWall = Bodies.rectangle(605,395, 30,790,{
    //x좌표, y좌표 width,hright
    isStatic : true,
    render: {fillStyle: '#E6B143'}                            
});

const Ground = Bodies.rectangle(310,820, 620,60,{
    //x좌표, y좌표 width,hright
    isStatic : true,
    render: {fillStyle: '#E6B143'}                            
});
const TopLine = Bodies.rectangle(310,150, 620,2,{
    //x좌표, y좌표 width,hright
    name : "TopLine",
    isStatic : true,
    isSensor : true,
    render: {fillStyle: '#E6B143'}                            
});

World.add(world, [LeftWall,RightWall,Ground,TopLine]);


Render.run(render);
Runner.run(engine);

//현제 과일값을 저장하는 변수
let currentBody = null;
let currentFruit = null;

//과일을 추가하는 함수

//키 조작을 제어하는 변수
let disableAction = false;

function addFruit(){
    

    const index = Math.floor(Math.random() * 5)
    const fruit = FRUITS[index];
    const body = Bodies.circle(300,50,fruit.radius,{
        index : index,
        isSleeping : true,
        render:{
            sprite: {texture : `${fruit.name}.png`}
        },
        restitution : 0.4
    });
    currentBody = body;
    currentFruit = fruit;
    World.add(world,body);
}

///키보드 입력 받기
window.onkeydown = (event) =>{
   
    if(disableAction)
        return;

    switch(event.code){
        case "KeyA":
            if(currentBody.position.x + currentFruit.radius > 30){
                Body.setPosition(currentBody,{
                    x: currentBody.position.x - 5,
                    y: currentBody.position.y
                })
            }
            break;
        case "KeyD":
            if(currentBody.position.x + currentFruit.radius < 590){
                Body.setPosition(currentBody,{
                    x: currentBody.position.x + 5,
                    y: currentBody.position.y
                })
            }
            break;
        case "Space":
            currentBody.isSleeping = false;
            disableAction = true
            //addFruit();
            //시간을 지연시키는 함수
            setTimeout(() => {addFruit(); disableAction = false},1000);
            break;

    }
    
}

Events.on(engine,"collisionStart",(event) => {
    event.pairs.forEach((collision) => {
        //같은 과일일 경우
        if(collision.bodyA.index == collision.bodyB.index){
            //지우기 전에 해당 과일값을 저장
            const index = collision.bodyA.index

            if(index == FRUITS.length - 1)
                return

            World.remove(world,[collision.bodyA,collision.bodyB])
            const newFruit = FRUITS[index + 1]
            const newBody = Bodies.circle(
                collision.collision.supports[0].x,
                collision.collision.supports[0].y,
                newFruit.radius,{index : index + 1,
                render:{
                    sprite: {texture : `${newFruit.name}.png`}
                }   
            })

            World.add(world, newBody)
        }

        if(collision.bodyA.name === "TopLine" || collision.bodyB.name === "TopLine"){
            alert("GameOver");
            disableAction = true;
        }
    })
})

addFruit();