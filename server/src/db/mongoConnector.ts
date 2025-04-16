import mongoose from "mongoose";
import dotenv from "dotenv";

class MongoInitConnectionError implements Error {
  name: string;
  message: string;

  constructor(message: string) {
    this.name = "MongoInitConnectionError";
    this.message = message;
  }
}

export async function getMongoClient(MONGO_URI: string | undefined) {
  if (mongoose.connection.readyState != 0) {
    throw new MongoInitConnectionError(
      "Mongo connection not ready to connect."
    );
  }

  if (MONGO_URI === null || typeof MONGO_URI === "undefined") {
    throw new MongoInitConnectionError("Dotenv value null");
  } else if (MONGO_URI?.length === 0) {
    throw new MongoInitConnectionError("Dotenv value empty");
  } else {
    await mongoose.connect(MONGO_URI);
    return true;
  }
}
