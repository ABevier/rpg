import TitleScene from './scenes/TitleScene';
import BootScene from './scenes/BootScene';
import LoadingScene from './scenes/LoadingScene';
import WorldScene from './scenes/WorldScene';

let titleScene = new TitleScene();
let bootScene = new BootScene();
let loadingScene = new LoadingScene();
let worldScene = new WorldScene();

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 640
};

let game = new Phaser.Game(config);
game.scene.add('TitleScene', titleScene);
game.scene.add('BootScene', bootScene)
game.scene.add('LoadingScene', loadingScene);
game.scene.add('WorldScene', worldScene);
game.scene.start('BootScene', {scene: 'title'});
