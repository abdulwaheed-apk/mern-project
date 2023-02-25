const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc Get goals
// @route  GEt api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id })
  res.status(200).json(goals)
})

// @desc Set goals
// @route  POST api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  console.log(req.body)
  if (!req.body.text) {
    res.status(400)
    throw new Error('please add a text field')
  }
  const newGoal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(newGoal)
})

// @desc update goals
// @route  PUT api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error('Select a Goal To update')
  }
  // first we will get user
  const user = await User.findById(req.user.id) // As we have access to user.id due to middleware (verifyToken)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  // ! below here
  // as we are getting goal  from Goal Model and which has user key
  // and we are storing user id in goal model means goal.user == id of user who created goal
  // in userController  getMe we specified id from _id userController.js ln 64
  // and converting to string so that we can compare
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('You are not authorized to update other users goal')
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedGoal)
})

// @desc Delete goals
// @route  DELETE api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error('Select a goal to delete.')
  }
  const user = await User.findById(req.user.id) // As we have access to user.id due to middleware (verifyToken)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('You are not authorized to update other users goal')
  }

  goal.remove()
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}
