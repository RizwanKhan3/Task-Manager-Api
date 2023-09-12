import express from 'express'
import { CreateUser, DeleteUser, LoggedIn, LoginUser, UpdateUserProfile, logOutUser } from '../controller/userController.js'
import Auth from '../middleware/Auth.js'
const userRouter = express.Router()

userRouter.route('/register')
  .post(CreateUser)

userRouter.route('/login')
  .post(LoginUser)

userRouter.route('/me')
  .post(Auth, LoggedIn)
  .patch(Auth, UpdateUserProfile)
  .delete(Auth, DeleteUser)
userRouter.route('/logout')
  .post(Auth, logOutUser)


export default userRouter