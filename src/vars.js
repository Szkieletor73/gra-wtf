import backgroundImageUrl from './bg.jpg';
import heroImageUrl from './plane.png';
import enemyImageUrl from './enemy.png';
import bulletImageUrl from './bullet.png';
import bgScrollImageUrl from './bg.jpg';

export var canvas = document.createElement('canvas');
export var context = canvas.getContext('2d');
canvas.width = 1400;
canvas.height = 760;
export var gameOver = 0;
export var score = 0;
export var life = 3;

export var bgImage = new Image();
bgImage.src = backgroundImageUrl;

export var heroImage = new Image();
heroImage.src = heroImageUrl;
export var hero = {image: heroImage, x: 0, y: 500, w: 64, h: 32, speed: 6};

export var enemyImage = new Image();
enemyImage.src = enemyImageUrl;
export var enemies = [];
export var enemy_speed = 3;
export var enemy_bullets = 1;
export var enemiesBullet = [];
export var enemy_bullet_speed = 6;

export var bulletImage = new Image();
bulletImage.src = bulletImageUrl;
export var bullet = {image: bulletImage, x: 0, y: 500, w: 16, h: 16, speed: 10};

var bgScroll = new Image();
bgScroll.src = bgScrollImageUrl;
