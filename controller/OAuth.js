const express = require('express');
const passport = require('passport');
const userModel = require('../models/userModel');

const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
});


const findOrCreateUser = async function(profile) {
    
    let user = await userModel.findOne({googleId : profile.id});

    if(!user){
        user = await userModel.create({
            googleId : profile.id ,
            email : profile.emails[0].value , 
            // provider : "google"
        });
    }

    return user;
}



module.exports = {
    googleAuth,
    findOrCreateUser
}