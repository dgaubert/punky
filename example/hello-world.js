'use strict'

const Punky = require('../')
const Router = require('express').Router

class HelloWorld {
  constructor (options) {
    this.punky = new Punky(options)

    if (this.punky.app) {
      const router = Router()

      router.get('/', this.home)
      this.punky.app.use(router)
    }
  }

  get home () {
    const body = new Buffer('Hello World')
    const message = body.toString('utf8')

    return (req, res, next) => {
      req.log.info(message)
      req.metrics.increment('hello_world')
      res.set('Content-Type', 'text/html')
      res.send(body)
    }
  }
}

module.exports = HelloWorld
