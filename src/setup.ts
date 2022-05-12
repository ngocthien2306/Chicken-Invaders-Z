import RED_CHICKEN_IMAGE from './images/chicken_red.png';
import BLUE_CHICKEN_IMAGE from './images/chicken_blue.png';
import GREEN_CHICKEN_IMAGE from './images/chicken_red.png';
import YELLOW_CHICKEN_IMAGE from './images/chicken_blue.png';
import PURPLE_CHICKEN_IMAGE from './images/chicken_red.png';

// Grab the canvas element for calculating the brick width
// depending on canvas width
const canvas: HTMLCanvasElement | null = document.querySelector('#playField');

// Constants
export const STAGE_PADDING = 10;
export const STAGE_ROWS = 10;
export const STAGE_COLS = 15;
export const BRICK_PADDING = 5;
export const BRICK_WIDTH = canvas
  ? Math.floor((canvas.width - STAGE_PADDING * 2) / STAGE_COLS) - BRICK_PADDING
  : (1000/15);
export const BRICK_HEIGHT = canvas
  ? Math.floor((canvas.height - STAGE_PADDING * 2) / STAGE_ROWS) - BRICK_PADDING
  : (600/10);
export const PADDLE_WIDTH = 90;
export const PADDLE_HEIGHT = 80;
export const PADDLE_STARTX = 450;
export const PADDLE_SPEED = 12;
export const BALL_SPEED = 10;
export const BALL_SIZE = 20;
export const BALL_STARTX = 500;
export const BALL_STARTY = 500;

export const CHICKEN_IMAGES: { [key: number]: string } = {
  1: RED_CHICKEN_IMAGE,
  2: GREEN_CHICKEN_IMAGE,
  3: YELLOW_CHICKEN_IMAGE,
  4: BLUE_CHICKEN_IMAGE,
  5: PURPLE_CHICKEN_IMAGE
};

export const CHICKEN_ENERGY: { [key: number]: number } = {
  1: 2, 
  2: 2, 
  3: 6, 
  4: 8, 
  5: 10 
};


// prettier-ignore
export const LEVEL1 = [
  0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0,
  0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
  0, 0, 0, 0, 4, 4, 5, 5, 5, 4, 4, 0, 0, 0, 0,
  0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0,
];

// prettier-ignore
export const LEVEL2 = [
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
  0, 0, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 0, 0,
  0, 0, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 0, 0,
  0, 0, 3, 0, 4, 4, 5, 5, 5, 4, 4, 0, 3, 0, 0,
  0, 0, 2, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2, 0, 0,
];



// export const LEVEL = [
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
// ];


