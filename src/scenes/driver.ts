import { array } from 'fp-ts'
import { Command } from '../core/commands/command'
import { State } from '../core/state'
import { BattleRenderer } from '../ui/battleRenderer'
import { UIState } from './game-scene'
import { Prompter } from './prompter'

// The main combat loop should be the following steps:
// - Prompt for actions from each player character
// - Generate actions for each enemy
// - Apply each action to the game state in order
// - - Render the action result
// - Restart the loop

const run = async (uiState: UIState, state: State): Promise<void> => {
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

  // TODO: need to render the battle!!
  const result = await Prompter.promptForCommands(uiState, state)
  console.log('result of NEWEST prompting is:', result)

  //TODO: figure out how to use promises better in fp-ts
  // And empty array checks...
  // I can make a big pipe probably
  const sorted = Command.sortBySpeed(result)
  applyCommands(sorted, uiState, state)
}

//TODO: can get rid of prompter and renderer when UIState has a scene
// - Can just statically call Prompter.promtpt(uiState) and Renderer.render(...) instead of needing to bind
const applyCommands = async (commands: Command[], uiState: UIState, state: State) => {
  if (array.isEmpty(commands)) {
    return run(uiState, state)
  }

  // TODO: This code is a fucking mess...
  const [command, ...rest] = commands
  const result = Command.executeCommand(state, command)

  await Prompter.flashPrompt(uiState, result.text, 1000)

  const newUIState = BattleRenderer.renderBattle(uiState, result.state)
  applyCommands(rest, newUIState, result.state)
}

export const Driver = {
  run,
}
