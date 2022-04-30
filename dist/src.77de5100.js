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
    if (this.scoreDisplay) this.scoreDisplay.innerHTML = score.toString();
  };

  CanvasView.prototype.drawInfo = function (txt) {
    if (this.info) this.info.innerHTML = txt;
  };

  CanvasView.prototype.drawSprite = function (frame) {
    var _a;

    if (!frame) return;
    (_a = this.context) === null || _a === void 0 ? void 0 : _a.drawImage(frame.image, frame.pos.x, frame.pos.y, frame.width, frame.height);
  };

  CanvasView.prototype.drawChicken = function (chickens) {
    var _this = this;

    chickens.forEach(function (chicken) {
      return _this.drawSprite(chicken);
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
},{}],"images/chicken_red.png":[function(require,module,exports) {
module.exports = "/chicken_red.0b95f595.png";
},{}],"images/chicken_blue.png":[function(require,module,exports) {
module.exports = "/chicken_blue.ef8857b3.png";
},{}],"setup.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LEVEL = exports.BRICK_ENERGY = exports.BRICK_IMAGES = exports.BALL_STARTY = exports.BALL_STARTX = exports.BALL_SIZE = exports.BALL_SPEED = exports.PADDLE_SPEED = exports.PADDLE_STARTX = exports.PADDLE_HEIGHT = exports.PADDLE_WIDTH = exports.BRICK_HEIGHT = exports.BRICK_WIDTH = exports.BRICK_PADDING = exports.STAGE_COLS = exports.STAGE_ROWS = exports.STAGE_PADDING = void 0;

var _chicken_red = _interopRequireDefault(require("./images/chicken_red.png"));

var _chicken_blue = _interopRequireDefault(require("./images/chicken_blue.png"));

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
var BRICK_IMAGES = {
  1: _chicken_red.default,
  2: _chicken_red.default,
  3: _chicken_blue.default,
  4: _chicken_blue.default,
  5: _chicken_red.default
};
exports.BRICK_IMAGES = BRICK_IMAGES;
var BRICK_ENERGY = {
  1: 2,
  2: 2,
  3: 6,
  4: 8,
  5: 10 // Purple brick

}; // prettier-ignore

exports.BRICK_ENERGY = BRICK_ENERGY;
var LEVEL = [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 4, 4, 5, 5, 5, 4, 4, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0]; // export const LEVEL = [
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
// ];

exports.LEVEL = LEVEL;
},{"./images/chicken_red.png":"images/chicken_red.png","./images/chicken_blue.png":"images/chicken_blue.png"}],"strategy/context.ts":[function(require,module,exports) {
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
},{}],"services/Bullet.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bullet = void 0;

var Bullet =
/** @class */
function () {
  function Bullet(speed, bulletSize, position, image, damage) {
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
    this.damage = damage; //document.addEventListener('keydown', this.handleKeySpace);
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
    //this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
  };

  Bullet.prototype.moveInitial = function () {
    this.pos.x = 0;
  };

  return Bullet;
}();

exports.Bullet = Bullet;
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
},{}],"images/gift-fire.png":[function(require,module,exports) {
module.exports = "/gift-fire.1e49a58f.png";
},{}],"images/fire-bullet.png":[function(require,module,exports) {
module.exports = "/fire-bullet.e2b07078.png";
},{}],"strategy/FireStrategy.ts":[function(require,module,exports) {
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
      damage: data.damage + 3
    };
    var bullet = new _Bullet.Bullet(fireBullet.speed, fireBullet.size, {
      x: pos.x + (_setup.PADDLE_WIDTH / 2 - fireBullet.size / 2),
      y: pos.y
    }, fireBullet.image, fireBullet.damage);
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
},{"~/setup":"setup.ts","~/services/Bullet":"services/Bullet.ts","~/services/Item":"services/Item.ts","/images/gift-fire.png":"images/gift-fire.png","/images/fire-bullet.png":"images/fire-bullet.png"}],"images/gift-blue.png":[function(require,module,exports) {
module.exports = "/gift-blue.8e15de08.png";
},{}],"images/ice-bullet.png":[function(require,module,exports) {
module.exports = "/ice-bullet.e1f97bcf.png";
},{}],"strategy/IceStrategy.ts":[function(require,module,exports) {
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
      damage: data.damage + 1
    };
    var bullet = new _Bullet.Bullet(iceBullet.speed, iceBullet.size, {
      x: pos.x + (_setup.PADDLE_WIDTH / 2 - iceBullet.size / 2),
      y: pos.y
    }, iceBullet.image, iceBullet.damage);
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
},{"~/setup":"setup.ts","~/services/Bullet":"services/Bullet.ts","~/services/Item":"services/Item.ts","/images/gift-blue.png":"images/gift-blue.png","/images/ice-bullet.png":"images/ice-bullet.png"}],"images/green-gift.png":[function(require,module,exports) {
module.exports = "/green-gift.b4c1b835.png";
},{}],"images/leaf-bullet.png":[function(require,module,exports) {
module.exports = "/leaf-bullet.90e51652.png";
},{}],"strategy/LeafStrategy.ts":[function(require,module,exports) {
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LeafStrategy =
/** @class */
function () {
  function LeafStrategy() {}

  LeafStrategy.prototype.doChangeInfoBullet = function (data, pos) {
    var lightBullet = {
      speed: data.speed + 5,
      size: data.size + 2,
      image: _leafBullet.default,
      damage: data.damage + 3
    };
    var bullet = new _Bullet.Bullet(lightBullet.speed, lightBullet.size, {
      x: pos.x + (_setup.PADDLE_WIDTH / 2 - lightBullet.size / 2),
      y: pos.y
    }, lightBullet.image, lightBullet.damage);
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
},{"~/setup":"setup.ts","~/services/Bullet":"services/Bullet.ts","~/services/Item":"services/Item.ts","/images/green-gift.png":"images/green-gift.png","/images/leaf-bullet.png":"images/leaf-bullet.png"}],"images/gift-light.png":[function(require,module,exports) {
module.exports = "/gift-light.86b4c05e.png";
},{}],"images/light-bullet.png":[function(require,module,exports) {
module.exports = "/light-bullet.74632b9f.png";
},{}],"strategy/LightningStrategy.ts":[function(require,module,exports) {
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LightStrategy =
/** @class */
function () {
  function LightStrategy() {}

  LightStrategy.prototype.doChangeInfoBullet = function (data, pos) {
    var lightBullet = {
      speed: data.speed + 9,
      size: data.size + 7,
      image: _lightBullet.default,
      damage: data.damage + 2
    };
    var bullet = new _Bullet.Bullet(lightBullet.speed, lightBullet.size, {
      x: pos.x + (_setup.PADDLE_WIDTH / 2 - lightBullet.size / 2),
      y: pos.y
    }, lightBullet.image, lightBullet.damage);
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
},{"~/setup":"setup.ts","~/services/Bullet":"services/Bullet.ts","~/services/Item":"services/Item.ts","/images/gift-light.png":"images/gift-light.png","/images/light-bullet.png":"images/light-bullet.png"}],"strategy/NomalStrategy.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Nomaltrategy = void 0;

var _setup = require("~/setup");

var _Bullet = require("~/services/Bullet");

var _Item = require("~/services/Item");

var _giftFire = _interopRequireDefault(require("/images/gift-fire.png"));

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
    }, nomalBullet.image, nomalBullet.damage);
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
},{"~/setup":"setup.ts","~/services/Bullet":"services/Bullet.ts","~/services/Item":"services/Item.ts","/images/gift-fire.png":"images/gift-fire.png"}],"images/gift-stone.png":[function(require,module,exports) {
module.exports = "/gift-stone.fe6b45cf.png";
},{}],"images/stone-bullet.png":[function(require,module,exports) {
module.exports = "/stone-bullet.b28c8c7d.png";
},{}],"strategy/StoneStrategy.ts":[function(require,module,exports) {
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
      damage: data.damage + 1
    };
    var bullet = new _Bullet.Bullet(iceBullet.speed, iceBullet.size, {
      x: pos.x + (_setup.PADDLE_WIDTH / 2 - iceBullet.size / 2),
      y: pos.y
    }, iceBullet.image, iceBullet.damage);
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
},{"~/setup":"setup.ts","~/services/Bullet":"services/Bullet.ts","~/services/Item":"services/Item.ts","/images/gift-stone.png":"images/gift-stone.png","/images/stone-bullet.png":"images/stone-bullet.png"}],"images/ball.png":[function(require,module,exports) {
module.exports = "/ball.96931fde.png";
},{}],"services/StarShip.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StarShip = void 0;

var _setup = require("~/setup");

var _context = require("~/strategy/context");

var _FireStrategy = require("~/strategy/FireStrategy");

var _IceStrategy = require("~/strategy/IceStrategy");

var _LeafStrategy = require("~/strategy/LeafStrategy");

var _LightningStrategy = require("~/strategy/LightningStrategy");

var _NomalStrategy = require("~/strategy/NomalStrategy");

var _StoneStrategy = require("~/strategy/StoneStrategy");

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

        case ' ':
          _this.shooting = false;
          break;

        default:
          break;
      }
    };

    this.handleKeyRight = function (e) {
      _this.StrattygyBullet();

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

        case ' ':
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

  StarShip.prototype.StrattygyBullet = function () {
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
},{"~/setup":"setup.ts","~/strategy/context":"strategy/context.ts","~/strategy/FireStrategy":"strategy/FireStrategy.ts","~/strategy/IceStrategy":"strategy/IceStrategy.ts","~/strategy/LeafStrategy":"strategy/LeafStrategy.ts","~/strategy/LightningStrategy":"strategy/LightningStrategy.ts","~/strategy/NomalStrategy":"strategy/NomalStrategy.ts","~/strategy/StoneStrategy":"strategy/StoneStrategy.ts","/images/ball.png":"images/ball.png"}],"services/Chicken.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chicken = void 0;

var Chicken =
/** @class */
function () {
  function Chicken(brickWidth, brickHeight, postion, brickEnergy, image) {
    this.brickWidth = brickWidth;
    this.brickHeight = brickHeight;
    this.postion = postion;
    this.brickEnergy = brickEnergy;
    this.brickImage = new Image();
    this.brickWidth = brickWidth;
    this.brickHeight = brickHeight;
    this.postion = postion;
    this.brickEnergy = brickEnergy;
    this.brickImage.src = image;
  }

  Object.defineProperty(Chicken.prototype, "width", {
    get: function get() {
      return this.brickWidth;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Chicken.prototype, "height", {
    get: function get() {
      return this.brickHeight;
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
      return this.brickImage;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Chicken.prototype, "energy", {
    get: function get() {
      return this.brickEnergy;
    },
    set: function set(energy) {
      this.brickEnergy = energy;
    },
    enumerable: false,
    configurable: true
  });
  return Chicken;
}();

exports.Chicken = Chicken;
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
},{}],"strategy/ChickenMeatStrategy.ts":[function(require,module,exports) {
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
    }, lightBullet.image, lightBullet.damage);
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
},{"~/setup":"setup.ts","~/services/Bullet":"services/Bullet.ts","~/services/Item":"services/Item.ts","/images/leaf-bullet.png":"images/leaf-bullet.png"}],"helper.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createChickens = createChickens;
exports.getRandomInt = getRandomInt;
exports.listCategoryItem = listCategoryItem;
exports.getItemSupport = getItemSupport;

var _Chicken = require("./services/Chicken");

var _giftFire = _interopRequireDefault(require("/images/gift-fire.png"));

var _meat = _interopRequireDefault(require("/images/meat01.png"));

var _meat2 = _interopRequireDefault(require("/images/meat02.png"));

var _meat3 = _interopRequireDefault(require("/images/meat03.png"));

var _heart = _interopRequireDefault(require("/images/heart.png"));

var _coin = _interopRequireDefault(require("/images/coin.png"));

var _setup = require("./setup");

var _context = require("./strategy/context");

var _FireStrategy = require("./strategy/FireStrategy");

var _IceStrategy = require("./strategy/IceStrategy");

var _LightningStrategy = require("./strategy/LightningStrategy");

var _LeafStrategy = require("./strategy/LeafStrategy");

var _StoneStrategy = require("./strategy/StoneStrategy");

var _ChickenMeatStrategy = require("./strategy/ChickenMeatStrategy");

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

function createChickens() {
  return _setup.LEVEL.reduce(function (ack, element, i) {
    var row = Math.floor((i + 1) / _setup.STAGE_COLS);
    var col = i % _setup.STAGE_COLS;
    var x = _setup.STAGE_PADDING + col * (_setup.BRICK_WIDTH + _setup.BRICK_PADDING);
    var y = _setup.STAGE_PADDING + row * (_setup.BRICK_HEIGHT + _setup.BRICK_PADDING);
    if (element === 0) return ack;
    return __spreadArrays(ack, [new _Chicken.Chicken(_setup.BRICK_WIDTH, _setup.BRICK_HEIGHT, {
      x: x,
      y: y
    }, _setup.BRICK_ENERGY[element], _setup.BRICK_IMAGES[element])]);
  }, []);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

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
    var context = new _context.Context(new _ChickenMeatStrategy.ChickenMeatStrategy());
    item = context.doBusinessLogicItem(modelMeat, vector);
  } else if (randomNumber === 9) {
    var modelMeat = {
      speed: 1,
      size: 40,
      image: _coin.default,
      type: categorys[randomNumber]
    };
    var context = new _context.Context(new _ChickenMeatStrategy.ChickenMeatStrategy());
    item = context.doBusinessLogicItem(modelMeat, vector);
  }

  return item;
}
},{"./services/Chicken":"services/Chicken.ts","/images/gift-fire.png":"images/gift-fire.png","/images/meat01.png":"images/meat01.png","/images/meat02.png":"images/meat02.png","/images/meat03.png":"images/meat03.png","/images/heart.png":"images/heart.png","/images/coin.png":"images/coin.png","./setup":"setup.ts","./strategy/context":"strategy/context.ts","./strategy/FireStrategy":"strategy/FireStrategy.ts","./strategy/IceStrategy":"strategy/IceStrategy.ts","./strategy/LightningStrategy":"strategy/LightningStrategy.ts","./strategy/LeafStrategy":"strategy/LeafStrategy.ts","./strategy/StoneStrategy":"strategy/StoneStrategy.ts","./strategy/ChickenMeatStrategy":"strategy/ChickenMeatStrategy.ts"}],"Colision.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collision = void 0;

var _helper = require("./helper");

var Collision =
/** @class */
function () {
  function Collision() {
    this.gifts = [];
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
  }; // Check ball collision with bricks


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
          chicken.energy -= bullet.damage;
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

        if (starShip.heart === 0) {
          colliding = true;
        } else {
          starShip.level -= 1;
        }
      }
    });
    return colliding;
  };

  Collision.prototype.checkCollidingItem = function (item, starShip) {
    var isConflicking = false;

    if (item.pos.x + item.width > starShip.pos.x && item.pos.x < starShip.pos.x + starShip.width && item.pos.y + item.height > starShip.pos.y && item.pos.y < starShip.pos.y + starShip.height) {
      item.changeDirectionWhenConfict();

      if (item.typeGift < 6) {
        this.typeNumberItem = item.typeGift;
      }

      isConflicking = true;
    }

    return isConflicking;
  };

  return Collision;
}();

exports.Collision = Collision;
},{"./helper":"helper.ts"}],"images/spaceship.png":[function(require,module,exports) {
module.exports = "/spaceship.d28724db.png";
},{}],"index.ts":[function(require,module,exports) {
"use strict";

var _CanvasView = require("./view/CanvasView");

var _StarShip = require("./services/StarShip");

var _Colision = require("./Colision");

var _spaceship = _interopRequireDefault(require("/images/spaceship.png"));

var _setup = require("./setup");

var _helper = require("./helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Image
// Level and colors
var score = 0;
var gameOver = false;

function setGameOver(view) {
  view.drawInfo("Game Over!");
  gameOver = false;
}

function setGameWin(view) {
  view.drawInfo("Game Won!");
}

function gameLoop(view, chickens, starShip, conlision) {
  view.clear();
  view.drawChicken(chickens);
  view.drawSprite(starShip); //view.drawSprite(gift);

  if (starShip.isMovingLeft && starShip.pos.x > 0 || starShip.isMovingRight && starShip.pos.x < view.canvas.width - starShip.width || starShip.isMovingDown && starShip.pos.y > 0 || starShip.isMovingUp && starShip.pos.y < view.canvas.height - starShip.height) {
    starShip.moveStarShip();
  }

  starShip.bullets.forEach(function (b) {
    view.drawSprite(b);
    b.moveBullet();
    var collidingBrick = conlision.isCollidingChickens(b, chickens);

    if (collidingBrick) {
      score += b.damage;
      view.drawScore(score);
    }
  });
  conlision.gifts.forEach(function (g) {
    view.drawSprite(g);
    g.moveItemSupport();
    var conflicking = conlision.checkCollidingItem(g, starShip);
    if (conflicking) starShip.typeBullet = conlision.typeItem;
  });
  if (conlision.checkCollidingStarshipWithChickens(chickens, starShip)) return setGameOver(view);
  if (chickens.length === 0) return setGameWin(view);
  if (gameOver) return setGameOver(view);
  requestAnimationFrame(function () {
    return gameLoop(view, chickens, starShip, conlision);
  });
}

function startGame(view) {
  score = 0;
  view.drawInfo('');
  view.drawScore(0);
  var collision = new _Colision.Collision();
  var chickens = (0, _helper.createChickens)(); //const bullet = new Bullet(BALL_SPEED, BALL_SIZE, {x: BALL_STARTX, y: BALL_STARTY}, BULLET_IMAGE, 2)
  //const gift = new ItemSupport(1, 50, {x: 300, y: 0}, GIFT_BOX01, 1);

  var startShip = new _StarShip.StarShip(_setup.PADDLE_SPEED, _setup.PADDLE_WIDTH, _setup.PADDLE_HEIGHT, {
    x: _setup.PADDLE_STARTX,
    y: view.canvas.height - _setup.PADDLE_HEIGHT - 5
  }, _spaceship.default, 3, -1);
  gameLoop(view, chickens, startShip, collision);
}

var view = new _CanvasView.CanvasView("#playField");
view.initStartButton(startGame);
},{"./view/CanvasView":"view/CanvasView.ts","./services/StarShip":"services/StarShip.ts","./Colision":"Colision.ts","/images/spaceship.png":"images/spaceship.png","./setup":"setup.ts","./helper":"helper.ts"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "1113" + '/');

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