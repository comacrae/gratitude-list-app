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
});

test("User Model invalid init", () => {
  const user = new User({ username: null, email: 123 });
  expect(user.validate()).rejects.toThrow();
});
