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


    useGamepad(gamepad) {
        var lv = this.player.getLinearVelocity();
        this.player.setLinearVelocity(lv.add({
            x: ((Math.abs(gamepad.axes[0]) > 0.25 ? gamepad.axes[0] : 0) * this._speed) - lv.x,
            y: 0,
            z: ((Math.abs(gamepad.axes[1]) > 0.25 ? gamepad.axes[1] : 0) * this._speed) - lv.z
        }));


        if (gamepad.buttons[0].pressed && !this._pressed["A"] && collizionDet == false) {
            this._pressed["A"] = true;
            this.changePlayer();
        } else if (!gamepad.buttons[0].pressed && this._pressed["A"]) {
            this._pressed["A"] = false;
        }
        if (gamepad.buttons[1].pressed && !this._pressed["B"] && collizionDet == true) {
            this._pressed["B"] = true;

            var ballLV = ball.getLinearVelocity();
            ball.setLinearVelocity(
                ballLV.add({
                    x: ballSpeed,
                    y: 5,
                    z: 0 })
            );
            ballMoving = true;
            collizionDet = false;
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
