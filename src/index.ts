import { CanvasView } from "./view/CanvasView";
import { Collision } from "./Colision";
import { LEVEL1, LEVEL17, LV, PADDLE_HEIGHT, PADDLE_STARTX, PADDLE_WIDTH } from "./setup";
import { drawAndMoveChicken, drawAndMoveEgg, drawAndMoveGift, moveStarShip, shootingBullet } from "./extensions/move.extensions";
import { SingletonStarShip } from "./design/singleton/SingletonStarShip";
import { EazyMode } from "./design/factory/basic-mode/BasicModeEazy";
import { MediumMode } from "./design/factory/basic-mode/BasicModeMedium";
import { HardMode } from "./design/factory/basic-mode/BasicModeHard";
import { ChallengesMode } from "./design/factory/advance-mode/AdvanceModeChallenges";
import { SuperHardMode } from "./design/factory/advance-mode/AdvanceModeSuperHard";
import { createHeart, hpRemaining, sumEnergyChicken } from "./extensions/helper.extension";
import { setModeGame } from "./extensions/mode.extension";
import { Nuke } from "./services/Nuke";
import ROCKET_IMAGE from '/images/rocket.png';


let score = 0;
let gameOver = false;
let sumEnergy = 0;
let count = 0;

function setGameOver(view: CanvasView) {
  view.drawInfo("Game Over!");
  gameOver = false;
}

function setGameWin(view: CanvasView) {
  view.drawInfo("Game Won!");
}

function gameLoop(view: CanvasView, chickens: EazyMode[] | MediumMode[] | HardMode[] | ChallengesMode[] | SuperHardMode[], 
    starShip: SingletonStarShip, conlision: Collision, nuke: Nuke) {
  view.clear();
 
  drawAndMoveChicken(chickens, view);
  drawAndMoveEgg(starShip, conlision, chickens, view);
  moveStarShip(starShip, view);
  shootingBullet(starShip, view, conlision, chickens);
  drawAndMoveGift(conlision, view, starShip);
  //console.log(chickens);
  view.drawSprite(starShip);
  view.drawHeart(createHeart(starShip.heart));
  view.drawMeat(conlision.countMeat.toString());
  view.drawCoin(conlision.countCoin.toString());
  view.drawNuke(conlision.countNuke.toString());

  view.drawHP(hpRemaining(sumEnergy, sumEnergyChicken(chickens)));

  if(starShip.level === 0) return setGameOver(view);
  if(conlision.checkCollidingStarshipWithChickens(chickens, starShip)) return setGameOver(view);
  if(chickens.length === 0) {
    count++;
    // chickens = createBoss(LEVEL2);
    // sumEnergy = sumEnergyChicken(chickens);
    // view.drawChicken(chickens);
    view.getBtnLv("#lv1-" + (count + 1).toString())
    view.setEnableLV();
    chickens = setModeGame(view, LV[count]);
    
    if(count == LV.length) return setGameWin(view);
  }
  if(gameOver) return setGameOver(view);

  requestAnimationFrame(() => gameLoop(view, chickens, starShip, conlision, nuke))
}


function startGame(view: CanvasView) {
  var chickens = [] as EazyMode[] | MediumMode[] | HardMode[] | ChallengesMode[] | SuperHardMode[];
  score = 0;
  view.drawInfo('');
  view.drawScore("Score: 0");
  const collision = new Collision();
  //const chickens = createChickens(LEVEL1);
  if(view.getLV() !== "0") {
    var level = parseInt(view.getLV());
    console.log(level);
    chickens = setModeGame(view, LV[level - 1])
  }
  else {
    chickens = setModeGame(view, LEVEL1)
  }
  

  sumEnergy = sumEnergyChicken(chickens as EazyMode[] | MediumMode[] | HardMode[] | ChallengesMode[] | SuperHardMode[]);
  const startShip = SingletonStarShip.getInstance(view, view.getStarShip());
  const nuke = new Nuke(5, PADDLE_WIDTH, PADDLE_HEIGHT, {x: PADDLE_STARTX, y: view.canvas.height - PADDLE_HEIGHT - 5}, ROCKET_IMAGE);
  gameLoop(view, chickens, startShip, collision, nuke);
}

const view = new CanvasView("#playField"); 
view.initStartButton(startGame)


