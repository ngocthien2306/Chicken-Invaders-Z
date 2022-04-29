
import { BulletModel } from "~/model/Bullet.model";
import { Bullet } from "~/sprites/Bullet";
import { StarShip } from "~/sprites/StarShip";
import { Vector } from "~/types";

export interface Strategy {
  doDamage(data: BulletModel, pos: Vector): Bullet;
}
export class Context {

  private strategy: Strategy;


  constructor(strategy: Strategy) {
      this.strategy = strategy;
  }


  public setStrategy(strategy: Strategy) {
      this.strategy = strategy;
  }


  public doBusinessLogicBullet(data: BulletModel, pos: Vector): Bullet {

    return this.strategy.doDamage(data, pos);

  }
}