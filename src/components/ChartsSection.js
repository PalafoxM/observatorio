import React from 'react';
import ReactECharts from 'echarts-for-react';
import './ChartsSection.css';

const ChartsSection = () => {
  const data = {
    "name": "Sesiones Ordinarias 2025",
    "children": [
      {
        "name": "PRIMERA ORDINARIA",
        "children": [
          {
            "name": "Forever Wedding Summit",
            "value": 486939.44
          },
          {
            "name": "Congreso Nacional de la Industria de Reuniones",
            "value": 728346.3
          },
          {
            "name": "Meeting Place León",
            "value": 2936419.5
          },
          {
            "name": "Congreso MPI",
            "value": 117594.48
          },
          {
            "name": "Congreso De Bodas y Eventos Sustentables LAT",
            "value": 321219.2
          },
          {
            "name": "PCMA Advisory Client Roadshow",
            "value": 941824
          },
          {
            "name": "Neextt Unique Hotels & Destinations SMA 2025",
            "value": 458200
          },
          {
            "name": "Plan de Medios SECTURI 2025",
            "value": 4292267.77
          },
          {
            "name": "Alianza comercial Expedia 2025",
            "value": 2000000
          },
          {
            "name": "Alianza comercial Planet IFE 2025",
            "value": 2691199
          },
          {
            "name": "Festival Endémico 2025",
            "value": 4000000
          },
          {
            "name": "13° Encuentro de Cocina Tradicional Guanajuato ¡Sí Sabe!",
            "value": 3205500
          }
        ]
      },
      {
        "name": "SEGUNDA ORDINARIA",
        "children": [
          {
            "name": "Red Bull Guanajuato Cerro Abajo",
            "value": 1200000
          },
          {
            "name": "La Carrera Panamericana 2025",
            "value": 700000
          },
          {
            "name": "Copa Ave Fénix 2025",
            "value": 150000
          },
          {
            "name": "Open International 2025",
            "value": 500000
          },
          {
            "name": "Maratón Capital",
            "value": 450000
          },
          {
            "name": "3er. Festival Internacional la Mujer a Caballo",
            "value": 400000
          },
          {
            "name": "ULTRA GUANAJUATO",
            "value": 200000
          },
          {
            "name": "COPA SULTANES 3ERA EDICIÓN",
            "value": 200000
          },
          {
            "name": "Candelabrum Metal Fest IV",
            "value": 800000
          },
          {
            "name": "Festival Estatal Pride León Ofarrell",
            "value": 250000
          },
          {
            "name": "Salva Rock Festival Multicultural VII 2025",
            "value": 100000
          },
          {
            "name": "Festival del día de muertos \"Camino al Mictlán\"",
            "value": 300000
          },
          {
            "name": "Senda del Arriero del Camino Real Tierra Adentro",
            "value": 300000
          },
          {
            "name": "Fermentes y Vino Natural",
            "value": 200000
          },
          {
            "name": "MILLESIME GNP WEEKEND",
            "value": 850000
          },
          {
            "name": "Tinto Bajío Festival de Vino Mexicano",
            "value": 400000
          },
          {
            "name": "DÉCIMO QUINTA EDICIÓN DE LA FERIA DE LA PANIFICACIÓN ACÁMBARO 2025",
            "value": 200000
          },
          {
            "name": "Octava Edición de – CAMBIANDO MIRADAS- Simposium Internacional de Síndrome de Down y Otras Neurodivergencias",
            "value": 250000
          },
          {
            "name": "LXXIV Congreso Nacional de la SMORLCCC",
            "value": 300000
          },
          {
            "name": "CREDIEXPO",
            "value": 200000
          },
          {
            "name": "Expo Guanajuato Provee 5ta edición",
            "value": 100000
          },
          {
            "name": "México Assembly Wire Expo",
            "value": 400000
          },
          {
            "name": "Participación en el 49 Tianguis Turístico de México de Baja California",
            "value": 8769116.45
          },
          {
            "name": "IBTM AMÉRICAS",
            "value": 2251086.66
          },
          {
            "name": "Socios comerciales (CONEXSTUR y PRIMERA PLUS)",
            "value": 800000
          },
          {
            "name": "Participación en el Tianguis Nacional de Pueblos Mágicos",
            "value": 800000
          },
          {
            "name": "Caravana de Identidad y Pertenencia",
            "value": 1500000
          }
        ]
      },
      {
        "name": "TERCERA ORDINARIA",
        "children": [
          {
            "name": "FORO WELLNESS yourself",
            "value": 150000
          },
          {
            "name": "Festival el Caballo y su Mundo",
            "value": 150000
          },
          {
            "name": "Festival De La Salud Saberes Ancestrales",
            "value": 100000
          },
          {
            "name": "5° Festival del Mango 2025",
            "value": 350000
          },
          {
            "name": "Apaseo en Corto",
            "value": 100000
          },
          {
            "name": "Festival Internacional de Papalotes y Cometas",
            "value": 250000
          },
          {
            "name": "7mo. Festival Internacional  Cala de Caballo 2025",
            "value": 500000
          },
          {
            "name": "Expo Mecánico Automotriz Internacional León 2025",
            "value": 300000
          },
          {
            "name": "Festival Internacional de Violoncello León Novena Edición",
            "value": 100000
          },
          {
            "name": "VIVE EL VINO",
            "value": 350000
          },
          {
            "name": "Feria de la poesía, vino y queso",
            "value": 300000
          },
          {
            "name": "Congreso Dento León UNAM",
            "value": 200000
          },
          {
            "name": "Congreso Veterinario de León",
            "value": 1999999
          },
          {
            "name": "5° Congreso anual “Anestesiología pediátrica a la vanguardia: Inteligencia artificial y nuevas realidades”",
            "value": 120000
          },
          {
            "name": "Expo Nopal 2025",
            "value": 300000
          },
          {
            "name": "Viva Guanajuato; sabor, música y folclor 2025",
            "value": 800000
          },
          {
            "name": "FESTIVAL PRIDE GUANAJUATO",
            "value": 150000
          },
          {
            "name": "VENDIMIA BRAVA 2025",
            "value": 300000
          },
          {
            "name": "Fiexpo Latin America",
            "value": 278300
          }
        ]
      },
      {
        "name": "CUARTA ORDINARIA",
        "children": [
          {
            "name": "Promoción de  experiencias de turismo de naturaleza en el Estado de Guanajuato",
            "value": 2091997.8
          },
          {
            "name": "YURIRIA, Estrategia Integral de Promoción",
            "value": 1716000
          },
          {
            "name": "Ultimate Urban Enduro",
            "value": 200000
          },
          {
            "name": "5° Torneo Internacional Veritas 2025",
            "value": 400000
          },
          {
            "name": "Copa Amistad Internacional 2025",
            "value": 600000
          },
          {
            "name": "1ER CONCURSO NACIONAL ARTESANAL DEL GABAN CORONEO, GUANAJUATO 2025",
            "value": 250000
          },
          {
            "name": "XXI Festival Medieval Guanajuato 2025",
            "value": 100000
          },
          {
            "name": "BANDAFEST 2025 VILLAGRÁN",
            "value": 1300000
          },
          {
            "name": "“Mátur’é, Camino al Mictlán”",
            "value": 1000000
          },
          {
            "name": "ETSKUNI",
            "value": 70000
          },
          {
            "name": "LEYENDAS GTO",
            "value": 1000000
          },
          {
            "name": "THE LEGACY Congreso Internacional de Danza Jazz 2a Edición",
            "value": 200000
          },
          {
            "name": "TASTE! Concurso y Reality Internacional en Diseño de Coctelería de Autor",
            "value": 300000
          },
          {
            "name": "SAN MIGUEL Y SUS SABORES",
            "value": 772637.68
          },
          {
            "name": "MICHEFEST, VILLAGRÁN 2025",
            "value": 500000
          },
          {
            "name": "Shaker Room 2025",
            "value": 120000
          },
          {
            "name": "Congreso Internacional de Diseño Guerra Grafica 2025",
            "value": 100000
          },
          {
            "name": "CONVENCION KONECTA LEON GTO VII",
            "value": 500000
          },
          {
            "name": "Congreso Nacional de Enfermería en Medicina Crítica",
            "value": 150000
          },
          {
            "name": "3er Congreso Internacional de mujeres y Líderes Empresariales",
            "value": 1500000
          },
          {
            "name": "XIV Seminario Iberoamericano de las Artesanías",
            "value": 100000
          },
          {
            "name": "Convención Anual y Expo ANEAS 2025 XXXVII",
            "value": 1999999
          },
          {
            "name": "Concierto de Carmina Burana con la Sinfónica de Minería",
            "value": 500000
          },
          {
            "name": "Festival De La Salud Saberes Ancestrales",
            "value": 293270
          },
          {
            "name": "Promoción y Difusión Turística del Estado de Guanajuato mediante Estrategia de Relaciones Públicas para el Fortalecimiento de la Oferta e Integración Municipal a través de FAM Trips Nacionales.",
            "value": 2759548.99
          },
          {
            "name": "MEETING PLACE GUANAJUATO",
            "value": 3290146
          },
          {
            "name": "Alianza comercial Mexitours 2025",
            "value": 300000
          }
        ]
      },
      {
        "name": "QUINTA ORDINARIA",
        "children": [
          {
            "name": "Proyecto Integral de Promoción Turística: Silao el destino emergente  para el Turismo de Reuniones",
            "value": 325000
          },
          {
            "name": "Proyecto Integral de Promoción de Destino Salamanca Otoño/Invierno 2025",
            "value": 1114873.02
          },
          {
            "name": "GIRA Tourism EXPO Japan",
            "value": 382974
          },
          {
            "name": "Roadshow Colombia",
            "value": 69798
          },
          {
            "name": "XXXI Festival Internacional de Jazz y Blues de San Miguel de Allende",
            "value": 70000
          },
          {
            "name": "Feria de Arte Popular Raíces y Colores",
            "value": 400000
          },
          {
            "name": "Magia en Guanajuato",
            "value": 1000000
          },
          {
            "name": "Hole & Wine 2025",
            "value": 250000
          },
          {
            "name": "TINTO APARTAMENTO",
            "value": 250000
          },
          {
            "name": "LXXII Congreso de Pediatría y XXXV Jornadas de Estomatología",
            "value": 250000
          },
          {
            "name": "CONGRESO Y 50 REUNION NACIONAL FEDERACIÓN MEXICANA DE  COLEGIOS  DE INGENIEROS CIVILES A.C.",
            "value": 600000
          },
          {
            "name": "4° Summit de la Industria de Reuniones León y Día Educativo PCOMM",
            "value": 376000
          },
          {
            "name": "Catando México, festival de  vinos mexicanos",
            "value": 200000
          },
          {
            "name": "Contratación de Banners en internet - Food & Wine en Español",
            "value": 417600
          },
          {
            "name": "Fortalecimiento a municipios de Guanajuato en Redes Sociales 2025",
            "value": 2000000
          }
        ]
      }
    ]
  };

  const data2 = {
    "name": "Sesiones Extraordinarias 2025",
    "children": [
      {
        "name": "PRIMERA EXTRAORDINARIA",
        "children": [
          {
            "name": "VISITA DOLORES 2025",
            "value": 2358286
          },
          {
            "name": "Proyecto Integral de Promoción del Destino Guanajuato Capital",
            "value": 6484440
          },
          {
            "name": "Celaya: identidad viva, tradición que inspira",
            "value": 2700000
          },
          {
            "name": "Proyecto Integral de Promoción de Destino San Luis de La Paz 2025",
            "value": 967360
          },
          {
            "name": "Guia México Desconocido 2025 - Edición Especial Guanajuato",
            "value": 1160000
          },
          {
            "name": "Roadshow Guanajuato por Estados Unidos y Colombia 2025",
            "value": 6485099.17
          },
          {
            "name": "Fiexpo Latin America",
            "value": 650000
          },
          {
            "name": "Alianza comercial CATAI VIAJES 2025",
            "value": 1296021.32
          },
          {
            "name": "Alianza comercial Planet IFE 2025",
            "value": 1131872
          }
        ]
      },
      {
        "name": "SEGUNDA EXTRAORDINARIA",
        "children": [
          {
            "name": "Proyecto Integral Viva León",
            "value": 12877000
          },
          {
            "name": "Proyecto Integral de promoción, comercialización y producto turístico de Irapuato",
            "value": 1325000
          },
          {
            "name": "Guanajuato, ruta del vino con identidad: turismo, cultura y desarrollo comunitario",
            "value": 1066874
          },
          {
            "name": "Publicidad en exteriores Aeropuerto Internacional de Querétaro AIQ",
            "value": 414999.96
          },
          {
            "name": "Servicio integral de promoción y difusión turística del estado de Guanajuato mediante un módulo físico instalado en el Aeropuerto Internacional del Bajío (BJX)",
            "value": 2976560
          },
          {
            "name": "13° Encuentro de Cocina Tradicional Guanajuato ¡Sí Sabe!",
            "value": 116000
          }
        ]
      },
      {
        "name": "TERCERA EXTRAORDINARIA",
        "children": [
          {
            "name": "Festival de Verano Vive León 2025",
            "value": 1000000
          },
          {
            "name": "WORLD MEETINGS FORUM GLOBAL CARIBE",
            "value": 473018.36
          }
        ]
      },
      {
        "name": "QUINTA EXTRAORDINARIA",
        "children": [
          {
            "name": "Campaña de Promoción Asociación de Hoteles de Guanajuato",
            "value": 347200
          },
          {
            "name": "“Campaña de Promoción del Distintivo Empresarial – Celaya: Una Vía al Futuro”, a desarrollarse en el marco del Primer Congreso Ferroviario y de Logística Celaya 2025",
            "value": 1231040
          },
          {
            "name": "NOCHE MÍSTICA",
            "value": 96850
          },
          {
            "name": "7° Festival del Día de los Muertos Guanajuato",
            "value": 2500000
          },
          {
            "name": "XVIII Muestra Internacional de Arte Efímero \"El Tapete de la Muerte\"",
            "value": 600000
          },
          {
            "name": "Turismo educativo y enoturismo en Guanajuato: una estrategia de atracción internacional",
            "value": 296700
          },
          {
            "name": "HERRAMIENTAS DE PROMOCIÓN Y DIFUSIÓN",
            "value": 155469
          },
          {
            "name": "4to. Festival de Paseo por Apaseo, Tierra de Sabor y Tradición",
            "value": 200000
          },
          {
            "name": "GREEN JOBS FOR YOUTH ACADEMY",
            "value": 200000
          },
          {
            "name": "Foro de Construcción 5.0",
            "value": 700000
          },
          {
            "name": "4ta Cumbre Nacional de Marchas LGBT+",
            "value": 350000
          },
          {
            "name": "Proyecto Integral de promoción, comercialización y producto turístico de Irapuato",
            "value": 2445093
          },
          {
            "name": " 7ma. Edición Vinum Guanajuato 2025",
            "value": 1999840
          },
          {
            "name": "Guanajuato Inexplorado",
            "value": 2598400
          },
          {
            "name": "FOOD AND TRAVEL MÉXICO,  CAMPAÑA DIGITAL",
            "value": 835200
          }
        ]
      },
      {
        "name": "SEXTA EXTRAORDINARIA",
        "children": [
          {
            "name": "Promoción y difusión de la oferta turística del estado de Guanajuato en espacios del metro, autobús y aeropuerto en Madrid, España.",
            "value": 2433587.5
          },
          {
            "name": "Promoción y difusión de la oferta turística del estado de Guanajuato, a través de branding en pared en IFEMA en el marco de la Feria Internacional de Turismo (FITUR).",
            "value": 700000
          },
          {
            "name": "Participación FITUR 2026",
            "value": 4200000
          }
        ]
      }
    ]
  };

  const option = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    legend: {
      top: '2%',
      left: '3%',
      orient: 'vertical',
      data: [
        {
          name: 'ORDINARIAS',
          icon: 'rectangle'
        },
        {
          name: 'EXTRAORDINARIAS',
          icon: 'rectangle'
        }
      ],
      borderColor: '#fff',
      textStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        type: 'tree',
        name: 'ORDINARIAS',
        data: [data],
        top: '5%',
        left: '7%',
        bottom: '2%',
        right: '60%',
        symbolSize: 7,
        label: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          color: '#fff'
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left',
            color: '#fff'
          }
        },
        emphasis: {
          focus: 'descendant'
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750
      },
      {
        type: 'tree',
        name: 'EXTRAORDINARIAS',
        data: [data2],
        top: '20%',
        left: '60%',
        bottom: '22%',
        right: '18%',
        symbolSize: 7,
        label: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          color: '#fff'
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left',
            color: '#fff'
          }
        },
        expandAndCollapse: true,
        emphasis: {
          focus: 'descendant'
        },
        animationDuration: 550,
        animationDurationUpdate: 750
      }
    ]
  };

  return (
    <div className="chart-container" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderRadius: '15px', padding: '20px' }}>
      <ReactECharts
        option={option}
        style={{ height: '700px', width: '100%' }}
        theme="light"
      />
    </div>
  );
};

export default ChartsSection;