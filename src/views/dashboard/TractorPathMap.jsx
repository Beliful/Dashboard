import React from 'react'
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { createCustomIcon } from '../../turktraktor/util/createLeafletIcon'
import { LocationOn, PushPin } from '@mui/icons-material'

const TractorPathMap = ({ data: tractorMeasurements }) => {
  const position =
    tractorMeasurements.length > 0
      ? [
          tractorMeasurements[0].measurements.location.latitude,
          tractorMeasurements[0].measurements.location.longitude,
        ]
      : [0, 0]

  const polyline = tractorMeasurements.map((point) => [
    point.measurements.location.latitude,
    point.measurements.location.longitude,
  ])

  // Get start and finish points
  const startPoint = polyline[0]
  const finishPoint = polyline[polyline.length - 1]

  return (
    <MapContainer center={position} zoom={14} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline positions={polyline} color="#5D5DC0" />
      {startPoint && (
        <Marker position={startPoint} icon={createCustomIcon(<PushPin />, '#78f549')}>
          <Popup>Start Point</Popup>
        </Marker>
      )}
      {finishPoint && (
        <Marker position={finishPoint} icon={createCustomIcon(<LocationOn />, '#f54242')}>
          <Popup>Finish Point</Popup>
        </Marker>
      )}
    </MapContainer>
  )
}

export default TractorPathMap
