var field = new Physijs.BoxMesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshLambertMaterial({ color: 0xffffff }),
  0
);
field.position.set(0, -5, 0);
field.rotation.x = -.5 * Math.PI;
field.receiveShadow = true;
scene.add(field);
