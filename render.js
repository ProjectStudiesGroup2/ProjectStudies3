var render = function() {
    requestAnimationFrame(render);

    camera.lookAt(field.position);

    scene.simulate();
    renderer.render(scene, camera);
};

render();
