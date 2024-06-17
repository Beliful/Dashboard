import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Agriculture, RssFeed } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import tractors from 'src/data/tractor'
import iotDevices from 'src/data/iot-devices'
import tractorMeasurements from 'src/util/tractorMeasurements'
import deviceData from 'src/data/devices'
import { getVehicleColor } from '../../../const/colors'
import { TractorStatus, SensorTypes } from '../../../const/enums'
import { formatDate } from '../../../util/formatDate'
import { createCustomIcon } from '../../../util/createLeafletIcon'
import { borderColor } from '@mui/system'
import sensorTypes from '../../../data/iot-device-types'

const Map = () => {
  const [showTractors, setShowTractors] = useState(true)
  const [selectedVehicleStatuses, setSelectedVehicleStatuses] = useState(
    Object.values(TractorStatus),
  ) // All statuses selected initially
  const [selectedDeviceStatuses, setSelectedDeviceStatuses] = useState(Object.values(SensorTypes))
  const navigate = useNavigate()

  const toggleDevices = () => {
    setShowTractors(!showTractors)
  }

  const handleVehicleStatusChange = (status) => {
    setSelectedVehicleStatuses((prevStatuses) =>
      prevStatuses.includes(status)
        ? prevStatuses.filter((s) => s !== status)
        : [...prevStatuses, status],
    )
  }

  const handleDeviceStatusChange = (status) => {
    setSelectedDeviceStatuses((prevStatuses) =>
      prevStatuses.includes(status)
        ? prevStatuses.filter((s) => s !== status)
        : [...prevStatuses, status],
    )
  }

  const getLatestVehicleData = (vehicleId) => {
    const currentTractor = tractorMeasurements.filter(
      (tractor) => tractor.tractorId === parseInt(vehicleId),
    )

    const tractorInfo = tractors.filter((item) => item.id === vehicleId)

    let currentVehicleData = currentTractor[currentTractor.length - 1]
    currentVehicleData['status'] =
      currentVehicleData.measurements.rpm == 0
        ? TractorStatus.STOPPED
        : currentVehicleData.measurements.speed == 0
          ? TractorStatus.IDLING
          : TractorStatus.RUNNING

    console.log(currentVehicleData)

    currentVehicleData['driver'] = tractorInfo[0].driver
    currentVehicleData['plateNumber'] = tractorInfo[0].plateNumber
    currentVehicleData['model'] = tractorInfo[0].model

    return currentVehicleData
  }

  const getLatestIoTData = (deviceId) => {
    const currentDevice = deviceData.filter((device) => device.id === parseInt(deviceId))
    let currentDeviceData = currentDevice[currentDevice.length - 1]
    return currentDeviceData
  }

  const filteredTractors = tractors.filter((tractor) => {
    const vehicleData = getLatestVehicleData(tractor.id)
    return selectedVehicleStatuses.includes(vehicleData.status)
  })

  const filteredDevices = iotDevices.filter((device) => {
    const deviceData = getLatestIoTData(device.id)
    const sensorTypes = Object.keys(deviceData.sensorsData)
    return selectedDeviceStatuses.some((status) => sensorTypes.includes(status))
  })

  const data = showTractors ? filteredTractors : filteredDevices

  return (
    <div style={{ height: '500px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={toggleDevices}>
          {showTractors ? 'Show IOT Devices' : 'Show Tractors'}
        </button>
        {showTractors ? (
          <div>
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
        ) : (
          <div>
            <label
              style={{
                padding: '2px 10px',
              }}
            >
              Filter by sensors{' '}
            </label>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexDirection: 'row',
                borderColor: 'red',
              }}
            >
              {Object.values(SensorTypes).map((status) => (
                <label
                  key={status}
                  style={{
                    padding: '2px 10px',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedDeviceStatuses.includes(status)}
                    onChange={() => handleDeviceStatusChange(status)}
                  />
                  {status}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      <MapContainer center={[39, 35]} zoom={6} scrollWheelZoom={true} style={{ height: '90%' }}>
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
                    {currentDevice.sensorsData.temperature && (
                      <p>
                        Temperature: {currentDevice.sensorsData.temperature}
                        {sensorTypes[SensorTypes.TEMPERATURE].unit}
                      </p>
                    )}
                    {currentDevice.sensorsData.pressure && (
                      <p>
                        Pressure: {currentDevice.sensorsData.pressure}
                        {sensorTypes[SensorTypes.PRESSURE].unit}
                      </p>
                    )}
                    {currentDevice.sensorsData.humidity && (
                      <p>
                        Humidity: {currentDevice.sensorsData.humidity}
                        {sensorTypes[SensorTypes.HUMIDITY].unit}
                      </p>
                    )}
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
