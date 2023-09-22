import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';


const EditBook = () => {

    const {id} = useParams();

    const [editBook, setEditBook] = useState({
        title: '',
        author: '',
        publishYear: ''
    });

    const [loading, setLoading] = useState(false);


    const navigation = useNavigate();


    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8000/books/${id}`)
        .then((response) => {
            setEditBook({
                title: response.data.title,
                author: response.data.author,
                publishYear: response.data.publishYear
            })
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const changeHandler = (event) => {
        const {name, value} = event.target;
        setEditBook((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = (event) => {
        setLoading(true);
        axios.put(`http://localhost:8000/books/${id}`, editBook)
        .then((response) => {
            console.log(response.data);
            setLoading(false);
            navigation('/');
        })
        .catch((error) => {
            console.log(error.message);
            setLoading(false);
        });
    }

  return (
    <>
      <h1>Edit Book</h1>

      <BackButton />

      <div className="flex flex-col items-center border w-fit p-4 m-auto border-slate-300">
      Title: <input type="text" name="title" value={editBook.title} onChange={changeHandler} required className="border mb-4 w-[400px]" />
      

      Author: <input type="text" name="author" value={editBook.author} onChange={changeHandler} required className="border mb-4 w-[400px]" />

      Publish Year: <input type="number" name="publishYear" value={editBook.publishYear} onChange={changeHandler} required className="border w-[400px]" />
      
      <button onClick={handleSubmit} className="border border-blue-400 px-4 py-2 mt-4">
        Submit
      </button>
      {loading ? <Spinner /> : ''}
      </div>
    </>
  );
}

export default EditBook;