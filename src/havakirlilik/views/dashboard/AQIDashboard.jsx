import React from 'react';
import { AQINames } from '../../const/enums';
import { pollutants } from '../../const/const';

// The breakpoints data provided
const breakpoints = {
  O3: [
    { AQI: [0, 50], C: [0.000, 0.054], name: AQINames.GOOD },
    { AQI: [51, 100], C: [0.055, 0.070], name: AQINames.MODERATE },
    { AQI: [101, 150], C: [0.071, 0.085], name: AQINames.UNHEALTHY_FOR_SENSITIVE },
    { AQI: [151, 200], C: [0.086, 0.105], name: AQINames.UNHEALTHY },
    { AQI: [201, 300], C: [0.106, 0.200], name: AQINames.VERY_UNHEALTHY },
  ],
  PM25: [
    { AQI: [0, 50], C: [0.0, 12.0], name: AQINames.GOOD },
    { AQI: [51, 100], C: [12.1, 35.4], name: AQINames.MODERATE },
    { AQI: [101, 150], C: [35.5, 55.4], name: AQINames.UNHEALTHY_FOR_SENSITIVE },
    { AQI: [151, 200], C: [55.5, 150.4], name: AQINames.UNHEALTHY },
    { AQI: [201, 300], C: [150.5, 250.4], name: AQINames.VERY_UNHEALTHY },
  ],
  PM10: [
    { AQI: [0, 50], C: [0, 54], name: AQINames.GOOD },
    { AQI: [51, 100], C: [55, 154], name: AQINames.MODERATE },
    { AQI: [101, 150], C: [155, 254], name: AQINames.UNHEALTHY_FOR_SENSITIVE },
    { AQI: [151, 200], C: [255, 354], name: AQINames.UNHEALTHY },
    { AQI: [201, 300], C: [355, 424], name: AQINames.VERY_UNHEALTHY },
  ],
  CO: [
    { AQI: [0, 50], C: [0.0, 4.4], name: AQINames.GOOD },
    { AQI: [51, 100], C: [4.5, 9.4], name: AQINames.MODERATE },
    { AQI: [101, 150], C: [9.5, 12.4], name: AQINames.UNHEALTHY_FOR_SENSITIVE },
    { AQI: [151, 200], C: [12.5, 15.4], name: AQINames.UNHEALTHY },
    { AQI: [201, 300], C: [15.5, 30.4], name: AQINames.VERY_UNHEALTHY },
  ],
  SO2: [
    { AQI: [0, 50], C: [0, 35], name: AQINames.GOOD },
    { AQI: [51, 100], C: [36, 75], name: AQINames.MODERATE },
    { AQI: [101, 150], C: [76, 185], name: AQINames.UNHEALTHY_FOR_SENSITIVE },
    { AQI: [151, 200], C: [186, 304], name: AQINames.UNHEALTHY },
    { AQI: [201, 300], C: [305, 604], name: AQINames.VERY_UNHEALTHY },
  ],
  NO2: [
    { AQI: [0, 50], C: [0, 53], name: AQINames.GOOD },
    { AQI: [51, 100], C: [54, 100], name: AQINames.MODERATE },
    { AQI: [101, 150], C: [101, 360], name: AQINames.UNHEALTHY_FOR_SENSITIVE },
    { AQI: [151, 200], C: [361, 649], name: AQINames.UNHEALTHY },
    { AQI: [201, 300], C: [650, 1249], name: AQINames.VERY_UNHEALTHY },
  ],
};

const pollutants_def = {
  O3: 'Ozone (O3)',
  PM25: 'Particulate Matter (PM2.5)',
  PM10: 'Particulate Matter (PM10)',
  CO: 'Carbon Monoxide (CO)',
  SO2: 'Sulfur Dioxide (SO2)',
  NO2: 'Nitrogen Dioxide (NO2)',
};

const AQIDashboard = () => {
  return (
    <div>
      <h3>Air Quality Index (AQI) for Pollutants</h3>
      {Object.keys(breakpoints).map(pollutant => (
        <div key={pollutant} style={{ marginBottom: '20px' }}>
          <h4>{pollutants_def[pollutant]}</h4>
          <table border="1" style={{ width: '80%', textAlign: 'center' }}>
            <thead>
              <tr>
                <th>AQI Range</th>
                <th>Concentration Range ({pollutants[pollutant].unit})</th>
              </tr>
            </thead>
            <tbody>
              {breakpoints[pollutant].map((range, index) => (
                <tr key={index} style={{ height: '40px' }}>
                  <td>{range.name}</td>
                  <td>{range.C[0]} - {range.C[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AQIDashboard;
