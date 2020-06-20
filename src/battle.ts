export class Battler {
    constructor(public name: string, public hp: number) {
    }
}

export class Battle {

    public players: Array<Battler>;
    public enemies: Array<Battler>;

    constructor() {
        this.players = [new Battler("1", 100), new Battler("2", 100)];
        this.enemies = [new Battler("3", 100), new Battler("4", 100)];
    }
}