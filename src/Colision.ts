import { Chicken } from "./services/Chicken";
import { StarShip } from "./services/StarShip";
import { Bullet } from "./services/Bullet";
import { CanvasView } from "./view/CanvasView";
import { ItemSupport } from "./services/Item";


import { ItemModel } from "./model/Item.model";
import { Egg } from "./services/Egg";
import { SingletonStarShip } from "./design/singleton/SingletonStarShip";
import { EazyMode } from "./design/factory/basic-mode/BasicModeEazy";
import { MediumMode } from "./design/factory/basic-mode/BasicModeMedium";
import { HardMode } from "./design/factory/basic-mode/BasicModeHard";
import { ChallengesMode } from "./design/factory/advance-mode/AdvanceModeChallenges";
import { SuperHardMode } from "./design/factory/advance-mode/AdvanceModeSuperHard";
import { getItemSupport, getRandomInt } from "./extensions/helper.extension";
import { Nuke } from "./services/Nuke";
export class Collision {

  gifts: ItemSupport[] = [];
  eggs: Egg[] = []
  timeImmortal: number = 1000;
  typeNumberItem!: number;
  countMeat: number = 0;
  countCoin: number = 0;
  countNuke: number = 0;

  get typeItem():number {
    return this.typeNumberItem;
  }
  checkStarshipColliding(chickens: Chicken[], starShip: SingletonStarShip): boolean {
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
  isCollidingChicken(bullet: Bullet, chicken: EazyMode | MediumMode | HardMode | ChallengesMode | SuperHardMode): boolean {

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
  isCollidingNuke(nuke: Nuke, chicken: EazyMode | MediumMode | HardMode | ChallengesMode | SuperHardMode):boolean {
    if (
      nuke.pos.x < chicken.pos.x + chicken.width && 
      nuke.pos.x + nuke.width > chicken.pos.x &&
      nuke.pos.y < chicken.pos.y + chicken.height &&
      nuke.pos.y + nuke.height > chicken.pos.y
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
    
  }

  isCollidingNukes(nuke: Nuke, chickens: EazyMode[] | MediumMode[] | HardMode[] | ChallengesMode[] | SuperHardMode[]):boolean {
    let colliding = false;
    chickens.forEach((chicken, i) => { 
      if(this.isCollidingNuke(nuke, chicken)) {
        nuke.changeDirectionWhenConfict();
        if (chicken.energy <= 0) {
          const randomNumber = getRandomInt(10);
          if(randomNumber > 5) {
            const gift = getItemSupport(chicken.pos.x, chicken.pos.y);           
            //console.log(gift.typeGift);
            this.gifts.push(gift);
          }
         
        } 
        chickens.splice(i, 1);
        colliding = true;
      }
     
    })
    return colliding;;
  }
  // Check bullet collision with chicken
  isCollidingChickens(bullet: Bullet, chickens: EazyMode[] | MediumMode[] | HardMode[] | ChallengesMode[] | SuperHardMode[]): boolean {
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
        } 
        else {
          if(chicken.energy < bullet.damage) chicken.energy = 0;
          else chicken.energy -= bullet.damage;
        }
        colliding = true;
      }



    });

    return colliding;
  }

  checkCollidingStarshipWithChicken(chicken: EazyMode | MediumMode | HardMode | ChallengesMode | SuperHardMode, starShip: SingletonStarShip): boolean {
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

  checkCollidingStarshipWithChickens(chickens: EazyMode[] | MediumMode[] | HardMode[] | ChallengesMode[] | SuperHardMode[], starShip: SingletonStarShip): boolean {
    let colliding = false;

    chickens.forEach((chicken, i) => {
      if(this.checkCollidingStarshipWithChicken(chicken, starShip)) {
        chickens.splice(i, 1);
        starShip.pos.x = 450;
        starShip.pos.y = 515;

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
  checkCollidingEgg(egg: Egg, starShip: SingletonStarShip): void {
    if(
      egg.pos.x + egg.width > starShip.pos.x &&
      egg.pos.x < starShip.pos.x + starShip.width &&
      egg.pos.y + egg.height > starShip.pos.y &&
      egg.pos.y < starShip.pos.y + starShip.height
      ) 
      {
        starShip.pos.x = 450;
        starShip.pos.y = 515;
        egg.changeDirectionWhenConfict();
        starShip.level--;
      }
  }
  checkCollidingItem(item: ItemSupport, starShip: SingletonStarShip): boolean {
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
      else if (item.typeGift === 9){
        starShip.level++;
      }
      else if (item.typeGift === 10) {
        this.countCoin++;
      }
      else if(item.typeGift === 6) {
        this.countMeat++;
        starShip.score += 2;
      }
      else if(item.typeGift === 8) {
        this.countMeat += 5;
        starShip.score += 5*2;
      }
      else if(item.typeGift === 7) {
        this.countMeat += 3;
        starShip.score += 3*2;
      }
      
      if(this.countMeat > 20) {
        this.countNuke++;
        this.countMeat -= 20;
      }
      
      
      isConflicking = true;
    }
    return isConflicking;
  }


}