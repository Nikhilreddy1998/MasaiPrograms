"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const duck_1 = require("./src/duck");
const FastFly_1 = require("./src/strategies/FastFly");
const NoFly_1 = require("./src/strategies/NoFly");
const duck = new duck_1.Duck(new FastFly_1.FastFly());
duck.performFly();
duck.setFlyStrategy(new NoFly_1.NoFly());
duck.performFly();
