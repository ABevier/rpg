import Prefab from "../Prefab";

class EnemySpawner extends Prefab {

    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.body.immovable = true;

        this.scene.physics.add.collider(this, this.scene.groups.players, this.spawn, null, this);
    }

    spawn() {
        console.log('Starting battle');
        this.scene.scene.start('BootScene', {scene: 'battle'})
    }
}

export default EnemySpawner;