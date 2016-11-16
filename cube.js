var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({ color: 0x1f8b08 });
var cube = new Physijs.BoxMesh(geometry, material);
var cube2 = new Physijs.BoxMesh(geometry, material);
cube.position.set(0, 10, 0);
cube.castShadow = true;
cube2.castShadow = true;
scene.add(cube);
scene.add(cube2);

var cubeMoving = false;
		document.addEventListener('keydown', function(event) {
			cubeSpeed = 75;
			var cubeLV = cube.getLinearVelocity()

			if (event.key == "i") {
				cube.setLinearVelocity(
				    cubeLV.add({ x: -cubeLV.x, y: cubeSpeed / 1.5, z: 0 })
				);
				sendcube();
				cubeBlocked = false;

			} else if (!cubeMoving) {
				switch (event.key) {

				    case "w":
				        if (cube.position.x < 0) {
				            cube.setLinearVelocity(
				                cubeLV.add({ x: cubeSpeed, y: 0, z: 0 })
				            );
				            sendcube();
				            cubeMoving = true;
				        }
				        break;

				    case "s":
				    if (cube.position.x > -0) {
				        cube.setLinearVelocity(
				            cubeLV.add({ x: -cubeSpeed, y: 0, z: 0 })
				        );
				        sendcube();
				        cubeMoving = true;
				    }
				        break;
				}
			}
		}, false);
		document.addEventListener('keyup', function(event) {
			if (cubeMoving) {
				var cubeLV = cube.getLinearVelocity()

				switch (event.key) {
				    case "w":
				    case "s":
				        cube.setLinearVelocity(cubeLV.add({ x: -cubeLV.x, y: 0, z: 0 }));
				        sendcube();
				        cubeMoving = false;
				        break;
				}
			}
		}, false);

		var cubeBlocked = false;