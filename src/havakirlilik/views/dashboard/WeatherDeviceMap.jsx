import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { createCustomIcon } from '../../util/createLeafletIcon'
import { FmdGood, LocationOn } from '@mui/icons-material'
import { AQINames } from '../../const/enums'
import { formatDate } from '../../util/formatDate'
import { pollutants } from '../../const/const'

const WeatherDeviceMap = ({ data: AQIData }) => {
  if (!AQIData || AQIData.length === 0) {
    return <p>No data available</p>
  }

  console.log("abc:", AQIData)
  const position = [
    AQIData.location.lat,
    AQIData.location.lon,
  ]

  const getPinColor = (aqi) => {
    console.log("aqi:", aqi)
    if (aqi == AQINames.GOOD || aqi == AQINames.MODERATE) {
      return "green";
    } else if (aqi == AQINames.UNHEALTHY_FOR_SENSITIVE || aqi == AQINames.UNHEALTHY) {
      return "orange";
    } else if (aqi == AQINames.VERY_UNHEALTHY || aqi == AQINames.HAZARDOUS) {
      return "red";
    }
  }

  return (
    <MapContainer center={position} zoom={16} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        key={AQIData.location.name}
        position={[AQIData.location.lat, AQIData.location.lon]}
        icon={createCustomIcon(<FmdGood />, getPinColor(AQIData.AQI), 50)
        }
      >
        <Popup>
            <div
              style={{
                fontFamily: 'Arial, sans-serif',
                lineHeight: 0.6,
                borderRadius: '5px',
              }}
            >
              <h5
                style={{ cursor: 'pointer', textDecoration: 'underline', color: 'black' }}
              >
                {`${AQIData.location.name} - ${AQIData.location.def}`}
              </h5>
              <p style={{ fontStyle: 'italic', color: 'gray' }}>
                {formatDate(AQIData.timestamp)}
              </p>
              
              <p><strong>AQI</strong>: {AQIData.AQI}</p>
              <p>O<sub>3</sub>: {AQIData.measurements.O3}{pollutants.O3.unit}</p>
              <p>PM<sub>25</sub>: {AQIData.measurements.PM25}{pollutants.PM25.unit}</p>
              <p>PM<sub>10</sub>: {AQIData.measurements.PM10}{pollutants.PM10.unit}</p>
              <p>CO: {AQIData.measurements.CO}{pollutants.CO.unit}</p>
              <p>SO<sub>2</sub>: {AQIData.measurements.SO2}{pollutants.SO2.unit}</p>
              <p>NO<sub>2</sub>: {AQIData.measurements.NO2}{pollutants.NO2.unit}</p>
            </div>
          
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default WeatherDeviceMap
