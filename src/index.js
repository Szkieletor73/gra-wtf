import { canvas } from './vars.js'
import { initEnemiesBullet, initEnemies, main } from './game.js'

document.body.appendChild(canvas);
initEnemies();
initEnemiesBullet();
main();
