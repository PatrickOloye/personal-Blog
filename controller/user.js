const express = require('express');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const asyncErrors = require('./errorController');

exports.getAllUser = asyncErrors(async (req, res, next) => {
  const users = await User.find();
  if (!users) return next(res.status(404).json('no users found'));
  return res.status(200).json({
    status: 'success',
    data: users,
  });
});

exports.signup = asyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const emailExists = await User.findOne({ email });
  // const userExists = await User.findOne({ userName });
  if (!name.trim() || !email.trim() || !password) {
    return next(res.status(400).json({ msg: 'please fill all fields' }));
  }
  if (emailExists)
    return next(res.status(400).json({ msg: 'user already exists' }));
  // if (userExists)
  //   return next(res.status(400).json({ msg: 'user already exists' }));

  const hashedPassword = bcrypt.hashSync(password);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });
  await newUser.save();
  return res.status;
});

exports.login = asyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (!userExists)
    return next(res.status(404).json({ msg: 'user does not exist' }));

  const passwordCorrect = bcrypt.compareSync(password, userExists.password);
  if (!passwordCorrect)
    return next(res.status(400).json({ msg: 'incorrect password' }));

  res.status(200).json({
    status: 'Login successful',
  });
});
