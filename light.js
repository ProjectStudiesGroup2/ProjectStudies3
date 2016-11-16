var ambLight1 = new THREE.AmbientLight(0xffffff, 0.4);
ambLight1.position.set(50, 100, 100);
scene.add(ambLight1);

var ambLight2 = new THREE.AmbientLight(0xffffff, 0.4);
ambLight2.position.set(-50, 100, -100);
scene.add(ambLight2);

var spotLight = new THREE.SpotLight(0xffffff, 0.2);   //bottom left
spotLight.position.set(-50, 70, 100);
spotLight.castShadow = true;
spotLight.shadow.camera.near = 1;
spotLight.shadow.mapSize.width = 3040;
spotLight.shadow.mapSize.height = 3040;
scene.add(spotLight);

var spotLight2 = new THREE.SpotLight(0xffffff, 0.2);    //bottom right
spotLight2.position.set(50, 70, 100);
spotLight2.castShadow = true;
spotLight2.shadow.camera.near = 1;
spotLight2.shadow.mapSize.width = 3040;
spotLight2.shadow.mapSize.height = 3040;
scene.add(spotLight2);

var spotLight3 = new THREE.SpotLight(0xffffff, 0.2);    //top left
spotLight3.position.set(-50, 70, -100);
spotLight3.castShadow = true;
spotLight3.shadow.camera.near = 1;
spotLight3.shadow.mapSize.width = 3040;
spotLight3.shadow.mapSize.height = 3040;
scene.add(spotLight3);

var spotLight4 = new THREE.SpotLight(0xffffff, 0.2);    //top right
spotLight4.position.set(50, 70, -100);
spotLight4.castShadow = true;
spotLight4.shadow.camera.near = 1;
spotLight4.shadow.mapSize.width = 3040;
spotLight4.shadow.mapSize.height = 3040;
scene.add(spotLight4);

spotLight.lookAt(new THREE.Vector3(15, 0, 15));
spotLight2.lookAt(new THREE.Vector3(-15, 0, -15));
spotLight3.lookAt(new THREE.Vector3(15, 0, 15));
spotLight4.lookAt(new THREE.Vector3(-15, 0, -15));
ambLight1.target = new THREE.Vector3(0, 10, 0);
ambLight2.target = new THREE.Vector3(0, 10, 0);
