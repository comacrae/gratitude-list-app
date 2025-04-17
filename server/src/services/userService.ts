import mongoose from "mongoose";
import User from "../models/User";

const getUsers = async () => {
  const users = await User.find();
  return users;
};
