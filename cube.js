
var cubes = {};
for (var i = 0; i < 2; i++) {
    cubes[i] = new Physijs.BoxMesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshLambertMaterial({ color: 0x805900 })
    );
    cubes[i].position.set(i * 2 - 1, 0, 0);
    cubes[i].castShadow = true;
    scene.add(cubes[i]);
}



// function getTheClosestTo(vec) {
//     var min = Infinity; var res;
//
//     for (var i in cubes) {
//         if (cubes[i].position.distanceTo(vec) < min && i != current)
//             res = i;
//     }
//
//     return res;
// }
//
//
//
// function changeCurrent() {
//     cubes[current].material.color.set(0x805900);
//
//     current = getTheClosestTo({ x: 0, y: 0, z: 0 });;
//
//     cubes[current].material.color.set(0xbf8600);
// }


var current = 0;
cubes[current].material.color.set(0xbf8600);
// changeCurrent();

var speed = 20; var pressed = {};
document.addEventListener('keydown', (event) => {
    if (event.code == "KeyE") {
        cubes[current].material.color.set(0x805900);
        current += 1; current %= 2;
        cubes[current].material.color.set(0xbf8600);
    }

    lv = cubes[current].getLinearVelocity();

    if (!pressed[event.code]) {
        switch (event.code) {
            case "KeyW":
                cubes[current].setLinearVelocity(
                    lv.add({ x: 0, y: 0, z: -speed })
                );
                break;
            case "KeyA":
                cubes[current].setLinearVelocity(
                    lv.add({ x: -speed, y: 0, z: 0 })
                );
                break;
            case "KeyS":
                cubes[current].setLinearVelocity(
                    lv.add({ x: 0, y: 0, z: speed })
                );
                break;
            case "KeyD":
                cubes[current].setLinearVelocity(
                    lv.add({ x: speed, y: 0, z: 0 })
                );
                break;
        }
        pressed[event.code] = true;
    }
}, false);

document.addEventListener('keyup', (event) => {
    lv = cubes[current].getLinearVelocity();

    pressed[event.code] = false;
    switch (event.code) {
        case "KeyW": case "KeyS":
            cubes[current].setLinearVelocity(
                lv.add({ x: 0, y: 0, z: -lv.z })
            );
            break;
        case "KeyA": case "KeyD":
            cubes[current].setLinearVelocity(
                lv.add({ x: -lv.x, y: 0, z: 0 })
            );
            break;
    }
}, false);
