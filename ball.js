                /************\
                |*   Ball   *|
                \************/
// // Wall
// var wallGeometry = new THREE.CubeGeometry( 10, 10, 10, 1, 1, 1 );
// var wallMaterial = new THREE.MeshBasicMaterial( {color: 0x8888ff} );
// var wireMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe:true } );

// var wall = new THREE.Mesh(wallGeometry, wallMaterial);
// wall.position.set(10, 0, -10);
// scene.add(wall);
// collidableMeshList.push(wall);
// //
var collizionDet = false;

var collidableMeshList = [];

var textureLoader = new THREE.TextureLoader();
var textureBall = textureLoader.load("img/ball.png");
textureBall.anisotropy = 3;     //lower value if the view is too laggy


    /*** Object ***/
var ball = new Physijs.SphereMesh(
    new THREE.SphereGeometry(1, 12, 12),
    new THREE.MeshLambertMaterial({ color: 0xffffff, map: textureBall}),
    20
);

if (collizionDet == true) {
    ball.position.set( cubes.player.position.x, ball.position.y, cubes.player.position.z);
    ball.rotation.set = 0;
}
else if (collizionDet == false) {
    ball.position.set(0, 5.5, -10);
    ball.__dirtyPosition = true;
}

ball.castShadow = true;
scene.add(ball);
collidableMeshList.push(ball);

// Detecting collizion between cube and a ball function
function detectCollision() {
    var originPoint = cubes.player.position.clone();
    for (var vertexIndex = 0; vertexIndex < cubes.player.geometry.vertices.length; vertexIndex++ )
        {
            var localVertex = cubes.player.geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4( cubes.player.matrix );
            var directionVector = globalVertex.sub( cubes.player.position );

            var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
            var collisionResults = ray.intersectObjects( collidableMeshList );
            if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()+0.08 ) {
                collizionDet = true;
            }
        }
}


    /***** Directing and kicking the ball *****/
function kickBall(strength) {
    var lv = ball.getLinearVelocity();
    var angle = cubes.playerRotation;
    var kick = new THREE.Vector3(
        strength * -Math.sin(angle),
        2,
        strength * -Math.cos(angle)
    );
    ball.setLinearVelocity(lv.add(kick));
    collizionDet = false
}

document.addEventListener('keydown', event => {
    if (event.code == "Space" && collizionDet == true ) {
        kickBall(50);
    }
});


