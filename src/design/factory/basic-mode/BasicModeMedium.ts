import { IAbstractBasicMode } from "~/interface/AbstractFactory.interface";
import { Chicken } from "~/services/Chicken";
import { Vector } from "~/types";
import { CanvasView } from "~/view/CanvasView";

export class MediumMode implements IAbstractBasicMode {
    private context: CanvasRenderingContext2D | null;
    private canvas: HTMLCanvasElement;
    private chickenImage: HTMLImageElement = new Image();
    private speed: Vector;
    public angle: number = 0;
    constructor(
        canvasName: string,
        speed: number,
        private chickenWidth: number,
        private chickenHeight: number,
        private postion: Vector,
        private chickenEnergy: number,
        image: string
        ) {
        this.canvas = document.querySelector(canvasName) as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');
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
    
    public drawChicken(): void {
      
        this.context?.drawImage(
            this.chickenImage,
            this.pos.x,
            this.pos.y,
            this.width,
            this.height 
        );
    }
    public moveChickenByCross(view: CanvasView): void {
        if(this.pos.x < 0 || (this.pos.x + this.width) > view.canvas.width) {
            this.speed.x = - this.speed.x;
          }
      
          if (this.pos.y < 0 || (this.pos.y + this.height) > view.canvas.height) {
            this.speed.y = - this.speed.y;
          }
          this.pos.x += this.speed.x
          this.pos.y += this.speed.y;
    }
}