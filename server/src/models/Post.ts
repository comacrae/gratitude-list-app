import { Schema, model, Types } from "mongoose";

/*
Represents a gratitude list; contains post-items
this will allow for items to be back-referenced in the future w/o drilling down
*/

interface IPost {
  author: Types.ObjectId;
  postItems: Types.ObjectId[]; //object id of post-items
  isPublic: Boolean; // public or private
}

const postSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "PostItem",
      },
    ],
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Post = model<IPost>("Post", postSchema);

export { Post, IPost };
