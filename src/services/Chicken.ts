
import { Vector } from "~/model/types";
import { CanvasView } from "~/view/CanvasView";
import { Egg } from "./Egg";

export class Chicken {
  private chickenImage: HTMLImageElement = new Image();
  private speed: Vector;
  public count: number = 0;

  constructor(
    speed: number,
    private chickenWidth: number,
    private chickenHeight: number,
    private postion: Vector,
    private chickenEnergy: number,
    image: string

    ) 
    {
      this.speed = {
        x: speed,
        y: -speed
      };
      this.chickenWidth = chickenWidth;
      this.chickenHeight = chickenHeight;
      this.postion = postion;
      this.chickenEnergy = chickenEnergy;
      this.chickenImage.src = image;

    }
  
  get countMove(): number {
    return this.count;
  }

  get width(): number {
    return this.chickenWidth;
  }

  get height(): number {
    return this.chickenHeight;
  }

  get pos(): Vector {
    return this.postion;
  }

  get image(): HTMLImageElement { 
    return this.chickenImage;
  }

  get energy(): number {
    return this.chickenEnergy;
  }

  set energy(energy: number) {
    this.chickenEnergy = energy;
  }
  changeYDirection(): void {
    this.speed.y = this.speed.y;
  }

  moveChicken(view: CanvasView): void {
    if(this.pos.x < 0 || (this.pos.x + this.width) > view.canvas.width) {
      this.speed.x = - this.speed.x;
    }

    if (this.pos.y < 0 || (this.pos.y + this.height) > view.canvas.height/1.5) {
      this.speed.y = - this.speed.y;
    }
    this.pos.x += this.speed.x
    this.pos.y += this.speed.y;
  }
  

}
