# punky

[![Build Status](https://travis-ci.org/dgaubert/punky.svg?branch=master)](https://travis-ci.org/dgaubert/punky)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Bootstrap your APIs taking advantage of the best community modules

## Quickstart

  - Create `app.js`:

```js
'use strict'

const Punky = require('punky')
const Router = require('express').Router

const punky = new Punky(/* options */)

if (!punky.isMaster()) {
  const router = Router()
  const body = new Buffer('Hello World')
  const message = body.toString('utf8')

  router.get('/', (req, res, next) => {
    req.log.info(message)
    req.metrics.increment('home')
    res.set('Content-Type', 'text/html')
    res.send(body)
  })

  punky.app.use(router)
}

punky.run().catch(punky.logger.error)
```

  - Run:

```
$ node app.js
```
