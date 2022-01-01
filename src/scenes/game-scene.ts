import { array } from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'
import { Actor, Team } from '../core/actors/actor'
import { Enemies, EnemyType } from '../core/actors/enemies/enemies'
import { State } from '../core/state'
import { Dictionary } from '../core/utils/dictionary'
import { Menu } from '../ui/menu'
import { PlayerDisplay } from './PlayerDisplay'

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
}

interface UIState {
  playerDisplays: Record<string, PlayerDisplay>
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

    const initialUI: UIState = { playerDisplays: {} }
    const newUIState = this.renderBattle(state, initialUI)
    console.log(newUIState)

    this.driver(this)
  }

  private driver = async (scene: Phaser.Scene): Promise<void> => {
    const value = await Menu.showMenu(scene)
    console.log(`menu clicked with value ${value}`)
  }

  //public update(): void {}

  //TODO: Move this code out to a renderer or something, all the `this`'s are killing me
  public renderBattle(state: State, uiState: UIState): UIState {
    return pipe(uiState, this.renderPlayers(this, state), this.renderEnemies(this, state))
  }

  private renderPlayers = (scene: Phaser.Scene, state: State) => (uiState: UIState) => {
    return pipe(
      State.getPlayerActors(state),
      array.reduceWithIndex(uiState, this.updateDisplayState(scene, 1)),
    )
  }

  private renderEnemies = (scene: Phaser.Scene, state: State) => (uiState: UIState) => {
    return pipe(
      State.getEnemyActors(state),
      array.reduceWithIndex(uiState, this.updateDisplayState(scene, 0)),
    )
  }

  private updateDisplayState =
    (scene: Phaser.Scene, row: number) =>
    (idx: number, uiState: UIState, actor: Actor): UIState => {
      const supplier = () => PlayerDisplay.newPlayerDisplay(scene, idx, row)
      const [playerDisplays, display] = Dictionary.getOrCreate(
        uiState.playerDisplays,
        actor.id,
        supplier,
      )

      PlayerDisplay.updateDisplay(display, actor)

      return { ...uiState, playerDisplays }
    }
}
