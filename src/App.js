import React, { useEffect, useState } from 'react';
import './Parallax.css';
import ContentSection from './components/ContentSection';
import ChartsSection from './components/ChartsSection';
//import Teatro from './assets/teareo_full.webp';
//import Teatro from './assets/teatro5.png';
import Teatro from './assets/Recurso_7.png';
import bannerBg from './assets/fondo2.png';
//import Pipila from './assets/pipila.png';
import templo from './assets/Recurso8.png';
import Bufa from './assets/Recurso4.png';
import piso from './assets/Recurso.png';

import RotatePrompt from './components/RotatePrompt';
import LoadingScreen from './components/LoadingScreen';

const Parallax = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const layers = [
    { id: 0, src: Bufa, mobileDepth: 0 },
    { id: 1, src: templo, mobileDepth: 0.1 },
    { id: 2, src: piso, mobileDepth: 0.2 },
    { id: 6, src: Teatro, mobileDepth: 0 }
  ];

  /* Preload Images */
  useEffect(() => {
    const preloadImages = async () => {

      const allImagesToPreload = [
        ...layers.map(layer => layer.src),
        bannerBg
      ];

      const promises = allImagesToPreload.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          // Continúa incluso si falla para no trabar la pantalla
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      try {
        await Promise.all(promises);
        // Quitamos el retraso artificial largo para acelerar la entrada
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading images", error);
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [isMobile]);

  const handleScroll = (e) => {
    if (!isMobile) {
      const layers = document.querySelectorAll('.parallax__layer');
      layers.forEach(layer => {
        const depth = layer.getAttribute('data-depth') || 0;
        const movement = -(e.target.scrollTop * depth);
        const transform = `translate3d(0, ${movement}px, 0)`;
        layer.style.transform = transform;
      });
    }

    // El evento scroll se captura desde el contenedor .parallax
    // Aquí controlamos la transición de fondo (350px de tope para la noche máxima).
    const scrollPosition = e.target.scrollTop;
    const progress = Math.min(scrollPosition / 350, 1);
    setScrollProgress(progress);
  };

  // Calcular color interpolado
  // Dia: Azul cielo (rgb(135, 206, 235)) -> Noche: Negro claro/Oscuro (rgb(10, 15, 30))
  const r = Math.round(135 - (135 - 10) * scrollProgress);
  const g = Math.round(206 - (206 - 15) * scrollProgress);
  const b = Math.round(235 - (235 - 30) * scrollProgress);
  const dynamicBgColor = `rgb(${r}, ${g}, ${b})`;

  return (
    <div className="main-container" style={{
      width: '100%',
      height: '100vh',
      top: '-20%',
      overflow: 'hidden',
      backgroundColor: dynamicBgColor,
      backgroundImage: `url(${bannerBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center 30%', // Shifted to lower the sky image
      backgroundBlendMode: 'multiply',
      position: 'relative'
    }}>
      {isLoading && <LoadingScreen />}
      <RotatePrompt />

      {/* Sección Parallax */}
      <div
        className="parallax"
        onScroll={handleScroll}
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in',
        }}
      >
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={`parallax__layer parallax__layer__${layer.id}`}
            data-depth={layer.id * 0.1}
            data-mobile-depth={layer.mobileDepth}
          >
            <img src={layer.src} alt={`Parallax layer ${layer.id}`} />
          </div>
        ))}

        <ContentSection />

        <ChartsSection />
        <div className="parallax__cover"></div>
      </div>

    </div>
  );
};

export default Parallax;