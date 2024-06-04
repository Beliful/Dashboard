import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import imageTruck from './icons8-tractor-50.png'
import imageIOT from './icons8-iot-64.png' // Assuming you have an IOT icon image
import tractors from 'src/data/tractor' // Assuming you have tractor data
import iotDevices from 'src/data/iot-devices' // Assuming you have IOT device data

const iconTruck = new L.icon({
  iconUrl: imageTruck,
  iconSize: [30, 30],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
})

const iconIOT = new L.icon({
  iconUrl: imageIOT,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15],
})

const Map = () => {
  const [showTractors, setShowTractors] = useState(true) // State to toggle between tractors and IOT devices

  const toggleDevices = () => {
    setShowTractors(!showTractors)
  }

  const devices = showTractors ? tractors : iotDevices // Determine which devices to show based on state

  return (
    <div style={{ height: '500px' }}>
      {' '}
      {/* Ensure the container has a height */}
      <button onClick={toggleDevices}>{showTractors ? 'Show IOT Devices' : 'Show Tractors'}</button>
      <MapContainer center={[39, 35]} zoom={6} scrollWheelZoom={false} style={{ height: '100%' }}>
        {' '}
        {/* Set height for the MapContainer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {devices.map((device) => (
          <Marker
            key={device.id}
            position={[device.location.latitude, device.location.longitude]}
            icon={showTractors ? iconTruck : iconIOT}
          >
            <Popup>{device.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Map
