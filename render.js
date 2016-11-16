var render = function() {
    requestAnimationFrame(render);

    camera.lookAt(field.position);

    clearText();    
    var originPoint = cubes[current].position.clone();
 
    detectCollision();
    
    if (collizionDet == true) {
        ball.position.set( cubes[current].position.x + 2, cubes[current].position.y + 2, cubes[current].position.z);
        ball.__dirtyPosition = true;

    }

    scene.simulate();
    renderer.render(scene, camera);
};

render();
