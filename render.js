var target = new THREE.Vector3(0, 0, 0);
var render = function() {
    requestAnimationFrame(render);

    //  scoresprite.lookAt(camera.position);   //change this for the over-gate goal counter

    if (collisionDet == true) {
        camera.position.z = team1.player.position.z;
        target.copy(team1.player.position);
    } else if (collisionDet2 == true) {
        camera.position.z = team2.player.position.z;
        target.copy(team2.player.position);
    } else {
        camera.position.z = ball.position.z;
        target.copy(ball.position);
    }

    if (Math.abs(ball.position.z) >= 45 && Math.abs(ball.position.x) <= 35) {
        camera.position.x = 60;
        camera.position.y = 60; 

        if (ball.position.z > 0) {
            team1.goalieEnable = true;
        } else if ((ball.position.z <= 0) ) {
            team2.goalieEnable = true;
        }
    } else {            
        camera.position.x = 95;
        camera.position.y = 80;
        team1.goalieEnable = false;
        team2.goalieEnable = false;
    }

    target.x = 0;
    camera.lookAt(target);


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
    var goalOvations = new Audio('sounds/goal.mp3');
    goalOvations.volume = 0.75;

    for (var vertexIndex = 0; vertexIndex < ball.geometry.vertices.length; vertexIndex++){
      var localVertex = ball.geometry.vertices[vertexIndex].clone();
      var globalVertex = localVertex.applyMatrix4(ball.matrix);
      var directionVector = globalVertex.sub(ball.position);

      var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
      var collisionResults = ray.intersectObject(detector);
      if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()){
        resetBall();
        scoreT1 = scoreT1 + 1;
        message = scoreT1;
        goalOvations.play();
        console.log('GOAL! on gate R', scoreT1);
      };
      var ray2 = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
      var collisionResults2 = ray2.intersectObject(detector2);
      if (collisionResults2.length > 0 && collisionResults2[0].distance < directionVector.length()){
        resetBall();
        scoreT2 = scoreT2 + 1;
        message = scoreT2;
        goalOvations.play();
        console.log('GOAL! on gate L', scoreT2);
      };
    }

    $('#score1').empty().append(scoreT1);
    $('#score2').empty().append(scoreT2);
      /***************************/

    detectCollision();
    if (collisionDet == true) {
        collisionDet2 = false;
        ball.position.set(team1.player.position.x, team1.player.position.y + 0.9, team1.player.position.z - 2);
        setBallToPlayer();
    } else if (collisionDet2 == true) {
        collisionDet = false;
        ball.position.set(team2.player.position.x, team2.player.position.y + 0.9, team2.player.position.z + 2);
        setBallToPlayer();
    }


    //*** Start game ***//
    if (start == true) {
        resetBall();
        playWhistle();
        start = false;
    }


      //*** Ball reset ***//
    if ( ball.position.x <= -fieldWidth/2 || ball.position.x >= fieldWidth/2 ) {
        playWhistle();
        resetBall();
    }
    else if ( ball.position.z <= -fieldHeight/2.2 ) {
        resetBallToRight();
        playWhistle();
    }
    else if ( ball.position.z >= fieldHeight/2.2 ) {
        resetBallToLeft();
        playWhistle();
    }

    //*** Animated Texture ***//
    var delta = clock.getDelta();
    animL.update(1000 * delta);
    animR.update(1000 * delta);
    animTop.update(1000 * delta);
    animBot.update(1000 * delta);

    scene.simulate();
    renderer.render(scene, camera);
};

render();
