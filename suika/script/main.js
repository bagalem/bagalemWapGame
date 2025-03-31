import {FRUITS} from "./fruits.js";

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World;

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
    isStatic : true,
    render: {fillStyle: '#E6B143'}                            
});

World.add(world, [LeftWall,RightWall,Ground,TopLine]);


Render.run(render);
Runner.run(engine);


//과일을 추가하는 함수

function addFruit(){
    const fruit = FRUITS[0];
    const body = Bodies.circle(300,50,fruit.radius,{
        render:{
            sprite: {texture : `${fruit.name}.png`}
        }

    });
    World.add(world,body);
}

addFruit();