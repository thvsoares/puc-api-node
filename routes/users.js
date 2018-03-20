var express = require('express');
var router = express.Router();
var User = require('../models/User');
var mongoose = require('mongoose');
var passwordHash = require('password-hash');

router.get('/', function (req, res, next) {
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

router.post('/signin', function (req, res, next) {
  console.log(req.body.email)
  User
    .findOne({ email: req.body.email }, function (err, doc) {
      if (err) {
        return res.status(404).json({
          title: 'An error occurred',
          error: err
        });
      }
      if (!doc) {
        return res.status(404).json({
          title: 'No user found',
          error: { message: 'User could not be found' }
        });
      }
      if (!passwordHash.verify(req.body.password, doc.password)) {
        return res.status(404).json({
          title: 'Could not signin',
          error: { message: 'Invalid User and/or Password' }
        });
      }

      //User authenticated
      res.status(200).json({
        message: 'Success',
        userId: doc._id
      });
    });
});

module.exports = router;