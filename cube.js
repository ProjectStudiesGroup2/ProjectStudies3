var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({ color: 0x1f8b08 });
var cube = new Physijs.BoxMesh(geometry, material);
var cube2 = new Physijs.BoxMesh(geometry, material);
cube.position.set(0, 10, 0);
cube.castShadow = true;
cube2.castShadow = true;
scene.add(cube);
scene.add(cube2);


var speed = 20;
var curr = cube;

var pressed = {};
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "a":
            curr = cube;
            break;
        case "e":
            curr = cube2;
            break;
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
