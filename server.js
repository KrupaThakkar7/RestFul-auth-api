require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userModel = require('./models/userModel');
const registerRouter = require('./routes/userRoutes')
const cors = require('cors');

const app = express();

app.use(express.json()); //Parses JSON data from the request body and makes it available in req.body.
app.use(express.urlencoded({ extended: true }));  //It converts form data into a JavaScript object inside req.body.
app.use(cookieParser()) // 'Actual package is cookie-parser' , we impoet it locally as cookiePaerser & user it as method to read cookies from request

// 🌐 Allow frontend (React or other) to communicate with backend
app.use(cors({
  origin: 'http://localhost:3000', // frontend URL
  credentials: true // allows cookies to be sent with requests
}));

// app.get('/',(req,res) => {
//   console.log("Serever");
// });

app.use('/', registerRouter);


//connect to mongodb 
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to:", mongoose.connection.name))
  .catch((err) => console.error("MongoDB connection error", err));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});