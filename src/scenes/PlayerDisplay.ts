import { Actor } from '../core/actors/actor'

interface PlayerDisplay {
  container: Phaser.GameObjects.Container
  nameLabel: Phaser.GameObjects.Text
  hpLabel: Phaser.GameObjects.Text
}

const titleStyle = { font: '28px Courier', color: '#DCDCDC' }
const textStyle = { font: '22px Courier', color: '#DCDCDC' }

const newPlayerDisplay = (parent: Phaser.Scene, column: number, row: number): PlayerDisplay => {
  const container = parent.add.container(100 + column * 250, 100 + row * 150)
  const background = new Phaser.GameObjects.Rectangle(parent, 0, 0, 200, 80, 0x0000ff).setOrigin(0, 0)
  container.add(background)

  const nameLabel = new Phaser.GameObjects.Text(parent, 10, 10, '', titleStyle).setOrigin(0, 0)
  container.add(nameLabel)

  const hpLabel = new Phaser.GameObjects.Text(parent, 10, 40, '', textStyle).setOrigin(0, 0)
  container.add(hpLabel)

  return { container, nameLabel, hpLabel }
}

const updateDisplay = (display: PlayerDisplay, actor: Actor): void => {
  display.nameLabel.setText(actor.name)

  const hpText = `HP: ${actor.hp}/${actor.maxHp}`
  display.hpLabel.setText(hpText)
}

export const PlayerDisplay = {
  newPlayerDisplay,
  updateDisplay,
}
