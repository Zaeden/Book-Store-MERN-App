import express from "express";
import cors from "cors";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Using cors for cross origin request
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("<h1> Book Store</h1>");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoURL)
  .then(() => {
    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`Server running at port no: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
