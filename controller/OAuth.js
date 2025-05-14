const express = require('express');
const passport = require('passport');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const googleAuth = passport.authenticate('google', {
    scope: ['profile', 'email']
});



const googleResponseHandler = (req, res, next) => {
    passport.authenticate('google', async (err, user) => {

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });

        return res.redirect('/dashboard');
    })(req, res, next); //necessary to invoke the middleware
};

module.exports = {
    googleAuth,
    googleResponseHandler
}