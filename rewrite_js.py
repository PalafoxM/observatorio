import re

with open('src/components/ChartsSection.js', 'r', encoding='utf-8') as f:
    old_code = f.read()

match = re.search(r'(const ChartsSection = \(\) => \{\n  const data = \{.+?)(  const commonOption = \{)', old_code, re.DOTALL)
if not match:
    # Just in case they had `const data2 = ` instead of `commonOption` matching
    import sys
    print("Could not match data structure.")
    sys.exit(1)

data_structure = match.group(1)

new_code = """import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import './ChartsSection.css';
import logo from '../assets/logo.png';
import guanajuatoGeoJson from '../assets/edo_guanajuato.geo.json';

// Registrar mapa globalmente
echarts.registerMap('Guanajuato', guanajuatoGeoJson);

""" + data_structure + """
  const { totalOrdinarias, totalExtraordinarias, totalEvents, mapData, maxVal } = useMemo(() => {
    let tOrd = 0;
    let tExt = 0;
    let tEvt = 0;
    const allEvents = [];

    // Process ordinarias
    data.children.forEach(session => {
      session.children.forEach(event => {
        tOrd += event.value;
        tEvt++;
        allEvents.push({ ...event, sessionType: 'ORDINARIA', sessionName: session.name });
      });
    });

    // Process extraordinarias
    data2.children.forEach(session => {
      session.children.forEach(event => {
        tExt += event.value;
        tEvt++;
        allEvents.push({ ...event, sessionType: 'EXTRAORDINARIA', sessionName: session.name });
      });
    });

    const getMunicipio = (name) => {
      const n = name.toUpperCase();
      if (n.includes('LEÓN') || n.includes('LEON')) return 'León';
      if (n.includes('IRAPUATO')) return 'Irapuato';
      if (n.includes('CELAYA')) return 'Celaya';
      if (n.includes('SALAMANCA')) return 'Salamanca';
      if (n.includes('SAN MIGUEL') || n.includes('SMA')) return 'San Miguel de Allende';
      if (n.includes('SILAO')) return 'Silao de la Victoria';
      if (n.includes('DOLORES')) return 'Dolores Hidalgo CIN';
      if (n.includes('SAN LUIS DE LA PAZ')) return 'San Luis de la Paz';
      if (n.includes('YURIRIA')) return 'Yuriria';
      if (n.includes('VILLAGRÁN') || n.includes('VILLAGRAN')) return 'Villagrán';
      if (n.includes('ACÁMBARO') || n.includes('ACAMBARO')) return 'Acámbaro';
      if (n.includes('APASEO')) return 'Apaseo el Grande';
      if (n.includes('CORONEO')) return 'Coroneo';
      if (n.includes('GUANAJUATO')) return 'Guanajuato';
      return null;
    };

    const mapDataMap = {};
    allEvents.forEach(ev => {
      const mun = getMunicipio(ev.name);
      if (mun) {
        if (!mapDataMap[mun]) {
          mapDataMap[mun] = { name: mun, value: 0, events: [] };
        }
        mapDataMap[mun].value += ev.value;
        mapDataMap[mun].events.push(ev);
      }
    });

    const mData = Object.values(mapDataMap);
    const mVal = mData.length > 0 ? Math.max(...mData.map(d => d.value)) : 1000000;

    return { totalOrdinarias: tOrd, totalExtraordinarias: tExt, totalEvents: tEvt, mapData: mData, maxVal: mVal };
  }, [data, data2]);

  const mapOption = useMemo(() => {
    return {
      title: {
        text: 'Inversión por municipios',
        left: 'center',
        textStyle: { color: '#004481', fontSize: 22, fontFamily: 'Georgia, serif', fontWeight: 'bold' },
        top: '20'
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          if (!params.value && params.value !== 0) return '<b style="color:#004481;">' + params.name + '</b><br/>Sin proyectos asignados directamente';
          
          let html = `<div style="max-width:320px; white-space:normal; font-family: sans-serif;">`;
          html += `<div style="font-weight:bold; font-size:16px; margin-bottom:5px; border-bottom:1px solid #ccc; padding-bottom:5px; color:#004481;">${params.name}</div>`;
          html += `<div style="font-size:14px; margin-bottom:10px; color:#333;">Inversión Total: <b style="color:#004481; font-size: 16px;">$${params.value.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</b></div>`;
          
          if (params.data && params.data.events) {
            html += `<div style="font-size:13px; font-weight:bold; margin-bottom:6px; color:#444;">Proyectos respaldados:</div>`;
            params.data.events.forEach(ev => {
              html += `<div style="font-size: 12px; margin-bottom: 8px; line-height: 1.3; border-left: 3px solid ${ev.sessionType === 'ORDINARIA' ? '#3498db' : '#e67e22'}; padding-left: 6px;">`;
              html += `<strong style="color: #666; font-size: 11px;">[${ev.sessionName}]</strong><br/>`;
              html += `<span style="color:#111;">${ev.name}</span> <br/><b style="color:#004481;">$${ev.value.toLocaleString('es-MX')}</b>`;
              html += `</div>`;
            });
          }
          html += `</div>`;
          return html;
        },
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        borderColor: '#ddd',
        borderWidth: 1,
        textStyle: {
          color: '#333'
        },
        extraCssText: 'box-shadow: 0 6px 15px rgba(0,0,0,0.15); border-radius: 8px; max-height: 400px; overflow-y: auto;'
      },
      visualMap: {
        left: 'right',
        bottom: '20',
        min: 0,
        max: maxVal,
        inRange: {
           // Colores tomados de la imagen: De azul muy suave a azul marino
          color: ['#e3eff6', '#a1cce8', '#4092cb', '#004a80']
        },
        text: ['Mayor inversión', 'Menor inversión'],
        calculable: true,
        textStyle: { color: '#333', fontSize: 11 },
        itemHeight: 120
      },
      series: [
        {
          name: 'Guanajuato',
          type: 'map',
          map: 'Guanajuato',
          roam: true, 
          scaleLimit: { min: 1, max: 6 },
          itemStyle: {
            areaColor: '#f5f5f5',
            borderColor: '#ffffff',
            borderWidth: 1.5
          },
          emphasis: {
            label: {
              show: true,
              color: '#333',
              fontWeight: 'bold',
              fontSize: 12
            },
            itemStyle: {
              areaColor: '#f1c40f',
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            show: false,
            color: '#fff',
            fontSize: 10
          },
          data: mapData
        }
      ]
    };
  }, [mapData, maxVal]);

  const totalInversion = totalOrdinarias + totalExtraordinarias;
  const fechaActual = new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        
        {/* Map Card */}
        <div className="dashboard-card map-card">
          <div className="echarts-wrapper">
            <ReactECharts
              option={mapOption}
              style={{ height: '100%', minHeight: '550px', width: '100%' }}
              theme="light"
            />
          </div>
        </div>

        {/* Summary Card */}
        <div className="dashboard-card summary-card">
          <div className="watermark">
            <img src={logo} alt="Marca de agua" />
          </div>
          
          <div className="summary-header">
            <p className="top-label">Total de inversión</p>
            <h2 className="main-number">${(totalInversion / 1000000).toFixed(1)}M</h2>
            <p className="subtitle">
              ${totalInversion.toLocaleString('es-MX', { minimumFractionDigits: 2 })} (100%)
            </p>
            <p className="year-range">2025</p>
          </div>

          <div className="summary-columns">
            <div className="summary-col">
              <p className="col-label">Sesiones Ordinarias</p>
              <h3 className="col-number">${(totalOrdinarias / 1000000).toFixed(1)}M</h3>
              <p className="col-sub">
                ${totalOrdinarias.toLocaleString('es-MX')} ({((totalOrdinarias / totalInversion) * 100).toFixed(2)}%)
              </p>
            </div>
            <div className="summary-col right-col">
              <p className="col-label">Sesiones Ext.</p>
              <h3 className="col-number">${(totalExtraordinarias / 1000000).toFixed(1)}M</h3>
              <p className="col-sub">
                ${totalExtraordinarias.toLocaleString('es-MX')} ({((totalExtraordinarias / totalInversion) * 100).toFixed(2)}%)
              </p>
            </div>
          </div>

          <div className="summary-footer">
            <p className="fecha-actualizacion">Fecha de actualización: <strong>{fechaActual}</strong></p>
            <p className="eventos-total">El total de eventos 2025 está distribuido en <strong>{totalEvents} proyectos</strong>.</p>
            <div className="footer-action">
              <span>Objetivo general</span>
              <button className="add-btn">+</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChartsSection;
"""

with open('src/components/ChartsSection.js', 'w', encoding='utf-8') as f:
    f.write(new_code)
