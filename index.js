const isMaster = require('cluster').isMaster;
const Launcher = require('./src/launcher');
const Master = require('./src/master');
const Worker = require('./src/worker');
const App = require('./src/app/app');

const target = isMaster ? new Master(1) : new Worker(new App());
const launcher = new Launcher(target);

// here we go!
launcher.run();
