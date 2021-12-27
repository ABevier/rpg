# ts-game

### Code

trying to do as much FP as possible, but Phaser will change that
Trying to organize code something like you would in Elixir
One interface/type per "module".  
Module name is Capitalized plural of the type. i.e. Type: Game -> Module: Games

FP Libraries to look at:
fp-ts
immutableJS
??

Input flow:
Input -> Command -> new game state

### Design notes

the destination position "infers" the move you want to make there.
Click on empty square to move there, enemy to attack them, etc

Types of "inputs" and sample commands they mean:

- empty square -> move
- enemy square -> attack
- friendly square -> heal
- dead enemy square -> stomp (bury)
- dead friend square -> rez
- self square -> Not sure about this

Addtionally can take range into effect:

- enemy square next to me -> melee attack
- enemy square far away -> ranged attack

### TODO:

- Get prototype of just the library
- Add jest tests
- create cli client
- get it running in a browser then add client server
- ???

- Input should return a Game + Output. Output can be used for logging and animation
- Make the Submit thing actually play the stored commands

Features:

- Add Crystals and win condition
- Play cards to summon units
- get it working in the browser

- When to take a breather and refactor?? Need a solid test suite on the library.
  - Data structures are a bit of a mess
