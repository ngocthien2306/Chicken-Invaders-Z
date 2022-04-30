
import { BulletModel } from "~/model/Bullet.model";
import { PADDLE_WIDTH } from "~/setup";
import { Bullet } from "~/services/Bullet";
import { Vector } from "~/types";
import { Strategy } from "./context";
import { ItemModel } from "~/model/Item.model";
import { ItemSupport } from "~/services/Item";
import GIFT_GREEN from '/images/green-gift.png';
import LEAF_BULLET from '/images/leaf-bullet.png';

export class OtherItemStrategy implements Strategy {
  public doChangeInfoBullet(data: BulletModel, pos: Vector): Bullet {
    const lightBullet: BulletModel = {
      speed: data.speed + 5,
      size: data.size + 2,
      image: LEAF_BULLET,
      damage: data.damage + 3
    };
    const bullet = new Bullet(
      lightBullet.speed, lightBullet.size, 
      {x: pos.x + (PADDLE_WIDTH/2 - lightBullet.size/2),
       y: pos.y}, 
       lightBullet.image, lightBullet.damage);
    return bullet;
  }
  
  public doChangeTypeItem(data: ItemModel, pos: Vector): ItemSupport {
    const fireItem: ItemModel = {
      speed: data.speed,
      size: data.size,
      image: data.image,
      type: data.type
    }
    const item = new ItemSupport(
      fireItem.speed, fireItem.size,
      {x: pos.x, y: pos.y}, 
      fireItem.image, fireItem.type.Id);
    return item;
  }
}