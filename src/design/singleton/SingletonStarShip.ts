import { BulletModel } from "~/model/Bullet.model";
import { Bullet } from "~/services/Bullet";
import { BALL_SIZE, BALL_SPEED, PADDLE_HEIGHT, PADDLE_SPEED, PADDLE_STARTX, PADDLE_WIDTH } from "~/setup";

import { CanvasView } from "~/view/CanvasView";
import { Context } from "../strategy/context";
import { FireStrategy } from "../strategy/FireStrategy";
import { IceStrategy } from "../strategy/IceStrategy";
import { LeafStrategy } from "../strategy/LeafStrategy";
import { LightStrategy } from "../strategy/LightningStrategy";
import { Nomaltrategy } from "../strategy/NomalStrategy";
import { StoneStrategy } from "../strategy/StoneStrategy";
import STARSHIP_IMAGE from '/images/spaceship.png';
import BALL_IMAGE from '/images/ball.png';
import { Vector } from "~/model/types";

export class SingletonStarShip {
    private static instance: SingletonStarShip;
    bullets: Bullet[] = [];
    private paddleImage: HTMLImageElement = new Image();
    private moveLeft: boolean;
    private moveRight: boolean;
    private moveUp: boolean;
    private moveDown:  boolean;
    private shooting: boolean;
    level: number;
    typeBullet: number;

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
    public static getInstance(view: CanvasView): SingletonStarShip {
        if (!SingletonStarShip.instance) {
            SingletonStarShip.instance = new SingletonStarShip(PADDLE_SPEED, PADDLE_WIDTH, PADDLE_HEIGHT, {x: PADDLE_STARTX, y: view.canvas.height - PADDLE_HEIGHT - 5}, STARSHIP_IMAGE, 3, -1);
        }

        return SingletonStarShip.instance;
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