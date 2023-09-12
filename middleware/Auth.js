
import jwt from 'jsonwebtoken'
import UserModel from '../model/UserModel.js';
const privateKey = 'thisissecret'



const Auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')

    const decode = await jwt.verify(token, privateKey)

    const user = await UserModel.findOne({ _id: decode._id, 'tokens.token': token })
    if(!user){
      throw new Error()
    }
    req.user = user
    req.token = token
    next()
  } catch (error) {
    // console.log(error);
    res.status(401).json('Please Authenticate')
  }
}

export default Auth