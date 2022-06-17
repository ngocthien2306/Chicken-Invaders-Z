import { Vector } from "~/types";

export class Nuke {
    private nukeImage: HTMLImageElement = new Image();
    private speed: Vector;
    constructor(
        speed: number,
        private nukeWidth: number,
        private nukeHeight: number,
        private position: Vector,
        image: string
    ) {
        this.speed = {
            x: speed,
            y: -speed,
        };
        this.nukeWidth = nukeWidth;
        this.nukeHeight = nukeHeight;
        this.position = position;
        this.nukeImage.src = image;
    }
    get width(): number {
        return this.nukeWidth;
      }
    
      get height(): number {
        return this.nukeHeight;
      }
    
      get pos(): Vector {
        return this.position;
      }
    
      get image(): HTMLImageElement { 
        return this.nukeImage;
      }
      moveNuke(): void {
        this.pos.y += this.speed.y;
        this.pos.x += this.speed.x/2;
      }
      changeDirectionWhenConfict(): void {
        this.pos.y = -100;
        this.pos.x = -100;
      }

}