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

    onAnimationComplete() {
        this.anims.play(this.name + '_idle');
    }

    act() {
        let target = this.chooseTarget();

        let attackMultipler = this.scene.random.realInRange(0.8, 1.2);
        let defenseMultipler = this.scene.random.realInRange(0.8, 1.2);

        let attackValue = this.stats.attack * attackMultipler;
        let defenseValue = target.stats.defense * defenseMultipler;

        let damage = Math.max(0, Math.round(attackValue - defenseValue));

        target.receiveDamage(damage);

        this.anims.play(this.name + '_attack1');
    }

    chooseTarget() {
        const targetGroup = this.scene.groups[this.targetUnits];
        let targetIndex = this.scene.random.between(0, targetGroup.countActive() - 1);

        let target = null;
        let aliveUnitCount = 0;
        targetGroup.children.iterate(function(unit) {
            if (unit.active) {
                if (aliveUnitCount === targetIndex) {
                    target = unit;
                }
                aliveUnitCount++;
            }
        }, this);

        return target;
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