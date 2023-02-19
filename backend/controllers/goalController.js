const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

// @desc Get goals
// @route  GEt api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find()
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
  goal.remove()
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}
