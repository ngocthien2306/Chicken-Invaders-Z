import { CategoryModel, ItemModel } from './model/Item.model';
import { Chicken } from './services/Chicken';
import GIFT_FIRE from '/images/gift-fire.png';
import MEAT_SMALL from '/images/meat01.png';
import MEAT_MEDIUM from '/images/meat02.png';
import MEAT_LARGE from '/images/meat03.png';
import HEART from '/images/heart.png';
import COIN from '/images/coin.png';
import {
  BRICK_IMAGES,
  STAGE_COLS,
  STAGE_PADDING,
  BRICK_WIDTH,
  BRICK_HEIGHT,
  BRICK_PADDING,
  BRICK_ENERGY,
  LEVEL1
} from './setup';
import { ItemSupport } from './services/Item';
import { Vector } from './types';
import { Context } from './strategy/context';
import { FireStrategy } from './strategy/FireStrategy';
import { IceStrategy } from './strategy/IceStrategy';
import { LightStrategy } from './strategy/LightningStrategy';
import { LeafStrategy } from './strategy/LeafStrategy';
import { StoneStrategy } from './strategy/StoneStrategy';
import { ChickenMeatStrategy } from './strategy/ChickenMeatStrategy';

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
        1,
        BRICK_WIDTH,
        BRICK_HEIGHT,
        { x, y },
        BRICK_ENERGY[element],
        BRICK_IMAGES[element],
        
      )
    ];
  }, [] as Chicken[]);
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
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
    const context = new Context(new ChickenMeatStrategy());
    item = context.doBusinessLogicItem(modelMeat, vector);
  }
  else if(randomNumber === 9) {
    const modelMeat: ItemModel = {
      speed: 1,
      size: 40, 
      image: COIN,
      type: categorys[randomNumber]
    }
    const context = new Context(new ChickenMeatStrategy());
    item = context.doBusinessLogicItem(modelMeat, vector);
  }
  
  return item;
}