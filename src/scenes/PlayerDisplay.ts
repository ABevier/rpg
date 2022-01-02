import { Actor } from '../core/actors/actor'

export interface PlayerDisplay {
  id: string
  container: Phaser.GameObjects.Container
  background: Phaser.GameObjects.Rectangle
  nameLabel: Phaser.GameObjects.Text
  hpLabel: Phaser.GameObjects.Text
}

const titleStyle = { font: '28px Courier', color: '#DCDCDC' }
const textStyle = { font: '22px Courier', color: '#DCDCDC' }

const newPlayerDisplay = (
  parent: Phaser.Scene,
  column: number,
  row: number,
  id: string,
): PlayerDisplay => {
  const container = parent.add.container(100 + column * 250, 100 + row * 150)
  const background = new Phaser.GameObjects.Rectangle(parent, 0, 0, 200, 80, 0x0000ff)
  background.setOrigin(0, 0)

  container.add(background)

  const nameLabel = new Phaser.GameObjects.Text(parent, 10, 10, '', titleStyle).setOrigin(0, 0)
  container.add(nameLabel)

  const hpLabel = new Phaser.GameObjects.Text(parent, 10, 40, '', textStyle).setOrigin(0, 0)
  container.add(hpLabel)

  return { container, background, nameLabel, hpLabel, id }
}

const updateDisplay = (display: PlayerDisplay, actor: Actor): void => {
  display.nameLabel.setText(actor.name)

  const hpText = `HP: ${actor.hp}/${actor.maxHp}`
  display.hpLabel.setText(hpText)
}

const getClick = async (display: PlayerDisplay): Promise<string> => {
  display.background.setInteractive({ useHandCursor: true })
  return new Promise<string>((resolve, _reject) => {
    display.background.on('pointerup', () => {
      resolve(display.id)
    })
  })
}

const disableInteractive = (display: PlayerDisplay): void => {
  display.background.disableInteractive()
}

export const PlayerDisplay = {
  newPlayerDisplay,
  updateDisplay,
  getClick,
  disableInteractive,
}
