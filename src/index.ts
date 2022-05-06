import { CanvasView } from "./view/CanvasView";
import { Bullet } from "./services/Bullet";
import { Chicken } from "./services/Chicken";
import { StarShip } from "./services/StarShip";
import { Collision } from "./Colision";
// Image
import STARSHIP_IMAGE from '/images/spaceship.png';
// Level and colors
import { PADDLE_WIDTH, PADDLE_HEIGHT, BALL_SPEED, PADDLE_SPEED, BALL_STARTX, BALL_STARTY, BRICK_HEIGHT, BALL_SIZE, PADDLE_STARTX, LEVEL1, LEVEL2 } from "./setup";
import { createChickens } from "./helper";


let score = 0;
let gameOver = false;
let count: number = 0;

function setGameOver(view: CanvasView) {
  view.drawInfo("Game Over!");
  gameOver = false;
}

function setGameWin(view: CanvasView) {
  view.drawInfo("Game Won!");
}

function gameLoop(view: CanvasView, chickens: Chicken[], starShip: StarShip, conlision: Collision) {
  count++;
  view.clear();
  chickens.forEach(chicken => {
    view.drawSprite(chicken);
  }) 

  view.drawSprite(starShip);
  //view.drawSprite(gift);
  //conlision.isChickenConfictWalls(chickens, view);
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
  conlision.gifts.forEach(g => {
    view.drawSprite(g);
    g.moveItemSupport();
    const conflicking = conlision.checkCollidingItem(g, starShip);
    if(conflicking) starShip.typeBullet = conlision.typeItem;
  })

  //conlision.isChickenConfictWalls(chickens, view);
  if(conlision.checkCollidingStarshipWithChickens(chickens, starShip)) return setGameOver(view);
  if(chickens.length === 0) {
    chickens = createChickens(LEVEL2);
    view.drawChicken(chickens);
  }
  if(gameOver) return setGameOver(view);
  requestAnimationFrame(() => gameLoop(view, chickens, starShip, conlision))
}


function startGame(view: CanvasView) {
  score = 0;
  view.drawInfo('');
  view.drawScore(0);
  const collision = new Collision();
  const chickens = createChickens(LEVEL1);
  
  //const bullet = new Bullet(BALL_SPEED, BALL_SIZE, {x: BALL_STARTX, y: BALL_STARTY}, BULLET_IMAGE, 2)
  //const gift = new ItemSupport(1, 50, {x: 300, y: 0}, GIFT_BOX01, 1);
  const startShip = new StarShip(PADDLE_SPEED, PADDLE_WIDTH, PADDLE_HEIGHT, {x: PADDLE_STARTX, y: view.canvas.height - PADDLE_HEIGHT - 5}, STARSHIP_IMAGE, 3, -1);
  gameLoop(view, chickens, startShip, collision);
}

const view = new CanvasView("#playField"); 
view.initStartButton(startGame)
