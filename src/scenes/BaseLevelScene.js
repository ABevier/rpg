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
            this.groups[element] = this.add.group();
        });

        this.sprites = {};
        //TODO: foreach
        for (let spriteName in this.levelData.sprites) {
            let spriteData = this.levelData.sprites[spriteName];
            let sprite = null;
            
            switch (spriteData.type) {
                case 'sprite':
                    sprite = this.add.sprite(spriteData.position.x,
                        spriteData.position.y,
                        spriteData.texture);
                    break;
                case 'text':
                    sprite = this.add.text(spriteData.position.x, spriteData.position.y,
                        spriteData.text, spriteData.style);
                    break;
            }

            this.sprites[spriteName] = sprite;
            this.groups[spriteData.group].add(sprite);
        }
    }
}

export default BaseLevelScene