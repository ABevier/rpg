import Prefab from "../Prefab";

class Player extends Prefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        //TODO: ugly cast
        this.walkingSpeed = +properties.walkingSpeed;

        //dont' need to do this if it's part of a physics group
        //this.scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;

        this.scene.physics.add.collider(this, this.scene.layers.buildings);

        this.moveLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.moveRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.moveUp = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.moveDown = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        if (!this.scene.anims.anims.has('walkingDown')) {
            this.scene.anims.create({
                key: 'walkingDown',
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: [0, 4, 8, 12]}),
                frameRate: 6,
                repeat: -1
            });
        }
        
        if (!this.scene.anims.anims.has('walkingUp')) {
            this.scene.anims.create({
                key: 'walkingUp',
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: [1, 5, 9, 13]}),
                frameRate: 6,
                repeat: -1
            });
        }

        if (!this.scene.anims.anims.has('walkingLeft')) {
            this.scene.anims.create({
                key: 'walkingLeft',
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: [2, 6, 10, 14]}),
                frameRate: 6,
                repeat: -1
            });
        }

        if (!this.scene.anims.anims.has('walkingRight')) {
            this.scene.anims.create({
                key: 'walkingRight',
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: [3, 7, 11, 15]}),
                frameRate: 6,
                repeat: -1
            });
        }

        this.stoppedFrames = [0, 1, 0, 2, 3];
        console.log("player initialized!");
    }

    update() {
        if (this.moveLeft.isDown && this.body.velocity.x <= 0) {
            this.body.velocity.x = -this.walkingSpeed;
            if (this.body.velocity.y === 0) {
                this.anims.play('walkingLeft', true);
            }
        } else if (this.moveRight.isDown && this.body.velocity.x >= 0) {
            this.body.velocity.x = this.walkingSpeed;
            if (this.body.velocity.y === 0) {
                this.anims.play('walkingRight', true);
            }
        } else {
            this.body.velocity.x = 0;
        }

        if (this.moveUp.isDown && this.body.velocity.y <= 0) {
            this.body.velocity.y = -this.walkingSpeed;
            if (this.body.velocity.x === 0) {
                this.anims.play('walkingUp', true);
            }
        } else if (this.moveDown.isDown && this.body.velocity.y >= 0) {
            this.body.velocity.y = this.walkingSpeed;
            if (this.body.velocity.x === 0) {
                this.anims.play('walkingDown', true);
            }
        } else {
            this.body.velocity.y = 0;
        }

        if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
            this.anims.stop();
            this.setFrame(this.stoppedFrames[this.body.facing - 10]);
        }
    }
}

export default Player;