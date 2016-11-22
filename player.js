class Player {

    constructor(startingPoint, speed, color, side) {
        this.startingPoint = startingPoint
        this.speed = speed;
        this.coverage = 2/3;
        this.side = side;

        this.mesh = new Physijs.BoxMesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshLambertMaterial({ color: color }),
            50
        );
        this.mesh.position.set(
            this.startingPoint.x,
            this.startingPoint.y,
            this.startingPoint.z
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

        if (ballPos.z > 0 && this.side > 0 || ballPos.z < 0 && this.side < 0) {
            this.goTo({
                x: ballPos.x * this.coverage + this.startingPoint.x * (1 - this.coverage),
                z: ballPos.z * this.coverage + this.startingPoint.z * (1 - this.coverage),
            });
        } else {
            this.goTo({
                x: ballPos.x * (1 - this.coverage) + this.startingPoint.x * this.coverage,
                z: ballPos.z * (1 - this.coverage) + (this.startingPoint.z - (fieldHeight / 2) * this.side) * this.coverage,
            });
        }
    }
}
