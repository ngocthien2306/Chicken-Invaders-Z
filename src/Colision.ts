import { Chicken } from "./services/Chicken";
import { StarShip } from "./services/StarShip";
import { Bullet } from "./services/Bullet";
import { CanvasView } from "./view/CanvasView";
import { ItemSupport } from "./services/Item";

import { getItemSupport, getRandomInt, listCategoryItem } from "./helper";
import { ItemModel } from "./model/Item.model";
export class Collision {

  gifts: ItemSupport[] = [];

  typeNumberItem!: number;
  get typeItem():number {
    return this.typeNumberItem;
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

  isChickenConfictWall(chicken: Chicken, view: CanvasView) {
    if(chicken.pos.x > view.canvas.width - chicken.width || chicken.pos.x < 0) {
      //console.log(chicken.pos.x);
      return true;
    }
    return false;
  }

  isChickenConfictWalls(chickens: Chicken[], view: CanvasView) {
    let colliding = false;
    chickens.forEach(c => {
      view.drawSprite(c);
      c.moveDownChicken();
      if(this.isChickenConfictWall(c, view)) {
        c.moveUpChicken();
        colliding = true;
      }


    })
    return colliding;
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
          const randomNumber = getRandomInt(10);
          if(randomNumber > 5) {
            const gift = getItemSupport(chicken.pos.x, chicken.pos.y);           
            //console.log(gift.typeGift);
            this.gifts.push(gift);
          }
          chickens.splice(i, 1);
        } else {
          chicken.energy -= bullet.damage;
        }
        colliding = true;
      }



    });

    return colliding;
  }

  checkCollidingStarshipWithChicken(chicken: Chicken, starShip: StarShip): boolean {
    if (
      chicken.pos.x + chicken.width > starShip.pos.x &&
      chicken.pos.x < starShip.pos.x + starShip.width &&
      chicken.pos.y < starShip.pos.y + starShip.height &&
      chicken.pos.y + chicken.height > starShip.pos.y
    ) {
      return true;
    }
    return false;
  }

  checkCollidingStarshipWithChickens(chickens: Chicken[], starShip: StarShip): boolean {
    let colliding = false;
    chickens.forEach((chicken, i) => {
      if(this.checkCollidingStarshipWithChicken(chicken, starShip)) {
        chickens.splice(i, 1);
        if(starShip.heart === 0) {
          colliding = true;
        }
        else {
          starShip.level -= 1;
        }
      }
    })
    return colliding;
  }

  checkCollidingItem(item: ItemSupport, starShip: StarShip): boolean {
    let isConflicking = false;
    if(
      item.pos.x + item.width > starShip.pos.x &&
      item.pos.x < starShip.pos.x + starShip.width &&
      item.pos.y + item.height > starShip.pos.y &&
      item.pos.y < starShip.pos.y + starShip.height
      )
    {
      item.changeDirectionWhenConfict();
      if(item.typeGift < 6) {
        this.typeNumberItem = item.typeGift;
      }
      
      isConflicking = true;
    }
    return isConflicking;
  }


}