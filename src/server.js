const Runnable = require('./runnable');

class Server extends Runnable {
  constructor(app, logger) {
    super();
    this.app = app;
    this.port = process.env.PORT || 3000;
    this.logger = logger || console;
    this.httpServer = null;
  }
  
  run() {
    return new Promise((resolve, reject) => {
      this.httpServer = this.app.listen(this.port);
      
      if (!this.httpServer) {
        return reject(new Error('There is not application ready yet'));
      }
      
      this.httpServer.once('listening', () => {
        this.logger.info('Application started on port', this.port);
        resolve();
      });
      
      this.httpServer.once('error', (err) => {
        reject(err);
      });
    });
  }
  
  exit() {
    return new Promise((resolve, reject) => {
      if (!this.httpServer) {
        return reject(new Error('Application is already closed'));
      }

      this.httpServer.once('close', () => {
        this.logger.info('Application stopped');
        resolve();
      });
      
      this.httpServer.once('error', (err) => {
        reject(err);
      });
      
      this.httpServer.close();
    });
  }
}

module.exports = Server;
