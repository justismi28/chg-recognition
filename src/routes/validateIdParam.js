const {idValidator} = require('../database/idValidator');

function validateIdParam(req, res) {
    let isValidId = idValidator(req.params.id);
    if (!isValidId) {
        let response = {};
        res.status(400);
        response.message = 'ID is not valid ' + req.params.id;
        res.send(response);
        return false;
    }
    
    return true;
}

module.exports = {
  validateIdParam,
}