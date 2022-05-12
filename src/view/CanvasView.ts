import { Chicken } from "~/services/Chicken";
import { Bullet } from "~/services/Bullet";
import { StarShip } from "~/services/StarShip";
import { ItemSupport } from "~/services/Item";
import { Egg } from "~/services/Egg";

export class CanvasView {
  canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private scoreDisplay: HTMLObjectElement | null;
  private start: HTMLObjectElement | null;
  private info: HTMLObjectElement | null;
  private heart: HTMLObjectElement | null;
  private meat: HTMLObjectElement | null;
  private coin: HTMLObjectElement | null;
  private gift: HTMLImageElement | null;
  private hp: HTMLObjectElement | null;


  constructor(canvasName: string) {
    this.canvas = document.querySelector(canvasName) as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');
    this.scoreDisplay = document.querySelector('#score');
    this.start = document.querySelector('#start');
    this.info = document.querySelector('#info');
    this.heart = document.querySelector('#heart1');
    this.meat = document.querySelector("#meat");
    this.coin = document.querySelector("#coin");
    this.gift = document.querySelector("#img-gift");
    this.hp = document.querySelector("#progress");
  }

  clear():void {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  initStartButton(startFunction: (view: CanvasView) => void ):void {
    this.start?.addEventListener('click', () => startFunction(this));
  }

  drawScore(score: string): void {
    if(this.scoreDisplay) this.scoreDisplay.innerHTML = score;
  }

  drawInfo(txt: string): void {
    if(this.info) this.info.innerHTML = txt;
  }
  drawHeart(txt: string): void {
    if(this.heart) this.heart.innerHTML = txt;
  }

  drawMeat(txt: string): void {
    if(this.meat) this.meat.innerHTML = txt;
  }

  drawCoin(txt: string): void {
    if(this.coin) this.coin.innerHTML = txt;
  }

  drawGift(txt: string): void {
    if(this.gift) this.gift.src = txt;
  }

  drawHP(txt: string): void {
    if(this.hp) this.hp.innerHTML = txt;
  }

  drawSprite(frame: Chicken | StarShip | Bullet | ItemSupport | Egg): void {
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
    chickens.forEach(chicken => {
      this.drawSprite(chicken)
      chicken.changeYDirection();
    })
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