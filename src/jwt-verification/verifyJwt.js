const {logger} = require('../logger');
const OktaJwtVerifier = require('@okta/jwt-verifier')

if (!process.env.OKTA_ISSUER_URL) {
    logger.error('No OKTA_ISSUER_URL environment variable')
    return
}
if (!process.env.OKTA_CLIENT_ID) {
    logger.error('No OKTA_CLIENT_ID environment variable')
    return
}

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: process.env.OKTA_ISSUER_URL
})
const ClientId = process.env.OKTA_CLIENT_ID

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
        oktaJwtVerifier.verifyAccessToken(authorizationComponents[1], ClientId)
            .then(jwt => {
                // the token is valid
                logger.debug('JWT token is valid')
            })
            .catch(err => {
                logger.error(err)
                res.status(403).send('Authorization denied')
                return
            })
    }

    next()
}