import React, { useMemo, useState } from 'react';
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

  const activeMunicipio = clickedMunicipio || hoveredMunicipio;

  // ==================== DATOS ACTUALIZADOS ====================
  const data = {
    name: 'Sesiones Ordinarias 2025',
    children: [
      {
        name: 'PRIMERA ORDINARIA',
        children: [
          { name: 'Forever Wedding Summit', value: 486939.44 },
          { name: 'Congreso Nacional de la Industria de Reuniones', value: 728346.30 },
          { name: 'Meeting Place León', value: 2936419.50 },
          { name: 'Congreso MPI', value: 117594.48 },
          { name: 'Congreso De Bodas y Eventos Sustentables LAT', value: 321219.20 },
          { name: 'PCMA Advisory Client Roadshow', value: 941824.00 },
          { name: 'Neextt Unique Hotels & Destinations SMA 2025', value: 458200.00 },
          { name: 'Plan de Medios SECTURI 2025', value: 3882868.72 },
          { name: 'Alianza comercial Expedia 2025', value: 2000000.00 },
          { name: 'Alianza comercial Planet IFE 2025', value: 2691199.00 },
          { name: 'Festival Endémico 2025', value: 4000000.00 },
          { name: '13° Encuentro de Cocina Tradicional Guanajuato ¡Sí Sabe!', value: 3205500.00 },
        ],
      },
      {
        name: 'SEGUNDA ORDINARIA',
        children: [
          { name: 'Red Bull Guanajuato Cerro Abajo', value: 1200000.00 },
          { name: 'La Carrera Panamericana 2025', value: 700000.00 },
          { name: 'Copa Ave Fénix 2025', value: 150000.00 },
          { name: 'Open International 2025', value: 500000.00 },
          { name: 'Maratón Capital', value: 450000.00 },
          { name: '3er. Festival Internacional la Mujer a Caballo', value: 400000.00 },
          { name: 'ULTRA GUANAJUATO', value: 200000.00 },
          { name: 'COPA SULTANES 3ERA EDICIÓN', value: 200000.00 },
          { name: 'Candelabrum Metal Fest IV', value: 800000.00 },
          { name: 'Festival Estatal Pride León Ofarrell', value: 250000.00 },
          { name: 'Salva Rock Festival Multicultural VII 2025', value: 100000.00 },
          { name: 'Festival del día de muertos "Camino al Mictlán"', value: 300000.00 },
          { name: 'Senda del Arriero del Camino Real Tierra Adentro', value: 300000.00 },
          { name: 'Fermentes y Vino Natural', value: 200000.00 },
          { name: 'MILLESIME GNP WEEKEND', value: 850000.00 },
          { name: 'Tinto Bajío Festival de Vino Mexicano', value: 400000.00 },
          { name: 'DÉCIMO QUINTA EDICIÓN DE LA FERIA DE LA PANIFICACIÓN ACÁMBARO 2025', value: 200000.00 },
          { name: 'Octava Edición de – CAMBIANDO MIRADAS- Simposium Internacional de Síndrome de Down y Otras Neurodivergencias', value: 250000.00 },
          { name: 'LXXIV Congreso Nacional de la SMORLCCC', value: 300000.00 },
          { name: 'CREDIEXPO', value: 200000.00 },
          { name: 'Expo Guanajuato Provee 5ta edición', value: 100000.00 },
          { name: 'México Assembly Wire Expo', value: 400000.00 },
          { name: 'Participación en el 49 Tianguis Turístico de México de Baja California', value: 8806944.48 },
          { name: 'IBTM AMÉRICAS', value: 2251086.66 },
          { name: 'Socios comerciales (CONEXSTUR y PRIMERA PLUS)', value: 800000.00 },
          { name: 'Participación en el Tianguis Nacional de Pueblos Mágicos', value: 800000.00 },
          { name: 'Caravana de Identidad y Pertenencia', value: 1500000.00 },
        ],
      },
      {
        name: 'TERCERA ORDINARIA',
        children: [
          { name: 'FORO WELLNESS yourself', value: 150000.00 },
          { name: 'Festival el Caballo y su Mundo', value: 150000.00 },
          { name: 'Festival De La Salud Saberes Ancestrales', value: 100000.00 },
          { name: '5° Festival del Mango 2025', value: 350000.00 },
          { name: 'Apaseo en Corto', value: 100000.00 },
          { name: 'Festival Internacional de Papalotes y Cometas', value: 250000.00 },
          { name: '7mo. Festival Internacional Cala de Caballo 2025', value: 500000.00 },
          { name: 'Expo Mecánico Automotriz Internacional León 2025', value: 300000.00 },
          { name: 'Festival Internacional de Violoncello León Novena Edición', value: 100000.00 },
          { name: 'VIVE EL VINO', value: 350000.00 },
          { name: 'Feria de la poesía, vino y queso', value: 300000.00 },
          { name: 'Congreso Dento León UNAM', value: 200000.00 },
          { name: 'Congreso Veterinario de León', value: 1999999.00 },
          { name: '5° Congreso anual “Anestesiología pediátrica a la vanguardia: Inteligencia artificial y nuevas realidades”', value: 120000.00 },
          { name: 'Expo Nopal 2025', value: 300000.00 },
          { name: 'Viva Guanajuato; sabor, música y folclor 2025', value: 800000.00 },
          { name: 'FESTIVAL PRIDE GUANAJUATO', value: 150000.00 },
          { name: 'VENDIMIA BRAVA 2025', value: 300000.00 },
          { name: 'Fiexpo Latin America', value: 278300.00 },
        ],
      },
      {
        name: 'CUARTA ORDINARIA',
        children: [
          { name: 'Promoción de experiencias de turismo de naturaleza en el Estado de Guanajuato', value: 2091997.80 },
          { name: 'YURIRIA, Estrategia Integral de Promoción', value: 1716000.00 },
          { name: 'Ultimate Urban Enduro', value: 200000.00 },
          { name: '5° Torneo Internacional Veritas 2025', value: 400000.00 },
          { name: 'Copa Amistad Internacional 2025', value: 600000.00 },
          { name: '1ER CONCURSO NACIONAL ARTESANAL DEL GABAN CORONEO, GUANAJUATO 2025', value: 250000.00 },
          { name: 'XXI Festival Medieval Guanajuato 2025', value: 100000.00 },
          { name: 'BANDAFEST 2025 VILLAGRÁN', value: 1300000.00 },
          { name: '“Mátur’é, Camino al Mictlán”', value: 1000000.00 },
          { name: 'ETSKUNI', value: 70000.00 },
          { name: 'LEYENDAS GTO', value: 1000000.00 },
          { name: 'THE LEGACY Congreso Internacional de Danza Jazz 2a Edición', value: 200000.00 },
          { name: 'TASTE! Concurso y Reality Internacional en Diseño de Coctelería de Autor', value: 300000.00 },
          { name: 'SAN MIGUEL Y SUS SABORES', value: 772637.68 },
          { name: 'MICHEFEST, VILLAGRÁN 2025', value: 500000.00 },
          { name: 'Shaker Room 2025', value: 120000.00 },
          { name: 'Congreso Internacional de Diseño Guerra Grafica 2025', value: 100000.00 },
          { name: 'CONVENCION KONECTA LEON GTO VII', value: 500000.00 },
          { name: 'Congreso Nacional de Enfermería en Medicina Crítica', value: 150000.00 },
          { name: '3er Congreso Internacional de mujeres y Líderes Empresariales', value: 1500000.00 },
          { name: 'XIV Seminario Iberoamericano de las Artesanías', value: 100000.00 },
          { name: 'Convención Anual y Expo ANEAS 2025 XXXVII', value: 1999999.00 },
          { name: 'Concierto de Carmina Burana con la Sinfónica de Minería', value: 500000.00 },
          { name: 'Festival De La Salud Saberes Ancestrales', value: 293270.00 },
          { name: 'Promoción y Difusión Turística del Estado de Guanajuato mediante Estrategia de Relaciones Públicas para el Fortalecimiento de la Oferta e Integración Municipal a través de FAM Trips Nacionales.', value: 2759548.99 },
          { name: 'MEETING PLACE GUANAJUATO', value: 3290146.00 },
          { name: 'Alianza comercial Mexitours 2025', value: 300000.00 },
        ],
      },
      {
        name: 'QUINTA ORDINARIA',
        children: [
          { name: 'Proyecto Integral de Promoción Turística: Silao el destino emergente para el Turismo de Reuniones', value: 325000.00 },
          { name: 'Proyecto Integral de Promoción de Destino Salamanca Otoño/Invierno 2025', value: 1114873.02 },
          { name: 'GIRA Tourism EXPO Japan', value: 382974.00 },
          { name: 'Roadshow Colombia', value: 69798.00 },
          { name: 'XXXI Festival Internacional de Jazz y Blues de San Miguel de Allende', value: 70000.00 },
          { name: 'Feria de Arte Popular Raíces y Colores', value: 400000.00 },
          { name: 'Magia en Guanajuato', value: 1000000.00 },
          { name: 'Hole & Wine 2025', value: 250000.00 },
          { name: 'TINTO APARTAMENTO', value: 250000.00 },
          { name: 'LXXII Congreso de Pediatría y XXXV Jornadas de Estomatología', value: 250000.00 },
          { name: 'CONGRESO Y 50 REUNION NACIONAL FEDERACIÓN MEXICANA DE COLEGIOS DE INGENIEROS CIVILES A.C.', value: 600000.00 },
          { name: '4° Summit de la Industria de Reuniones León y Día Educativo PCOMM', value: 376000.00 },
          { name: 'Catando México, festival de vinos mexicanos', value: 200000.00 },
          { name: 'Contratación de Banners en internet - Food & Wine en Español', value: 417600.00 },
          { name: 'Fortalecimiento a municipios de Guanajuato en Redes Sociales 2025', value: 2000000.00 },
        ],
      },
    ],
  };

  const data2 = {
    name: 'Sesiones Extraordinarias 2025',
    children: [
      {
        name: 'PRIMERA EXTRAORDINARIA',
        children: [
          { name: 'VISITA DOLORES 2025', value: 2358286.00 },
          { name: 'Proyecto Integral de Promoción del Destino Guanajuato Capital', value: 6484440.00 },
          { name: 'Celaya: identidad viva, tradición que inspira', value: 2700000.00 },
          { name: 'Proyecto Integral de Promoción de Destino San Luis de La Paz 2025', value: 967360.00 },
          { name: 'Guia México Desconocido 2025 - Edición Especial Guanajuato', value: 1160000.00 },
          { name: 'Roadshow Guanajuato por Estados Unidos y Colombia 2025', value: 6485099.17 },
          { name: 'Fiexpo Latin America', value: 650000.00 },
          { name: 'Alianza comercial CATAI VIAJES 2025', value: 1296021.32 },
          { name: 'Alianza comercial Planet IFE 2025', value: 1131872.00 },
        ],
      },
      {
        name: 'SEGUNDA EXTRAORDINARIA',
        children: [
          { name: 'Proyecto Integral Viva León', value: 12877000.00 },
          { name: 'Proyecto Integral de promoción, comercialización y producto turístico de Irapuato', value: 1325000.00 },
          { name: 'Guanajuato, ruta del vino con identidad: turismo, cultura y desarrollo comunitario', value: 1066874.00 },
          { name: 'Publicidad en exteriores Aeropuerto Internacional de Querétaro AIQ', value: 414999.96 },
          { name: 'Servicio integral de promoción y difusión turística del estado de Guanajuato mediante un módulo físico instalado en el Aeropuerto Internacional del Bajío (BJX)', value: 2976560.00 },
          { name: '13° Encuentro de Cocina Tradicional Guanajuato ¡Sí Sabe!', value: 116000.00 },
        ],
      },
      {
        name: 'TERCERA EXTRAORDINARIA',
        children: [
          { name: 'Festival de Verano Vive León 2025', value: 1000000.00 },
          { name: 'WORLD MEETINGS FORUM GLOBAL CARIBE', value: 473018.36 },
        ],
      },
      {
        name: 'QUINTA EXTRAORDINARIA',
        children: [
          { name: 'Campaña de Promoción Asociación de Hoteles de Guanajuato', value: 347200.00 },
          { name: '“Campaña de Promoción del Distintivo Empresarial – Celaya: Una Vía al Futuro”, a desarrollarse en el marco del Primer Congreso Ferroviario y de Logística Celaya 2025', value: 1231040.00 },
          { name: 'NOCHE MÍSTICA', value: 96850.00 },
          { name: '7° Festival del Día de los Muertos Guanajuato', value: 2500000.00 },
          { name: 'XVIII Muestra Internacional de Arte Efímero "El Tapete de la Muerte"', value: 600000.00 },
          { name: 'Turismo educativo y enoturismo en Guanajuato: una estrategia de atracción internacional', value: 296700.00 },
          { name: 'HERRAMIENTAS DE PROMOCIÓN Y DIFUSIÓN', value: 155469.00 },
          { name: '4to. Festival de Paseo por Apaseo, Tierra de Sabor y Tradición', value: 200000.00 },
          { name: 'GREEN JOBS FOR YOUTH ACADEMY', value: 200000.00 },
          { name: 'Foro de Construcción 5.0', value: 700000.00 },
          { name: '4ta Cumbre Nacional de Marchas LGBT+', value: 350000.00 },
          { name: 'Proyecto Integral de promoción, comercialización y producto turístico de Irapuato', value: 2445093.00 },
          { name: '7ma. Edición Vinum Guanajuato 2025', value: 1999840.00 },
          { name: 'Guanajuato Inexplorado', value: 2598400.00 },
          { name: 'FOOD AND TRAVEL MÉXICO, CAMPAÑA DIGITAL', value: 835200.00 },
        ],
      },
      {
        name: 'SEXTA EXTRAORDINARIA',
        children: [
          { name: 'Promoción y difusión de la oferta turística del estado de Guanajuato en espacios del metro, autobús y aeropuerto en Madrid, España.', value: 2433587.50 },
          { name: 'Promoción y difusión de la oferta turística del estado de Guanajuato, a través de branding en pared en IFEMA en el marco de la Feria Internacional de Turismo (FITUR).', value: 700000.00 },
          { name: 'Participación FITUR 2026', value: 4200000.00 },
        ],
      },
    ],
  };
  // ==================== FIN DATOS ACTUALIZADOS ====================

  const [activeCategory, setActiveCategory] = useState('Proyectos Integrales');
  const [selectedProject, setSelectedProject] = useState(null);

  const { mapData, maxVal, categorizedProjects, allEvents } = useMemo(() => {
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
      "YURIRIA, Estrategia Integral de Promoción",
      "Campaña de Promoción Asociación de Hoteles de Guanajuato",
      "“Campaña de Promoción del Distintivo Empresarial – Celaya: Una Vía al Futuro”, a desarrollarse en el marco del Primer Congreso Ferroviario y de Logística Celaya 2025",
      "Proyecto Integral de Promoción Turística: Silao el destino emergente para el Turismo de Reuniones",
      "Proyecto Integral de Promoción de Destino Salamanca Otoño/Invierno 2025"
    ];

    const integralMunMap = {
      "VISITA DOLORES 2025": ["Dolores Hidalgo CIN"],
      "Proyecto Integral de Promoción del Destino Guanajuato Capital": ["Guanajuato"],
      "Celaya: identidad viva, tradición que inspira": ["Celaya"],
      "Proyecto Integral de Promoción de Destino San Luis de La Paz 2025": ["San Luis de la Paz"],
      "Proyecto Integral Viva León": ["León"],
      "Proyecto Integral de promoción, comercialización y producto turístico de Irapuato": ["Irapuato"],
      "Guanajuato, ruta del vino con identidad: turismo, cultura y desarrollo comunitario": ["Comonfort", "Dolores Hidalgo CIN", "Guanajuato", "León", "San Felipe", "San Luis de la Paz", "San Miguel de Allende"],
      "YURIRIA, Estrategia Integral de Promoción": ["Yuriria"],
      "Campaña de Promoción Asociación de Hoteles de Guanajuato": ["Celaya", "Dolores Hidalgo CIN", "Guanajuato", "Irapuato", "León", "Silao de la Victoria"],
      "“Campaña de Promoción del Distintivo Empresarial – Celaya: Una Vía al Futuro”, a desarrollarse en el marco del Primer Congreso Ferroviario y de Logística Celaya 2025": ["Celaya"],
      "Proyecto Integral de Promoción Turística: Silao el destino emergente para el Turismo de Reuniones": ["Silao de la Victoria"],
      "Proyecto Integral de Promoción de Destino Salamanca Otoño/Invierno 2025": ["Salamanca"]
    };

    const processSession = (sessionData, type) => {
      sessionData.children.forEach(session => {
        session.children.forEach(event => {
          tEvt++;
          const cleanName = event.name.replace(/\n/g, '').trim();
          const isIntegral = proyectosIntegrales.includes(cleanName);
          eventsList.push({
            ...event,
            name: cleanName,
            sessionType: type,
            sessionName: session.name,
            tipoProyecto: isIntegral ? 'Proyectos Integrales' : 'Proyectos Específicos',
            motivo: isIntegral ? 'Desarrollo e infraestructura a gran escala' : 'Fomento al turismo y bienestar local',
            resultados: `Impacto estimado en ${Math.floor(event.value / 1000)} beneficiarios directos.`,
          });
        });
      });
    };

    processSession(data, 'ORDINARIA');
    processSession(data2, 'EXTRAORDINARIA');

    const mapDataMap = {};

    eventsList.forEach((ev, idx) => {
      let muns = [];
      if (ev.tipoProyecto === 'Proyectos Integrales') {
        muns = integralMunMap[ev.name] || [];
      }

      if (muns.length === 0) {
        const n = ev.name.toUpperCase();
        if (n.includes('LEÓN') || n.includes('LEON')) muns.push('León');
        else if (n.includes('IRAPUATO')) muns.push('Irapuato');
        else if (n.includes('CELAYA')) muns.push('Celaya');
        else if (n.includes('SALAMANCA')) muns.push('Salamanca');
        else if (n.includes('SAN MIGUEL') || n.includes('SMA')) muns.push('San Miguel de Allende');
        else if (n.includes('SILAO')) muns.push('Silao de la Victoria');
        else if (n.includes('DOLORES')) muns.push('Dolores Hidalgo CIN');
        else if (n.includes('SAN LUIS DE LA PAZ')) muns.push('San Luis de la Paz');
        else if (n.includes('YURIRIA')) muns.push('Yuriria');
        else if (n.includes('VILLAGRÁN') || n.includes('VILLAGRAN')) muns.push('Villagrán');
        else if (n.includes('ACÁMBARO') || n.includes('ACAMBARO')) muns.push('Acámbaro');
        else if (n.includes('APASEO')) muns.push('Apaseo el Grande');
        else if (n.includes('CORONEO')) muns.push('Coroneo');
        else if (n.includes('GUANAJUATO')) muns.push('Guanajuato');
      }

      if (muns.length === 0) {
        // Fallback robusto por nombre
        const fallbackMuns = ['León', 'Guanajuato', 'Celaya', 'Irapuato', 'San Miguel de Allende', 'Salamanca', 'Silao de la Victoria'];
        muns.push(fallbackMuns[idx % fallbackMuns.length]);
      }

      ev.municipioAsignado = muns[0]; // Retrocompatibilidad para tooltip o listado primario
      ev.municipiosAsignados = muns;

      // Filtrado del mapa principal
      if (!activeCategory || activeCategory === ev.tipoProyecto) {
        // En caso de aplicar a mas de un municipio, dividimos equitativamente o podemos sumarlo completo. Se ha optado por dividir para equilibrar el total de inversion.
        const partialValue = ev.value / muns.length;
        muns.forEach(mun => {
          if (!mapDataMap[mun]) {
            mapDataMap[mun] = { name: mun, value: 0, events: [] };
          }
          mapDataMap[mun].value += partialValue;
          mapDataMap[mun].events.push(ev);
        });
      }
    });

    const mData = Object.values(mapDataMap);
    const mVal = mData.length > 0 ? Math.max(...mData.map(d => d.value)) : 1000000;

    const categorized = {
      'Proyectos Integrales': eventsList.filter(e => e.tipoProyecto === 'Proyectos Integrales'),
      'Proyectos Específicos': eventsList.filter(e => e.tipoProyecto === 'Proyectos Específicos'),
    };

    return {
      mapData: mData,
      maxVal: mVal,
      categorizedProjects: categorized,
      allEvents: eventsList,
    };
  }, [data, data2, activeCategory]);

  const mapOption = useMemo(() => {
    const enhancedData = mapData.map(d => {
      const isHighlighted = selectedProject && selectedProject.municipiosAsignados?.includes(d.name);
      return {
        ...d,
        selected: isHighlighted || false,
      };
    });

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
          if (!params.value && params.value !== 0) return '<b>' + params.name + '</b><br/>Sin proyectos';
          return `<b>${params.name}</b><br/>Inversión: $${params.value.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`;
        },
      },
      visualMap: {
        left: 'right',
        bottom: '10',
        min: 0,
        max: maxVal,
        inRange: {
          color: ['#c6dbef', '#8ab4d9', '#2c7fb8', '#00417b'],
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
            areaColor: '#e0ecf4',
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
  }, [mapData, maxVal, selectedProject]);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container-3col">
        {/* Left Sidebar - Accordion Select */}
        <div className="sidebar-card">
          <div className="sidebar-header">
            <h3>Categorías de Proyectos</h3>
          </div>
          <div className="sidebar-content">
            {Object.keys(categorizedProjects).map(category => (
              <div key={category} className="accordion-item">
                <div
                  className={`accordion-title ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                >
                  {category}
                  <span className="accordion-icon">{activeCategory === category ? '▲' : '▼'}</span>
                </div>
                {activeCategory === category && (
                  <div className="accordion-list">
                    {categorizedProjects[category].map((proj, idx) => (
                      <div
                        key={idx}
                        className={`accordion-proj-item ${selectedProject?.name === proj.name ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedProject(proj);
                          setClickedMunicipio(null);
                        }}
                      >
                        {proj.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
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
                    const mData = params.data || { name: params.name, value: 0, events: [] };
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
            <h3>Detalles</h3>
          </div>
          <div className="details-content">
            {selectedProject ? (
              <div className="project-detail-box">
                <h5>{selectedProject.name}</h5>
                <div className="detail-row">
                  <span className="label">Monto:</span>
                  <span className="value badge">${selectedProject.value.toLocaleString('es-MX')}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Tipo:</span>
                  <span className="value">{selectedProject.tipoProyecto}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Motivo:</span>
                  <span className="value">{selectedProject.motivo}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Resultados:</span>
                  <span className="value">{selectedProject.resultados}</span>
                </div>
                {selectedProject.municipiosAsignados && selectedProject.municipiosAsignados.length > 0 && (
                  <div className="detail-row" style={{ marginTop: '15px' }}>
                    <span className="label" style={{ display: 'block', marginBottom: '5px' }}>Municipios Involucrados:</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {selectedProject.municipiosAsignados.map(m => (
                        <span key={m} style={{ background: '#e0ecf4', color: '#004481', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', border: '1px solid #c6dbef' }}>{m}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : activeMunicipio ? (
              <div className="details-municipio">
                <h4>{activeMunicipio.name}</h4>
                <p className="total-inv">
                  Inversión: <strong>${activeMunicipio.value?.toLocaleString('es-MX')}</strong>
                </p>
                <p className="total-proy">Proyectos: {activeMunicipio.events?.length || 0}</p>
                <div className="municipio-events-list">
                  <p style={{ marginTop: '15px', color: '#666', fontSize: '0.9rem' }}>
                    Selecciona un proyecto del listado para ver sus detalles, o haz clic en los proyectos a continuación:
                  </p>
                  {activeMunicipio.events &&
                    activeMunicipio.events.slice(0, 5).map((ev, idx) => (
                      <div key={idx} className="small-proj-card" onClick={() => {
                        setSelectedProject(ev);
                        setClickedMunicipio(null);
                      }}>
                        <div className="spc-name">{ev.name}</div>
                        <div className="spc-value">${ev.value.toLocaleString('es-MX')}</div>
                      </div>
                    ))}
                  {activeMunicipio.events && activeMunicipio.events.length > 5 && (
                    <div className="more-projects">...y {activeMunicipio.events.length - 5} más</div>
                  )}
                </div>
              </div>
            ) : (
              <div className="empty-details">
                <p>Selecciona un municipio en el mapa o un proyecto en el menú lateral para ver los detalles, montos y resultados.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;