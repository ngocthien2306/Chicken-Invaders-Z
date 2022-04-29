
import { BulletModel } from "~/model/Bullet.model";
import { PADDLE_WIDTH } from "~/setup";
import { Bullet } from "~/sprites/Bullet";
import { Vector } from "~/types";
import { Strategy } from "./context";


export class FireBulletStrategy implements Strategy {
  public doDamage(data: BulletModel, pos: Vector): Bullet {
    const fireBullet: BulletModel = {
      speed: data.speed +  15,
      size: data.size - 5,
      image: data.image,
      damage: data.damage + 1
    };
    const bullet = new Bullet(
      fireBullet.speed, fireBullet.size, 
      {x: pos.x + (PADDLE_WIDTH/2 - fireBullet.size/2),
       y: pos.y}, 
       fireBullet.image, fireBullet.damage);

    return bullet;
  }
}