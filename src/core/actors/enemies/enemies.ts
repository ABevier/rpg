import { Actor } from '../actor'

export enum EnemyType {
  Goblin = 'goblin',
}

export type EnemySpec = {
  name: string
  maxHp: number
}

export type EnemyMap = Record<EnemyType, EnemySpec>

const enemies: EnemyMap = {
  goblin: {
    name: 'Goblin',
    maxHp: 80,
  },
}

const newEnemyActor = (id: string, type: EnemyType): Actor => {
  const spec = enemies[type]
  return {
    id,
    hp: spec.maxHp,
    ...spec,
  }
}

export const Enemies = {
  newEnemyActor,
}
