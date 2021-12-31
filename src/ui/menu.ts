import { MenuButton } from './menu-button'

const showMenu = async (scene: Phaser.Scene): Promise<string> => {
  const button = new MenuButton(scene, 200, 200, 'Click Me!')

  const p = new Promise<string>((resolve, _reject) => {
    button.on('pointerup', () => resolve('it was clicek!'))
  })

  const value = await p
  button.destroy()
  return value
}

export const Menu = {
  showMenu,
}
