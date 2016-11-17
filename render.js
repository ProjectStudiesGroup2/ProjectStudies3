var render = function() {
    requestAnimationFrame(render);

    camera.lookAt(ball.position);

    if (gamepads[0]) {
        cubes.useGamepad(gamepads[0]);
    }
    detectCollision();

      //*** ball reset ***//
    if (ball.position.x <= -fieldWidth/2){
      ball.position.set(0, 4, 0);
      ball.__dirtyPosition = true;
      ball.rotation.set(0, 0, 0);
      ball.__dirtyRotation = true;
      ball.setLinearVelocity({ x: 0, y: 0, z: 0 });
      ball.setAngularVelocity({ x: 0, y: 0, z: 0 });
      }
    if (ball.position.x >= fieldWidth/2){
      ball.position.set(0, 4, 0);
      ball.__dirtyPosition = true;
      ball.rotation.set(0, 0, 0);
      ball.__dirtyRotation = true;
      ball.setLinearVelocity({ x: 0, y: 0, z: 0 });
      ball.setAngularVelocity({ x: 0, y: 0, z: 0 });
    }
    if (ball.position.z <= -fieldHeight/2){
      ball.position.set(0, 4, 0);
      ball.__dirtyPosition = true;
      ball.rotation.set(0, 0, 0);
      ball.__dirtyRotation = true;
      ball.setLinearVelocity({ x: 0, y: 0, z: 0 });
      ball.setAngularVelocity({ x: 0, y: 0, z: 0 });
    }
    if (ball.position.z >= fieldHeight/2){
      ball.position.set(0, 4, 0);
      ball.__dirtyPosition = true;
      ball.rotation.set(0, 0, 0);
      ball.__dirtyRotation = true;
      ball.setLinearVelocity({ x: 0, y: 0, z: 0 });
      ball.setAngularVelocity({ x: 0, y: 0, z: 0 });
    }

    if (collizionDet == true) {
        ball.position.set( cubes.player.position.x, cubes.player.position.y + 0.9, cubes.player.position.z - 2);
        ball.__dirtyPosition = true;
    }

    scene.simulate();
    renderer.render(scene, camera);
};

render();
