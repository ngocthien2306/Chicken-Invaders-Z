// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"view/CanvasView.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasView = void 0;

var CanvasView =
/** @class */
function () {
  function CanvasView(canvasName) {
    this.canvas = document.querySelector(canvasName);
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

  CanvasView.prototype.clear = function () {
    var _a;

    (_a = this.context) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  CanvasView.prototype.initStartButton = function (startFunction) {
    var _this = this;

    var _a;

    (_a = this.start) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
      return startFunction(_this);
    });
  };

  CanvasView.prototype.drawScore = function (score) {
    if (this.scoreDisplay) this.scoreDisplay.innerHTML = score;
  };

  CanvasView.prototype.drawInfo = function (txt) {
    if (this.info) this.info.innerHTML = txt;
  };

  CanvasView.prototype.drawHeart = function (txt) {
    if (this.heart) this.heart.innerHTML = txt;
  };

  CanvasView.prototype.drawMeat = function (txt) {
    if (this.meat) this.meat.innerHTML = txt;
  };

  CanvasView.prototype.drawCoin = function (txt) {
    if (this.coin) this.coin.innerHTML = txt;
  };

  CanvasView.prototype.drawGift = function (txt) {
    if (this.gift) this.gift.src = txt;
  };

  CanvasView.prototype.drawHP = function (txt) {
    if (this.hp) this.hp.innerHTML = txt;
  };

  CanvasView.prototype.drawSprite = function (frame) {
    var _a;

    if (!frame) return;
    (_a = this.context) === null || _a === void 0 ? void 0 : _a.drawImage(frame.image, frame.pos.x, frame.pos.y, frame.width, frame.height);
  };

  CanvasView.prototype.drawChicken = function (chickens) {
    var _this = this;

    chickens.forEach(function (chicken) {
      _this.drawSprite(chicken);

      chicken.changeYDirection();
    });
  };

  CanvasView.prototype.drawBullet = function (bullet, starShip) {
    var _a; //console.log(starShip.pos.x, starShip.pos.y)


    if (!bullet) return;
    (_a = this.context) === null || _a === void 0 ? void 0 : _a.drawImage(bullet.image, bullet.pos.x, bullet.pos.y, bullet.width, bullet.height);
  };

  return CanvasView;
}();

exports.CanvasView = CanvasView;
},{}],"design/strategy/context.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Context = void 0;

var Context =
/** @class */
function () {
  function Context(strategy) {
    this.strategy = strategy;
  }

  Context.prototype.setStrategy = function (strategy) {
    this.strategy = strategy;
  };

  Context.prototype.doBusinessLogicBullet = function (data, pos) {
    return this.strategy.doChangeInfoBullet(data, pos);
  };

  Context.prototype.doBusinessLogicItem = function (data, pos) {
    return this.strategy.doChangeTypeItem(data, pos);
  };

  return Context;
}();

exports.Context = Context;
},{}],"images/chick.png":[function(require,module,exports) {
module.exports = "/chick.d75d671a.png";
},{}],"images/chicken_blue.png":[function(require,module,exports) {
module.exports = "/chicken_blue.ef8857b3.png";
},{}],"images/chicken_red.png":[function(require,module,exports) {
module.exports = "/chicken_red.0b95f595.png";
},{}],"images/chicken05.png":[function(require,module,exports) {
module.exports = "/chicken05.b6f2901a.png";
},{}],"images/chicken06.png":[function(require,module,exports) {
module.exports = "/chicken06.2e9b5305.png";
},{}],"setup.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LEVEL18 = exports.LEVEL17 = exports.LEVEL16 = exports.LEVEL15 = exports.LEVEL14 = exports.LEVEL13 = exports.LEVEL12 = exports.LEVEL11 = exports.LEVEL10 = exports.LEVEL9 = exports.LEVEL8 = exports.LEVEL7 = exports.LEVEL6 = exports.LEVEL5 = exports.LEVEL4 = exports.LEVEL3 = exports.LEVEL2 = exports.LEVEL1 = exports.CHICKEN_ENERGY = exports.CHICKEN_IMAGES = exports.BALL_STARTY = exports.BALL_STARTX = exports.BALL_SIZE = exports.BALL_SPEED = exports.PADDLE_SPEED = exports.PADDLE_STARTX = exports.PADDLE_HEIGHT = exports.PADDLE_WIDTH = exports.BRICK_HEIGHT = exports.BRICK_WIDTH = exports.BRICK_PADDING = exports.STAGE_COLS = exports.STAGE_ROWS = exports.STAGE_PADDING = void 0;

var _chick = _interopRequireDefault(require("./images/chick.png"));

var _chicken_blue = _interopRequireDefault(require("./images/chicken_blue.png"));

var _chicken_red = _interopRequireDefault(require("./images/chicken_red.png"));

var _chicken = _interopRequireDefault(require("./images/chicken05.png"));

var _chicken2 = _interopRequireDefault(require("./images/chicken06.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Grab the canvas element for calculating the brick width
// depending on canvas width
var canvas = document.querySelector('#playField'); // Constants

var STAGE_PADDING = 10;
exports.STAGE_PADDING = STAGE_PADDING;
var STAGE_ROWS = 10;
exports.STAGE_ROWS = STAGE_ROWS;
var STAGE_COLS = 15;
exports.STAGE_COLS = STAGE_COLS;
var BRICK_PADDING = 5;
exports.BRICK_PADDING = BRICK_PADDING;
var BRICK_WIDTH = canvas ? Math.floor((canvas.width - STAGE_PADDING * 2) / STAGE_COLS) - BRICK_PADDING : 1000 / 15;
exports.BRICK_WIDTH = BRICK_WIDTH;
var BRICK_HEIGHT = canvas ? Math.floor((canvas.height - STAGE_PADDING * 2) / STAGE_ROWS) - BRICK_PADDING : 600 / 10;
exports.BRICK_HEIGHT = BRICK_HEIGHT;
var PADDLE_WIDTH = 90;
exports.PADDLE_WIDTH = PADDLE_WIDTH;
var PADDLE_HEIGHT = 80;
exports.PADDLE_HEIGHT = PADDLE_HEIGHT;
var PADDLE_STARTX = 450;
exports.PADDLE_STARTX = PADDLE_STARTX;
var PADDLE_SPEED = 12;
exports.PADDLE_SPEED = PADDLE_SPEED;
var BALL_SPEED = 10;
exports.BALL_SPEED = BALL_SPEED;
var BALL_SIZE = 20;
exports.BALL_SIZE = BALL_SIZE;
var BALL_STARTX = 500;
exports.BALL_STARTX = BALL_STARTX;
var BALL_STARTY = 500;
exports.BALL_STARTY = BALL_STARTY;
var CHICKEN_IMAGES = {
  1: _chick.default,
  2: _chicken_red.default,
  3: _chicken_blue.default,
  4: _chicken.default,
  5: _chicken2.default,
  6: _chicken.default,
  7: _chicken2.default
};
exports.CHICKEN_IMAGES = CHICKEN_IMAGES;
var CHICKEN_ENERGY = {
  1: 2,
  2: 2,
  3: 6,
  4: 8,
  5: 10,
  6: 1000,
  7: 1400
}; // prettier-ignore

exports.CHICKEN_ENERGY = CHICKEN_ENERGY;
var LEVEL1 = [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 1, 0, 0, 0, 0, 1, 1, 5, 5, 5, 5, 4, 4, 4, 4, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]; // prettier-ignore

exports.LEVEL1 = LEVEL1;
var LEVEL2 = [0, 0, 0, 0, 6, 0, 0, 0];
exports.LEVEL2 = LEVEL2;
var LEVEL3 = [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0];
exports.LEVEL3 = LEVEL3;
var LEVEL4 = [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0];
exports.LEVEL4 = LEVEL4;
var LEVEL5 = [0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0];
exports.LEVEL5 = LEVEL5;
var LEVEL6 = [0, 0, 0, 0, 7, 0, 0, 0, 0];
exports.LEVEL6 = LEVEL6;
var LEVEL7 = [0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0];
exports.LEVEL7 = LEVEL7;
var LEVEL8 = [0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0];
exports.LEVEL8 = LEVEL8;
var LEVEL9 = [0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0];
exports.LEVEL9 = LEVEL9;
var LEVEL10 = [0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0];
exports.LEVEL10 = LEVEL10;
var LEVEL11 = [0, 0, 6, 0, 0, 0, 7, 0, 0];
exports.LEVEL11 = LEVEL11;
var LEVEL12 = [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0];
exports.LEVEL12 = LEVEL12;
var LEVEL13 = [0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0];
exports.LEVEL13 = LEVEL13;
var LEVEL14 = [0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0];
exports.LEVEL14 = LEVEL14;
var LEVEL15 = [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0];
exports.LEVEL15 = LEVEL15;
var LEVEL16 = [0, 0, 6, 0, 6, 0, 7, 0, 0];
exports.LEVEL16 = LEVEL16;
var LEVEL17 = [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0];
exports.LEVEL17 = LEVEL17;
var LEVEL18 = [6, 0, 6, 0, 0, 0, 7, 0, 7]; // export const LEVEL = [
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

exports.LEVEL18 = LEVEL18;
},{"./images/chick.png":"images/chick.png","./images/chicken_blue.png":"images/chicken_blue.png","./images/chicken_red.png":"images/chicken_red.png","./images/chicken05.png":"images/chicken05.png","./images/chicken06.png":"images/chicken06.png"}],"services/Chicken.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chicken = void 0;

var Chicken =
/** @class */
function () {
  function Chicken(speed, chickenWidth, chickenHeight, postion, chickenEnergy, image) {
    this.chickenWidth = chickenWidth;
    this.chickenHeight = chickenHeight;
    this.postion = postion;
    this.chickenEnergy = chickenEnergy;
    this.chickenImage = new Image();
    this.count = 0;
    this.speed = {
      x: speed,
      y: -speed
    };
    this.chickenWidth = chickenWidth;
    this.chickenHeight = chickenHeight;
    this.postion = postion;
    this.chickenEnergy = chickenEnergy;
    this.chickenImage.src = image;
  }

  Object.defineProperty(Chicken.prototype, "countMove", {
    get: function get() {
      return this.count;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Chicken.prototype, "width", {
    get: function get() {
      return this.chickenWidth;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Chicken.prototype, "height", {
    get: function get() {
      return this.chickenHeight;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Chicken.prototype, "pos", {
    get: function get() {
      return this.postion;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Chicken.prototype, "image", {
    get: function get() {
      return this.chickenImage;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Chicken.prototype, "energy", {
    get: function get() {
      return this.chickenEnergy;
    },
    set: function set(energy) {
      this.chickenEnergy = energy;
    },
    enumerable: false,
    configurable: true
  });

  Chicken.prototype.changeYDirection = function () {
    this.speed.y = this.speed.y;
  };

  Chicken.prototype.moveChicken = function (view) {
    if (this.pos.x < 0 || this.pos.x + this.width > view.canvas.width) {
      this.speed.x = -this.speed.x;
    }

    if (this.pos.y < 0 || this.pos.y + this.height > view.canvas.height / 1.5) {
      this.speed.y = -this.speed.y;
    }

    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
  };

  return Chicken;
}();

exports.Chicken = Chicken;
},{}],"images/gift-fire.png":[function(require,module,exports) {
module.exports = "/gift-fire.1e49a58f.png";
},{}],"images/meat01.png":[function(require,module,exports) {
module.exports = "/meat01.5d124be7.png";
},{}],"images/meat02.png":[function(require,module,exports) {
module.exports = "/meat02.5509b4ad.png";
},{}],"images/meat03.png":[function(require,module,exports) {
module.exports = "/meat03.be1648b6.png";
},{}],"images/heart.png":[function(require,module,exports) {
module.exports = "/heart.054550bc.png";
},{}],"images/coin.png":[function(require,module,exports) {
module.exports = "/coin.f3955474.png";
},{}],"images/egg.png":[function(require,module,exports) {
module.exports = "/egg.dc5a7ece.png";
},{}],"services/Item.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemSupport = void 0;

var ItemSupport =
/** @class */
function () {
  function ItemSupport(speed, itemSize, position, image, typeItem) {
    this.itemSize = itemSize;
    this.position = position;
    this.itemImage = new Image();
    this.itemSize = itemSize;
    this.position = position;
    this.speed = {
      x: speed,
      y: -speed
    };
    this.itemImage.src = image;
    this.typeItem = typeItem;
  }

  Object.defineProperty(ItemSupport.prototype, "typeGift", {
    get: function get() {
      return this.typeItem;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(ItemSupport.prototype, "width", {
    get: function get() {
      return this.itemSize;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(ItemSupport.prototype, "height", {
    get: function get() {
      return this.itemSize;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(ItemSupport.prototype, "pos", {
    get: function get() {
      return this.position;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(ItemSupport.prototype, "image", {
    get: function get() {
      return this.itemImage;
    },
    enumerable: false,
    configurable: true
  });

  ItemSupport.prototype.changeYDirection = function () {
    this.speed.y = -this.speed.y;
  };

  ItemSupport.prototype.changeXDirection = function () {
    this.speed.x = -this.speed.x;
  };

  ItemSupport.prototype.changeDirectionWhenConfict = function () {
    this.pos.y = -100;
    this.pos.x = -100;
  };

  ItemSupport.prototype.moveItemSupport = function () {
    //console.log(this.pos.x, this.pos.y);
    //this.pos.x += this.speed.x;
    this.pos.y -= this.speed.y;
  };

  return ItemSupport;
}();

exports.ItemSupport = ItemSupport;
},{}],"images/gift-blue.png":[function(require,module,exports) {
module.exports = "/gift-blue.8e15de08.png";
},{}],"images/ice-bullet.png":[function(require,module,exports) {
module.exports = "/ice-bullet.e1f97bcf.png";
},{}],"design/strategy/IceStrategy.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IceStrategy = void 0;

var _setup = require("~/setup");

var _Bullet = require("~/services/Bullet");

var _Item = require("~/services/Item");

var _giftBlue = _interopRequireDefault(require("/images/gift-blue.png"));

var _iceBullet = _interopRequireDefault(require("/images/ice-bullet.png"));

var _helper = require("~/extensions/helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IceStrategy =
/** @class */
function () {
  function IceStrategy() {}

  IceStrategy.prototype.doChangeInfoBullet = function (data, pos) {
    var iceBullet = {
      speed: data.speed + 5,
      size: data.size + 5,
      image: _iceBullet.default,
      damage: (0, _helper.randomIntFromInterval)(data.damage + 1, data.damage + 3)
    };
    var bullet = new _Bullet.Bullet(iceBullet.speed, iceBullet.size, {
      x: pos.x + (_setup.PADDLE_WIDTH / 2 - iceBullet.size / 2),
      y: pos.y
    }, iceBullet.image, iceBullet.damage, 3);
    return bullet;
  };

  IceStrategy.prototype.doChangeTypeItem = function (data, pos) {
    var fireItem = {
      speed: data.speed,
      size: data.size - 10,
      image: _giftBlue.default,
      type: data.type
    };
    var item = new _Item.ItemSupport(fireItem.speed, fireItem.size, {
      x: pos.x,
      y: pos.y
    }, fireItem.image, fireItem.type.Id);
    return item;
  };

  return IceStrategy;
}();

exports.IceStrategy = IceStrategy;
},{"~/setup":"setup.ts","~/services/Bullet":"services/Bullet.ts","~/services/Item":"services/Item.ts","/images/gift-blue.png":"images/gift-blue.png","/images/ice-bullet.png":"images/ice-bullet.png","~/extensions/helper":"extensions/helper.ts"}],"images/gift-light.png":[function(require,module,exports) {
module.exports = "/gift-light.86b4c05e.png";
},{}],"images/light-bullet.png":[function(require,module,exports) {
module.exports = "/light-bullet.74632b9f.png";
},{}],"design/strategy/LightningStrategy.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LightStrategy = void 0;

var _setup = require("~/setup");

var _Bullet = require("~/services/Bullet");

var _Item = require("~/services/Item");

var _giftLight = _interopRequireDefault(require("/images/gift-light.png"));

var _lightBullet = _interopRequireDefault(require("/images/light-bullet.png"));

var _helper = require("~/extensions/helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LightStrategy =
/** @class */
function () {
  function LightStrategy() {}

  LightStrategy.prototype.doChangeInfoBullet = function (data, pos) {
    var lightBullet = {
      speed: data.speed + 6,
      size: data.size + 7,
      image: _lightBullet.default,
      damage: (0, _helper.randomIntFromInterval)(data.damage - 1, data.damage + 1)
    };
    var bullet = new _Bullet.Bullet(lightBullet.speed, lightBullet.size, {
      x: pos.x + (_setup.PADDLE_WIDTH / 2 - lightBullet.size / 2),
      y: pos.y
    }, lightBullet.image, lightBullet.damage, 15);
    return bullet;
  };

  LightStrategy.prototype.doChangeTypeItem = function (data, pos) {
    var fireItem = {
      speed: data.speed,
      size: data.size - 10,
      image: _giftLight.default,
      type: data.type
    };
    var item = new _Item.ItemSupport(fireItem.speed, fireItem.size, {
      x: pos.x,
      y: pos.y
    }, fireItem.image, fireItem.type.Id);
    return item;
  };

  return LightStrategy;
}();

exports.LightStrategy = LightStrategy;
},{"~/setup":"setup.ts","~/services/Bullet":"services/Bullet.ts","~/services/Item":"services/Item.ts","/images/gift-light.png":"images/gift-light.png","/images/light-bullet.png":"images/light-bullet.png","~/extensions/helper":"extensions/helper.ts"}],"images/green-gift.png":[function(require,module,exports) {
module.exports = "/green-gift.b4c1b835.png";
},{}],"images/leaf-bullet.png":[function(require,module,exports) {
module.exports = "/leaf-bullet.90e51652.png";
},{}],"design/strategy/LeafStrategy.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeafStrategy = void 0;

var _setup = require("~/setup");

var _Bullet = require("~/services/Bullet");

var _Item = require("~/services/Item");

var _greenGift = _interopRequireDefault(require("/images/green-gift.png"));

var _leafBullet = _interopRequireDefault(require("/images/leaf-bullet.png"));

var _helper = require("~/extensions/helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LeafStrategy =
/** @class */
function () {
  function LeafStrategy() {}

  LeafStrategy.prototype.doChangeInfoBullet = function (data, pos) {
    var lightBullet = {
      speed: data.speed + 3,
      size: data.size + 2,
      image: _leafBullet.default,
      damage: (0, _helper.randomIntFromInterval)(data.damage + 1, data.damage + 5)
    };
    var bullet = new _Bullet.Bullet(lightBullet.speed, lightBullet.size, {
      x: pos.x + (_setup.PADDLE_WIDTH / 2 - lightBullet.size / 2),
      y: pos.y
    }, lightBullet.image, lightBullet.damage, 2);
    return bullet;
  };

  LeafStrategy.prototype.doChangeTypeItem = function (data, pos) {
    var fireItem = {
      speed: data.speed,
      size: data.size,
      image: _greenGift.default,
      type: data.type
    };
    var item = new _Item.ItemSupport(fireItem.speed, fireItem.size, {
      x: pos.x,
      y: pos.y
    }, fireItem.image, fireItem.type.Id);
    return item;
  };

  return LeafStrategy;
}();

exports.LeafStrategy = LeafStrategy;
},{"~/setup":"setup.ts","~/services/Bullet":"services/Bullet.ts","~/services/Item":"services/Item.ts","/images/green-gift.png":"images/green-gift.png","/images/leaf-bullet.png":"images/leaf-bullet.png","~/extensions/helper":"extensions/helper.ts"}],"images/gift-stone.png":[function(require,module,exports) {
module.exports = "/gift-stone.fe6b45cf.png";
},{}],"images/stone-bullet.png":[function(require,module,exports) {
module.exports = "/stone-bullet.b28c8c7d.png";
},{}],"design/strategy/StoneStrategy.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoneStrategy = void 0;

var _setup = require("~/setup");

var _Bullet = require("~/services/Bullet");

var _Item = require("~/services/Item");

var _giftStone = _interopRequireDefault(require("/images/gift-stone.png"));

var _stoneBullet = _interopRequireDefault(require("/images/stone-bullet.png"));

var _helper = require("~/extensions/helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StoneStrategy =
/** @class */
function () {
  function StoneStrategy() {}

  StoneStrategy.prototype.doChangeInfoBullet = function (data, pos) {
    var iceBullet = {
      speed: data.speed + 5,
      size: data.size + 5,
      image: _stoneBullet.default,
      damage: (0, _helper.randomIntFromInterval)(data.damage, data.damage + 3)
    };
    var bullet = new _Bullet.Bullet(iceBullet.speed, iceBullet.size, {
      x: pos.x + (_setup.PADDLE_WIDTH / 2 - iceBullet.size / 2),
      y: pos.y
    }, iceBullet.image, iceBullet.damage, 1);
    return bullet;
  };

  StoneStrategy.prototype.doChangeTypeItem = function (data, pos) {
    var fireItem = {
      speed: data.speed,
      size: data.size - 10,
      image: _giftStone.default,
      type: data.type
    };
    var item = new _Item.ItemSupport(fireItem.speed, fireItem.size, {
      x: pos.x,
      y: pos.y
    }, fireItem.image, fireItem.type.Id);
    return item;
  };

  return StoneStrategy;
}();

exports.StoneStrategy = StoneStrategy;
},{"~/setup":"setup.ts","~/services/Bullet":"services/Bullet.ts","~/services/Item":"services/Item.ts","/images/gift-stone.png":"images/gift-stone.png","/images/stone-bullet.png":"images/stone-bullet.png","~/extensions/helper":"extensions/helper.ts"}],"design/strategy/ChickenMeatStrategy.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChickenMeatStrategy = void 0;

var _setup = require("~/setup");

var _Bullet = require("~/services/Bullet");

var _Item = require("~/services/Item");

var _leafBullet = _interopRequireDefault(require("/images/leaf-bullet.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChickenMeatStrategy =
/** @class */
function () {
  function ChickenMeatStrategy() {}

  ChickenMeatStrategy.prototype.doChangeInfoBullet = function (data, pos) {
    var lightBullet = {
      speed: data.speed + 5,
      size: data.size + 2,
      image: _leafBullet.default,
      damage: data.damage + 3
    };
    var bullet = new _Bullet.Bullet(lightBullet.speed, lightBullet.size, {
      x: pos.x + (_setup.PADDLE_WIDTH / 2 - lightBullet.size / 2),
      y: pos.y
    }, lightBullet.image, lightBullet.damage, 1);
    return bullet;
  };

  ChickenMeatStrategy.prototype.doChangeTypeItem = function (data, pos) {
    var fireItem = {
      speed: data.speed,
      size: data.size,
      image: data.image,
      type: data.type
    };
    var item = new _Item.ItemSupport(fireItem.speed, fireItem.size, {
      x: pos.x,
      y: pos.y
    }, fireItem.image, fireItem.type.Id);
    return item;
  };

  return ChickenMeatStrategy;
}();

exports.ChickenMeatStrategy = ChickenMeatStrategy;
},{"~/setup":"setup.ts","~/services/Bullet":"services/Bullet.ts","~/services/Item":"services/Item.ts","/images/leaf-bullet.png":"images/leaf-bullet.png"}],"design/strategy/OtherItemStrategy.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OtherItemStrategy = void 0;

var _setup = require("~/setup");

var _Bullet = require("~/services/Bullet");

var _Item = require("~/services/Item");

var _leafBullet = _interopRequireDefault(require("/images/leaf-bullet.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OtherItemStrategy =
/** @class */
function () {
  function OtherItemStrategy() {}

  OtherItemStrategy.prototype.doChangeInfoBullet = function (data, pos) {
    var lightBullet = {
      speed: data.speed + 5,
      size: data.size + 2,
      image: _leafBullet.default,
      damage: data.damage + 3
    };
    var bullet = new _Bullet.Bullet(lightBullet.speed, lightBullet.size, {
      x: pos.x + (_setup.PADDLE_WIDTH / 2 - lightBullet.size / 2),
      y: pos.y
    }, lightBullet.image, lightBullet.damage, 1);
    return bullet;
  };

  OtherItemStrategy.prototype.doChangeTypeItem = function (data, pos) {
    var fireItem = {
      speed: data.speed,
      size: data.size,
      image: data.image,
      type: data.type
    };
    var item = new _Item.ItemSupport(fireItem.speed, fireItem.size, {
      x: pos.x,
      y: pos.y
    }, fireItem.image, fireItem.type.Id);
    return item;
  };

  return OtherItemStrategy;
}();

exports.OtherItemStrategy = OtherItemStrategy;
},{"~/setup":"setup.ts","~/services/Bullet":"services/Bullet.ts","~/services/Item":"services/Item.ts","/images/leaf-bullet.png":"images/leaf-bullet.png"}],"extensions/helper.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createChickens = createChickens;
exports.sumEnergyChicken = sumEnergyChicken;
exports.hpRemaining = hpRemaining;
exports.createBoss = createBoss;
exports.createEgg = createEgg;
exports.getRandomInt = getRandomInt;
exports.randomIntFromInterval = randomIntFromInterval;
exports.getRandomSpeed = getRandomSpeed;
exports.createHeart = createHeart;
exports.changeGiftBoxesInUI = changeGiftBoxesInUI;
exports.listCategoryItem = listCategoryItem;
exports.getItemSupport = getItemSupport;

var _Chicken = require("../services/Chicken");

var _giftFire = _interopRequireDefault(require("/images/gift-fire.png"));

var _meat = _interopRequireDefault(require("/images/meat01.png"));

var _meat2 = _interopRequireDefault(require("/images/meat02.png"));

var _meat3 = _interopRequireDefault(require("/images/meat03.png"));

var _heart = _interopRequireDefault(require("/images/heart.png"));

var _coin = _interopRequireDefault(require("/images/coin.png"));

var _egg = _interopRequireDefault(require("/images/egg.png"));

var _setup = require("../setup");

var _Item = require("../services/Item");

var _context = require("~/design/strategy/context");

var _FireStrategy = require("~/design/strategy/FireStrategy");

var _IceStrategy = require("~/design/strategy/IceStrategy");

var _LightningStrategy = require("~/design/strategy/LightningStrategy");

var _LeafStrategy = require("~/design/strategy/LeafStrategy");

var _StoneStrategy = require("~/design/strategy/StoneStrategy");

var _ChickenMeatStrategy = require("~/design/strategy/ChickenMeatStrategy");

var _OtherItemStrategy = require("~/design/strategy/OtherItemStrategy");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

function createChickens(level) {
  return level.reduce(function (ack, element, i) {
    var row = Math.floor((i + 1) / _setup.STAGE_COLS);
    var col = i % _setup.STAGE_COLS;
    var x = _setup.STAGE_PADDING + col * (_setup.BRICK_WIDTH + _setup.BRICK_PADDING);
    var y = _setup.STAGE_PADDING + row * (_setup.BRICK_HEIGHT + _setup.BRICK_PADDING);
    if (element === 0) return ack;
    return __spreadArrays(ack, [new _Chicken.Chicken(0.8, _setup.BRICK_WIDTH, _setup.BRICK_HEIGHT, {
      x: x,
      y: y
    }, _setup.CHICKEN_ENERGY[element], _setup.CHICKEN_IMAGES[element])]);
  }, []);
}

function sumEnergyChicken(chickens) {
  var count = 0;
  chickens.forEach(function (c) {
    count += c.energy;
  });
  return count;
}

function hpRemaining(sumEnergy, sumEnergyRemaining) {
  var percentHp = sumEnergyRemaining / sumEnergy * 100;
  if (sumEnergyRemaining < 0) sumEnergyRemaining = 0;
  var drawString = " <div class='progress-bar progress-bar-striped bg-danger' role='progressbar' style='width: " + percentHp.toString() + "%'> </div> <spans'>" + sumEnergyRemaining.toString() + "</span> ";
  return drawString;
}

function createBoss(level) {
  return level.reduce(function (ack, element, i) {
    var row = Math.floor((i + 1) / _setup.STAGE_COLS);
    var col = i % _setup.STAGE_COLS;
    var x = _setup.STAGE_PADDING + col * (_setup.BRICK_WIDTH + _setup.BRICK_PADDING);
    var y = _setup.STAGE_PADDING + row * (_setup.BRICK_HEIGHT + _setup.BRICK_PADDING);
    if (element === 0) return ack;
    return __spreadArrays(ack, [new _Chicken.Chicken(2, 200, 220, {
      x: x,
      y: y
    }, _setup.CHICKEN_ENERGY[element], _setup.CHICKEN_IMAGES[element])]);
  }, []);
}

function createEgg(view, chicken) {
  var egg = new _Item.ItemSupport(1, 30, {
    x: chicken.pos.x,
    y: chicken.pos.y
  }, _egg.default, 1);
  view.drawSprite(egg);
  egg.moveItemSupport();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomSpeed(max) {
  var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  var ranNum = Math.floor(Math.random() * max);
  return {
    number: ranNum,
    type: plusOrMinus
  };
}

function createHeart(num) {
  var icon = "<span>" + num.toString() + "</span> " + "<i class='fa fa-heart red'></i>";
  return icon;
}

function changeGiftBoxesInUI(index) {
  var img = "/gift-normal.png";
  if (index === 1) img = "/gift-gift-fire.png";else if (index === 2) img = '/gift-blue.png';else if (index === 3) img = "/gift-light.png";else if (index === 4) img = '/green-gift.png';else if (index === 5) img = '/gift-stone.png';
  return img;
} // generate list item (gift, meat, coin,...)


function listCategoryItem() {
  var categorys = [];
  var category1 = {
    Id: 1,
    Name: "FireBullets",
    Type: "bullet"
  };
  var category2 = {
    Id: 2,
    Name: "IceBullets",
    Type: "bullet"
  };
  var category3 = {
    Id: 3,
    Name: "LightBullets",
    Type: "bullet"
  };
  var category4 = {
    Id: 4,
    Name: "LeafBullets",
    Type: "bullet"
  };
  var category5 = {
    Id: 5,
    Name: "StoneBullets",
    Type: "bullet"
  };
  var category6 = {
    Id: 6,
    Name: "ChickenThighsSmall",
    Type: "meat"
  };
  var category7 = {
    Id: 7,
    Name: "ChickenThighsMedium",
    Type: "meat"
  };
  var category8 = {
    Id: 8,
    Name: "ChickenThighsLarge",
    Type: "meat"
  };
  var category9 = {
    Id: 9,
    Name: "Heart",
    Type: "level"
  };
  var category10 = {
    Id: 10,
    Name: "Money",
    Type: "money"
  };
  var category11 = {
    Id: 11,
    Name: "Egg",
    Type: "egg"
  };
  categorys.push(category1);
  categorys.push(category2);
  categorys.push(category3);
  categorys.push(category4);
  categorys.push(category5);
  categorys.push(category6);
  categorys.push(category7);
  categorys.push(category8);
  categorys.push(category9);
  categorys.push(category10);
  categorys.push(category11);
  return categorys;
}

function getItemSupport(posX, posY) {
  var categorys = listCategoryItem(); //console.log(categorys);

  var randomNumber = getRandomInt(10);
  var vector = {
    x: posX,
    y: posY
  };
  var model = {
    speed: 1,
    size: 50,
    image: _giftFire.default,
    type: categorys[randomNumber]
  };
  var item;

  if (randomNumber === 0) {
    var context = new _context.Context(new _FireStrategy.FireStrategy());
    item = context.doBusinessLogicItem(model, vector);
  } else if (randomNumber === 1) {
    var context = new _context.Context(new _IceStrategy.IceStrategy());
    item = context.doBusinessLogicItem(model, vector);
  } else if (randomNumber === 2) {
    var context = new _context.Context(new _LightningStrategy.LightStrategy());
    item = context.doBusinessLogicItem(model, vector);
  } else if (randomNumber === 3) {
    var context = new _context.Context(new _LeafStrategy.LeafStrategy());
    item = context.doBusinessLogicItem(model, vector);
  } else if (randomNumber === 4) {
    var context = new _context.Context(new _StoneStrategy.StoneStrategy());
    item = context.doBusinessLogicItem(model, vector);
  } else if (randomNumber === 5) {
    var modelMeat = {
      speed: 1,
      size: 30,
      image: _meat.default,
      type: categorys[randomNumber]
    };
    var context = new _context.Context(new _ChickenMeatStrategy.ChickenMeatStrategy());
    item = context.doBusinessLogicItem(modelMeat, vector);
  } else if (randomNumber === 6) {
    var modelMeat = {
      speed: 1,
      size: 40,
      image: _meat2.default,
      type: categorys[randomNumber]
    };
    var context = new _context.Context(new _ChickenMeatStrategy.ChickenMeatStrategy());
    item = context.doBusinessLogicItem(modelMeat, vector);
  } else if (randomNumber === 7) {
    var modelMeat = {
      speed: 1,
      size: 60,
      image: _meat3.default,
      type: categorys[randomNumber]
    };
    var context = new _context.Context(new _ChickenMeatStrategy.ChickenMeatStrategy());
    item = context.doBusinessLogicItem(modelMeat, vector);
  } else if (randomNumber === 8) {
    var modelMeat = {
      speed: 1,
      size: 40,
      image: _heart.default,
      type: categorys[randomNumber]
    };
    var context = new _context.Context(new _OtherItemStrategy.OtherItemStrategy());
    item = context.doBusinessLogicItem(modelMeat, vector);
  } else if (randomNumber === 9) {
    var modelMeat = {
      speed: 1,
      size: 40,
      image: _coin.default,
      type: categorys[randomNumber]
    };
    var context = new _context.Context(new _OtherItemStrategy.OtherItemStrategy());
    item = context.doBusinessLogicItem(modelMeat, vector);
  } else if (randomNumber === 10) {
    var modelMeat = {
      speed: 1,
      size: 30,
      image: _egg.default,
      type: categorys[randomNumber]
    };
    var context = new _context.Context(new _OtherItemStrategy.OtherItemStrategy());
    item = context.doBusinessLogicItem(modelMeat, vector);
  }

  return item;
}
},{"../services/Chicken":"services/Chicken.ts","/images/gift-fire.png":"images/gift-fire.png","/images/meat01.png":"images/meat01.png","/images/meat02.png":"images/meat02.png","/images/meat03.png":"images/meat03.png","/images/heart.png":"images/heart.png","/images/coin.png":"images/coin.png","/images/egg.png":"images/egg.png","../setup":"setup.ts","../services/Item":"services/Item.ts","~/design/strategy/context":"design/strategy/context.ts","~/design/strategy/FireStrategy":"design/strategy/FireStrategy.ts","~/design/strategy/IceStrategy":"design/strategy/IceStrategy.ts","~/design/strategy/LightningStrategy":"design/strategy/LightningStrategy.ts","~/design/strategy/LeafStrategy":"design/strategy/LeafStrategy.ts","~/design/strategy/StoneStrategy":"design/strategy/StoneStrategy.ts","~/design/strategy/ChickenMeatStrategy":"design/strategy/ChickenMeatStrategy.ts","~/design/strategy/OtherItemStrategy":"design/strategy/OtherItemStrategy.ts"}],"services/Bullet.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bullet = void 0;

var _helper = require("~/extensions/helper");

var Bullet =
/** @class */
function () {
  function Bullet(speed, bulletSize, position, image, damage, deviation) {
    this.bulletSize = bulletSize;
    this.position = position;
    this.bulletImage = new Image();
    this.bulletSize = bulletSize;
    this.position = position;
    this.speed = {
      x: speed,
      y: -speed
    };
    this.bulletImage.src = image;
    this.shoting = false;
    this.damage = damage;
    this.deviation = deviation; //document.addEventListener('keydown', this.handleKeySpace);
  }

  Object.defineProperty(Bullet.prototype, "width", {
    // Getters
    get: function get() {
      return this.bulletSize;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Bullet.prototype, "height", {
    get: function get() {
      return this.bulletSize;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Bullet.prototype, "deviationBullet", {
    get: function get() {
      return this.deviation;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Bullet.prototype, "damageAttack", {
    get: function get() {
      return this.damage;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Bullet.prototype, "pos", {
    get: function get() {
      return this.position;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Bullet.prototype, "image", {
    get: function get() {
      return this.bulletImage;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Bullet.prototype, "isShooting", {
    get: function get() {
      return this.shoting;
    },
    enumerable: false,
    configurable: true
  }); // Methods

  Bullet.prototype.changeYDirection = function () {
    this.speed.y = -this.speed.y;
  };

  Bullet.prototype.changeYODirection = function () {
    this.pos.y = -20;
    this.pos.x = -20;
  };

  Bullet.prototype.changeXDirection = function () {
    this.speed.x = -this.speed.x;
  };

  Bullet.prototype.moveBullet = function () {
    var _a = (0, _helper.getRandomSpeed)(this.deviationBullet),
        number = _a.number,
        type = _a.type;

    if (type === 1) this.pos.x += number;else this.pos.x -= number;
    ;
    this.pos.y += this.speed.y;
  };

  Bullet.prototype.moveInitial = function () {
    this.pos.x = 0;
  };

  return Bullet;
}();

exports.Bullet = Bullet;
},{"~/extensions/helper":"extensions/helper.ts"}],"images/fire-bullet.png":[function(require,module,exports) {
module.exports = "/fire-bullet.e2b07078.png";
},{}],"design/strategy/FireStrategy.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FireStrategy = void 0;

var _setup = require("~/setup");

var _Bullet = require("~/services/Bullet");

var _Item = require("~/services/Item");

var _giftFire = _interopRequireDefault(require("/images/gift-fire.png"));

var _fireBullet = _interopRequireDefault(require("/images/fire-bullet.png"));

var _helper = require("~/extensions/helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FireStrategy =
/** @class */
function () {
  function FireStrategy() {}

  FireStrategy.prototype.doChangeInfoBullet = function (data, pos) {
    var fireBullet = {
      speed: data.speed - 4,
      size: data.size + 5,
      image: _fireBullet.default,
      damage: (0, _helper.randomIntFromInterval)(data.damage + 2, data.damage + 5)
    };
    var bullet = new _Bullet.Bullet(fireBullet.speed, fireBullet.size, {
      x: pos.x + (_setup.PADDLE_WIDTH / 2 - fireBullet.size / 2),
      y: pos.y
    }, fireBullet.image, fireBullet.damage, 3);
    return bullet;
  };

  FireStrategy.prototype.doChangeTypeItem = function (data, pos) {
    var fireItem = {
      speed: data.speed,
      size: data.size,
      image: _giftFire.default,
      type: data.type
    };
    var item = new _Item.ItemSupport(fireItem.speed, fireItem.size, {
      x: pos.x,
      y: pos.y
    }, fireItem.image, fireItem.type.Id);
    return item;
  };

  return FireStrategy;
}();

exports.FireStrategy = FireStrategy;
},{"~/setup":"setup.ts","~/services/Bullet":"services/Bullet.ts","~/services/Item":"services/Item.ts","/images/gift-fire.png":"images/gift-fire.png","/images/fire-bullet.png":"images/fire-bullet.png","~/extensions/helper":"extensions/helper.ts"}],"design/strategy/NomalStrategy.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Nomaltrategy = void 0;

var _setup = require("~/setup");

var _Bullet = require("~/services/Bullet");

var _Item = require("~/services/Item");

var _giftFire = _interopRequireDefault(require("/images/gift-fire.png"));

var _helper = require("~/extensions/helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Nomaltrategy =
/** @class */
function () {
  function Nomaltrategy() {}

  Nomaltrategy.prototype.doChangeInfoBullet = function (data, pos) {
    var nomalBullet = data;
    var bullet = new _Bullet.Bullet(nomalBullet.speed, nomalBullet.size, {
      x: pos.x + (_setup.PADDLE_WIDTH / 2 - nomalBullet.size / 2),
      y: pos.y
    }, nomalBullet.image, (0, _helper.randomIntFromInterval)(nomalBullet.damage, nomalBullet.damage + 2), 1);
    return bullet;
  };

  Nomaltrategy.prototype.doChangeTypeItem = function (data, pos) {
    var fireItem = {
      speed: data.speed,
      size: data.size,
      image: _giftFire.default,
      type: data.type
    };
    var item = new _Item.ItemSupport(fireItem.speed, fireItem.size, {
      x: pos.x,
      y: pos.y
    }, fireItem.image, fireItem.type.Id);
    return item;
  };

  return Nomaltrategy;
}();

exports.Nomaltrategy = Nomaltrategy;
},{"~/setup":"setup.ts","~/services/Bullet":"services/Bullet.ts","~/services/Item":"services/Item.ts","/images/gift-fire.png":"images/gift-fire.png","~/extensions/helper":"extensions/helper.ts"}],"images/ball.png":[function(require,module,exports) {
module.exports = "/ball.96931fde.png";
},{}],"services/StarShip.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StarShip = void 0;

var _context = require("~/design/strategy/context");

var _FireStrategy = require("~/design/strategy/FireStrategy");

var _IceStrategy = require("~/design/strategy/IceStrategy");

var _LeafStrategy = require("~/design/strategy/LeafStrategy");

var _LightningStrategy = require("~/design/strategy/LightningStrategy");

var _NomalStrategy = require("~/design/strategy/NomalStrategy");

var _StoneStrategy = require("~/design/strategy/StoneStrategy");

var _setup = require("~/setup");

var _ball = _interopRequireDefault(require("/images/ball.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StarShip =
/** @class */
function () {
  function StarShip(speed, paddleWidth, paddleHeight, position, image, level, typeBullet) {
    var _this = this;

    this.speed = speed;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.position = position;
    this.paddleImage = new Image();
    this.bullets = [];

    this.handleKeyLeft = function (e) {
      switch (e.key) {
        case 'a':
          _this.moveLeft = false;
          break;

        case 'd':
          _this.moveRight = false;
          break;

        case 'w':
          _this.moveDown = false;
          break;

        case 's':
          _this.moveUp = false;
          break;

        case 'j':
          _this.shooting = false;
          break;

        default:
          break;
      }
    };

    this.handleKeyRight = function (e) {
      switch (e.key) {
        case 'a':
          _this.moveLeft = true;
          break;

        case 'd':
          _this.moveRight = true;
          break;

        case 'w':
          _this.moveDown = true;
          break;

        case 's':
          _this.moveUp = true;
          break;

        case 'j':
          _this.StrategyBullet();

          _this.shooting = true;
          break;

        default:
          break;
      }
    };

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
    this.typeBullet = typeBullet; // Event Listeners

    document.addEventListener('keydown', this.handleKeyRight);
    document.addEventListener('keyup', this.handleKeyLeft);
  }

  Object.defineProperty(StarShip.prototype, "width", {
    // Getters
    get: function get() {
      return this.paddleWidth;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StarShip.prototype, "height", {
    get: function get() {
      return this.paddleHeight;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StarShip.prototype, "pos", {
    get: function get() {
      return this.position;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StarShip.prototype, "typeOfBullet", {
    get: function get() {
      return this.typeBullet;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StarShip.prototype, "image", {
    get: function get() {
      return this.paddleImage;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StarShip.prototype, "isMovingLeft", {
    get: function get() {
      return this.moveLeft;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StarShip.prototype, "isMovingRight", {
    get: function get() {
      return this.moveRight;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StarShip.prototype, "isShooting", {
    get: function get() {
      return this.moveRight;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StarShip.prototype, "heart", {
    get: function get() {
      return this.level;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StarShip.prototype, "isMovingUp", {
    get: function get() {
      return this.moveUp;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StarShip.prototype, "isMovingDown", {
    get: function get() {
      return this.moveDown;
    },
    enumerable: false,
    configurable: true
  });

  StarShip.prototype.moveStarShip = function () {
    if (this.moveLeft) this.pos.x -= this.speed;
    if (this.moveRight) this.pos.x += this.speed;
    if (this.moveDown) this.pos.y -= this.speed;
    if (this.moveUp) this.pos.y += this.speed;
  };

  StarShip.prototype.StrategyBullet = function () {
    var bulletModel = {
      speed: _setup.BALL_SPEED,
      size: _setup.BALL_SIZE,
      image: _ball.default,
      damage: 1
    };
    var bullet;
    var pos = {
      x: this.pos.x,
      y: this.pos.y
    };

    if (this.typeOfBullet === -1) {
      var context = new _context.Context(new _NomalStrategy.Nomaltrategy());
      bullet = context.doBusinessLogicBullet(bulletModel, pos);
    } else if (this.typeOfBullet === 1) {
      var context = new _context.Context(new _FireStrategy.FireStrategy());
      bullet = context.doBusinessLogicBullet(bulletModel, pos);
    } else if (this.typeOfBullet === 2) {
      var context = new _context.Context(new _IceStrategy.IceStrategy());
      bullet = context.doBusinessLogicBullet(bulletModel, pos);
    } else if (this.typeOfBullet === 3) {
      var context = new _context.Context(new _LightningStrategy.LightStrategy());
      bullet = context.doBusinessLogicBullet(bulletModel, pos);
    } else if (this.typeOfBullet === 4) {
      var context = new _context.Context(new _LeafStrategy.LeafStrategy());
      bullet = context.doBusinessLogicBullet(bulletModel, pos);
    } else if (this.typeOfBullet === 5) {
      var context = new _context.Context(new _StoneStrategy.StoneStrategy());
      bullet = context.doBusinessLogicBullet(bulletModel, pos);
    } else if (typeof this.typeOfBullet === 'undefined') {
      var context = new _context.Context(new _NomalStrategy.Nomaltrategy());
      bullet = context.doBusinessLogicBullet(bulletModel, pos);
    } //console.log(this.typeOfBullet);


    this.bullets.push(bullet);
    return this.bullets;
  };

  return StarShip;
}();

exports.StarShip = StarShip;
},{"~/design/strategy/context":"design/strategy/context.ts","~/design/strategy/FireStrategy":"design/strategy/FireStrategy.ts","~/design/strategy/IceStrategy":"design/strategy/IceStrategy.ts","~/design/strategy/LeafStrategy":"design/strategy/LeafStrategy.ts","~/design/strategy/LightningStrategy":"design/strategy/LightningStrategy.ts","~/design/strategy/NomalStrategy":"design/strategy/NomalStrategy.ts","~/design/strategy/StoneStrategy":"design/strategy/StoneStrategy.ts","~/setup":"setup.ts","/images/ball.png":"images/ball.png"}],"Colision.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collision = void 0;

var _helper = require("./extensions/helper");

var Collision =
/** @class */
function () {
  function Collision() {
    this.gifts = [];
    this.eggs = [];
    this.timeImmortal = 1000;
    this.countMeat = 0;
    this.countCoin = 0;
  }

  Object.defineProperty(Collision.prototype, "typeItem", {
    get: function get() {
      return this.typeNumberItem;
    },
    enumerable: false,
    configurable: true
  });

  Collision.prototype.checkStarshipColliding = function (chickens, starShip) {
    var colliding = false;
    chickens.forEach(function (chicken, i) {
      if (starShip.pos.x + starShip.width > chicken.pos.x && starShip.pos.x < chicken.pos.x + chicken.width && starShip.pos.y + starShip.height === chicken.pos.y) {
        colliding = true;
      }
    });
    return colliding;
  };

  Collision.prototype.isCollidingChicken = function (bullet, chicken) {
    if (bullet.pos.x < chicken.pos.x + chicken.width && bullet.pos.x + bullet.width > chicken.pos.x && bullet.pos.y < chicken.pos.y + chicken.height && bullet.pos.y + bullet.height > chicken.pos.y) {
      return true;
    }

    return false;
  };

  Collision.prototype.isChickenConfictWall = function (chicken, view) {
    if (chicken.pos.x > view.canvas.width - chicken.width || chicken.pos.x < 0) {
      //console.log(chicken.pos.x);
      return true;
    }

    return false;
  };

  Collision.prototype.isChickenConfictWalls = function (chickens, view) {}; // Check bullet collision with chicken


  Collision.prototype.isCollidingChickens = function (bullet, chickens) {
    var _this = this;

    var colliding = false;
    chickens.forEach(function (chicken, i) {
      if (_this.isCollidingChicken(bullet, chicken)) {
        bullet.changeYODirection(); //console.log(chicken.energy);
        //chicken.energy -= bullet.damage;

        if (chicken.energy <= 0) {
          var randomNumber = (0, _helper.getRandomInt)(10);

          if (randomNumber > 5) {
            var gift = (0, _helper.getItemSupport)(chicken.pos.x, chicken.pos.y); //console.log(gift.typeGift);

            _this.gifts.push(gift);
          }

          chickens.splice(i, 1);
        } else {
          if (chicken.energy < bullet.damage) chicken.energy = 0;else chicken.energy -= bullet.damage;
        }

        colliding = true;
      }
    });
    return colliding;
  };

  Collision.prototype.checkCollidingStarshipWithChicken = function (chicken, starShip) {
    if (chicken.pos.x + chicken.width > starShip.pos.x && chicken.pos.x < starShip.pos.x + starShip.width && chicken.pos.y < starShip.pos.y + starShip.height && chicken.pos.y + chicken.height > starShip.pos.y) {
      return true;
    }

    return false;
  };

  Collision.prototype.checkCollidingStarshipWithChickens = function (chickens, starShip) {
    var _this = this;

    var colliding = false;
    chickens.forEach(function (chicken, i) {
      if (_this.checkCollidingStarshipWithChicken(chicken, starShip)) {
        chickens.splice(i, 1);
        starShip.pos.x = 450;
        starShip.pos.y = 515;

        if (starShip.heart === 0) {
          colliding = true;
        } else {
          starShip.level -= 1;
        }
      }
    });
    return colliding;
  };

  Collision.prototype.checkCollidingEgg = function (egg, starShip) {
    if (egg.pos.x + egg.width > starShip.pos.x && egg.pos.x < starShip.pos.x + starShip.width && egg.pos.y + egg.height > starShip.pos.y && egg.pos.y < starShip.pos.y + starShip.height) {
      starShip.pos.x = 450;
      starShip.pos.y = 515;
      egg.changeDirectionWhenConfict();
      starShip.level--;
    }
  };

  Collision.prototype.checkCollidingItem = function (item, starShip) {
    var isConflicking = false;

    if (item.pos.x + item.width > starShip.pos.x && item.pos.x < starShip.pos.x + starShip.width && item.pos.y + item.height > starShip.pos.y && item.pos.y < starShip.pos.y + starShip.height) {
      item.changeDirectionWhenConfict();

      if (item.typeGift < 6) {
        this.typeNumberItem = item.typeGift;
      } else if (item.typeGift === 9) {
        starShip.level++;
      } else if (item.typeGift === 10) {
        this.countCoin++;
      } else if (item.typeGift === 6) {
        this.countMeat++;
      } else if (item.typeGift === 8) {
        this.countMeat += 5;
      } else if (item.typeGift === 7) {
        this.countMeat += 3;
      }

      isConflicking = true;
    }

    return isConflicking;
  };

  return Collision;
}();

exports.Collision = Collision;
},{"./extensions/helper":"extensions/helper.ts"}],"images/spaceship.png":[function(require,module,exports) {
module.exports = "/spaceship.d28724db.png";
},{}],"services/Egg.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Egg = void 0;

var Egg =
/** @class */
function () {
  function Egg(speed, eggWidth, eggHeight, postion, image) {
    this.eggWidth = eggWidth;
    this.eggHeight = eggHeight;
    this.postion = postion;
    this.eggImage = new Image();
    this.speed = {
      x: speed,
      y: -speed
    };
    this.eggWidth = eggWidth;
    this.eggHeight = eggHeight;
    this.postion = postion;
    this.eggImage.src = image;
  }

  Object.defineProperty(Egg.prototype, "width", {
    get: function get() {
      return this.eggWidth;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Egg.prototype, "height", {
    get: function get() {
      return this.eggHeight;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Egg.prototype, "pos", {
    get: function get() {
      return this.postion;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Egg.prototype, "image", {
    get: function get() {
      return this.eggImage;
    },
    enumerable: false,
    configurable: true
  });

  Egg.prototype.moveEgg = function () {
    this.pos.y -= this.speed.y;
    this.pos.x -= this.speed.x / 2;
  };

  Egg.prototype.changeDirectionWhenConfict = function () {
    this.pos.y = -100;
    this.pos.x = -100;
  };

  return Egg;
}();

exports.Egg = Egg;
},{}],"extensions/move.extensions.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moveStarShip = moveStarShip;
exports.shootingBullet = shootingBullet;
exports.drawAndMoveGift = drawAndMoveGift;
exports.drawAndMoveEgg = drawAndMoveEgg;
exports.drawAndMoveChicken = drawAndMoveChicken;

var _Egg = require("~/services/Egg");

var _helper = require("./helper");

var _egg = _interopRequireDefault(require("/images/egg.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var score = 0;

function moveStarShip(starShip, view) {
  if (starShip.isMovingLeft && starShip.pos.x > 0 || starShip.isMovingRight && starShip.pos.x < view.canvas.width - starShip.width || starShip.isMovingDown && starShip.pos.y > 0 || starShip.isMovingUp && starShip.pos.y < view.canvas.height - starShip.height) {
    starShip.moveStarShip();
  }
}

function shootingBullet(starShip, view, conlision, chickens) {
  starShip.bullets.forEach(function (b) {
    view.drawSprite(b);
    b.moveBullet();
    var collidingChicken = conlision.isCollidingChickens(b, chickens);

    if (collidingChicken) {
      score += b.damage;
      view.drawScore("Score: " + score.toString());
    }
  });
}

function drawAndMoveGift(conlision, view, starShip) {
  conlision.gifts.forEach(function (g) {
    view.drawSprite(g);
    g.moveItemSupport();
    var conflicking = conlision.checkCollidingItem(g, starShip);

    if (conflicking) {
      starShip.typeBullet = conlision.typeItem; //view.drawGift(changeGiftBoxesInUI(conlision.typeItem));
    }
  });
}

function drawAndMoveEgg(starShip, conlision, chickens, view) {
  var number = (0, _helper.getRandomInt)(150);

  if (number === 50) {
    var index = (0, _helper.getRandomInt)(chickens.length);
    conlision.eggs.push(new _Egg.Egg(1, 30, 30, {
      x: chickens[index].pos.x,
      y: chickens[index].pos.y
    }, _egg.default));
  }

  conlision.eggs.forEach(function (e) {
    view.drawSprite(e);
    e.moveEgg();
    conlision.checkCollidingEgg(e, starShip);
  });
}

function drawAndMoveChicken(chickens, view) {
  chickens.forEach(function (chicken, i) {
    chicken.moveChicken(view);
    view.drawSprite(chicken);
  });
}
},{"~/services/Egg":"services/Egg.ts","./helper":"extensions/helper.ts","/images/egg.png":"images/egg.png"}],"design/singleton/SingletonStarShip.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingletonStarShip = void 0;

var _setup = require("~/setup");

var _context = require("../strategy/context");

var _FireStrategy = require("../strategy/FireStrategy");

var _IceStrategy = require("../strategy/IceStrategy");

var _LeafStrategy = require("../strategy/LeafStrategy");

var _LightningStrategy = require("../strategy/LightningStrategy");

var _NomalStrategy = require("../strategy/NomalStrategy");

var _StoneStrategy = require("../strategy/StoneStrategy");

var _spaceship = _interopRequireDefault(require("/images/spaceship.png"));

var _ball = _interopRequireDefault(require("/images/ball.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SingletonStarShip =
/** @class */
function () {
  function SingletonStarShip(speed, paddleWidth, paddleHeight, position, image, level, typeBullet) {
    var _this = this;

    this.speed = speed;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.position = position;
    this.bullets = [];
    this.paddleImage = new Image();

    this.handleKeyLeft = function (e) {
      switch (e.key) {
        case 'a':
          _this.moveLeft = false;
          break;

        case 'd':
          _this.moveRight = false;
          break;

        case 'w':
          _this.moveDown = false;
          break;

        case 's':
          _this.moveUp = false;
          break;

        case 'j':
          _this.shooting = false;
          break;

        default:
          break;
      }
    };

    this.handleKeyRight = function (e) {
      switch (e.key) {
        case 'a':
          _this.moveLeft = true;
          break;

        case 'd':
          _this.moveRight = true;
          break;

        case 'w':
          _this.moveDown = true;
          break;

        case 's':
          _this.moveUp = true;
          break;

        case 'j':
          _this.StrategyBullet();

          _this.shooting = true;
          break;

        default:
          break;
      }
    };

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
    this.typeBullet = typeBullet; // Event Listeners

    document.addEventListener('keydown', this.handleKeyRight);
    document.addEventListener('keyup', this.handleKeyLeft);
  }

  SingletonStarShip.getInstance = function (view) {
    if (!SingletonStarShip.instance) {
      SingletonStarShip.instance = new SingletonStarShip(_setup.PADDLE_SPEED, _setup.PADDLE_WIDTH, _setup.PADDLE_HEIGHT, {
        x: _setup.PADDLE_STARTX,
        y: view.canvas.height - _setup.PADDLE_HEIGHT - 5
      }, _spaceship.default, 3, -1);
    }

    return SingletonStarShip.instance;
  };

  Object.defineProperty(SingletonStarShip.prototype, "width", {
    // Getters
    get: function get() {
      return this.paddleWidth;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SingletonStarShip.prototype, "height", {
    get: function get() {
      return this.paddleHeight;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SingletonStarShip.prototype, "pos", {
    get: function get() {
      return this.position;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SingletonStarShip.prototype, "typeOfBullet", {
    get: function get() {
      return this.typeBullet;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SingletonStarShip.prototype, "image", {
    get: function get() {
      return this.paddleImage;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SingletonStarShip.prototype, "isMovingLeft", {
    get: function get() {
      return this.moveLeft;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SingletonStarShip.prototype, "isMovingRight", {
    get: function get() {
      return this.moveRight;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SingletonStarShip.prototype, "isShooting", {
    get: function get() {
      return this.moveRight;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SingletonStarShip.prototype, "heart", {
    get: function get() {
      return this.level;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SingletonStarShip.prototype, "isMovingUp", {
    get: function get() {
      return this.moveUp;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SingletonStarShip.prototype, "isMovingDown", {
    get: function get() {
      return this.moveDown;
    },
    enumerable: false,
    configurable: true
  });

  SingletonStarShip.prototype.moveStarShip = function () {
    if (this.moveLeft) this.pos.x -= this.speed;
    if (this.moveRight) this.pos.x += this.speed;
    if (this.moveDown) this.pos.y -= this.speed;
    if (this.moveUp) this.pos.y += this.speed;
  };

  SingletonStarShip.prototype.StrategyBullet = function () {
    var bulletModel = {
      speed: _setup.BALL_SPEED,
      size: _setup.BALL_SIZE,
      image: _ball.default,
      damage: 1
    };
    var bullet;
    var pos = {
      x: this.pos.x,
      y: this.pos.y
    };

    if (this.typeOfBullet === -1) {
      var context = new _context.Context(new _NomalStrategy.Nomaltrategy());
      bullet = context.doBusinessLogicBullet(bulletModel, pos);
    } else if (this.typeOfBullet === 1) {
      var context = new _context.Context(new _FireStrategy.FireStrategy());
      bullet = context.doBusinessLogicBullet(bulletModel, pos);
    } else if (this.typeOfBullet === 2) {
      var context = new _context.Context(new _IceStrategy.IceStrategy());
      bullet = context.doBusinessLogicBullet(bulletModel, pos);
    } else if (this.typeOfBullet === 3) {
      var context = new _context.Context(new _LightningStrategy.LightStrategy());
      bullet = context.doBusinessLogicBullet(bulletModel, pos);
    } else if (this.typeOfBullet === 4) {
      var context = new _context.Context(new _LeafStrategy.LeafStrategy());
      bullet = context.doBusinessLogicBullet(bulletModel, pos);
    } else if (this.typeOfBullet === 5) {
      var context = new _context.Context(new _StoneStrategy.StoneStrategy());
      bullet = context.doBusinessLogicBullet(bulletModel, pos);
    } else if (typeof this.typeOfBullet === 'undefined') {
      var context = new _context.Context(new _NomalStrategy.Nomaltrategy());
      bullet = context.doBusinessLogicBullet(bulletModel, pos);
    } //console.log(this.typeOfBullet);


    this.bullets.push(bullet);
    return this.bullets;
  };

  return SingletonStarShip;
}();

exports.SingletonStarShip = SingletonStarShip;
},{"~/setup":"setup.ts","../strategy/context":"design/strategy/context.ts","../strategy/FireStrategy":"design/strategy/FireStrategy.ts","../strategy/IceStrategy":"design/strategy/IceStrategy.ts","../strategy/LeafStrategy":"design/strategy/LeafStrategy.ts","../strategy/LightningStrategy":"design/strategy/LightningStrategy.ts","../strategy/NomalStrategy":"design/strategy/NomalStrategy.ts","../strategy/StoneStrategy":"design/strategy/StoneStrategy.ts","/images/spaceship.png":"images/spaceship.png","/images/ball.png":"images/ball.png"}],"index.ts":[function(require,module,exports) {
"use strict";

var _CanvasView = require("./view/CanvasView");

var _StarShip = require("./services/StarShip");

var _Colision = require("./Colision");

var _spaceship = _interopRequireDefault(require("/images/spaceship.png"));

var _setup = require("./setup");

var _helper = require("./extensions/helper");

var _move = require("./extensions/move.extensions");

var _SingletonStarShip = require("./design/singleton/SingletonStarShip");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Image
// Level and colors
var score = 0;
var gameOver = false;
var sumEnergy = 0;

function setGameOver(view) {
  view.drawInfo("Game Over!");
  gameOver = false;
}

function setGameWin(view) {
  view.drawInfo("Game Won!");
}

function gameLoop(view, chickens, starShip, conlision) {
  view.clear();
  (0, _move.drawAndMoveChicken)(chickens, view);
  (0, _move.drawAndMoveEgg)(starShip, conlision, chickens, view);
  (0, _move.moveStarShip)(starShip, view);
  (0, _move.shootingBullet)(starShip, view, conlision, chickens);
  (0, _move.drawAndMoveGift)(conlision, view, starShip);
  view.drawSprite(starShip);
  view.drawHeart((0, _helper.createHeart)(starShip.heart));
  view.drawMeat(conlision.countMeat.toString());
  view.drawCoin(conlision.countCoin.toString());
  view.drawHP((0, _helper.hpRemaining)(sumEnergy, (0, _helper.sumEnergyChicken)(chickens)));
  if (starShip.level === 0) return setGameOver(view);
  if (conlision.checkCollidingStarshipWithChickens(chickens, starShip)) return setGameOver(view);

  if (chickens.length === 0) {
    chickens = (0, _helper.createBoss)(_setup.LEVEL2);
    sumEnergy = (0, _helper.sumEnergyChicken)(chickens);
    view.drawChicken(chickens);
  }

  if (gameOver) return setGameOver(view);
  requestAnimationFrame(function () {
    return gameLoop(view, chickens, starShip, conlision);
  });
}

function startGame(view) {
  score = 0;
  view.drawInfo('');
  view.drawScore("Score: 0");
  var collision = new _Colision.Collision();
  var chickens = (0, _helper.createChickens)(_setup.LEVEL1);
  sumEnergy = (0, _helper.sumEnergyChicken)(chickens);

  var startShip = _SingletonStarShip.SingletonStarShip.getInstance(view);

  var startShip1 = new _StarShip.StarShip(_setup.PADDLE_SPEED, _setup.PADDLE_WIDTH, _setup.PADDLE_HEIGHT, {
    x: _setup.PADDLE_STARTX,
    y: view.canvas.height - _setup.PADDLE_HEIGHT - 5
  }, _spaceship.default, 3, -1);
  gameLoop(view, chickens, startShip, collision);
}

var view = new _CanvasView.CanvasView("#playField");
view.initStartButton(startGame);
},{"./view/CanvasView":"view/CanvasView.ts","./services/StarShip":"services/StarShip.ts","./Colision":"Colision.ts","/images/spaceship.png":"images/spaceship.png","./setup":"setup.ts","./extensions/helper":"extensions/helper.ts","./extensions/move.extensions":"extensions/move.extensions.ts","./design/singleton/SingletonStarShip":"design/singleton/SingletonStarShip.ts"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52538" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map