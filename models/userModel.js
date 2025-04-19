const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, //Not required for OAuth users
    googleId: { type: String, index: true, unique: true, sparse: true, default: undefined }, //Sparse allows only not-null value to check for uniqueness i.e. 2 users have null value(If logs using diff. method) , but not 2 users have same google value.
    facebookId: { type: String, index: true, unique: true, sparse: true, default: undefined },
    linkedInId: { type: String, index: true, unique: true, sparse: true, default: undefined },
    provider: { type: String, enum: ["local", "google", "facebook", "linkedIn"], required: true }
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;


/* We create schema named userSchema(using mongoose.Schema) , then we create model named userModel(using mongoose.model) then it creates collect named "Users" (plural of model's name) under DB auth-api-v2(mentioned in .env)
 */