import TaskModel from "../model/TaskModel.js";

const CreateTask = async (req, res) => {
  try {
    const task = await TaskModel.create({
      ...req.body,
      owner: req.user._id,
    });
    if (!task) {
      throw new Error("Task Not Created!");
    }
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Read Task

const ReadTask = async (req, res) => {
  try {
    // const task = await TaskModel.find({ owner: req.user._id });

    // if (!task) {
    //   return res.status(404).json({ msg: "Tasks Not Found!" });
    // }
    // above Code Also Work
    await req.user.populate("tasks");
    res.status(200).json(req.user.tasks);
  } catch (error) {
    await res.status(500).json({ error: error.message });
  }
};

const UpdateTask = async (req, res) => {
  try {
    const task = await TaskModel.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id,
      },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ msg: "Tasks Not Found!" });
    }

    res.status(200).json(task);
  } catch (error) {
    await res.status(500).json({ error: error.message });
  }
};

const OneTask = async (req, res) => {
  try {
    const task = await TaskModel.find({ _id: req.params.id });

    if (!task) {
      return res.status(404).json({ msg: "Tasks Not Found!" });
    }

    res.status(200).json(task);
  } catch (error) {
    await res.status(500).json({ error: error.message });
  }
};

const DeleteTask = async (req, res) => {
  try {
    const task = await TaskModel.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ msg: "Tasks Not Found!" });
    }
    res.status(200).json(task);
  } catch (error) {
    await res.status(500).json({ error: error.message });
  }
};
export { CreateTask, ReadTask, UpdateTask, OneTask, DeleteTask };
