global.__source = process.cwd() + '/lib/'
process.env.NODE_ENV = 'test'

// avoid warnings if punky's user is not using node-config
process.env.SUPPRESS_NO_CONFIG_WARNING = 'y'

const config = require('config')
const defaults = require('../lib/config/default')

config.util.setModuleDefaults('punky', defaults)
