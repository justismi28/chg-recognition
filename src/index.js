// ./src/index.js

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const {startDatabase} = require('./database/mongo');
const {insertUser, getUsers, deleteUser, updateUser} = require('./database/users');


// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all users
app.get('/', async (req, res) => {
    res.send(await getUsers());
});

app.post('/', async (req, res) => {
    const newUser = req.body;
    await insertUser(newUser);
    res.send({ message: 'New User inserted.' });
});

// endpoint to delete an user
app.delete('/:id', async (req, res) => {
    await deleteUser(req.params.id);
    res.send({ message: 'User Deleted.' });
});
  
// endpoint to update an user
app.put('/:id', async (req, res) => {
    const updatedUser = req.body;
    await updateUser(req.params.id, updatedUser);
    res.send({ message: 'User Points updated.' });
});

// start the in-memory MongoDB instance
startDatabase().then(async () => {
    await insertUser({title: 'Hello, now from the in-memory database!'});
  
    // start the server
    app.listen(3001, async () => {
      console.log('listening on port 3001');
    });
  });