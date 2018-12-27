import BaseLevelScene from "./BaseLevelScene";
import Player from "../prefabs/world/Player";
import Door from "../prefabs/world/Door";
import NPC from "../prefabs/world/NPC";

class WorldScene extends BaseLevelScene {
    constructor() {
        super('WorldScene');

        //TODO: centralize?
        this.prefabClasses = {
            player: Player.prototype.constructor,
            door: Door.prototype.constructor,
            npc: NPC.prototype.constructor
        }

        this.TEXT_STYLE = {font: '14px Kells', fill: '#ffffff'};
    }

    preload() {
        //TODO: npc messages should be a json object...
        for (let [key, value] of Object.entries(this.levelData.npcMessages)) {
            this.load.text(key, value);
        }
    }

    create() {
        this.map = this.add.tilemap(this.levelData.map.key);

        let tilesetIndex = 0;
        this.tilesets = {};

        //TODO: fix up this loop and understand it
        this.map.tilesets.forEach(tileset => {
            let tilesetKey = this.levelData.map.tilesets[tilesetIndex];
            let mapTileset = this.map.addTilesetImage(tileset.name, tilesetKey);
            this.tilesets[tilesetKey] = mapTileset;
            tilesetIndex++;
        });

        this.layers = {};
        this.map.layers.forEach(layer => {
            this.layers[layer.name] = this.map.createStaticLayer(layer.name,
                    this.tilesets[layer.properties.tileset]);
            if (layer.properties.collision) { 
                //TODO: revisit this
                this.map.setCollisionByExclusion([-1], true);
            }

        })

        super.create();

        this.map.objects.forEach(objLayer => {
            objLayer.objects.forEach(this.createObject, this);
        });
    }

    createObject(object) {
        let position = {x: object.x, y: object.y};
        if (this.prefabClasses.hasOwnProperty(object.type)) {
            let prefab = new this.prefabClasses[object.type](this, object.name, position, object.properties);
        }
    }

    endTalk() {
        //TODO: man I need a state manager...
        this.currentMessageBox.destroy();
        this.userInput.setInput(this.userInputs.town_user_input);
    }

}

export default WorldScene;