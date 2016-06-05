'use strict'

const Punky = require('../')
const Router = require('express').Router

const punky = new Punky()
const router = Router()

var body = new Buffer('Hello World')

router.get('/', (req, res, next) => {
  res.send(body)
})

punky.use(router)
  .run()
  .catch(punky.logger.error)
