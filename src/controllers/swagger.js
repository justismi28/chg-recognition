const express = require('express')
const router = express.Router()

let pjson = require('../../package.json');
const options = {
  swaggerDefinition: {
    info: {
      title: pjson.name,
      version: pjson.version,
      description: pjson.description,

    },
    tags: [
      {
        name: 'Users',
        description: 'API Endpoints for interacting with the users collection'
      },
      {
        name: 'Nominations',
        description: 'API Endpoints for giving & receiving nominations'
      },
      {
        name: 'Redeem',
        description: 'API Endpoints for redemption of Core Values Points'
      },
      {
        name: 'Rewards',
        description: 'API Endpoints for getting rewards'
      }
    ],
  },
  apis: ['.././routes/*.js']
}

const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = swaggerJSDoc(options)

router.get('/json', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

module.exports = {
  router,
}