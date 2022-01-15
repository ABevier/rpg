import { array } from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'
import { Actor } from '../core/actors/actor'
import { Command } from '../core/commands/command'
import { CommandType } from '../core/commands/commandType'
import { State } from '../core/state'
import { Menu } from '../ui/menu'
import { MenuButtonProps } from '../ui/menu-button'
import { TextArea } from '../ui/text-area'
import { UIState } from './game-scene'

export type PromptF = (state: State, uiState: UIState) => Promise<Command[]>

const newPrompter = (scene: Phaser.Scene): PromptF => {
  return (state: State, uiState: UIState): Promise<Command[]> => {
    return doPromptAll(scene, uiState, State.getPlayerActors(state), [])
  }
}

//TODO: This is gonna need to handle a "back button" at some point
const doPromptAll = async (
  scene: Phaser.Scene,
  uiState: UIState,
  actors: Actor[],
  commands: Command[],
): Promise<Command[]> => {
  //TODO: is there a slick way to rewrite this funtion with fp-ts?
  if (actors.length === 0) {
    return commands
  }

  const [actor, ...rest] = actors
  const cmd = await doPromptOne(scene, uiState, actor)
  return doPromptAll(scene, uiState, rest, [...commands, cmd])
}

//TODO: better names
const doPromptOne = async (
  scene: Phaser.Scene,
  uiState: UIState,
  actor: Actor,
): Promise<Command> => {
  const cmd = await promptForCommand(scene, actor)
  const target = await promptForTarget(uiState, cmd)
  //TODO: Speed shouldn't be here at all
  return { sourceId: actor.id, targetId: target, speed: 9000, type: cmd }
}

// This  is just a hack for now
const tempMapAction = (action: CommandType): MenuButtonProps<CommandType> => {
  return { text: action as string, value: action }
}

const promptForCommand = (scene: Phaser.Scene, actor: Actor): Promise<CommandType> => {
  console.log(`get command selection for actor: ${actor.id}`)
  //TODO: curry this better
  return pipe(actor.moves, array.map(tempMapAction), (b) => Menu.getMenuSelection(scene, b))
}

const promptForTarget = (uiState: UIState, _action: CommandType): Promise<string> => {
  //TODO: get the target based on the CommandType
  return Menu.getEnemyClick(uiState)
}

const delay = (uiState: UIState, time: number): Promise<UIState> => {
  return new Promise((resolve, _reject) => {
    uiState.scene.time.delayedCall(time, () => resolve(uiState))
  })
}

const flashPrompt = async (uiState: UIState, text: string, time: number): Promise<void> => {
  const textArea = TextArea.newTextArea(uiState, { text, x: 100, y: 500 })
  await delay(uiState, time)
  TextArea.destroy(textArea)

  //TODO: probably get rid of this and add a real transition?
  await delay(uiState, 200)
}

export const Prompter = {
  newPrompter,
  flashPrompt,
}
