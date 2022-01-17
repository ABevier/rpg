import { array } from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'
import { Actor } from '../core/actors/actor'
import { Enemies } from '../core/actors/enemies/enemies'
import { Command } from '../core/commands/command'
import { State } from '../core/state'
import { BattleRenderer } from '../ui/battleRenderer'
import { UIState } from './game-scene'
import { Prompter } from './prompter'

// The main combat loop should be the following steps:
// - Prompt for commands from each player character
// - Generate actions for each enemy
// - Convert all commands into actions and sort by speed
// - Apply each action to the game state in order
// - - Render the action result
// - Restart the loop

const run = async (uiState: UIState, state: State): Promise<void> => {
  //TODO: figure out how to use promises better in fp-ts
  // And empty array checks...
  // I can this function make a big pipe probably
  const playerCommands = await Prompter.promptForCommands(uiState, state)
  const enemyCommands = pipe(
    state,
    State.getEnemyActors,
    array.filter(Actor.isAlive),
    array.map(Enemies.chooseCommand(state)),
  )
  const sorted = Command.sortBySpeed([...playerCommands, ...enemyCommands])
  applyCommands(sorted, uiState, state)
}

const applyCommands = async (commands: Command[], uiState: UIState, state: State) => {
  if (array.isEmpty(commands)) {
    return run(uiState, state)
  }

  // TODO: This code is a fucking mess... booby traps with newStates
  const [command, ...rest] = commands
  const { state: newState, text } = Command.executeCommand(state, command)

  await Prompter.flashPrompt(uiState, text, 1000)

  const newUIState = BattleRenderer.renderBattle(uiState, newState)
  applyCommands(rest, newUIState, newState)
}

export const Driver = {
  run,
}
