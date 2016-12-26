const cwd = process.cwd()

global.__lib = `${cwd}/lib/`
global.__example = `${cwd}/example/`

process.env.NODE_ENV = 'test'
