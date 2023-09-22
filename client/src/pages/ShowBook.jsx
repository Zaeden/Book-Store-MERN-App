import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const ShowBook = () => {
  const [bookDetail, setBookDetail] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/books/${id}`).then((res) => {
      setBookDetail(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <>
      <BackButton />
      <h1>Book Details are as follows: </h1>
      <div className="border-2 border-sky-500 flex flex-col	w-fit pr-10 pb-10 pt-2 pl-2">
        <p>{bookDetail.title}</p>
        <p>{bookDetail.author}</p>
        <p>{bookDetail.publishYear}</p>
      </div>
    </>
  );
};

export default ShowBook;
