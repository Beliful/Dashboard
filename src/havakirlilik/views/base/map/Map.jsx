import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Agriculture, FmdGood, RssFeed } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import tractors from 'src/turktraktor/data/tractor'
import iotDevices from 'src/turktraktor/data/iot-devices'
import pollutionData1 from 'src/havakirlilik/util/pollutionData1'
import pollutionData2 from 'src/havakirlilik/util/pollutionData2'
import pollutionData3 from 'src/havakirlilik/util/pollutionData3'
import { TractorStatus, Location } from '../../../const/enums'
import { createCustomIcon } from '../../../util/createLeafletIcon'
import { locations, pollutants } from '../../../const/const'
import { formatDate } from '../../../util/formatDate'

const Map = () => {
  const [selectedVehicleStatuses, setSelectedVehicleStatuses] = useState(
    Object.values(TractorStatus),
  ) // All statuses selected initially
  const navigate = useNavigate()
  const [pollutionArray, setPollutions] = useState([])
  console.log("AAAAAAAAAAAAAAA")
  useEffect(() => {
    const dataArr = []

    let latestData = getLatestVehicleData(Location.IZMIR)
    latestData["location"] = locations.Izmir
    dataArr.push(latestData)

    latestData = getLatestVehicleData(Location.TURUNC)
    latestData["location"] = locations.Turunc
    dataArr.push(latestData)

    latestData = getLatestVehicleData(Location.DATCA)
    latestData["location"] = locations.Datca
    dataArr.push(latestData)

    console.log(dataArr)
    setPollutions(dataArr)
  }, [])

  const getLatestVehicleData = (location) => {
    let locationPollution = pollutionData3;

    if (location == Location.IZMIR) {
      locationPollution = pollutionData1
    } else if (location == Location.TURUNC) {
      locationPollution = pollutionData2
    }

    let latestData = locationPollution[locationPollution.length - 1]
    console.log(latestData)

    

    return latestData
  }

  return (
    <div style={{ height: '500px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>        
        <label
          style={{
            padding: '2px 10px',
          }}
        >
          Filter by status{' '}
        </label>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
            borderColor: 'red',
          }}
        >
          {Object.values(TractorStatus).map((status) => (
            <label
              key={status}
              style={{
                padding: '2px 10px',
              }}
            >
              <input
                type="checkbox"
                checked={selectedVehicleStatuses.includes(status)}
                onChange={() => handleVehicleStatusChange(status)}
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
        {pollutionArray.map((item) => {
          return (
            <Marker
              key={item.location.name}
              position={[item.location.lat, item.location.lon]}
              icon={createCustomIcon(<FmdGood />, 'red')
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
                      onClick={() => navigate(`/turktraktor/dashboard/vehicle/${currentVehicle.tractorId}`)}
                    >
                      {`${item.location.name} - ${item.location.def}`}
                    </h5>
                    <p style={{ fontStyle: 'italic', color: 'gray' }}>
                      {formatDate(item.timestamp)}
                    </p>
                    <p>O<sub>3</sub>: {item.O3}{pollutants.O3.unit}</p>
                    <p>PM<sub>25</sub>: {item.PM25}{pollutants.PM25.unit}</p>
                    <p>PM<sub>10</sub>: {item.PM10}{pollutants.PM10.unit}</p>
                    <p>CO: {item.CO}{pollutants.CO.unit}</p>
                    <p>SO<sub>2</sub>: {item.SO2}{pollutants.SO2.unit}</p>
                    <p>NO<sub>2</sub>: {item.NO2}{pollutants.NO2.unit}</p>
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