var target = new THREE.Vector3(0, 0, 0);
var render = function() {
    requestAnimationFrame(render);

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

    if (Math.abs(ball.position.z) > 55 && Math.abs(ball.position.x) < 35) {
        camera.position.x = 5;
        toggle();

        if (ball.position.z > 0) {
            team1.goalieEnable = false;
            team2.goalieEnable = true;
        } else {
            team1.goalieEnable = true;
            team2.goalieEnable = false;
        }
    } else {
        camera.position.x = 95;
        untoggle();

        team1.goalieEnable = false;
        team2.goalieEnable = false;
    }

    target.x = 0;
    camera.lookAt(target);


    if (team1.goalieEnable) { console.log("team1"); }
    else if (team2.goalieEnable) { console.log("team2"); }
    else { console.log("00000"); }


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
    if (ball.position.x <= -fieldWidth / 1.7 || ball.position.x >= fieldWidth / 1.7) {
        playWhistle();
        resetBall();
    } else if (ball.position.z <= -fieldHeight / 1.8) {
        resetBallToRight();
        playWhistle();
    } else if (ball.position.z >= fieldHeight / 1.8) {
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
