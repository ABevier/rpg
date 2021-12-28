import { Command } from "./commands/command";
import { CommandType } from "./commands/commandType";
import { State } from "./state";

const state = State.newBattleState(
  [
    { id: "1", hp: 200 },
    { id: "2", hp: 100 },
    { id: "3", hp: 150 },
  ],
  [
    { id: "e1", hp: 30 },
    { id: "e2", hp: 30 },
    { id: "e3", hp: 30 },
  ]
);

const commands = [
  { speed: 10, sourceId: "1", targetId: "e1", type: "attack" as CommandType },
  { speed: 3, sourceId: "2", targetId: "e2", type: "attack" as CommandType },
  { speed: 5, sourceId: "3", targetId: "e1", type: "attack" as CommandType },
  { speed: 14, sourceId: "e1", targetId: "1", type: "attack" as CommandType },
];
const c = Command.sortBySpeed(commands);

const s = State.applyCommands(state, c);

//console.log(s);
console.dir(s, { depth: null });
