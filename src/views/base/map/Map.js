import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const tractors = [
  { id: 1, position: [39.1, 35.2], name: 'Tractor 1' },
  { id: 2, position: [39.3, 35.4], name: 'Tractor 2' },
  // Add more tractors as needed
];

const Map = () => {
  return (
    <MapContainer center={[39, 35]} zoom={6} scrollWheelZoom={false} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {tractors.map(tractor => (
        <Marker key={tractor.id} position={tractor.position}>
          <Popup>
            {tractor.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
