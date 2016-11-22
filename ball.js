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
    ball.position.set( team1.player.position.x, ball.position.y, team1.player.position.z);
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
    var originPoint = team1.player.position.clone();
    for (var vertexIndex = 0; vertexIndex < team1.player.geometry.vertices.length; vertexIndex++ )
        {
            var localVertex = team1.player.geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4( team1.player.matrix );
            var directionVector = globalVertex.sub( team1.player.position );

            var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
            var collisionResults = ray.intersectObjects( collidableMeshList );
            if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()+0.08 ) {
                collizionDet = true;
            }
        }
}

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
//         team1.player.rotateOnAxis( new THREE.Vector3(0,1,0), -90 );
//         cubeRotate = true;
//     }
//     else if ( ((mouse.x * 100) / 10) < 0 && (((mouse.y * 100) / 10) - 4) < 0 ) {
//         team1.player.rotateOnAxis( new THREE.Vector3(0,1,0), 90 );
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

function kickBall(strength) {
    var lv = ball.getLinearVelocity();
    var angle = team1.playerRotation;
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



//     /*** Controls ***/
// var ballMoving = false;
//
// var lastKeyUpAt = -1;
// var ballSpeed = 0;
// var ballVertAngle = 0;
// var space = " ";
//
// var scale = true;
//
// document.addEventListener('keydown', function(event) {
//     var ballLV = ball.getLinearVelocity();
//     $('#scale').height() == 600;
//
//     if (event.key == space) {
//         setTimeout(function() {
//                 if (scale){
//                 $( "#scaleAppend" ).empty();
//                 $( "#boxAppend" ).empty();
//                 $( "#scaleAppend" ).delay(1170).append('<div id="scale" class="box"></div>');
//                 $( "#boxAppend" ).delay(1170).append('<div class="box2"></div>');
//                 scale = false;
//                 };
//         }, 100);
//         lastKeyUpAt ++;
//         if (lastKeyUpAt >= 20) {
//             lastKeyUpAt = -1;
//             return lastKeyUpAt;
//         }
//         ballBlocked = false;
//
//         ballLV = ball.getLinearVelocity();
//         setTimeout(function() {
//             if ($('#scale').height() == 600){
//                 $('#scale').animate({ height: 1 }, 300);
//             }
//             else if ($('#scale').height() == 1){
//                 $('#scale').animate({ height: 600 }, 300);
//             }
//         });
//         goalT = false;
//         return goalT;
//     }
//     else if (!ballMoving || event.key == "w" || event.key == "ц") {
//         switch (event.key) {
//             case "w":
//                 var dist = camera.position.distanceTo(arrow.position);
//                 ball.setLinearVelocity(
//                     ballLV.add({
//                         x: -((camera.position.x - arrow.position.x) / dist) * ballSpeed,
//                         y: (-((camera.position.y - arrow.position.y) / dist) + 0.35) * ballSpeed,
//                         z: -((camera.position.z - arrow.position.z) / dist) * ballSpeed })
//                 );
//                 sendBall();
//                 ballMoving = true;
//                 break;
//         }
//         ballSpeed = 0;
//         ballVertAngle = 0;
//     }
//     console.log( "lastKeyUpAt = " + lastKeyUpAt );
//     return ballSpeed, ballVertAngle, goalT;
// }, false);
//
// document.addEventListener('keyup', function(event) {
//     if (event.key == space) {
//         var ballLV = ball.getLinearVelocity()
//
//         if (lastKeyUpAt >= 20) {
//             ballSpeed = 5;
//         }
//         else if (lastKeyUpAt >= 19) {
//             ballSpeed = 10;
//             ballVertAngle = 2;
//         }
//         else if (lastKeyUpAt >= 18) {
//             ballSpeed = 15;
//             ballVertAngle = 3;
//         }
//         else if (lastKeyUpAt >= 17) {
//             ballSpeed = 30;
//             ballVertAngle = 4;
//         }
//         else if (lastKeyUpAt >= 15) {
//             ballSpeed = 40;
//             ballVertAngle = 5;
//         }
//         else if (lastKeyUpAt >= 14) {
//             ballSpeed = 50;
//             ballVertAngle = 5;
//         }
//         else if (lastKeyUpAt >= 12) {
//             ballSpeed = 70;
//             ballVertAngle = 6;
//         }
//         else if (lastKeyUpAt >= 9) {
//             ballSpeed = 90;
//             ballVertAngle = 8;
//         }
//         else if (lastKeyUpAt >= 7) {
//             ballSpeed = 70;
//             ballVertAngle = 6;
//         }
//         else if (lastKeyUpAt >= 6) {
//             ballSpeed = 50;
//             ballVertAngle = 5;
//         }
//         else if (lastKeyUpAt >= 5) {
//             ballSpeed = 40;
//             ballVertAngle = 4;
//         }
//         else if (lastKeyUpAt >= 4) {
//             ballSpeed = 30;
//             ballVertAngle = 4;
//         }
//         else if (lastKeyUpAt >= 3) {
//             ballSpeed = 15;
//             ballVertAngle = 3;
//         }
//         else if (lastKeyUpAt >= 1) {
//             ballSpeed = 10;
//             ballVertAngle = 2;
//         }
//         else if (lastKeyUpAt >= 0) {
//             ballSpeed = 5;
//         }
//
//         switch (event.key) {
//             case space:
//                 lastKeyUpAt = 0;
//                 console.log( "Ball speed = " + ballSpeed + "; VertAngle = " + ballVertAngle );
//                 $( "#kickStr" ).empty();
//                 $( "#kickStr" ).append( ballSpeed );
//                 ballMoving = false;
//                 break;
//         }
//         $( "#scale" ).stop();
//         return ballSpeed, ballVertAngle;
//     }
//
//     if ( !ballMoving || event.key == "w" || event.key == "ц") {
//         var ballLV = ball.getLinearVelocity();
//         ball.setLinearVelocity(
//         ballLV.add({ z: -ballLV.x, x: 0, y: ballVertAngle })
//         );
//         sendBall();
//         ballSpeed = 0;
//         ballVertAngle = 0;
//         ballMoving = true;
//     }
//
// }, false);
//
// var ballBlocked = false;
