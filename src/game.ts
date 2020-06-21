import 'phaser';
import { Battle, Battler, CombatAction } from './battle';

export default class Demo extends Phaser.Scene {
    constructor () {
        super('demo');
    }

    private battle = new Battle();

    private playerSprites: Array<Phaser.GameObjects.GameObject> = [];
    private enemySprites: Array<Phaser.GameObjects.GameObject> = [];

    preload() {
    }

    create() {
        this.battle.players.forEach((battler, i) => {
            let x = 100 + 60 * i;
            let battlerSprite = this.add.rectangle(x, 400, 40, 20, 0x00ff00);
            battlerSprite.setInteractive();
            battlerSprite.setOrigin(0, 0);

            //TODO: gross
            battlerSprite.setData("battler", battler);

            this.playerSprites.push(battlerSprite);

            let txt = this.add.text(x, 400, battler.name);
            txt.setOrigin(0, 0);
        });
        
        this.battle.enemies.forEach((battler, i) => {
            let x = 100 + 60 * i;
            let battlerSprite = this.add.rectangle(x, 200, 40, 20, 0xff0000);
            battlerSprite.setInteractive();
            battlerSprite.setOrigin(0, 0);

            //TODO: gross
            battlerSprite.setData("battler", battler);

            this.enemySprites.push(battlerSprite);

            let txt = this.add.text(x, 200, battler.name);
            txt.setOrigin(0, 0);
        });

        this.battleLoop();
    }

    async battleLoop() {
        while (true) {
            console.log("start work");
            const currentBattler = this.battle.getNextBattler();
            console.log("active battler=", currentBattler.name);
            const result = await this.showMenu(currentBattler);
            console.log("clicked on " + result.name);

            const targets = currentBattler.isPlayer ? this.enemySprites : this.playerSprites;
            const target = await this.getTarget(targets);
            console.log("target = " + target.name);
        }
    }

    showMenu(battler: Battler): Promise<CombatAction> {
        let buttons: Array<Phaser.GameObjects.GameObject> = [];
        let texts: Array<Phaser.GameObjects.GameObject> = [];

        return new Promise<CombatAction>((resolve, reject) => {
            battler.combatActions.forEach((action, i) => {
                const x = 20 + i * 85;
                let btn = this.add.rectangle(x, 20, 60, 20, 0x0000ff);
                btn.setInteractive();
                btn.setOrigin(0,0);
                buttons.push(btn);

                let txt = this.add.text(x, 20, action.name);
                txt.setOrigin(0, 0);
                texts.push(txt);

                btn.on('pointerdown', () => {
                    buttons.forEach(b => b.destroy());
                    texts.forEach(t => t.destroy());
                    resolve(action);
                });
            });
        });
    }

    getTarget(targets: Array<Phaser.GameObjects.GameObject>): Promise<Battler> {
        return new Promise<Battler>((resolve, reject) => {
            targets.forEach(target => {
                target.on('pointerdown', () => {
                    targets.forEach(target => target.removeAllListeners('pointerdown'));
                    resolve(target.getData("battler"));
                });
            });
        });
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: Demo
};

const game = new Phaser.Game(config);
