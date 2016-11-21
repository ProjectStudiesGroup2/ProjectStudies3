    //*** Texture ***//
var textureGrass = textureLoader.load("textures/grass.jpg");
textureGrass.anisotropy = 3;
textureGrass.wrapS = textureGrass.wrapT = THREE.RepeatWrapping;
textureGrass.repeat.set(11, 11);

    //*** Field ***//
var fieldWidth = 100, fieldHeight = 200;

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
var sideGeometryL = new THREE.PlaneGeometry(200, 8, 0);
var sideMaterialL = new THREE.MeshLambertMaterial({ color: 0xfa3815})
var sideL = new Physijs.Mesh(sideGeometryL, sideMaterialL);
var sideGeometryR = new THREE.PlaneGeometry(200, 8, 0);
var sideMaterialR = new THREE.MeshLambertMaterial({ color: 0xfa3815})
var sideR = new Physijs.Mesh(sideGeometryR, sideMaterialR);
var sideGeometryTop = new THREE.PlaneGeometry(100, 8, 0);
var sideMaterialTop = new THREE.MeshLambertMaterial({ color: 0xfa3815})
var sideTop = new Physijs.Mesh(sideGeometryTop, sideMaterialTop);
var sideGeometryBot = new THREE.PlaneGeometry(100, 8, 0);
var sideMaterialBot = new THREE.MeshLambertMaterial({ color: 0xfa3815})
var sideBot = new Physijs.Mesh(sideGeometryBot, sideMaterialBot);

sideL.position.set(-57, -2, 0);
sideGeometryL.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
sideGeometryL.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI / 5));
sideR.position.set(57, -2, 0);
sideGeometryR.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / -2));
sideGeometryR.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI / -5));
sideTop.position.set(0, -2, -107);
sideGeometryTop.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / -5));
sideBot.position.set(0, -2, 107);
sideGeometryBot.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI * 7));
scene.add(sideL);
scene.add(sideR);
scene.add(sideTop);
scene.add(sideBot);

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
