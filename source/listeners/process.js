'use strict';

const Listener = require('./listener');

class ProcessListener extends Listener {
  constructor(logger) {
    super();
    this.logger = logger || console;
    this._listeners = [];
  }

  addListener(listener) {
    this._listeners.push(listener);

    return this;
  }

  listen(exit) {
    for(var listener of this._listeners) {
      listener.listen(exit);
    }
  }
}

module.exports = ProcessListener;
