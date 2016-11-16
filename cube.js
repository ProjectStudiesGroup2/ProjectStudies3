
var cubes = {};
for (var i = 0; i < 2/*4*/; i++) {
    cubes[i] = new Physijs.BoxMesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshLambertMaterial({ color: 0x805900 }),
        50
    );
    cubes[i].position.set(i * 2 - 1/*3*/, 0, 0);
    cubes[i].castShadow = true;
    scene.add(cubes[i]);
}


var current = 0; cubes[current].material.color.set(0xbf8600);
function changeCurrent(newIndex) {
    cubes[current].material.color.set(0x805900);
    current = newIndex;
    cubes[current].material.color.set(0xbf8600);
}

function getTheClosestTo(vec) {
    var min = Infinity; var res;
    for (var i in cubes) {
        var dist = cubes[i].position.distanceTo(vec);
        if (dist < min && i != current) {
            min = dist; res = i;
        }
    }
    return res;
}

var speed = 20; var pressed = {};
document.addEventListener('keydown', (event) => {
    if (event.code == "KeyE") {
        changeCurrent(getTheClosestTo({ x: 0, y: 0, z: 0 }));
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
