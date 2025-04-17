import { Schema, model } from "mongoose";

interface IPost {
  author: string;
  created: Date;
  items: String[];
}

const postSchema = new Schema(
  {
    author: { type: String, required: true },
    items: { type: String, required: true },
  },
  { timestamps: true }
);
