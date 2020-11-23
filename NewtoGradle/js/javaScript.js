import * as THREE from '../node_modules/three/src/Three.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
const scene = new THREE.Scene();
//scene.background = new THREE.Color(0xf0f0f0);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const rightRopeRotation = 0;
const leftRopeRotation = 0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//directionalLight
const light = new THREE.DirectionalLight(0xffffff, 1);
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
//scene.add(helper);
const helper1 = new THREE.CameraHelper(light.shadow.camera);
//scene.add(helper1);
//mouseMovement
window.addEventListener('resize', function () {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
const controls = new OrbitControls(camera, renderer.domElement);
controls.maxDistance = 150;
//holder
const holderGeometry = new THREE.BoxGeometry(45, 1, 1);
const holderMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const holder = new THREE.Mesh(holderGeometry, holderMaterial);
holder.position.y += 35;
holder.receiveShadow = true;
holder.castShadow = true;
scene.add(holder);
//rope
const ropeLength = 30;
const ropeGeometry = new THREE.BoxGeometry(0.5, ropeLength, 0.5);
const ropeMaterial = new THREE.MeshBasicMaterial({ color: "#FF3800" });
// change ropes' origin (pivot) for rotation
ropeGeometry.translate(0, -15, 0);
//rightRope
const rightRope = new THREE.Mesh(ropeGeometry, ropeMaterial);
rightRope.position.y = 35;
rightRope.position.x += 15;
rightRope.receiveShadow = true;
rightRope.castShadow = true;
scene.add(rightRope);
//secondRope
const secondRope = new THREE.Mesh(ropeGeometry, ropeMaterial);
secondRope.position.y += 35;
secondRope.position.x += 5;
secondRope.receiveShadow = true;
secondRope.castShadow = true;
scene.add(secondRope);
//thirdRope
const thirdRope = new THREE.Mesh(ropeGeometry, ropeMaterial);
thirdRope.position.y += 35;
thirdRope.position.x -= 5;
thirdRope.receiveShadow = true;
thirdRope.castShadow = true;
scene.add(thirdRope);
//leftRope
const leftRope = new THREE.Mesh(ropeGeometry, ropeMaterial);
leftRope.position.y += 35;
leftRope.position.x -= 15;
leftRope.receiveShadow = true;
leftRope.castShadow = true;
scene.add(leftRope);
//ball
const ballGeometry = new THREE.SphereBufferGeometry(5, 32, 32);
const ballMaterial = new THREE.MeshPhysicalMaterial({ metalness: 1, roughness: 0.6, transparent: true });
//firstBall
const firstBall = new THREE.Mesh(ballGeometry, ballMaterial);
firstBall.position.y += 5;
firstBall.position.x += 5;
firstBall.receiveShadow = true;
firstBall.castShadow = true;
scene.add(firstBall);
//secondBall
const secondBall = new THREE.Mesh(ballGeometry, ballMaterial);
secondBall.position.y += 5;
secondBall.position.x -= 5;
secondBall.receiveShadow = true;
secondBall.castShadow = true;
scene.add(secondBall);
//leftBall
const leftBall = new THREE.Mesh(ballGeometry, ballMaterial);
leftBall.position.y += 5;
leftBall.position.x = -15;
leftBall.receiveShadow = true;
leftBall.castShadow = true;
scene.add(leftBall);
//rightBall
const rightBall = new THREE.Mesh(ballGeometry, ballMaterial);
rightBall.position.y = 5;
rightBall.position.x = 15;
rightBall.receiveShadow = true;
rightBall.castShadow = true;
scene.add(rightBall);
//floor
const meshFloor = new THREE.Mesh(new THREE.PlaneBufferGeometry(60, 80, 32, 32), new THREE.MeshStandardMaterial({ color: "#FFFFFF", wireframe: false }));
meshFloor.rotation.x -= Math.PI / 2;
meshFloor.receiveShadow = true;
scene.add(meshFloor);
//cameraPosition
camera.position.z = 70;
camera.position.y = 20;
let rightSpeed = 0;
let leftSpeed = 0.01;
const ballspeed = 0.3;
//const ang = 45;
let isStopped = false;
leftRope.rotation.z = -35 * Math.PI / 180;
let materialArray = [];
let texture_rt = new THREE.TextureLoader().load('img/posz.jpg');
let texture_bk = new THREE.TextureLoader().load('img/negx.jpg');
let texture_up = new THREE.TextureLoader().load('img/posy.jpg');
let texture_dn = new THREE.TextureLoader().load('img/negy.jpg');
let texture_ft = new THREE.TextureLoader().load('img/posx.jpg');
let texture_lf = new THREE.TextureLoader().load('img/negz.jpg');
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));
for (let i = 0; i < 6; i++)
    materialArray[i].side = THREE.BackSide;
let skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
let skybox = new THREE.Mesh(skyboxGeo, materialArray);
scene.add(skybox);
const loader = new THREE.FontLoader();
loader.load('fonts/IBM Plex Mono ExtraLight_Italic.json', function (font) {
    const textGeometry = new THREE.TextGeometry('Hello three.js!', {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
    });
    var textMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, specular: 0xffffff });
    var mesh = new THREE.Mesh(textGeometry, textMaterial);
    //scene.add( mesh );
});
const animate = function () {
    requestAnimationFrame(animate);
    if (!isStopped) {
        if (rightSpeed == 0) {
            if (leftRope.rotation.z <= -45 * Math.PI / 180 || leftRope.rotation.z >= 0) {
                leftSpeed *= -1;
            }
            if (leftRope.rotation.z >= 0) {
                leftSpeed = 0;
                leftRope.rotation.z = 0;
                rightSpeed = 0.01;
            }
        }
        else if (leftSpeed == 0) {
            if (rightRope.rotation.z >= 45 * Math.PI / 180 || rightRope.rotation.z <= 0) {
                rightSpeed *= -1;
            }
            if (rightRope.rotation.z <= 0) {
                rightSpeed = 0;
                rightRope.rotation.z = 0;
                leftSpeed = -0.01;
            }
        }
        rightRope.rotation.z += rightSpeed;
        leftRope.rotation.z += leftSpeed;
        const ang = rightRope.rotation.z;
        rightBall.position.y = 35 - Math.cos(ang) * ropeLength;
        rightBall.position.x = 15 + Math.sin(ang) * ropeLength;
        const ang2 = leftRope.rotation.z;
        leftBall.position.y = 35 - Math.cos(ang2) * ropeLength;
        leftBall.position.x = -15 + Math.sin(ang2) * ropeLength;
    }
    controls.update();
    renderer.render(scene, camera);
};
window.addEventListener('keydown', function (event) {
    if (event.key == "a") {
        isStopped = !isStopped;
    }
});
animate();
