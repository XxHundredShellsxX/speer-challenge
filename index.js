// Pull packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errorHandler } = require('./middleware/ErrorHandler');
require('dotenv').config();

// const checkAuth = require('./middleware/checkAuth');
// const userAuth = require('./middleware/userAuth');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

dbconnect = async()  => {
  if(process.env.NODE_ENV == 'test'){
    const Mockgoose = require('mockgoose').Mockgoose;
    const mockgoose = new Mockgoose(mongoose);
  
    await mockgoose.prepareStorage();
  }
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
}

dbconnect();


// for CRUD/REST api endpoints
const userRouter = require('./routes/user');

app.use('/user', userRouter);

// app.get('/checkToken', checkAuth, (req,res) => {
//   res.sendStatus(200);
// })

// app.post('/userAuth', userAuth, (req,res) => {
//   res.sendStatus(200);
// })

// app.get('/clear', (req, res) => {
//   res.clearCookie('token').status(200).send('Ok.');
// });

app.use(errorHandler);

// start express server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;