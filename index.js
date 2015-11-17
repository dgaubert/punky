const isMaster = require('cluster').isMaster;
const Launcher = require('./src/launcher');
const Master = require('./src/master');
const Worker = require('./src/worker');
const Server = require('./src/server');
const App = require('./src/app/app');

const target = isMaster ? new Master() : new Worker(new Server(new App()));
const launcher = new Launcher(target);

// here we go!
launcher.run();
