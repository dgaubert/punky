const isMaster = require('cluster').isMaster
const ConsoleTransport = require('./source/logging/winston-console-transport')
const FileTransport = require('./source/logging/winston-file-transport')
const Logger = require('./source/logging/winston-logger')
const ProcessListenerIterator = require('./source/listeners/process-listener-iterator')
const SigintListener = require('./source/listeners/sigint-listener')
const SigtermListener = require('./source/listeners/sigterm-listener')
const UncaughtExceptionListener = require('./source/listeners/uncaught-exception-listener')
const UnhandledRejectionListener = require('./source/listeners/unhandled-rejection-listener')
const Launcher = require('./source/launcher')
const Sigusr2Listener = require('./source/listeners/sigusr2-listener')
const WorkerExitListener = require('./source/listeners/worker-exit-listener')
const Master = require('./source/master')
const Worker = require('./source/worker')
const Server = require('./source/server')
const App = require('./source/app/app')

var logger = new Logger([
  ConsoleTransport.create(),
  FileTransport.create()
])

var target = isMaster
  ? new Master(new Sigusr2Listener(logger), new WorkerExitListener(logger), logger)
  : new Worker(new Server(new App(), logger), logger)

var processListenerIterator = new ProcessListenerIterator()
  .add(new SigintListener(logger))
  .add(new SigtermListener(logger))
  .add(new UncaughtExceptionListener(logger))
  .add(new UnhandledRejectionListener(logger))

var launcher = new Launcher(target, processListenerIterator)

// here we go!
launcher.run()
