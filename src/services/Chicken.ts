import { Vector } from "~/types";

export class Chicken {
  private brickImage: HTMLImageElement = new Image();
  constructor(
    private brickWidth: number,
    private brickHeight: number,
    private postion: Vector,
    private brickEnergy: number,
    image: string
    ) 
    {
      this.brickWidth = brickWidth;
      this.brickHeight = brickHeight;
      this.postion = postion;
      this.brickEnergy = brickEnergy;
      this.brickImage.src = image;
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
    return this.brickImage;
  }

  get energy(): number {
    return this.brickEnergy;
  }

  set energy(energy: number) {
    this.brickEnergy = energy;
  }
}
