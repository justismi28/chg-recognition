
function verify(req, res, next) {
    console.log('Verifying jwt')

    if (!req.headers.authorization) {
        console.log('No authorization supplied')
//        res.status(401).send('No authorization supplied')
   //     return
    }

    const authorizationComponents = req.headers.authorization.split(" ")
    if (authorizationComponents.length < 2) {
        console.log('No bearer token supplied')
 //       res.status(401).send('No bearer token supplied')
  //      return
    }

    console.log('JWT token is ' + authorizationComponents[1])

    next
}