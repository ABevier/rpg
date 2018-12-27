import Prefab from "../Prefab";
import MessageBox from "../HUD/MessageBox";

class NPC extends Prefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.message = this.scene.cache.text.get(properties.message);

        this.body.immovable = true;
        this.scene.physics.add.collider(this, this.scene.groups.players, this.talk, null, this);

        this.MESSAGE_BOX_POSITION = {x: 0, y: 360};
    }

    talk(npc, player) {
        player.stop();
        console.log("TALKING!");
        console.log(this.message);

        this.scene.currentMessageBox = new MessageBox(
            this.scene,
            this.scene.name + '_message_box',
            this.MESSAGE_BOX_POSITION,
            {
                texture: 'message_box_image',
                group: 'hud',
                message: this.message
            }
        );

        this.scene.userInput.setInput(this.scene.userInputs.talking_user_input);
    }

}

export default NPC;