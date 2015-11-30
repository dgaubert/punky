const isMaster = require('cluster').isMaster;
const Launcher = require('./source/launcher');
const Master = require('./source/master');
const Worker = require('./source/worker');
const Server = require('./source/server');
const App = require('./source/app/app');

const target = isMaster ? new Master() : new Worker(new Server(new App()));
const launcher = new Launcher(target);

// here we go!
launcher.run();
