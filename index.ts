import Game from './src/Game';
import * as GameTypesNamespace from './src/GameTypesNamespace';

console.info("Running index file");

console.info(new (<any>GameTypesNamespace)["Human"]("x"));

const game = new Game();
game.nextAge();
game.status();