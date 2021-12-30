import { array } from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'
import { Actor, Team } from '../core/actors/actor'
import { Enemies, EnemyType } from '../core/actors/enemies/enemies'
import { State } from '../core/state'
import { Dictionary } from '../core/utils/dictionary'
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

    const initialUI: Record<string, PlayerDisplay> = {}
    const newUIState = this.renderBattle(state, initialUI)
    console.log(newUIState)
  }

  //public update(): void {}

  //TODO: there is some ugliness in here, not sure how much I like it
  // There has to be a cool pipe trick here or something. refactor this later
  public renderBattle(state: State, uiState: Record<string, PlayerDisplay>): Record<string, PlayerDisplay> {
    const updatePlayerDisplay = this.updateDisplayState(this, 1)
    const playerActors = State.getPlayerActors(state)
    let newUIState = pipe(playerActors, array.reduceWithIndex(uiState, updatePlayerDisplay))

    const updateEnemyDisplay = this.updateDisplayState(this, 0)
    const enemyActors = State.getEnemyActors(state)
    newUIState = pipe(enemyActors, array.reduceWithIndex(newUIState, updateEnemyDisplay))

    return newUIState
  }

  private updateDisplayState =
    (scene: Phaser.Scene, row: number) =>
    (idx: number, uiState: Record<string, PlayerDisplay>, actor: Actor): Record<string, PlayerDisplay> => {
      const supplier = () => PlayerDisplay.newPlayerDisplay(scene, idx, row)
      const [newUiState, display] = Dictionary.getOrCreate(uiState, actor.id, supplier)
      PlayerDisplay.updateDisplay(display, actor)
      return newUiState
    }
}
