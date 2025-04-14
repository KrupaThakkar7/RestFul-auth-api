require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./models/userModel');
const registerRouter = require('./routes/registerRoute')

const app = express();
app.use(express.json()); //Parses JSON data from the request body and makes it available in req.body.
app.use(express.urlencoded({ extended: true }));  //It converts form data into a JavaScript object inside req.body.

// app.get('/',(req,res) => {
//   console.log("Serever");
// });

app.use('/', registerRouter);


//connect to mongodb 
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected successfully to MongoDB"))
  .catch((err) => console.error("MongoDB connection error", err));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});