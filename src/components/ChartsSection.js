import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import './ChartsSection.css';
import guanajuatoJson from '../assets/edo_guanajuato.geo.json';

const ChartsSection = () => {
  // Estados para los dos gráficos
  const [mapOption, setMapOption] = useState(null);
  const [municipioOption, setMunicipioOption] = useState(null);
  const [selectedMunicipio, setSelectedMunicipio] = useState(null);
  const [municipioGeoData, setMunicipioGeoData] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  // Refs para los gráficos
  const chartRef = useRef(null);
  const municipioChartRef = useRef(null);
  const intervalRef = useRef(null);
  const mapOptionRef = useRef(null);
  const barOptionRef = useRef(null);

  // Detectar cambios en el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Inicializar

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Función para obtener dimensiones responsivas
  const getResponsiveDimensions = useCallback(() => {
    if (windowSize.width < 576) { // Mobile pequeño
      return {
        chartHeight: 400,
        pieRadius: 8,
        fontSize: 10,
        legendFontSize: 9,
        titleFontSize: 16,
        labelFontSize: 9
      };
    } else if (windowSize.width < 768) { // Mobile/Tablet
      return {
        chartHeight: 450,
        pieRadius: 10,
        fontSize: 11,
        legendFontSize: 10,
        titleFontSize: 18,
        labelFontSize: 10
      };
    } else if (windowSize.width < 992) { // Tablet
      return {
        chartHeight: 500,
        pieRadius: 12,
        fontSize: 12,
        legendFontSize: 11,
        titleFontSize: 20,
        labelFontSize: 11
      };
    } else { // Desktop
      return {
        chartHeight: 550,
        pieRadius: 15,
        fontSize: 14,
        legendFontSize: 12,
        titleFontSize: 22,
        labelFontSize: 12
      };
    }
  }, [windowSize.width]);

  // Procesar el GeoJSON para extraer municipios individuales
  useEffect(() => {
    if (guanajuatoJson && guanajuatoJson.features) {
      const municipiosData = {};
      
      guanajuatoJson.features.forEach(feature => {
        const municipioName = feature.properties?.name;
        if (municipioName) {
          // Crear un FeatureCollection con solo este municipio
          municipiosData[municipioName] = {
            type: "FeatureCollection",
            features: [feature]
          };
          
          // Calcular el centro del polígono para posicionar gráficos
          if (feature.geometry.type === 'Polygon' && feature.geometry.coordinates[0]) {
            const coordinates = feature.geometry.coordinates[0];
            let minX = Infinity, maxX = -Infinity;
            let minY = Infinity, maxY = -Infinity;
            
            // Encontrar los límites del polígono
            coordinates.forEach(coord => {
              const [x, y] = coord;
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            });
            
            // Calcular centro aproximado
            const centerX = (minX + maxX) / 2;
            const centerY = (minY + maxY) / 2;
            
            municipiosData[municipioName].center = [centerX, centerY];
            municipiosData[municipioName].bounds = { minX, maxX, minY, maxY };
          }
        }
      });
      
      setMunicipioGeoData(municipiosData);
    }
  }, []);

  // Datos de población
  const populationData = [
    { name: 'Celaya', value: 1650000 },
    { name: 'León', value: 580000 },
    { name: 'Irapuato', value: 500000 },
    { name: 'Guanajuato', value: 270000 },
    { name: 'Silao', value: 200000 },
    { name: 'Yuriria', value: 120000 },
    { name: 'San Luis de la Paz', value: 90000 },
    { name: 'Dolores Hidalgo', value: 130000 },
    { name: 'Salamanca', value: 130000 },
    { name: 'San Miguel de Allende', value: 130000 },
    { name: 'Comonfort', value: 130000 },
    { name: 'San Felipe', value: 130000 },
  ];

  // Función para crear gráficos de tarta sobre el mapa
  const createPieSeries = useCallback((center, radius = 20) => {
    const dimensions = getResponsiveDimensions();
    const actualRadius = radius * (dimensions.pieRadius / 15); // Ajuste proporcional
    
    const categories = ['Proyectos', 'Region', 'Comercio', 'Servicios'];
    const pieData = categories.map((category, index) => ({
      value: Math.round(Math.random() * 100),
      name: category
    }));

    return {
      type: 'pie',
      coordinateSystem: 'geo',
      tooltip: {
        formatter: '{b}: {c} ({d}%)',
        textStyle: {
          fontSize: dimensions.fontSize
        }
      },
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
      animationDuration: 300,
      radius: actualRadius,
      center: center,
      data: pieData,
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2
      },
      emphasis: {
        scale: true,
        scaleSize: 5,
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    };
  }, [getResponsiveDimensions]);

  // Manejar clic en municipio del primer mapa
  const handleMunicipioClick = useCallback((params) => {
    if (params.componentType === 'series' && params.seriesType === 'map') {
      const municipioName = params.name;
      
      if (municipioGeoData[municipioName]) {
        setSelectedMunicipio(municipioName);
        
        const municipioMapName = `municipio_${municipioName.replace(/\s+/g, '_')}`;
        const dimensions = getResponsiveDimensions();
        
        try {
          echarts.registerMap(municipioMapName, municipioGeoData[municipioName]);
        } catch (error) {
          console.warn('Error registrando mapa:', error);
        }
        
        const center = municipioGeoData[municipioName]?.center || [-101.0, 20.8];
        
        // Crear opción para mostrar solo el municipio con ajustes responsivos
        const municipioChartOption = {
          title: {
            text: municipioName,
            left: 'center',
            textStyle: {
              fontSize: dimensions.titleFontSize,
              fontWeight: 'bold',
              color: '#2c3e50'
            },
            subtext: 'Municipio - Distribución por Sectores',
            subtextStyle: {
              fontSize: Math.max(dimensions.fontSize - 2, 10),
              color: '#7f8c8d',
              fontWeight: 'normal'
            }
          },
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderColor: '#3498db',
            borderWidth: 1,
            textStyle: {
              color: '#fff',
              fontSize: dimensions.fontSize
            },
            formatter: function(params) {
              if (params.seriesType === 'pie') {
                return `<div style="padding: 5px; font-size: ${dimensions.fontSize}px;">
                  <strong>${params.name}</strong><br/>
                  Valor: ${params.value}<br/>
                  Porcentaje: ${params.percent}%
                </div>`;
              }
              return params.name;
            }
          },
          geo: {
            map: municipioMapName,
            roam: !isMobile, // Deshabilitar roam en móvil para mejor UX
            zoom: isMobile ? 1.5 : 1.2,
            center: center,
            label: {
              show: !isMobile, // Ocultar etiquetas en móvil
              color: '#2c3e50',
              fontSize: dimensions.labelFontSize,
              fontWeight: 'bold',
              formatter: '{b}'
            },
            itemStyle: {
              areaColor: '#f8f9fa',
              borderColor: '#3498db',
              borderWidth: 2,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            },
            emphasis: {
              itemStyle: {
                areaColor: '#3498db',
                borderColor: '#2980b9',
                borderWidth: 3
              },
              label: {
                show: true,
                color: '#2c3e50',
                fontWeight: 'bold',
                fontSize: Math.min(dimensions.labelFontSize + 2, 16)
              }
            },
            select: {
              itemStyle: {
                areaColor: '#e74c3c'
              }
            }
          },
          legend: {
            type: isMobile ? 'plain' : 'scroll',
            orient: isMobile ? 'horizontal' : 'vertical',
            right: isMobile ? 'auto' : 20,
            top: isMobile ? 40 : 'middle',
            bottom: isMobile ? 10 : 'auto',
            textStyle: {
              color: '#2c3e50',
              fontSize: dimensions.legendFontSize
            },
            data: ['Agricultura', 'Industria', 'Comercio', 'Servicios'],
            selectedMode: false
          },
          series: [
            createPieSeries([center[0] - 0.005, center[1] + 0.005], 15),
            createPieSeries([center[0] + 0.005, center[1] - 0.005], 15),
            createPieSeries([center[0] - 0.01, center[1] - 0.01], 12),
            createPieSeries([center[0] + 0.01, center[1] + 0.01], 12),
          ]
        };

        setMunicipioOption(municipioChartOption);
        
        // Resaltar municipio en el primer gráfico
        const echartsInstance = chartRef.current?.getEchartsInstance();
        if (echartsInstance) {
          echartsInstance.dispatchAction({
            type: 'select',
            seriesIndex: 0,
            name: municipioName
          });
        }
      }
    }
  }, [municipioGeoData, createPieSeries, getResponsiveDimensions, isMobile]);

  // Resetear a vista inicial
  const resetToInitialView = useCallback(() => {
    setSelectedMunicipio(null);
    setMunicipioOption(null);
    
    const echartsInstance = chartRef.current?.getEchartsInstance();
    if (echartsInstance) {
      echartsInstance.dispatchAction({
        type: 'unselect',
        seriesIndex: 0
      });
    }
  }, []);

  // Efecto principal - Configurar primer gráfico
  useEffect(() => {
    const dimensions = getResponsiveDimensions();
    
    // Registrar mapa completo de Guanajuato
    echarts.registerMap('Guanajuato', guanajuatoJson);
    
    // Ordenar datos
    const sortedData = [...populationData].sort((a, b) => a.value - b.value);

    // Configuración del mapa responsivo
    mapOptionRef.current = {
      title: {
        text: '12 - Proyectos Integrales',
        left: 'center',
        textStyle: {
          fontSize: dimensions.titleFontSize,
          fontWeight: 'bold',
          color: '#2c3e50'
        },
        subtext: 'Haz clic en un municipio para ver detalles',
        subtextStyle: {
          fontSize: Math.max(dimensions.fontSize - 2, 10),
          color: '#7f8c8d'
        }
      },
      tooltip: {
        trigger: 'item',
        textStyle: {
          fontSize: dimensions.fontSize
        },
        formatter: function(params) {
          const city = populationData.find(c => c.name === params.name);
          const population = city ? city.value.toLocaleString() : 'N/A';
          return `<div style="padding: 10px; border-radius: 4px; font-size: ${dimensions.fontSize}px;">
            <strong style="color: #3498db;">${params.name}</strong><br/>
            <span style="color: #2c3e50;">Población: ${population}</span><br/>
            <small style="color: #95a5a6;">Click para ver detalles</small>
          </div>`;
        }
      },
      visualMap: {
        left: isMobile ? 'center' : 'right',
        top: isMobile ? 20 : 'center',
        bottom: isMobile ? 'auto' : 'center',
        min: 80000,
        max: 1650000,
        inRange: {
          color: ['#d6eaf8', '#3498db', '#21618c']
        },
        text: ['ALTA', 'BAJA'],
        textStyle: {
          color: '#2c3e50',
          fontSize: dimensions.legendFontSize
        },
        calculable: true,
        orient: isMobile ? 'horizontal' : 'vertical',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#bdc3c7',
        borderWidth: 1,
        padding: 10,
        itemWidth: 20,
        itemHeight: 150
      },
      series: [{
        id: 'population',
        type: 'map',
        roam: !isMobile, // Solo permitir roam en desktop
        map: 'Guanajuato',
        animationDurationUpdate: 1000,
        universalTransition: true,
        data: populationData,
        label: {
          show: !isMobile, // Ocultar etiquetas en móvil
          fontSize: dimensions.labelFontSize
        },
        emphasis: {
          itemStyle: {
            areaColor: '#3498db',
            borderColor: '#2980b9',
            borderWidth: 2
          },
          label: {
            show: true,
            color: '#2c3e50',
            fontWeight: 'bold',
            fontSize: Math.min(dimensions.labelFontSize + 2, 14)
          }
        },
        select: {
          itemStyle: {
            areaColor: '#e74c3c',
            borderColor: '#c0392b',
            borderWidth: 3
          },
          label: {
            show: true,
            color: '#c0392b',
            fontWeight: 'bold',
            fontSize: Math.min(dimensions.labelFontSize + 2, 14)
          }
        },
        selectedMode: 'single'
      }]
    };

    // Configuración de barras responsiva
    barOptionRef.current = {
      title: {
        text: 'Monto total programado $154,055,937.59',
        left: 'center',
        textStyle: {
          fontSize: dimensions.titleFontSize,
          fontWeight: 'bold',
          color: '#2c3e50'
        }
      },
      grid: {
        left: isMobile ? '8%' : '3%',
        right: isMobile ? '5%' : '8%',
        bottom: isMobile ? '15%' : '3%',
        top: isMobile ? '20%' : '15%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        name: 'Población',
        nameTextStyle: {
          color: '#2c3e50',
          fontSize: dimensions.fontSize
        },
        axisLabel: {
          color: '#2c3e50',
          fontSize: dimensions.labelFontSize,
          formatter: (value) => {
            if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
            if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
            return value.toLocaleString();
          }
        },
        splitLine: {
          lineStyle: {
            color: '#ecf0f1'
          }
        }
      },
      yAxis: {
        type: 'category',
        axisLabel: { 
          rotate: isMobile ? 45 : 30,
          fontSize: dimensions.labelFontSize,
          color: '#2c3e50',
          interval: 0
        },
        data: sortedData.map(d => d.name)
      },
      series: [{
        id: 'population',
        type: 'bar',
        data: sortedData.map(d => d.value),
        universalTransition: true,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [{
              offset: 0, color: '#3498db'
            }, {
              offset: 1, color: '#2c3e50'
            }]
          },
          borderRadius: [0, 8, 8, 0]
        },
        emphasis: {
          itemStyle: {
            color: '#e74c3c',
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        },
        label: {
          show: !isMobile, // Ocultar labels en móvil para evitar sobrecarga
          position: 'right',
          fontSize: dimensions.labelFontSize,
          formatter: function(params) {
            if (params.value >= 1000000) return `${(params.value / 1000000).toFixed(1)}M`;
            if (params.value >= 1000) return `${(params.value / 1000).toFixed(0)}k`;
            return params.value.toLocaleString();
          },
          color: '#2c3e50',
          fontWeight: 'bold'
        }
      }],
      tooltip: {
        trigger: 'axis',
        textStyle: {
          fontSize: dimensions.fontSize
        },
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: 'rgba(52, 152, 219, 0.3)'
          }
        },
        formatter: function(params) {
          const value = params[0].value;
          const formattedValue = value >= 1000000 
            ? `${(value / 1000000).toFixed(1)} millones`
            : value >= 1000 
              ? `${(value / 1000).toFixed(0)} mil`
              : value.toLocaleString();
          return `<div style="padding: 10px; border-radius: 4px; font-size: ${dimensions.fontSize}px;">
            <strong style="color: #3498db;">${params[0].name}</strong><br/>
            <span style="color: #2c3e50;">Población: ${formattedValue}</span>
          </div>`;
        }
      }
    };

    // Inicializar primer gráfico
    setMapOption(mapOptionRef.current);

    // Solo iniciar intervalo en desktop
    if (windowSize.width >= 768) {
      let isMap = true;
      intervalRef.current = setInterval(() => {
        isMap = !isMap;
        const echartsInstance = chartRef.current?.getEchartsInstance();
        if (echartsInstance) {
          try {
            echartsInstance.setOption(
              isMap ? mapOptionRef.current : barOptionRef.current,
              true
            );
          } catch (err) {
            console.error('Error al actualizar gráfico:', err);
          }
        }
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [windowSize.width, isMobile, getResponsiveDimensions]);

  // Configurar eventos del primer gráfico
  useEffect(() => {
    const echartsInstance = chartRef.current?.getEchartsInstance();
    if (!echartsInstance) return;

    echartsInstance.off('click');
    echartsInstance.on('click', handleMunicipioClick);

    return () => {
      if (echartsInstance) {
        echartsInstance.off('click');
      }
    };
  }, [handleMunicipioClick]);

  // Función para redimensionar gráficos cuando cambia el tamaño de ventana
  useEffect(() => {
    const resizeCharts = () => {
      if (chartRef.current) {
        const echartsInstance = chartRef.current.getEchartsInstance();
        echartsInstance.resize();
      }
      if (municipioChartRef.current) {
        const echartsInstance = municipioChartRef.current.getEchartsInstance();
        echartsInstance.resize();
      }
    };

    window.addEventListener('resize', resizeCharts);
    return () => window.removeEventListener('resize', resizeCharts);
  }, []);

  const dimensions = getResponsiveDimensions();

  return (
    <div className="chart-container">
      <div className="chart-section1">
        {mapOption && (
          <ReactECharts
            ref={chartRef}
            option={mapOption}
            notMerge={false}
            lazyUpdate={true}
            style={{ 
              height: `${dimensions.chartHeight}px`, 
              width: '100%',
              minHeight: '300px'
            }}
            theme="light"
            opts={{ 
              renderer: 'canvas',
              devicePixelRatio: window.devicePixelRatio || 1
            }}
            onEvents={{
              'click': handleMunicipioClick
            }}
          />
        )}
      </div>
      
      <div className="chart-section2">
        {municipioOption ? (
          <>
            <ReactECharts
              ref={municipioChartRef}
              option={municipioOption}
              notMerge={false}
              lazyUpdate={true}
              style={{ 
                height: `${dimensions.chartHeight}px`, 
                width: '100%',
                minHeight: '300px'
              }}
              theme="light"
              opts={{ 
                renderer: 'canvas',
                devicePixelRatio: window.devicePixelRatio || 1
              }}
            />
            {selectedMunicipio && (
              <div className="municipio-details">
                <div className="municipio-info">
                  <h3>Municipio: {selectedMunicipio}</h3>
                  <p>Se está mostrando el polígono específico del municipio con distribución sectorial.</p>
                  <div className="municipio-features">
                    <p><strong>Características:</strong></p>
                    <ul>
                      <li>Mapa individual del municipio</li>
                      <li>Gráficos de tarta por sectores económicos</li>
                      <li>{isMobile ? 'Toque para interactuar' : 'Zoom y navegación'}</li>
                      <li>Información detallada en tooltips</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="no-selection">
            <div className="placeholder-message">
              <h3>🌎 Selecciona un Municipio</h3>
              <p>Haz {isMobile ? 'toque' : 'clic'} en cualquier municipio del mapa superior para ver su representación individual aquí.</p>
              <p>Podrás ver el polígono exacto del municipio seleccionado con gráficos de distribución sectorial.</p>
              <div className="placeholder-features">
                <p><strong>Funcionalidades disponibles:</strong></p>
                <ul>
                  <li>Visualización individual de cada municipio</li>
                  <li>Gráficos de tarta por sectores económicos</li>
                  <li>{isMobile ? 'Toque para interactuar' : 'Zoom y navegación'}</li>
                  <li>Información detallada interactiva</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartsSection;