
import { BulletModel } from "~/model/Bullet.model";
import { PADDLE_WIDTH } from "~/setup";
import { Bullet } from "~/services/Bullet";
import { Vector } from "~/types";
import { Strategy } from "./context";
import { ItemSupport } from "~/services/Item";
import { ItemModel } from "~/model/Item.model";
import GIFT_BLUE from '/images/gift-blue.png';
import ICE_BULLET from '/images/ice-bullet.png';

export class IceStrategy implements Strategy {
  public doChangeInfoBullet(data: BulletModel, pos: Vector): Bullet {
    const iceBullet: BulletModel = {
      speed: data.speed + 5,
      size: data.size + 5,
      image: ICE_BULLET,
      damage: data.damage + 1
    };
    const bullet = new Bullet(
      iceBullet.speed, iceBullet.size, 
      {x: pos.x + (PADDLE_WIDTH/2 - iceBullet.size/2),
       y: pos.y}, 
       iceBullet.image, iceBullet.damage);

    return bullet;
  }
  public doChangeTypeItem(data: ItemModel, pos: Vector): ItemSupport {
    const fireItem: ItemModel = {
      speed: data.speed,
      size: data.size-10,
      image: GIFT_BLUE,
      type: data.type
    }
    const item = new ItemSupport(
      fireItem.speed, fireItem.size,
      {x: pos.x, y: pos.y}, 
      fireItem.image, fireItem.type.Id);
    return item;
  }
}