Physijs.scripts.worker = 'libraries/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

var scene = new Physijs.Scene();

/*** Axis ***/
var axis = new THREE.AxisHelper(10);
axis.position.set(0, 0, 0);
scene.add(axis);

var textureLoader = new THREE.TextureLoader();

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xdddddd);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
document.body.appendChild(renderer.domElement);



var gamepads = {};
function gamepadHandler(event, connecting) {
    var gamepad = event.gamepad;
    if (connecting) {
        gamepads[gamepad.index] = gamepad;
    } else {
        delete gamepads[gamepad.index];
    }
}

window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);
