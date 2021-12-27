import { option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { reverse, sort } from "fp-ts/Array";
import * as N from "fp-ts/number";
import { contramap } from "fp-ts/Ord";
import { State } from "../state";

export interface Command {
  speed: number;
  sourceId: string;
  targetId: string; // should be any?
  type: CommandType;
}

export enum CommandType {
  Attack = "attack",
  Skill = "skill",
}

export interface CommandResult {
  state: State;
  text: string;
}

const executeCommand = (state: State, command: Command): CommandResult => {
  return pipe(
    State.lookupActorById(state, command.sourceId),
    option.map((a) => ({ state, text: `Actor: ${a.id} did something` })),
    option.getOrElse(() => ({ state, text: "ERROR: Source actor is not found" }))
  );
};

//TODO: understand contramap better (it's like mapping on the back half?)
const bySpeed = pipe(
  N.Ord,
  contramap((c: Command) => c.speed)
);

const sortBySpeed = (commands: Command[]): Command[] => {
  return pipe(commands, sort(bySpeed), reverse);
};

export const Command = {
  sortBySpeed,
  executeCommand,
};
