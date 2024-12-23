import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {
    const [Book_Title, setTitle] = useState('');
    const [Author, setAuthor] = useState('');
    const [Rating, setRating] = useState(0); // Default rating set to 0
    const [Review_Text, setReview] = useState('');
    const [loading, setLoading] = useState(false);

    const { id } = useParams(); // Get the review ID from the URL
    const navigate = useNavigate();

    // Fetch review data to edit
    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/api/bookreviews/${id}`)
            .then((response) => {
                
                setTitle(response.data.Book_Title);
                setAuthor(response.data.Author);
                setRating(response.data.Rating);
                setReview(response.data.Review_Text);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error('Error fetching review:', error);
            });
    }, [id]);

    // Handle review update
    const handleSaveReview = (e) => {
        e.preventDefault(); 
        const data = {
            Book_Title,
            Author,
            Rating,
            Review_Text,
            Date: new Date().toISOString(),
        };

        setLoading(true);
        axios
            .put(`http://localhost:5555/api/bookreviews/${id}`, data) 
            .then(() => {
                setLoading(false);
                navigate('/home');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred while updating the review');
                console.error(error);
            });
    };

    // Render star ratings
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    onClick={() => setRating(i)} 
                    style={{
                        fontSize: '2rem',
                        cursor: 'pointer',
                        color: i <= Rating ? '#FFD700' : '#ffff', 
                    }}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div style={{ width: '200%', maxWidth: '600px', margin: '0 auto', padding: '20px',marginLeft:'50vh' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit Review</h2>
            <form onSubmit={handleSaveReview} style={{padding:'60px',backgroundColor:"#cad4d9",borderRadius:'10px'}}>
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
                    <label htmlFor="rating" style={{ display: 'block', marginBottom: '5px' }}>Rating:</label>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        {renderStars()}
                    </div>
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
                    {loading ? 'Saving...' : 'Update Review'}
                </button>
            </form>
        </div>
    );
}

export default Edit;
