const mongoose = require('mongoose');
const Blog = require('./Blog');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
      min: 8,
    },
    userName: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    blogs: [
      {
        types: mongoose.Types.ObjectId,
        ref: 'Blog',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
