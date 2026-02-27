import React, { useEffect, useState } from 'react';
import './Parallax.css';
import ContentSection from './components/ContentSection';
import ChartsSection from './components/ChartsSection';
//import Teatro from './assets/teareo_full.webp';
//import Teatro from './assets/teatro5.png';
import Teatro from './assets/TEATRO_JUAREZ.png';
//import Pipila from './assets/pipila.png';
import Pipila from './assets/pipila_color.webp';
import Bufa from './assets/bufa.png';
import Casas from './assets/casas_color2.webp';
import Casas2 from './assets/casa_color2.webp';
import RotatePrompt from './components/RotatePrompt';
import LoadingScreen from './components/LoadingScreen';

const Parallax = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [shootingStars, setShootingStars] = useState([]);

  const layers = [
    { id: 0, src: Bufa, mobileDepth: 0 },
    { id: 1, src: Bufa, mobileDepth: 0 },
    { id: 2, src: Pipila, mobileDepth: 0.1 },
    { id: 3, src: Casas, mobileDepth: 0.2 },
    { id: 4, src: Casas2, mobileDepth: 0.3 },
    { id: 5, src: Casas, mobileDepth: 0.4 },
    { id: 6, src: Teatro, mobileDepth: 0 }
  ];

  /* Preload Images */
  useEffect(() => {
    const preloadImages = async () => {
      const promises = layers.map(layer => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = layer.src;
          img.onload = resolve;
          img.onerror = resolve; // Continue even if one fails
        });
      });

      // Also preload the cover image if possible, though it's CSS
      // We'll just wait for the layers for now

      try {
        await Promise.all(promises);
        // Add a small delay for smoothness
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
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

  useEffect(() => {
    // Estrella fugaz inicial al cargar
    const initialStars = [
      { id: 'init-1', x: '80%', y: '10%' }
    ];

    // Mostramos las iniciales con un pequeño retraso
    setTimeout(() => {
      setShootingStars(initialStars);
    }, 1000);

    // Limpiamos las iniciales
    setTimeout(() => {
      setShootingStars(prev => prev.filter(s => !s.id.toString().startsWith('init')));
    }, 3000);

    // Generador de estrellas aleatorias
    const interval = setInterval(() => {
      // 40% de probabilidad de que salga una estrella cada 3.5 segundos
      if (Math.random() > 0.6) {
        const newStar = {
          id: Date.now(),
          x: `${Math.floor(Math.random() * 80) + 20}%`, // 20% a 100% ancho
          y: `${Math.floor(Math.random() * 30)}%`, // 0% a 30% alto
        };
        setShootingStars(prev => [...prev, newStar]);

        // La eliminamos después de que termine la animación
        setTimeout(() => {
          setShootingStars(prev => prev.filter(s => s.id !== newStar.id));
        }, 2000);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

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
      overflow: 'hidden',
      backgroundColor: dynamicBgColor,
      backgroundImage: `url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner-background.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlendMode: 'multiply',
      position: 'relative'
    }}>
      {isLoading && <LoadingScreen />}
      <RotatePrompt />

      {/* Estrellas Fugaces */}
      {shootingStars.map(star => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            left: star.x,
            top: star.y
          }}
        ></div>
      ))}

      {/* Cuerpos celestes */}
      <div className="moon" style={{
        position: 'absolute',
        left: '50%',
        top: `${15 + scrollProgress * 40}%`,
        opacity: Math.min(1, 0.5 + scrollProgress * 1.5), // Empieza visible, y se aclara
        zIndex: 0
      }}></div>

      {/* Ocultamos la segunda luna original, ya que la primera ya bajará como si fuera el sol original */}
      <div className="moon" style={{
        display: 'none',
        position: 'absolute',
        left: '50%',
        top: `${60 - scrollProgress * 40}%`,
        opacity: Math.min(1, scrollProgress * 1.5),
        zIndex: 0
      }}></div>

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