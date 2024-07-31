import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h2>Oops! Something went wrong.</h2>
            <p>An error occurred while processing your request. Please try again later.</p>
            <button style={{ width: '150px' }} onClick={() => navigate('/')}>Go Back</button>
        </div>
    );
};

export default ErrorPage;
