const express = require('express')
const router = express.Router()
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController')

router.route('/').get(getGoals).post(setGoal)
router.route('/:id').put(updateGoal).delete(deleteGoal)

/* //? TO write clean Code we can write this as in two lines because among 4 each 2 has same route
router.get("/", getGoals)
router.post("/", setGoal)

router.put("/:id", updateGoal)
router.delete("/:id", deleteGoal) 
 */

module.exports = router
