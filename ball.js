                /************\
                |*   Ball   *|
                \************/
// To detect starting point of the game 
var start = true;

// For collision detection
var collisionDet2 = false;
var collisionDet = false;
var collidableMeshList = [];

// Texture loader
var textureLoader = new THREE.TextureLoader();
var textureBall = textureLoader.load("img/ball.png");
textureBall.anisotropy = 2;     //lower value if the view is too laggy


    /*** Object ***/
var ball = new Physijs.SphereMesh(
    new THREE.SphereGeometry(1, 12, 12),
    new THREE.MeshLambertMaterial({ color: 0xffffff, map: textureBall}),
    20
);

ball.castShadow = true;
scene.add(ball);
collidableMeshList.push(ball);


// Detecting collizion between cube and a ball function
function detectCollision() {
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
}


    /***** Directing and kicking the ball *****/
function kickBall(strength, direct) {
    var lv = ball.getLinearVelocity();
    var angle = team1.playerRotation;
    var angle2 = team2.playerRotation;
    var kick = new THREE.Vector3(
        strength * -Math.sin(angle),
        direct,
        strength * -Math.cos(angle)
    );
    var kick2 = new THREE.Vector3(
        strength * -Math.sin(angle2),
        direct,
        strength * -Math.cos(angle2)
    );
    if (collisionDet == true) {
        ball.setLinearVelocity(lv.add(kick));
    }
    else if (collisionDet2 == true) {
        ball.setLinearVelocity(lv.add(kick2));
    }
    var kick1 = new Audio('sounds/1.mp3');
    var kick2 = new Audio('sounds/2.mp3');
    var kick3 = new Audio('sounds/3.mp3');
    var kick4 = new Audio('sounds/4.mp3');
    var audioArray = [kick1, kick2, kick3, kick4]; 
    var audio = audioArray[Math.floor(Math.random() * audioArray.length)];
    audio.play();
    collisionDet = false;
    collisionDet2 = false;
}

var strengthTimer = 0;
document.addEventListener('keydown', event => {
    if (event.code == "Space" && collisionDet == true || event.code == "Space" && collisionDet2 == true) {
        strengthTimer ++;
        console.log(strengthTimer)
    }
});

document.addEventListener('keyup', event => {
    if (event.code == "Space" && collisionDet == true && strengthTimer <= 3 ||
        event.code == "Space" && collisionDet2 == true && strengthTimer <= 3 ) {
        kickBall(12, 2);
    }
    else if (event.code == "Space" && collisionDet == true && strengthTimer <= 5 ||
        event.code == "Space" && collisionDet2 == true && strengthTimer <= 5 ) {
        kickBall(23, 5);
    }
    else if (event.code == "Space" && collisionDet == true && strengthTimer <= 8 ||
             event.code == "Space" && collisionDet2 == true && strengthTimer <= 8) {
        kickBall(38, 7);
    }
    else if (event.code == "Space" && collisionDet == true && strengthTimer <= 10 ||
             event.code == "Space" && collisionDet2 == true && strengthTimer <= 10) {
        kickBall(52, 10);
    }
    else if (event.code == "Space" && collisionDet == true && strengthTimer > 12 ||
             event.code == "Space" && collisionDet2 == true && strengthTimer > 12) {
        kickBall(63, 13);
    }
    strengthTimer = 0;
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
function resetBall(event) {
    ballMoving = true;
    collisionDet = false;
    collisionDet2 = false;
    ball.position.set(0, 3, 0);
    ball.__dirtyPosition = true;
    ball.rotation.set(0, 0, 0);
    ball.__dirtyRotation = true;
    ball.setLinearVelocity({ x: 0, y: 0, z: 0 });
    ball.setAngularVelocity({ x: 0, y: 0, z: 0 });
    return false;
}

function resetBallToRight(event) {
    ballMoving = true;
    collisionDet = false;
    collisionDet2 = false;
    ball.position.set(0, 4, -50);
    ball.__dirtyPosition = true;
    ball.rotation.set(0, 0, 0);
    ball.__dirtyRotation = true;
    ball.setLinearVelocity({ x: 0, y: 0, z: 0 });
    ball.setAngularVelocity({ x: 0, y: 0, z: 0 }); 
    return false;
}

function resetBallToLeft(event) {
    ballMoving = true;
    collisionDet = false;
    collisionDet2 = false;
    ball.position.set(0, 4, 50);
    ball.__dirtyPosition = true;
    ball.rotation.set(0, 0, 0);
    ball.__dirtyRotation = true;
    ball.setLinearVelocity({ x: 0, y: 0, z: 0 });
    ball.setAngularVelocity({ x: 0, y: 0, z: 0 }); 
    return false;
}

// Whistle sound
function playWhistle() {
    var whistle = new Audio('sounds/03963.mp3');
    var whistle2 = new Audio('sounds/03964.mp3');
    var whistle3 = new Audio('sounds/03965.mp3');
    var myArray = [whistle, whistle2, whistle3]; 
    var rand = myArray[Math.floor(Math.random() * myArray.length)];    
    rand.volume = 0.9;
    rand.play(); 
    return false;
}