import { Chicken } from "./sprites/Chicken";
import { StarShip } from "./sprites/StarShip";
import { Bullet } from "./sprites/Bullet";
import { CanvasView } from "./view/CanvasView";

export class Collision {
  checkBallCollision(bullet: Bullet, starShip: StarShip, view: CanvasView): void {
    // 1. Check ball collision with paddle
    if (
      bullet.pos.x + bullet.width > starShip.pos.x &&
      bullet.pos.x < starShip.pos.x + starShip.width &&
      bullet.pos.y + bullet.height === starShip.pos.y
    ) {
      bullet.changeYDirection();
    }
    // 2. Check ball collision with walls
    // Ball movement X constraints
    if (bullet.pos.x > view.canvas.width - bullet.width || bullet.pos.x < 0) {
      bullet.changeXDirection();
    }
    // Ball movement Y constraints
    if (bullet.pos.y < 0) {
      bullet.changeYDirection();
    }
  }

  checkStarshipColliding(chickens: Chicken[], starShip: StarShip): boolean {
    let colliding = false;
    chickens.forEach((chicken, i) => {

      if(
        starShip.pos.x + starShip.width > chicken.pos.x &&
        starShip.pos.x < chicken.pos.x + chicken.width &&
        starShip.pos.y + starShip.height === chicken.pos.y
      ) 
      {
        colliding = true;
      }
    })
    return colliding;
  }
  isCollidingChicken(bullet: Bullet, chicken: Chicken): boolean {

    if (
      bullet.pos.x < chicken.pos.x + chicken.width && 
      bullet.pos.x + bullet.width > chicken.pos.x &&
      bullet.pos.y < chicken.pos.y + chicken.height &&
      bullet.pos.y + bullet.height > chicken.pos.y
    ) {

      return true;
    }
    return false;
  }

  // Check ball collision with bricks
  isCollidingChickens(bullet: Bullet, chickens: Chicken[]): boolean {
    let colliding = false;

    chickens.forEach((chicken, i) => {
      if (this.isCollidingChicken(bullet, chicken)) {
        bullet.changeYODirection();
        //console.log(chicken.energy);
        //chicken.energy -= bullet.damage;
        if (chicken.energy <= 0) {
          chickens.splice(i, 1);
        } else {
          chicken.energy -= bullet.damage;
        }
        colliding = true;
      }
    });
    return colliding;
  }
}