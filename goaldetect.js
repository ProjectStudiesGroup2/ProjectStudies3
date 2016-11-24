// *** Detector geometry ***//
var detGeometry = new THREE.CubeGeometry(20, 8, 0.3);
var detMaterial = new THREE.MeshBasicMaterial({ wireframe: true, visible: true });
var detector = new THREE.Mesh(detGeometry, detMaterial);
var detector2 = new THREE.Mesh(detGeometry, detMaterial);

detector.position.set(0, 0, -89);
detector2.position.set (0, 0, 89);
scene.add(detector);
scene.add(detector2);

var collidableMeshList2 = [];
collidableMeshList2.push(detector);

    //*** Score Output ***//
var scoresprite = makeTextSprite( "Score: ", {
  fontsize: 20
});
scoresprite.position.set(5, 10, 5);
scene.add(scoresprite);
console.log("hello",scoresprite);

function makeTextSprite( message, parameters )
{
  if( parameters === undefined ) parameters = {};
  var fontface = parameters.hasOwnProperty("fontface") ?
      parameters["fontface"] : "Arial";
  var fontsize = parameters.hasOwnProperty("fontsize") ?
      parameters["fontsize"] : 18;
  var borderThickness = parameters.hasOwnProperty("borderThickness") ?
      parameters["borderThickness"] : 4;
  var borderColor = parameters.hasOwnProperty("borderColor") ?
      parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
  var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
      parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };
  var spriteAlignment = THREE.SpriteAlignment;
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  context.font = "Bold" + fontsize + "px" + fontface;
  var metrics = context.measureText(message);
  var textWidth = metrics.width;
  context.fillStyle = "rgba(0, 0, 0, 1.0)";
  context.fillText( message, borderThickness, fontsize + borderThickness);
  var materialScore = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
  materialScore.transparent = true;

  var texture = new THREE.Texture(canvas)
  texture.needsUpdate = true;

  var spriteMaterial = new THREE.SpriteMaterial(
      { map: texture, useScreenCoordinates: false, alignment: spriteAlignment });
  var sprite = new THREE.Sprite( spriteMaterial );
  sprite.scale.set(100, 50, 1.0);
  return sprite;
}
