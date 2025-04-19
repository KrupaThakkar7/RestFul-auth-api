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
            return res.status(400).send("Email should  be in proper format or password must contains 8 or more characters.")
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
        const userData = {
            userId: new Types.ObjectId().toString(),
            email: email,
            password: hashedPassword,
        };

        if (googleId) {
            userData.googleId = googleId;
            provider = "google";
        }
        if (facebookId) {
            userData.facebookId = facebookId;
            provider = "facebook";
        }
        if (linkedInId) {
            userData.linkedInId = linkedInId;
            provider = "linkedIn";
        }

        if (!user.provider) {
            userData.provider = "local";
        }

        const user = new userModel(userData);
        await user.save();

        res.status(201).json({ msg: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ "Error": err });
    }
}


module.exports = {
    userRegistration
}