import express from "express";
import {
  CreateTask,
  DeleteTask,
  OneTask,
  ReadTask,
  UpdateTask,
} from "../controller/taskController.js";
import Auth from "../middleware/Auth.js";
const taskRouter = express.Router();

taskRouter.route("/task").get(Auth, ReadTask).post(Auth, CreateTask);

taskRouter
  .route("/task/:id")
  .patch(Auth, UpdateTask)
  .get(Auth, OneTask)
  .delete(Auth, DeleteTask);
export default taskRouter;
