// Pull packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errorHandler } = require('./middleware/ErrorHandler');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = process.env.DATABASE;
mongoose.connect(uri, 
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
connection.on('reconnected', () => {
  console.log('Mongo has reconnected')
})
connection.on('error', error => {
  console.log('Mongo connection has an error', error)
  mongoose.disconnect()
})
connection.on('disconnected', () => {
  console.log('Mongo connection is disconnected')
})


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