var render = function() {
    requestAnimationFrame(render);

    camera.lookAt(ball.position);

    if (gamepads[0]) {
        cubes.useGamepad(gamepads[0]);
    }
    detectCollision();    
    
    if (collizionDet == true) {
        ball.position.set( cubes.player.position.x, ball.position.y, cubes.player.position.z - 3);        
        ball.__dirtyPosition = true;
    }

    scene.simulate();
    renderer.render(scene, camera);
};

render();
