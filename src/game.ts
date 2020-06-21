import 'phaser';
import { Battle } from './battle';

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
            battlerSprite.setOrigin(0, 0);
            this.playerSprites.push(battlerSprite);

            let txt = this.add.text(x, 400, battler.name);
            txt.setOrigin(0, 0);
        });
        
        this.battle.enemies.forEach((battler, i) => {
            let x = 100 + 60 * i;
            let battlerSprite = this.add.rectangle(x, 200, 40, 20, 0xff0000);
            battlerSprite.setOrigin(0, 0);
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
            const result = await this.showMenu();
            console.log("clicked on " + result);
        }
    }

    showMenu(): Promise<Number> {
        return new Promise<Number>((resolve, reject) => {
            for (let i = 0; i < 3; i++) {
                const idx = i;
                const x = 20 + i * 40;
                let btn = this.add.rectangle(x, 20, 20, 20, 0x0000ff);
                btn.setInteractive();
                btn.on('pointerdown', () => resolve(idx));
            }
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
