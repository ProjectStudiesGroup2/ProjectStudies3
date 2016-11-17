var camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);

camera.position.set(0, 110, 110);

var cntrl = new THREE.OrbitControls(camera, renderer.domElement);
cntrl.maxPolarAngle = Math.PI * 0.5;
cntrl.target.set(0, 0, 0);
cntrl.minDistance = 30;
cntrl.maxDistance = 110;
