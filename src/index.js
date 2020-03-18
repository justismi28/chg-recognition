// ./src/index.js

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const nominationsRouter = require('./routes/nominations');

const {startDatabase} = require('./database/mongo');
const {insertUser, getUsers, getUserById, deleteUser, updateUser} = require('./database/users');
const{getAwards, getAwardsById, insertAllAwards} = require('./database/awards');

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
app.get('/users/', async (req, res) => {
    res.send(await getUsers());
});

// defining an endpoint to get specific User by ID
app.get('/users/:id', async (req, res) => {
    res.send(await getUserById(req.params.id));
});

// defining an endpoint to get specific User by ID
app.get('/awards/', async (req, res) => {
    res.send(await getAwards(req.params.id));
});

app.get('/awards/:id', async (req, res) => {
    res.send(await getAwardsById(req.params.id));
});

// create new user
app.post('/', async (req, res) => {
    const newUser = req.body;
    let newUserId  = await insertUser(newUser);
    res.status(201);
    res.send({ message: 'New User inserted.', userId : newUserId });
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
    await insertAllAwards();
    // start the server
    app.listen(8081, async () => {
      console.log('listening on port 8081');
    });
  });