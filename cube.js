// To detect Collisions
var collizionDet = false;
// 

var cubes = {};
for (var i = 0; i < 2/*4*/; i++) {
    cubes[i] = new Physijs.BoxMesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshLambertMaterial({ color: 0x805900 }),
        80
    );
    cubes[i].position.set(i * 2 - 1/*3*/, 0, 0);
    cubes[i].castShadow = true;
    scene.add(cubes[i]);
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

var current = 0;
cubes.player.material.color.set(0xbf8600);


var speed = 20; var pressed = {};
document.addEventListener('keydown', (event) => {
    if (event.code == "KeyE" && collizionDet == false ) {
        cubes.player.material.color.set(0x805900);
        current = getTheClosestTo({ x: 0, y: 0, z: 0 })
        cubes.player.material.color.set(0xbf8600);
    }

    lv = cubes.player.getLinearVelocity();

    if (!pressed[event.code]) {
        switch (event.code) {
            case "KeyW":
                cubes.player.setLinearVelocity(
                    lv.add({ x: 0, y: 0, z: -speed })
                );
                break;
            case "KeyA":
                cubes.player.setLinearVelocity(
                    lv.add({ x: -speed, y: 0, z: 0 })
                );
                break;
            case "KeyS":
                cubes.player.setLinearVelocity(
                    lv.add({ x: 0, y: 0, z: speed })
                );
                break;
            case "KeyD":
                cubes.player.setLinearVelocity(
                    lv.add({ x: speed, y: 0, z: 0 })
                );
                break;
        }
        pressed[event.code] = true;
    }
}, false);

document.addEventListener('keyup', (event) => {
    lv = cubes.player.getLinearVelocity();

    pressed[event.code] = false;
    switch (event.code) {
        case "KeyW": case "KeyS":
            cubes.player.setLinearVelocity(
                lv.add({ x: 0, y: 0, z: -lv.z })
            );
            break;
        case "KeyA": case "KeyD":
            cubes.player.setLinearVelocity(
                lv.add({ x: -lv.x, y: 0, z: 0 })
            );
            break;
    }
}, false);


// // Test cube

// var MovingCube;
// var cubeGeometry = new THREE.CubeGeometry(2,2,2,1,1,1);
// var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
// MovingCube = new THREE.Mesh( cubeGeometry, wireMaterial );
// MovingCube.position.set(0, -4, 0);
// scene.add( MovingCube );	

// var moveDistance = 1; // 200 pixels per second
  
// document.addEventListener('keydown',onDocumentKeyDown,false);
//     function onDocumentKeyDown(event){
//     event = event || window.event;
//     var keycode = event.keyCode;
//     switch(keycode){
//         case 37 : //left arrow 向左箭头
//         MovingCube.position.x = MovingCube.position.x - moveDistance;
//         break;
//         case 38 : // up arrow 向上箭头 
//         MovingCube.position.z = MovingCube.position.z - moveDistance;
//         break;
//         case 39 : // right arrow 向右箭头
//         MovingCube.position.x = MovingCube.position.x + moveDistance;
//         break;
//         case 40 : //down arrow向下箭头
//         MovingCube.position.z = MovingCube.position.z + moveDistance;
//         break;
//     }
//     console.log(MovingCube.position);
// }
