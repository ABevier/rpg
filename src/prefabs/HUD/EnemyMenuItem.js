import MenuItem from "./MenuItem";

//TODO: allow clicking on enemy directly!!
class EnemyMenuItem extends MenuItem {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.enemy = this.scene.sprites[properties.enemyName];

    }

    select() {
        this.scene.currentAttack.hit(this.enemy);
        this.scene.sprites.enemyUnitsMenu.setEnabled(false);
    }

}

export default EnemyMenuItem;