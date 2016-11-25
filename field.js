    //*** Texture ***//
var textureGrass = textureLoader.load("textures/field.jpg");
textureGrass.anisotropy = 3;

var textureGrassAround = textureLoader.load("textures/grass.png");
textureGrassAround.anisotropy = 5;
textureGrassAround.wrapS = THREE.RepeatWrapping;
textureGrassAround.wrapT = THREE.RepeatWrapping;
textureGrassAround.repeat.set( 6, 6 );

    //*** Field ***//
var fieldWidth = 101, fieldHeight = 200;

var field = new Physijs.BoxMesh(
  new THREE.PlaneGeometry(101, 200),
  new THREE.MeshLambertMaterial({ map: textureGrass }),
  0
);
field.position.set(0, -5, 0);
field.rotation.x = -.5 * Math.PI;
field.receiveShadow = true;
scene.add(field);

    //*** Ground arond field ***//
var ground = new Physijs.BoxMesh(
  new THREE.PlaneGeometry(115, 220),
  new THREE.MeshLambertMaterial({ map: textureGrassAround }),
  0
);
ground.position.set(0, -5.2, 0);
ground.rotation.x = -.5 * Math.PI;
ground.receiveShadow = true;
scene.add(ground);

    //*** Sounds of fans and teams players***//
var fans = new Audio('sounds/fans.mp3');
var teams = new Audio('sounds/teams.mp3');
fans.volume = 0.6;
teams.volume = 0.3;
fans.play();
teams.play();
fans.onended = function() {
    fans.currentTime = 0;
    fans.play();
};
teams.onended = function() {
    teams.currentTime = 0;
    teams.play();
};

    //*** Goal gates ***//
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
postL1.position.set(-10, goalHeight - 8.6, -89);
postR1.position.set(10, goalHeight - 8.6, -89);
crossbar1.position.set(0, goalHeight - 4, -89);
crossbar1.rotation.z = -.5 * Math.PI;

postL2.position.set(-10, goalHeight - 8.6, 89);
postR2.position.set(10, goalHeight - 8.6, 89);
crossbar2.position.set(0, goalHeight - 4, 89);
crossbar2.rotation.z = -.5 * Math.PI;

scene.add(postL1);
scene.add(postR1);
scene.add(crossbar1);
scene.add(postL2);
scene.add(postR2);
scene.add(crossbar2);

    //*** Side Bumpers ***//
var sideTextureL = textureLoader.load('img/explosion.jpg');
animL = new TextureAnimator(sideTextureL, 4, 4, 16, 55);
var sideGeometryL = new THREE.PlaneGeometry(220, 8, 0);
var sideMaterialL = new THREE.MeshLambertMaterial({ map: sideTextureL })
var sideL = new Physijs.Mesh(sideGeometryL, sideMaterialL);

var sideTextureR = textureLoader.load('img/explosion.jpg');
animR = new TextureAnimator(sideTextureR, 4, 4, 16, 55);
var sideGeometryR = new THREE.PlaneGeometry(200, 8, 0);
var sideMaterialR = new THREE.MeshLambertMaterial({ map: sideTextureR })
var sideR = new Physijs.Mesh(sideGeometryR, sideMaterialR);

var sideTextureTop = textureLoader.load('img/explosion.jpg');
animTop = new TextureAnimator(sideTextureTop, 4, 4, 16, 55);
var sideGeometryTop = new THREE.PlaneGeometry(116, 8, 0);
var sideMaterialTop = new THREE.MeshLambertMaterial({ map: sideTextureTop })
var sideTop = new Physijs.Mesh(sideGeometryTop, sideMaterialTop);

var sideTextureBot = textureLoader.load('img/explosion.jpg');
animBot = new TextureAnimator(sideTextureBot, 4, 4, 16, 55);
var sideGeometryBot = new THREE.PlaneGeometry(116, 8, 0);
var sideMaterialBot = new THREE.MeshLambertMaterial({ map: sideTextureBot })
var sideBot = new Physijs.Mesh(sideGeometryBot, sideMaterialBot);

sideL.position.set(-59, -2, 0);
sideGeometryL.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
sideGeometryL.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI / 5));
sideR.position.set(57, -2, 0);
sideGeometryR.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / -2));
sideGeometryR.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI / -5));
sideTop.position.set(0, -2, -110);
sideGeometryTop.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / -5));
sideBot.position.set(0, -2, 110);
sideGeometryBot.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI * 7));
scene.add(sideL);
scene.add(sideR);
scene.add(sideTop);
scene.add(sideBot);

    //*** Animated ad ***//
var clock = new THREE.Clock();

function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration)
{
    // note: texture passed by reference, will be updated by the update function.

    this.tilesHorizontal = tilesHoriz;
    this.tilesVertical = tilesVert;
    // how many images does this spritesheet contain?
    //  usually equals tilesHoriz * tilesVert, but not necessarily,
    //  if there at blank tiles at the bottom of the spritesheet.
    this.numberOfTiles = numTiles;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat = new THREE.Vector2(1 / this.tilesHorizontal, 1 / this.tilesVertical);

    // how long should each image be displayed?
    this.tileDisplayDuration = tileDispDuration;

    // how long has the current image been displayed?
    this.currentDisplayTime = 0;

    // which image is currently being displayed?
    this.currentTile = 0;

    this.update = function(milliSec)
    {
        this.currentDisplayTime += milliSec;
        while (this.currentDisplayTime > this.tileDisplayDuration)
        {
            this.currentDisplayTime -= this.tileDisplayDuration;
            this.currentTile++;
            if (this.currentTile == this.numberOfTiles)
                this.currentTile = 0;
            var currentColumn = this.currentTile % this.tilesHorizontal;
            texture.offset.x = currentColumn / this.tilesHorizontal;
            var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
            texture.offset.y = currentRow / this.tilesVertical;
        }
    };
}
