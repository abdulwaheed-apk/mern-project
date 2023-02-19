const asyncHandler = require('express-async-handler')
// @desc Get goals
// @route  GEt api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get Goals' })
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

  res.status(200).json({ message: 'Create Goal' })
})

// @desc update goals
// @route  PUT api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Goal with id ${req.params.id}` })
})

// @desc Delete goals
// @route  DELETE api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Goal with id ${req.params.id}` })
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}
