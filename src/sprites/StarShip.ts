import { BulletModel } from "~/model/Bullet.model";
import { BALL_SIZE, BALL_SPEED, BALL_STARTX, BALL_STARTY, PADDLE_WIDTH } from "~/setup";
import { Context } from "~/strategy/context";
import { FireBulletStrategy } from "~/strategy/FireBulletStrategy";
import { Vector } from "~/types";
import { Bullet } from "./Bullet";
import BALL_IMAGE from '/images/ball.png';
export class StarShip {
  private paddleImage: HTMLImageElement = new Image();
  private moveLeft: boolean;
  private moveRight: boolean;
  private moveUp: boolean;
  private moveDown:  boolean;
  private shooting: boolean;
  
  bullets: Bullet[] = [];
  constructor(
    private speed: number,
    private paddleWidth: number,
    private paddleHeight: number,
    private position: Vector,
    image: string
  ) {
    this.speed = speed;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.position = position;
    this.moveLeft = false;
    this.moveRight = false;
    this.moveDown = false;
    this.moveUp = false;
    this.shooting = false;
    this.paddleImage.src = image;

    // Event Listeners
    document.addEventListener('keydown', this.handleKeyRight);
    document.addEventListener('keyup', this.handleKeyLeft);
    

  }

  // Getters
  get width(): number {
    return this.paddleWidth;
  }

  get height(): number {
    return this.paddleHeight;
  }

  get pos(): Vector {
    return this.position;
  }

  get image(): HTMLImageElement {
    return this.paddleImage;
  }

  get isMovingLeft(): boolean {
    return this.moveLeft;
  }

  get isMovingRight(): boolean {
    return this.moveRight;
  }

  get isShooting(): boolean {
    return this.moveRight;
  }

  get isMovingUp(): boolean {
    return this.moveUp;
  }

  get isMovingDown(): boolean {
    return this.moveDown;
  }

  moveStarShip(): void {
    if(this.moveLeft) this.pos.x -= this.speed;
    if(this.moveRight) this.pos.x += this.speed;
    if(this.moveDown) this.pos.y -= this.speed;
    if(this.moveUp) this.pos.y += this.speed;
  }

  
  handleKeyLeft = (e: KeyboardEvent): void => {
    switch (e.key) {
      case 'a':
        this.moveLeft = false
        break;
      case 'd':
        this.moveRight = false
        break;
      case 'w':
        this.moveDown = false
        break;
      case 's':
        this.moveUp = false
        break;
      case ' ':
        this.shooting = false;
        break;
      default:
        break;
    }

  };

  handleKeyRight = (e: KeyboardEvent): void => {
    this.StrattygyBullet();
    switch (e.key) {
      case 'a':
        this.moveLeft = true
        break;
      case 'd':
        this.moveRight = true
        break;
      case 'w':
        this.moveDown = true
        break;
      case 's':
        this.moveUp = true
        break;
      case ' ':
          this.shooting = true;
          break;
      default:
          break;
    }
  };

  public StrattygyBullet(): void {
    const bulletModel: BulletModel = {
      speed: BALL_SPEED,
      size: BALL_SIZE,
      image: BALL_IMAGE,
      damage: 1
    }
    const context = new Context(new FireBulletStrategy());
    let bullet: any;
    const pos: Vector = {x: this.pos.x, y: this.pos.y};
    if(true) {
      bullet = context.doBusinessLogicBullet(bulletModel, pos);
    }
    this.bullets.push(bullet as Bullet)
  }

}