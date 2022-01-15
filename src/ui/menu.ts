import { array } from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'
import { Dictionary } from '../core/utils/dictionary'
import { UIState } from '../scenes/game-scene'
import { PlayerDisplay } from '../scenes/PlayerDisplay'
import { MenuButton, MenuButtonProps } from './menu-button'

const getOneMenuClick = <T>(buttons: MenuButton<T>[]): Promise<T> => {
  const doRace = async (promises: Promise<T>[]) => {
    const p = await Promise.race(promises)
    buttons.forEach(MenuButton.destroy)
    return p
  }

  return pipe(buttons, array.map(MenuButton.getClick), doRace)
}

//TODO: how to curry this??
const getMenuSelection = <T>({ scene }: UIState, items: MenuButtonProps<T>[]): Promise<T> => {
  const makeButton = (i: number, item: MenuButtonProps<T>) => {
    return MenuButton.newMenuButton(scene, 500, 100 + 35 * i, item)
  }

  return pipe(items, array.mapWithIndex(makeButton), getOneMenuClick)
}

////
//
const getOneEnemyClick = (displays: PlayerDisplay[]): Promise<string> => {
  const doRace = async (promises: Promise<string>[]) => {
    const p = await Promise.race(promises)
    displays.forEach(PlayerDisplay.disableInteractive)
    return p
  }

  return pipe(displays, array.map(PlayerDisplay.getClick), doRace)
}

const getEnemyClick = (uiState: UIState): Promise<string> => {
  return pipe(uiState.playerDisplays, Dictionary.collectValues, getOneEnemyClick)
}

export const Menu = {
  getMenuSelection,
  getEnemyClick,
}
