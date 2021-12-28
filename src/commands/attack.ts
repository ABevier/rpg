import { option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { Actor } from "../actor";
import { State } from "../state";
import { CommandResult } from "./command";

const apply = (state: State, source: Actor, targetId: string): CommandResult => {
  return pipe(
    State.lookupActorById(state, targetId),
    option.filter(Actor.isAlive),
    option.map((target) => applyAttack(state, source, target)),
    option.getOrElse(() => ({ state, text: "It's ineffective" }))
  );
};

const applyAttack = (state: State, source: Actor, target: Actor): CommandResult => {
  //TODO: formulas for this
  const dmg = 30;
  const newState = State.updateActor(state, Actor.applyDamage(target, dmg));
  const text = `${source.id} attacked ${target.id} for ${dmg} damage.`;
  return { state: newState, text };
};

export const Attack = {
  apply,
};
