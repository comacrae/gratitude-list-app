import mongoose from "mongoose";
import { Types } from "mongoose";
import { User, IUser } from "../models/User";

const getUsers = () => {
  return User.find();
};

//assumes id passed in can be cast to ObjectId
// returns null if no User matching Id is found
const getUserById = async (id: Types.ObjectId) => {
  return User.findById(id).orFail();
};

const getUserByUsername = async (username: string) => {
  return User.findOne({ username: username }).orFail();
};

export { getUserById, getUserByUsername, getUsers };
