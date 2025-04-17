import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface IUser {
  username: string;
  email: string;
  following: string[];
  followers: string[];
  joined: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  following: { type: [String], required: false, default: [] },
  followers: { type: [String], required: false, default: [] },
  joined: { type: Date, required: true, default: Date.now },
});

const User = model<IUser>("User", userSchema);

export default User;
