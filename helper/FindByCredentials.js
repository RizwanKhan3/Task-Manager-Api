
import UserModel from '../model/UserModel.js'
import bcryptjs from 'bcryptjs'

const findByCredentials = async (email, password) => {

  try {
    const user = await UserModel.findOne({ email: email })
  if (!user) {
    throw new Error('User Not Found!')
  }
  const isMatch = await bcryptjs.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Wrong Password!')
  }
  return user
  } catch (error) {
    
  }
}


export default findByCredentials