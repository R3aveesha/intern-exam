import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';

function Home() {
    const [Reviews, SetReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/api/bookreviews')
            .then((response) => {
                SetReviews(response.data.data)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
                setLoading(false);
            });
    }, []);

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        
        
    };

    const thTdStyle = {
        padding: '10px',
        textAlign: 'left',
        border: '1px solid #ddd',
    };

    const thStyle = {
        backgroundColor: '#f4f4f4',
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
        
        <div style={{width:'200%',height:'100vh',marginLeft:'20px',backgroundColor:''}}>
        <div style={{}}>
            <h3 style={{ fontSize: '2rem', textAlign: 'center' }}>ALL REVIEWS</h3>
            <Link to='/reviews/create' style={addReviewLinkStyle}>ADD Review</Link>

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
                    {Reviews.map((review, index) => (
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
