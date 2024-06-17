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
import deviceData from 'src/data/devices'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../../../util/formatDate'

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

    return currentVehicleData
  }

  const getLatestIoTData = (deviceId) => {
    const currentDevice = deviceData.filter((device) => device.id === parseInt(deviceId))

    const deviceInfo = iotDevices.filter((item) => item.id === deviceId)
    // console.log(deviceInfo)

    let currentDeviceData = currentDevice[currentDevice.length - 1]

    // currentDeviceData['name'] = deviceInfo.name
    // currentDeviceData['plateNumber'] = tractorInfo[0].plateNumber
    // currentDeviceData['model'] = tractorInfo[0].model
    console.log(currentDeviceData)
    return currentDeviceData
  }

  const data = showTractors ? tractors : iotDevices // Determine which devices to show based on state
  // console.log(data)

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
        {data.map((item) => {
          let currentVehicle = ''
          let currentDevice = ''

          if (showTractors) {
            currentVehicle = getLatestVehicleData(item.id)
          } else {
            currentDevice = getLatestIoTData(item.id)
          }
          return (
            <Marker
              key={item.id}
              position={[item.location.latitude, item.location.longitude]}
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
                    <p style={{ fontStyle: 'italic', color: 'gray' }}>
                      {formatDate(currentVehicle.timestamp)}
                    </p>
                    <p>Plate Number: {currentVehicle.plateNumber}</p>
                    <p>Status: {currentVehicle.status}</p>
                    <p>Driver: {currentVehicle.driver}</p>
                    <p>RPM: {currentVehicle.measurements.rpm}</p>
                    <p>Speed: {currentVehicle.measurements.speed}</p>
                  </div>
                ) : (
                  <div
                    style={{
                      fontFamily: 'Arial, sans-serif',
                      lineHeight: 0.6,
                      borderRadius: '5px',
                    }}
                  >
                    <h5
                      style={{ cursor: 'pointer', textDecoration: 'underline', color: 'black' }}
                      onClick={() => navigate(`/iot-devices/${currentDevice.id}`)}
                    >
                      {currentDevice.name}
                    </h5>
                    <p style={{ fontStyle: 'italic', color: 'gray' }}>
                      {formatDate(currentDevice.timestamp)}
                    </p>
                    {currentDevice.sensorsData.temperature ? (
                      <p>Temperature: {currentDevice.sensorsData.temperature}</p>
                    ) : null}
                    {currentDevice.sensorsData.pressure ? (
                      <p>Pressure: {currentDevice.sensorsData.pressure}</p>
                    ) : null}
                    {currentDevice.sensorsData.humidity ? (
                      <p>Humidty: {currentDevice.sensorsData.humidity}</p>
                    ) : null}
                  </div>
                )}
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}

export default Map
