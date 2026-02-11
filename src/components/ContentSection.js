import React from 'react';
import './ContentSection.css';
import logo from '../assets/new_logo.png'
import logo2 from '../assets/logo.png'

const ContentSection = () => {
  return (
    <>
      <div className="content-section1">
        <div className="content-box1">
          <img src={logo} width={250} height={250} title='COFOTUR' />
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

      <a className="btn-entrar" href='https://secturnet.guanajuato.gob.mx/cofotu/' >
        Entrar
      </a>

    </>
  );
};

export default ContentSection;