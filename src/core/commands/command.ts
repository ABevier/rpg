import { option } from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'
import { reverse, sort } from 'fp-ts/Array'
import * as N from 'fp-ts/number'
import { contramap } from 'fp-ts/Ord'
import { State } from '../state'
import { Attack } from './attack'
import { CommandType } from './commandType'
import { Actor } from '../actors/actor'

export interface Command {
  speed: number
  sourceId: string
  targetId: string // should be any?
  type: CommandType
}

export interface CommandResult {
  state: State
  text: string
}

//TODO: targetId can be an actor id, a row id, or maybe other things
export type CommandFunc = (state: State, source: Actor, targetId: string) => CommandResult

export type CommandMap = Record<CommandType, CommandFunc>

const commands: CommandMap = {
  attack: Attack.apply,
}

const executeCommand = (state: State, command: Command): CommandResult => {
  return pipe(
    State.lookupActorById(state, command.sourceId),
    option.filter(Actor.isAlive),
    option.map((actor) => commands[command.type](state, actor, command.targetId)),
    option.getOrElse(() => ({ state, text: `Actor id: ${command.sourceId} cannot act` })),
  )
}

// const executeCommand = (state: State, command: Command): CommandResult => {
//   const actors = [State.lookupActorById(state, command.sourceId), State.lookupActorById(state, command.targetId)];

//   return pipe(
//     actors,
//     //TODO: understand applicative better
//     sequence(option.Applicative),
//     option.map(([source, target]) => commands[command.type](state, source, target)),
//     option.getOrElse(() => ({ state, text: "ERROR: actor is not found" }))
//   );
// };

//TODO: understand contramap better (it's like mapping on the back half?)
const bySpeed = pipe(
  N.Ord,
  contramap((c: Command) => c.speed),
)

const sortBySpeed = (list: Command[]): Command[] => {
  return pipe(list, sort(bySpeed), reverse)
}

export const Command = {
  sortBySpeed,
  executeCommand,
}
