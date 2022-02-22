# rpg

Current Goal: Fully playable turns

- Dead actors don't get prompted for commands
- Show an instruction when picking a command or targeting
- highlight currently "active" player actor (when selecting)
- play animations? Bouncing Health and/or a slash?

- Check for win conditions
- Target handling (Make sure commands can only attack the correct target)

- How to render dead enemies and players
- Show an attack animation?

Refactor:
State -> BattleState
Command -> Attack (Command would trigger an attack i.e. command is the "input" and attack is the "action")

MAJOR TODOS:
fully playable turns
win condition check

multiple skills
stats
buffs
