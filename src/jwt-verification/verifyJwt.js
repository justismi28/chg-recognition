const {logger} = require('../logger');

function verify(req, res, next) {
    console.log('Verifying jwt')

    if (!req.headers.authorization) {
        logger.error('No authorization supplied')
//        res.status(401).send('No authorization supplied')
   //     return
    }

    const authorizationComponents = req.headers.authorization.split(" ")
    if (authorizationComponents.length < 2) {
        logger.error('No bearer token supplied')
 //       res.status(401).send('No bearer token supplied')
  //      return
    }

    logger.debug('JWT token is ' + authorizationComponents[1])

    next
}

module.exports = {
  verify
}