import { option } from "fp-ts";
import { findFirst, reduce } from "fp-ts/Array";
import { pipe } from "fp-ts/lib/function";
import { getMonoid } from "fp-ts/lib/Option";
import { last } from "fp-ts/lib/Semigroup";
import { Actor } from "./actor";
import { Command, CommandResult } from "./commands/command";

type Option<V> = option.Option<V>;

export interface State {
  heroes: Actor[];
  enemies: Actor[];
}

//TODO: keep a map?
const lookupActorById = (state: State, id: string): Option<Actor> => {
  const find = findFirst((a: Actor) => a.id === id);
  const maybeInHeroes = pipe(state.heroes, find);
  const maybeInEnemies = pipe(state.enemies, find);

  // This is kind of ugly - using a semigroup combiner that remembers the last some(value)
  // and then concating them
  const M = getMonoid<Actor>(last());
  return M.concat(maybeInHeroes, maybeInEnemies);
};

export interface RoundResult {
  state: State;
  results: CommandResult[];
}

const applyCommands = (state: State, commands: Command[]): RoundResult => {
  const reducer = (acc: RoundResult, c: Command): RoundResult => {
    const result = Command.executeCommand(state, c);
    return { state: result.state, results: [...acc.results, result] };
  };

  return pipe(commands, reduce({ state, results: [] }, reducer));
};

export const State = { lookupActorById, applyCommands };
