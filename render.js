var render = function() {
    requestAnimationFrame(render);

    camera.lookAt(field.position);
 
    detectCollision();    
    
    if (collizionDet == true) {
        ball.position.set( cubes[current].position.x, cubes[current].position.y + 0.9, cubes[current].position.z - 2);        
        ball.__dirtyPosition = true;
    }

    scene.simulate();
    renderer.render(scene, camera);
};

render();
