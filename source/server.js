'use strict';

const Runner = require('./runner');

class Server extends Runner {
  constructor(app, logger) {
    super();
    this.app = app;
    this.port = process.env.PORT || 3000;
    this.logger = logger;
    this.httpServer = null;
  }

  run() {
    return new Promise((resolve, reject) => {
      this.httpServer = this.app.listen(this.port);

      if (!this.httpServer) {
        return reject(new Error('Server is not ready'));
      }

      this.httpServer.once('listening', () => {
        this.logger.info('Server started on port', this.port);
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
        return reject(new Error('Server is already closed'));
      }

      this.httpServer.once('close', () => {
        this.logger.info('Server stopped');
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
