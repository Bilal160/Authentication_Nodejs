import  express from 'express'
import { ActivateAccount } from '../controllers/Authentication/AcativateAccount.js'
import { LoginUser } from '../controllers/Authentication/LoginUser.js'
import { RegisterUser } from '../controllers/Authentication/RegisterUser.js'

const router = express.Router()

// Register User
router.post('/register',RegisterUser)
// Login User
router.post('/login',LoginUser) 
// Activate Account User
router.post('/account-activation/:id/:token', ActivateAccount)

export default router