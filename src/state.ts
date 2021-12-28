import { option } from "fp-ts";
import { reduce } from "fp-ts/Array";
import { pipe } from "fp-ts/lib/function";
import { lookup, upsertAt } from "fp-ts/Record";
import { Actor } from "./actor";
import { Command, CommandResult } from "./commands/command";

type Option<V> = option.Option<V>;

export interface State {
  actors: Record<string, Actor>;
}

const newBattleState = (heroes: Actor[], enemies: Actor[]): State => {
  const reducer = (acc: Record<string, Actor>, actor: Actor) => pipe(acc, upsertAt(actor.id, actor));
  const actors = [...heroes, ...enemies].reduce(reducer, {});
  return { actors };
};

const lookupActorById = (state: State, id: string): Option<Actor> => {
  return pipe(state.actors, lookup(id));
};

const updateActor = (state: State, actor: Actor): State => {
  const actors = pipe(state.actors, upsertAt(actor.id, actor));
  return { ...state, actors };
};

//TODO: keep a map?
// const lookupActorById = (state: State, id: string): Option<Actor> => {
//   const find = findFirst((a: Actor) => a.id === id);
//   const maybeInHeroes = pipe(state.heroes, find);
//   const maybeInEnemies = pipe(state.enemies, find);

//   // This is kind of ugly - using a semigroup combiner that remembers the last some(value)
//   // and then concating them
//   const M = getMonoid<Actor>(last());
//   return M.concat(maybeInHeroes, maybeInEnemies);
// };

export interface RoundResult {
  state: State;
  results: CommandResult[];
}

const applyCommands = (state: State, commands: Command[]): RoundResult => {
  const reducer = (acc: RoundResult, c: Command): RoundResult => {
    const result = Command.executeCommand(acc.state, c);
    return { state: result.state, results: [...acc.results, result] };
  };

  return pipe(commands, reduce({ state, results: [] }, reducer));
};

export const State = {
  newBattleState,
  lookupActorById,
  updateActor,
  applyCommands,
};
