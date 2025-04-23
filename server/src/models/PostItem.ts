import { Schema, model, Types } from "mongoose";

interface IPostItem {
  author: Types.ObjectId;
  post: Types.ObjectId;
  text: String;
}

const postItemSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  text: { type: String, required: true, trim: true, minLength: 1 },
});
const PostItem = model<IPostItem>("PostItem", postItemSchema);

export { PostItem, IPostItem };
