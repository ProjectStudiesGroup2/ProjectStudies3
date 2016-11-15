var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var render = function() {
    requestAnimationFrame(render);

    

    scene.simulate();
    renderer.render(scene, camera);
};

render();
