//const mongoose = require("mongoose");
import mongoose from 'mongoose'
const { Schema, model } = mongoose

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    profilePhoto: String,
    reviews: [{type: String}],
    year: Number
})

const User = model('User', UserSchema)
export default User;
//module.exports = mongoose.model("User", UserSchema);
