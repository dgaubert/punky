const express = require('express');

class App {
  constructor(routers, errorMiddleware, logger) {
    this.application = express();
    this.routers = routers;
    this.errorMiddleware = errorMiddleware;
    this.logger = logger || console;
  }
  
  listen(port) {
    return this.application.listen(port);
  }
}

module.exports = App;
