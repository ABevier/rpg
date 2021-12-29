import { Team } from './actors/actor'
import { Enemies, EnemyType } from './actors/enemies/enemies'
import { Command } from './commands/command'
import { CommandType } from './commands/commandType'
import { State } from './state'

const state = State.newBattleState(
  [
    { id: '1', name: 'Bob', hp: 29, maxHp: 120, team: Team.Player },
    { id: '2', name: 'Alice', hp: 100, maxHp: 120, team: Team.Player },
    { id: '3', name: 'Eugene', hp: 150, maxHp: 150, team: Team.Player },
  ],
  [Enemies.newEnemyActor('e1', EnemyType.Goblin), { ...Enemies.newEnemyActor('e2', EnemyType.Goblin), hp: 28 }, Enemies.newEnemyActor('e3', EnemyType.Goblin)],
)

const commands = [
  { speed: 10, sourceId: '1', targetId: 'e1', type: 'attack' as CommandType },
  { speed: 3, sourceId: '2', targetId: 'e2', type: 'attack' as CommandType },
  { speed: 5, sourceId: '3', targetId: 'e2', type: 'attack' as CommandType },
  { speed: 14, sourceId: 'e1', targetId: '1', type: 'attack' as CommandType },
]
const c = Command.sortBySpeed(commands)

const s = State.applyCommands(state, c)

//console.log(s);
console.dir(s, { depth: null })
