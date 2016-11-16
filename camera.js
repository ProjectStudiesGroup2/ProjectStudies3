var camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);

camera.position.z = 40;

var cntrl = new THREE.OrbitControls(camera, renderer.domElement);
cntrl.maxPolarAngle = Math.PI * 0.5;
cntrl.target.set(0, 0, 0);
cntrl.minDistance = 10;
cntrl.maxDistance = 70;
