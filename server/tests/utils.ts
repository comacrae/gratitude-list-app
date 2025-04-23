import { getMongoClient } from "../src/db/mongoConnector";
import fs from "fs";
import mongoose from "mongoose";

const getTestDeps = (path: string = `tests/tests_deps.json`) => {
  const json = fs.readFileSync(path, "utf-8");
  const parsed = JSON.parse(json);
  return parsed;
};

const teardownMongoClient = () => {
  mongoose.connection.close();
};

const connectMongoose = async () => {
  const uri: string = getTestDeps(`tests/tests_deps.json`).MONGO_URI;
  getMongoClient(uri).then((client) => {});
};

export { getTestDeps, teardownMongoClient, connectMongoose };
