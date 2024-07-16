import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { createCustomIcon } from '../../util/createLeafletIcon'
import { LocationOn, PushPin, Album } from '@mui/icons-material'
import { formatDate } from '../../util/formatDate'
import tractors from 'src/ceooffice/data/tractor'
import { TractorStatus } from '../../const/enums'
import drivers from '../../data/driver'

const TractorPathMap = ({ data: tractorMeasurements, currentVehicle }) => {
  const [tractorData, setTractorData] = useState(null)

  useEffect(() => {
    console.log("lan noluoooo")
    setTractorData(getLatestVehicleData(currentVehicle))
  }, []);

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

  const currentIndex = Math.floor(Math.random() * polyline.length);
  const currentPoint = polyline[currentIndex];

  console.log("curre:", currentPoint)

  const polylineBefore = polyline.slice(0, currentIndex + 1);
  const polylineAfter = polyline.slice(currentIndex);

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

    console.log("aloo current tractor:", currentVehicleData)
    return currentVehicleData
  }

  return (
    <MapContainer center={position} zoom={15} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline positions={polylineBefore} color="#5D5D5D" />
      <Polyline positions={polylineAfter} color="#375EFB" />
      {startPoint && (
        <Marker position={startPoint} icon={createCustomIcon(<Album />, 'blue', 22)}>
          <Popup>Start Point</Popup>
        </Marker>
      )}
      {currentPoint && (
        <Marker position={currentPoint} icon={createCustomIcon(<LocationOn />, '#64E62F')}>
          <Popup 
            style={{
              fontFamily: 'Arial, sans-serif',
              borderRadius: '5px',
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              '& .leaflet-popup-content-wrapper': {
                width: '800px',
            },
            }}>
                {tractorData &&(
                  <div>                    
                    <h5
                        style={{ cursor: 'pointer', textDecoration: 'underline', color: 'black' }}
                        onClick={() => navigate(`/ceooffice/dashboard/vehicle/${tractorData.tractorId}`)}
                      >
                        {tractorData.model}
                      </h5>
                      <p style={{ fontStyle: 'italic', color: 'gray', lineHeight: 0.6, }}>
                          {formatDate(tractorData.timestamp)}
                      </p>
                      <p style={{ fontStyle: 'italic', color: 'gray', lineHeight: 0.6, }}>
                          {currentPoint[0].toFixed(4)} N - {currentPoint[1].toFixed(4)} E 
                      </p>
                    <div
                      style={{
                        fontFamily: 'Arial, sans-serif',
                        lineHeight: 0.6,
                        borderRadius: '5px',
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p><strong>Plate Number: </strong>{tractorData.plateNumber}</p>
                        <p><strong>Status: </strong>{tractorData.status}</p>
                        <p><strong>RPM: </strong>{tractorData.measurements.rpm}</p>
                        <p><strong>Speed: </strong>{tractorData.measurements.speed}</p>
                      </div>
                      <div>                        
                        <p><strong>Driver: </strong>{tractorData.driver}</p>
                        <p><strong>Noise: </strong>{drivers[currentVehicle].noise}</p>
                        <p><strong>Temperature: </strong>{drivers[currentVehicle].temperature}</p>
                        <p><strong>Humidity: </strong>{drivers[currentVehicle].humidity}</p>
                        <p><strong>CO2: </strong>{drivers[currentVehicle].gas.CO2}</p>
                        <p><strong>Ammonia: </strong>{drivers[currentVehicle].gas.ammonia}</p>
                        <p><strong>Methane: </strong>{drivers[currentVehicle].gas.methane}</p>
                      </div>
                    </div>
                  </div>
                )}
              </Popup>
        </Marker>
      )}
      {finishPoint && (
        <Marker position={finishPoint} icon={createCustomIcon(<PushPin />, '#EF321B')}>
          <Popup>Finish Point</Popup>
        </Marker>
      )}
    </MapContainer>
  )
}

export default TractorPathMap
