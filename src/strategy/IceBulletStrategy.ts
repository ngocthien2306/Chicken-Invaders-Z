import { Strategy } from "~/interface/Stategy.interface";
import { BALL_SIZE, BALL_SPEED, PADDLE_WIDTH } from "~/setup";
import { Bullet } from "~/sprites/Bullet";
import { StarShip } from "~/sprites/StarShip";
import BALL_IMAGE from '/images/ball.png';
class IceBulletStrategy implements Strategy {
  doDamage(data: Bullet, starShip: StarShip): Bullet {
    const bullet = new Bullet(BALL_SPEED, BALL_SIZE, {x: starShip.pos.x + (PADDLE_WIDTH/2 - BALL_SIZE/2), y: starShip.pos.y}, BALL_IMAGE, 10);
    return bullet;
  }
}