import UserModel from '../model/UserModel.js'
import { UserCreateCheck } from '../helper/ChechkAllowedData.js'
import TaskModel from '../model/TaskModel.js'
const CreateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await UserModel.create({ name, email, password })
    res.status(201).json(user)
  } catch (error) {
    console.log(error);
    res.status(400).json({ err: error.message })
  }
}

// >===================Login User ===================<
const LoginUser = async (req, res) => {
  try {
    const { password, email } = req.body
    const user = await UserModel.findByCredentials(email, password)

    if (!user) {
      return res.status(404).json({ msg: 'User Not Found' })
    }
    const token = await user.generateAuthToken()
    res.status(201).json({ user, token })
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message)
  }
}

// >===================Update User Profile User ===================<
const UpdateUserProfile = async (req, res) => {
  try {
    const updates = Object.keys(req.body)
    const user = await UserModel.findById(req.user._id)
    if (!user) {
      throw new Error('User Cant!')
    }
    updates.forEach(update => user[update] = req.body[update])
    await user.save()
    res.status(201).json(req.user)
  } catch (error) {

    res.status(500).json({ err: error.message })
  }
}
// >=================== Token Login ===================<
const LoggedIn = async (req, res) => {
  try {

    res.status(200).send(req.user)

  } catch (error) {

    res.status(500).json({ err: error.message })
  }
}

// >===================Delete User ===================<
const DeleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.user._id)

    if (!user) {
      res.status(404).json({ msg: 'User Already Not Registered!' })
    }
    await TaskModel.deleteMany({owner: req.user._id})
    res.status(204).send()
  } catch (error) {

    res.status(500).json({ err: error.message })
  }
}

const logOutUser = async (req, res) => {

  try {
    req.user.tokens = await req.user.tokens.filter(token => token.token !== req.token)
    req.user.save()
    res.status(204).send()
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error.message })
  }
}

export {
  CreateUser,
  LoginUser,
  UpdateUserProfile,
  LoggedIn,
  DeleteUser,
  logOutUser
}