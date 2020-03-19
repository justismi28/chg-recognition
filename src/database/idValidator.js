const {ObjectID} = require('mongodb');

// Simple abstraction so we don't have to pull any Mongo dependencies into router code
function idValidator(id) {
    return ObjectID.isValid(id);
}

module.exports = {
  idValidator,
}