import { CanvasView } from "./view/CanvasView";
import { Bullet } from "./sprites/Bullet";
import { Chicken } from "./sprites/Chicken";
import { StarShip } from "./sprites/StarShip";
import { Collision } from "./Colision";
// Image
import STARSHIP_IMAGE from '/images/spaceship.png';
import BALL_IMAGE from '/images/ball.png';

// Level and colors

import { PADDLE_WIDTH, PADDLE_HEIGHT, BALL_SPEED, PADDLE_SPEED, BALL_STARTX, BALL_STARTY, BRICK_HEIGHT, BALL_SIZE, PADDLE_STARTX } from "./setup";
import { createChickens } from "./helper";

let score = 0;
let gameOver = false;

function setGameOver(view: CanvasView) {
  view.drawInfo("Game Over!");
  gameOver = false;
}

function setGameWin(view: CanvasView) {
  view.drawInfo("Game Won!");
}

function gameLoop(view: CanvasView, chickens: Chicken[], starShip: StarShip, bullet: Bullet, conlision: Collision) {
  
  view.clear();
  view.drawChicken(chickens);
  view.drawSprite(starShip);

  
  if(
    (starShip.isMovingLeft && starShip.pos.x > 0) ||
    (starShip.isMovingRight && starShip.pos.x < view.canvas.width - starShip.width) ||
    (starShip.isMovingDown && starShip.pos.y > 0) ||
    (starShip.isMovingUp && starShip.pos.y < view.canvas.height - starShip.height )
  ) {

    starShip.moveStarShip();

  }
  
  starShip.bullets.forEach(b => {
    view.drawSprite(b);
    b.moveBullet();
    const collidingBrick = conlision.isCollidingChickens(b, chickens);
    if (collidingBrick) {
      score += b.damage;
      view.drawScore(score);
    }
  })

  if(chickens.length === 0) return setGameWin(view);
  if(gameOver) return setGameOver(view);
  requestAnimationFrame(() => gameLoop(view, chickens, starShip, bullet,conlision))
}


function startGame(view: CanvasView) {
  score = 0;
  view.drawInfo('');
  view.drawScore(0);
  const collision = new Collision();
  const chickens = createChickens();
  
  const bullet = new Bullet(BALL_SPEED, BALL_SIZE, {x: BALL_STARTX, y: BALL_STARTY}, BALL_IMAGE, 2)
  console.log(chickens);
  const paddle = new StarShip(PADDLE_SPEED, PADDLE_WIDTH, PADDLE_HEIGHT, {x: PADDLE_STARTX, y: view.canvas.height - PADDLE_HEIGHT - 5}, STARSHIP_IMAGE);
  gameLoop(view, chickens, paddle, bullet, collision);
}



const view = new CanvasView("#playField"); 
view.initStartButton(startGame)