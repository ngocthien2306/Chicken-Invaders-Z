import { Collision } from "~/Colision";
import { Chicken } from "~/services/Chicken";
import { Egg } from "~/services/Egg";
import { StarShip } from "~/services/StarShip";
import { CanvasView } from "~/view/CanvasView";
import { changeGiftBoxesInUI, getRandomInt } from "./helper";
import EGG_IMAGE from "/images/egg.png";
let score = 0;


export function moveStarShip(starShip: StarShip, view: CanvasView): void {
  if(
    (starShip.isMovingLeft && starShip.pos.x > 0) ||
    (starShip.isMovingRight && starShip.pos.x < view.canvas.width - starShip.width) ||
    (starShip.isMovingDown && starShip.pos.y > 0) ||
    (starShip.isMovingUp && starShip.pos.y < view.canvas.height - starShip.height )
  ) {
    starShip.moveStarShip();
  }
}



export function shootingBullet(starShip: StarShip, view: CanvasView, conlision: Collision, chickens: Chicken[]): void {
  starShip.bullets.forEach(b => {
    view.drawSprite(b);
    b.moveBullet();
    const collidingBrick = conlision.isCollidingChickens(b, chickens);
    if (collidingBrick) {
      score += b.damage;
      view.drawScore("Score: " + score.toString());
    }
  })
}

export function drawAndMoveGift(conlision: Collision, view: CanvasView, starShip: StarShip): void {
  conlision.gifts.forEach(g => {
    view.drawSprite(g);
    g.moveItemSupport();
    const conflicking = conlision.checkCollidingItem(g, starShip);
    if(conflicking) {
      starShip.typeBullet = conlision.typeItem;
      //view.drawGift(changeGiftBoxesInUI(conlision.typeItem));
    }
  })
}

export function drawAndMoveEgg(starShip: StarShip,conlision: Collision, chickens: Chicken[], view: CanvasView): void {
  var number = getRandomInt(150);
  if(number === 50) {
    var index = getRandomInt(chickens.length);
    conlision.eggs.push(new Egg(1, 30, 30, {x: chickens[index].pos.x, y: chickens[index].pos.y}, EGG_IMAGE))
  }
  
  conlision.eggs.forEach(e => {
    view.drawSprite(e);
    e.moveEgg();
    conlision.checkCollidingEgg(e, starShip);
  })
}

export function drawAndMoveChicken(chickens: Chicken[], view: CanvasView): void {
  chickens.forEach((chicken, i) => {
    chicken.moveChicken(view);
    view.drawSprite(chicken);
  }) 
}
  