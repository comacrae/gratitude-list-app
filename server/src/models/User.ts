import { Schema, model } from "mongoose";

interface IUser {
  username: string;
  email: string;
  following: string[];
  followers: string[];
  posts: string[];
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    following: { type: [String], required: false, default: [] },
    followers: { type: [String], required: false, default: [] },
    posts: { type: [String], required: false, default: [] },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;
