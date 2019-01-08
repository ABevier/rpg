import MenuItem from "./MenuItem";
import PhysicalAttack from "../battle/PhysicalAttack";

class PhysicalAttackMenuItem extends MenuItem {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
    }

    select() {
        this.scene.currentAttack = new PhysicalAttack(
            this.scene,
            this.scene.currentUnit.name + '_attack',
            {x: 0, y: 0},
            {group: 'attacks', owner: this.scene.currentUnit}
        );

        this.scene.sprites.actionsMenu.setEnabled(false);
        this.scene.sprites.enemyUnitsMenu.setEnabled(true);
    }

}

export default PhysicalAttackMenuItem;