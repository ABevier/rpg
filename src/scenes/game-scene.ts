import { Team } from '../core/actors/actor'
import { Enemies, EnemyType } from '../core/actors/enemies/enemies'
import { State } from '../core/state'
import { PlayerDisplay } from './PlayerDisplay'

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
}

export class GameScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig)
  }

  public create(): void {
    this.renderBattle()
  }

  //public update(): void {}

  public renderBattle(): void {
    const state = State.newBattleState(
      [
        { id: '1', name: 'Bob', hp: 29, maxHp: 120, team: Team.Player },
        { id: '2', name: 'Alice', hp: 100, maxHp: 120, team: Team.Player },
        { id: '3', name: 'Eugene', hp: 150, maxHp: 150, team: Team.Player },
      ],
      [
        Enemies.newEnemyActor('e1', EnemyType.Goblin),
        { ...Enemies.newEnemyActor('e2', EnemyType.Goblin), hp: 28 },
        Enemies.newEnemyActor('e3', EnemyType.Goblin),
      ],
    )

    const playerActors = State.getPlayerActors(state)

    playerActors.forEach((actor, idx) => {
      const display = PlayerDisplay.newPlayerDisplay(this, idx, 1)
      PlayerDisplay.updateDisplay(display, actor)
    })

    const enemyActors = State.getEnemyActors(state)
    enemyActors.forEach((actor, idx) => {
      const display = PlayerDisplay.newPlayerDisplay(this, idx, 0)
      PlayerDisplay.updateDisplay(display, actor)
    })
  }
}
