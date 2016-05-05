# punky

[![Build Status](https://travis-ci.org/dgaubert/punky.svg?branch=master)](https://travis-ci.org/dgaubert/punky)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Bootstrap your APIs taking advantage of the best community modules

## Quickstart

```js
const Punky = require('punky')

const BatchRouter = require('./app/batch/batch-router')
const BatchController = require('./app/batch/batch-controller')

const punky = new Punky()

const batchController = new BatchController(punky.logger)
const batchRouter = new BatchRouter(batchController, punky.logger)

const service = punky.use(batchRouter.route())

service.run()
  .then(() => {
    punky.logger.info('Go go go!')
  })
  .catch(punky.logger.error)
```
