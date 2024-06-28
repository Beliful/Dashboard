import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Agriculture, FmdGood, RssFeed } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import pollutionData1 from 'src/havakirlilik/util/pollutionData1'
import pollutionData2 from 'src/havakirlilik/util/pollutionData2'
import pollutionData3 from 'src/havakirlilik/util/pollutionData3'
import pollutionData4 from 'src/havakirlilik/util/pollutionData4'
import { Location, AQINames } from '../../../const/enums'
import { createCustomIcon } from '../../../util/createLeafletIcon'
import { locations, pollutants } from '../../../const/const'
import { formatDate } from '../../../util/formatDate'
import { calculateAQI } from '../../../util/calculateAQI'

const Map = () => {
  const [selectedAQI, setSelectedAQI] = useState(
    Object.values(AQINames),
  ) // All statuses selected initially
  const [pollutionArray, setPollutions] = useState([])
  const navigate = useNavigate()

  const handleAQISelectionChange = (status) => {
    setSelectedAQI((prevStatuses) =>
      prevStatuses.includes(status)
        ? prevStatuses.filter((s) => s !== status)
        : [...prevStatuses, status],
    )
  }

  useEffect(() => {
    const dataArr = []

    let latestData = getLatestDeviceData(Location.IZMIR)
    latestData["location"] = locations.Izmir
    dataArr.push(latestData)

    latestData = getLatestDeviceData(Location.TURUNC)
    latestData["location"] = locations.Turunc
    dataArr.push(latestData)

    latestData = getLatestDeviceData(Location.DATCA)
    latestData["location"] = locations.Datca
    dataArr.push(latestData)

    latestData = getLatestDeviceData(Location.KUSADASI)
    latestData["location"] = locations.Kusadasi
    dataArr.push(latestData)

    setPollutions(dataArr)
  }, [])

  const getLatestDeviceData = (location) => {
    let locationPollution = pollutionData3;

    if (location == Location.IZMIR) {
      locationPollution = pollutionData1
    } else if (location == Location.TURUNC) {
      locationPollution = pollutionData2
    } else if (location == Location.KUSADASI) {
      locationPollution = pollutionData4
    }

    let latestData = locationPollution[locationPollution.length - 1]
    latestData["AQI"] = calculateAQI(latestData.measurements)
    console.log(latestData)   

    return latestData
  }

  const getPinColor = (aqi) => {
    if (aqi == AQINames.GOOD || aqi == AQINames.MODERATE) {
      return "green";
    } else if (aqi == AQINames.UNHEALTHY_FOR_SENSITIVE || aqi == AQINames.UNHEALTHY) {
      return "orange";
    } else if (aqi == AQINames.VERY_UNHEALTHY || aqi == AQINames.HAZARDOUS) {
      return "red";
    }
  }

  return (
    <div style={{ height: '500px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>        
        <label
          style={{
            padding: '2px 10px',
          }}
        >
          Filter by AQI{' '}
        </label>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
            borderColor: 'red',
          }}
        >
          {Object.values(AQINames).map((status) => (
            <label
              key={status}
              style={{
                padding: '2px 10px',
              }}
            >
              <input
                type="checkbox"
                checked={selectedAQI.includes(status)}
                onChange={() => handleAQISelectionChange(status)}
              />
              {status}
            </label>
          ))}
        </div>
      </div>
      <MapContainer center={[38, 30]} zoom={7} scrollWheelZoom={true} style={{ height: '90%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {pollutionArray
          .filter(item => selectedAQI.includes(item.AQI)) // Filter markers based on selected AQI
          .map((item) => {
          return (
            <Marker
              key={item.location.name}
              position={[item.location.lat, item.location.lon]}
              icon={createCustomIcon(<FmdGood />, getPinColor(item.AQI))
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
                      onClick={() => navigate(`/havakirlilik/dashboard/device/${item.location.id}`)}
                    >
                      {`${item.location.name} - ${item.location.def}`}
                    </h5>
                    <p style={{ fontStyle: 'italic', color: 'gray' }}>
                      {formatDate(item.timestamp)}
                    </p>
                    
                    <p><strong>AQI</strong>: {item.AQI}</p>
                    <p>O<sub>3</sub>: {item.measurements.O3}{pollutants.O3.unit}</p>
                    <p>PM<sub>25</sub>: {item.measurements.PM25}{pollutants.PM25.unit}</p>
                    <p>PM<sub>10</sub>: {item.measurements.PM10}{pollutants.PM10.unit}</p>
                    <p>CO: {item.measurements.CO}{pollutants.CO.unit}</p>
                    <p>SO<sub>2</sub>: {item.measurements.SO2}{pollutants.SO2.unit}</p>
                    <p>NO<sub>2</sub>: {item.measurements.NO2}{pollutants.NO2.unit}</p>
                  </div>
                
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}

export default Map
