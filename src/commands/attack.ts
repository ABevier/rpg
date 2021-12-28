import { Actor } from "../actor";
import { State } from "../state";
import { CommandResult } from "./command";

const apply = (state: State, source: Actor, target: Actor): CommandResult => {
  return { state, text: `${source.id} attacks ${target.id}!!!` };
};

export const Attack = {
  apply,
};
