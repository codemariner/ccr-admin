const nextjs = require('next')
const express = require('express')
const bodyParser = require('body-parser')
const { parse } = require('url')
const { join } = require('path')
const { ApolloServer, gql } = require('apollo-server-express')

const config = require('../config')


const dev = process.env.NODE_ENV === 'development'

const app = nextjs({ dev })
const nextHandler = app.getRequestHandler()

const port = config.get('server:port')


const schema = require('./schema')

app.prepare().then(() => {
  const server = express()

  server.use((req, res, next) => {
    const parsedUrl = parse(req.url, true)

    const rootStaticFiles = [
      '/sitemap.xml',
      '/favicon.ico',
      '/robots.txt',
    ]

    if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
      const path = join(__dirname, '../static', parsedUrl.pathname)
      return app.serveStatic(req, res, path)
    }
    return next()
  })

  const apolloServer = new ApolloServer({ schema })
  server.use(bodyParser())

  apolloServer.applyMiddleware({ app: server })

  server.get('*', (req, res) => nextHandler(req, res))

  server.listen(port, () => {
    console.info(`Server listening on port ${port}\n`) // eslint-disable-line no-console
  })
})
