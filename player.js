class Player {

    constructor(startingPoint, speed) {
        this.startingPoint = startingPoint
        this.speed = speed;
        this.coverage = 2/3;

        this.mesh = new Physijs.BoxMesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshLambertMaterial({ color: 0x805900 }),
            50
        );
        this.mesh.position.set(
            this.startingPoint.x,
            this.startingPoint.y,
            this.startingPoint.z + 85 / 2
        );
        this.mesh.castShadow = true;
        scene.add(this.mesh);
    }

    goTo(aimPos) {
        var currPos = this.mesh.position;
        var newLV = { x: aimPos.x - currPos.x, z: aimPos.z - currPos.z };

        var lv = this.mesh.getLinearVelocity();
        this.mesh.setLinearVelocity({
            x: Math.abs(newLV.x) < this.speed ? newLV.x : this.speed * (newLV.x / Math.abs(newLV.x)),
            y: lv.y,
            z: Math.abs(newLV.z) < this.speed ? newLV.z : this.speed * (newLV.z / Math.abs(newLV.z))
        })
    }

    useAI() {
        var ballPos = ball.position;

        this.goTo({
            x: ballPos.x * this.coverage + this.startingPoint.x,
            z: ballPos.z * this.coverage + this.startingPoint.z,
        })
    }
}
