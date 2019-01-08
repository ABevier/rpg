import MenuItem from "./MenuItem";
import MagicAttack from "../battle/MagicAttack";

class MagicalAttackMenuItem extends MenuItem {

    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.MANA_COST = 10;
    }

    select() {
        if (this.scene.currentUnit.stats.mana >= this.MANA_COST) {
            this.scene.currentAttack = new MagicAttack(
                this.scene,
                this.scene.currentUnit.name + '_attack',
                {x:0, y: 0},
                {group: 'attacks', owner: this.scene.currentUnit, manaCost: this.MANA_COST}
            )
            this.scene.sprites.actionsMenu.setEnabled(false);
            this.scene.sprites.enemyUnitsMenu.setEnabled(true);
        }
    }

}

export default MagicalAttackMenuItem;