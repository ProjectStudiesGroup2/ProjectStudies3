var render = function() {
    requestAnimationFrame(render);


    camera.lookAt(ball.position);


    if (gamepads[0]) {
        cubes.useGamepad(gamepads[0]);
    }


    detectCollision();

    if (collizionDet == true) {
        ball.position.set( cubes.player.position.x, cubes.player.position.y + 0.9, cubes.player.position.z - 2);
        ball.__dirtyPosition = true;
    }


    scene.simulate();
    renderer.render(scene, camera);
};

render();
