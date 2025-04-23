require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userModel = require('./models/userModel');
const userRouter = require('./routes/userRoutes')
const cors = require('cors');
const ejs = require('ejs');
const path = require('path');

const app = express();

app.use(express.json()); //Parses JSON data from the request body and makes it available in req.body.
app.use(express.urlencoded({ extended: true }));  //It converts form data into a JavaScript object inside req.body.
app.use(cookieParser()) // 'Actual package is cookie-parser' , we import it locally as cookiePaerser & user it as method to read cookies from request
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));
app.use(express.static(path.join(__dirname , 'public')));



// 🌐 Allow frontend (React or other) to communicate with backend
app.use(cors({
  origin: 'http://localhost:5500', // frontend URL
  credentials: true // allows cookies to be sent with requests
}));

// app.get('/',(req,res) => {
//   console.log("Serever");
// });

app.use('/', userRouter);


//connect to mongodb 
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to:", mongoose.connection.name))
  .catch((err) => console.error("MongoDB connection error", err));

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});