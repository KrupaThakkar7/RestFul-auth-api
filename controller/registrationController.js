const bcrypt = require("bcrypt");
const { Types } = require('mongoose'); // Importing for automatic userId generation
const userModel = require('../models/userModel');
const validateUser = require('../utils/validation');
const mailer = require('../utils/mailer');

//method for registration
const userRegistration = async function (req, res) {
    try {
        //Storing data from request body to 3 constants : userId , email , password
        const { email, password, googleId, facebookId, linkedInId } = req.body;


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
            userData.provider = "google";
        } else if (facebookId) {
            userData.facebookId = facebookId;
            userData.provider = "facebook";
        } else if (linkedInId) {
            userData.linkedInId = linkedInId;
            userData.provider = "linkedIn";
        } else {
            userData.provider = "local"
        }

        const user = new userModel(userData);
        await user.save();

        //to send mail
        await mailer({
            to: email,
            subject: "Successful Registration!",
            plainText: "You logged in to our app using this mail...",
            html: `<p>You logged in to our app using this mail. If it's not you, <a href="#">Check Activity</a></p>`,
        });

        res.redirect('/dashboard');

    } catch (err) {
        res.status(500).json({ error: err.message, stack: err.stack });
    }
}


module.exports = {
    userRegistration
}