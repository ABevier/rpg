import { option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { reverse, sequence, sort } from "fp-ts/Array";
import * as N from "fp-ts/number";
import { contramap } from "fp-ts/Ord";
import { State } from "../state";
import { Actor } from "../actor";
import { Attack } from "./attack";
import { CommandType } from "./commandType";

export interface Command {
  speed: number;
  sourceId: string;
  targetId: string; // should be any?
  type: CommandType;
}

export interface CommandResult {
  state: State;
  text: string;
}

export type CommandFunc = (state: State, source: Actor, target: Actor) => CommandResult;
export type CommandMap = Record<CommandType, CommandFunc>;

const commands: CommandMap = {
  attack: Attack.apply,
};

const executeCommand = (state: State, command: Command): CommandResult => {
  const actors = [State.lookupActorById(state, command.sourceId), State.lookupActorById(state, command.targetId)];

  return pipe(
    actors,
    //TODO: understand applicative better
    sequence(option.Applicative),
    option.map(([source, target]) => commands[command.type](state, source, target)),
    option.getOrElse(() => ({ state, text: "ERROR: actor is not found" }))
  );
};

//TODO: understand contramap better (it's like mapping on the back half?)
const bySpeed = pipe(
  N.Ord,
  contramap((c: Command) => c.speed)
);

const sortBySpeed = (list: Command[]): Command[] => {
  return pipe(list, sort(bySpeed), reverse);
};

export const Command = {
  sortBySpeed,
  executeCommand,
};
