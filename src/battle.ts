
// TODO: interface
export class CombatAction {

    constructor(public name: string) {
    }

    public async buildCommand(scene: Phaser.Scene): Promise<Command> {

        return new Command();
    }
    
}

//TODO: interface - this is just an attack now
export class Command {
    public execute(battle: Battle) {
    }
}

export class Battler {

    public CombatActions: Array<CombatAction>

    constructor(public name: string, public hp: number) {
        this.CombatActions = [new CombatAction("Attack"), new CombatAction("Magic"), new CombatAction("Item")]
    }

}

export class Battle {

    public idx = 0;
    public allUnits: Array<Battler>;

    public players: Array<Battler>;
    public enemies: Array<Battler>;

    constructor() {
        this.players = [new Battler("1", 100), new Battler("2", 100)];
        this.enemies = [new Battler("3", 100), new Battler("4", 100)];

        this.allUnits = [...this.players, ...this.enemies]
    }

    public getNextBattler() {
        let i = this.idx++ % this.allUnits.length;
        return this.allUnits[i];
    }
}