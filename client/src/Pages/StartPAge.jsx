import React from 'react';
import { useNavigate } from 'react-router-dom';

function StartPage() {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div
      style={{
        backgroundColor: '#34697d',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <div
        style={{
          width: '90%',
          maxWidth: '600px',
          textAlign: 'center',
          backgroundColor: '#123456',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        <h1>Welcome to the Book Reviewer</h1>
        <p>Choose where to go:</p>
        <div>
          <button
            onClick={() => handleNavigation('/home')}
            style={{
              margin: '10px',
              padding: '10px 20px',
              backgroundColor: 'yellow',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Go to Home
          </button>
          <button
            onClick={() => handleNavigation('/reviews/create')}
            style={{
              margin: '15px',
              padding: '10px 20px',
              backgroundColor: 'yellow',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          > Add Review</button> 
        
        </div>
      </div>
    </div>
  );
}

export default StartPage;
