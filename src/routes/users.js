var express = require('express');
var router = express.Router();

const {insertUser, getUsers, getUserById, deleteUser, updateUser} = require('../database/users');

/**
 * @swagger
 * /users:
 *   get:
 *     description: Returns users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           type: array
 */
router.get('/', async (req, res) => {
    res.send(await getUsers());
});

// defining an endpoint to get specific User by ID
router.get('/:id', async (req, res) => {
    res.send(await getUserById(req.params.id));
});

router.post('/', async (req, res) => {
    const newUser = req.body;
    let newUserId = await insertUser(newUser);
    res.status(201);
    res.send({ message: 'New User inserted.', userId : newUserId });
});

// endpoint to delete an user
router.delete('/:id', async (req, res) => {
    await deleteUser(req.params.id);
    res.send({ message: 'User Deleted.' });
});
  
// endpoint to update an user
router.put('/:id', async (req, res) => {
    const updatedUser = req.body;
    await updateUser(req.params.id, updatedUser);
    res.send({ message: 'User Points updated.' });
});


module.exports = router;