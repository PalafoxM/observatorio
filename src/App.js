import React, { useEffect, useState } from 'react';
import './Parallax.css';
import ContentSection from './components/ContentSection';
import ChartsSection from './components/ChartsSection';
//import Teatro from './assets/teareo_full.webp';
import Teatro from './assets/TEATRO_JUAREZ.png';
//import Pipila from './assets/pipila.png';
import Pipila from './assets/pipila_color.webp';
import Bufa from './assets/bufa.png';
import Casas from './assets/casas_color2.webp';
import Casas2 from './assets/casa_color2.webp';

const Parallax = () => {
  const [isMobile, setIsMobile] = useState(false);
  const layers = [
    { id: 0, src: Bufa, mobileDepth: 0 },
    { id: 1, src: Bufa, mobileDepth: 0 },
    { id: 2, src: Pipila, mobileDepth: 0.1 },
    { id: 3, src: Casas, mobileDepth: 0.2 },
    { id: 4, src: Casas2, mobileDepth: 0.3 },
    { id: 5, src: Casas, mobileDepth: 0.4 },
    { id: 6, src: Teatro, mobileDepth: 0 }
  ];

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    const handleScroll = () => {
      if (isMobile) return;
      
      const scrollPosition = window.pageYOffset;
      const layers = document.querySelectorAll('.parallax__layer');
      
      layers.forEach(layer => {
        const depth = isMobile 
          ? layer.getAttribute('data-mobile-depth') || 0 
          : layer.getAttribute('data-depth') || 0;
        const movement = -(scrollPosition * depth);
        const transform = `translate3d(0, ${movement}px, 0)`;
        layer.style.transform = transform;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [isMobile]);

  return (
    <div className="main-container">
      {/* Sección Parallax */}
      <div className="parallax">
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
           
        <ContentSection/>
   
           <ChartsSection/>
        <div className="parallax__cover"></div>
      </div>
   
    </div>
  );
};

export default Parallax;