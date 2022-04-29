import { Chicken } from "~/sprites/Chicken";
import { Bullet } from "~/sprites/Bullet";
import { StarShip } from "~/sprites/StarShip";

export class CanvasView {
  canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private scoreDisplay: HTMLObjectElement | null;
  private start: HTMLObjectElement | null;
  private info: HTMLObjectElement | null;

  constructor(canvasName: string) {
    this.canvas = document.querySelector(canvasName) as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');
    this.scoreDisplay = document.querySelector('#score');
    this.start = document.querySelector('#start');
    this.info = document.querySelector('#info');
  }

  clear():void {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  initStartButton(startFunction: (view: CanvasView) => void ):void {
    this.start?.addEventListener('click', () => startFunction(this));
  }

  drawScore(score: number): void {
    if(this.scoreDisplay) this.scoreDisplay.innerHTML = score.toString();
  }

  drawInfo(txt: string): void {
    if(this.info) this.info.innerHTML = txt;
  }

  drawSprite(frame: Chicken | StarShip | Bullet): void {
    if(!frame) return;
    this.context?.drawImage(
      frame.image,
      frame.pos.x,
      frame.pos.y,
      frame.width,
      frame.height
    );
  }

  drawChicken(chickens: Chicken[]): void {
    chickens.forEach(chicken => this.drawSprite(chicken))
  }
  drawBullet(bullet: Bullet, starShip: StarShip): void {
    //console.log(starShip.pos.x, starShip.pos.y)
    if(!bullet) return;
    this.context?.drawImage(
      bullet.image,
      (bullet.pos.x),
      (bullet.pos.y),
      bullet.width,
      bullet.height
    );
  }
}