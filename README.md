# punky

[![Build Status](https://travis-ci.org/dgaubert/punky.svg?branch=master)](https://travis-ci.org/dgaubert/punky)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Bootstrap your APIs taking advantage of the best community modules

## Quickstart

```js
const Punky = require('punky')

const Router = require('./router')
const Controller = require('./controller')

const punky = new Punky()
const logger = punky.logger

const controller = new Controller(logger)
const router = new Router(controller, logger)

const service = punky.use(router.route())

service.run()
  .then(() => {
    logger.info('Go go go!')
  })
  .catch(logger.error)
```
