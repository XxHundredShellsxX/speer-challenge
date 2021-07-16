// Pull packages
const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/ErrorHandler');
require('dotenv').config();
require('./mongoConfig');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// for CRUD/REST api endpoints
const userRouter = require('./routes/user');
const chatRouter = require('./routes/chat');

app.use('/user', userRouter);
app.use('/chat', chatRouter);

app.use(errorHandler);

// start express server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;