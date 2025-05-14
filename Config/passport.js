const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../models/userModel');
const jwt = require("jsonwebtoken");

passport.use(new GoogleStrategy({

    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'

}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await findOrCreateUser(profile); // your function
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));


//custom function to find or create user
const findOrCreateUser = async function (profile) {
    //First , try to find user by their google id 
    let user = userModel.findOne({ googleId: profile.id });

    //If google id not exist , try to find using mail (If user previously logs in using its email)
    if (!user) {
        let user = userModel.findOne({ email: profile.emails[0].value });

        //If still user doesn't exists , create one with google id and email
        if (!user) {
            user = await userModel.create({
                googleId: profile.id,
                email: profile.emails[0].value
            });
        } else {
            //If mail of user exist , update its google id 
            user.googleId = profile.id;
            await user.save()
        }
    }

    return user;
}

module.exports = passport;
