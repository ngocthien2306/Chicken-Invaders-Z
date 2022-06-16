import CHICK from './images/chick.png';
import BLUE_CHICKEN_IMAGE from './images/chicken_blue.png';
import RED_CHICKEN_IMAGE from './images/chicken_red.png';
import BOSS01_CHICKEN_IMAGE from './images/chicken05.png';
import BOSS02_CHICKEN_IMAGE from './images/chicken06.png';

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
  1: CHICK,
  2: RED_CHICKEN_IMAGE,
  3: BLUE_CHICKEN_IMAGE,
  4: BOSS01_CHICKEN_IMAGE,
  5: BOSS02_CHICKEN_IMAGE,
  6: BOSS01_CHICKEN_IMAGE,
  7: BOSS02_CHICKEN_IMAGE
};

export const CHICKEN_ENERGY: { [key: number]: number } = {
  1: 2, 
  2: 2, 
  3: 6, 
  4: 8, 
  5: 10,
  6: 1000,
  7: 1400
};


// prettier-ignore
export const LEVEL1 = [
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
  0, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 1, 0, 0,
  0, 0, 1, 1, 5, 5, 5, 5, 4, 4, 4, 4, 1, 0, 0,
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
];

// prettier-ignore
export const LEVEL2 = [
0, 0, 0, 0, 6, 0, 0, 0
];

export const LEVEL3 = [
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
];

export const LEVEL4 = [
  0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0,
  0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0,
  0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0,
  0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0,
  0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0,
];

export const LEVEL5 = [
  0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
  0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
  0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
  0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
  0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
];

export const LEVEL6 = [
  0, 0, 0, 0, 7, 0, 0, 0, 0,
  ];

export const LEVEL7 = [
  0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
  0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
  0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
  0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
  0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
  ];

  export const LEVEL8 = [
    0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
    0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
    0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
    0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0,
    0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
    ];
  
  export const LEVEL9 = [
    0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
    0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0,
    0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
    0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0,
    0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
    ];

  export const LEVEL10 = [
    0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
    0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0,
    0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
    0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0,
    0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
    ];

  export const LEVEL11 = [
    0, 0, 6, 0, 0, 0, 7, 0, 0,
    ];

  export const LEVEL12 = [
    0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0,
    0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0,
    0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
    0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0,
    0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0,
    ];

  export const LEVEL13 = [
    0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
    0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0,
    0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
    0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0,
    0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0,
    ];
  
  export const LEVEL14 = [
    0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
    0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0,
    0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
    0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0,
    0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0,
    ];

  export const LEVEL15 = [
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0,
    0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0,
    ];

  export const LEVEL16 = [
    0, 0, 6, 0, 6, 0, 7, 0, 0,
    ];

  export const LEVEL17 = [
    0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0,
    0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0,
    0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0,
    0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0,
    0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0,
    ]; 

  export const LEVEL18 = [
    6, 0, 6, 0, 0, 0, 7, 0, 7,
    ];

// export const LEVEL = [
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
// ];


// export const LEVEL2 = [
//   0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
//   0, 0, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 0, 0,
//   0, 0, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 0, 0,
//   0, 0, 3, 0, 4, 4, 5, 5, 5, 4, 4, 0, 3, 0, 0,
//   0, 0, 2, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2, 0, 0,
// ];


