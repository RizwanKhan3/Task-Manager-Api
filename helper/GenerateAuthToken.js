import jwt from 'jsonwebtoken'

const privateKey = 'thisissecret'

export const GenerateAuthToken = async function () {

  const user = this
  const token = await jwt.sign({ _id: user._id }, privateKey)
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}


