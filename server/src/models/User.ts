import { Schema, model, Types } from "mongoose";
/*
Class represents a user
username must be unique
email must be verified
following/followers are lists of usernames
posts are lists of post ids
*/

interface IUser {
  username: string;
  email: string;
  following: Types.ObjectId[];
  followers: Types.ObjectId[];
  posts: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true } // adds createdAt and updatedAt Date
);

const User = model<IUser>("User", userSchema);

export { User, IUser };
