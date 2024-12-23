import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create() {
    const [Book_Title, setTitle] = useState('');
    const [Author, setAuthor] = useState('');
    const [Rating, setRating] = useState(0); 
    const [Review_Text, setReview] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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

    const handleStarClick = (starValue) => {
        setRating(starValue);
    };

    return (
        <div style={{backgroundColor:"#e6edf0"}}>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
        }}>
            <div style={{
                width: '20vw',
                height: '80vh',
                padding: '20px',
            }}>
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '20px',
                }}>Create Review</h2>
                <form onSubmit={handleSaveReview}>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="title" style={{
                            display: 'block',
                            marginBottom: '5px',
                        }}>Book Title:</label>
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
                        <label htmlFor="author" style={{
                            display: 'block',
                            marginBottom: '5px',
                        }}>Author:</label>
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
                        <label style={{
                            display: 'block',
                            marginBottom: '5px',
                        }}>Rating:</label>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '5px',
                        }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => handleStarClick(star)}
                                    style={{
                                        fontSize: '2rem',
                                        color: star <= Rating ? '#FFD700' : '#ccc',
                                        cursor: 'pointer',
                                    }}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <p style={{
                            textAlign: 'center',
                            marginTop: '5px',
                            fontSize: '1rem',
                        }}>Rating: {Rating}</p>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="review" style={{
                            display: 'block',
                            marginBottom: '5px',
                        }}>Review Text:</label>
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
                        {loading ? 'Saving...' : 'Save Review'}
                    </button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default Create;
