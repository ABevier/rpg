import BaseLevelScene from "./BaseLevelScene";
import Prefab from "../prefabs/Prefab";
import Unit from "../prefabs/battle/Unit";
import PriorityQueue from "js-priority-queue"
import MenuItem from "../prefabs/HUD/MenuItem";
import Menu from "../prefabs/HUD/Menu";

class BattleScene extends BaseLevelScene {
    constructor() {
        super('BattleScene');

        this.prefabClasses = {
           background: Prefab.prototype.constructor, 
           playerUnit: Unit.prototype.constructor,
           enemyUnit: Unit.prototype.constructor,
           menu: Menu.prototype.constructor,
           menuItem: MenuItem.prototype.constructor
        }

        this.random = new Phaser.Math.RandomDataGenerator();
    }

    create() {
        super.create();
        //this.sprites.mage.anims.play('mage_attack2');
        //this.sprites.warrior.act();

        this.units = new PriorityQueue({ comparator: function(unitA, unitB) {
            return unitA.actTurn - unitB.actTurn;
        }});

        this.groups.playerUnits.children.each(function(unit) {
            unit.calculateActTurn(0);
            this.units.queue(unit);
        }, this);

        this.groups.enemyUnits.children.each(function(unit) {
            unit.calculateActTurn(0);
            this.units.queue(unit);
        }, this);

        console.log(this.units);
        this.sprites.actionsMenu.setEnabled(true);

        this.nextTurn();
    }

    nextTurn() {
        this.currentUnit = this.units.dequeue();

        console.log(this.currentUnit);

        if (this.currentUnit.active) {
            this.currentUnit.act();
            this.currentUnit.calculateActTurn(this.currentUnit.actTurn);
            this.units.queue(this.currentUnit);
        } else {
            this.nextTurn();
        }
    }

}

export default BattleScene;