    //*** Texture ***//
var textureGrass = textureLoader.load("textures/grass.jpg");
textureGrass.anisotropy = 3;
textureGrass.wrapS = textureGrass.wrapT = THREE.RepeatWrapping;
textureGrass.repeat.set(11, 11);

    //*** Field ***//
var field = new Physijs.BoxMesh(
  new THREE.PlaneGeometry(100, 200),
  new THREE.MeshLambertMaterial({ map: textureGrass }),
  0
);
field.position.set(0, -5, 0);
field.rotation.x = -.5 * Math.PI;
field.receiveShadow = true;
scene.add(field);

    //*** Side Bumpers ***//
// var sideGeometry = new THREE.PlaneGeometry(1, 1, 5);
// var sideMaterial = new THREE.MeshLambertMaterial({ color: 0xfa3815})
// var side = new Physijs.BoxMesh(sideGeometry, sideMaterial);
//
// side.position.set(0, 0, 0);
// side.rotation.x = -0.6;
// side.rotation.y = 2;
// scene.add(side);

    //*** Goal ***//
var postGeometry = new THREE.CylinderGeometry(.5, .5, 10);
var crossGeometry = new THREE.CylinderGeometry(.5, .5 ,20);
var postMaterial = new THREE.MeshLambertMaterial({ color: 0xbcbaba });

var postL1 = new Physijs.CylinderMesh(postGeometry, postMaterial, 0);
var postR1 = new Physijs.CylinderMesh(postGeometry, postMaterial, 0);
var crossbar1 = new Physijs.CylinderMesh(crossGeometry, postMaterial, 0);

var postL2 = new Physijs.CylinderMesh(postGeometry, postMaterial, 0);
var postR2 = new Physijs.CylinderMesh(postGeometry, postMaterial, 0);
var crossbar2 = new Physijs.CylinderMesh(crossGeometry, postMaterial, 0);

var goalHeight = 8;
postL1.position.set(-10, goalHeight - 8.6, -85);
postR1.position.set(10, goalHeight - 8.6, -85);
crossbar1.position.set(0, goalHeight - 4, -85);
crossbar1.rotation.z = -.5 * Math.PI;

postL2.position.set(-10, goalHeight - 8.6, 85);
postR2.position.set(10, goalHeight - 8.6, 85);
crossbar2.position.set(0, goalHeight - 4, 85);
crossbar2.rotation.z = -.5 * Math.PI;

scene.add(postL1);
scene.add(postR1);
scene.add(crossbar1);
scene.add(postL2);
scene.add(postR2);
scene.add(crossbar2);

    //*** Net ***//
