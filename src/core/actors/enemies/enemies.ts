import { array, io } from 'fp-ts'
import { randomInt } from 'fp-ts/lib/Random'
import { Command } from '../../commands/command'
import { CommandType } from '../../commands/commandType'
import { State } from '../../state'
import { Actor, Team } from '../actor'

export enum EnemyType {
  Goblin = 'goblin',
}

export type EnemySpec = {
  name: string
  maxHp: number
  moves: CommandType[]
}

export type EnemySpecMap = Record<EnemyType, EnemySpec>

const enemies: EnemySpecMap = {
  goblin: {
    name: 'Goblin',
    maxHp: 80,
    moves: [CommandType.Attack],
  },
}

//TODO: make player actor and give it Moves and remove from enemy
export interface EnemyActor extends Actor {
  type: EnemyType
}

const newEnemyActor = (id: string, type: EnemyType): EnemyActor => {
  const spec = enemies[type]
  return {
    id,
    type,
    hp: spec.maxHp,
    team: Team.Enemy,
    ...spec,
  }
}

const chooseCommand =
  (state: State) =>
  (enemy: EnemyActor): Command => {
    // todo: janky stuff - rewrite it later
    const players = State.getPlayerActors(state)
    const idx = randomInt(0, array.size(players) - 1)()
    return { speed: 8000, type: CommandType.Attack, sourceId: enemy.id, targetId: players[idx].id }
  }

export const Enemies = {
  newEnemyActor,
  chooseCommand,
}
