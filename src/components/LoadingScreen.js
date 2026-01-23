import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <div className="loader-container">
                <div className="loader"></div>
                <p>Cargando experiencia...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;
