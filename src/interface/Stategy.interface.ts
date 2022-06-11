import { BulletModel } from "~/model/Bullet.model";
import { ItemModel } from "~/model/Item.model";
import { Bullet } from "~/services/Bullet";
import { ItemSupport } from "~/services/Item";
import { Vector } from "~/types";


export interface IStrategy {
    doChangeInfoBullet(data: BulletModel, pos: Vector): Bullet;
    doChangeTypeItem(data: ItemModel, pos: Vector): ItemSupport;
  }