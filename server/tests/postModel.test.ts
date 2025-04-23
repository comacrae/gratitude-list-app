import { connectMongoose, teardownMongoClient } from "./utils";
import mongoose from "mongoose";
import { PostItem, IPostItem } from "../src/models/PostItem";
import { Post, IPost } from "../src/models/Post";
import { User, IUser } from "../src/models/User";

beforeAll(() => {
  connectMongoose();
});

afterAll(() => {
  return teardownMongoClient();
});

test("Post Model init success", async () => {
  const testUser = new User({
    _id: new mongoose.Types.ObjectId(),
    username: "test",
    email: "test@email.com",
  });
  await testUser.save();
  const testPost = new Post({
    author: testUser._id,
    postItems: [],
    isPublic: true,
  });
  await testPost.save();
  Post.findOne({ isPublic: true })
    .populate<{ author: IUser }>("author")
    .orFail()
    .then((post) => {
      expect(post?.author.username).toBe("test");
    });

  await testPost.deleteOne().exec();
});

/*test("Post Item Model init successs", async () => {
  const testUser = new User({
    _id: new mongoose.Types.ObjectId(),
    username: "test",
    email: "test@email.com",
  });
  await testUser.save();
  await testUser.deleteOne();
  /*testUser.postIds.push(testPost._id);
  const testPostItem = new PostItem({
    authorId: testUser._id,
    postId: testPost._id,
    text: "This is a test",
  });
  await testPostItem.save();
  testPost.postItemIds.push(testPostItem._id);
  

  //await testPostItem.deleteOne().exec();
  const queriedPost = Post.findById(testUser.postIds[0]).exec();
  expect(queriedPost).toBeNull;
});*/
