var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({ color: 0x1f8b08 });
var cube = new Physijs.BoxMesh(geometry, material);
var cube2 = new Physijs.BoxMesh(geometry, material);
cube.position.set(0, 10, 0);
cube.castShadow = true;
cube2.castShadow = true;
scene.add(cube);
scene.add(cube2);
