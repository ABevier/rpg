import { UIState } from '../scenes/game-scene'

export interface TextArea {
  container: Phaser.GameObjects.Container
}

export interface TextAreaProps {
  text: string
  x: number
  y: number
}

const newTextArea = ({ scene }: UIState, { text, x, y }: TextAreaProps): TextArea => {
  const container = scene.add.container(x, y)

  const background = new Phaser.GameObjects.Rectangle(scene, 0, 0, 800, 40, 0x0000ff)
  background.setOrigin(0, 0)
  container.add(background)

  const textBlock = new Phaser.GameObjects.Text(scene, 10, 10, text, {})
  textBlock.setOrigin(0, 0)
  container.add(textBlock)

  return { container }
}

const destroy = (textArea: TextArea): void => {
  textArea.container.destroy()
}

export const TextArea = {
  newTextArea,
  destroy,
}
