import { BALL_SIZE, BALL_SPEED, BALL_STARTX, BALL_STARTY } from "~/setup";
import { Vector } from "~/types";
import { CanvasView } from "~/view/CanvasView";
import BALL_IMAGE from '/images/ball.png';

export class Bullet {
  private speed: Vector;
  damage: number;
  shoting: boolean;
  private ballImage: HTMLImageElement = new Image();
  constructor(speed: number, private ballSize: number, private position: Vector, image: string, damage: number) {
    this.ballSize = ballSize;
    this.position = position;
    this.speed = {
      x: speed,
      y: -speed
    } 
    this.ballImage.src = image;
    this.shoting = false;
    this.damage = damage;
    document.addEventListener('keydown', this.handleKeySpace);
  }

  // Getters
  get width(): number {
    return this.ballSize;
  }

  get height(): number {
    return this.ballSize;
  }

  get damageAttack(): number {
    return this.damage;
  }

  get pos(): Vector {
    return this.position;
  }

  get image(): HTMLImageElement {
    return this.ballImage;
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
    //this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
  }

  moveInitial():void {
    this.pos.x = 0;
  }

  handleKeySpace = (e: KeyboardEvent): void => {

    if(e.code === 'a' || e.key === 'a') this.shoting = true;
  }

  drawBullet() {
    const bullet = new Bullet(BALL_SPEED, BALL_SIZE, {x: BALL_STARTX, y: BALL_STARTY}, BALL_IMAGE, 2)
  }
}