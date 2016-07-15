# punky

[![Build Status](https://travis-ci.org/dgaubert/punky.svg?branch=master)](https://travis-ci.org/dgaubert/punky)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Bootstrap your APIs taking advantage of the best community modules

## Quickstart

  - Create `app.js`:

```js
'use strict'

const Punky = require('../')
const Router = require('express').Router

const punky = new Punky()
const router = Router()
const body = new Buffer('Hello World')

router.get('/', (req, res, next) => {
  res.send(body)
})

punky.use(router)
  .run()
  .catch(punky.logger.error)
```

  - Run:

```
$ node app.js
```
