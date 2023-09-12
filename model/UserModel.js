import mongoose from "mongoose";
import validator from "validator";
import HashPassword from "../helper/HashPassword.js";
import { GenerateAuthToken } from "../helper/GenerateAuthToken.js";
import findByCredentials from "../helper/FindByCredentials.js";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email!");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password does not contain password!");
      }
      if (value.length < 8) {
        throw new Error("Password must be Eight(8) character Long!");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//>=============Hash Password=============<
UserSchema.pre("save", HashPassword);

//>=============Generate Auth Token=============<

UserSchema.methods.generateAuthToken = GenerateAuthToken;

//>=============Find By Credentials =============<
UserSchema.statics.findByCredentials = findByCredentials;

UserSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
