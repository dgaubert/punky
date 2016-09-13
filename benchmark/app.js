'use strict'

const Punky = require('../')
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
