const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../models/userModel');


passport.serializeUser((user, done) => {
    done(null, user.id); // Save only user ID in session
});

passport.deserializeUser((id, done) => {
    userModel.findById(id)
        .then(user => done(null, user))
        .catch(err => done(err));
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await findOrCreateUser(profile); //It is user defined function
        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

module.exports = passport;
