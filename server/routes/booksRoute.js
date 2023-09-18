import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Route to save new books
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res
        .status(400)
        .send("Send all required data : title, author, publishYear");
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route for getting all the books.
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(201).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//Route to get one book by using id.
router.get("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res
        .status(400)
        .send("Enter all required data : title, author, publishYear");
    }

    const id = req.params.id;

    const bookName = await Book.findById(id);
    res.status(201).json(bookName);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Rout to update book details.
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (result) {
      res.status(201).send({ message: "Updated Successfully" });
    } else {
      res.status(401).send({ message: "Update Unsuccessful" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (result) {
      res.status(201).send({ message: "Deleted Successfully" });
    } else {
      res.status(401).send({ message: "Delete Unsuccessful" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
