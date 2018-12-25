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
        //TODO: foreach
        for (let spriteName in this.levelData.sprites) {
            let spriteData = this.levelData.sprites[spriteName];
            let constructorFunction = this.prefabClasses[spriteData.type];
            let sprite = new constructorFunction(this, spriteName, spriteData.position, spriteData.properties);
        }

        this.userInput = new UserInput(this);
        this.userInputData = this.cache.json.get(this.levelData.userInput.key);
        this.userInput.setInput(this.userInputData);
    }

    update() {

        //TODO:foreach
        for(let prefabName in this.sprites) {
            this.sprites[prefabName].update();
        }
    }
}

export default BaseLevelScene