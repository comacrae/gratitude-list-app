import mongoose from "mongoose";
import { connectMongoose, teardownMongoClient } from "./utils";

test("getMongoClient success", () => {
  connectMongoose().then(() => {
    expect(mongoose.connection.readyState).toBe(1);
    teardownMongoClient();
  });
});
