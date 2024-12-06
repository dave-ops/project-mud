'use strict';
var mud = require('./nodemud'),
cfg = require('./config'),
server = new mud(cfg.server.port, cfg.server.game);

console.log('node-mud is now running on port:', server.port)