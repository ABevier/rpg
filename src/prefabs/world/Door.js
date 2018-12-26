import Prefab from '../Prefab';

class Door extends Prefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.nextLevel = properties.nextLevel;

        this.body.immovable = true;

        this.scene.physics.add.collider(this, this.scene.groups.players, this.enter, null, this);
    }

    enter() {
        this.scene.scene.start('BootScene', {scene: this.nextLevel});
    }

}

export default Door;