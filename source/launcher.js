'use strict';

const Runnable = require('./runnable');

class Launcher extends Runnable {
  constructor(target, listeners) {
    super();
    this.target = target;

    listeners.listen(failure => this.exit(failure));
  }

  run() {
    return this.target.run();
  }

  exit(failure) {
    return this.target.exit(failure);
  }

}

module.exports = Launcher;
