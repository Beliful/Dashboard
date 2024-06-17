import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Agriculture, RssFeed } from '@mui/icons-material'
import tractors from 'src/data/tractor'
import iotDevices from 'src/data/iot-devices'
import ReactDOMServer from 'react-dom/server'
import { getVehicleColor } from '../../../const/colors'
import { TractorStatus } from '../../../const/enums'
import tractorMeasurements from 'src/util/tractorMeasurements'
import { useNavigate } from 'react-router-dom'

// Function to create a Leaflet icon from a React component
const createCustomIcon = (icon, color) => {
  let svgString = ReactDOMServer.renderToString(icon)
  svgString = svgString.replace(/<path/g, `<path fill="${color}"`) // set color of the icon

  return new L.DivIcon({
    html: svgString,
    className: 'custom-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  })
}

const Map = () => {
  const [showTractors, setShowTractors] = useState(true)
  const navigate = useNavigate()

  const toggleDevices = () => {
    setShowTractors(!showTractors)
  }

  const getLatestVehicleData = (vehicleId) => {
    const currentTractor = tractorMeasurements.filter(
      (tractor) => tractor.tractorId === parseInt(vehicleId),
    )

    const tractorInfo = tractors.filter((item) => item.id === vehicleId)

    // console.log(tractorInfo[0])

    let currentVehicleData = currentTractor[currentTractor.length - 1]
    currentVehicleData['status'] =
      currentVehicleData.measurements.rpm == 0
        ? TractorStatus.STOPPED
        : currentVehicleData.measurements.speed == 0
          ? TractorStatus.IDLING
          : TractorStatus.RUNNING

    currentVehicleData['driver'] = tractorInfo[0].driver
    currentVehicleData['plateNumber'] = tractorInfo[0].plateNumber
    currentVehicleData['model'] = tractorInfo[0].model

    console.log(currentVehicleData)
    return currentVehicleData
  }

  const devices = showTractors ? tractors : iotDevices // Determine which devices to show based on state

  return (
    <div style={{ height: '500px' }}>
      {/* Ensure the container has a height */}
      <button onClick={toggleDevices}>{showTractors ? 'Show IOT Devices' : 'Show Tractors'}</button>
      <MapContainer center={[39, 35]} zoom={6} scrollWheelZoom={false} style={{ height: '100%' }}>
        {/* Set height for the MapContainer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {devices.map((device) => {
          let currentVehicle = ''

          if (showTractors) {
            currentVehicle = getLatestVehicleData(device.id)
            console.log('status:0', currentVehicle.status)
          }
          return (
            <Marker
              key={device.id}
              position={[device.location.latitude, device.location.longitude]}
              icon={
                showTractors
                  ? createCustomIcon(<Agriculture />, getVehicleColor(currentVehicle.status))
                  : createCustomIcon(<RssFeed />, 'black')
              }
            >
              <Popup>
                {showTractors ? (
                  <div
                    style={{
                      fontFamily: 'Arial, sans-serif',
                      lineHeight: 0.6,
                      borderRadius: '5px',
                    }}
                  >
                    <h5
                      style={{ cursor: 'pointer', textDecoration: 'underline', color: 'black' }}
                      onClick={() => navigate(`/dashboard/vehicle/${currentVehicle.tractorId}`)}
                    >
                      {currentVehicle.model}
                    </h5>
                    <p>Plate Number: {currentVehicle.plateNumber}</p>
                    <p>Status: {currentVehicle.status}</p>
                    <p>Driver: {currentVehicle.driver}</p>
                    <p>RPM: {currentVehicle.measurements.rpm}</p>
                    <p>Speed: {currentVehicle.measurements.speed}</p>
                  </div>
                ) : null}
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}

export default Map
