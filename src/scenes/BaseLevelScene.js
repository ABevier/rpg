import Prefab from '../prefabs/Prefab';
import TextPrefab from '../prefabs/TextPrefab';
import UserInput from '../plugins/UserInput';

class BaseLevelScene extends Phaser.Scene {
    constructor(key) {
        super({key: key});
    }

    init (data) { 
        this.levelData = data.levelData;
    }

    create() {
        this.groups = {};
        //TODO: lazily generate these instead of pre-specifying?
        this.levelData.groups.forEach(element => {
            this.groups[element] = this.physics.add.group();
        });

        this.sprites = {};
        if (this.levelData.sprites) {
            for (let [spriteName, spriteData] of Object.entries(this.levelData.sprites)) {
                this.createPrefab(spriteName, spriteData);
            }
        }

        //TODO: rip all of this out - only use mouse / touch
        if (this.levelData.userInput) {
            this.userInputs = {};
            for (let key in this.levelData.userInput) {
                this.userInputs[key] = this.cache.json.get(key);
            }

            this.userInput = new UserInput(this);
            this.userInputData = this.cache.json.get(this.levelData.initialUserInput);
            this.userInput.setInput(this.userInputData);
        }
    }

    createPrefab(spriteName, spriteData) {
        let constructorFunction = this.prefabClasses[spriteData.type];
        return new constructorFunction(this, spriteName, spriteData.position, spriteData.properties);
    }

    update() {

        //TODO:foreach
        for(let prefabName in this.sprites) {
            this.sprites[prefabName].update();
        }
    }
}

export default BaseLevelScene