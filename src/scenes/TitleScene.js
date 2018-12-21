import Prefab from '../prefabs/Prefab'
import TextPrefab from '../prefabs/TextPrefab'
import BaseLevelScene from './BaseLevelScene';

class TitleScene extends BaseLevelScene {
    constructor() {
        super('TitleScene');
        console.log('New Title Screen!');

        this.prefabClasses = {
            background: Prefab.prototype.constructor,
            text: TextPrefab.prototype.constructor
        }
    }

    update() {
        if (this.input.activePointer.isDown) {
            this.startGame();
        }
    }

    startGame() {
        console.log('starting next scene');

    }
}

export default TitleScene;