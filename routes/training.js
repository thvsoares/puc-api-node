var express = require('express');
var router = express.Router();
var User = require('../models/User');
var TrainingSheet = require('../models/TrainingSheet');
var mongoose = require('mongoose');

router.get('', function (req, res, next) {
    TrainingSheet.find({}, function (err, training) {
        if (err) {
            res.json(err);
        } else {
            res.json(training);
        }
    });
});

router.get('/:id', function (req, res, next) {
    TrainingSheet.findOne({ _id: req.params.id }, function
        (err, training) {
        if (err) {
            res.json(err);
        } else {
            res.json(training);
        }
    });
});

router.post('/', function (req, res, next) {
    User.findById(req.body.id, function (err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }
        var training = new TrainingSheet({
            _id: new mongoose.Types.ObjectId(),
            exercise: req.body.exercise,
            user: doc
        });
        training.save(function (err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json(result);
        });
    });
});

module.exports = router;