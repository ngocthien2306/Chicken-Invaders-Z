
import { BulletModel } from "~/model/Bullet.model";
import { PADDLE_WIDTH } from "~/setup";
import { Bullet } from "~/services/Bullet";
import { Vector } from "~/types";
import { Strategy } from "./context";
import { ItemModel } from "~/model/Item.model";
import { ItemSupport } from "~/services/Item";
import GIFT_BOX01 from '/images/gift-box01.png';

export class FireStrategy implements Strategy {
  public doChangeInfoBullet(data: BulletModel, pos: Vector): Bullet {
    const fireBullet: BulletModel = {
      speed: data.speed - 4,
      size: data.size + 5,
      image: data.image,
      damage: data.damage + 3
    };
    const bullet = new Bullet(
      fireBullet.speed, fireBullet.size, 
      {x: pos.x + (PADDLE_WIDTH/2 - fireBullet.size/2),
       y: pos.y}, 
       fireBullet.image, fireBullet.damage);
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