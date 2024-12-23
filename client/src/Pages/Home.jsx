import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';

function Home() {
    const [Reviews, SetReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchDate, setSearchDate] = useState('');

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/api/bookreviews')
            .then((response) => {
                SetReviews(response.data.data);
                setFilteredReviews(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
                setLoading(false);
            });
    }, []);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchDate(value);
        
        // Filter reviews by the entered date
        if (value) {
            const filtered = Reviews.filter(review => 
                review.Date && review.Date.includes(value)
            );
            setFilteredReviews(filtered);
        } else {
            setFilteredReviews(Reviews); // If search is cleared, show all reviews
        }
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        borderRadius: '10px'
    };

    const thTdStyle = {
        padding: '10px',
        textAlign: 'left',
        border: '1px solid #ddd',
        backgroundColor: "#cad4d9"
    };

    const thStyle = {
        backgroundColor: '#cad4d9',
    };

    const addReviewLinkStyle = {
        textDecoration: 'none',
        display: 'inline-block',
        margin: '10px 0',
        padding: '10px',
        backgroundColor: '#ffcc00',
        color: '#000',
        fontWeight: 'bold',
        borderRadius: '5px',
        textAlign: 'center',
    };

    return (
        <div style={{ width: '200%', height: '100vh', marginLeft: '20px', backgroundColor: '' }}>
            <div>
                <h3 style={{ fontSize: '2rem', textAlign: 'center' }}>ALL REVIEWS</h3>
                <Link to='/reviews/create' style={addReviewLinkStyle}>ADD Review</Link>

                {/* Search Filter for Date */}
                <input 
                    type="text" 
                    placeholder="Search by date..." 
                    value={searchDate} 
                    onChange={handleSearchChange} 
                    style={{
                        padding: '8px', 
                        marginBottom: '20px', 
                        width: '200px', 
                        border: '1px solid #ddd', 
                        borderRadius: '5px'
                    }} 
                />

                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={{ ...thTdStyle, ...thStyle }}>No</th>
                            <th style={thTdStyle}>Book Name</th>
                            <th style={thTdStyle}>Author</th>
                            <th style={thTdStyle}>Rating</th>
                            <th style={thTdStyle}>Review</th>
                            <th style={thTdStyle}>Date</th>
                            <th style={thTdStyle}>Options</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredReviews.map((review, index) => (
                            <tr key={review._id}>
                                <td style={thTdStyle}>{index + 1}</td>
                                <td style={thTdStyle}>{review.Book_Title}</td>
                                <td style={thTdStyle}>{review.Author}</td>
                                <td style={thTdStyle}>{review.Rating}</td>
                                <td style={thTdStyle}>{review.Review_Text}</td>
                                <td style={thTdStyle}>{review.Date}</td>
                                <td style={thTdStyle}>
                                    <Link to={`/reviews/edit/${review._id}`} style={{ marginRight: '10px' }}>
                                        <AiOutlineEdit />
                                    </Link>
                                    <Link to={`reviews/delete/${review._id}`}>
                                        <MdOutlineDelete />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
    