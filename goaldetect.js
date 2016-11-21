var detGeometry = new THREE.CubeGeometry(20, 8, 0.3);
var detMaterial = new THREE.MeshBasicMaterial({ wireframe: true, visible: true });
var detector = new THREE.Mesh(detGeometry, detMaterial);
var detector2 = new THREE.Mesh(detGeometry, detMaterial);

detector.position.set(0, 0, -85);
detector2.position.set (0, 0, 85);
scene.add(detector);
scene.add(detector2);
