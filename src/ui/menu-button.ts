import * as Phaser from 'phaser'

const padding = 10
const minimumWidth = 200
const minimumHeight = 50

export interface MenuButton<T> {
  container: Phaser.GameObjects.Container
  background: Phaser.GameObjects.Rectangle
  value: T
}

export interface MenuButtonProps<T> {
  text: string
  value: T
}

const newMenuButton = <T>(
  scene: Phaser.Scene,
  x: number,
  y: number,
  { text, value }: MenuButtonProps<T>,
): MenuButton<T> => {
  const container = scene.add.container(x, y)
  const background = new Phaser.GameObjects.Rectangle(scene, x, y)
  background.setOrigin(0, 0)
  container.add(background)

  const label = new Phaser.GameObjects.Text(scene, x + padding, y + padding, text, {})
    .setFontSize(18)
    .setAlign('center')
  container.add(label)

  background.width = Math.max(label.width + padding, minimumWidth)
  background.height = Math.max(label.height + padding, minimumHeight)

  const enterMenuButtonHoverState = () => {
    label.setColor('#00FF00')
    background.setFillStyle(0x888888)
  }

  const enterMenuButtonRestState = () => {
    label.setColor('#FFFFFF')
    background.setFillStyle(0x888888)
  }

  const enterMenuButtonActiveState = () => {
    label.setColor('#BBBBBB')
    background.setFillStyle(0x444444)
  }

  background
    .setInteractive({ useHandCursor: true })
    .on('pointerover', enterMenuButtonHoverState)
    .on('pointerout', enterMenuButtonRestState)
    .on('pointerdown', enterMenuButtonActiveState)
    .on('pointerup', enterMenuButtonHoverState)

  enterMenuButtonRestState()

  return { container, background, value }
}

const getClick = async <T>(button: MenuButton<T>): Promise<T> => {
  return new Promise<T>((resolve, _reject) => {
    button.background.on('pointerup', () => {
      resolve(button.value)
    })
  })
}

const destroy = <T>(button: MenuButton<T>): void => {
  button.container.destroy()
}

export const MenuButton = {
  newMenuButton,
  getClick,
  destroy,
}
