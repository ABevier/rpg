import BaseLevelScene from "./BaseLevelScene";
import Prefab from "../prefabs/Prefab";

class BattleScene extends BaseLevelScene {
    constructor() {
        super('BattleScene');

        this.prefabClasses = {
           background: Prefab.prototype.constructor, 
           playerUnit: Prefab.prototype.constructor,
           enemyUnit: Prefab.prototype.constructor
        }
    }

}

export default BattleScene;