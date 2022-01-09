import { Actor } from '../core/actors/actor'
import { CommandType } from '../core/commands/commandType'
import { State } from '../core/state'
import { UIState } from './game-scene'

// The main combat loop should be the following steps:
// - Prompt for actions from each player character
// - Generate actions for each enemy
// - Apply each action to the game state in order
// - - Render the action result
// - Restart the loop

const driver = async (uiState: UIState, state: State): Promise<void> => {
  // const value = await Menu.getMenuSelection(scene, [
  //   { text: '1', value: 1 },
  //   { text: '2', value: 2 },
  //   { text: '3', value: 3 },
  // ])
  // console.log(`menu clicked with value ${value}`)
  // const targetId = await Menu.getEnemyClick(uiState)
  // console.log(`selected target = ${targetId}`)
  // const command = { speed: 10, sourceId: '1', targetId, type: CommandType.Attack }
  // const { state: newState } = Command.executeCommand(state, command)
  // this.renderBattle(newState, uiState)
}

export const Driver = {
  driver,
}
