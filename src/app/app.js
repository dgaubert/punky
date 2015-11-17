const express = require('express');

class App {
  constructor(routers, errorMiddleware, logger) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.routers = routers;
    this.errorMiddleware = errorMiddleware;
    this.logger = logger || console;
    this.server = null;
  }
  
  start() {
    return this.listen()
      .then((server) => {
        this.logger.info('Application started on port', this.port);
        return server;
      });
  }
  
  stop() {
    return this.close()
      .then(() => {
        this.logger.info('Application stopped');
      });
  }
  
  listen() {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(this.port);
      
      this.server.once('listening', () => {
        resolve(this.server);
      });
      
      this.server.once('error', (err) => {
        reject(err);
      });
    });
  }
  
  close() {
    return new Promise((resolve, reject) => {
      if (!this.server) {
        return reject(new Error('Application is already closed'));
      }

      this.server.once('close', () => {
        resolve();
      });
      
      this.server.once('error', (err) => {
        reject(err);
      });
      
      this.server.close();
    });
  }
}

module.exports = App;
