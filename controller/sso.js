const userModel = require('../models/userModel');

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
    findOrCreateUser
}