const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    role: String,
    started: {type: Boolean, default: false},
    finished: {type: Boolean, default: false},
    email:{
        type: String,
        unique: true
    },
    company: String,
    password: String,
    testEnabled: {type: Boolean, default: false},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    results: [{type: Object}]
});

module.exports = mongoose.model("User",  UserSchema);