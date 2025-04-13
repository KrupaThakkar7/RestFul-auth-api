const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId : {type : String ,required : true , unique:true},
    email : {type : String , required : true , unique : true},
    password : {type : String}, //Not required for OAuth users
    googleId : {type : String , unique : true , sparse : true}, //Sparse allows only not-null value to check for uniqueness i.e. 2 users have null value(If logs using diff. method) , but not 2 users have same google value.
    facebookId : {type : String , unique : true , sparse : true},
    linkedInId : {type : String , unique:true , sparse : true},
    provider : {type : String , enum : ["local" , "google" , "facebook" , "linkedIn"] , required : true}
});

const userModel = mongoose.model("User" , userSchema);
module.exports = userModel;