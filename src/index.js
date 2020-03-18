// ./src/index.js

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const nominationsRouter = require('./routes/nominations');

const {startDatabase} = require('./database/mongo');
const {insertUser, getUsers, deleteUser, updateUser} = require('./database/users');

process.on('unhandledRejection', (reason, p) => {
//    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
    // application specific logging here
    console.log('Unhandled rejection at: ', p, ` reason: ${reason}`);
    // fail is undefined so the app will stop instead of hanging
    fail;
});

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

// Router for nominations
app.use('/nominations', nominationsRouter);

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
    app.listen(8081, async () => {
      console.log('listening on port 8081');
    });
  });