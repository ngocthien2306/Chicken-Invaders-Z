
import { IStrategy } from "~/interface/Stategy.interface";
import { BulletModel } from "~/model/Bullet.model";
import { ItemModel } from "~/model/Item.model";
import { Bullet } from "~/services/Bullet";
import { ItemSupport } from "~/services/Item";
import { StarShip } from "~/services/StarShip";
import { Vector } from "~/types";

export class Context {

  private strategy: IStrategy;


  constructor(strategy: IStrategy) {
      this.strategy = strategy;
  }


  public setStrategy(strategy: IStrategy) {
      this.strategy = strategy;
  }


  public doBusinessLogicBullet(data: BulletModel, pos: Vector): Bullet {
    return this.strategy.doChangeInfoBullet(data, pos);
  }

  doBusinessLogicItem(data: ItemModel, pos: Vector): ItemSupport {
    return this.strategy.doChangeTypeItem(data, pos);
  }

}