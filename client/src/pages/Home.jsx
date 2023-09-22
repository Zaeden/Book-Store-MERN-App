import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const Home = () => {
  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/books")
      .then((response) => {
        console.log(response.data.data);
        setBookList(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">Book Lists</h1>
          <Link to="/books/create">
            <button class="rounded-full bg-cyan-950 text-white px-4 py-2">
              Add Book
            </button>
          </Link>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="border-collapse m-auto">
          <thead>
            <tr>
              <td className="border p-2">S No</td>
              <td className="border p-2">Title</td>
              <td className="border p-2">Author</td>
              <td className="border p-2">Publish Year</td>
              <td className="border p-2">Actions</td>
            </tr>
          </thead>
          <tbody>
            {/* Traversing the response data. */}
            {bookList.map((book, index) => {
              const { _id, title, author, publishYear } = book;
              return (
                <>
                  <tr key={_id} id={_id}>
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{title}</td>
                    <td className="border p-2">{author}</td>
                    <td className="border p-2">{publishYear}</td>
                    <td className="border p-2">
                      <Link to={`/books/details/${_id}`}>
                        <button className="rounded-full bg-sky-400 text-white px-4 py-2 m-2">
                          Show Book
                        </button>
                      </Link>
                      <Link to={`/books/edit/${_id}`}>
                        <button className="rounded-full bg-amber-300 text-white px-4 py-2 m-2">
                          Edit Book
                        </button>
                      </Link>
                      <Link to={`/books/delete/${_id}`}>
                        <button className="rounded-full bg-red-600 text-white px-4 py-2 m-2">
                          Delete Book
                        </button>
                      </Link>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Home;
