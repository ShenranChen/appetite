//const mongoose = require("mongoose");
import mongoose from 'mongoose'
const { Schema, model } = mongoose

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    profilePhoto: String, // store the GridFS fileID
    reviews: [{ type: String }],
    favoriteFoods: [{ type: String }],
    badges: [{ type: String }],
    year: Number
})

const User = model('User', UserSchema)
export default User;
