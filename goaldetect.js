// *** Detector geometry ***//
var detGeometry = new THREE.CubeGeometry(19, 8, 0.3);
var detMaterial = new THREE.MeshBasicMaterial({ wireframe: true, visible: false });
var detector = new THREE.Mesh(detGeometry, detMaterial);
var detector2 = new THREE.Mesh(detGeometry, detMaterial);

detector.position.set(0, 0, -89.3);
detector2.position.set (0, 0, 89.3);
scene.add(detector);
scene.add(detector2);

    //*** Score function ***//

var scoreT1 = 0, scoreT2 = 0;

    //*** Score Output ***//

var materialFore = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
var materialBack = new THREE.MeshBasicMaterial( { color: 0x000088 } );
var materialArray = [ materialFore, materialBack ];
var goalText = new THREE.TextGeometry(scoreT1, {
  size: 30,
  font: "helvetiker"
});

var textMaterial = new THREE.MeshFaceMaterial(materialArray);
var textMesh = new THREE.Mesh(goalText, textMaterial);

goalText.computeBoundingBox();
var textWidth = goalText.boundingBox.max.x - goalText.boundingBox.min.x;
textMesh.position.set(0, 10, 0);
scene.add(textMesh);
