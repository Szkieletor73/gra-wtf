import * as vars from './vars.js';
import { keysUpdate } from './keys.js';

function hittest(a, b) {
  return ((a.x < (b.x + b.w)) &&
    ((a.x + a.w) > b.x) &&
    (a.y < (b.y + b.h)) &&
    ((a.y + a.h) > b.y));
}

export function initEnemyBullet (k) {
    var check = false;
    while (!check){
        var enemy = Math.floor(Math.random() * vars.enemies.length);
        if (vars.enemies[enemy].visible){
            vars.enemiesBullet[k] = {visible : true, image : vars.bulletImage, x : vars.enemies[enemy].x + 30,
                                y : vars.enemies[enemy].y + 25, w : 16, h : 16}
            check = true;
        }
    }
}

export function initEnemiesBullet() {
  var k = 0;
  while (k < vars.enemy_bullets) {
    initEnemyBullet(k++);
  }
}

export function initEnemies() {
  var k = 0;
  for(var i = 0; i < 4; i++)
    for(var j = 0; j < 8; j++)
      vars.enemies[k++] = {visible: true, image: vars.enemyImage, x: j * 64, y: (i + 1) * 50, w: 64, h: 50};
}

export function moveEnemies() {
  var dropdown = false;
  for(var i = 0; i < vars.enemies.length; i++) {
    if(vars.enemies[i].visible) {
      vars.enemies[i].x += vars.enemy_speed;
      if(vars.enemies[i].x > (vars.canvas.width - vars.hero.w) || vars.enemies[i].x < 0)
        dropdown = true;

      if(hittest(vars.enemies[i],vars.bullet)) {
        vars.enemies[i].visible = false;
        vars.bullet.visible = false;
        vars.bullet.x = vars.hero.x + 30;
        vars.bullet.y = 450;
        vars.score += 10;
      }
    }
  }
  if(dropdown) {
    vars.enemy_speed = -vars.enemy_speed;
    for(var i = 0; i < vars.enemies.length; i++)
      vars.enemies[i].y += 10;
  }
}

export function drawBullet() {
  if(vars.bullet.visible) {
    vars.context.drawImage(vars.bullet.image, vars.bullet.x, vars.bullet.y);
    vars.bullet.y -= vars.bullet.speed;
    if(vars.bullet.y < 0)
      vars.bullet.visible = false;
  }
}

export function drawEnemyBullet() {
  for (var i = 0; i < vars.enemiesBullet.length; i++){
    vars.context.drawImage(vars.enemiesBullet[i].image, vars.enemiesBullet[i].x, vars.enemiesBullet[i].y);

    vars.enemiesBullet[i].y += vars.enemy_bullet_speed;

    if (vars.enemiesBullet[i].y > vars.canvas.height){
      initEnemyBullet(i);
    }
    if (hittest(vars.enemiesBullet[i], vars.hero)){
      initEnemyBullet(i);
      vars.life--;
    }
    if (vars.life === 0){
      vars.gameOver = 1;
    }
  }
}

export function render() {
  vars.context.drawImage(vars.bgImage, 0, 0);
  if(vars.gameOver === 0) {
    vars.context.drawImage(vars.hero.image, vars.hero.x, vars.hero.y);
    for(var i = 0; i < vars.enemies.length; i++)
      if(vars.enemies[i].visible)
        vars.context.drawImage(vars.enemies[i].image, vars.enemies[i].x, vars.enemies[i].y);
    drawBullet();
    moveEnemies();
    drawEnemyBullet();
  }
}

export function main() {
  keysUpdate();
  render();
  requestAnimationFrame(main);
}
