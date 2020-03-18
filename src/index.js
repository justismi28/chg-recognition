// ./src/index.js

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const {insertUser} = require('./database/users');
const nominationsRouter = require('./routes/nominations');
const usersRouter = require('./routes/users');

const {startDatabase} = require('./database/mongo');
const{getAwards, getAwardsById, insertAllAwards} = require('./database/awards');

process.on('unhandledRejection', (reason, p) => {
    console.log(`Unhandled rejection at: ${p} reason: ${reason}`);
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

// Routes
app.use('/users', usersRouter);
app.use('/nominations', nominationsRouter);

// defining an endpoint to get specific User by ID
app.get('/awards/', async (req, res) => {
    res.send(await getAwards(req.params.id));
});

app.get('/awards/:id', async (req, res) => {
    res.send(await getAwardsById(req.params.id));
});

// start the in-memory MongoDB instance
startDatabase().then(async () => {
    await insertAllAwards();
    // start the server
    app.listen(8081, async () => {
      console.log('listening on port 8081');
    });
  });