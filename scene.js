'use strict';

Physijs.scripts.worker = 'libraries/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

var scene = new Physijs.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

addCube();

camera.position.z = 5;

var render = function() {
    requestAnimationFrame(render);

    

    scene.simulate();
    renderer.render(scene, camera);
};

render();
