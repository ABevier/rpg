class LoadingScene extends Phaser.Scene {
    constructor() {
        super({key: 'LoadingScene'});
    }

    init(data) {
        this.levelData = data.levelData;
        let loadingMessage = this.add.text(320, 240, "LOADing...", {font: "48px Kells", fill: "#ffffff"});

    }

    preload() {
        let assets = this.levelData.assets;
        //TODO: .foreach
        for (let key in assets) {
            let asset = assets[key];
            switch (asset.type) {
                case 'image':
                    this.load.image(key, asset.source);
                    break;
                case 'spritesheet':
                    this.load.spritesheet(key, asset.source, {
                        frameWidth: asset.frame_width,
                        frameHeight: asset.frame_height,
                        frames: asset.frames,
                        margin: assets.margin,
                        spacing: asset.spacing
                    });
                    break;
                case 'tilemap':
                    this.load.tilemapTiledJSON(key, asset.source);
                    break;
            }
        }

        for (let [key, path] of Object.entries(this.levelData.userInput)) {
            this.load.json(key, path);
        }
    }

    create(data) {
        this.scene.start(data.scene, {levelData: this.levelData});
    }
}

export default LoadingScene;