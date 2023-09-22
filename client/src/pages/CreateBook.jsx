import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Spinner from '../components/Spinner';

const CreateBook = () => {

    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        publishYear: ''
    });

    const [loading, setLoading] = useState(false);


    const navigation = useNavigate();

    const changeHandler = (event) => {
        const {name, value} = event.target;
        setNewBook((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = (event) => {
        setLoading(true);
        axios.post('http://localhost:8000/books', newBook)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error.message);
        });
        setLoading(false);
        navigation('/');
    }

  return (
    <>
      <h1>Create Book Page</h1>

      <div className="flex flex-col items-center border w-fit p-4 m-auto border-slate-300">
      <input type="text" name="title" value={newBook.title} onChange={changeHandler} required className="border mb-4 w-[400px]" />
      

      <input type="text" name="author" value={newBook.author} onChange={changeHandler} required className="border mb-4 w-[400px]" />

      <input type="number" name="publishYear" value={newBook.publishYear} onChange={changeHandler} required className="border w-[400px]" />
      
      <button onClick={handleSubmit} className="border border-blue-400 px-4 py-2 mt-4">
        Submit
      </button>
      {loading ? <Spinner /> : ''}
      </div>
    </>
  );
};

export default CreateBook;
