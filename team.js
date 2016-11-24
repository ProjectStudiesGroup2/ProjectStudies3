class Team {

    constructor(controls, colors, side) {

        this._speed = 26;
        this.players = [];
        this._current = 0;
        this._pressed = {};
        this.playerRotation = 0;
        this._colors = colors;
        this._triggerMax = 0;

        for (var i = 0; i < 4; i++) {
            switch (i) {
                case 0:
                    this.players[i] = new Player(
                        { x: -(fieldWidth / 2) / 3, y: -4, z: ((fieldHeight / 2) / 3) * side },
                        this._speed,
                        this._colors[0],
                        side
                    )
                    break;
                case 1:
                    this.players[i] = new Player(
                        { x: (fieldWidth / 2) / 3, y: -4, z: ((fieldHeight / 2) / 3) * side },
                        this._speed,
                        this._colors[0],
                        side
                    )
                    break;
                case 2:
                    this.players[i] = new Player(
                        { x: -(fieldWidth / 2) / 3, y: -4, z: (2 * (fieldHeight / 2) / 3) * side },
                        this._speed,
                        this._colors[0],
                        side
                    )
                    break;
                case 3:
                    this.players[i] = new Player(
                        { x: (fieldWidth / 2) / 3, y: -4, z: (2 * (fieldHeight / 2) / 3) * side },
                        this._speed,
                        this._colors[0],
                        side
                    )
                    break;
            }
        }

        this.player.material.color.set(this._colors[1]);
        var audioRun = new Audio('sounds/run.mp3');
        audioRun.volume = 0.085;

        document.addEventListener('keydown', event => {
            if (event.code == controls.swap && collisionDet == false && collisionDet2 == false ||
                event.code == controls.swap2 && collisionDet == false && collisionDet2 == false) {
                this.changePlayer();
            }
            else if (event.code == controls.swap && collisionDet == false && collisionDet2 == true) {
                team1.changePlayer();
            }
            else if (event.code == controls.swap2 && collisionDet == true && collisionDet2 == false) {
                team2.changePlayer();
            }

            var lv = this.player.getLinearVelocity();

            switch (event.code) {
                case controls.forward:
                    this.player.setLinearVelocity({
                        x: lv.x, y: lv.y, z: -this._speed
                    });
                    audioRun.play();
                    break;
                case controls.left:
                    this.player.setLinearVelocity({
                        x: -this._speed, y: lv.y, z: lv.z
                    });
                    audioRun.play();
                    break;
                case controls.backward:
                    this.player.setLinearVelocity({
                        x: lv.x, y: lv.y, z: this._speed
                    });
                    audioRun.play();
                    break;
                case controls.right:
                    this.player.setLinearVelocity({
                        x: this._speed, y: lv.y, z: lv.z
                    });
                    audioRun.play();
                    break;
            }
        }, false);

        document.addEventListener('keyup', event => {
            var lv = this.player.getLinearVelocity();

            this._pressed[event.code] = false;
            switch (event.code) {
                case controls.forward: case controls.backward:
                    this.player.setLinearVelocity(
                        lv.add({ x: 0, y: 0, z: -lv.z })
                    );
                    audioRun.pause();
                    break;
                case controls.left: case controls.right:
                    this.player.setLinearVelocity(
                        lv.add({ x: -lv.x, y: 0, z: 0 })
                    );
                    audioRun.pause();
                    break;
            }
        }, false);

        var mouse = new THREE.Vector3(),
            ray = new THREE.Raycaster( new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0) ),
            intersects = [];

        var plane = new THREE.Mesh(
            new THREE.PlaneGeometry(1000, 1000),
            new THREE.MeshBasicMaterial( { transparent: true, opacity: 0 } )
        );
        plane.position.set(0, -5, 0);
        plane.rotation.x = -.5 * Math.PI;
        scene.add(plane);

        document.addEventListener('mousemove', event => {
            mouse.set(
                (event.clientX / window.innerWidth) * 2 - 1,
                -(event.clientY / window.innerHeight) * 2 + 1,
                1
            );
            mouse.unproject(camera);
            var direction = mouse.sub(camera.position).normalize();
            ray.set(camera.position, direction);
            intersects = ray.intersectObject(plane);

            if (intersects.length) {
                this.rotatePlayer(
                    -(intersects[0].point.x - this.player.position.x),
                    -(intersects[0].point.z - this.player.position.z)
                );
            }
        });
    }


    get player () { return this.players[this._current].mesh }

    changePlayer(nextOne = -1) {
        this.player.material.color.set(this._colors[0]);

        if (nextOne < 0) {
            var min = Infinity; var nextOne;
            for (var i = 0; i < this.players.length; i++) {
                var dist = this.players[i].mesh.position.distanceTo(ball.position);
                if (dist < min && i != this._current) {
                    min = dist; nextOne = i;
                }
            }
        }
        this._current = nextOne;

        this.player.material.color.set(this._colors[1]);
    }


    rotatePlayer(y, x) {
        this.playerRotation = Math.atan2(y, x);
        this.player.rotation.set(0, Math.atan2(y, x), 0);
        this.player.__dirtyRotation = true;
    }


    useGamepad(gamepad) {
        var lv = this.player.getLinearVelocity();
        this.player.setLinearVelocity(new THREE.Vector3(
            ((Math.abs(gamepad.axes[1]) > 0.25 ? gamepad.axes[1] : 0) * this._speed),
            lv.y,
            ((Math.abs(gamepad.axes[0]) > 0.25 ? -gamepad.axes[0] : 0) * this._speed)
        ));

        this.rotatePlayer(
            Math.abs(gamepad.axes[4]) > 0.25 ? -gamepad.axes[4] : 0,
            Math.abs(gamepad.axes[3]) > 0.25 ? gamepad.axes[3] : 0
        );


        if (gamepad.buttons[0].pressed && !this._pressed["GamepadA"] &&
                (collisionDet == false && this == team1 || collisionDet2 == false && this == team2)) {
            this._pressed["GamepadA"] = true;
            this.changePlayer();
        } else if (!gamepad.buttons[0].pressed && this._pressed["GamepadA"]) {
            this._pressed["GamepadA"] = false;
        }
        if (collisionDet == true || collisionDet2 == true) {
            var stength = (gamepad.axes[5] + 1) / 2;
            if (this._triggerMax > stength) {
                kickBall(this._triggerMax * 62, 7);
                this._triggerMax = 0;
            } else {
                this._triggerMax = stength;
            }
        }
    }


    get AIPlayers () {
        return this.players.filter(
            (_, index) => { return !(index == this._current) }
        )
    }
}


var team1 = new Team({
        forward: "KeyD",
        backward: "KeyA",
        left: "KeyW",
        right: "KeyS",
        swap: "KeyE"
    },
    // [0x805900, 0xbf8600],
    [0x7F0000, 0xB30B0B],
    1
);

var team2 = new Team({
        forward: "KeyL",
        backward: "KeyJ",
        left: "KeyI",
        right: "KeyK",
        swap2: "KeyO"
    },
    // [0x550080, 0x8000bf],
    [0x19198E, 0x2C2CF5],
    -1
);
