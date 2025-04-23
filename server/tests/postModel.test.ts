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
  await Post.findOne({ author: testUser._id })
    .populate<{ author: IUser }>("author")
    .orFail()
    .then((post) => {
      const username: string = post.author.username;
      expect(username).toBe("test");
    });

  await User.deleteMany({ username: "test" }).exec();
  await Post.deleteMany();
  expect(await User.findOne({ username: "test" }).exec()).toBeNull();
  expect(await Post.findOne().exec()).toBeNull();
});

test("Post Item Model init successs", async () => {
  const testUser = new User({
    //_id: new mongoose.Types.ObjectId(),
    username: "test",
    email: "test@email.com",
  });
  await testUser.save();

  const testPost = new Post({
    author: testUser._id,
    postItems: [],
    isPublic: true,
  });

  testUser.posts.push(testPost._id);

  await testUser.save();

  const testPostItem = new PostItem({
    author: testUser._id,
    post: testPost._id,
    text: "This is a test",
  });
  await testPostItem.save();

  testPost.postItems.push(testPostItem._id);

  await testPost.save();

  const post = await Post.findById(testUser.posts[0])
    .populate<{ postItems: IPostItem[] }>("postItems")
    .orFail()
    .exec();

  expect(post.postItems.length).toBe(1);

  await PostItem.deleteMany({ author: testUser._id }).exec();

  await Post.findById(testUser.posts[0])
    .populate<{ postItems: IPostItem[] }>("postItems")
    .orFail()
    .exec()
    .then((post) => {
      expect(post.postItems.length).toBe(0);
    });

  await Post.deleteMany({ author: testUser._id }).exec();
  await User.deleteMany({ _id: testUser._id }).exec();
});
