import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { createCustomIcon } from '../../util/createLeafletIcon';
import { LocationOn, PushPin, Album } from '@mui/icons-material';
import { formatDate } from '../../util/formatDate';
import tractors from 'src/ceooffice/data/tractor';
import { TractorStatus } from '../../const/enums';
import drivers from '../../data/driver';
import { useNavigate } from 'react-router-dom';

const getLatestVehicleData = (tractorMeasurements, vehicleId) => {
  const currentTractor = tractorMeasurements.filter(
    (tractor) => tractor.tractorId === parseInt(vehicleId),
  );

  const tractorInfo = tractors.find((item) => item.id === parseInt(vehicleId));

  let currentVehicleData = currentTractor[currentTractor.length - 1];
  currentVehicleData['status'] =
    currentVehicleData.measurements.rpm === 0
      ? TractorStatus.STOPPED
      : currentVehicleData.measurements.speed === 0
      ? TractorStatus.IDLING
      : TractorStatus.RUNNING;

  currentVehicleData['driver'] = tractorInfo.driver;
  currentVehicleData['plateNumber'] = tractorInfo.plateNumber;
  currentVehicleData['model'] = tractorInfo.model;

  return currentVehicleData;
};

const CenterUpdater = ({ centerPosition }) => {
  const map = useMap();

  useEffect(() => {
    if (centerPosition.length > 0) {
      map.setView(centerPosition, map.getZoom());
    }
  }, [centerPosition, map]);

  return null;
};

const TractorPathMap = ({ data: tractorMeasurements, currentVehicle }) => {
  const [tractorData, setTractorData] = useState(null);
  const [centerPosition, setCenterPosition] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (tractorMeasurements.length > 0 && currentVehicle) {
      const latestData = getLatestVehicleData(tractorMeasurements, currentVehicle);
      setTractorData(latestData);
    }
  }, [tractorMeasurements, currentVehicle]);

  useEffect(() => {
    if (tractorMeasurements.length > 0) {
      const position = [
        tractorMeasurements[0].measurements.location.latitude,
        tractorMeasurements[0].measurements.location.longitude,
      ];

      setCenterPosition(position);
    }
  }, [currentVehicle, tractorMeasurements]);

  const polyline = tractorMeasurements.map((point) => [
    point.measurements.location.latitude,
    point.measurements.location.longitude,
  ]);

  const startPoint = polyline[0];
  const finishPoint = polyline[polyline.length - 1];

  const currentIndex = Math.floor(Math.random() * polyline.length);
  const currentPoint = polyline[currentIndex];

  const polylineBefore = polyline.slice(0, currentIndex + 1);
  const polylineAfter = polyline.slice(currentIndex);

  if (!tractorData || centerPosition.length === 0) {
    return null; // or a loading spinner
  }

  return (
    <MapContainer center={centerPosition} zoom={15} style={{ height: '400px', width: '100%' }}>
      <CenterUpdater centerPosition={centerPosition} />
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
          <Popup>
            <div style={{ width: '300px' }}>
              <h5
                style={{ cursor: 'pointer', textDecoration: 'underline', color: 'black' }}
                onClick={() => navigate(`/ceooffice/dashboard/vehicle/${tractorData.tractorId}`)}
              >
                {tractorData.model}
              </h5>
              <p style={{ fontStyle: 'italic', color: 'gray', lineHeight: 0.6 }}>
                {formatDate(tractorData.timestamp)}
              </p>
              <p style={{ fontStyle: 'italic', color: 'gray', lineHeight: 0.6 }}>
                {currentPoint[0].toFixed(4)} N - {currentPoint[1].toFixed(4)} E
              </p>
              <div
                style={{
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: 0.6,
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <p>
                    <strong>Plate Number: </strong>
                    {tractorData.plateNumber}
                  </p>
                  <p>
                    <strong>Status: </strong>
                    {tractorData.status}
                  </p>
                  <p>
                    <strong>RPM: </strong>
                    {tractorData.measurements.rpm}
                  </p>
                  <p>
                    <strong>Speed: </strong>
                    {tractorData.measurements.speed}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Driver: </strong>
                    {tractorData.driver}
                  </p>
                  <p>
                    <strong>Noise: </strong>
                    {drivers[currentVehicle - 1].noise}
                  </p>
                  <p>
                    <strong>Temperature: </strong>
                    {drivers[currentVehicle - 1].temperature}
                  </p>
                  <p>
                    <strong>Humidity: </strong>
                    {drivers[currentVehicle - 1].humidity}
                  </p>
                  <p>
                    <strong>CO2: </strong>
                    {drivers[currentVehicle - 1].gas.CO2}
                  </p>
                  <p>
                    <strong>Ammonia: </strong>
                    {drivers[currentVehicle - 1].gas.ammonia}
                  </p>
                  <p>
                    <strong>Methane: </strong>
                    {drivers[currentVehicle - 1].gas.methane}
                  </p>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      )}
      {finishPoint && (
        <Marker position={finishPoint} icon={createCustomIcon(<PushPin />, '#EF321B')}>
          <Popup>Finish Point</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default TractorPathMap;
