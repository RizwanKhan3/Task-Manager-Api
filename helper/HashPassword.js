import bcryptjs from 'bcryptjs'


const HashPassword = async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 8)
  }

  next()


}


export default HashPassword