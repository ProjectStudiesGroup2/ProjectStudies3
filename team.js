class Team {

    constructor(nbPlayers) {

        this._speed = 20;
        this.players = [];
        this._current = 0;
        this._pressed = {};

        for (var i = 0; i < nbPlayers; i++) {
            switch (i) {
                case 0:
                    this.players[i] = new Player(
                        { x: -50/3, y: -4, z: -85/3 },
                        this._speed
                    )
                    break;
                case 1:
                    this.players[i] = new Player(
                        { x: 50/3, y: -4, z: -85/3 },
                        this._speed
                    )
                    break;
                case 2:
                    this.players[i] = new Player(
                        { x: -50/3, y: -4, z: 85/3 },
                        this._speed
                    )
                    break;
                case 3:
                    this.players[i] = new Player(
                        { x: 50/3, y: -4, z: 85/3 },
                        this._speed
                    )
                    break;
            }
        }

        this.player.material.color.set(0xbf8600);


        document.addEventListener('keydown', event => {
            if (event.code == "KeyE" && collizionDet == false ) {
                this.changePlayer();
            }

            var lv = this.player.getLinearVelocity();

            if (!this._pressed[event.code]) {
                switch (event.code) {
                    case "KeyW":
                        this.player.setLinearVelocity(
                            lv.add({ x: 0, y: 0, z: -this._speed })
                        );
                        break;
                    case "KeyA":
                        this.player.setLinearVelocity(
                            lv.add({ x: -this._speed, y: 0, z: 0 })
                        );
                        break;
                    case "KeyS":
                        this.player.setLinearVelocity(
                            lv.add({ x: 0, y: 0, z: this._speed })
                        );
                        break;
                    case "KeyD":
                        this.player.setLinearVelocity(
                            lv.add({ x: this._speed, y: 0, z: 0 })
                        );
                        break;
                }
                this._pressed[event.code] = true;
            }
        }, false);

        document.addEventListener('keyup', event => {
            var lv = this.player.getLinearVelocity();

            this._pressed[event.code] = false;
            switch (event.code) {
                case "KeyW": case "KeyS":
                    this.player.setLinearVelocity(
                        lv.add({ x: 0, y: 0, z: -lv.z })
                    );
                    break;
                case "KeyA": case "KeyD":
                    this.player.setLinearVelocity(
                        lv.add({ x: -lv.x, y: 0, z: 0 })
                    );
                    break;
            }
        }, false);


        var projector = new THREE.Projector(),
            mouse_vector = new THREE.Vector3(),
            mouse = { x: 0, y: 0, z: 1 },
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
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            mouse_vector.set(mouse.x, mouse.y, mouse.z);
            projector.unprojectVector(mouse_vector, camera);
            var direction = mouse_vector.sub(camera.position).normalize();
            ray.set(camera.position, direction);
            intersects = ray.intersectObject(plane);

            if (intersects.length) {
                this.rotatePlayer(
                    -(intersects[0].point.x - this.player.position.x),
                    -(intersects[0].point.z - this.player.position.z)
                );
            }
        })
    }


    get player () { return this.players[this._current].mesh }

    changePlayer(nextOne = -1) {
        this.player.material.color.set(0x805900);

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

        this.player.material.color.set(0xbf8600);
    }


    rotatePlayer(y, x) {
        this.player.rotation.set(0, Math.atan2(y, x), 0);
        this.player.__dirtyRotation = true;
        console.log(this.player.rotation._y);
    }


    useGamepad(gamepad) {
        var lv = this.player.getLinearVelocity();
        this.player.setLinearVelocity(lv.add({
            x: ((Math.abs(gamepad.axes[0]) > 0.25 ? gamepad.axes[0] : 0) * this._speed) - lv.x,
            y: 0,
            z: ((Math.abs(gamepad.axes[1]) > 0.25 ? gamepad.axes[1] : 0) * this._speed) - lv.z
        }));

        this.rotatePlayer(
            Math.abs(gamepad.axes[3]) > 0.25 ? -gamepad.axes[3] : 0,
            Math.abs(gamepad.axes[4]) > 0.25 ? -gamepad.axes[4] : 0
        );


        if (gamepad.buttons[0].pressed && !this._pressed["A"] && collizionDet == false) {
            this._pressed["A"] = true;
            this.changePlayer();
        } else if (!gamepad.buttons[0].pressed && this._pressed["A"]) {
            this._pressed["A"] = false;
        }
        if (gamepad.buttons[1].pressed && !this._pressed["B"] && collizionDet == true) {
            this._pressed["B"] = true;
            kickBall();
        } else if (!gamepad.buttons[1].pressed && this._pressed["B"]) {
            this._pressed["B"] = false;
        }
    }


    get AIPlayers () {
        return this.players.filter(
            (_, index) => { return !(index == this._current) }
        )
    }
}


var cubes = new Team(4);
