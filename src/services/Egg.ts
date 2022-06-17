import { Vector } from "~/types";


export class Egg {
  private eggImage: HTMLImageElement = new Image();
  private speed: Vector;
  constructor(
    speed: number,
    private eggWidth: number,
    private eggHeight: number,
    private postion: Vector,
    image: string

  ) 
  {
    this.speed = {
      x: speed,
      y: -speed
    };
    this.eggWidth = eggWidth;
    this.eggHeight = eggHeight;
    this.postion = postion;
    this.eggImage.src = image;
  }
  get width(): number {
    return this.eggWidth;
  }

  get height(): number {
    return this.eggHeight;
  }

  get pos(): Vector {
    return this.postion;
  }

  get image(): HTMLImageElement { 
    return this.eggImage;
  }
  moveEgg(): void {
    this.pos.y -= this.speed.y;
    this.pos.x -= this.speed.x/2;
  }
  changeDirectionWhenConfict(): void {
    this.pos.y = -100;
    this.pos.x = -100;
  }
}