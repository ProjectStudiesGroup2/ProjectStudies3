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
    collizionDet = false;
    console.log(Math.sin(angle), Math.cos(angle));
}

var strengthTimer = 0;

document.addEventListener('keydown', function(event) {
    if (event.code == "Space" && collizionDet == true ) {
        strengthTimer ++;
        console.log(strengthTimer)
    }
});

document.addEventListener('keyup', event => {
    if (event.code == "Space" && collizionDet == true && strengthTimer < 9) {
        kickBall(16);
    }  
    else if (event.code == "Space" && collizionDet == true && strengthTimer <= 14) {
        kickBall(23);
    }  
    else if (event.code == "Space" && collizionDet == true && strengthTimer > 14) {
        kickBall(30);
    }  
    strengthTimer = 0;    
});

// /***** Directing the ball *****/
// console.log(ball.position);
// // Create a circle around the mouse and move it
// // The sphere has opacity 0
// var mouse = {x: 0, y: 0, z: 0};
//
// var cursorPosX = (mouse.x * 100) / 2 ;
// var cursorPosZ = ((mouse.y * 100) / 2)-14 ;
//
// function onMouseMove(event) {
// 	// Update the mouse variable
// 	event.preventDefault();
// 	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
// 	mouse.y = - (event.clientY / window.innerWidth) * 2 + 1;
// }
// document.addEventListener('mousemove', onMouseMove, false);
//
// /***** Kicking the ball *****/
// var lastKeyUpAt = -1;
// var ballSpeed = 7;
// var ballVertAngle = 0;
// var space = "Space";
// var cubeRotate = false;
//
// function setVelocity() {
//     var ballLV = ball.getLinearVelocity();
//     ball.setLinearVelocity(
//         ballLV.add({
//             x: ((mouse.x * 100) / 40) * 4 ,
//             y: 2,
//             z: -(((mouse.y * 100) / 40) - 1) * 4 })
//     );
//     collizionDet = false;
// }
//
// function kickBall() {
//     if ( ((mouse.x * 100) / 10) >= 0 && (((mouse.y * 100) / 10) - 4) <= 0 ) {
//         cubes.player.rotateOnAxis( new THREE.Vector3(0,1,0), -90 );
//         cubeRotate = true;
//     }
//     else if ( ((mouse.x * 100) / 10) < 0 && (((mouse.y * 100) / 10) - 4) < 0 ) {
//         cubes.player.rotateOnAxis( new THREE.Vector3(0,1,0), 90 );
//         cubeRotate = true;
//     }
//
//     if (cubeRotate == true){
//         setTimeout( setVelocity, 200 );
//         setTimeout ( cubeRotate = false, 1000);
//     }
//     else {
//         setVelocity();
//     }
// }



