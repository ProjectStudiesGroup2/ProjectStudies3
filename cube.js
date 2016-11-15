var cube1 = new Physijs.BoxMesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshLambertMaterial({ color: 0x1c5400 })
);
cube1.position.set(0, 10, 0);
cube1.castShadow = true;
scene.add(cube1);

var cube2 = new Physijs.BoxMesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshLambertMaterial({ color: 0x1c5400 })
);
cube2.castShadow = true;
scene.add(cube2);




var speed = 20;
var curr = cube1;
var cubes = [cube1, cube2]; var idx = 0;
curr.material.color.set(0x38a800);

var pressed = {};
document.addEventListener('keydown', (event) => {
    if (event.key == "a") {
        curr.material.color.set(0x1c5400);
        idx += 1; idx %= 2; curr = cubes[idx];
        curr.material.color.set(0x38a800);
    }

    lv = curr.getLinearVelocity();

    if (!pressed[event.key]) {
        switch (event.key) {
            case "z":
                curr.setLinearVelocity(
                    lv.add({ x: 0, y: 0, z: -speed })
                );
                break;
            case "q":
                curr.setLinearVelocity(
                    lv.add({ x: -speed, y: 0, z: 0 })
                );
                break;
            case "s":
                curr.setLinearVelocity(
                    lv.add({ x: 0, y: 0, z: speed })
                );
                break;
            case "d":
                curr.setLinearVelocity(
                    lv.add({ x: speed, y: 0, z: 0 })
                );
                break;
        }
        pressed[event.key] = true;
    }
}, false);

document.addEventListener('keyup', (event) => {
    lv = curr.getLinearVelocity();

    pressed[event.key] = false;
    switch (event.key) {
        case "z": case "s":
            curr.setLinearVelocity(
                lv.add({ x: 0, y: 0, z: -lv.z })
            );
            break;
        case "q": case "d":
            curr.setLinearVelocity(
                lv.add({ x: -lv.x, y: 0, z: 0 })
            );
            break;
    }
}, false);
