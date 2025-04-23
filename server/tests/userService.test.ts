import { User, IUser } from "../src/models/User";
import { connectMongoose, teardownMongoClient } from "./utils";
import {
  getUserById,
  getUserByUsername,
  getUsers,
} from "../src/services/userService";
import { Types } from "mongoose";

const testUser = new User({ username: "test", email: "test@email.com" });
beforeAll(async () => {
  await connectMongoose();
  await testUser.save();
});

afterAll(async () => {
  await User.deleteMany({ username: "test" });
  teardownMongoClient();
});

test("getUsers contains test user", async () => {
  const users = await getUsers();
  expect(users.length).toBeGreaterThanOrEqual(1);
});

test("getUsersById returns test user", async () => {
  const user = await getUserById(testUser._id);
  expect(user._id).toEqual(testUser._id);
});

test("getUsersById and getUserByUsername returns same  user", async () => {
  const userById = await getUserById(testUser._id);
  const userByUsername = await getUserByUsername(testUser.username);
  expect(userByUsername._id).toEqual(testUser._id);
  expect(userByUsername._id).toEqual(userById._id);
});

test("getUserById with invalid id throws error", async () => {
  expect(getUserById(new Types.ObjectId())).rejects.toThrow(
    new RegExp("No document found .*")
  );
});

test("getUserByUsername with invalid uname throws error", async () => {
  expect(getUserByUsername("idontexist")).rejects.toThrow(
    new RegExp("No document found .*")
  );
});
