import mongoose from 'mongoose';



const TaskSchema = new mongoose.Schema({
  description: {
    type:String,
    required: true,
    trim:true
  },
  isCompleted: {
    type:String,
    default: false
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})



const TaskModel = mongoose.model('Task', TaskSchema)

export default TaskModel