import Prefab from "../Prefab";

class Unit extends Prefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.addAnimation(name + '_idle', properties.animations.idle);
        this.addAnimation(name + '_attack1', properties.animations.attack1);
        this.addAnimation(name + '_attack2', properties.animations.attack2);
        this.addAnimation(name + '_hit', properties.animations.hit);

        this.on('animationcomplete', this.onAnimationComplete.bind(this));

        this.anims.play(name + '_idle');

        this.stats = properties.stats;

        //TODO: this is just a hackjob
        this.targetUnits = properties.targetUnits;
    }

    onAnimationComplete(animation) {
        this.anims.play(this.name + '_idle');

        //TODO: this is gross
        if (animation.key === this.name + '_attack1' || animation.key === this.name + '_attack2') {
            console.log(animation);
            this.scene.nextTurn();
        }
    }

    receiveDamage(damage) {
        this.anims.play(this.name + '_hit');
        //TODO: centralized function
        let damageText = this.scene.add.text(this.x, this.y - 50, "" + damage,
            {font: 'bold 24px Kells', fill: '#ff0000'}, this.scene.groups.hud);
        this.scene.time.addEvent({delay: 1000, callback: damageText.destroy, callbackScope: damageText});

        this.stats.health -= damage;
        if (this.stats.health <= 0) {
            this.stats.health = 0;
            this.destroy();
        }
    }

    calculateActTurn(currentTurn) {
        this.actTurn = currentTurn + Math.ceil(100 / this.stats.speed);
    }

    //TODO: move to a common place?  
    addAnimation(name, animProperties, shouldRepeat) {
        if (!this.scene.anims.anims.has(name)) {
            this.scene.anims.create({
                key: name,
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, 
                    {frames: animProperties.frames}),
                frameRate: animProperties.fps,
                repeat: shouldRepeat ? -1 : 0
            });
        }
    }
}

export default Unit;