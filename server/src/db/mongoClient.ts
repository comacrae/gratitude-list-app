import { mongoose } from "mongoose";
import dotenv from "dotenv";

class MongoURIError implements Error {
  name: string;
  message: string;

  constructor(message: string) {
    this.name = "MongoURIError";
    this.message = message;
  }
}

export function getMongoClient(MONGO_URI: string) {
  if (MONGO_URI === null || MONGO_URI.length === 0) {
    throw new MongoURIError("Dotenv value null or empty");
  }
}
