export interface Actor {
  id: string
  name: string
  hp: number
  maxHp: number
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
