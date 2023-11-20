const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    profilePhoto: String,
    reviews: [{type: String}],
    year: Number
})

module.exports = mongoose.model("User", UserSchema);