class Team {

    constructor(nbPlayers) {

        this._speed = 20;

        this.players = {};
        this._current = 0;
        this._pressed = {};

        for (var i = 0; i < nbPlayers; i++) {
            this.players[i] = new Physijs.BoxMesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshLambertMaterial({ color: 0x805900 }),
                50
            );
            this.players[i].position.set(i * 2 - (nbPlayers - 1), 0, 0);
            this.players[i].castShadow = true;
            scene.add(this.players[i]);
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
    }


    get player () { return this.players[this._current] }

    changePlayer() {
        this.player.material.color.set(0x805900);

        var min = Infinity; var nextOne;
        for (var i in this.players) {
            var dist = this.players[i].position.distanceTo({ x: 0, y: 0, z: 0 });
            if (dist < min && i != this._current) {
                min = dist; nextOne = i;
            }
        }
        this._current = nextOne;

        this.player.material.color.set(0xbf8600);
    }


    useGamepad(gamepad) {
        var lv = this.player.getLinearVelocity();
        this.player.setLinearVelocity(lv.add({
            x: ((Math.abs(gamepad.axes[0]) > 0.25 ? gamepad.axes[0] : 0) * this._speed) - lv.x,
            y: 0,
            z: ((Math.abs(gamepad.axes[1]) > 0.25 ? gamepad.axes[1] : 0) * this._speed) - lv.z
        }));

        if (gamepad.buttons[0].pressed && !this._pressed["A"] && collizionDet == false ) {
            this._pressed["A"] = true;
            this.changePlayer;
        } else if (!gamepad.buttons[0].pressed && this._pressed["A"]) {
            this._pressed["A"] = false;
        }
    }


    get AIPlayers () {
        return this.players.filter(
            index => { return !(index == this._current) }
        )
    }
}

var cubes = new Team(2);
