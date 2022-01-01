import * as Phaser from 'phaser'

const padding = 10
const minimumWidth = 200
const minimumHeight = 50

interface MenuButton2<T> {
  container: Phaser.GameObjects.Container
  background: Phaser.GameObjects.Rectangle
  value: T
}

const newMenuButton = <T>(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string,
  value: T,
): MenuButton2<T> => {
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

const onClickOnce = async <T>(btn: MenuButton2<T>): Promise<T> => {
  return new Promise<T>((resolve, _reject) => {
    btn.background.on('pointerup', () => {
      resolve(btn.value)
      btn.container.destroy()
    })
  })
}

export const MenuButton2 = {
  newMenuButton,
  onClickOnce,
}

export class MenuButton extends Phaser.GameObjects.Rectangle {
  private label: Phaser.GameObjects.Text

  constructor(scene: Phaser.Scene, x: number, y: number, text: string, onClick?: () => void) {
    super(scene, x, y)
    scene.add.existing(this)
    this.setOrigin(0, 0)

    this.label = scene.add
      .text(x + padding, y + padding, text)
      .setFontSize(18)
      .setAlign('center')

    const labelWidth = this.label.width + padding
    const labelHeight = this.label.height + padding

    this.width = labelWidth >= minimumWidth ? labelWidth : minimumWidth
    this.height = labelHeight >= minimumHeight ? labelHeight : minimumHeight

    this.setInteractive({ useHandCursor: true })
      .on('pointerover', this.enterMenuButtonHoverState)
      .on('pointerout', this.enterMenuButtonRestState)
      .on('pointerdown', this.enterMenuButtonActiveState)
      .on('pointerup', this.enterMenuButtonHoverState)

    if (onClick) {
      this.on('pointerup', onClick)
    }

    this.enterMenuButtonRestState()
  }

  private enterMenuButtonHoverState() {
    this.label.setColor('#FF0000')
    this.setFillStyle(0x888888)
  }

  private enterMenuButtonRestState() {
    this.label.setColor('#FFFFFF')
    this.setFillStyle(0x888888)
  }

  private enterMenuButtonActiveState() {
    this.label.setColor('#BBBBBB')
    this.setFillStyle(0x444444)
  }
}
