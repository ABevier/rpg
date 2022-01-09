import { Actor } from '../actors/actor'
import { State } from '../state'
import { CommandResult } from './command'

const apply = (state: State, source: Actor, _targetId: string): CommandResult => {
  return { state, text: `${source.name}(${source.id}) used defend.` }
}

export const Defend = {
  apply,
}
