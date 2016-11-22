var render = function() {
    requestAnimationFrame(render);

    if (collisionDet == true) {
        camera.lookAt(team1.player.position);
    }
    else if (collisionDet2 == true) {
        camera.lookAt(team2.player.position);
    }
    else { camera.lookAt(ball.position); }


    if (gamepads[0]) {
        team1.useGamepad(gamepads[0]);
    }
    if (gamepads[1]) {
        team2.useGamepad(gamepads[1]);
    }

    for (var i in team1.AIPlayers) {
        team1.AIPlayers[i].useAI();
    }
    for (var i in team2.AIPlayers) {
        team2.AIPlayers[i].useAI();
    }


    detectCollision();

    if (collisionDet == true) {
        ball.position.set( team1.player.position.x, team1.player.position.y + 0.9, team1.player.position.z - 2);
        ball.__dirtyPosition = true;
        ball.rotation.x = 0;
        ball.rotation.y = 0;
        ball.rotation.z = 0;
        ball.__dirtyRotation = true;
        var ballLV = ball.getLinearVelocity();
        ball.setLinearVelocity(
        ballLV.add({
            x: 0,
            y: 0,
            z: 0 })
        );
        collisionDet2 = false;
    }    
    else if (collisionDet2 == true) {
        ball.position.set( team2.player.position.x, team2.player.position.y + 0.9, team2.player.position.z + 2);
        ball.__dirtyPosition = true;
        ball.rotation.x = 0;
        ball.rotation.y = 0;
        ball.rotation.z = 0;
        ball.__dirtyRotation = true;
        var ballLV = ball.getLinearVelocity();
        ball.setLinearVelocity(
        ballLV.add({
            x: 0,
            y: 0,
            z: 0 })
        );
        collisionDet = false;
    }


      //*** ball reset ***//
    if (ball.position.x <= -fieldWidth/2) {
        ballMoving = true;
        collisionDet = false;
        collisionDet2 = false;
        ball.position.set(0, 4, 0);
        ball.__dirtyPosition = true;
        ball.rotation.set(0, 0, 0);
        ball.__dirtyRotation = true;
        ball.setLinearVelocity({ x: 0, y: 0, z: 0 });
        ball.setAngularVelocity({ x: 0, y: 0, z: 0 });
    }
    else if (ball.position.x >= fieldWidth/2){
        ballMoving = true;
        collisionDet = false;
        collisionDet2 = false;
        ball.position.set(0, 4, 0);
        ball.__dirtyPosition = true;
        ball.rotation.set(0, 0, 0);
        ball.__dirtyRotation = true;
        ball.setLinearVelocity({ x: 0, y: 0, z: 0 });
        ball.setAngularVelocity({ x: 0, y: 0, z: 0 });
    }
    if (ball.position.z <= -fieldHeight/2){
        ballMoving = true;
        collisionDet = false;
        collisionDet2 = false;
        ball.position.set(0, 4, 0);
        ball.__dirtyPosition = true;
        ball.rotation.set(0, 0, 0);
        ball.__dirtyRotation = true;
        ball.setLinearVelocity({ x: 0, y: 0, z: 0 });
        ball.setAngularVelocity({ x: 0, y: 0, z: 0 });
    }
    else if (ball.position.z >= fieldHeight/2){
        ballMoving = true;
        collisionDet = false;
        collisionDet2 = false;
        ball.position.set(0, 4, 0);
        ball.__dirtyPosition = true;
        ball.rotation.set(0, 0, 0);
        ball.__dirtyRotation = true;
        ball.setLinearVelocity({ x: 0, y: 0, z: 0 });
        ball.setAngularVelocity({ x: 0, y: 0, z: 0 });
    }


    scene.simulate();
    renderer.render(scene, camera);
};

render();
