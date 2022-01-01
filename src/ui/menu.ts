import { array, record, string } from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'
import { UIState } from '../scenes/game-scene'
import { PlayerDisplay } from '../scenes/PlayerDisplay'
import { MenuButton, MenuButtonProps } from './menu-button'

const getOneClick = <T>(buttons: MenuButton<T>[]): Promise<T> => {
  const doRace = async (promises: Promise<T>[]) => {
    const p = await Promise.race(promises)
    buttons.forEach(MenuButton.destroy)
    return p
  }

  return pipe(buttons, array.map(MenuButton.getClick), doRace)
}

const getMenuSelection = <T>(scene: Phaser.Scene, items: MenuButtonProps<T>[]): Promise<T> => {
  const makeButton = (i: number, item: MenuButtonProps<T>) => {
    return MenuButton.newMenuButton(scene, 500, 100 + 35 * i, item)
  }

  return pipe(items, array.mapWithIndex(makeButton), getOneClick)
}

////
//

const getEnemyClick = (uiState: UIState): Promise<string> => {
  const collectValues = pipe(
    (_key: string, value: PlayerDisplay) => value,
    record.collect(string.Ord),
  )

  const promises = pipe(uiState.playerDisplays, collectValues, array.map(PlayerDisplay.getClick))
  return Promise.race(promises)
}

export const Menu = {
  getMenuSelection,
  getEnemyClick,
}
