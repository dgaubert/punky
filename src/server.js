const Runnable = require('./runnable');

class Server extends Runnable {
  constructor(app, logger) {
    super();
    this.app = app;
    this.port = process.env.PORT || 3000;
    this.logger = logger || console;
  }
  
  run() {
    return this.app.listen(this.port)
      .then((server) => {
        this.logger.info('Application started on port', this.port);
        return server;
      });
  }
  
  exit() {
    return this.app.close()
      .then(() => {
        this.logger.info('Application stopped');
      });
  }
}

module.exports = Server;
