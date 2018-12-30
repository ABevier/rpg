import BaseLevelScene from "./BaseLevelScene";
import Prefab from "../prefabs/Prefab";
import Unit from "../prefabs/battle/Unit";

class BattleScene extends BaseLevelScene {
    constructor() {
        super('BattleScene');

        this.prefabClasses = {
           background: Prefab.prototype.constructor, 
           playerUnit: Unit.prototype.constructor,
           enemyUnit: Unit.prototype.constructor
        }

        this.random = new Phaser.Math.RandomDataGenerator();
    }

    create() {
        super.create();
        //this.sprites.mage.anims.play('mage_attack2');
        this.sprites.warrior.act();
    }

}

export default BattleScene;