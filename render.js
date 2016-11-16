var render = function() {
    requestAnimationFrame(render);

    camera.lookAt(field.position);

    if (gamepads[0]) {
        lv = cubes[current].getLinearVelocity();
        cubes[current].setLinearVelocity(lv.add({
            x: ((Math.abs(gamepads[0].axes[0]) > 0.25 ? gamepads[0].axes[0] : 0) * speed) - lv.x,
            y: 0,
            z: ((Math.abs(gamepads[0].axes[1]) > 0.25 ? gamepads[0].axes[1] : 0) * speed) - lv.z
        }));

        if (gamepads[0].buttons[0].pressed && !pressed["A"]) {
            changeCurrent(getTheClosestTo({ x: 0, y: 0, z: 0 }));
            pressed["A"] = true;
        } else if (!gamepads[0].buttons[0].pressed && pressed["A"]) {
            pressed["A"] = false;
        }
    }

    scene.simulate();
    renderer.render(scene, camera);
};

render();
