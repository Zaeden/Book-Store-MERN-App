import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const DeleteBook = () => {

    const [loading, setLoading] = useState(false);

    const {id} = useParams();
    const navigation = useNavigate();

    const handleClick = (event) => {
        setLoading(true);
        axios.delete(`http://localhost:8000/books/${id}`)
        .then((response) => {
            console.log(response.data);
            setLoading(false);
            navigation('/');
        })
        .catch((error) => {
            setLoading(false);
            alert('Check the console for errors');
            console.log(error.message);
        })
    }

    return (
        <>
            <h1>Delete Book Page</h1>
            <BackButton />
            <div className='border border-blue-400 w-fit p-4 m-auto mt-10 flex flex-col'> 
                <p>Are you sure you want to delete this item?</p>
                <button className='border bg-red-600 text-white px-4 py-2 mt-10 rounded-full' onClick={handleClick}>Yes Delete It...!!!</button>
                {loading ? <Spinner /> : ''}
            </div>
        </>
    )
}

export default DeleteBook;