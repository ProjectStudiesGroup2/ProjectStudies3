var render = function() {
    requestAnimationFrame(render);

    // detector.lookAt(camera.position);   //change this for the over-gate goal counter

    if (collisionDet == true) {
        camera.position.z = team1.player.position.z;
        camera.lookAt(team1.player.position);
    }
    else if (collisionDet2 == true) {
        camera.position.z = team2.player.position.z;
        camera.lookAt(team2.player.position);
    }
    else {
        camera.position.z = ball.position.z;
        camera.lookAt(ball.position);
    }


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

      //*** Goal Detector ***//
    var originPoint = ball.position.clone();

    for (var vertexIndex = 0; vertexIndex < ball.geometry.vertices.length; vertexIndex++){
      var localVertex = ball.geometry.vertices[vertexIndex].clone();
      var globalVertex = localVertex.applyMatrix4(ball.matrix);
      var directionVector = globalVertex.sub(ball.position);

      var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
      var collisionResults = ray.intersectObjects(collidableMeshList2);
      if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()){
        console.log('GOAL!');
      };
    }

      //*** Goal Output ***//


    detectCollision();
    if (collisionDet == true) {
        collisionDet2 = false;
        ball.position.set( team1.player.position.x, team1.player.position.y + 0.9, team1.player.position.z - 2);
        setBallToPlayer();
    }
    else if (collisionDet2 == true) {
        collisionDet = false;
        ball.position.set( team2.player.position.x, team2.player.position.y + 0.9, team2.player.position.z + 2);
        setBallToPlayer();
    }


      //*** Ball reset ***//
    if (ball.position.x <= -fieldWidth/2 || ball.position.x >= fieldWidth/2
        || ball.position.z <= -fieldHeight/2 || ball.position.z >= fieldHeight/2) {
        resetBall();
    }

    scene.simulate();
    renderer.render(scene, camera);
};

render();
