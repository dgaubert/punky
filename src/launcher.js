const Runnable = require('./runnable');

class Launcher extends Runnable {
  constructor(target) {
    super();
    this.target = target;
  }
  
  run() {
    return this.target.run();
  }
}

module.exports = Launcher;
