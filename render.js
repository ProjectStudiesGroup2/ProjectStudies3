var render = function() {
    requestAnimationFrame(render);
    
    if (collisionDet == true) {
        camera.position.z = team1.player.position.z;
         camera.lookAt(team1.player.position); 
        if (team1.player.position.z >= 65 || team1.player.position.z <= -65) 
        {     
             while (camera.position.x >= 5 ) {
              camera.position.x -= 1;
             camera.lookAt(team1.player.position);
         }
    }
     }      
        
    else if (collisionDet2 == true) {
        camera.position.z = team2.player.position.z;
        camera.lookAt(team2.player.position);
        if (team2.player.position.z >= 65 || team2.player.position.z <= -65) 
        {
              
             while (camera.position.x >= 5 ) {
              camera.position.x -= 1;
             camera.lookAt(team2.player.position);}
                    
        }  
    }
    else { 
        camera.position.z = ball.position.z;
        camera.lookAt(ball.position); 
    }
    // var relativeCameraOffset = new THREE.Vector3(100, 75, 0);
    // var cameraOffset = relativeCameraOffset.applyMatrix4( ball.matrixWorld );
    // camera.position.z = cameraOffset.z;
    // camera.lookAt( team1.player.position );



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
        ball.position.set( team1.player.position.x, team1.player.position.y + 0.9, team1.player.position.z - 2);
        setBallToPlayer();
    } 
    else if (collisionDet2 == true) {
        collisionDet = false;
        ball.position.set( team2.player.position.x, team2.player.position.y + 0.9, team2.player.position.z + 2);
        setBallToPlayer();        
    }

    if (team2.player.position.z == team1.player.position.z - 2) {
        collisionDet2 == true;
    }


      //*** Ball reset ***//
    if (ball.position.x <= -fieldWidth/2 || ball.position.x >= fieldWidth/2
        || ball.position.z <= -fieldHeight/2 || ball.position.z >= fieldHeight/2) {
        resetBall();
    }
    //*** camera zoom to the ball***//

    scene.simulate();
    renderer.render(scene, camera);
};

render();
