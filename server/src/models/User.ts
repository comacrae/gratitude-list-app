import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface IUser {
  username: string;
  email: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;
