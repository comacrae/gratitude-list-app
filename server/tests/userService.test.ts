import { connectMongoose, teardownMongoClient } from "./utils";
import User from "../src/models/User";

beforeAll(() => {
  return connectMongoose();
});

afterAll(() => {
  return teardownMongoClient();
});

test("User Model init success", () => {
  const user = new User({ username: "test", email: "test" });
  expect(user.username).toBe("test");
  expect(user.email).toBe("test");
  expect(user.followers).toBe([]);
  expect(user.following).toBe([]);
  expect(user.joined).toBeTruthy();
});

test("User Model invalid init", () => {
  const user = new User({ username: null, email: 123 });
  expect(user.validate()).rejects.toThrow();
});

test("User Model CRUD success", async () => {
  const mockUser = new User({
    username: "mockusername",
    email: "mockemail",
  });

  //create
  await mockUser.save();

  //read
  const queriedUser = await User.findOne({ username: "mockusername" }).exec();
  expect(mockUser.username).toBe(queriedUser?.username);

  //update
  if (queriedUser !== null) {
    queriedUser.email = "newmockemail";
    await queriedUser.save();
  }

  const updatedUser = await User.findOne({ username: "mockusername" }).exec();

  expect(updatedUser?.email).toBe("newmockemail");

  //delete using deleteMany to be safe
  await User.deleteMany({
    username: "mockusername",
  }).exec();

  const shouldBeNull = await User.findOne({ username: "mockusername" }).exec();
  expect(shouldBeNull).toBeNull();
});
