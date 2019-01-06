import Prefab from "../Prefab";

class Attack extends Prefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.owner = properties.owner;

    }

    hit(target) {
        let attackMultipler = this.scene.random.realInRange(0.8, 1.2);
        let defenseMultipler = this.scene.random.realInRange(0.8, 1.2);

        let attackValue = this.owner.stats.attack * attackMultipler;
        let defenseValue = target.stats.defense * defenseMultipler;

        let damage = Math.max(0, Math.round(attackValue - defenseValue));

        target.receiveDamage(damage);

        this.owner.anims.play(this.owner.name + '_attack1');
    }
}

export default Attack;