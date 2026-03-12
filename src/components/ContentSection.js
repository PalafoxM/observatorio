import React from 'react';
import './ContentSection.css';
import logo from '../assets/new_logo.png'
import cara from '../assets/cara.png'

const ContentSection = () => {
  return (
    <>
      <div className="content-section1">
        <div className="content-box1">
          {/*    <img src={cara} width={50} height={50} alt="Elemento Izquierdo" /> */}
        </div>
      </div>

      {/* Sección 2: Agregamos el botón "Entrar" aquí */}
      <div className="content-section2">
        <div className="content-box">
          <div style={{ textAlign: 'center', marginBottom: '15px' }}>

            <img src={logo} width={150} height={50} title='COFOTUR' />
          </div>
          <h3 style={{ color: '#fff' }}><p>Consulta de Proyectos Apoyados 2025</p> </h3>
          Este espacio tiene como propósito brindar información clara y accesible sobre la aplicación de los recursos provenientes del Impuesto por Servicios de Hospedaje,
          destinados a la promoción turística del estado durante el año 2025.<br />
          Aquí podrás consultar el nombre del beneficiario, el proyecto apoyado y el monto.

        </div>
      </div>

    </>
  );
};

export default ContentSection;