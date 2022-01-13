import { array } from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'
import { Actor } from '../core/actors/actor'
import { Command } from '../core/commands/command'
import { CommandType } from '../core/commands/commandType'
import { State } from '../core/state'
import { UIState } from './game-scene'
import { PromptF } from './prompter'

// The main combat loop should be the following steps:
// - Prompt for actions from each player character
// - Generate actions for each enemy
// - Apply each action to the game state in order
// - - Render the action result
// - Restart the loop

const run = async (prompter: PromptF, uiState: UIState, state: State): Promise<void> => {
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
  const result = await prompter(state, uiState)
  console.log('result of prompting is:', result)

  //TODO: figure out how to use promises better in fp-ts
  // And empty array checks...
  // I can make a big pipe probably
  const sorted = Command.sortBySpeed(result)
  applyCommands(sorted, uiState, state, prompter)
}

//TODO: can get rid of prompter when UIState has a scene
const applyCommands = (commands: Command[], uiState: UIState, state: State, prompter: PromptF) => {
  if (array.isEmpty(commands)) {
    return run(prompter, uiState, state)
  }

  const [command, ...rest] = commands
  console.log('applying command:', command)
  const result = Command.executeCommand(state, command)
  console.log(result.text)
  applyCommands(rest, uiState, result.state, prompter)
}

export const Driver = {
  run,
}
