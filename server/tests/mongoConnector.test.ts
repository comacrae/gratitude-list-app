import fs from "fs";
import { getMongoClient } from "../src/db/mongoConnector";
import mongoose from "mongoose";

const getMongoURI = (path: string): string => {
  const json = fs.readFileSync(path, "utf-8");
  const parsed = JSON.parse(json);
  return parsed.MONGO_URI;
};

const teardownMongoClient = () => {
  mongoose.connection.close();
};

test("getMongoClient success", () => {
  const uri: string = getMongoURI(`tests/tests_deps.json`);
  getMongoClient(uri).then((result) => {
    expect(result).toBe(true);
    teardownMongoClient();
  });
});
