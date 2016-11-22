var detGeometry = new THREE.CubeGeometry(20, 8, 0.3);
var detMaterial = new THREE.MeshBasicMaterial({ wireframe: true, visible: true });
var detector = new THREE.Mesh(detGeometry, detMaterial);
var detector2 = new THREE.Mesh(detGeometry, detMaterial);

detector.position.set(0, 0, -85);
detector2.position.set (0, 0, 85);
scene.add(detector);
scene.add(detector2);

var collidableMeshList2 = [];
collidableMeshList2.push(detector);

    //*** Score Output ***//
var canvas = document.createElement('canvas');
var text = canvas.getContext('2d');
text.font = "Bold 30px Arial";
text.fillStyle = "rgba(255,0,0,0.95)";
text.fillText = ('Score: ', 0, 50);

var textureScore = new THREE.Texture(canvas);
textureScore.needsUpdate = true;

var materialScore = new THREE.MeshBasicMaterial({ map: textureScore, side: THREE.DoubleSide });
materialScore.transparent = true;

var meshScore = new THREE.Mesh(new THREE.PlaneGeometry(canvas.width, canvas.height), materialScore);
meshScore.position.set(0, 10, 0);
scene.add(meshScore);
