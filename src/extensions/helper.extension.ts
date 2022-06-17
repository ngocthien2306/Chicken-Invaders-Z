import { CategoryModel, ItemModel } from '../model/Item.model';
import { Chicken } from '../services/Chicken';
import GIFT_FIRE from '/images/gift-fire.png';
import MEAT_SMALL from '/images/meat01.png';
import MEAT_MEDIUM from '/images/meat02.png';
import MEAT_LARGE from '/images/meat03.png';
import HEART from '/images/heart.png';
import COIN from '/images/coin.png';
import EGG_IMAGE from '/images/egg.png';
import {
  CHICKEN_IMAGES,
  STAGE_COLS,
  STAGE_PADDING,
  BRICK_WIDTH,
  BRICK_HEIGHT,
  BRICK_PADDING,
  CHICKEN_ENERGY
  
} from '../setup';
import { ItemSupport } from '../services/Item';
import { Vector } from '../types';

import { CanvasView } from '../view/CanvasView';
import { Context } from '~/design/strategy/context';
import { FireStrategy } from '~/design/strategy/FireStrategy';
import { IceStrategy } from '~/design/strategy/IceStrategy';
import { LightStrategy } from '~/design/strategy/LightningStrategy';
import { LeafStrategy } from '~/design/strategy/LeafStrategy';
import { StoneStrategy } from '~/design/strategy/StoneStrategy';
import { ChickenMeatStrategy } from '~/design/strategy/ChickenMeatStrategy';
import { OtherItemStrategy } from '~/design/strategy/OtherItemStrategy';
import { EazyMode } from '~/design/factory/basic-mode/BasicModeEazy';
import { MediumMode } from '~/design/factory/basic-mode/BasicModeMedium';
import { HardMode } from '~/design/factory/basic-mode/BasicModeHard';
import { ChallengesMode } from '~/design/factory/advance-mode/AdvanceModeChallenges';
import { SuperHardMode } from '~/design/factory/advance-mode/AdvanceModeSuperHard';

export function createChickens(level: number[]): Chicken[] {

  return level.reduce((ack, element, i) => {
    const row = Math.floor((i + 1) / STAGE_COLS);
    const col = i % STAGE_COLS;

    const x = STAGE_PADDING + col * (BRICK_WIDTH + BRICK_PADDING);
    const y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);

    if (element === 0) return ack;

    return [
      ...ack,
      new Chicken(
        10,
        BRICK_WIDTH,
        BRICK_HEIGHT,
        { x, y },
        CHICKEN_ENERGY[element],
        CHICKEN_IMAGES[element],
        
      )
    ];
  }, [] as Chicken[]);
}
export function sumEnergyChicken(chickens: EazyMode[] | MediumMode[] | HardMode[] | ChallengesMode[] | SuperHardMode[]): number {
  var count = 0;
  chickens.forEach(c => {
    count += c.energy;
  });
  return count;
}
export function hpRemaining(sumEnergy: number, sumEnergyRemaining: number): string{
  var percentHp = (sumEnergyRemaining / sumEnergy) * 100;
  if(sumEnergyRemaining < 0) sumEnergyRemaining = 0;
  var drawString = " <div class='progress-bar progress-bar-striped bg-danger' role='progressbar' style='width: " + percentHp.toString() +"%'> </div> <spans'>" + sumEnergyRemaining.toString() + "</span> ";
  return drawString;
}
export function createBoss(level: number[]): Chicken[] {
  return level.reduce((ack, element, i) => {
    const row = Math.floor((i + 1) / STAGE_COLS);
    const col = i % STAGE_COLS;

    const x = STAGE_PADDING + col * (BRICK_WIDTH + BRICK_PADDING);
    const y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);

    if (element === 0) return ack;

    return [
      ...ack,
      new Chicken(
        2,
        200,
        220,
        { x, y },
        CHICKEN_ENERGY[element],
        CHICKEN_IMAGES[element],
        
      )
    ];
  }, [] as any);
}
export function createEgg(view: CanvasView, chicken: Chicken) :void {
  const egg = new ItemSupport(1, 30, {x: chicken.pos.x , y: chicken.pos.y}, EGG_IMAGE, 1);
  view.drawSprite(egg);
  egg.moveItemSupport();
}
export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
export function randomIntFromInterval(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export function getRandomSpeed(max: number): {number: number, type: number} {
  var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  var ranNum = Math.floor(Math.random()*max)
  return {number: ranNum, type:plusOrMinus}
}

export function createHeart(num: number): string {
  let icon = "<span>" + num.toString() + "</span> "  + "<i class='fa fa-heart red'></i>";
  return icon;
}

export function changeGiftBoxesInUI(index: number): string {
  let img = "/gift-normal.png";
  if(index === 1) img = "/gift-gift-fire.png"
  else if(index === 2) img = '/gift-blue.png';
  else if(index === 3) img = "/gift-light.png";
  else if(index === 4) img = '/green-gift.png';
  else if(index === 5) img = '/gift-stone.png';

  return img;
}

// generate list item (gift, meat, coin,...)
export function listCategoryItem(): CategoryModel[] {

  let categorys: CategoryModel[] = [];
  const category1: CategoryModel = {Id: 1, Name: "FireBullets", Type: "bullet"};
  const category2: CategoryModel = {Id: 2, Name: "IceBullets", Type: "bullet"};
  const category3: CategoryModel = {Id: 3, Name: "LightBullets", Type: "bullet"};
  const category4: CategoryModel = {Id: 4, Name: "LeafBullets", Type: "bullet"};
  const category5: CategoryModel = {Id: 5, Name: "StoneBullets", Type: "bullet"};

  const category6: CategoryModel = {Id: 6, Name: "ChickenThighsSmall", Type: "meat"};
  const category7: CategoryModel = {Id: 7, Name: "ChickenThighsMedium", Type: "meat"};
  const category8: CategoryModel = {Id: 8, Name: "ChickenThighsLarge", Type: "meat"};

  const category9: CategoryModel = {Id: 9, Name: "Heart", Type: "level"};
  const category10: CategoryModel = {Id: 10, Name: "Money", Type: "money"};

  const category11: CategoryModel = {Id: 11, Name: "Egg", Type: "egg"};

  categorys.push(category1);
  categorys.push(category2);
  categorys.push(category3);
  categorys.push(category4);
  categorys.push(category5);
  categorys.push(category6);
  categorys.push(category7);
  categorys.push(category8);
  categorys.push(category9);
  categorys.push(category10);
  categorys.push(category11);
  return categorys;

}

export function getItemSupport(posX: number, posY: number): ItemSupport {
  const categorys = listCategoryItem();
  //console.log(categorys);
  const randomNumber = getRandomInt(10);

  const vector: Vector = {x: posX, y: posY}
  const model: ItemModel = {
    speed: 1,
    size: 50, 
    image: GIFT_FIRE,
    type: categorys[randomNumber]
  }

  let item: any;
  if(randomNumber === 0) {
    const context = new Context(new FireStrategy());
    item = context.doBusinessLogicItem(model, vector);
  }
  else if(randomNumber === 1) {
    const context = new Context(new IceStrategy());
    item = context.doBusinessLogicItem(model, vector);
  }
  else if(randomNumber === 2) {
    const context = new Context(new LightStrategy());
    item = context.doBusinessLogicItem(model, vector);
  }
  else if(randomNumber === 3) {
    const context = new Context(new LeafStrategy());
    item = context.doBusinessLogicItem(model, vector);
  }
  else if(randomNumber === 4) {
    const context = new Context(new StoneStrategy());
    item = context.doBusinessLogicItem(model, vector);
  }
  else if(randomNumber === 5) {
    const modelMeat: ItemModel = {
      speed: 1,
      size: 30, 
      image: MEAT_SMALL,
      type: categorys[randomNumber]
    }
    const context = new Context(new ChickenMeatStrategy());
    item = context.doBusinessLogicItem(modelMeat, vector);
  }
  else if(randomNumber === 6) {
    const modelMeat: ItemModel = {
      speed: 1,
      size: 40, 
      image: MEAT_MEDIUM,
      type: categorys[randomNumber]
    }
    const context = new Context(new ChickenMeatStrategy());
    item = context.doBusinessLogicItem(modelMeat, vector);
  }
  else if(randomNumber === 7) {
    const modelMeat: ItemModel = {
      speed: 1,
      size: 60, 
      image: MEAT_LARGE,
      type: categorys[randomNumber]
    }
    const context = new Context(new ChickenMeatStrategy());
    item = context.doBusinessLogicItem(modelMeat, vector);
  }
  else if(randomNumber === 8) {
    const modelMeat: ItemModel = {
      speed: 1,
      size: 40, 
      image: HEART,
      type: categorys[randomNumber]
    }
    const context = new Context(new OtherItemStrategy());
    item = context.doBusinessLogicItem(modelMeat, vector);
  }
  else if(randomNumber === 9) {
    const modelMeat: ItemModel = {
      speed: 1,
      size: 40, 
      image: COIN,
      type: categorys[randomNumber]
    }
    const context = new Context(new OtherItemStrategy());
    item = context.doBusinessLogicItem(modelMeat, vector);
  }
  else if(randomNumber === 10) {
    const modelMeat: ItemModel = {
      speed: 1,
      size: 30, 
      image: EGG_IMAGE,
      type: categorys[randomNumber]
    }
    const context = new Context(new OtherItemStrategy());
    item = context.doBusinessLogicItem(modelMeat, vector);
  }
  return item;
}