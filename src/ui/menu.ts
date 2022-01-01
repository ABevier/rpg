import { MenuButton2 } from './menu-button'

const showMenu = async (scene: Phaser.Scene): Promise<string> => {
  const button = MenuButton2.newMenuButton(scene, 200, 200, 'Click Me!', 'oh man it was clicek!!')
  return await MenuButton2.onClickOnce(button)
}

export const Menu = {
  showMenu,
}
