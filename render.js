var render = function() {
    requestAnimationFrame(render);

    camera.lookAt(field.position);

    if (gamepads[0]) {
        cubes.useGamepad(gamepads[0]);
    }

    scene.simulate();
    renderer.render(scene, camera);
};

render();
