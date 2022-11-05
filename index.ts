import Game from './src/Game';
import GameManager from './src/GameManager';

import Vector2 from './src/classes/Vector2';
import { AgentTypes } from './src/classes/Agent';

console.info("Running index file");

//////////////////////
const manager = new GameManager();

manager.setAgent(AgentTypes.TRIBE, new Vector2(1, 5), [
    manager.born('hum1', 0),
    manager.born('hum2', 0, false) 
]);
manager.born('hum3', 0);
manager.settle('x', ' ', new Vector2(1, 5));
manager.marriage(' ', '!');
//////////////////////

const game = new Game();
game.nextAge();
game.status();