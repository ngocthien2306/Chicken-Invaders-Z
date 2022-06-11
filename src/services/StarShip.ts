import { Context } from "~/design/strategy/context";
import { FireStrategy } from "~/design/strategy/FireStrategy";
import { IceStrategy } from "~/design/strategy/IceStrategy";
import { LeafStrategy } from "~/design/strategy/LeafStrategy";
import { LightStrategy } from "~/design/strategy/LightningStrategy";
import { Nomaltrategy } from "~/design/strategy/NomalStrategy";
import { StoneStrategy } from "~/design/strategy/StoneStrategy";
import { BulletModel } from "~/model/Bullet.model";
import { BALL_SIZE, BALL_SPEED, BALL_STARTX, BALL_STARTY, PADDLE_WIDTH } from "~/setup";

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
  level: number;
  typeBullet: number;
  
  bullets: Bullet[] = [];
  constructor(
    private speed: number,
    private paddleWidth: number,
    private paddleHeight: number,
    private position: Vector,
    image: string,
    level: number,
    typeBullet: number
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
    this.level = level;
    this.typeBullet = typeBullet;
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

  get typeOfBullet(): number {
    return this.typeBullet;
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

  get heart(): number {
    return this.level;
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
      case 'j':
        this.shooting = false;
        break;
      default:
        break;
    }
  };

  handleKeyRight = (e: KeyboardEvent): void => {

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
      case 'j':
        this.StrategyBullet();
        this.shooting = true;
        break;
      default:
          break;
    }
  };

  public StrategyBullet(): Bullet[] {
    const bulletModel: BulletModel = {
      speed: BALL_SPEED,
      size: BALL_SIZE,
      image: BALL_IMAGE,
      damage: 1
    }

    let bullet: any;
    const pos: Vector = {x: this.pos.x, y: this.pos.y};
    
    if(this.typeOfBullet === -1) {
      const context = new Context(new Nomaltrategy());
      bullet = context.doBusinessLogicBullet(bulletModel, pos);
    }
    else if (this.typeOfBullet === 1) {
      const context = new Context(new FireStrategy());
      bullet = context.doBusinessLogicBullet(bulletModel, pos);
    }
    else if (this.typeOfBullet === 2) {
      const context = new Context(new IceStrategy());
      bullet = context.doBusinessLogicBullet(bulletModel, pos);
    }
    else if (this.typeOfBullet === 3) {
      const context = new Context(new LightStrategy());
      bullet = context.doBusinessLogicBullet(bulletModel, pos);
    }
    else if (this.typeOfBullet === 4) {
      const context = new Context(new LeafStrategy());
      bullet = context.doBusinessLogicBullet(bulletModel, pos);
    }
    else if (this.typeOfBullet === 5) {
      const context = new Context(new StoneStrategy());
      bullet = context.doBusinessLogicBullet(bulletModel, pos);
    }

    else if (typeof(this.typeOfBullet) === 'undefined') {
      const context = new Context(new Nomaltrategy());
      bullet = context.doBusinessLogicBullet(bulletModel, pos);
    }



    //console.log(this.typeOfBullet);

    this.bullets.push(bullet as Bullet)
    return this.bullets;
  }

}