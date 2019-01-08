import Prefab from "../Prefab";

class MagicAttack extends Prefab {

    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        this.owner = properties.owner;
        this.manaCost = properties.manaCost;
    }

    hit(target) {
        let attackMultipler = this.scene.random.realInRange(1.2, 1.8);
        let defenseMultipler = this.scene.random.realInRange(0.7, 1.0);

        let attackValue = this.owner.stats.magicAttack * attackMultipler;
        let defenseValue = target.stats.defense * defenseMultipler;

        let damage = Math.max(0, Math.round(attackValue - defenseValue));

        target.receiveDamage(damage);
        this.owner.stats.mana -= this.manaCost;

        this.owner.anims.play(this.owner.name + '_attack2');
    }

}

export default MagicAttack;