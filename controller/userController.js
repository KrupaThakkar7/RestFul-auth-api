const bcrypt = require("bcrypt");
const { Types } = require('mongoose') // Importing for automatic userId generation
const userModel = require('../models/userModel')
const validateUser = require('../utils/validation')


//method for registration
const userRegistration = async function (req, res) {
    try {
        //Storing data from request body to 3 constants : userId , email , password
        const { email, password } = req.body;

        const validUser = validateUser(email, password);
        if (!validUser) {
            return res.send("Email should  be in proper format or password must contains 8 or more characters.")
        }

        //To check if user already exists
        let existingUser = await userModel.findOne({ email }).lean(); //lean() makes the MongoDB query faster by returning a plain JavaScript object instead of a Mongoose document.
        if (existingUser) {
            return res.status(400).json({ message: `User already exists , try to <a href='/login'>log in</a> instead!` });
        }

        //Generating salt & hashing password
        const salt = await bcrypt.genSalt(10); //10 is salt rounds
        const hashedPassword = await bcrypt.hash(password, salt); // Generate hashed password using salt 

        //For local method of registration(email + password)
        const user = new userModel({
            userId: new Types.ObjectId().toString(), //Generates a unique ID --> better security
            email: email,
            password: hashedPassword,
            googleId: null,
            facebookId: null,
            linkedInId: null,
            provider: "local"
        });
        await user.save();

        res.status(201).json({ msg: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ "Error": err });
    }
}


//Login method
const userLogin = async function (req, res) {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email }).lean();
    if (!user) {
        return res.status(400).json({ message: "Don't have an account?<a href='/register'>Create Account</a>" })
    }

    const isMatch = await bcrypt.match(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
}






module.exports = {
    userRegistration,
    userLogin
}