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
          <h3 style={{ color: '#fff' }}><p>Proyectos Apoyados 2025</p> </h3>
          ¿Sabías que cuando te hospedas en un hotel en Guanajuato, el 4% de lo que pagas se destina al Impuesto por Servicios de Hospedaje? Este recurso, aportado por turistas locales y foráneos, es utilizado para impulsar la promoción turística del estado a través de la Secretaría de Turismo e Identidad.
          En este espacio ponemos a tu disposición información clara y accesible sobre cómo se utilizan estos recursos, los cuales son asignados por las y los consejeros del Consejo del Fondo para la Promoción Turística (COFOTUR).
          Aquí podrás conocer qué personas y empresas recibieron apoyo, qué proyectos se impulsaron y los montos asignados durante el ejercicio 2025. También podrás consultar la información por motivo de viaje y por municipio beneficiado, para ver cómo se distribuyen estos recursos.


        </div>
      </div>

    </>
  );
};

export default ContentSection;