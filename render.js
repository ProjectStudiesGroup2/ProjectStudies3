var render = function() {
    requestAnimationFrame(render);

    camera.lookAt(ball.position);

    scene.simulate();
    renderer.render(scene, camera);
};

render();
