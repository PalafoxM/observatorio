import React, { useMemo, useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import './ChartsSection.css';
import logo from '../assets/logo.png';
import guanajuatoGeoJson from '../assets/edo_guanajuato.geo.json';

// Registrar mapa globalmente
echarts.registerMap('Guanajuato', guanajuatoGeoJson);

const ChartsSection = () => {
  const [hoveredMunicipio, setHoveredMunicipio] = useState(null);
  const [clickedMunicipio, setClickedMunicipio] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Proyectos Integrales');
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterMotivo, setFilterMotivo] = useState('Todos');
  const [filterMunicipio, setFilterMunicipio] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const [showMapAnimation, setShowMapAnimation] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMapAnimation(prev => !prev);
    }, 4000); // 4 seconds interval to mimic the transition Example
    return () => clearInterval(interval);
  }, []);


  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setFilterMotivo('Todos');
    setFilterMunicipio('Todos');
    setSelectedProject(null);
    setClickedMunicipio(null);
    setSearchQuery('');
  };

  // ==================== DATOS COMPLETOS DEL EXCEL ====================
  const data = {
    name: 'Sesiones Ordinarias 2025',
    children: [
      {
        name: 'Primera Ordinaria',
        fecha: 'Miércoles, 5 de marzo de 2025',
        children: [
          { name: 'Forever Wedding Summit', value: 486939.44, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Acciones de relaciones públicas y promoción', motivo1: 'Romance', motivo2: 'Romance', municipios: ['Multidestino'] },
          { name: 'Congreso Nacional de la Industria de Reuniones', value: 728346.30, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Impulso y Fortalecimiento al Segmento de Turismo de Reuniones', motivo1: 'MICE', motivo2: 'MICE', municipios: ['Multidestino'] },
          { name: 'Meeting Place León', value: 2936419.50, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['León'] },
          { name: 'Congreso MPI', value: 117594.48, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Impulso y Fortalecimiento al Segmento de Turismo de Reuniones', motivo1: 'MICE', motivo2: 'MICE', municipios: ['Multidestino'] },
          { name: 'Congreso De Bodas y Eventos Sustentables LAT', value: 321219.20, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Impulso y Fortalecimiento al Segmento de Turismo de Reuniones', motivo1: 'Romance', motivo2: 'Romance', municipios: ['Multidestino'] },
          { name: 'PCMA Advisory Client Roadshow', value: 941824.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['Multidestino'] },
          { name: 'Neextt Unique Hotels & Destinations SMA 2025', value: 458200.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Acciones de relaciones públicas y promoción', motivo1: 'Multimotivo de viaje', motivo2: 'Deportivo, Cultural, Enológico, Destilados, Wellness, MICE, Romance, Naturaleza, Gastronómico', municipios: ['San Miguel de Allende'] },
          { name: 'Plan de Medios SECTURI 2025', value: 3882868.72, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Herramientas de promoción y difusión', motivo1: 'Multimotivo de viaje', motivo2: 'Deportivo, Cultural, Enológico, Destilados, Wellness, MICE, Romance, Naturaleza, Gastronómico', municipios: ['Todo el Estado'] },
          { name: 'Alianza comercial Expedia 2025', value: 2000000.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Alianzas Estratégicas', motivo1: 'Multimotivo de viaje', motivo2: 'Deportivo, Cultural, Enológico, Destilados, Wellness, MICE, Romance, Naturaleza, Gastronómico', municipios: ['Todo el Estado'] },
          { name: 'Alianza comercial Planet IFE 2025', value: 2691199.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Alianzas Estratégicas', motivo1: 'Multimotivo de viaje', motivo2: 'Deportivo, Cultural, Enológico, Destilados, Wellness, MICE, Romance, Naturaleza, Gastronómico', municipios: ['Todo el Estado'] },
          { name: 'Festival Endémico 2025', value: 4000000.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Eventos Especiales', motivo1: 'Gastronómico', motivo2: 'Gastronómico', municipios: ['Multidestino'] },
          { name: '13° Encuentro de Cocina Tradicional Guanajuato ¡Sí Sabe!', value: 3205500.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Eventos Especiales', motivo1: 'Gastronómico', motivo2: 'Gastronómico', municipios: ['Multidestino'] },
        ],
      },
      {
        name: 'Segunda Ordinaria',
        fecha: 'Lunes, 24 de marzo de 2025',
        children: [
          { name: 'Red Bull Guanajuato Cerro Abajo', value: 1200000.00, beneficiario: 'Javier García Gómez', concepto: 'Eventos Especiales', motivo1: 'Multimotivo de viaje', motivo2: 'Cultural, Wellness, Romance, Gastronómico', municipios: ['Guanajuato'] },
          { name: 'La Carrera Panamericana 2025', value: 700000.00, beneficiario: 'Promostage SA de CV', concepto: 'Eventos Especiales', motivo1: 'Deportivo', motivo2: 'Deportivo', municipios: ['Guanajuato'] },
          { name: 'Copa Ave Fénix 2025', value: 150000.00, beneficiario: 'Catalina Sandoval Lara', concepto: 'Eventos Especiales', motivo1: 'Deportivo', motivo2: 'Deportivo', municipios: ['Guanajuato'] },
          { name: 'Open International 2025', value: 500000.00, beneficiario: 'Fundacion Adis Apoyando la Discapacidad', concepto: 'Eventos Especiales', motivo1: 'Deportivo', motivo2: 'Deportivo', municipios: ['Celaya'] },
          { name: 'Maratón Capital', value: 450000.00, beneficiario: 'Avalon Digital SC', concepto: 'Eventos Especiales', motivo1: 'Deportivo', motivo2: 'Deportivo', municipios: ['Guanajuato'] },
          { name: '3er. Festival Internacional la Mujer a Caballo', value: 400000.00, beneficiario: 'Municipio de Apaseo el Grande', concepto: 'Eventos Especiales', motivo1: 'Deportivo', motivo2: 'Deportivo', municipios: ['Apaseo el Grande'] },
          { name: 'Ultra Guanajuato', value: 200000.00, beneficiario: 'Ultra Trail Mexico Series SA. DE CV.', concepto: 'Eventos Especiales', motivo1: 'Deportivo', motivo2: 'Deportivo', municipios: ['Guanajuato'] },
          { name: 'Copa Sultanes 3era Edición', value: 200000.00, beneficiario: 'Oscar Daniel Sanchez Macias', concepto: 'Eventos Especiales', motivo1: 'Deportivo', motivo2: 'Deportivo', municipios: ['León'] },
          { name: 'Candelabrum Metal Fest IV', value: 800000.00, beneficiario: 'Eduardo Jacobo Córdova Lucas', concepto: 'Eventos Especiales', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['León'] },
          { name: 'Festival Estatal Pride León Ofarrell', value: 250000.00, beneficiario: 'Julio César Ceja Guzmán', concepto: 'Eventos Especiales', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['León'] },
          { name: 'Salva Rock Festival Multicultural VII 2025', value: 100000.00, beneficiario: 'Jesús Palmerín Ortiz', concepto: 'Eventos Especiales', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['Salvatierra'] },
          { name: 'Festival del día de muertos "Camino al Mictlán"', value: 300000.00, beneficiario: 'Municipio Valle de Santiago', concepto: 'Eventos Especiales', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['Valle de Santiago'] },
          { name: 'Senda del Arriero del Camino Real Tierra Adentro', value: 300000.00, beneficiario: 'Municipio de Ocampo', concepto: 'Herramientas de promoción y difusión', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['Ocampo'] },
          { name: 'Fermentes y Vino Natural', value: 200000.00, beneficiario: 'Kiev Pass S.A. de C.V.', concepto: 'Eventos Especiales', motivo1: 'Enológico', motivo2: 'Enológico', municipios: ['San Miguel de Allende'] },
          { name: 'Millesime Gnp Weekend', value: 850000.00, beneficiario: 'Factoria de Experiencias S.A. de C.V.', concepto: 'Eventos Especiales', motivo1: 'Enológico', motivo2: 'Enológico', municipios: ['San Miguel de Allende'] },
          { name: 'Tinto Bajío Festival de Vino Mexicano', value: 400000.00, beneficiario: 'Lorena Succar Velázquez', concepto: 'Eventos Especiales', motivo1: 'Enológico', motivo2: 'Enológico', municipios: ['León'] },
          { name: 'Décima Quinta Edición de la Feria de la Panificación Acámbaro 2025', value: 200000.00, beneficiario: 'Municipio de Acámbaro', concepto: 'Eventos Especiales', motivo1: 'Gastronómico', motivo2: 'Gastronómico', municipios: ['Acámbaro'] },
          { name: 'Octava Edición de – CAMBIANDO MIRADAS- Simposium Internacional de Síndrome de Down y Otras Neurodivergencias', value: 250000.00, beneficiario: 'Cambiando Miradas a.C.', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['León'] },
          { name: 'LXXIV Congreso Nacional de la SMORLCCC', value: 300000.00, beneficiario: 'Sociedad Mexicana de Otorrinolaringología Y Cirugía de Cabeza y Cuello A.C', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['León'] },
          { name: 'Crediexpo', value: 200000.00, beneficiario: 'Actitud Wasausky SA de CV', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['León'] },
          { name: 'Expo Guanajuato Provee 5ta edición', value: 100000.00, beneficiario: 'Jessica Teresita Villafaña Aguilera', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['León'] },
          { name: 'México Assembly Wire Expo', value: 400000.00, beneficiario: 'Electrical Wire Expo S de RL de CV', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['León'] },
          { name: 'Participación en el 49 Tianguis Turístico de México de Baja California', value: 8806944.48, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Viajes de promoción', motivo1: 'Multimotivo de viaje', motivo2: 'Deportivo, Cultural, Enológico, Destilados, Wellness, MICE, Romance, Naturaleza, Gastronómico', municipios: ['Todo el Estado'] },
          { name: 'IBTM Américas', value: 2251086.66, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Impulso y Fortalecimiento al Segmento de Turismo de Reuniones', motivo1: 'MICE', motivo2: 'MICE', municipios: ['Multidestino'] },
          { name: 'Socios Comerciales (CONEXSTUR y Primera Plus)', value: 800000.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Alianzas Estratégicas', motivo1: 'Multimotivo de viaje', motivo2: 'Deportivo, Cultural, Enológico, Destilados, Wellness, MICE, Romance, Naturaleza, Gastronómico', municipios: ['Todo el Estado'] },
          { name: 'Participación en el Tianguis Nacional de Pueblos Mágicos', value: 800000.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Viajes de promoción', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['Multidestino'] },
          { name: 'Caravana de Identidad y Pertenencia', value: 1500000.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Herramientas de promoción y difusión', motivo1: 'Multimotivo de viaje', motivo2: 'Deportivo, Cultural, Enológico, Destilados, Wellness, MICE, Romance, Naturaleza, Gastronómico', municipios: ['Todo el Estado'] },
        ],
      },
      {
        name: 'Tercera Ordinaria',
        fecha: 'Martes, 27 de mayo de 2025',
        children: [
          { name: 'Foro Wellness Yourself', value: 150000.00, beneficiario: 'Laura Robledo Romero', concepto: 'Eventos Especiales', motivo1: 'Wellness', motivo2: 'Wellness', municipios: ['León'] },
          { name: 'Festival el Caballo y su Mundo', value: 150000.00, beneficiario: 'Promociones en Publicidad Masiva S.A. de C.V.', concepto: 'Eventos Especiales', motivo1: 'Deportivo', motivo2: 'Deportivo', municipios: ['León'] },
          { name: 'Festival De La Salud Saberes Ancestrales', value: 100000.00, beneficiario: 'Pedro Arturo Villegas Rangel', concepto: 'Eventos Especiales', motivo1: 'Wellness', motivo2: 'Wellness', municipios: ['Tarandacuao'] },
          { name: '5° Festival del Mango 2025', value: 350000.00, beneficiario: 'Pobladores Unidos por Magallanes a. C.', concepto: 'Eventos Especiales', motivo1: 'Gastronómico', motivo2: 'Gastronómico', municipios: ['Pénjamo'] },
          { name: 'Apaseo en Corto', value: 100000.00, beneficiario: 'Municipio de Apaseo el Grande', concepto: 'Eventos Especiales', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['Apaseo el Grande'] },
          { name: 'Festival Internacional de Papalotes y Cometas', value: 250000.00, beneficiario: 'Instituto Mexicano de Recreación y Tiempo Libre, Parques y Animación', concepto: 'Eventos Especiales', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['Silao'] },
          { name: '7mo. Festival Internacional Cala de Caballo 2025', value: 500000.00, beneficiario: 'Municipio de Apaseo el Grande', concepto: 'Eventos Especiales', motivo1: 'Deportivo', motivo2: 'Deportivo', municipios: ['Apaseo el Grande'] },
          { name: 'Expo Mecánico Automotriz Internacional León 2025', value: 300000.00, beneficiario: 'Confederación Nacional de Talleres de Servicio Automotriz y Similares A.C', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['León'] },
          { name: 'Festival Internacional de Violoncello León Novena Edición', value: 100000.00, beneficiario: 'Ma Cristina Ponce Torres', concepto: 'Eventos Especiales', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['León'] },
          { name: 'Vive el Vino', value: 350000.00, beneficiario: 'Consultora Enologica del Bajio', concepto: 'Eventos Especiales', motivo1: 'Enológico', motivo2: 'Enológico', municipios: ['León'] },
          { name: 'Feria de la poesía, vino y queso', value: 300000.00, beneficiario: 'Municipio de Apaseo el Grande', concepto: 'Eventos Especiales', motivo1: 'Gastronómico', motivo2: 'Gastronómico', municipios: ['Apaseo el Grande'] },
          { name: 'Congreso Dento León UNAM', value: 200000.00, beneficiario: 'Congress & Meetings Group S.A de C.V.', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['León'] },
          { name: 'Congreso Veterinario de León', value: 1999999.00, beneficiario: 'Congress & Meetings Group S.A de C.V.', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['León'] },
          { name: '5° Congreso anual “Anestesiología pediátrica a la vanguardia: Inteligencia artificial y nuevas realidades”', value: 120000.00, beneficiario: 'Colegio de Anestesiología Pediátrica A. C.', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['León'] },
          { name: 'Expo Nopal 2025', value: 300000.00, beneficiario: 'Oscar Ivan Lara Chavez', concepto: 'Eventos Especiales', motivo1: 'Gastronómico', motivo2: 'Gastronómico', municipios: ['Salamanca'] },
          { name: 'Viva Guanajuato; sabor, música y folclor 2025', value: 800000.00, beneficiario: 'Rocío Castillo Lulet', concepto: 'Eventos Especiales', motivo1: 'Gastronómico', motivo2: 'Gastronómico', municipios: ['Guanajuato'] },
          { name: 'Festival Pride Guanajuato', value: 150000.00, beneficiario: 'Esteban Saavedra Silva', concepto: 'Eventos Especiales', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['Guanajuato'] },
          { name: 'Vendimia Brava 2025', value: 300000.00, beneficiario: 'Moto Austria SA de CV', concepto: 'Eventos Especiales', motivo1: 'Enológico', motivo2: 'Enológico', municipios: ['San Miguel de Allende'] },
          { name: 'Fiexpo Latin America', value: 278300.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Impulso y Fortalecimiento al Segmento de Turismo de Reuniones', motivo1: 'MICE', motivo2: 'MICE', municipios: ['Multidestino'] },
        ],
      },
      {
        name: 'Cuarta Ordinaria',
        fecha: 'Lunes, 11 de agosto de 2025',
        children: [
          { name: 'Promoción de experiencias de turismo de naturaleza en el Estado de Guanajuato', value: 2091997.80, beneficiario: 'Turismo de Naturaleza y Aventura de Guanajuato AC', concepto: 'Herramientas de promoción y difusión', motivo1: 'Multimotivo de viaje', motivo2: 'Cultural, Naturaleza, Gastronómico', municipios: ['Multidestino'] },
          { name: 'Yuriria, Estrategia Integral de Promoción', value: 1716000.00, beneficiario: 'Municipio de Yuriria', concepto: 'Eventos Especiales, Herramientas de promoción y difusión, Viajes de Familiarización, Viajes de promoción', motivo1: 'Multimotivo de viaje', motivo2: 'Deportivo, Cultural, Naturaleza, Gastronómico', municipios: ['Yuriria'] },
          { name: 'Ultimate Urban Enduro', value: 200000.00, beneficiario: 'Javier García Gómez', concepto: 'Eventos Especiales', motivo1: 'Deportivo', motivo2: 'Deportivo', municipios: ['Guanajuato'] },
          { name: '5° Torneo Internacional Veritas 2025', value: 400000.00, beneficiario: 'Luis Ernesto Turcios Guzmán', concepto: 'Eventos Especiales', motivo1: 'Deportivo', motivo2: 'Deportivo', municipios: ['Guanajuato'] },
          { name: 'Copa Amistad Internacional 2025', value: 600000.00, beneficiario: 'Catalina Sandoval Lara', concepto: 'Eventos Especiales', motivo1: 'Deportivo', motivo2: 'Deportivo', municipios: ['León'] },
          { name: '1er Concurso Nacional Artesanal del Gabán Coroneo, Guanajuato 2025', value: 250000.00, beneficiario: 'Municipio de Coroneo', concepto: 'Eventos Especiales', motivo1: 'Multimotivo de viaje', motivo2: 'Cultural, Romance, Naturaleza, Gastronómico', municipios: ['Coroneo'] },
          { name: 'XXI Festival Medieval Guanajuato 2025', value: 100000.00, beneficiario: 'Festival Medieval Guanajuato a.C.', concepto: 'Eventos Especiales', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['Guanajuato'] },
          { name: 'Bandafest 2025 Villagrán', value: 1300000.00, beneficiario: 'Municipio de Villagrán', concepto: 'Eventos Especiales', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['Villagrán'] },
          { name: '“Mátur’é, Camino al Mictlán”', value: 1000000.00, beneficiario: 'Municipio de Moroleón', concepto: 'Eventos Especiales', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['Moroleón'] },
          { name: 'Etskuni', value: 70000.00, beneficiario: 'Municipio de Tarandacuao', concepto: 'Eventos Especiales', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['Tarandacuao'] },
          { name: 'Leyendas Gto', value: 1000000.00, beneficiario: '5 Ht', concepto: 'Eventos Especiales', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['León'] },
          { name: 'The Legacy Congreso Internacional de Danza Jazz 2a Edición', value: 200000.00, beneficiario: 'Maria Mercedes Meza Gonzalez', concepto: 'Eventos Especiales', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['León'] },
          { name: 'Taste! Concurso y Reality Internacional en Diseño de Coctelería de Autor', value: 300000.00, beneficiario: 'Juan Francisco Velázquez Martínez', concepto: 'Herramientas de promoción y difusión', motivo1: 'Multimotivo de viaje', motivo2: 'Cultural, Enológico, Destilados', municipios: ['Multidestino'] },
          { name: 'San Miguel y sus Sabores', value: 772637.68, beneficiario: 'Municipio de San Miguel de Allende', concepto: 'Eventos Especiales', motivo1: 'Gastronómico', motivo2: 'Gastronómico', municipios: ['San Miguel de Allende'] },
          { name: 'Michefest, Villagrán 2025', value: 500000.00, beneficiario: 'Municipio de Villagrán', concepto: 'Eventos Especiales', motivo1: 'Gastronómico', motivo2: 'Gastronómico', municipios: ['Villagrán'] },
          { name: 'Shaker Room 2025', value: 120000.00, beneficiario: 'Sergio Arturo Ignacio Martinez Barco', concepto: 'Eventos Especiales', motivo1: 'Multimotivo de viaje', motivo2: 'Enológico, Destilados', municipios: ['León'] },
          { name: 'Congreso Internacional de Diseño Guerra Grafica 2025', value: 100000.00, beneficiario: 'Tanya Aline Bernal Rodriguez', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['Guanajuato'] },
          { name: 'Convención Konecta León Gto VII', value: 500000.00, beneficiario: 'Event Pro Leon', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['León'] },
          { name: 'Congreso Nacional de Enfermería en Medicina Crítica', value: 150000.00, beneficiario: 'Asociacion Guanajuatense de Enfermeras Especialistas en Medicina Crítica y Terapia Intensiva a.C.', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['Guanajuato'] },
          { name: '3er Congreso Internacional de mujeres y Líderes Empresariales', value: 1500000.00, beneficiario: 'Juan José Guillén García', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['León'] },
          { name: 'XIV Seminario Iberoamericano de las Artesanías', value: 100000.00, beneficiario: 'Rosa María Rojas Navarrete', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['Salamanca'] },
          { name: 'Convención Anual y Expo ANEAS 2025 XXXVII', value: 1999999.00, beneficiario: 'Asociación Nacional de Entidades de Agua y Saneamiento de México A.C', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['León'] },
          { name: 'Concierto de Carmina Burana con la Sinfónica de Minería', value: 500000.00, beneficiario: 'Fundación Universidad Nacional Autónoma de México Capítulo Guanajuato', concepto: 'Eventos Especiales', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['San Miguel de Allende'] },
          { name: 'Festival De La Salud Saberes Ancestrales', value: 293270.00, beneficiario: 'Pedro Arturo Villegas Rangel', concepto: 'Eventos Especiales', motivo1: 'Wellness', motivo2: 'Wellness', municipios: ['Tarandacuao'] },
          { name: 'Promoción y Difusión Turística del Estado de Guanajuato mediante Estrategia de Relaciones Públicas para el Fortalecimiento de la Oferta e Integración Municipal a través de FAM Trips Nacionales.', value: 2759548.99, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Viajes de Familiarización', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['Todo el Estado'] },
          { name: 'Meeting Place Guanajuato', value: 3290146.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['Multidestino'] },
          { name: 'Alianza comercial Mexitours 2025', value: 300000.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Alianzas Estratégicas', motivo1: 'Multimotivo de viaje', motivo2: 'Deportivo, Cultural, Enológico, Destilados, Wellness, MICE, Romance, Naturaleza, Gastronómico', municipios: ['Todo el Estado'] },
        ],
      },
      {
        name: 'Quinta Ordinaria',
        fecha: 'Miércoles, 5 de noviembre de 2025',
        children: [
          { name: 'Proyecto Integral de Promoción Turística: Silao el destino emergente para el Turismo de Reuniones', value: 325000.00, beneficiario: 'Municipio de Silao de la Victoria', concepto: 'Acciones de relaciones públicas y promoción, Eventos Especiales, Herramientas de promoción y difusión, Impulso y Fortalecimiento al Segmento de Turismo de Reuniones, Viajes de Familiarización, Viajes de promoción', motivo1: 'Multimotivo de viaje', motivo2: 'Cultural, Destilados, Wellness, MICE, Romance', municipios: ['Silao'] },
          { name: 'Proyecto Integral de Promoción de Destino Salamanca Otoño/Invierno 2025', value: 1114873.02, beneficiario: 'Municipio de Salamanca', concepto: 'Acciones de relaciones públicas y promoción, Herramientas de promoción y difusión, Impulso y Fortalecimiento al Segmento de Turismo de Reuniones, Viajes de Familiarización, Viajes de promoción', motivo1: 'Todos', motivo2: 'Todos', municipios: ['Salamanca'] },
          { name: 'GIRA Tourism EXPO Japan', value: 382974.00, beneficiario: 'Euroamerica Publicidad y Relaciones Publicas SA de CV', concepto: 'Viajes de promoción', motivo1: 'Multimotivo de viaje', motivo2: 'Cultural, Enológico, Destilados, Wellness, Romance, Naturaleza, Gastronómico', municipios: ['San Miguel de Allende'] },
          { name: 'Roadshow Colombia', value: 69798.00, beneficiario: 'Euroamerica Publicidad y Relaciones Publicas SA de CV', concepto: 'Viajes de promoción', motivo1: 'Multimotivo de viaje', motivo2: 'Cultural, Enológico, Destilados, Wellness, Romance, Naturaleza, Gastronómico', municipios: ['San Miguel de Allende'] },
          { name: 'XXXI Festival Internacional de Jazz y Blues de San Miguel de Allende', value: 70000.00, beneficiario: 'José Antonio Lozoya Téllez', concepto: 'Eventos Especiales', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['San Miguel de Allende'] },
          { name: 'Feria de Arte Popular Raíces y Colores', value: 400000.00, beneficiario: 'Creación 101 A.C', concepto: 'Eventos Especiales', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['Guanajuato'] },
          { name: 'Magia en Guanajuato', value: 1000000.00, beneficiario: 'Rocio Castillo Lulet', concepto: 'Eventos Especiales', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['Guanajuato'] },
          { name: 'Hole & Wine 2025', value: 250000.00, beneficiario: 'Interimagen Grafica de México, S.A. de C.V.', concepto: 'Eventos Especiales', motivo1: 'Enológico', motivo2: 'Enológico', municipios: ['León'] },
          { name: 'Tinto Apartamento', value: 250000.00, beneficiario: 'Fidel Alejandro Ramírez Ramblas', concepto: 'Acciones de relaciones públicas y promoción', motivo1: 'Enológico', motivo2: 'Enológico', municipios: ['Guanajuato'] },
          { name: 'LXXII Congreso de Pediatría y XXXV Jornadas de Estomatología', value: 250000.00, beneficiario: 'Asociacion de Médicos del Hospital Infantil de México, a.C.', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['Guanajuato'] },
          { name: 'Congreso y 50 Reunión Nacional Federación Mexicana de Colegios de Ingenieros Civiles A.C.', value: 600000.00, beneficiario: 'International Konstruktion Verbindung S.A.de C.V.', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['Guanajuato'] },
          { name: '4° Summit de la Industria de Reuniones León y Día Educativo PCOMM', value: 376000.00, beneficiario: 'Operadora Poliforum Conexpo', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['León'] },
          { name: 'Catando México, festival de vinos mexicanos', value: 200000.00, beneficiario: 'Proabejas A.C.', concepto: 'Eventos Especiales', motivo1: 'Multimotivo de viaje', motivo2: 'Enológico, Gastronómico', municipios: ['Guanajuato'] },
          { name: 'Contratación de Banners en internet - Food & Wine en Español', value: 417600.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Herramientas de promoción y difusión', motivo1: 'Multimotivo de viaje', motivo2: 'Enológico, Destilados, Gastronómico', municipios: ['Todo el Estado'] },
          { name: 'Fortalecimiento a municipios de Guanajuato en Redes Sociales 2025', value: 2000000.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Herramientas de promoción y difusión', motivo1: 'Multimotivo de viaje', motivo2: 'Deportivo, Cultural, Enológico, Destilados, Wellness, MICE, Romance, Naturaleza, Gastronómico', municipios: ['Multidestino'] },
        ],
      },
    ],
  };

  const data2 = {
    name: 'Sesiones Extraordinarias 2025',
    children: [
      {
        name: 'Primera Extraordinaria',
        fecha: 'Miércoles, 9 de abril de 2025',
        children: [
          { name: 'Visita Dolores 2025', value: 2358286.00, beneficiario: 'Consejo Ciudadano de Promocion Turistica de Dolores Hidalgo, Cuna de la Independencia Nacional, GTO', concepto: 'Herramientas de promoción y Difusión. Acciones de Relaciones Públicas y Promoción. Alianzas estratégicas. Viajes de Promoción. Viajes de Familiarización.', motivo1: 'Multimotivo de viaje', motivo2: 'Cultural, Enológico, Romance, Gastronómico', municipios: ['Dolores Hidalgo'] },
          { name: 'Proyecto Integral de Promoción del Destino Guanajuato Capital', value: 6484440.00, beneficiario: 'Operadora Turística Pozuelos, S.A. de C.V.', concepto: 'Acciones de relaciones públicas y promoción. Alianzas estratégicas. Eventos especiales. Herramientas de promoción y difusión. Impulso y fortalecimiento al segmento de turismo de reuniones. Viajes de familiarización. Viajes de promoción.', motivo1: 'Multimotivo de viaje', motivo2: 'Deportivo, Cultural, Enológico, Wellness, MICE, Romance, Naturaleza, Gastronómico', municipios: ['Guanajuato'] },
          { name: 'Celaya: identidad viva, tradición que inspira', value: 2700000.00, beneficiario: 'Consejo de Turismo de Celaya, Guanajuato', concepto: 'Acciones de relaciones públicas y promoción. Eventos especiales. Herramientas de promoción y difusión. Viajes de familiarización. Viajes de promoción.', motivo1: 'Multimotivo de viaje', motivo2: 'Deportivo, Cultural, MICE, Naturaleza, Gastronómico', municipios: ['Celaya'] },
          { name: 'Proyecto Integral de Promoción de Destino San Luis de La Paz 2025', value: 967360.00, beneficiario: 'Municipio de San Luis de la Paz', concepto: 'Eventos Especiales, Viajes de promoción, Acciones de relaciones públicas, Fams y herramientas de promoción', motivo1: 'Multimotivo de viaje', motivo2: 'Cultural, Destilados, Wellness, Romance, Naturaleza, Gastronómico', municipios: ['San Luis de la Paz'] },
          { name: 'Guia México Desconocido 2025 - Edición Especial Guanajuato', value: 1160000.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Herramientas de promoción y difusión', motivo1: 'Multimotivo de viaje', motivo2: 'Deportivo, Cultural, Enológico, Destilados, Wellness, MICE, Romance, Naturaleza, Gastronómico', municipios: ['Todo el Estado'] },
          { name: 'Roadshow Guanajuato por Estados Unidos y Colombia 2025', value: 6485099.17, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Acciones de relaciones públicas y promoción', motivo1: 'Multimotivo de viaje', motivo2: 'Cultural, Enológico, Destilados, Wellness, MICE, Romance, Naturaleza, Gastronómico', municipios: ['Todo el Estado'] },
          { name: 'Fiexpo Latin America', value: 650000.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Impulso y Fortalecimiento al Segmento de Turismo de Reuniones', motivo1: 'MICE', motivo2: 'MICE', municipios: ['Multidestino'] },
          { name: 'Alianza comercial CATAI VIAJES 2025', value: 1296021.32, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Alianzas Estratégicas', motivo1: 'Multimotivo de viaje', motivo2: 'Cultural, Enológico, Destilados, Wellness, Romance, Naturaleza, Gastronómico', municipios: ['Todo el Estado'] },
          { name: 'Alianza comercial Planet IFE 2025', value: 1131872.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Alianzas Estratégicas', motivo1: 'Multimotivo de viaje', motivo2: 'Deportivo, Cultural, Enológico, Destilados, Wellness, MICE, Romance, Naturaleza, Gastronómico', municipios: ['Todo el Estado'] },
        ],
      },
      {
        name: 'Segunda Extraordinaria',
        fecha: 'Lunes, 23 de junio de 2025',
        children: [
          { name: 'Proyecto Integral Viva León', value: 12750000.00, beneficiario: 'Municipio de León', concepto: 'Eventos Especiales, Herramientas de promoción, Viajes de promoción e Impulso y fortalecimiento al segmento de Turismo de Reuniones', motivo1: 'Multimotivo de viaje', motivo2: 'Deportivo, Cultural, MICE, Romance', municipios: ['León'] },
          { name: 'Proyecto Integral de promoción, comercialización y producto turístico de Irapuato', value: 1325000.00, beneficiario: 'Municipio de Irapuato', concepto: 'Acciones de relaciones públicas y promoción, Eventos Especiales, Herramientas de promoción y difusión, Impulso y Fortalecimiento al Segmento de Turismo de Reuniones', motivo1: 'Multimotivo de viaje', motivo2: 'Cultural, MICE, Gastronómico', municipios: ['Irapuato'] },
          { name: 'Guanajuato, ruta del vino con identidad: turismo, cultura y desarrollo comunitario', value: 1066874.00, beneficiario: 'Uva y Vino de Guanajuato A.C.', concepto: 'Acciones de relaciones públicas y promoción, Alianzas Estratégicas, Eventos Especiales, Herramientas de promoción y difusión, Viajes de promoción, Viajes de Familiarización', motivo1: 'Multimotivo de viaje', motivo2: 'Cultural, Wellness, Romance, Naturaleza, Gastronómico', municipios: ['Multidestino'] },
          { name: 'Publicidad en exteriores Aeropuerto Internacional de Querétaro AIQ', value: 414999.96, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Herramientas de promoción y difusión', motivo1: 'Multimotivo de viaje', motivo2: 'Deportivo, Cultural, Enológico, Destilados, Wellness, MICE, Romance, Naturaleza, Gastronómico', municipios: ['Todo el Estado'] },
          { name: 'Servicio integral de promoción y difusión turística del estado de Guanajuato mediante un módulo físico instalado en el Aeropuerto Internacional del Bajío (BJX)', value: 2976560.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Herramientas de promoción y difusión', motivo1: 'Multimotivo de viaje', motivo2: 'Deportivo, Cultural, Enológico, Destilados, Wellness, MICE, Romance, Naturaleza, Gastronómico', municipios: ['Todo el Estado'] },
          { name: '13° Encuentro de Cocina Tradicional Guanajuato ¡Sí Sabe!', value: 116000.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Eventos Especiales', motivo1: 'Gastronómico', motivo2: 'Gastronómico', municipios: ['Multidestino'] },
        ],
      },
      {
        name: 'Tercera Extraordinaria',
        fecha: 'Jueves, 10 de julio de 2025',
        children: [
          { name: 'Festival de Verano Vive León 2025', value: 1000000.00, beneficiario: 'Patronato de la Feria Estatal de León y Parque Ecológico', concepto: 'Eventos Especiales', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['León'] },
          { name: 'World Meetings Forum Global Caribe', value: 473018.36, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Impulso y Fortalecimiento al Segmento de Turismo de Reuniones', motivo1: 'MICE', motivo2: 'MICE', municipios: ['Multidestino'] },
        ],
      },
      {
        name: 'Quinta Extraordinaria',
        fecha: 'Martes, 30 de septiembre de 2025',
        children: [
          { name: 'Campaña de Promoción Asociación de Hoteles de Guanajuato', value: 347200.00, beneficiario: 'Fibra Visual S. de R.L. de C.V.', concepto: 'Acciones de relaciones públicas y promoción, Herramientas de promoción y difusión, Viajes de Familiarización', motivo1: 'MICE', motivo2: 'MICE', municipios: ['Multidestino'] },
          { name: '“Campaña de Promoción del Distintivo Empresarial – Celaya: Una Vía al Futuro”, a desarrollarse en el marco del Primer Congreso Ferroviario y de Logística Celaya 2025', value: 1231040.00, beneficiario: 'Consejo Coordinador Empresarial de Celaya', concepto: 'Herramientas de promoción y difusión, Impulso y Fortalecimiento al Segmento de Turismo de Reuniones', motivo1: 'MICE', motivo2: 'MICE', municipios: ['Celaya'] },
          { name: 'Noche Mística', value: 96850.00, beneficiario: 'Municipio de Tarandacuao', concepto: 'Eventos Especiales', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['Tarandacuao'] },
          { name: '7° Festival del Día de los Muertos Guanajuato', value: 2500000.00, beneficiario: 'Municipio de Guanajuato', concepto: 'Eventos Especiales', motivo1: 'Multimotivo de viaje', motivo2: 'Cultural, Gastronómico', municipios: ['Guanajuato'] },
          { name: 'XVIII Muestra Internacional de Arte Efímero "El Tapete de la Muerte"', value: 600000.00, beneficiario: 'Pedro Chacon Díaz', concepto: 'Eventos Especiales', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['Guanajuato'] },
          { name: 'Turismo educativo y enoturismo en Guanajuato: una estrategia de atracción internacional', value: 296700.00, beneficiario: 'Daniela Moreno Berra', concepto: 'Herramientas de promoción y difusión', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['Multidestino'] },
          { name: 'Herramientas de Promoción y Difusión', value: 155469.00, beneficiario: 'Asociación Mexicana de Hoteles y Establecimientos de Hospedaje de San Miguel de Allende GTO AC', concepto: 'Herramientas de promoción y difusión', motivo1: 'Multimotivo de viaje', motivo2: 'Cultural, Enológico, Wellness, MICE, Romance, Gastronómico', municipios: ['San Miguel de Allende'] },
          { name: '4to. Festival de Paseo por Apaseo, Tierra de Sabor y Tradición', value: 200000.00, beneficiario: 'Municipio de Apaseo el Grande', concepto: 'Eventos Especiales', motivo1: 'Multimotivo de viaje', motivo2: 'Cultural, Gastronómico', municipios: ['Apaseo el Grande'] },
          { name: 'Green Jobs for Youth Academy', value: 200000.00, beneficiario: 'International Skills Hub', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['León'] },
          { name: 'Foro de Construcción 5.0', value: 700000.00, beneficiario: 'Colegio Estatal de Ingenieros Civiles de Guanajuato, A.C.', concepto: 'Eventos Especiales', motivo1: 'MICE', motivo2: 'MICE', municipios: ['Irapuato'] },
          { name: '4ta Cumbre Nacional de Marchas LGBT+', value: 350000.00, beneficiario: 'Julio César Ceja Guzmán', concepto: 'Eventos Especiales', motivo1: 'Cultural', motivo2: 'Cultural', municipios: ['Multidestino'] },
          { name: 'Proyecto Integral de promoción, comercialización y producto turístico de Irapuato', value: 2445093.00, beneficiario: 'Municipio de Irapuato', concepto: 'Acciones de relaciones públicas y promoción, Eventos Especiales, Herramientas de promoción y difusión, Impulso y Fortalecimiento al Segmento de Turismo de Reuniones', motivo1: 'Multimotivo de viaje', motivo2: 'Cultural, MICE, Gastronómico', municipios: ['Irapuato'] },
          { name: '7ma. Edición Vinum Guanajuato 2025', value: 1999840.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Eventos Especiales', motivo1: 'Enológico', motivo2: 'Enológico', municipios: ['Multidestino'] },
          { name: 'Guanajuato Inexplorado', value: 2598400.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Herramientas de promoción y difusión', motivo1: 'Multimotivo de viaje', motivo2: 'Cultural, Enológico, Destilados, Wellness, Naturaleza, Gastronómico', municipios: ['Todo el Estado'] },
          { name: 'Food and Travel México, Campaña Digital', value: 835200.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Herramientas de promoción y difusión', motivo1: 'Multimotivo de viaje', motivo2: 'Enológico, Gastronómico', municipios: ['San Miguel de Allende'] },
        ],
      },
      {
        name: 'Sexta Extraordinaria',
        fecha: 'Jueves, 4 de diciembre de 2025',
        children: [
          { name: 'Promoción y difusión de la oferta turística del estado de Guanajuato en espacios del metro, autobús y aeropuerto en Madrid, España.', value: 2433587.50, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Herramientas de promoción y difusión', motivo1: 'MICE', motivo2: 'MICE', municipios: ['Todo el Estado'] },
          { name: 'Promoción y difusión de la oferta turística del estado de Guanajuato, a través de branding en pared en IFEMA en el marco de la Feria Internacional de Turismo (FITUR).', value: 700000.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Herramientas de promoción y difusión', motivo1: 'Multimotivo de viaje', motivo2: 'Deportivo, Cultural, Enológico, Destilados, Wellness, MICE, Romance, Naturaleza, Gastronómico', municipios: ['Todo el Estado'] },
          { name: 'Participación FITUR 2026', value: 4200000.00, beneficiario: 'Secretaría de Turismo e Identidad', concepto: 'Viajes de promoción', motivo1: 'Multimotivo de viaje', motivo2: 'Deportivo, Cultural, Enológico, Destilados, Wellness, MICE, Romance, Naturaleza, Gastronómico', municipios: ['Todo el Estado'] },
          { name: 'Proyecto Integral Viva León', value: 127000.00, beneficiario: 'Municipio de León', concepto: 'Eventos Especiales, Herramientas de promoción, Viajes de promoción e Impulso y fortalecimiento al segmento de Turismo de Reuniones', motivo1: 'Multimotivo de viaje', motivo2: 'Deportivo, Cultural, MICE, Romance', municipios: ['León'] },
        ],
      },
    ],
  };
  // ==================== FIN DATOS COMPLETOS ====================

  const { mapData, maxVal, filteredEvents, categoryCounts, dynamicMotivos, dynamicMunicipios } = useMemo(() => {
    let tEvt = 0;
    const eventsList = [];

    const proyectosIntegrales = [
      "VISITA DOLORES 2025",
      "Proyecto Integral de Promoción del Destino Guanajuato Capital",
      "Celaya: identidad viva, tradición que inspira",
      "Proyecto Integral de Promoción de Destino San Luis de La Paz 2025",
      "Proyecto Integral Viva León",
      "Proyecto Integral de promoción, comercialización y producto turístico de Irapuato",
      "Guanajuato, ruta del vino con identidad: turismo, cultura y desarrollo comunitario",
      "Yuriria, Estrategia Integral de Promoción",
      "Campaña de Promoción Asociación de Hoteles de Guanajuato",
      "“Campaña de Promoción del Distintivo Empresarial – Celaya: Una Vía al Futuro”, a desarrollarse en el marco del Primer Congreso Ferroviario y de Logística Celaya 2025",
      "Proyecto Integral de Promoción Turística: Silao el destino emergente para el Turismo de Reuniones",
      "Proyecto Integral de Promoción de Destino Salamanca Otoño/Invierno 2025"
    ];

    const processSession = (sessionData, type) => {
      sessionData.children.forEach(session => {
        session.children.forEach(event => {
          tEvt++;
          const cleanName = event.name.replace(/\n/g, '').trim();
          const isIntegral = proyectosIntegrales.some(p => p.toLowerCase() === cleanName.toLowerCase());

          // Determinar el motivo principal para filtros
          let motivoPrincipal = event.motivo1;
          if (event.motivo1 === 'Multimotivo de viaje' || event.motivo1 === 'Todos') {
            motivoPrincipal = event.motivo2.split(',').map(m => m.trim())[0] || event.motivo1;
          }

          eventsList.push({
            ...event,
            name: cleanName,
            sessionType: type,
            sessionName: session.name,
            fechaSesion: session.fecha,
            tipoProyecto: isIntegral ? 'Proyectos Integrales' : 'Proyectos Específicos',
            motivo: event.motivo2 || event.motivo1,
            motivoPrincipal: motivoPrincipal,
            beneficiario: event.beneficiario || 'No especificado',
            concepto: event.concepto || 'No especificado',
            resultados: `Impacto estimado en ${Math.floor(event.value / 1000)} beneficiarios directos.`,
          });
        });
      });
    };

    processSession(data, 'ORDINARIA');
    processSession(data2, 'EXTRAORDINARIA');

    // Conteo por categorías (antes de filtros)
    const categoryCounts = {
      'Proyectos Integrales': eventsList.filter(e => e.tipoProyecto === 'Proyectos Integrales').length,
      'Proyectos Específicos': eventsList.filter(e => e.tipoProyecto === 'Proyectos Específicos').length,
    };

    // 1. Filtrar por activeCategory
    const categoryFiltered = activeCategory ? eventsList.filter(e => e.tipoProyecto === activeCategory) : eventsList;

    // 2. Calcular opciones dinámicas (motivos y municipios basados solo en la categoría activa)
    const mSet = new Set();
    const motSet = new Set();
    categoryFiltered.forEach(e => {
      if (e.motivo1 && e.motivo1 !== 'Todos' && e.motivo1 !== 'Multimotivo de viaje') {
        motSet.add(e.motivo1);
      }
      if (e.motivo && e.motivo !== 'Todos' && e.motivo !== 'Multimotivo de viaje') {
        e.motivo.split(',').forEach(m => motSet.add(m.trim()));
      }
      if (e.municipios) {
        e.municipios.forEach(m => mSet.add(m));
      }
    });

    const dynamicMotivos = ['Todos', 'Multimotivo de viaje', ...Array.from(motSet)].sort((a, b) => {
      const special = ['Multimotivo de viaje', 'Todos'];
      const aIdx = special.indexOf(a);
      const bIdx = special.indexOf(b);
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return 1;
      if (bIdx !== -1) return -1;
      return a.localeCompare(b);
    });

    const dynamicMunicipios = ['Todos', ...Array.from(mSet)].sort((a, b) => {
      const special = ['Todo el Estado', 'Multidestino', 'Todos'];
      const aIdx = special.indexOf(a);
      const bIdx = special.indexOf(b);
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return 1;
      if (bIdx !== -1) return -1;
      return a.localeCompare(b);
    });

    // 3. Aplicar filtros de select a la lista de categoría
    let filtered = categoryFiltered;

    if (filterMotivo !== 'Todos' && activeCategory !== 'Proyectos Integrales') {
      filtered = filtered.filter(e => {
        if (e.motivo === 'Todos' || e.motivo === 'Multimotivo de viaje') return true;
        return e.motivo.includes(filterMotivo) || e.motivo1 === filterMotivo;
      });
    }

    if (filterMunicipio !== 'Todos') {
      filtered = filtered.filter(e => {
        return e.municipios && e.municipios.includes(filterMunicipio);
      });
    }

    // Procesar datos del mapa
    const mapDataMap = {};

    filtered.forEach((ev) => {
      let muns = ev.municipios || [];

      if (muns.length === 0) {
        muns = ['Sin Municipio'];
      }

      const partialValue = ev.value / muns.length;
      muns.forEach(mun => {
        if (!mapDataMap[mun]) {
          mapDataMap[mun] = { name: mun, value: 0, events: [] };
        }
        mapDataMap[mun].value += partialValue;
        mapDataMap[mun].events.push(ev);
      });
    });

    const mData = Object.values(mapDataMap);
    const mVal = mData.length > 0 ? Math.max(...mData.map(d => d.value)) : 1000000;

    return {
      mapData: mData,
      maxVal: mVal,
      filteredEvents: filtered,
      categoryCounts,
      dynamicMotivos,
      dynamicMunicipios
    };
  }, [data, data2, activeCategory, filterMotivo, filterMunicipio]);

  const activeMunicipio = useMemo(() => {
    let baseMun = clickedMunicipio || hoveredMunicipio;
    if (!baseMun) return null;
    return mapData.find(d => d.name === baseMun.name || d.originalName === baseMun.originalName) || baseMun;
  }, [clickedMunicipio, hoveredMunicipio, mapData]);

  const mapOption = useMemo(() => {
    const isMultidestinoActive =
      (selectedProject && (selectedProject.municipios?.includes('Multidestino') || selectedProject.municipios?.includes('Todo el Estado'))) ||
      (filterMunicipio === 'Multidestino') ||
      (filterMunicipio === 'Todo el Estado');

    const normalizeMunGeo = (mun) => {
      if (mun === 'Dolores Hidalgo') return 'Dolores Hidalgo CIN';
      if (mun === 'Silao') return 'Silao de la Victoria';
      if (mun === 'Purisima del Rincón') return 'Purísima del Rincón';
      return mun;
    };

    let enhancedData = mapData.map(d => {
      const geoName = normalizeMunGeo(d.name);
      const isHighlighted =
        isMultidestinoActive ||
        (selectedProject && selectedProject.municipios?.includes(d.name)) ||
        (clickedMunicipio && clickedMunicipio.name === geoName) ||
        (filterMunicipio === d.name);

      return {
        ...d,
        name: geoName,
        originalName: d.name,
        selected: isHighlighted || false,
      };
    });

    if (isMultidestinoActive) {
      guanajuatoGeoJson.features.forEach(f => {
        const geoName = f.properties.name;
        const existing = enhancedData.find(d => d.name === geoName);
        if (!existing) {
          enhancedData.push({ name: geoName, originalName: geoName, value: 0, events: [], selected: true });
        } else {
          existing.selected = true;
        }
      });
    }

    return {
      title: {
        text: 'Inversión por Municipio',
        left: 'center',
        textStyle: { color: '#004481', fontSize: 18, fontFamily: 'Arial, sans-serif' },
        top: '10',
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          const munName = params.data?.originalName || params.name;
          if (!params.value && params.value !== 0) return '<b>' + munName + '</b><br/>Sin proyectos';
          return `<b>${munName}</b><br/>Inversión: $${params.value.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        },
      },
      visualMap: {
        left: 'right',
        bottom: '10',
        min: 0,
        max: maxVal,
        inRange: {
          color: ['#ced4da', '#4fb3e8', '#f8a964'], // Light gray to blue/orange based on value
        },
        calculable: true,
        textStyle: { color: '#333', fontSize: 10 },
        itemHeight: 80,
      },
      series: [
        {
          name: 'Guanajuato',
          type: 'map',
          map: 'Guanajuato',
          roam: true,
          aspectScale: 1.0, // Correct proportions
          scaleLimit: { min: 1, max: 6 },
          selectedMode: 'multiple',
          select: {
            itemStyle: {
              areaColor: '#f1c40f',
              borderColor: '#e67e22',
              borderWidth: 2,
            },
            label: { show: true, color: '#333', fontWeight: 'bold' }
          },
          itemStyle: {
            areaColor: '#ced4da', // Light gray default
            borderColor: '#ffffff',
            borderWidth: 1,
          },
          emphasis: {
            label: { show: true, color: '#333', fontWeight: 'bold' },
            itemStyle: { areaColor: '#f1c40f' },
          },
          data: enhancedData,
        },
      ],
    };
  }, [mapData, maxVal, selectedProject, filterMunicipio, clickedMunicipio]);

  // --- Resumen Animado (Mapa / Barras) ---
  const normalizeMunAnimated = (mun) => {
    if (mun === 'Dolores Hidalgo') return 'Dolores Hidalgo CIN';
    if (mun === 'Silao') return 'Silao de la Victoria';
    if (mun === 'Purisima del Rincón') return 'Purísima del Rincón';
    return mun;
  };

  const summaryData = useMemo(() => {
    return mapData
      .filter(d => d.name !== 'Sin Municipio' && d.name !== 'Multidestino' && d.name !== 'Todo el Estado')
      .map(d => ({
        name: normalizeMunAnimated(d.name),
        value: d.value
      }))
      .sort((a, b) => a.value - b.value);
  }, [mapData]);

  const summaryMapOption = useMemo(() => {
    return {
      title: { text: 'Inversión por Municipio - Resumen Dinámico', left: 'center', textStyle: { color: '#004481' }, top: 10 },
      tooltip: {
        trigger: 'item',
        formatter: params => `<b>${params.name}</b><br/>Inversión: $${params.value ? params.value.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}`
      },
      visualMap: {
        left: 'right',
        bottom: 20,
        min: 0,
        max: maxVal || 1000000,
        inRange: { color: ['#ced4da', '#4fb3e8', '#f8a964'] },
        text: ['Alto', 'Bajo'],
        calculable: true,
        itemHeight: 80
      },
      series: [{
        id: 'inversion',
        type: 'map',
        roam: true,
        map: 'Guanajuato',
        aspectScale: 1.0, // Correct proportions
        animationDurationUpdate: 1500,
        universalTransition: true,
        data: summaryData
      }]
    };
  }, [summaryData, maxVal]);

  const summaryBarOption = useMemo(() => {
    return {
      title: { text: 'Inversión por Municipio - Resumen Dinámico', left: 'center', textStyle: { color: '#004481' }, top: 10 },
      tooltip: {
        trigger: 'axis',
        formatter: params => {
          const val = params[0].value;
          return `<b>${params[0].name}</b><br/>Inversión: $${val ? val.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}`;
        }
      },
      xAxis: {
        type: 'value',
        axisLabel: { formatter: value => '$' + (value / 1000000).toFixed(1) + 'M' }
      },
      grid: { left: '20%', right: '10%', bottom: '10%', top: '15%' },
      yAxis: {
        type: 'category',
        axisLabel: { rotate: 0, fontSize: 10 },
        data: summaryData.map(item => item.name)
      },
      visualMap: {
        show: false, // Hide visualmap on bar chart but keep mapping
        min: 0,
        max: maxVal || 1000000,
        inRange: { color: ['#ced4da', '#4fb3e8', '#f8a964'] }
      },
      animationDurationUpdate: 1500,
      series: [{
        type: 'bar',
        id: 'inversion',
        data: summaryData.map(item => item.value),
        universalTransition: true,
        itemStyle: { borderRadius: [0, 4, 4, 0] }
      }]
    };
  }, [summaryData, maxVal]);

  const displayedEvents = filteredEvents.filter(proj =>
    proj.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-wrapper">
      {/* Tarjetas Superiores */}
      <div className="top-category-cards">
        <div
          className={`top-card ${activeCategory === 'Proyectos Integrales' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('Proyectos Integrales')}
        >
          <div className="top-card-title">Proyectos Integrales</div>
          <div className="top-card-count">12 proyectos</div>
        </div>
        <div
          className={`top-card ${activeCategory === 'Proyectos Específicos' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('Proyectos Específicos')}
        >
          <div className="top-card-title">Proyectos Específicos</div>
          <div className="top-card-count">118 proyectos</div>
        </div>
      </div>

      {/* Filtros adicionales */}
      <div className="filters-container" style={{ display: 'flex', gap: '20px', marginBottom: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
        {activeCategory !== 'Proyectos Integrales' && (
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Filtrar por Motivo:</label>
            <select
              value={filterMotivo}
              onChange={(e) => {
                setFilterMotivo(e.target.value);
                setClickedMunicipio(null);
                setSelectedProject(null);
              }}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              {dynamicMotivos.map(motivo => (
                <option key={motivo} value={motivo}>{motivo}</option>
              ))}
            </select>
          </div>
        )}
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Filtrar por Municipio:</label>
          <select
            value={filterMunicipio}
            onChange={(e) => {
              const val = e.target.value;
              setFilterMunicipio(val);
              setSelectedProject(null);
              // Si selecciona un municipio específico (distinto a Todos, Todo el Estado, Multidestino), lo activamos en el panel lateral.
              if (val !== 'Todos') {
                // Buscamos la data calculada de ese municipio en `mapData`
                const mapNode = mapData.find(d => d.name === val || d.originalName === val);
                if (mapNode) {
                  setClickedMunicipio(mapNode);
                } else {
                  // Si por alguna razón no existe aún en mapData, simulamos el objeto
                  setClickedMunicipio({ name: val, originalName: val, value: 0, events: [] });
                }
              } else {
                setClickedMunicipio(null);
              }
            }}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            {dynamicMunicipios.map(municipio => (
              <option key={municipio} value={municipio}>{municipio}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="dashboard-container-3col">
        {/* Left Sidebar - List Select */}
        <div className="sidebar-card">
          <div className="sidebar-header">
            <h3>{activeCategory || 'Categoría no seleccionada'}</h3>
            <p style={{ fontSize: '0.85rem', color: '#eee', marginTop: '5px', marginBottom: '10px' }}>
              Resultados filtrados
            </p>
            <input
              type="text"
              placeholder="Buscar proyecto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 10px',
                borderRadius: '4px',
                border: 'none',
                boxSizing: 'border-box',
                color: '#333',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>
          <div className="sidebar-content">
            <div className="accordion-list">
              {displayedEvents.map((proj, idx) => (
                <div
                  key={idx}
                  className={`accordion-proj-item ${selectedProject?.name === proj.name ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedProject(proj);
                    setClickedMunicipio(null);
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>{proj.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>${proj.value.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
              ))}
              {displayedEvents.length === 0 && (
                <div style={{ padding: '20px', textAlign: 'center', color: '#777' }}>
                  No se encontraron proyectos para esta búsqueda o selección.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center Map */}
        <div className="map-card-center">
          <div className="echarts-wrapper">
            <ReactECharts
              option={mapOption}
              style={{ height: '100%', minHeight: '500px', width: '100%' }}
              theme="light"
              onEvents={{
                click: params => {
                  if (params.componentType === 'series') {
                    const mData = params.data || { name: params.name, originalName: params.name, value: 0, events: [] };
                    setClickedMunicipio(prev => (prev && prev.name === mData.name ? null : mData));
                    setSelectedProject(null);
                  }
                },
              }}
            />
          </div>
        </div>

        {/* Right Details Panel */}
        <div className="details-card">
          <div className="details-header">
            <h3>Detalles del Proyecto</h3>
          </div>
          <div className="details-content">
            {selectedProject ? (
              <div className="project-detail-box">
                <h5>{selectedProject.name}</h5>
                <div className="detail-row">
                  <span className="label">Monto:</span>
                  <span className="value badge">${selectedProject.value.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Tipo:</span>
                  <span className="value">{selectedProject.tipoProyecto}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Beneficiario:</span>
                  <span className="value">{selectedProject.beneficiario}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Concepto:</span>
                  <span className="value">{selectedProject.concepto}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Motivo:</span>
                  <span className="value">{selectedProject.motivo}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Sesión en la que se aprobó:</span>
                  <span className="value">{selectedProject.sessionName}</span>
                </div>
                {selectedProject.fechaSesion && (
                  <div className="detail-row">
                    <span className="label">Fecha de aprobación:</span>
                    <span className="value">{selectedProject.fechaSesion}</span>
                  </div>
                )}

                {selectedProject.municipios && selectedProject.municipios.length > 0 && (
                  <div className="detail-row" style={{ marginTop: '15px' }}>
                    <span className="label" style={{ display: 'block', marginBottom: '5px' }}>Municipios Involucrados:</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {selectedProject.municipios.map(m => (
                        <span key={m} style={{ background: '#e0ecf4', color: '#004481', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', border: '1px solid #c6dbef' }}>{m}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : activeMunicipio ? (
              <div className="details-municipio">
                <h4>{activeMunicipio.originalName || activeMunicipio.name}</h4>
                <p className="total-proy">Monto Total Apoyado: ${(activeMunicipio.value || 0).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p className="total-proy">Proyectos: {activeMunicipio.events?.length || 0}</p>


              </div>
            ) : (
              <div className="empty-details">
                <p>Selecciona un municipio en el mapa o un proyecto en el menú lateral para ver los detalles completos.</p>
                <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>
                  Usa los filtros superiores para acotar la búsqueda por motivo o municipio.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Summary Section */}
      <div className="summary-animated-container" style={{
        marginTop: '30px',
        padding: '20px',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
        height: '600px',
        maxWidth: '1400px',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
        zIndex: 10
      }}>
        <ReactECharts
          option={showMapAnimation ? summaryMapOption : summaryBarOption}
          style={{ height: '100%', width: '100%' }}
          notMerge={false}
          lazyUpdate={true}
        />
      </div>
    </div>
  );
};

export default ChartsSection;