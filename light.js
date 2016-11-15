var spotLight = new THREE.SpotLight(0xffffff, 0.6);
spotLight.position.set(-20, 60, 20);
spotLight.castShadow = true;
spotLight.shadow.camera.near = 1;
spotLight.shadow.mapSize.width = 3040;
spotLight.shadow.mapSize.height = 3040;
scene.add(spotLight);

var spotLight2 = new THREE.SpotLight(0xffffff, 0.6);
spotLight2.position.set(10, 60, -20);
spotLight2.castShadow = true;
spotLight2.shadow.camera.near = 1;
spotLight2.shadow.mapSize.width = 3040;
spotLight2.shadow.mapSize.height = 3040;
scene.add(spotLight2);

spotLight2.target = field;
spotLight2.target = field;
