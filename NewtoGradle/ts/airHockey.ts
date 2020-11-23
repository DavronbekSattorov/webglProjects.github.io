/*import * as THREE from '../node_modules/three/src/Three.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js'
import { GUI} from '../node_modules/three/examples/jsm/libs/dat.gui.module'


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor("#325374");
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//light
const light = new THREE.DirectionalLight(0xffffff, 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
light.position.set(0, 100, 80);
light.castShadow = true;
light.shadow.mapSize.width = 2048; // default
light.shadow.mapSize.height = 2048; // default
light.shadow.camera.near = 0.1; // default
light.shadow.camera.far = 160; // default
light.shadow.camera.left = -30;
light.shadow.camera.right = 30;
light.shadow.camera.top = 50;
light.shadow.camera.bottom = -30;
scene.add(light);
const helper = new THREE.DirectionalLightHelper(light, 30);
scene.add(helper);
const helper1 = new THREE.CameraHelper(light.shadow.camera);
scene.add(helper1);


//ball
var radiusBall = 2;
const ballGeometry = new THREE.SphereBufferGeometry( radiusBall, 32, 32 );
const ballMaterial = new THREE.MeshMatcapMaterial();
const ball = new THREE.Mesh( ballGeometry, ballMaterial );
ball.position.y = 2;
scene.add( ball );


//player
var radiusPlayerUp = 3;
var radiusPlayerDown = 5;
const playerGeometry = new THREE.CylinderBufferGeometry( radiusPlayerUp, radiusPlayerDown, 3, 32 );
const playerMaterial = new THREE.MeshPhongMaterial( {color: "#2C3E50", wireframe:false} );


//player1
const player1 = new THREE.Mesh( playerGeometry, playerMaterial );
player1.position.y = 2.5;
player1.position.z = 30;
scene.add( player1 );


//player2
const player2 = new THREE.Mesh( playerGeometry, playerMaterial );
player2.position.y = 2.5;
player2.position.z = -30;
scene.add( player2 );


//backFrontBorder
const backFrontBorderGeometry = new THREE.BoxBufferGeometry( 25, 3, 3 );
const backFrontBorderMaterial = new THREE.MeshNormalMaterial( {color: "#A3E4D7", wireframe:false} );


//-backBorderRight
const backBorderRight = new THREE.Mesh( backFrontBorderGeometry, backFrontBorderMaterial );
backBorderRight.position.z = -40;
backBorderRight.position.y = 1.5;
backBorderRight.position.x = 20;
scene.add( backBorderRight );


//-backBorderLeft
const backBorderLeft = new THREE.Mesh( backFrontBorderGeometry, backFrontBorderMaterial );
backBorderLeft.position.z = -40;
backBorderLeft.position.y = 1.5;
backBorderLeft.position.x = -20;
scene.add( backBorderLeft );


//+frontBorderRight
const frontBorderRight = new THREE.Mesh( backFrontBorderGeometry, backFrontBorderMaterial );
frontBorderRight.position.z = 40;
frontBorderRight.position.y = 1.5;
frontBorderRight.position.x = 20;
scene.add( frontBorderRight );


//+frontBorderLeft
const frontBorderLeft = new THREE.Mesh( backFrontBorderGeometry, backFrontBorderMaterial );
frontBorderLeft.position.z = 40;
frontBorderLeft.position.y = 1.5;
frontBorderLeft.position.x = -20;
scene.add( frontBorderLeft );


//rightAndLeftBorder
const rightLeftBorderGeometry = new THREE.BoxBufferGeometry( 3, 3, 80 );
const rightLeftBorderMaterial = new THREE.MeshNormalMaterial( {color: "#A3E4D7", wireframe:false} );


//rightBorder
const rightBorder = new THREE.Mesh( rightLeftBorderGeometry, rightLeftBorderMaterial );
rightBorder.position.y = 1.5;
rightBorder.position.x = 31;
scene.add( rightBorder );


//leftBorder
const leftBorder = new THREE.Mesh( rightLeftBorderGeometry, rightLeftBorderMaterial );
leftBorder.position.y = 1.5;
leftBorder.position.x = -31;
scene.add( leftBorder );


//mouse movement
window.addEventListener('resize', function () {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});


//playerControl
window.addEventListener('keydown', function (event) {
    //player2
    if (event.key == "d") {
         
         if(player2.position.x >= 24){
             player2.position.x = 24;
         }else{
                 player2.position.x += 1;
         }

    }else if (event.key == "a"){

        if(player2.position.x <= -24){
                 player2.position.x = -24;
             }else{
                 player2.position.x -= 1;
         }

    }else if (event.key == "s"){
        if(player2.position.z <= -33){
             player2.position.z = -33;
         }else{
                 player2.position.z -= 1;
         }

    }else if (event.key == "w"){
        if(player2.position.z >= 33){
             player2.position.z = 33;
         }else{
                 player2.position.z += 1;
         }

    }



    //player1
    if (event.key == "l") {
         
         if(player1.position.x >= 24){
             player1.position.x = 24;
         }else{
                 player1.position.x += 1;
         }

    }else if (event.key == "j"){

        if(player1.position.x <= -24){
                 player1.position.x = -24;
             }else{
                 player1.position.x -= 1;
         }

    }else if (event.key == "i"){
        if(player1.position.z <= -33){
             player1.position.z = -33;
         }else{
                 player1.position.z -= 1;
         }

    }else if (event.key == "k"){
        if(player1.position.z >= 33){
             player1.position.z = 33;
         }else{
                 player1.position.z += 1;
         }

    }

});
const controls = new THREE.OrbitControls(camera, renderer.domElement);


//cameraPosition
camera.position.z = 80;
camera.position.y = 20;


//floor
const meshFloor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(80, 100, 32, 32), 
    new THREE.MeshStandardMaterial({ color: "#FFFFFF", wireframe: false })
);
meshFloor.rotation.x -= Math.PI / 2;
meshFloor.receiveShadow = true;
scene.add(meshFloor);


 //GUI
var gui = new dat.GUI();
var jar;
parameters = {
    a: "Air Hockey 3D",
    b: "Sphere",
    c: true,
    d: "#E72C2C",
    e: "#2C3E50",
    f: "#2C3E50",

}


gui.add(parameters, 'a').name("Name");
gui.add(parameters, 'b', ["Cube","Sphere","Prism"]).name('Geometry');
var showModel = gui.addFolder("Show Model");

var ballModel = showModel.add(parameters, 'c').name("Ball");
var player1Model = showModel.add(parameters, 'c').name("Player1");
var player2Model = showModel.add(parameters, 'c').name("Player2");

player1Model.onChange(function(jar){player1.visible = jar;});
player2Model.onChange(function(jar){player2.visible = jar;});
ballModel.onChange(function(jar){ball.visible = jar;});

var color = gui.addFolder("Color");
var ballColor = color.addColor(parameters, "d").name('Ball Color');
var playersColor = color.addColor(parameters, "e").name('Players Color');
ballColor.onChange(function(jar){ball.material.color.setHex(jar.replace("#", "0x", ));});
playersColor.onChange(function(jar){player1.material.color.setHex(jar.replace("#", "0x", ));});


gui.close();
gui.open();



//getDistance
function getDistance(x1,z1,x2,z2){
    let xDistance = x2 - x1;
    let zDistance = z2 - z1;

    return Math.sqrt(Math.pow(xDistance,2) +  Math.pow(zDistance,2));
}

var zSpeed = 0;
var xSpeed = 0;
var distanceZ;
var distanceX;
var distanceZ1;
var distanceX1;
var step = 0.01; 



const loader = new THREE.FontLoader();

loader.load( 'IBM Plex Mono ExtraLight_Italic.json', function ( font ) {

const textGeometry = new THREE.TextGeometry( 'Hello three.js!', {
font: font,
size: 80,
height: 5,
curveSegments: 12,
bevelEnabled: true,
bevelThickness: 10,
bevelSize: 8,
bevelOffset: 0,
bevelSegments: 5
} );

var textMaterial = new THREE.MeshPhongMaterial( 
{ color: 0xff0000, specular: 0xffffff }
);

var mesh = new THREE.Mesh( textGeometry, textMaterial );

scene.add( mesh );
} );







//animate
var animate = function () {
    requestAnimationFrame( animate );

    distanceZ = ball.position.z - player2.position.z;
    distanceX = ball.position.x - player2.position.x;
    distanceZ1 = ball.position.z - player1.position.z;
    distanceX1 = ball.position.x - player1.position.x;

    if(getDistance(player2.position.x,player2.position.z, ball.position.x, ball.position.z) <= radiusPlayerDown+radiusBall-1){
        zSpeed = distanceZ * 0.2;
        xSpeed = distanceX * 0.2;

    }else if(ball.position.x >= 26 || ball.position.x <= -26 || (ball.position.z <= -36 && (ball.position.x > 5 || ball.position.x < -6)) || (ball.position.z >= 36 && (ball.position.x > 5 || ball.position.x < -6))){
        zSpeed = -distanceZ * 0.02;
        xSpeed = -distanceX * 0.02;

    }else if(getDistance(player1.position.x,player1.position.z, ball.position.x, ball.position.z) <= radiusPlayerDown+radiusBall-1){
        zSpeed = distanceZ1 * 0.2;
        xSpeed = distanceX1 * 0.2;
    }


    if(zSpeed >= step){
        zSpeed -= step;
        
    }else if(zSpeed < step && zSpeed > -step ){
        zSpeed = 0;
    }else if(zSpeed <= -step){
        zSpeed += step;	
    }



    if(xSpeed >= step){
        xSpeed -= step;
        
    }else if(xSpeed < step && xSpeed > -step ){
        xSpeed = 0;
    }else if(xSpeed <= -step){
        xSpeed += step;	
    }

    if(ball.position.x >= 15){
        distanceX =- distanceX;
        distanceZ =- distanceZ;
    }



    ball.position.z += zSpeed;
    ball.position.x += xSpeed;

    renderer.render( scene, camera );
};

animate();*/