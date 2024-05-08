import * as dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
const app: Express = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.json({ message: "hello world" });
});

const mongoURI: string | undefined = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("MongoDB URI is not present in env file");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => {
    app.listen(port, () => {
      console.log(`app is running @ port ${port}`);
    });
    console.log("connected to db");
  })
  .catch((error) =>
    console.error("something went wrong while connecting to db", error)
  );
