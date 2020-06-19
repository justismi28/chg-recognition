const {logger} = require('../logger');
const OktaJwtVerifier = require('@okta/jwt-verifier')

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: 'https://chghealthcare.oktapreview.com/oauth2/auskmtjacfEi8ffM60h7'
})
const ClientId = '0oas5s11wsNsbTO0M0h7'

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