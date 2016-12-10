'use strict'

const Punky = require('../')
const Router = require('express').Router

const punky = new Punky(/* { options } */)
const logger = punky.logger
const app = punky.app

if (app) {
  const router = Router()
  const body = new Buffer('Hello World')
  const message = body.toString('utf8')

  router.get('/', (req, res, next) => {
    req.log.info(message)
    req.metrics.increment('home')
    res.set('Content-Type', 'text/html')
    res.send(body)
  })

  app.use(router)
}

punky.run()
  // if process was spawned with IPC channel,
  // then send "listening port" to the parent process
  .then(server => typeof process.send === 'function'
    ? process.send({ port: server.address().port })
    : undefined
  )
  .catch(err => logger.error(err))
