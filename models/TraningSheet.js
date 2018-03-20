var express = require('express');
var mongoose = require('mongoose');
var User = require('./User');

var trainingSheetSchema = mongoose.Schema({
    exercise: [{
        name: { type: String, required: true },
        repetitions: Number,
        weight: Number
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

var TrainingSheet = mongoose.model('TrainingSheet', trainingSheetSchema);

module.exports = TrainingSheet;