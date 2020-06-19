const {logger} = require('../logger');

module.exports = function (req, res, next) {
    logger.debug('Verifying jwt')

    if (!req.headers.authorization) {
        logger.error('No authorization supplied')
        res.status(401).send('No authorization supplied')
        return
    }
    else {
        const authorizationComponents = req.headers.authorization.split(" ")
        if (authorizationComponents.length < 2) {
            logger.error('No bearer token supplied')
            res.status(401).send('No bearer token supplied')
            return
        }

        logger.debug('JWT token is ' + authorizationComponents[1].length + ' characters long')
    }

    next()
}