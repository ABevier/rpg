import Unit from "./Unit";

class PlayerUnit extends Unit {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
    }

    act() {
        this.scene.sprites.actionsMenu.setEnabled(true);
    }

}

export default PlayerUnit;