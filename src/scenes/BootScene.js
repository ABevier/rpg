class BootScene extends Phaser.Scene {
    constructor() {
        super({key: 'BootScene'});

        this.levels = {
            title: {
                key: 'TitleScene',
                path: 'assets/levels/title_screen.json'
            },
            town: {
                key: 'WorldScene',
                path: 'assets/levels/town.json'
            }
        }
    }

    preload() {
        //TODO: .foreach
        for(let levelName in this.levels) {
            let level = this.levels[levelName];
            this.load.json(levelName, level.path)
        }
    }

    create(data) {
       let levelData = this.cache.json.get(data.scene); 
       console.log(levelData);
       this.scene.start('LoadingScene', {
                                            levelData: levelData,
                                            scene: this.levels[data.scene].key
                                        });
    }
}

export default BootScene;