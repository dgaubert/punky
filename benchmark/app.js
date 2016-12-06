'use strict'

const Punky = require('../')
const Router = require('express').Router

const punky = new Punky()

if (punky.app) {
  const router = Router()
  const body = new Buffer('Hello World')
  const message = body.toString('utf8')

  router.get('/', (req, res, next) => {
    req.log.info(message)
    req.metrics.increment('home')
    res.set('Content-Type', 'text/html')
    punky.logger.info('punky')
    res.send(body)
  })

  punky.app.use(router)
}

punky.run()
  .then(() => {
    punky.logger.info('Punky ready for benchmarking')
    process.send({ ready: true })
  })
  .catch(punky.logger.error)
