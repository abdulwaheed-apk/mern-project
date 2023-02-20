const express = require('express')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// @desc Register user
// @route  POST api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  // destructure values recieved from request's body
  const { name, email, password } = req.body

  // if any field is  not present through error
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Kindly Add Your details')
  }

  // check if user is unique(check if not already exist)
  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error('User With similar Email Already Exist')
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  // console.log('--- pass---', hashedPassword)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })
  // if user is created then send response according to that
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      // password: user.password,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})

// @desc Login user
// @route  POST api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  // Get User
  const user = await User.findOne({ email })

  // compare user of provided(above) email with password
  // we use bcrypt.compare bcz password is hashed
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})

// @desc Get user data
// @route  GET api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  res.send('Get user data')
})

// Generate JWT(token)

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}
