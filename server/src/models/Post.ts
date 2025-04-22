import { Schema, model, Types } from "mongoose";

interface IPost {
  author: Types.ObjectId;
  items: Types.ObjectId[];
  public: Boolean;
}

const postSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [Schema.Types.ObjectId], ref: "PostItem", required: true },
    public: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Post = model<IPost>("Post", postSchema);

export default Post;
