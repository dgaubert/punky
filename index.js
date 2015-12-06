const isMaster = require('cluster').isMaster;
const ProcessListenerIterator = require('./source/listeners/process-listener-iterator');
const SigintListener = require('./source/listeners/sigint-listener');
const SigtermListener = require('./source/listeners/sigterm-listener');
const UncaughtExceptionListener = require('./source/listeners/uncaught-exception-listener');
const Launcher = require('./source/launcher');
const Sigusr2Listener = require('./source/listeners/sigusr2-listener');
const WorkerExitListener = require('./source/listeners/worker-exit-listener');
const Master = require('./source/master');
const Worker = require('./source/worker');
const Server = require('./source/server');
const App = require('./source/app/app');

var target = isMaster ?
  new Master(new Sigusr2Listener(), new WorkerExitListener()) :
  new Worker(new Server(new App()));

var processListenerIterator = new ProcessListenerIterator()
  .add(new SigintListener())
  .add(new SigtermListener())
  .add(new UncaughtExceptionListener());

var launcher = new Launcher(target, processListenerIterator);

// here we go!
launcher.run();
