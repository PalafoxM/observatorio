import React from 'react';
import './ContentSection.css';
import logo from '../assets/logo_cofotur.png'
import logo2 from '../assets/logo-guanajuato.png'

const ContentSection = () => {
  return (
    <>
      <div className="content-section1">
        <div className="content-box1">
          <img src={logo} width={150} height={150} title='COFOTUR' />
        </div>
      </div>
      
      {/* Sección 2: Agregamos el botón "Entrar" aquí */}
      <div className="content-section2">
        <div className="content-box">
          <h3><p>Objetivo del Programa</p> </h3>
          Fortalecer el posicionamiento turístico de Guanajuato a nivel estatal, nacional e internacional mediante acciones de promoción alineadas con la estrategia de la SECTURI.
          
        </div>
      </div>
      
      <div className="content-section3">
        <div className="content-box3">
          <img src={logo2} width={180} height={75} title='COFOTUR' />
        </div>
      </div>

      <a className="btn-entrar" href='http://localhost/cofotu' >
            Entrar
        </a>
      
    </>
  );
};

export default ContentSection;