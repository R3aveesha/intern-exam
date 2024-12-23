import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Delete() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDelete = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5555/api/bookreviews/${id}`)
            .then(() => {
                setLoading(false);
                navigate('/home');
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };

    return (
        <div style={{ width: '100%', maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '1.5rem', color: '#333' }}>Are you sure you want to delete this review?</h3>
            <button
                onClick={handleDelete}
                disabled={loading}
                style={{
                    padding: '10px 20px',
                    fontSize: '1rem',
                    backgroundColor: loading ? '#ccc' : '#FF4D4D',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    marginRight: '10px',
                }}
            >
                {loading ? 'Deleting...' : 'Yes, delete it'}
            </button>
           
                Cancel
        </div>
    );
}

export default Delete;
