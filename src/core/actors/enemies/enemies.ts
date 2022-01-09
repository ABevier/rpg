import { CommandType } from '../../commands/commandType'
import { Actor, Team } from '../actor'

export enum EnemyType {
  Goblin = 'goblin',
}

export type EnemySpec = {
  name: string
  maxHp: number
  moves: CommandType[]
}

export type EnemyMap = Record<EnemyType, EnemySpec>

const enemies: EnemyMap = {
  goblin: {
    name: 'Goblin',
    maxHp: 80,
    moves: [CommandType.Attack],
  },
}

const newEnemyActor = (id: string, type: EnemyType): Actor => {
  const spec = enemies[type]
  return {
    id,
    hp: spec.maxHp,
    team: Team.Enemy,
    ...spec,
  }
}

export const Enemies = {
  newEnemyActor,
}
