import Prefab from "../Prefab";

class Menu extends Prefab {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.menuItems = [];
        //TODO: I'll bet I can use map here
        for (let [itemName, itemData] of Object.entries(properties.menuItems)) {
            let item = this.scene.createPrefab(itemName, itemData);
            this.menuItems.push(item);
        }

        this.setEnabled(false);
    }

    setEnabled(shouldEnable) {
        this.menuItems.forEach(menuItem => {
            menuItem.setInteractive(shouldEnable);
            menuItem.setVisible(shouldEnable);
        });
    }

}

export default Menu;