import { Team } from '../core/actors/actor'
import { Enemies, EnemyType } from '../core/actors/enemies/enemies'
import { CommandType } from '../core/commands/commandType'
import { State } from '../core/state'
import { BattleRenderer } from '../ui/battleRenderer'
import { Driver } from './driver'
import { PlayerDisplay } from './PlayerDisplay'

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
}

export interface UIState {
  scene: Phaser.Scene
  playerDisplays: Record<string, PlayerDisplay>
  //TODO: add an instruction Prompt!!
}

export class GameScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig)
  }

  public create(): void {
    const state = State.newBattleState(
      [
        {
          id: '1',
          name: 'Bob',
          hp: 29,
          maxHp: 120,
          team: Team.Player,
          moves: [CommandType.Attack, CommandType.Defend],
        },
        {
          id: '2',
          name: 'Alice',
          hp: 100,
          maxHp: 120,
          team: Team.Player,
          moves: [CommandType.Attack, CommandType.Defend],
        },
        {
          id: '3',
          name: 'Eugene',
          hp: 150,
          maxHp: 150,
          team: Team.Player,
          moves: [CommandType.Attack, CommandType.Defend],
        },
      ],
      [
        Enemies.newEnemyActor('e1', EnemyType.Goblin),
        { ...Enemies.newEnemyActor('e2', EnemyType.Goblin), hp: 28 },
        Enemies.newEnemyActor('e3', EnemyType.Goblin),
      ],
    )

    const initialUI: UIState = { scene: this, playerDisplays: {} }
    const newUIState = BattleRenderer.renderBattle(initialUI, state)
    console.log(newUIState)

    //TODO: find a better place to kick this off??
    Driver.run(newUIState, state)
  }
}
