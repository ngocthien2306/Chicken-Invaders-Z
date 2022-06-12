import { Vector } from "~/model/types";

export class ItemSupport {
  private speed: Vector;
  private itemImage: HTMLImageElement = new Image();
  typeItem: number;
  constructor(speed: number, private itemSize: number, private position: Vector, image: string, typeItem: number) {
    this.itemSize = itemSize;
    this.position = position;
    this.speed = {
      x: speed,
      y: -speed
    }
    this.itemImage.src = image;
    this.typeItem = typeItem;
  }
  get typeGift(): number {
    return this.typeItem;
  }
  get width(): number {
    return this.itemSize;
  }
  get height(): number {
    return this.itemSize;  
  }

  get pos(): Vector {
    return this.position;
  }

  get image(): HTMLImageElement { 
    return this.itemImage;
  }
  changeYDirection(): void {
    this.speed.y = -this.speed.y;
  }
  changeXDirection(): void {
    this.speed.x = -this.speed.x;
  }

  changeDirectionWhenConfict(): void {
    this.pos.y = -100;
    this.pos.x = -100;
  }

  moveItemSupport(): void {
    //console.log(this.pos.x, this.pos.y);
    //this.pos.x += this.speed.x;
    this.pos.y -= this.speed.y;
  }


}