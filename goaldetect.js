// *** Detector geometry ***//
var detGeometry = new THREE.CubeGeometry(20, 8, 0.3);
var detMaterial = new THREE.MeshBasicMaterial({ wireframe: true, visible: false });
var detector = new THREE.Mesh(detGeometry, detMaterial);
var detector2 = new THREE.Mesh(detGeometry, detMaterial);

detector.position.set(0, 0, -89);
detector2.position.set (0, 0, 89);
scene.add(detector);
scene.add(detector2);

    //*** Score function ***//
var scoreT1 = 0, scoreT2 = 0;

    //*** Score Output ***//



    // ** keep for now I'll delete it later
// var scoresprite = makeTextSprite( "Score: "+scoreT1, {
//   fontsize: 30, borderColor: 0x5e0fad, backgroundColor: 0x1f20b0 });
// scoresprite.position.set(0, goalHeight -3, -135);
// var scoresprite2 = makeTextSprite( "Score: "+scoreT2, {
//   fontsize: 30, borderColor: 0x5e0fad, backgroundColor: 0x1f20b0 });
// scoresprite2.position.set(0, goalHeight -3, 135);
// scene.add(scoresprite);
// scene.add(scoresprite2);
//
// function makeTextSprite( message, parameters )
// {
//   if( parameters === undefined ) parameters = {};
//   var fontface = parameters.hasOwnProperty("fontface") ?
//       parameters["fontface"] : "Arial";
//   var fontsize = parameters.hasOwnProperty("fontsize") ?
//       parameters["fontsize"] : 18;
//   var borderThickness = parameters.hasOwnProperty("borderThickness") ?
//       parameters["borderThickness"] : 4;
//   var borderColor = parameters.hasOwnProperty("borderColor") ?
//       parameters["borderColor"] : 0x5e0fad;
//   var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
//       parameters["backgroundColor"] : 0x1f20b0;
//   var canvas = document.createElement('canvas');
//   var context = canvas.getContext('2d');
//   context.font = "Bold" + fontsize + "px" + fontface;
//   var metrics = context.measureText(message);
//   var textWidth = metrics.width;
//
//   context.fillStyle = 0x1f20b0;
//   context.strokeStyle = 0x5e0fad;
//   context.lineWidth = borderThickness;
//
//   context.fillStyle = "rgba(255, 0, 0, 1.0)";
//   context.fillText( message, borderThickness, fontsize + borderThickness);
//
//   var texture = new THREE.Texture(canvas)
//   texture.needsUpdate = true;
//
//   var materialScore = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
//   materialScore.transparent = true;
//   var spriteMaterial = new THREE.SpriteMaterial(
//       { map: texture });
//   var sprite = new THREE.Sprite( spriteMaterial );
//   sprite.scale.set(100, 50, 1.0);
//   return sprite;
}
