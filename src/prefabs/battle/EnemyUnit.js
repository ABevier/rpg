import Attack from "./Attack";
import Unit from "./Unit";

class EnemyUnit extends Unit {

    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.attack = new Attack(
            this.scene,
            this.name + '_attack',
            {x: 0, y: 0},
            {group: 'attacks', owner: this}
        );
    }

    act() {
        let target = this.chooseTarget();
        this.attack.hit(target);
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
}



export default EnemyUnit;