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

        // Generate JWT here
        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            SECRET_KEY, 
            { expiresIn: '1h' }
        );
        // Pass token forward
        return done(null, { user, token });
    } catch (error) {
        return done(error, null);
    }
}));

module.exports = passport;
