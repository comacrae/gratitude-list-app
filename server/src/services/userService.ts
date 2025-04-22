import mongoose from "mongoose";
import User from "../models/User";

const getUsers = async () => {
  const users = await User.find();
  return users;
};

//assumes id passed in can be cast to ObjectId
// returns null if no User matching Id is found
const getUserById = async (id: string) => {
  const user = await User.findById(id);
  return user;
};
