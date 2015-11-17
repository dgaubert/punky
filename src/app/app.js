const express = require('express');

class App {
  constructor(routers, errorMiddleware, logger) {
    this.application = express();
    this.routers = routers;
    this.errorMiddleware = errorMiddleware;
    this.logger = logger || console;
    this.server = null;
  }
  
  listen(port) {
    return new Promise((resolve, reject) => {
      this.server = this.application.listen(port);
      
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
