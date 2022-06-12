import { getRandomInt, getRandomSpeed } from "~/extensions/helper";
import { Vector } from "~/model/types";

export class Bullet {
  private speed: Vector;
  damage: number;
  shoting: boolean;
  deviation: number;
  private bulletImage: HTMLImageElement = new Image();
  constructor(speed: number, private bulletSize: number, private position: Vector, image: string, damage: number, deviation: number) {
    this.bulletSize = bulletSize;
    this.position = position;
    this.speed = {
      x: speed,
      y: -speed
    } 
    this.bulletImage.src = image;
    this.shoting = false;
    this.damage = damage;
    this.deviation = deviation;
    //document.addEventListener('keydown', this.handleKeySpace);
  }

  // Getters
  get width(): number {
    return this.bulletSize;
  }

  get height(): number {
    return this.bulletSize;
  }

  get deviationBullet() :number {
    return this.deviation;
  }
  get damageAttack(): number {
    return this.damage;
  }

  get pos(): Vector {
    return this.position;
  }

  get image(): HTMLImageElement {
    return this.bulletImage;
  }
  get isShooting(): boolean {
    return this.shoting;
  }
  // Methods
  changeYDirection(): void {
    this.speed.y = -this.speed.y;
  }

  changeYODirection(): void {
    this.pos.y = -20;
    this.pos.x = -20;
  }

  changeXDirection(): void {
    this.speed.x = -this.speed.x;
  }
  moveBullet(): void {
    const {number, type} = getRandomSpeed(this.deviationBullet);
    if(type === 1)
      this.pos.x += number;
    else
      this.pos.x -= number;;
    this.pos.y += this.speed.y;
  }

  moveInitial():void {
    this.pos.x = 0;
  }

  // handleKeySpace = (e: KeyboardEvent): void => {

  //   if(e.code === 'a' || e.key === 'a') this.shoting = true;
  // }

  // drawBullet() {
  //   const bullet = new Bullet(BALL_SPEED, BALL_SIZE, {x: BALL_STARTX, y: BALL_STARTY}, BALL_IMAGE, 2)
  // }
}