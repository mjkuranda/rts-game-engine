import Game from './src/Game';
import GameManager from './src/GameManager';

import Vector2 from './src/classes/Vector2';

console.info("Running index file");

//////////////////////
const manager = new GameManager();

manager.setAgent(new Vector2(1, 5), [
    manager.born('hum1', 0),
    manager.born('hum2', 0) 
]);
manager.born('hum3', 0);

manager.settle('x', ' ', new Vector2(1, 5));
manager.settle('y', null, new Vector2(1, 0));

manager.marriage(' ', '!');
//////////////////////

const game = new Game();
game.nextAge();
game.status();