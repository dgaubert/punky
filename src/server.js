const Runnable = require('./runnable');

class Server extends Runnable {
  constructor(app, logger) {
    super();
    this.app = app;
    this.port = process.env.PORT || 3000;
    this.logger = logger || console;
    this.server = null;
  }
  
  run() {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(this.port);
      
      if (!this.server) {
        return reject(new Error('There is not application ready yet'));
      }
      
      this.server.once('listening', () => {
        this.logger.info('Application started on port', this.port);
        resolve();
      });
      
      this.server.once('error', (err) => {
        reject(err);
      });
    });
  }
  
  exit() {
    return new Promise((resolve, reject) => {
      if (!this.server) {
        return reject(new Error('Application is already closed'));
      }

      this.server.once('close', () => {
        this.logger.info('Application stopped');
        resolve();
      });
      
      this.server.once('error', (err) => {
        reject(err);
      });
      
      this.server.close();
    });
  }
}

module.exports = Server;
