
import { BulletModel } from "~/model/Bullet.model";
import { PADDLE_WIDTH } from "~/setup";
import { Bullet } from "~/services/Bullet";

import { ItemSupport } from "~/services/Item";
import { ItemModel } from "~/model/Item.model";
import GIFT_BOX01 from '/images/gift-fire.png';
import { randomIntFromInterval } from "~/extensions/helper";
import { Vector } from "~/model/types";
import { IStrategy } from "~/interface/Stategy.interface";

export class Nomaltrategy implements IStrategy {
  public doChangeInfoBullet(data: BulletModel, pos: Vector): Bullet {
    const nomalBullet: BulletModel = data
    const bullet = new Bullet(
      nomalBullet.speed, nomalBullet.size, 
      {x: pos.x + (PADDLE_WIDTH/2 - nomalBullet.size/2),
       y: pos.y}, 
       nomalBullet.image, randomIntFromInterval(nomalBullet.damage, nomalBullet.damage + 2)  , 1);

    return bullet;
  }
  public doChangeTypeItem(data: ItemModel, pos: Vector): ItemSupport {
    const fireItem: ItemModel = {
      speed: data.speed,
      size: data.size,
      image: GIFT_BOX01,
      type: data.type
    }
    const item = new ItemSupport(
      fireItem.speed, fireItem.size,
      {x: pos.x, y: pos.y}, 
      fireItem.image, fireItem.type.Id);
    return item;
  }
}