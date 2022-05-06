import { Vector } from "~/types";

export class Chicken {
  private chickenImage: HTMLImageElement = new Image();
  private speed: Vector;
  public count: number = 0;
  constructor(
    speed: number,
    private brickWidth: number,
    private brickHeight: number,
    private postion: Vector,
    private brickEnergy: number,
    image: string

    ) 
    {
      this.speed = {
        x: speed,
        y: -speed
      };
      this.brickWidth = brickWidth;
      this.brickHeight = brickHeight;
      this.postion = postion;
      this.brickEnergy = brickEnergy;
      this.chickenImage.src = image;

    }
  
  get countMove(): number {
    return this.count;
  }

  get width(): number {
    return this.brickWidth;
  }

  get height(): number {
    return this.brickHeight;
  }

  get pos(): Vector {
    return this.postion;
  }

  get image(): HTMLImageElement { 
    return this.chickenImage;
  }

  get energy(): number {
    return this.brickEnergy;
  }

  set energy(energy: number) {
    this.brickEnergy = energy;
  }
  changeYDirection(): void {
    this.speed.y = this.speed.y;
  }
  moveDownChicken(): void {
    this.pos.x -= this.speed.x;
    //this.pos.y -= this.speed.y;
  }  
  moveUpChicken(): void {
    this.pos.x += this.speed.x;
    //this.pos.y += this.speed.y;
  }

}
