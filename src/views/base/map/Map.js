import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Agriculture, RssFeed } from '@mui/icons-material'
import tractors from 'src/data/tractor' // Assuming you have tractor data
import iotDevices from 'src/data/iot-devices' // Assuming you have IOT device data
import ReactDOMServer from 'react-dom/server'

// Function to create a Leaflet icon from a React component
const createCustomIcon = (icon, color) => {
  let svgString = ReactDOMServer.renderToString(icon)
  svgString = svgString.replace(/<path/g, `<path fill="${color}"`)

  console.log(svgString)

  return new L.DivIcon({
    html: svgString,
    className: 'custom-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  })
}

const Map = () => {
  const [showTractors, setShowTractors] = useState(true) // State to toggle between tractors and IOT devices

  const toggleDevices = () => {
    setShowTractors(!showTractors)
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
        {devices.map((device) => (
          <Marker
            key={device.id}
            position={[device.location.latitude, device.location.longitude]}
            icon={
              showTractors
                ? createCustomIcon(<Agriculture />, 'green')
                : createCustomIcon(<RssFeed />, 'pink')
            }
          >
            <Popup>{`Device: ${device.id}`}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Map
