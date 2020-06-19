var express = require('express');
var router = express.Router();
const {logger} = require('../logger');

const {insertUser, getUsers, getUserById, getUserByUid, deleteUser, updateUser, validateUser} = require('../database/users');
const {validateIdParam} = require('./validateIdParam');

/* GET users listing. */
// defining an endpoint to return all users
router.get('/', async (req, res) => {
    try {
        res.send(await getUsers());
    }
    catch (error) {
        res.status(500);
        res.send({errors: [ {message: 'Internal error: ' + error.message}]});
    }
});

// defining an endpoint to get specific User by ID
router.get('/:id', async (req, res) => {
    if (!validateIdParam(req, res)) {
        return;
    }

    res.send(await getUserById(req.params.id));
});

// defining an endpoint to get specific User by ID
router.get('/uid/:uid', async (req, res) => {
    if (!validateIdParam(req, res)) {
        return;
    }

    logger.debug('Requested user by UID ' + req.params.uid)
    res.send(await getUserByUid(req.params.uid));
})

router.post('/', async (req, res) => {
    const newUser = req.body;

    let validation = validateUser(newUser);
    if (validation.failed) {
        res.status(400);
        res.send({ message: 'Missing or invalid fields: ' + validation.invalidFields.join(', ')});
        return;
    }

    let newUserId = await insertUser(newUser);
    res.status(201);
    res.send({ message: 'New User inserted.', userId : newUserId });
});

// endpoint to delete an user
router.delete('/:id', async (req, res) => {
    let response = {};

    if (!validateIdParam(req, res)) {
        return;
    }

    try {
        let deletedCount = await deleteUser(req.params.id);
        if (deletedCount == 0) {
            res.status(404);
            response.message= 'User not found';
        }
        else {
            response.message= 'User Deleted';
        }
    }
    catch (error) {
        logger.debug(error);
        res.status(500);
        response.message= 'Internal Error';
    }
    res.send(response);
});
  
// endpoint to update an user
router.put('/:id', async (req, res) => {
    const updatedUser = req.body;

    if (!validateIdParam(req, res)) {
        return;
    }

    let validation = validateUser(updatedUser);
    if (validation.invalidFields.length > 0) {
        res.status(400);
        res.send({ message: 'Missing or invalid fields: ' + validation.invalidFields.join(', ')});
        return;
    }

    await updateUser(req.params.id, updatedUser);
    res.send({ message: 'User updated.' });
});


module.exports = router;