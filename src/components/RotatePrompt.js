import React, { useEffect, useState } from 'react';
import './RotatePrompt.css';

const RotatePrompt = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkOrientation = () => {
            // Check if width is less than 768px (mobile) AND device is in portrait
            // window.innerHeight > window.innerWidth usually indicates portrait
            const isMobile = window.innerWidth <= 768;
            const isPortrait = window.innerHeight > window.innerWidth;

            if (isMobile && isPortrait) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Initial check
        checkOrientation();

        // Listen for resize/orientation change
        window.addEventListener('resize', checkOrientation);
        window.addEventListener('orientationchange', checkOrientation);

        return () => {
            window.removeEventListener('resize', checkOrientation);
            window.removeEventListener('orientationchange', checkOrientation);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className="rotate-prompt-overlay">
            <div className="rotate-prompt-content">
                <div className="phone-icon"></div>
                <h2>Por favor, gira tu dispositivo</h2>
                <p>Para una mejor experiencia visual, utiliza tu teléfono en modo horizontal.</p>
            </div>
        </div>
    );
};

export default RotatePrompt;
