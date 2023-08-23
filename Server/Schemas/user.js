const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    role: String,
    finished: Boolean,
    email:{
        type: String,
        unique: true
    },
    password: String,
    results: Array
});

module.exports = mongoose.model("User",  UserSchema);