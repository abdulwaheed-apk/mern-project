const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController')
const { verifyToken } = require('../middleware/verifyTokenMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', verifyToken, getMe)

module.exports = router
