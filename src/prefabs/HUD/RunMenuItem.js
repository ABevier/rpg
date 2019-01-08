import MenuItem from "./MenuItem";

class RunMenuItem extends MenuItem {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        this.runChance = properties.runChance;
    }

    select() {
        let randomNumber = this.scene.random.frac()
        if (randomNumber < this.runChance) {
            this.scene.backToWorld();
        } else {
            this.scene.nextTurn();
        }
    }
}

export default RunMenuItem;