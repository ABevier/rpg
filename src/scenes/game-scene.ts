import { option } from 'fp-ts'
import { Team } from '../core/actors/actor'
import { Enemies, EnemyType } from '../core/actors/enemies/enemies'
import { State } from '../core/state'

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
      //TODO: another function
      const container = this.add.container(100 + idx * 250, 100)
      const background = new Phaser.GameObjects.Rectangle(this, 0, 0, 200, 80, 0x0000ff).setOrigin(0, 0)
      container.add(background)

      const textStyle = { font: '22px Courier', color: '#DCDCDC' }

      const nameLabel = new Phaser.GameObjects.Text(this, 10, 10, actor.name, textStyle).setOrigin(0, 0)
      container.add(nameLabel)

      const hpText = `HP: ${actor.hp}/${actor.maxHp}`
      const hpLabel = new Phaser.GameObjects.Text(this, 10, 30, hpText, textStyle).setOrigin(0, 0)
      container.add(hpLabel)
    })
  }
}
