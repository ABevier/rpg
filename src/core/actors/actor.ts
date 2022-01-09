import { CommandType } from '../commands/commandType'

export enum Team {
  Player = 'player',
  Enemy = 'enemy',
}

export interface Actor {
  id: string
  name: string
  team: Team
  hp: number
  maxHp: number
  // A list of actions the actor could take
  moves: CommandType[]
}

const applyDamage = (actor: Actor, amount: number): Actor => {
  const newHp = Math.max(0, actor.hp - amount)
  return { ...actor, hp: newHp }
}

const isDead = (actor: Actor): boolean => actor.hp === 0
const isAlive = (actor: Actor): boolean => !isDead(actor)

export const Actor = {
  applyDamage,
  isDead,
  isAlive,
}
