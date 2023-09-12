import mongoose from 'mongoose'
const ConnectDB = async (url) => {
  try {
    await mongoose.connect(url)
    if (!mongoose.connection) {
      throw new Error()
    }
    console.log(`Database Connected! 🐱‍🏍`);
  } catch (error) {
    console.log(`Database iS Not Connected!`);
  }


}
export default ConnectDB