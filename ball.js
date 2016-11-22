                /************\
                |*   Ball   *|
                \************/                
var collisionDet = false;
var collisionDet2 = false;
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

if (collisionDet == false && collisionDet2 == false) {
    ball.position.set(0, 5.5, -10);
    ball.__dirtyPosition = true;
}

ball.castShadow = true;
scene.add(ball);
collidableMeshList.push(ball);


// Detecting collizion between cube and a ball function
function detectCollision() {    
    var originPoint = team1.player.position.clone();
    for (var vertexIndex = 0; vertexIndex < team1.player.geometry.vertices.length; vertexIndex++ )
        {
            var localVertex = team1.player.geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4( team1.player.matrix );
            var directionVector = globalVertex.sub( team1.player.position );

            var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
            var collisionResults = ray.intersectObjects( collidableMeshList );
            if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()+0.08 ) {
                collisionDet = true;
                collisionDet2 = false;
            }
        } 

    var originPoint2 = team2.player.position.clone();
    for (var vertexIndex = 0; vertexIndex < team2.player.geometry.vertices.length; vertexIndex++ )
        {
            var localVertex = team2.player.geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4( team2.player.matrix );
            var directionVector = globalVertex.sub( team2.player.position );

            var ray = new THREE.Raycaster( originPoint2, directionVector.clone().normalize() );
            var collisionResults = ray.intersectObjects( collidableMeshList );
            if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()+0.08 ) {
                collisionDet2 = true;
                collisionDet = false;
            }
        }
}


    /***** Directing and kicking the ball *****/
function kickBall(strength) {
    var lv = ball.getLinearVelocity();
    var angle = team1.playerRotation;
    var angle2 = team2.playerRotation;
    var kick = new THREE.Vector3(
        strength * -Math.sin(angle),
        2,
        strength * -Math.cos(angle)
    );
    var kick2 = new THREE.Vector3(
        strength * -Math.sin(angle2),
        2,
        strength * -Math.cos(angle2)
    );
    if (collisionDet == true) {
        ball.setLinearVelocity(lv.add(kick));
    }
    else if (collisionDet2 == true) {
        ball.setLinearVelocity(lv.add(kick2));
    }    
    collisionDet = false;
    collisionDet2 = false;
}

document.addEventListener('keydown', event => {
    if (event.code == "Space" && collisionDet == true || event.code == "Space" && collisionDet2 == true) {
        kickBall(20);
    }
});

function setBallToPlayer() {
    ball.__dirtyPosition = true;
    ball.rotation.x = 0;
    ball.rotation.y = 0;
    ball.rotation.z = 0;
    ball.__dirtyRotation = true;
    var ballLV = ball.getLinearVelocity();
    ball.setLinearVelocity(
    ballLV.add({
        x: 0,
        y: 0,
        z: 0 })
    );
}


// Reset ball to field
function resetBall() {
    ballMoving = true;
    collisionDet = false;
    collisionDet2 = false;
    ball.position.set(0, 4, 0);
    ball.__dirtyPosition = true;
    ball.rotation.set(0, 0, 0);
    ball.__dirtyRotation = true;
    ball.setLinearVelocity({ x: 0, y: 0, z: 0 });
    ball.setAngularVelocity({ x: 0, y: 0, z: 0 });
}
