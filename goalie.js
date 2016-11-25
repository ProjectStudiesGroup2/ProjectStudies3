    /*** Object goalies for both commands ***/
var goalie1 = new Physijs.BoxMesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshLambertMaterial({
        color: 0x80007f
    }),
    500
);
goalie1.position.set(0, -4, 80);

goalie1.castShadow = true;
scene.add(goalie1);

var goalie2 = new Physijs.BoxMesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshLambertMaterial({
        color: 0x198c8c
    }),
    500
);
goalie2.position.set(0, -4, -80);

goalie2.castShadow = true;
scene.add(goalie2);
