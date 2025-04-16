import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users";
import { getMongoClient } from "./db/mongoConnector";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI);

app.use(cors());
app.use(express.json());

getMongoClient(MONGO_URI);

//app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});

console.log();
