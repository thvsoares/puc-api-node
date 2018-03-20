var express = require('express');
var router = express.Router();
var User = require('../models/User');
var mongoose = require('mongoose');
var passwordHash = require('password-hash');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
  User.find({}, function (err, user) {
    if (err) {
      res.json(err);
    } else {
      res.json(user);
    }
  });
});

router.get('/:id', function (req, res, next) {
  User.findOne({ _id: req.params.id }, function (err, user) {
    if (err) {
      res.json(err);
    } else {
      res.json(user);
    }
  });
});

router.post('/', function (req, res, next) {
  var user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: {
      firstName: req.body.firstName,
      lastName: req.body.lastName
    },
    password: passwordHash.generate(req.body.password),
    email: req.body.email,
    created: new Date()
  });
  user.save(function (err) {
    if (err) throw err;
    console.log('User successfully saved.');
    res.json(user);
  });
});

module.exports = router;