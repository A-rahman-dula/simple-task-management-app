import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

const Task = mongoose.model('Task', TaskSchema);
export default Task;
