import { array } from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'
import { Actor } from '../core/actors/actor'
import { State } from '../core/state'
import { Dictionary } from '../core/utils/dictionary'
import { UIState } from '../scenes/game-scene'
import { PlayerDisplay } from '../scenes/PlayerDisplay'

const ENEMY_ROW = 0
const PLAYER_ROW = 1

const renderBattle = (uiState: UIState, state: State): UIState => {
  return pipe(uiState, renderPlayers(state), renderEnemies(state))
}

const renderPlayers = (state: State) => (uiState: UIState) => {
  return pipe(
    State.getPlayerActors(state),
    array.reduceWithIndex(uiState, updateDisplayState(PLAYER_ROW)),
  )
}

const renderEnemies = (state: State) => (uiState: UIState) => {
  return pipe(
    State.getEnemyActors(state),
    array.reduceWithIndex(uiState, updateDisplayState(ENEMY_ROW)),
  )
}

const updateDisplayState =
  (row: number) =>
  (idx: number, uiState: UIState, actor: Actor): UIState => {
    const supplier = () => PlayerDisplay.newPlayerDisplay(uiState, idx, row, actor.id)

    const [playerDisplays, display] = Dictionary.getOrCreate(
      uiState.playerDisplays,
      actor.id,
      supplier,
    )

    PlayerDisplay.updateDisplay(display, actor)
    return { ...uiState, playerDisplays }
  }

export const BattleRenderer = {
  renderBattle,
}
