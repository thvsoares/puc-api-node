var express = require('express');
var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var userSchema = mongoose.Schema({
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    created: Date
});

userSchema.plugin(mongooseUniqueValidator);
var User = mongoose.model('User', userSchema);

module.exports = User;