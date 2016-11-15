function addCube() {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new Physijs.BoxMesh(geometry, material);
    scene.add(cube);
}
