import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Edit() {
    const [Book_Title, setTitle] = useState('');
    const [Author, setAuthor] = useState('');
    const [Rating, setRating] = useState('');
    const [Review_Text, setReview] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        setLoading(true)
        axios.get(`http://localhost:5555/api/bookreviews/${id}`)
        .then((response)=>{
            setAuthor(response.data.Author)
            setTitle(response.data.Book_Title)
            setRating(response.data.Review_Text)
            setReview(response.data.setRating)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])

    const handleSaveReview = (e) => {
        e.preventDefault(); // Prevent form submission reload
        const data = {
            Book_Title,
            Author,
            Rating,
            Review_Text,
            Date: new Date().toISOString(),
        };

        setLoading(true);
        axios.post('http://localhost:5555/api/bookreviews', data)
            .then(() => {
                setLoading(false);
                navigate('/home');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred while saving the review');
                console.log(error);
            });
    };

    return (
        <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit Review</h2>
            <form onSubmit={handleSaveReview}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>Book Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={Book_Title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            fontSize: '1rem',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="author" style={{ display: 'block', marginBottom: '5px' }}>Author:</label>
                    <input
                        type="text"
                        id="author"
                        value={Author}
                        onChange={(e) => setAuthor(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            fontSize: '1rem',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="rating" style={{ display: 'block', marginBottom: '5px' }}>Rating (1-5):</label>
                    <input
                        type="number"
                        id="rating"
                        value={Rating}
                        onChange={(e) => setRating(e.target.value)}
                        min="1"
                        max="5"
                        style={{
                            width: '100%',
                            padding: '10px',
                            fontSize: '1rem',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="review" style={{ display: 'block', marginBottom: '5px' }}>Review Text:</label>
                    <textarea
                        id="review"
                        value={Review_Text}
                        onChange={(e) => setReview(e.target.value)}
                        rows="4"
                        style={{
                            width: '100%',
                            padding: '10px',
                            fontSize: '1rem',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            resize: 'vertical',
                        }}
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    onClick={handleSaveReview}
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '1rem',
                        borderRadius: '5px',
                        backgroundColor: loading ? '#ccc' : '#007BFF',
                        color: '#fff',
                        border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer',
                    }}
                >
                    {loading ? 'Saving...' : 'Save Review'}
                </button>
            </form>


        </div>
    );
}

export default Edit;
